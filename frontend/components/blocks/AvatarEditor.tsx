import React from 'react';
import { Block } from '@/types';
import { Toggle } from '@/components/ui/Toggle';

interface AvatarEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ selectedBlock, onUpdateBlock }) => {
  const handlePropChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.id, { ...selectedBlock.props, [key]: value });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Avatar</label>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-600 dark:text-neutral-400">Show background</div>
          <Toggle
            checked={selectedBlock.props.useAvatarBg ?? (selectedBlock.props.avatarBgColor ? true : false)}
            onChange={(v) => handlePropChange('useAvatarBg', v)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-600 dark:text-neutral-400">Use shadow</div>
          <Toggle
            checked={selectedBlock.props.avatarShadow ?? false}
            onChange={(v) => handlePropChange('avatarShadow', v)}
          />
        </div>
        <button
          onClick={() => {} /* Open Avatar Picker */}
          className="relative group w-20 h-20 overflow-hidden border-4 border-neutral-200 dark:border-neutral-700"
        >
          <img
            src={selectedBlock.props.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
  );
};
