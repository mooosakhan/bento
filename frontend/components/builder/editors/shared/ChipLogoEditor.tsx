import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';

interface ChipLogoEditorProps {
  bio: string;
  chipLogos: { [chipName: string]: string };
  onChipLogosChange: (chipLogos: { [chipName: string]: string }) => void;
}

// Extract chips from bio text
function extractChips(text: string): string[] {
  const chipPattern = /#(\w+)/g;
  const chips: string[] = [];
  let match;
  
  while ((match = chipPattern.exec(text)) !== null) {
    if (!chips.includes(match[1])) {
      chips.push(match[1]);
    }
  }
  
  return chips;
}

export function ChipLogoEditor({ bio, chipLogos, onChipLogosChange }: ChipLogoEditorProps) {
  const chips = extractChips(bio);
  const [editingChip, setEditingChip] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [inputMode, setInputMode] = useState<'url' | 'svg'>('url');

  if (chips.length === 0) {
    return (
      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
          Add chips to your bio using <span className="font-mono text-neutral-700 dark:text-neutral-300">#tag</span> syntax to manage logos
        </p>
      </div>
    );
  }

  const handleAddLogo = (chip: string) => {
    if (logoUrl.trim()) {
      onChipLogosChange({
        ...chipLogos,
        [chip]: logoUrl.trim()
      });
      setLogoUrl('');
      setEditingChip(null);
    }
  };

  const handleRemoveLogo = (chip: string) => {
    const newLogos = { ...chipLogos };
    delete newLogos[chip];
    onChipLogosChange(newLogos);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Chip Logos
        </label>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {chips.length} chip{chips.length !== 1 ? 's' : ''} detected
        </span>
      </div>
      
      <div className="space-y-2">
        {chips.map((chip) => (
          <div 
            key={chip}
            className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {chipLogos[chip] ? (
                  chipLogos[chip].trim().startsWith('<svg') ? (
                    <div 
                      className="w-5 h-5 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: chipLogos[chip] }}
                    />
                  ) : (
                    <img 
                      src={chipLogos[chip]} 
                      alt={chip}
                      className="w-5 h-5 object-contain rounded"
                    />
                  )
                ) : (
                  <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center">
                    <ImageIcon className="w-3 h-3 text-neutral-400" />
                  </div>
                )}
                <span className="font-mono text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  #{chip}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                {chipLogos[chip] ? (
                  <button
                    onClick={() => handleRemoveLogo(chip)}
                    className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                    title="Remove logo"
                  >
                    <X className="w-4 h-4 text-neutral-500" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingChip(chip);
                      setLogoUrl(chipLogos[chip] || '');
                    }}
                    className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded text-neutral-700 dark:text-neutral-300 transition-colors"
                  >
                    Add Logo
                  </button>
                )}
              </div>
            </div>
            
            {editingChip === chip && (
              <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setInputMode('url')}
                    className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                      inputMode === 'url'
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    URL
                  </button>
                  <button
                    onClick={() => setInputMode('svg')}
                    className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                      inputMode === 'svg'
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    SVG Code
                  </button>
                </div>
                {inputMode === 'url' ? (
                  <Input
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="Enter logo URL (e.g., https://...)"
                    className="text-sm"
                  />
                ) : (
                  <textarea
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="Paste SVG code here (e.g., <svg>...</svg>)"
                    className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white min-h-[80px] font-mono text-xs"
                  />
                )}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    onClick={() => handleAddLogo(chip)}
                    className="flex-1 text-xs py-1.5"
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEditingChip(null);
                      setLogoUrl('');
                    }}
                    className="flex-1 text-xs py-1.5"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            {chipLogos[chip] && (
              <button
                onClick={() => {
                  setEditingChip(chip);
                  setLogoUrl(chipLogos[chip]);
                }}
                className="mt-2 text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Change Logo
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
