import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";
import { qrSVGs, cornerSVGs, eyeSVGs } from "./qrSvgPresets";

interface ShapeTabProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

const ShapeTab: React.FC<ShapeTabProps> = ({ qrSettings, onSettingsChange }) => {
  const handleSettingChange = (key: keyof QRCodeSettings, value: string) => {
    const newSettings = { ...qrSettings, [key]: value };
    onSettingsChange(newSettings);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleSettingChange('backgroundImage', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Body Shape */}
      <div className="relative border border-gray-300 rounded-xl bg-white px-4 pt-4 pb-2 w-full max-w-full">
        {/* Floating label positioned at top left */}
        <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700 font-medium">
          Body Shape
        </div>

        {/* Content inside the container */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 min-w-max mb-2">
            {qrSVGs.map((shape) => (
              <button
                key={shape.value}
                onClick={() => handleSettingChange('qrShape', shape.value)}
                className={`p-2 rounded-lg border-2 transition-all duration-200 bg-white hover:shadow-md ${
                  qrSettings.qrShape === shape.value
                    ? 'border-[#063970] bg-[#063970]/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={shape.value}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {shape.svg}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Corner Shape */}
      <div className="relative border border-gray-300 rounded-xl bg-white px-4 pt-4 pb-2 w-full max-w-full">
        {/* Floating label positioned at top left */}
        <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700 font-medium">
          Corner Shape
        </div>

        {/* Content inside the container */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 min-w-max mb-2">
            {cornerSVGs.map((shape) => (
              <button
                key={shape.value}
                onClick={() => handleSettingChange('cornerShape', shape.value)}
                className={`p-2 rounded-lg border-2 transition-all duration-200 bg-white hover:shadow-md ${
                  qrSettings.cornerShape === shape.value
                    ? 'border-[#063970] bg-[#063970]/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={shape.value}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {shape.svg}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Eye Shape */}
      <div className="relative border border-gray-300 rounded-xl bg-white px-4 pt-4 pb-2 w-full max-w-full">
        {/* Floating label positioned at top left */}
        <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700 font-medium">
          Eye Shape
        </div>

        {/* Content inside the container */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 min-w-max mb-2">
            {eyeSVGs.map((shape) => (
              <button
                key={shape.value}
                onClick={() => handleSettingChange('eyeShape', shape.value)}
                className={`p-2 rounded-lg border-2 transition-all duration-200 bg-white hover:shadow-md ${
                  qrSettings.eyeShape === shape.value
                    ? 'border-[#063970] bg-[#063970]/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={shape.value}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {shape.svg}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeTab;
