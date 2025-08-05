import React, { useRef, useState } from "react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";
import { Image as ImageIcon, UploadCloud } from "lucide-react";

interface LogoTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
  user?: { id: number; fullName: string; email: string; createdAt: string } | null;
}

const sampleLogos = [
  {
    name: 'Facebook',
    dataUrl: '/logo-sample/facebook-logo-icon.png',
  },
  {
    name: 'Instagram',
    dataUrl: '/logo-sample/instagram-logo-icon.png',
  },
  {
    name: 'LinkedIn',
    dataUrl: '/logo-sample/linkedin-logo-icon.png',
  },
  {
    name: 'Pinterest',
    dataUrl: '/logo-sample/pinterest-social-network-icon.png',
  },
  {
    name: 'WhatsApp',
    dataUrl: '/logo-sample/whatsapp-logo-icon.png',
  },
  {
    name: 'YouTube',
    dataUrl: '/logo-sample/youtube-logo-icon.png',
  },
  {
    name: 'Google Play',
    dataUrl: '/logo-sample/google-play-store-icon.png',
  },
  {
    name: 'GPS Location',
    dataUrl: '/logo-sample/gps.png',
  }
];

const LogoTab: React.FC<LogoTabProps> = ({ qrSettings, onSettingsChange, user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('logo', file);
      formData.append('userId', user?.id?.toString() || 'guest');

      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      console.log('UserId:', user?.id?.toString() || 'guest');

      const response = await fetch('/api/upload/process-logo', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let the browser set it with boundary
      });

      const result = await response.json();

      if (response.ok && result.url) {
        console.log('=== UPLOAD DEBUG ===');
        console.log('Upload result:', result);
        console.log('result.url:', result.url);
        console.log('result.url type:', typeof result.url);
        console.log('result.url constructor:', result.url?.constructor?.name);
        console.log('result.url JSON:', JSON.stringify(result.url));
        
        // Force the URL to be a string and validate it
        const logoUrl = String(result.url);
        console.log('logoUrl after String():', logoUrl);
        console.log('logoUrl type:', typeof logoUrl);
        
        // Update settings with new logo
        const updatedSettings: QRCodeSettings = {
          ...qrSettings,
          logoImage: logoUrl, // use the validated string
          processedLogoPath: result.localPath || ''
        };

        console.log('Updated settings after upload:', updatedSettings);
        console.log('updatedSettings.logoImage:', updatedSettings.logoImage);
        console.log('updatedSettings.logoImage type:', typeof updatedSettings.logoImage);
        console.log('=== END UPLOAD DEBUG ===');

        onSettingsChange(updatedSettings);
      } else {
        setUploadError(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof Error) {
        setUploadError(`Upload failed: ${error.message}`);
      } else {
        setUploadError('Upload failed. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSampleLogoClick = (logo: { name: string; dataUrl: string }) => {
    console.log('=== LOGO TAB DEBUG ===');
    console.log('Sample logo clicked:', logo);
    console.log('logo.dataUrl:', logo.dataUrl);
    console.log('logo.dataUrl type:', typeof logo.dataUrl);
    
    // Update settings with sample logo
    const updatedSettings: QRCodeSettings = {
      ...qrSettings,
      logoImage: String(logo.dataUrl) // force string
    };

    console.log('Updated settings:', updatedSettings);
    console.log('updatedSettings.logoImage:', updatedSettings.logoImage);
    console.log('updatedSettings.logoImage type:', typeof updatedSettings.logoImage);
    console.log('=== END LOGO TAB DEBUG ===');

    onSettingsChange(updatedSettings);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-[#063970]" />
        <h3 className="text-lg font-semibold text-gray-800">Upload Logo</h3>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sample Logos */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-3">Sample Logos</label>
          <div className="flex flex-wrap gap-2">
            {sampleLogos.map((logo) => (
              <button
                key={logo.name}
                type="button"
                title={logo.name}
                onClick={() => handleSampleLogoClick(logo)}
                className="w-10 h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:border-[#063970] focus:outline-none"
              >
                <img src={logo.dataUrl} alt={logo.name} className="w-7 h-7 object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-3">Upload Custom Logo</label>
          <div className="flex items-center gap-3">
            {qrSettings.logoImage ? (
              <img src={qrSettings.logoImage} alt="Logo Preview" className="w-16 h-16 object-contain rounded-lg border border-gray-200 shadow" />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`flex items-center text-sm gap-2 px-4 py-2 rounded-full transition-colors text-sm font-medium ${
                  isUploading 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-[#063970] text-white hover:bg-[#052c5c]'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                {isUploading ? 'Uploading...' : 'Upload Logo'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">PNG, JPG, SVG (max 5MB)</p>
              {uploadError && (
                <p className="text-xs text-red-500">{uploadError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoTab; 