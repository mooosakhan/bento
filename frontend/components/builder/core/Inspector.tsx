import React from 'react';
import { Block, Profile } from '@/types';
import { getBlockDefinition } from '@/lib/blockRegistry';
import { X, Trash2 } from 'lucide-react';
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
            sectionGap={profile.sectionGap}
            portfolioWidth={profile.portfolioWidth}
            onUpdateSettings={(settings) => {
              onUpdateProfile({ 
                ...profile, 
                ...(settings.sectionGap !== undefined && { sectionGap: settings.sectionGap }),
                ...(settings.portfolioWidth !== undefined && { portfolioWidth: settings.portfolioWidth })
              });
            }}
          />
        </div>

        {/* Empty state message */}
        {/* <div className="px-4 pt-8 text-center text-neutral-400 dark:text-neutral-500">
          <p className="text-sm">Select a block to edit its properties</p>
        </div> */}
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
                {definition.label}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Edit properties below
              </p>
            </div>
          </div>
          <div className="flex items-center gap-">
            <Button
              className="col-span-1 h-7.5 p-0 flex items-center justify-center bg-transparent text-neutral-400 opacity-50 hover:opacity-100 hover:text-red-500 transition hover:bg-transparent"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this block?')) {
                  onDeleteBlock(selectedBlock.id);
                }
              }}
              title="Delete block"
            >
              <Trash2 className='w-4 h-4' />
            </Button>
            <Button className='bg-neutral-900 dark:bg-[#333333] rounded-md cursor-pointer h-7 w-7 text-white hover:bg-[#333333] font-bold transition-colors flex justify-center items-center' onClick={onDeselectBlock}>
              <X className='w-7 h-7 mx-1 text-neutral-400 hover:text-neutral-100' />
            </Button>
          </div>
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
            items={selectedBlock.props.items || []}
            onChange={(items) => handlePropChange('items', items)}
            showBorder={selectedBlock.props.showBorder}
            borderThickness={selectedBlock.props.borderThickness}
            borderRadius={selectedBlock.props.borderRadius}
            showShadow={selectedBlock.props.showShadow}
            paddingX={selectedBlock.props.paddingX}
            paddingY={selectedBlock.props.paddingY}
            contentAlignment={selectedBlock.props.contentAlignment}
            showLogo={selectedBlock.props.showLogo}
            showCompany={selectedBlock.props.showCompany}
            showRole={selectedBlock.props.showRole}
            showDate={selectedBlock.props.showDate}
            showDescription={selectedBlock.props.showDescription}
            showChips={selectedBlock.props.showChips}
            onPropChange={handlePropChange}
          />
        )}

        {selectedBlock.type === 'projects' && (
          <ProjectsEditor
            projects={selectedBlock.props.projects || []}
            onChange={(projects) => handlePropChange('projects', projects)}
            showBorder={selectedBlock.props.showBorder}
            borderThickness={selectedBlock.props.borderThickness}
            borderRadius={selectedBlock.props.borderRadius}
            borderColor={selectedBlock.props.borderColor}
            borderOpacity={selectedBlock.props.borderOpacity}
            showShadow={selectedBlock.props.showShadow}
            layout={selectedBlock.props.layout}
            paddingX={selectedBlock.props.paddingX}
            paddingY={selectedBlock.props.paddingY}
            buttonRoundness={selectedBlock.props.buttonRoundness}
            buttonSize={selectedBlock.props.buttonSize}
            projectButtonText={selectedBlock.props.projectButtonText}
            codeButtonText={selectedBlock.props.codeButtonText}
            showButtonIcon={selectedBlock.props.showButtonIcon}
            showIconFirst={selectedBlock.props.showIconFirst}
            chipsShowBorder={selectedBlock.props.chipsShowBorder}
            chipsBorderRadius={selectedBlock.props.chipsBorderRadius}
            chipsBorderOpacity={selectedBlock.props.chipsBorderOpacity}
            onPropChange={handlePropChange}
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
