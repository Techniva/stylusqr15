import React from "react";
import { Sparkles } from "lucide-react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";

interface TemplateTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  settings: Partial<QRCodeSettings>;
  preview: React.ReactNode;
}

const TemplateTab: React.FC<TemplateTabProps> = ({ qrSettings, onSettingsChange }) => {
  
  const handleTemplateSelect = (template: Template) => {
    const newSettings = { ...qrSettings, ...template.settings };
    onSettingsChange(newSettings);
  };

  const templates: Template[] = [
    // Only 8 templates with smaller previews
    {
      id: 'classic',
      name: 'Classic',
      description: 'Standard black and white',
      settings: {
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
        qrShape: 'square',
        cornerShape: 'square',
        eyeShape: 'square',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
        </div>
      )
    },
    {
      id: 'circular',
      name: 'Circular',
      description: 'Modern circular dots',
      settings: {
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
        qrShape: 'circle',
        cornerShape: 'extra-rounded',
        eyeShape: 'circle',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Classic blue with white f logo',
      settings: {
        foregroundColor: '#1877F2',
        backgroundColor: '#FFFFFF',
        qrShape: 'square',
        cornerShape: 'square',
        eyeShape: 'square',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">f</span>
          </div>
        </div>
      )
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Gradient purple to orange',
      settings: {
        foregroundColor: '#E4405F',
        backgroundColor: '#FFFFFF',
        qrShape: 'rounded',
        cornerShape: 'extra-rounded',
        eyeShape: 'circle',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">📷</span>
          </div>
        </div>
      )
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Red with white play button',
      settings: {
        foregroundColor: '#FF0000',
        backgroundColor: '#FFFFFF',
        qrShape: 'square',
        cornerShape: 'square',
        eyeShape: 'square',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">▶</span>
          </div>
        </div>
      )
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Green with white phone icon',
      settings: {
        foregroundColor: '#25D366',
        backgroundColor: '#FFFFFF',
        qrShape: 'square',
        cornerShape: 'square',
        eyeShape: 'square',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">📱</span>
          </div>
        </div>
      )
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Light blue with white in logo',
      settings: {
        foregroundColor: '#0A66C2',
        backgroundColor: '#FFFFFF',
        qrShape: 'square',
        cornerShape: 'square',
        eyeShape: 'square',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">in</span>
          </div>
        </div>
      )
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      description: 'Black with white X logo',
      settings: {
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
        qrShape: 'square',
        cornerShape: 'square',
        eyeShape: 'square',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">X</span>
          </div>
        </div>
      )
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      description: 'Red with white P logo',
      settings: {
        foregroundColor: '#E60023',
        backgroundColor: '#FFFFFF',
        qrShape: 'square',
        cornerShape: 'square',
        eyeShape: 'square',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
        </div>
      )
    },
    {
      id: 'circular-blue',
      name: 'Circular Blue',
      description: 'Blue circular dots',
      settings: {
        foregroundColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        qrShape: 'circle',
        cornerShape: 'extra-rounded',
        eyeShape: 'circle',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      id: 'circular-gradient',
      name: 'Circular Gradient',
      description: 'Purple to pink gradient',
      settings: {
        foregroundColor: '#8B5CF6',
        backgroundColor: '#FFFFFF',
        qrShape: 'circle',
        cornerShape: 'extra-rounded',
        eyeShape: 'circle',
      },
      preview: (
        <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* All Templates Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#063970]" />
          <h3 className="text-lg font-semibold text-gray-800">QR Code Templates</h3>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className="group relative p-2 border border-gray-200 rounded-lg bg-white hover:border-[#063970] hover:shadow-md transition-all duration-200"
            >
                              <div className="flex flex-col items-center space-y-1">
                {template.preview}
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-800 group-hover:text-[#063970] transition-colors">
                    {template.name}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateTab; 