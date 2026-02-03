import React, { useState } from 'react';
import { Block } from '@/types';
import { Toggle } from '@/components/ui/Toggle';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Pencil } from 'lucide-react';
import { AvatarPickerModal } from '../../avatar/AvatarPickerModal';
import { ChipLogoEditor } from '../shared/ChipLogoEditor';

interface HeaderEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

export function HeaderEditor({ selectedBlock, onUpdateBlock }: HeaderEditorProps) {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

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
          label="Display Name"
          value={selectedBlock.props.displayName || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('displayName', e.target.value)}
          placeholder="Your Name"
        />

        <Textarea
          label="Bio"
          value={selectedBlock.props.bio || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handlePropChange('bio', e.target.value)}
          placeholder="Tell the world about yourself"
          rows={3}
        />

        <Input
          label="Location"
          value={selectedBlock.props.location || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePropChange('location', e.target.value)}
          placeholder="City, Country"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== AVATAR ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Avatar
        </h3>

        {/* Avatar Preview */}
        <button
          onClick={() => setShowAvatarPicker(true)}
          className="relative group w-16 h-16 overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all mx-auto"
          style={{
            borderRadius: `${selectedBlock.props.avatarRoundness || 100}%`,
            backgroundColor: (selectedBlock.props.useAvatarBg ?? (selectedBlock.props.avatarBgColor ? true : false)) ? (selectedBlock.props.avatarBgColor || '#ffffff') : 'transparent',
            boxShadow: selectedBlock.props.avatarShadow ? '0 4px 12px rgba(15,23,42,0.1)' : 'none'
          }}
        >
          <img
            src={selectedBlock.props.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Pencil className="w-4 h-4 text-white" />
          </div>
        </button>

       

        {/* Avatar Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Background</span>
            <Toggle
              checked={selectedBlock.props.useAvatarBg ?? (selectedBlock.props.avatarBgColor ? true : false)}
              onChange={(v) => handlePropChange('useAvatarBg', v)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Shadow</span>
            <Toggle
              checked={selectedBlock.props.avatarShadow ?? false}
              onChange={(v) => handlePropChange('avatarShadow', v)}
            />
          </div>
        </div>

        {/* Avatar Background Color */}
        <ColorPicker
          label="Background Color"
          value={selectedBlock.props.avatarBgColor || '#ffffff'}
          onChange={(color) => handlePropChange('avatarBgColor', color)}
          showTransparent={true}
        />

        {/* Avatar Size & Roundness - Compact */}
        <div className="space-y-2">
          <div>
            <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Size</span>
              <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.avatarSize || 96}px</span>
            </label>
            <input
              type="range"
              min="40"
              max="200"
              value={selectedBlock.props.avatarSize || 96}
              onChange={(e) => handlePropChange('avatarSize', parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Roundness</span>
              <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.avatarRoundness || 100}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={selectedBlock.props.avatarRoundness || 100}
              onChange={(e) => handlePropChange('avatarRoundness', parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== LAYOUT ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Layout
        </h3>
      {/* ===== LAYOUT ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Layout
        </h3>

        <div>
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Alignment
          </label>
          <div className="flex gap-2">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => handlePropChange('contentAlignment', align)}
                className={`flex-1 px-2 py-1.5 rounded-lg font-medium text-xs transition-all ${(selectedBlock.props.contentAlignment || 'left') === align
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
              >
                {align.charAt(0).toUpperCase() + align.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Spacing Controls - Compact */}
        <div className="space-y-2">
          <div>
            <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Avatar Gap</span>
              <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.avatarToContentGap !== undefined ? selectedBlock.props.avatarToContentGap : 28}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="80"
              value={selectedBlock.props.avatarToContentGap !== undefined ? selectedBlock.props.avatarToContentGap : 28}
              onChange={(e) => handlePropChange('avatarToContentGap', parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Content Gap</span>
              <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.contentItemsGap !== undefined ? selectedBlock.props.contentItemsGap : 20}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={selectedBlock.props.contentItemsGap !== undefined ? selectedBlock.props.contentItemsGap : 20}
              onChange={(e) => handlePropChange('contentItemsGap', parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== TYPOGRAPHY ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Typography
        </h3>

        <div className="space-y-2">
          <div>
            <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Name Size</span>
              <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.nameFontSize || 36}px</span>
            </label>
            <input
              type="range"
              min="16"
              max="72"
              value={selectedBlock.props.nameFontSize || 36}
              onChange={(e) => handlePropChange('nameFontSize', parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Bio Size</span>
              <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.bioFontSize || 18}px</span>
            </label>
            <input
              type="range"
              min="12"
              max="32"
              value={selectedBlock.props.bioFontSize || 18}
              onChange={(e) => handlePropChange('bioFontSize', parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
              <span>Bio Line Height</span>
              <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.bioLineHeight !== undefined ? selectedBlock.props.bioLineHeight.toFixed(1) : '1.6'}</span>
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={selectedBlock.props.bioLineHeight !== undefined ? selectedBlock.props.bioLineHeight : 1.56}
              onChange={(e) => handlePropChange('bioLineHeight', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
          </div>
        </div>
      </div>

      {/* Chip Logo Editor - only show if bio exists */}
      {selectedBlock.props.bio && (
        <>
          {/* Divider */}
          <div className="border-t border-neutral-200 dark:border-neutral-800"></div>
          
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
              Bio Chips
            </h3>
            <ChipLogoEditor
              bio={selectedBlock.props.bio}
              chipLogos={selectedBlock.props.chipLogos || {}}
              onChipLogosChange={(chipLogos) => handlePropChange('chipLogos', chipLogos)}
            />
          </div>
        </>
      )}

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <AvatarPickerModal
          currentAvatar={selectedBlock.props.avatarUrl || ''}
          onSelect={(avatarData) => {
            handlePropChange('avatarUrl', avatarData.value);
            setShowAvatarPicker(false);
          }}
          onClose={() => setShowAvatarPicker(false)}
        />
      )}
    </div>
    </div>
  );
}
