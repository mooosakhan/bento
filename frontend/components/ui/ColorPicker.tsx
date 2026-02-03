import React, { useState } from 'react';
import { Button } from './button';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  showTransparent?: boolean;
}

const commonColors = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#f59e0b', '#eab308',
  '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#64748b', '#71717a', '#737373', '#78716c', '#57534e',
];

export function ColorPicker({ value, onChange, label, showTransparent = true }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setCustomColor(color);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 px-3 py-2 text-left border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
        >
          <div
            className="w-6 h-6 rounded border border-neutral-300 dark:border-neutral-600"
            style={{
              backgroundColor: value === 'transparent' ? 'transparent' : value,
              backgroundImage: value === 'transparent' 
                ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                : undefined,
              backgroundSize: value === 'transparent' ? '8px 8px' : undefined,
              backgroundPosition: value === 'transparent' ? '0 0, 0 4px, 4px -4px, -4px 0px' : undefined,
            }}
          />
          <span className="flex-1 text-sm text-neutral-900 dark:text-white font-mono">
            {value}
          </span>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-50 mt-2 p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg w-full max-w-xs">
              <div className="space-y-3">
                {/* Common Colors Grid */}
                <div className="grid grid-cols-6 gap-2">
                  {commonColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className="w-8 h-8 rounded border-2 transition-transform hover:scale-110"
                      style={{
                        backgroundColor: color,
                        borderColor: value === color ? '#3b82f6' : '#e5e7eb',
                      }}
                      title={color}
                    />
                  ))}
                </div>

                {/* Custom Color Input */}
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={customColor === 'transparent' ? '#ffffff' : customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-10 h-10 rounded border border-neutral-300 dark:border-neutral-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      placeholder="#000000"
                      className="flex-1 px-2 py-1.5 text-xs border border-neutral-300 dark:border-neutral-600 rounded bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-neutral-400 font-mono"
                    />
                  </div>
                  <Button
                    onClick={() => handleColorSelect(customColor)}
                    size="sm"
                    className="w-full text-xs"
                  >
                    Apply Custom Color
                  </Button>
                </div>

                {/* Transparent Button */}
                {showTransparent && (
                  <>
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2">
                      <Button
                        onClick={() => handleColorSelect('transparent')}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        Set Transparent
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
