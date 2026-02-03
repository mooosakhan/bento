import React from 'react';
import { Block } from '@/types';
import { ColorPicker } from '@/components/ui/ColorPicker';

interface DividerEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

export function DividerEditor({ selectedBlock, onUpdateBlock }: DividerEditorProps) {
  const handlePropChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.id, {
      ...selectedBlock.props,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* ===== STYLE ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Style
        </h3>

      <div>
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Style
        </label>
        <div className="flex gap-2">
          {['solid', 'dashed', 'dotted'].map((style) => (
            <button
              key={style}
              onClick={() => handlePropChange('style', style)}
              className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all ${
                (selectedBlock.props.style || 'solid') === style
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
          <span>Thickness</span>
          <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.thickness || 1}px</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={selectedBlock.props.thickness || 1}
          onChange={(e) => handlePropChange('thickness', parseInt(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
        />
      </div>

      <ColorPicker
        label="Color"
        value={selectedBlock.props.color || '#e5e7eb'}
        onChange={(color) => handlePropChange('color', color)}
        showTransparent={false}
      />
    </div>
  </div>
  );
}
