import React, { useState } from 'react';
import { Block, InspectorField, Profile } from '@/types';
import { getBlockDefinition } from '@/lib/blockRegistry';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';

import { Trash2, Copy, Image as ImageIcon, Pencil, Backpack, MoveLeftIcon, ArrowLeftFromLine, X } from 'lucide-react';
import { AvatarPickerModal } from './AvatarPickerModal';
import { SkillsEditor } from './SkillsEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { ChipLogoEditor } from './ChipLogoEditor';
import { PageStructurePanel } from './PageStructurePanel';
import { Button } from '@/components/ui/button';

interface InspectorProps {
  selectedBlock: Block | null;
  onUpdateBlock: (blockId: string, props: any) => void;
  onDeleteBlock: (blockId: string) => void;
  onDuplicateBlock: (blockId: string) => void;
  onDeselectBlock: () => void;
  onUpdateBlockMeta: (blockId: string, updates: Partial<Block>) => void;
  profile: Profile;
  onUpdateProfile: (profile: Profile) => void;
}

export function Inspector({
  selectedBlock,
  onUpdateBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onDeselectBlock,
  onUpdateBlockMeta,
  profile,
  onUpdateProfile
}: InspectorProps) {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  if (!selectedBlock) {
    return (
      <div className="h-full bg-white dark:bg-[#111010]">
        {/* Page Structure Panel */}
        <div className="p-4 dark:bg-[#111010] ">
          <PageStructurePanel
            blocks={profile.blocks}
            selectedBlockId={null}
            onSelectBlock={(blockId) => {
              // This will be handled by the builder page
              const event = new CustomEvent('selectBlock', { detail: blockId });
              window.dispatchEvent(event);
            }}
            onUpdateBlock={onUpdateBlockMeta}
          />
        </div>

        {/* Section Gap Control */}
        <div className="p-4 border-t z-99 border-neutral-200 dark:border-[#2a2b2a] dark:bg-[#111010]">
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Page Settings
            </h3>

            <div>
              <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                Section Gap
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={profile.sectionGap || 16}
                  onChange={(e) => onUpdateProfile({ ...profile, sectionGap: Number(e.target.value) })}
                  className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neutral-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 w-12 text-right">
                  {profile.sectionGap || 0}px
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5">
                Space between all sections
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }

  const definition = getBlockDefinition(selectedBlock.type);

  const handlePropChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.id, {
      ...selectedBlock.props,
      [key]: value,
    });
  };

  const handleImageListChange = (value: string) => {
    const images = value.split('\n').filter(url => url.trim());
    onUpdateBlock(selectedBlock.id, {
      ...selectedBlock.props,
      images,
    });
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-neutral-900">
      <div className="p-6 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121111]">

        <div className="flex items-center gap-3">
          <div className='flex gap-2 justify-between w-full'>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                {definition.label} Block
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Edit properties below
              </p>
            </div>

          </div>
          <button className='bg-neutral-900 dark:bg-[#333333] rounded-md mt-1 cursor-pointer h-7 w-7 text-white hover:bg-[#333333]   font-bold transition-colors flex justify-center items-center' onClick={onDeselectBlock}>
            <X className='w-7 h-7 mx-1 text-neutral-400 hover:text-neutral-100' />
          </button>
        </div>
      </div>
      <div className="px-2 mx-4 h-px bg-neutral-800" />


      <div className="flex-1 overflow-y-auto scrollbar-light scrollbar-dark  scrollbar-light scrollbar-dark p-6 space-y-5 bg-white dark:bg-[#121111]">
        {/* Avatar Picker for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Avatar
            </label>

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
                onClick={() => setShowAvatarPicker(true)}
                className="relative group w-20 h-20 overflow-hidden border-4 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
                style={{
                  borderRadius: `${selectedBlock.props.avatarRoundness || 100}%`,
                  backgroundColor: (selectedBlock.props.useAvatarBg ?? (selectedBlock.props.avatarBgColor ? true : false)) ? (selectedBlock.props.avatarBgColor || '#ffffff') : 'transparent',
                  boxShadow: selectedBlock.props.avatarShadow ? '0 6px 18px rgba(15,23,42,0.12)' : 'none'
                }}
              >
                <img
                  src={selectedBlock.props.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-6 h-6 text-white" />
                </div>
              </button>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                Click to change avatar
              </p>
            </div>
          </div>
        )}

        {/* Avatar Background Color for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Avatar Background Color
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={selectedBlock.props.avatarBgColor || '#ffffff'}
                onChange={(e) => handlePropChange('avatarBgColor', e.target.value)}
                className="w-12 h-12 rounded border-2 border-neutral-300 dark:border-neutral-600 cursor-pointer"
              />
              <input
                type="text"
                value={selectedBlock.props.avatarBgColor || '#ffffff'}
                onChange={(e) => handlePropChange('avatarBgColor', e.target.value)}
                placeholder="#ffffff"
                className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white font-mono text-sm"
              />
            </div>
          </div>
        )}

        {/* Avatar Roundness for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Avatar Roundness: {selectedBlock.props.avatarRoundness || 100}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={selectedBlock.props.avatarRoundness || 100}
              onChange={(e) => handlePropChange('avatarRoundness', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>0% (Square)</span>
              <span>100% (Circle)</span>
            </div>
          </div>
        )}

        {/* Avatar Size for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Avatar Size: {selectedBlock.props.avatarSize || 96}px
            </label>
            <input
              type="range"
              min="40"
              max="200"
              value={selectedBlock.props.avatarSize || 96}
              onChange={(e) => handlePropChange('avatarSize', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>40px</span>
              <span>200px</span>
            </div>
          </div>
        )}

        {/* Content Alignment for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Content Alignment
            </label>
            <div className="flex gap-2">
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  onClick={() => handlePropChange('contentAlignment', align)}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${(selectedBlock.props.contentAlignment || 'left') === align
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Avatar to Content Gap for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Avatar to Content Gap: {selectedBlock.props.avatarToContentGap !== undefined ? selectedBlock.props.avatarToContentGap : 28}px
            </label>
            <input
              type="range"
              min="0"
              max="80"
              value={selectedBlock.props.avatarToContentGap !== undefined ? selectedBlock.props.avatarToContentGap : 28}
              onChange={(e) => handlePropChange('avatarToContentGap', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>0px</span>
              <span>80px</span>
            </div>
          </div>
        )}

        {/* Content Items Gap for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Content Items Gap: {selectedBlock.props.contentItemsGap !== undefined ? selectedBlock.props.contentItemsGap : 20}px
            </label>
            <input
              type="range"
              min="0"
              max="60"
              value={selectedBlock.props.contentItemsGap !== undefined ? selectedBlock.props.contentItemsGap : 20}
              onChange={(e) => handlePropChange('contentItemsGap', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>0px</span>
              <span>60px</span>
            </div>
          </div>
        )}

        {/* Name Font Size for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Name Font Size: {selectedBlock.props.nameFontSize || 36}px
            </label>
            <input
              type="range"
              min="16"
              max="72"
              value={selectedBlock.props.nameFontSize || 36}
              onChange={(e) => handlePropChange('nameFontSize', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>16px</span>
              <span>72px</span>
            </div>
          </div>
        )}

        {/* Bio Font Size for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Bio Font Size: {selectedBlock.props.bioFontSize || 18}px
            </label>
            <input
              type="range"
              min="12"
              max="32"
              value={selectedBlock.props.bioFontSize || 18}
              onChange={(e) => handlePropChange('bioFontSize', parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>12px</span>
              <span>32px</span>
            </div>
          </div>
        )}

        {/* Bio Line Height for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Bio Line Height: {selectedBlock.props.bioLineHeight !== undefined ? selectedBlock.props.bioLineHeight.toFixed(2) : '1.56'}
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={selectedBlock.props.bioLineHeight !== undefined ? selectedBlock.props.bioLineHeight : 1.56}
              onChange={(e) => handlePropChange('bioLineHeight', parseFloat(e.target.value))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
            />
            <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>1.0 (Tight)</span>
              <span>3.0 (Loose)</span>
            </div>
          </div>
        )}

        {/* Logo Customization for Navbar Block */}
        {selectedBlock.type === 'navbar' && selectedBlock.props.logoUrl && (
          <>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Logo Background Color
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={selectedBlock.props.logoBgColor || '#ffffff'}
                  onChange={(e) => handlePropChange('logoBgColor', e.target.value)}
                  className="w-12 h-12 rounded border-2 border-neutral-300 dark:border-neutral-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedBlock.props.logoBgColor || '#ffffff'}
                  onChange={(e) => handlePropChange('logoBgColor', e.target.value)}
                  placeholder="transparent"
                  className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Logo Roundness: {selectedBlock.props.logoRoundness !== undefined ? selectedBlock.props.logoRoundness : 8}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={selectedBlock.props.logoRoundness !== undefined ? selectedBlock.props.logoRoundness : 8}
                onChange={(e) => handlePropChange('logoRoundness', parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
              />
              <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                <span>0% (Square)</span>
                <span>100% (Circle)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Logo Size: {selectedBlock.props.logoSize || 40}px
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={selectedBlock.props.logoSize || 40}
                onChange={(e) => handlePropChange('logoSize', parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
              />
              <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                <span>20px</span>
                <span>100px</span>
              </div>
            </div>

          </>
        )}




        {definition.inspectorFields.map((field) => (
          <InspectorFieldRenderer
            key={field.key}
            field={field}
            value={selectedBlock.props[field.key]}
            onChange={(value) => handlePropChange(field.key, value)}
            onImageListChange={handleImageListChange}
          />
        ))}

        {/* Chip Logo Editor for Header Block */}
        {selectedBlock.type === 'header' && selectedBlock.props.bio && (
          <ChipLogoEditor
            bio={selectedBlock.props.bio}
            chipLogos={selectedBlock.props.chipLogos || {}}
            onChipLogosChange={(chipLogos) => handlePropChange('chipLogos', chipLogos)}
          />
        )}
      </div>

      <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onDuplicateBlock(selectedBlock.id)}
        >
          <Copy className="w-4 h-4 mr-2" />
          Duplicate Block
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onDeleteBlock(selectedBlock.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Block
        </Button>
      </div>

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
  );
}

interface InspectorFieldRendererProps {
  field: InspectorField;
  value: any;
  onChange: (value: any) => void;
  onImageListChange: (value: string) => void;
}

function InspectorFieldRenderer({
  field,
  value,
  onChange,
  onImageListChange
}: InspectorFieldRendererProps) {
  switch (field.type) {
    case 'text':
    case 'url':
      return (
        <Input
          label={field.label}
          type={field.type === 'url' ? 'url' : 'text'}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );

    case 'textarea':
      return (
        <Textarea
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      );

    case 'select':
      return (
        <Select
          label={field.label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          options={field.options || []}
        />
      );

    case 'image-list':
      return (
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            {field.label}
          </label>
          <Textarea
            value={Array.isArray(value) ? value.join('\n') : ''}
            onChange={(e) => onImageListChange(e.target.value)}
            placeholder="Enter image URLs (one per line)"
            rows={5}
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Enter one URL per line
          </p>
        </div>
      );

    case 'skills-editor':
      return (
        <SkillsEditor
          skills={value || []}
          onChange={onChange}
        />
      );

    case 'experience-editor':
      return (
        <ExperienceEditor
          items={value || []}
          onChange={onChange}
        />
      );

    case 'projects-editor':
      return (
        <ProjectsEditor
          projects={value || []}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}
