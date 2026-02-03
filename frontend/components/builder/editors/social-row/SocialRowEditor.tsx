import React from 'react';
import { Block } from '@/types';
import { Input } from '@/components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialRowEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export function SocialRowEditor({ selectedBlock, onUpdateBlock }: SocialRowEditorProps) {
  const handlePropChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.id, {
      ...selectedBlock.props,
      [key]: value,
    });
  };

  const socialLinks: SocialLink[] = selectedBlock.props.links || [];

  const addSocialLink = () => {
    const newLinks = [...socialLinks, { platform: 'GitHub', url: '', icon: 'github' }];
    handlePropChange('links', newLinks);
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    handlePropChange('links', newLinks);
  };

  const removeSocialLink = (index: number) => {
    const newLinks = socialLinks.filter((_, i) => i !== index);
    handlePropChange('links', newLinks);
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

      <div>
        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Icon Size: {selectedBlock.props.iconSize || 24}px
        </label>
        <input
          type="range"
          min="16"
          max="48"
          value={selectedBlock.props.iconSize || 24}
          onChange={(e) => handlePropChange('iconSize', parseInt(e.target.value))}
          className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
        />
        <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          <span>16px</span>
          <span>48px</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Social Links
          </label>
          <Button
            onClick={addSocialLink}
            className="h-7 px-2 text-xs bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Link
          </Button>
        </div>

        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <div key={index} className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Link {index + 1}
                </span>
                <button
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Input
                label="Platform"
                value={link.platform}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocialLink(index, 'platform', e.target.value)}
                placeholder="GitHub, Twitter, LinkedIn..."
              />
              <Input
                label="URL"
                value={link.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocialLink(index, 'url', e.target.value)}
                placeholder="https://..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
}
