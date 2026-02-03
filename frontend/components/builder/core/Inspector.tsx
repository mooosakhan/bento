import React from 'react';
import { Block, Profile } from '@/types';
import { getBlockDefinition } from '@/lib/blockRegistry';
import { X } from 'lucide-react';
import { SkillsEditor } from '../editors/skills/SkillsEditor';
import { ExperienceEditor } from '../editors/experience/ExperienceEditor';
import { ProjectsEditor } from '../editors/projects/ProjectsEditor';
import { HeaderEditor } from '../editors/header/HeaderEditor';
import { SectionHeaderEditor } from '../editors/section-header/SectionHeaderEditor';
import { CardEditor } from '../editors/card/CardEditor';
import { DividerEditor } from '../editors/divider/DividerEditor';
import { SocialRowEditor } from '../editors/social-row/SocialRowEditor';
import { LinkEditor } from '../editors/link/LinkEditor';
import { GalleryEditor } from '../editors/gallery/GalleryEditor';
import { NavbarEditor } from '../editors/navbar/NavbarEditor';
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
  if (!selectedBlock) {
    return (
      <div className="h-full bg-white dark:bg-[#111010]">
        {/* Page Structure Panel */}
        <div className="p-2 dark:bg-[#111010] ">
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
            <h3 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
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

  return (
    <div className="h-full  flex flex-col px-3 bg-white dark:bg-[#111010]">
      <div className="p-6 px-3 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#121111]">
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
          <Button className='bg-neutral-900 dark:bg-[#333333] rounded-md mt-1 cursor-pointer h-7 w-7 text-white hover:bg-[#333333]   font-bold transition-colors flex justify-center items-center' onClick={onDeselectBlock}>
            <X className='w-7 h-7 mx-1 text-neutral-400 hover:text-neutral-100' />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-light scrollbar-dark  scrollbar-light scrollbar-dark p-3 space-y-5 bg-white dark:bg-[#111010] scrollbar-hidden">

        {/* Block-specific editors */}
        {selectedBlock.type === 'header' && (
          <HeaderEditor selectedBlock={selectedBlock} onUpdateBlock={onUpdateBlock} />
        )}
        
        {selectedBlock.type === 'navbar' && (
          <NavbarEditor selectedBlock={selectedBlock} onUpdateBlock={onUpdateBlock} />
        )}

        {selectedBlock.type === 'sectionHeader' && (
          <SectionHeaderEditor selectedBlock={selectedBlock} onUpdateBlock={onUpdateBlock} />
        )}

        {selectedBlock.type === 'skills' && (
          <SkillsEditor 
            skills={selectedBlock.props.skills || []} 
            onChange={(skills) => handlePropChange('skills', skills)} 
          />
        )}

        {selectedBlock.type === 'experience' && (
          <ExperienceEditor 
            items={selectedBlock.props.experience || []} 
            onChange={(experience) => handlePropChange('experience', experience)} 
          />
        )}

        {selectedBlock.type === 'projects' && (
          <ProjectsEditor 
            projects={selectedBlock.props.projects || []} 
            onChange={(projects) => handlePropChange('projects', projects)} 
          />
        )}

        {selectedBlock.type === 'card' && (
          <CardEditor selectedBlock={selectedBlock} onUpdateBlock={onUpdateBlock} />
        )}

        {selectedBlock.type === 'divider' && (
          <DividerEditor selectedBlock={selectedBlock} onUpdateBlock={onUpdateBlock} />
        )}

        {selectedBlock.type === 'socialRow' && (
          <SocialRowEditor selectedBlock={selectedBlock} onUpdateBlock={onUpdateBlock} />
        )}

        {selectedBlock.type === 'link' && (
          <LinkEditor selectedBlock={selectedBlock} onUpdateBlock={onUpdateBlock} />
        )}

        {selectedBlock.type === 'gallery' && (
          <GalleryEditor selectedBlock={selectedBlock} onUpdateBlock={onUpdateBlock} />
        )}
      </div>
    </div>
  );
}
