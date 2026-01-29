
import React, { useState } from 'react';

interface ReadingSettingsProps {
  settings: {
    fontSize: number;
    fontFamily: string;
  };
  onUpdate: (newSettings: any) => void;
}

const ReadingSettings: React.FC<ReadingSettingsProps> = ({ settings, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fonts = [
    { name: 'টিরো বাংলা (Classic)', value: 'serif-content' },
    { name: 'হিন্দ শিলিগুড়ি (Modern)', value: 'modern-content' },
  ];

  return (
    <div className="fixed bottom-24 right-8 z-[95]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-gold text-white w-12 h-12 flex items-center justify-center shadow-2xl hover:bg-brand-teal transition-all rounded-full group"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-cog'} text-lg group-hover:rotate-45 transition-transform`}></i>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white shadow-2xl rounded-lg p-6 border border-gray-100 animate-slideUp">
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-teal mb-4 border-b border-gray-50 pb-2">পঠন বিন্যাস</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                অক্ষরের আকার <span>{settings.fontSize}px</span>
              </label>
              <input
                type="range"
                min="16"
                max="28"
                value={settings.fontSize}
                onChange={(e) => onUpdate({ ...settings, fontSize: parseInt(e.target.value) })}
                className="w-full accent-brand-gold h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ফন্ট শৈলী</label>
              <div className="flex flex-col gap-2">
                {fonts.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => onUpdate({ ...settings, fontFamily: f.value })}
                    className={`text-xs px-3 py-2 text-left border rounded-sm transition-all ${
                      settings.fontFamily === f.value 
                        ? 'border-brand-gold bg-brand-gold/5 text-brand-gold font-bold' 
                        : 'border-gray-100 hover:border-brand-teal'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingSettings;
