import React from 'react';
import { Block } from '@/types';
import { Input } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';

interface LinkEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

export function LinkEditor({ selectedBlock, onUpdateBlock }: LinkEditorProps) {
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
          label="Text"
          value={selectedBlock.props.text || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('text', e.target.value)}
          placeholder="Link text"
        />

        <Input
          label="URL"
          value={selectedBlock.props.url || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('url', e.target.value)}
          placeholder="https://..."
        />

        <Input
          label="Icon URL (optional)"
          value={selectedBlock.props.iconUrl || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('iconUrl', e.target.value)}
          placeholder="https://..."
        />

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Open in New Tab
          </label>
          <Toggle
            checked={selectedBlock.props.newTab ?? true}
            onChange={(v) => handlePropChange('newTab', v)}
          />
        </div>
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
          Style
        </label>
        <div className="flex gap-2">
          {['button', 'text', 'outlined'].map((style) => (
            <button
              key={style}
              onClick={() => handlePropChange('style', style)}
              className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all ${(selectedBlock.props.style || 'button') === style
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
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Alignment
        </label>
        <div className="flex gap-2">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              onClick={() => handlePropChange('alignment', align)}
              className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all ${(selectedBlock.props.alignment || 'left') === align
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
