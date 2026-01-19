export interface Profile {
  handle: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: Theme;
  blocks: Block[];
  portfolioMeta?: {
    title?: string;
    tagline?: string;
  };
}

export interface Theme {
  mode: 'light' | 'dark' | 'system';
  background: string;
  cardStyle: 'default' | 'outlined' | 'filled';
  accentColor: string;
  fontScale: number;
}

export interface Block {
  id: string;
  type: BlockType;
  props: any;
  order: number;
}

export type BlockType = 
  | 'header' 
  | 'link' 
  | 'gallery' 
  | 'card' 
  | 'divider' 
  | 'socialRow'
  | 'sectionHeader'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'navbar';

// Block-specific prop types
export interface HeaderBlockProps {
  displayName: string;
  bio: string;
  avatarUrl: string;
  location?: string;
}

export interface LinkBlockProps {
  title: string;
  url: string;
  icon?: string;
  style: 'button' | 'plain';
}

export interface GalleryBlockProps {
  images: string[];
}

export interface CardBlockProps {
  title: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface DividerBlockProps {
  style: 'solid' | 'dashed' | 'dotted';
}

export interface SocialRowBlockProps {
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export interface SectionHeaderBlockProps {
  title: string;
  subtitle?: string;
}

export interface Skill {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SkillsBlockProps {
  skills: Skill[];
  layout: 'chips' | 'grid';
}

export interface ExperienceItem {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface ExperienceBlockProps {
  items: ExperienceItem[];
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  techStack?: string[];
  link?: string;
}

export interface ProjectsBlockProps {
  projects: Project[];
}

export interface NavbarBlockProps {
  brandText?: string;
  logoUrl?: string;
  showSearch: boolean;
  style: 'transparent' | 'blur' | 'filled';
  showHome: boolean;
  homeLabel: string;
  homeHref: string;
  showAbout: boolean;
  aboutLabel: string;
  aboutHref: string;
  showWork: boolean;
  workLabel: string;
  workHref: string;
  showContact: boolean;
  contactLabel: string;
  contactHref: string;
}

// Inspector field configuration
export interface InspectorField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'select' | 'toggle' | 'image-list' | 'skills-editor' | 'experience-editor' | 'projects-editor';
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// Block registry entry
export interface BlockDefinition {
  type: BlockType;
  label: string;
  icon: string;
  defaultProps: any;
  inspectorFields: InspectorField[];
}

// History for undo/redo
export interface HistoryState {
  blocks: Block[];
  timestamp: number;
}
