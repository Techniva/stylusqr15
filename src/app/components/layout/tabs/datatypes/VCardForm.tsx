// components/layout/tabs/datatypes/VCardForm.tsx

import React from 'react';
import { QRCodeSettings } from '../../qr/QRCodeSettings';

interface VCardFormProps {
  qrSettings: QRCodeSettings;
  onSettingsChange: (settings: QRCodeSettings) => void;
}

const VCardForm: React.FC<VCardFormProps> = ({ qrSettings, onSettingsChange }) => {
  const vcard = qrSettings.vcard || {};

  const handleChange = (field: keyof typeof vcard, value: string) => {
    // Update the specific field in the vcard object
    // and call onSettingsChange to update the parent component
    vcard[field] = value;
    console.log(`Updated vCard ${field}:`, value);
    // Ensure that the vcard object is not undefined
    // This prevents TypeScript errors when accessing properties
    if (!qrSettings.vcard) {
      qrSettings.vcard = {};
    }
    // Update the vcard object in qrSettings
    // This ensures that the vcard object is always defined
    // and contains the updated field value
    qrSettings.vcard[field] = value;
   
          
    onSettingsChange({
      ...qrSettings,
      vcard: {
        ...vcard,
        [field]: value,
      },
     
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {/* Full Name */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
        type="text"
        value={vcard.name || ''}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Enter full name"
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
    </div>

    {/* Phone */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
        type="tel"
        value={qrSettings.vcard?.phone || ''}
        onChange={(e) =>
            onSettingsChange({
            ...qrSettings,
            vcard: {
                ...(qrSettings.vcard ?? {}),
                phone: e.target.value,
            },
            })
        }
        placeholder="Enter phone number"
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
    </div>

    {/* Email */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
        type="email"
        value={vcard.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="Enter email address"
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
    </div>

    {/* Company */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
        <input
        type="text"
        value={vcard.company || ''}
        onChange={(e) => handleChange('company', e.target.value)}
        placeholder="Enter company name"
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
    </div>

     {/* Title */}
     <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
        type="text"
        value={vcard.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Enter title"
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
    </div>

    {/* Address */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <input
        type="text"
        value={vcard.address || ''}
        onChange={(e) => handleChange('address', e.target.value)}
        placeholder="Enter address"
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
    </div>
    
    {/* Website */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label> 
        <input
        type="url"
        value={vcard.website || ''}
        onChange={(e) => handleChange('website', e.target.value)}
        placeholder="Enter website URL"
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970]"
        />
    </div>
    </div>
  );
};

export default VCardForm;
