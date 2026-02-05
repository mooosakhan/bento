export interface Profile {
  handle: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: Theme;
  blocks: Block[];
  sectionGap?: number; // Gap between sections in pixels (default 16)
  portfolioWidth?: number; // Portfolio max width in pixels (0 = responsive, default 0)
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
  gapBefore?: number; // Gap before this block in pixels
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
  email?: string;
  chipLogos?: { [chipName: string]: string }; // Map of chip name to logo URL
  avatarBgColor?: string; // Background color for avatar
  avatarRoundness?: number; // Roundness 0-100 (0 = square, 100 = circle)
  avatarSize?: number; // Avatar size in pixels (default 96)
  mainLayoutAlignment?: 'left' | 'center' | 'right'; // Overall layout alignment including avatar (default 'left')
  contentAlignment?: 'left' | 'center' | 'right'; // Text content alignment only (default 'left')
  avatarToContentGap?: number; // Gap between avatar and content (default 28)
  contentItemsGap?: number; // Gap between content items (default 20)
  nameFontSize?: number; // Name font size (default 36)
  bioFontSize?: number; // Bio font size (default 18)
  bioLineHeight?: number; // Bio line height (default 1.56)
  avatarShadow?: boolean; // Whether to show shadow under avatar
  useAvatarBg?: boolean; // Whether to use background color for avatar
  showBio?: boolean; // Whether to show bio section
  showLocation?: boolean; // Whether to show location
  showEmail?: boolean; // Whether to show email
  showAvatar?: boolean; // Whether to show avatar
  avatarPosition?: 'top' | 'left' | 'right'; // Avatar position relative to content (default 'top')
  bioAlignment?: 'left' | 'center' | 'right'; // Bio text alignment (default follows contentAlignment)
  bioMaxWidth?: number; // Bio max width in pixels (0 = full width)
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

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SocialRowBlockProps {
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  links?: SocialLink[]; // Dynamic social links array
  alignment?: 'left' | 'center' | 'right';
  iconSize?: number;
}

export interface SectionHeaderBlockProps {
  title: string;
  subtitle?: string;
  showSubtitle?: boolean; // Whether to show subtitle
  supertext?: string; // Small text above title
  showSupertext?: boolean; // Whether to show supertext
  alignment?: 'left' | 'center' | 'right'; // Text alignment
  titleFontSize?: number; // Title font size (default 24)
  subtitleFontSize?: number; // Subtitle font size (default 14)
  supertextFontSize?: number; // Supertext font size (default 12)
  supertextGap?: number; // Gap between supertext and title (default 8)
  subtitleGap?: number; // Gap between title and subtitle (default 4)
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
  companyLogo?: string; // URL or SVG string for company logo
  logoBgColor?: string; // Background color for logo
  logoRoundness?: number; // Roundness 0-100 (0 = square, 100 = circle)
  blurCompanyTitle?: boolean; // Whether to blur the company name
  chips?: string[]; // Array of chip names (e.g., ['JavaScript', 'React', 'Node.js'])
  chipLogos?: { [chipName: string]: string }; // Map of chip name to logo URL
}

export interface ExperienceBlockProps {
  items: ExperienceItem[];
  // Border controls
  showBorder?: boolean;
  borderThickness?: number; // 1-8px
  borderRadius?: number; // 0-32px
  // Shadow control
  showShadow?: boolean;
  // Padding controls
  paddingX?: number; // 0-64px
  paddingY?: number; // 0-64px
  // Layout alignment
  contentAlignment?: 'left' | 'center' | 'right';
  // Visibility toggles
  showLogo?: boolean;
  showCompany?: boolean;
  showRole?: boolean;
  showDate?: boolean;
  showDescription?: boolean;
  showChips?: boolean;
}

export interface CustomButton {
  text: string;
  url: string;
  icon?: 'link' | 'code' | 'globe' | 'github' | 'video' | 'document' | 'download' | 'play' | 'none';
  variant?: 'primary' | 'secondary';
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  techStack?: string[];
  link?: string; // Deprecated - keeping for backward compatibility
  codeLink?: string; // Deprecated - keeping for backward compatibility
  customLiveText?: string; // Deprecated - keeping for backward compatibility
  customCodeText?: string; // Deprecated - keeping for backward compatibility
  customButtons?: CustomButton[]; // New button system (max 4)
}

export interface ProjectsBlockProps {
  projects: Project[];
  // Border controls
  showBorder?: boolean;
  borderThickness?: number; // 1-8px
  borderRadius?: number; // 0-32px
  borderColor?: string; // Custom border color
  borderOpacity?: number; // 0-100 (default 100)
  // Shadow control
  showShadow?: boolean;
  // Layout controls
  layout?: 'grid-1' | 'grid-2' | 'grid-3' | 'list'; // Grid columns or list
  // Padding controls
  paddingX?: number; // 0-64px (default 24)
  paddingY?: number; // 0-64px (default 24)
  // Button customization
  buttonRoundness?: number; // 0-32px (default 16)
  buttonSize?: 'sm' | 'md' | 'lg'; // Button size (default 'md')
  projectButtonText?: string; // Custom text for project button (default 'Live Preview')
  codeButtonText?: string; // Custom text for code button (default 'View Code')
  showButtonIcon?: boolean; // Whether to show icons on buttons (default true)
  showIconFirst?: boolean; // Whether to show icon before text on buttons (default true)
  // Chips customization
  chipsShowBorder?: boolean; // Whether to show border on tech chips (default true)
  chipsBorderRadius?: number; // 0-32px (default 16)
  chipsBorderOpacity?: number; // 0-100 (default 100)
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
  logoBgColor?: string; // Background color for logo
  logoRoundness?: number; // Roundness 0-100 (0 = square, 100 = circle)
  logoSize?: number; // Logo size in pixels (default 40)
}

export interface NavbarNavItem {
  id: string;
  label: string;
  href: string;
  show?: boolean;
}

export interface NavbarBlockPropsExtended extends NavbarBlockProps {
  navItems?: NavbarNavItem[]; // Ordered list of nav items
  logoAlignment?: 'left' | 'center' | 'right';
  navAlignment?: 'left' | 'center' | 'right';
  itemsGap?: number; // Gap between nav items in px
  bgType?: 'solid' | 'gradient' | 'image' | 'transparent';
  bgColor?: string; // for solid
  bgGradient?: string; // css gradient string
  bgImage?: string; // image url
  showNavigation?: boolean; // Whether to show navigation items
  showLogo?: boolean; // Whether to show logo
}

// Inspector field configuration
export interface InspectorField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'select' | 'toggle' | 'image-list' | 'skills-editor' | 'experience-editor' | 'projects-editor' | 'nav-editor';
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
