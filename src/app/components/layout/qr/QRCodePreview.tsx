"use client";

import React, { useEffect, useRef, useState } from "react";
import { Download, RefreshCw, Save, Lock } from "lucide-react";
import QRCodeStyling from "qr-code-styling";


import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";
import { formatQRDataToURL, createQRData, parseUserInput, QRType } from "../../../lib/qrDataUtils";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

interface QRCodePreviewProps {
  settings?: QRCodeSettings;
  user?: UserData | null;
  refreshQRStats?: () => void;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({
  settings = {
    url: '',
    cornerShape: 'square',
    eyeShape: 'square',
    qrShape: 'square',
    qrCodeShape: 'square',
    foregroundColor: '#000000',
    dotColor: '#000000',
    cornerColor: '#000000',
    eyeColor: '#000000',
    backgroundColor: '#FFFFFF',
    logoImage: '',
    backgroundImage: undefined,
    processedLogoPath: undefined,
    frameStyle: undefined,
    frameText: undefined,
    frameTextSize: undefined,
    frameColor: undefined,
    frameTextColor: undefined,
    dataType: undefined
  },
  user = null,
  refreshQRStats
}) => {
  // Debug received settings
  console.log('=== QRCODE PREVIEW RECEIVED SETTINGS ===');
  //console.log('Received settings:', settings);
  //console.log('settings.logoImage:', settings.logoImage);
  //console.log('settings.logoImage type:', typeof settings.logoImage);
  //console.log('settings.logoImage constructor:', settings.logoImage?.constructor?.name);
  //console.log('settings.logoImage JSON:', JSON.stringify(settings.logoImage));
  //console.log('=== END QRCODE PREVIEW RECEIVED SETTINGS ===');
  
  // Monitor settings changes
  useEffect(() => {
    console.log('=== SETTINGS CHANGE DETECTED ===');
    //console.log('New settings.logoImage:', settings.logoImage);
    //console.log('New settings.logoImage type:', typeof settings.logoImage);
    //console.log('=== END SETTINGS CHANGE DETECTED ===');
  }, [settings.logoImage]);


  

  
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [shouldBlur, setShouldBlur] = useState(false);

  // Map UI settings to qr-code-styling options
  const getQrOptions = (customSettings?: any) => {
    // Debug: Log the settings being passed
    //console.log('=== QR OPTIONS DEBUG ===');
    //console.log('customSettings:', customSettings);
    //console.log('settings:', settings);
    //console.log('customSettings type:', typeof customSettings);
    //console.log('settings type:', typeof settings);
    
    // Allowed values for qr-code-styling library
    type DotType = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
    type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
    type CornerDotType = 'dot' | 'square';
    
    // Map body shapes to supported dot types
    const dotTypes: Record<string, DotType> = {
      // Original shapes
      square: "square",
      circle: "dots", // Map circle to dots for circular QR codes
      rounded: "rounded",
      dots: "dots",
      classy: "classy",
      classyRounded: "classy-rounded",
      "extra-rounded": "extra-rounded",
      
      // Remaining shapes mapped to closest supported types
      minimal: "square", // Minimal works well with square
    };
    
    // Map corner shapes to supported corner square types
    const cornersSquareTypes: Record<string, CornerSquareType> = {
      // Original shapes
      square: "square",
      // Cut corners work well with square
      cross: "square", // Cross pattern works well with square
      diamond: "extra-rounded", // Diamond works well with extra-rounded
      circle: "extra-rounded", // Circle works well with extra-rounded
      star: "extra-rounded", // Star works well with extra-rounded
    };
    
    // Map eye shapes to supported corner dot types
    const cornersDotTypes: Record<string, CornerDotType> = {
      // Original shapes
      square: "square",
      dot: "dot",
      circle: "dot", // Circle maps to dot
      rounded: "dot", // Rounded maps to dot
      
      // Remaining shapes mapped to closest supported types
      star: "dot", // Star works well with dot
      diamond: "dot", // Diamond works well with dot
      gear: "dot", // Gear works well with dot
      cross: "square", // Cross works well with square
    };
    
    // Use custom settings if provided, otherwise use component settings
    const currentSettings = customSettings || settings;
    
    const options: any = {
      width: settings.qrCodeShape !== 'square' ? 240 : 280, // Smaller for shaped QR codes
      height: settings.qrCodeShape !== 'square' ? 240 : 280, // Smaller for shaped QR codes
      type: "svg" as const,
      data: "https://example.com",
      image: undefined,
      margin: settings.qrCodeShape !== 'square' ? 10 : 0, // Add margin for shaped QR codes
      qrOptions: {
        type: "Canvas" as const,
        mode: "Byte" as const,
        errorCorrectionLevel: "Q" as const,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.15,
        margin: 0,
      },
      dotsOptions: {
        type: dotTypes[currentSettings.qrShape] || "square",
        color: currentSettings.dotColor || currentSettings.foregroundColor || "#000000",
      },
      backgroundOptions: {
        color: currentSettings.backgroundColor || "#FFFFFF",
      },
      cornersSquareOptions: {
        type: cornersSquareTypes[currentSettings.cornerShape] || "square",
        color: currentSettings.cornerColor || currentSettings.foregroundColor || "#000000",
      },
      cornersDotOptions: {
        type: cornersDotTypes[currentSettings.eyeShape] || "square",
        color: currentSettings.eyeColor || currentSettings.foregroundColor || "#000000",
      },
    };

    // Debug dot color
    //console.log('=== DOT COLOR DEBUG ===');
    //console.log('currentSettings.dotColor:', currentSettings.dotColor);
    //console.log('currentSettings.foregroundColor:', currentSettings.foregroundColor);
    //console.log('Final dot color:', options.dotsOptions.color);
    //console.log('=== END DOT COLOR DEBUG ===');

    // Handle logo image
    if (currentSettings.logoImage) {
      let logoUrl = currentSettings.logoImage;
      
      // Handle different logo formats
      if (typeof currentSettings.logoImage === 'object' && currentSettings.logoImage.url) {
        logoUrl = currentSettings.logoImage.url;
      } else if (typeof currentSettings.logoImage === 'object' && currentSettings.logoImage.dataUrl) {
        logoUrl = currentSettings.logoImage.dataUrl;
      } else if (typeof currentSettings.logoImage === 'string') {
        logoUrl = String(currentSettings.logoImage);
      }
      
      // Validate the URL
      if (
        typeof logoUrl !== 'string' ||
        !logoUrl ||
        logoUrl === '[object Object]' ||
        logoUrl === 'undefined' ||
        logoUrl === 'null' ||
        logoUrl.trim() === ''
      ) {
        console.warn('Invalid logo URL, skipping:', currentSettings.logoImage);
        return options;
      }
      
      // Ensure proper URL format
      let finalLogoUrl = logoUrl;
      if (logoUrl.startsWith('/') && !logoUrl.startsWith('//')) {
        finalLogoUrl = `${window.location.origin}${logoUrl}`;
      }
      
      // Set image URL directly (QRCodeStyling expects a string, not an object)
      (options as any).image = finalLogoUrl;
      
      console.log('✅ Logo configured successfully:', finalLogoUrl);
      
      // Also set additional image options if needed
      options.imageOptions = {
        hideBackgroundDots: true,
        imageSize: 0.15,
        margin: 0
      };
    }
    if (currentSettings.backgroundImage) {
      (options.backgroundOptions as any).image = currentSettings.backgroundImage;
    }
    return options;
  };

  // Initialize and update QR code
  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      let displayData = settings.url && settings.url.trim() !== '' ? settings.url : 'https://example.com';
      
      // Format the URL based on the data type using JSON structure
      if (settings.dataType && settings.url) {
        try {
          // Create QR data structure
          const qrData = createQRData(settings.dataType as QRType, parseUserInput(settings.dataType as QRType, settings.url));
          displayData = formatQRDataToURL(qrData);
        } catch (error) {
          console.warn('Failed to format QR data:', error);
          // Fallback to original URL
          displayData = settings.url.startsWith('http') ? settings.url : `https://${settings.url}`;
        }
      }
      
      let blurState = !settings.url || settings.url.trim() === '';
      setShouldBlur(blurState);
      
      if (!displayData || displayData.trim() === '') {
        const size = settings.qrCodeShape !== 'square' ? 240 : 280;
        qrRef.current.innerHTML = `
          <div style="
            width: ${size}px; 
            height: ${size}px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            background-color: ${settings.backgroundColor || '#fff'}; 
            border: 2px solid #e5e7eb; 
            border-radius: ${settings.qrCodeShape === 'circle' ? '50%' : '8px'};
            font-size: ${size * 0.5}px; 
            color: #9ca3af; 
            font-weight: bold;
          ">
            ?
          </div>
        `;
      } else {
        try {
          const qrOptions = getQrOptions(settings);
          
          console.log('=== QR CODE GENERATION DEBUG ===');
          //console.log('qrOptions:', qrOptions);
          //console.log('qrOptions.image:', qrOptions.image);
          //console.log('displayData:', displayData);
          //console.log('=== END QR CODE GENERATION DEBUG ===');
          
          // Always recreate QR instance when settings change
          if (qrInstance.current) {
            console.log('Destroying existing QR instance');
            qrRef.current.innerHTML = "";
          }
          
            console.log('=== QR INSTANCE CREATION ===');
            //console.log('Creating new QR instance with options:', qrOptions);
          //console.log('qrOptions.image:', qrOptions.image);
          //console.log('qrOptions.image type:', typeof qrOptions.image);
          
            qrInstance.current = new QRCodeStyling({
              ...qrOptions,
              data: displayData
            });
            console.log('QR instance created successfully');
          console.log('=== QR INSTANCE APPEND ===');
          qrInstance.current.append(qrRef.current);
          console.log('QR instance appended successfully');
          // Blur effect for placeholder - use setTimeout to avoid React style conflicts
          setTimeout(() => {
            const qrElement = qrRef.current?.querySelector('canvas') || qrRef.current?.querySelector('svg');
          if (qrElement) {
            if (blurState) {
              qrElement.style.filter = 'sepia(0.3) hue-rotate(200deg) saturate(1.5) brightness(0.8)';
              qrElement.style.opacity = '0.7';
            } else {
              qrElement.style.filter = 'none';
              qrElement.style.opacity = '1';
            }
          }
          }, 0);
        } catch (error) {
          console.error('Error creating QR code:', error);
          const size = settings.qrCodeShape !== 'square' ? 240 : 280;
          qrRef.current.innerHTML = `
            <div style="
              width: ${size}px; 
              height: ${size}px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              background-color: #fee2e2; 
              border: 2px solid #fecaca; 
              border-radius: ${settings.qrCodeShape === 'circle' ? '50%' : '8px'};
              color: #dc2626; 
              font-size: 14px; 
              text-align: center;
              padding: 20px;
            ">
              Error creating QR code
            </div>
          `;
        }
      }
    }
  }, [settings, settings.dotColor, settings.foregroundColor, settings.cornerColor, settings.eyeColor, settings.backgroundColor, settings.frameStyle, settings.frameText]);

  const downloadQR = () => {
    if (qrInstance.current) {
      qrInstance.current.download({ name: 'qr-code', extension: 'png' });
    }
  };

  const handleCreateQRClick = () => {
    if (!user) {
      alert('Please log in to create QR codes');
      return;
    }
    setShowConfirmPopup(true);
  };

  const confirmCreateQR = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage("");
    setShowConfirmPopup(false);
    try {
      // Check subscription limit first
      const limitCheck = await fetch('/api/subscription/check-limit');
      if (!limitCheck.ok) {
        setSaveMessage('Failed to check subscription limit');
        setIsSaving(false);
        return;
      }
      const limitData = await limitCheck.json();
      
      if (!limitData.canCreate) {
        // Check if user has Pro subscription (unlimited)
        const userResponse = await fetch('/api/subscription/user-data');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (userData.planName === 'Pro') {
            setSaveMessage(`QR code limit reached. You've used ${limitData.qrCodesUsed}/${limitData.qrCodesLimit} QR codes. Please contact support.`);
          } else {
            setSaveMessage(`QR code limit reached. You've used ${limitData.qrCodesUsed}/${limitData.qrCodesLimit} QR codes. Please upgrade your plan.`);
          }
        } else {
        setSaveMessage(`QR code limit reached. You've used ${limitData.qrCodesUsed}/${limitData.qrCodesLimit} QR codes. Please upgrade your plan.`);
        }
        setIsSaving(false);
        return;
      }

      // Create structured QR data
      const qrType = settings.dataType as QRType || 'website';
      const qrData = parseUserInput(qrType, settings.url);
      const structuredQRData = createQRData(qrType, qrData);

      // 1. Create the QR code in the database to get the uniqueCode
      const qrDataForAPI = {
        qrType,
        qrData,
        metadata: {
          createdFrom: 'web-interface',
          originalDataType: settings.dataType
        },
        cornerShape: settings.cornerShape,
        eyeShape: settings.eyeShape,
        qrShape: settings.qrShape,
        foregroundColor: settings.foregroundColor,
        backgroundColor: settings.backgroundColor,
        dotColor: settings.dotColor,
        cornerColor: settings.cornerColor,
        eyeColor: settings.eyeColor,
        // Frame settings
        frameStyle: settings.frameStyle,
        frameText: settings.frameText,
        frameTextSize: settings.frameTextSize,
        frameColor: settings.frameColor,
        frameTextColor: settings.frameTextColor,
        userId: user.id,
      };
      const createRes = await fetch("/api/qr", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qrDataForAPI),
      });
      if (!createRes.ok) {
        const errorData = await createRes.json();
        setSaveMessage(errorData.error || 'Failed to create QR code');
        setIsSaving(false);
        return;
      }
      const createdQR = await createRes.json();
      const serverLink = createdQR.serverLink;
      
      // 2. Generate the QR code image with the server link and frame
      let qrSettings = {
        ...settings,
        url: serverLink,
      };
      if (!qrInstance.current) {
        qrInstance.current = new QRCodeStyling({
          ...getQrOptions(qrSettings),
          data: serverLink,
        });
      }
      qrInstance.current.update({
        ...getQrOptions(qrSettings),
        data: serverLink,
      });
      
      // Generate QR code blob
      const qrBlob = await qrInstance.current.getRawData('png');
      if (!qrBlob) {
        setSaveMessage('Failed to export QR code image');
        setIsSaving(false);
        return;
      }
      
      // Create composite image with frame and text
      const blob = await createQRWithFrame(qrBlob, settings);
      
      // 3. Upload the image and update the QR code record
      const formData = new FormData();
      formData.append('image', blob, 'qr.png');
      formData.append('qrId', createdQR.id);
      
      // Add processed logo path if available
      if (settings.processedLogoPath) {
        formData.append('processedLogoPath', settings.processedLogoPath);
      }
      
      // Add QR data for metadata
      formData.append('qrType', qrType);
      formData.append('userInput', settings.url);
      formData.append('metadata', JSON.stringify({
        createdFrom: 'web-interface',
        originalDataType: settings.dataType
      }));
      
      const uploadRes = await fetch(`/api/qr/${createdQR.id}/image`, {
        method: "POST",
        body: formData,
      });
      
      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        setSaveMessage(errorData.error || 'Failed to upload QR code image');
        setIsSaving(false);
        return;
      }
      
      const uploadedQR = await uploadRes.json();
      
      setSaveMessage('QR code created successfully!');
      setIsSaving(false);
      
      // Refresh QR stats if callback provided
      if (refreshQRStats) {
        refreshQRStats();
      }
      
      // Clear the form after successful creation
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error creating QR code:', error);
      setSaveMessage('Failed to create QR code. Please try again.');
      setIsSaving(false);
    }
  };

  const cancelCreateQR = () => {
    setShowConfirmPopup(false);
  };

  const getFrameContainerClasses = () => {
    const baseClasses = "relative bg-white overflow-hidden border border-gray-200 ";
    // Increase height when frame is enabled to accommodate frame border and text
    const sizeClasses = settings.frameStyle && settings.frameStyle !== 'none' 
      ? "w-[300px] h-[342px]" // Larger size for frame with bigger QR code
      : "w-[280px] h-[280px]"; // Larger size for standard QR code
    return `${baseClasses} ${sizeClasses}`;
  };

  const getFrameContainerStyle = () => {
    if (settings.frameStyle && settings.frameStyle !== 'none') {
      return {
        ...getQRCodeShapeStyle(),
        backgroundColor: settings.backgroundColor || '#FFFFFF'
      };
    }
    return {};
  };

  const getQRCodeShapeStyle = () => {
    const size = settings.frameStyle && settings.frameStyle !== 'none' ? 300 : 280;
    
    switch (settings.qrCodeShape) {
      case 'circle':
        return {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
      case 'rounded':
        return {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
      case 'hexagon':
        return {
          width: `${size}px`,
          height: `${size}px`,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
      case 'octagon':
        return {
          width: `${size}px`,
          height: `${size}px`,
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
      default: // square
        return {
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        };
    }
  };

  const getFrameTextSizeClass = () => {
    switch (settings.frameTextSize) {
      case 'small': return 'text-xs';
      case 'medium': return 'text-sm';
      case 'large': return 'text-base';
      case 'xl': return 'text-lg';
      default: return 'text-sm';
    }
  };



  const createQRWithFrame = async (qrBlob: Blob, settings: QRCodeSettings): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        const qrSize = 220;
        const framePadding = 20;
        const textHeight = 40; // Space for frame text
        const totalWidth = qrSize + (framePadding * 2);
        const totalHeight = qrSize + (framePadding * 2) + (settings.frameText ? textHeight : 0);
        
        canvas.width = totalWidth;
        canvas.height = totalHeight;

        // Draw background
        ctx.fillStyle = settings.backgroundColor || '#FFFFFF';
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        // Draw frame if enabled
        if (settings.frameStyle && settings.frameStyle !== 'none') {
          ctx.strokeStyle = settings.frameColor || '#000000';
          ctx.lineWidth = 4;
          ctx.strokeRect(framePadding - 2, framePadding - 2, qrSize + 4, qrSize + 4);
        }

        // Draw QR code
        ctx.drawImage(img, framePadding, framePadding, qrSize, qrSize);

        // Draw frame text if provided
        if (settings.frameText) {
          // Draw text background
          ctx.fillStyle = settings.frameColor || '#000000';
          const textBgWidth = qrSize - 20;
          const textBgHeight = 30;
          const textBgX = framePadding + 10;
          const textBgY = framePadding + qrSize + 5;
          ctx.fillRect(textBgX, textBgY, textBgWidth, textBgHeight);
          
          // Draw text
          ctx.fillStyle = settings.frameTextColor || '#FFFFFF';
          const fontSize = settings.frameTextSize === 'large' ? 16 : 
                          settings.frameTextSize === 'xl' ? 20 : 
                          settings.frameTextSize === 'small' ? 12 : 14;
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          const textX = totalWidth / 2;
          const textY = textBgY + (textBgHeight / 2);
          ctx.fillText(settings.frameText, textX, textY);
        }

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      };
      img.onerror = () => reject(new Error('Failed to load QR image'));
      img.src = URL.createObjectURL(qrBlob);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6 min-h-[525px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">QR Code Preview</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadQR}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Download QR Code"
          >
            <Download size={18} />
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
      
      {/* QR Code Display */}
      <div className="flex justify-center">
        <div className={getFrameContainerClasses()}>
         
          {settings.frameStyle && settings.frameStyle !== 'none' ? (
            <div 
              className={`flex flex-col items-center justify-between min-h-[340px] pt-2 relative ${
                settings.frameStyle === 'solid' ? 'border-2 border-solid' :
                settings.frameStyle === 'dashed' ? 'border-2 border-dashed' :
                settings.frameStyle === 'dotted' ? 'border-2 border-dotted' : ''
              }`}
              style={{
                borderColor: settings.frameColor || '#000000',
                backgroundColor: settings.backgroundColor || '#FFFFFF',
                color: settings.frameTextColor || '#000000',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                ...getFrameContainerStyle()
              }}
            >
              {/* QR Code in Center */}
             
              
              {/* Frame Text at Bottom with Background */}
              {settings.frameText ? (
                <div 
                  className={`${getFrameTextSizeClass()} text-center font-bold p-2 rounded-lg shadow border border-gray-200 w-full`}
                  style={{
                    backgroundColor: settings.frameColor || '#000000',
                    color: settings.frameTextColor || '#FFFFFF'
                  }}
                >
                  {settings.frameText}
                </div>
              ) : (
                <div className="text-center text-xs text-gray-400 border-dashed border-gray-300 px-4 py-2 rounded-lg border-2">
                  No frame text set (Debug: frameText="{settings.frameText}")
              </div>
              )}
            </div>
          ) : (
            <div 
              ref={qrRef} 
              className="flex items-center justify-center" 
              style={{
                ...getQRCodeShapeStyle(),
                backgroundColor: settings.backgroundColor || '#FFFFFF'
              }}
            />
            )}
          </div>
        </div>
        
      {/* Action Buttons */}
      <div className="space-y-3">
        {user ? (
          <button
            onClick={handleCreateQRClick}
            disabled={isSaving || !settings.url || settings.url.trim() === ''}
            className="w-full bg-[#063970] text-white py-3 px-4 rounded-lg hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save size={18} />
                Create QR Code
              </>
            )}
          </button>
        ) : (
          <button
            disabled={true}
            className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg opacity-50 cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            Create QR Code
          </button>
        )}


        
        {/* Save Message */}
        {saveMessage && (
          <div className={`p-3 rounded-lg text-sm ${
            saveMessage.includes('successfully') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {saveMessage}
          </div>
        )}
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Create QR Code</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to create this QR code? It will be saved to your account.
            </p>
            <div className="flex gap-3">
                <button
                  onClick={cancelCreateQR}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCreateQR}
                className="flex-1 px-4 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052a5a] transition-colors"
                >
                Create
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodePreview;
