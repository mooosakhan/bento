import React, { useState } from 'react';
import { Block, InspectorField } from '@/types';
import { getBlockDefinition } from '@/lib/blockRegistry';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Trash2, Copy, Image as ImageIcon, Pencil } from 'lucide-react';
import { AvatarPickerModal } from './AvatarPickerModal';
import { SkillsEditor } from './SkillsEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { ProjectsEditor } from './ProjectsEditor';

interface InspectorProps {
  selectedBlock: Block | null;
  onUpdateBlock: (blockId: string, props: any) => void;
  onDeleteBlock: (blockId: string) => void;
  onDuplicateBlock: (blockId: string) => void;
}

export function Inspector({ 
  selectedBlock, 
  onUpdateBlock, 
  onDeleteBlock,
  onDuplicateBlock 
}: InspectorProps) {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  if (!selectedBlock) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8 bg-white dark:bg-neutral-900" >
        <div className="max-w-xs">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No Block Selected</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Click on any block in the canvas to edit its properties
          </p>
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
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
        <div className="flex items-center gap-3">
          {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center">
            <span className="text-white text-sm font-bold">{definition.label.charAt(0)}</span>
          </div> */}
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {definition.label} Block
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Edit properties below
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-light scrollbar-dark  scrollbar-light scrollbar-dark p-6 space-y-5 bg-white dark:bg-neutral-900">
        {/* Avatar Picker for Header Block */}
        {selectedBlock.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Avatar
            </label>
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="relative group w-20 h-20 rounded-full overflow-hidden border-4 border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
            >
              <img
                src={selectedBlock.props.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              {/* Pencil Icon Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="w-6 h-6 text-white" />
              </div>
            </button>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Click to change avatar
            </p>
          </div>
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
