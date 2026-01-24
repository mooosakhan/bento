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
import { NavbarBlockRenderer } from './NavbarBlock';

interface BlockRendererProps {
  block: Block;
  theme: any;
}

export function BlockRenderer({ block, theme }: BlockRendererProps & { theme: any }) {
  switch (block.type) {
    case 'header':
      return <HeaderBlockRenderer  props={block.props}  />;
    case 'link':
      return <LinkBlockRenderer props={block.props}  />;
    case 'gallery':
      return <GalleryBlockRenderer props={block.props}  />;
    case 'card':
      return <CardBlockRenderer props={block.props}  />;
    case 'divider':
      return <DividerBlockRenderer props={block.props}  />;
    case 'socialRow':
      return <SocialRowBlockRenderer props={block.props}  />;
    case 'sectionHeader':
      return <SectionHeaderBlockRenderer props={block.props}  />;
    case 'skills':
      return <SkillsBlockRenderer props={block.props} theme={theme} />;
    case 'experience':
      return <ExperienceBlockRenderer props={block.props} theme={theme} />;
    case 'projects':
      return <ProjectsBlockRenderer props={block.props} theme={theme} />;
    case 'navbar':
      return <NavbarBlockRenderer props={block.props} />;
    default:
      return <div>Unknown block type</div>;
  }
}
