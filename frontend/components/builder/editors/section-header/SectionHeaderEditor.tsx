import React from 'react';
import { Block } from '@/types';
import { Input } from '@/components/ui/Input';

interface SectionHeaderEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

export function SectionHeaderEditor({ selectedBlock, onUpdateBlock }: SectionHeaderEditorProps) {
  const handlePropChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.id, {
      ...selectedBlock.props,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* ===== CONTENT ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Content
        </h3>
        
        <Input
          label="Title"
          value={selectedBlock.props.title || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('title', e.target.value)}
          placeholder="Section Title"
        />

        <Input
          label="Subtitle"
          value={selectedBlock.props.subtitle || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('subtitle', e.target.value)}
          placeholder="Optional subtitle"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== STYLE ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Style
        </h3>

      <div>
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Alignment
        </label>
        <div className="flex gap-2">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              onClick={() => handlePropChange('alignment', align)}
              className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                (selectedBlock.props.alignment || 'left') === align
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
          <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
            <span>Font Size</span>
            <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.fontSize || 24}px</span>
          </label>
          <input
            type="range"
            min="16"
            max="48"
            value={selectedBlock.props.fontSize || 24}
            onChange={(e) => handlePropChange('fontSize', parseInt(e.target.value))}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
          />
        </div>
      </div>
    </div>
  );
}
