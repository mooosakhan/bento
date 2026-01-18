import React from 'react';
import { Block } from '@/types';
import { HeaderBlockRenderer } from './HeaderBlock';
import { LinkBlockRenderer } from './LinkBlock';
import { GalleryBlockRenderer } from './GalleryBlock';
import { CardBlockRenderer } from './CardBlock';
import { DividerBlockRenderer } from './DividerBlock';
import { SocialRowBlockRenderer } from './SocialRowBlock';
import { SectionHeaderBlockRenderer } from './SectionHeaderBlock';
import { SkillsBlockRenderer } from './SkillsBlock';
import { ExperienceBlockRenderer } from './ExperienceBlock';
import { ProjectsBlockRenderer } from './ProjectsBlock';

interface BlockRendererProps {
  block: Block;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'header':
      return <HeaderBlockRenderer props={block.props} />;
    case 'link':
      return <LinkBlockRenderer props={block.props} />;
    case 'gallery':
      return <GalleryBlockRenderer props={block.props} />;
    case 'card':
      return <CardBlockRenderer props={block.props} />;
    case 'divider':
      return <DividerBlockRenderer props={block.props} />;
    case 'socialRow':
      return <SocialRowBlockRenderer props={block.props} />;
    case 'sectionHeader':
      return <SectionHeaderBlockRenderer props={block.props} />;
    case 'skills':
      return <SkillsBlockRenderer props={block.props} />;
    case 'experience':
      return <ExperienceBlockRenderer props={block.props} />;
    case 'projects':
      return <ProjectsBlockRenderer props={block.props} />;
    default:
      return <div>Unknown block type</div>;
  }
}
