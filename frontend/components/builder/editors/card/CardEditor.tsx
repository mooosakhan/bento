import React from 'react';
import { Block } from '@/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface CardEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

export function CardEditor({ selectedBlock, onUpdateBlock }: CardEditorProps) {
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
          placeholder="Card Title"
        />

        <Textarea
          label="Description"
          value={selectedBlock.props.description || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handlePropChange('description', e.target.value)}
          placeholder="Card description"
          rows={3}
        />

        <Input
          label="Image URL"
          value={selectedBlock.props.imageUrl || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('imageUrl', e.target.value)}
          placeholder="https://..."
        />

        <Input
          label="Link URL"
          value={selectedBlock.props.link || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('link', e.target.value)}
          placeholder="https://..."
        />

        <Input
          label="Button Text"
          value={selectedBlock.props.buttonText || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('buttonText', e.target.value)}
          placeholder="Learn More"
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
          Card Style
        </label>
        <div className="flex gap-2">
          {['outlined', 'filled', 'elevated'].map((style) => (
            <button
              key={style}
              onClick={() => handlePropChange('cardStyle', style)}
              className={`flex-1 px-3 py-2 rounded-lg font-medium text-xs transition-all ${(selectedBlock.props.cardStyle || 'outlined') === style
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>      </div>    </div>
  );
}
