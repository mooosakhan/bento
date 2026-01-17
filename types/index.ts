export interface Profile {
  handle: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: Theme;
  blocks: Block[];
}

export interface Theme {
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
  | 'socialRow';

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

// Inspector field configuration
export interface InspectorField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'select' | 'toggle' | 'image-list';
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
