import React from 'react';
import { Block } from '@/types';
import { Textarea } from '@/components/ui/Textarea';

interface GalleryEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

export function GalleryEditor({ selectedBlock, onUpdateBlock }: GalleryEditorProps) {
  const handlePropChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.id, {
      ...selectedBlock.props,
      [key]: value,
    });
  };

  const handleImageListChange = (value: string) => {
    const images = value.split('\n').filter(url => url.trim());
    handlePropChange('images', images);
  };

  const imageList = (selectedBlock.props.images || []).join('\n');

  return (
    <div className="space-y-4">
      {/* ===== CONTENT ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Images
        </h3>
        
        <Textarea
          label="Image URLs (one per line)"
          value={imageList}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleImageListChange(e.target.value)}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
          rows={6}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== LAYOUT ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Layout
        </h3>

      <div>
        <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
          <span>Columns</span>
          <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.columns || 3}</span>
        </label>
        <input
          type="range"
          min="1"
          max="6"
          value={selectedBlock.props.columns || 3}
          onChange={(e) => handlePropChange('columns', parseInt(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
        />
      </div>

      <div>
        <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
          <span>Gap</span>
          <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.gap || 16}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="48"
          value={selectedBlock.props.gap || 16}
          onChange={(e) => handlePropChange('gap', parseInt(e.target.value))}
          className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
        />
      </div>

      <div>
        <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
          <span>Border Radius</span>
          <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.borderRadius || 8}px</span>
        </label>
        <input
          type="range"
          min="0"
          max="24"
          value={selectedBlock.props.borderRadius || 8}
          onChange={(e) => handlePropChange('borderRadius', parseInt(e.target.value))}
          className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
        />
        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          <span>0px (Square)</span>
          <span>24px (Rounded)</span>
        </div>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {selectedBlock.props.images?.length || 0} image(s) added
      </p>
    </div>
    </div>
  );
}
