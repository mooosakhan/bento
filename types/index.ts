// Legacy Profile (v1) - kept for migration
export interface ProfileV1 {
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

// New Portfolio structure (v2)
export interface Portfolio {
  version: 2;
  handle: string;
  profile: {
    displayName: string;
    headline?: string;
    bio?: string;
    location?: string;
    avatar?: Avatar;
    openToWork?: boolean;
    email?: string;
    phone?: string;
  };
  theme: Theme;
  sections: Section[];
}

// For backward compatibility
export type Profile = ProfileV1 | Portfolio;

export interface Avatar {
  type: 'upload' | 'url' | 'initials';
  value: string;
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
  | 'projects';

// Section-based types (v2)
export interface Section {
  id: string;
  type: SectionType;
  variant: string;
  props: Record<string, any>;
  order: number;
}

export type SectionType =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'highlights'
  | 'github'
  | 'writing'
  | 'testimonials'
  | 'contact'
  | 'cta'
  | 'custom'
  | 'now'
  | 'toolbox';

export interface SectionVariant {
  name: string;
  label: string;
  description?: string;
  defaultProps: Record<string, any>;
}

export interface SectionDefinition {
  type: SectionType;
  label: string;
  description: string;
  icon: string;
  variants: SectionVariant[];
  inspectorFields: InspectorField[];
  category: 'essentials' | 'showcase' | 'connect' | 'custom';
}

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

// Section-specific prop types
export interface HeroSectionProps {
  displayName: string;
  headline?: string;
  bio?: string;
  location?: string;
  avatar?: Avatar;
  openToWork?: boolean;
  badges?: string[];
  stats?: { label: string; value: string }[];
  socialLinks?: SocialLinks;
  ctaButtons?: { label: string; url: string; variant: 'primary' | 'secondary' }[];
}

export interface AboutSectionProps {
  title?: string;
  content: string;
  imageUrl?: string;
  highlights?: string[];
}

export interface SkillsSectionProps {
  title?: string;
  skills: Skill[];
  grouped?: boolean;
  categories?: { name: string; skills: Skill[] }[];
  showLevels?: boolean;
}

export interface ExperienceSectionProps {
  title?: string;
  items: ExperienceItem[];
}

export interface ProjectsSectionProps {
  title?: string;
  projects: Project[];
  featured?: string[]; // IDs of featured projects
}

export interface HighlightsSectionProps {
  title?: string;
  items: HighlightItem[];
}

export interface HighlightItem {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

export interface GitHubSectionProps {
  title?: string;
  username: string;
  widgets: ('streak' | 'stats' | 'activity')[];
  theme?: 'auto' | 'light' | 'dark';
}

export interface WritingSectionProps {
  title?: string;
  posts: BlogPost[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  tags?: string[];
}

export interface TestimonialsSectionProps {
  title?: string;
  testimonials: Testimonial[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  company?: string;
}

export interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLinks;
  showForm?: boolean;
}

export interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryButton?: { label: string; url: string };
  secondaryButton?: { label: string; url: string };
  style: 'centered' | 'split';
}

export interface CustomSectionProps {
  title?: string;
  subtitle?: string;
  content?: string; // Markdown
  layout: {
    containerWidth: 'normal' | 'wide' | 'full';
    columns: 1 | 2 | 3 | 4;
    spacing: 'compact' | 'comfortable' | 'spacious';
  };
  cards: CustomCard[];
}

export interface CustomCard {
  id: string;
  title: string;
  description?: string; // Markdown
  icon?: string;
  imageUrl?: string;
  link?: string;
  buttonLabel?: string;
  tags?: string[];
}

export interface NowSectionProps {
  title?: string;
  content: string; // Markdown
  lastUpdated?: string;
}

export interface ToolboxSectionProps {
  title?: string;
  tools: Tool[];
  grouped?: boolean;
  categories?: { name: string; tools: Tool[] }[];
}

export interface Tool {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  url?: string;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  email?: string;
  website?: string;
  [key: string]: string | undefined;
}


// Inspector field configuration
export interface InspectorField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'select' | 'toggle' | 'image-list' | 'skills-editor' | 'experience-editor' | 'projects-editor' | 'markdown' | 'cards-editor' | 'layout-select' | 'number' | 'color' | 'icon-picker';
  placeholder?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
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
