'use client';

import React from 'react';
import { Section } from '@/types';
import { getSectionDefinition } from '@/lib/sectionRegistry';
import { Check } from 'lucide-react';

interface VariantPickerProps {
  section: Section;
  onVariantChange: (variantName: string) => void;
}

export function VariantPicker({ section, onVariantChange }: VariantPickerProps) {
  const definition = getSectionDefinition(section.type);
  
  if (!definition || definition.variants.length <= 1) {
    return null;
  }

  return (
    <div className="mb-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
        Layout Style
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {definition.variants.map((variant) => (
          <button
            key={variant.name}
            onClick={() => onVariantChange(variant.name)}
            className={`relative p-3 rounded-lg border-2 text-left transition-all ${
              section.variant === variant.name
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
            }`}
          >
            {section.variant === variant.name && (
              <div className="absolute top-2 right-2">
                <Check size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
            )}
            
            <div className="font-medium text-sm text-neutral-900 dark:text-white mb-1">
              {variant.label}
            </div>
            
            {variant.description && (
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                {variant.description}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
