import { 
  BlockDefinition, 
  BlockType,
  HeaderBlockProps,
  LinkBlockProps,
  GalleryBlockProps,
  CardBlockProps,
  DividerBlockProps,
  SocialRowBlockProps 
} from '@/types';

export const blockRegistry: Record<BlockType, BlockDefinition> = {
  header: {
    type: 'header',
    label: 'Header',
    icon: 'User',
    defaultProps: {
      displayName: 'Your Name',
      bio: 'Tell the world about yourself',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
      location: '',
    } as HeaderBlockProps,
    inspectorFields: [
      { key: 'displayName', label: 'Display Name', type: 'text', placeholder: 'Your Name' },
      { key: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell the world about yourself' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'City, Country' },
    ],
  },
  link: {
    type: 'link',
    label: 'Link',
    icon: 'Link',
    defaultProps: {
      title: 'My Link',
      url: 'https://example.com',
      icon: '',
      style: 'button',
    } as LinkBlockProps,
    inspectorFields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Link title' },
      { key: 'url', label: 'URL', type: 'url', placeholder: 'https://example.com' },
      { key: 'style', label: 'Style', type: 'select', options: [
        { value: 'button', label: 'Button' },
        { value: 'plain', label: 'Plain' },
      ]},
    ],
  },
  gallery: {
    type: 'gallery',
    label: 'Gallery',
    icon: 'Image',
    defaultProps: {
      images: [
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400',
        'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400',
      ],
    } as GalleryBlockProps,
    inspectorFields: [
      { key: 'images', label: 'Images (URLs)', type: 'image-list' },
    ],
  },
  card: {
    type: 'card',
    label: 'Card',
    icon: 'Box',
    defaultProps: {
      title: 'Card Title',
      description: 'Card description goes here',
      imageUrl: '',
      ctaText: '',
      ctaUrl: '',
    } as CardBlockProps,
    inspectorFields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Card title' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Description' },
      { key: 'imageUrl', label: 'Image URL', type: 'url', placeholder: 'https://...' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Learn More' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url', placeholder: 'https://...' },
    ],
  },
  divider: {
    type: 'divider',
    label: 'Divider',
    icon: 'Minus',
    defaultProps: {
      style: 'solid',
    } as DividerBlockProps,
    inspectorFields: [
      { key: 'style', label: 'Style', type: 'select', options: [
        { value: 'solid', label: 'Solid' },
        { value: 'dashed', label: 'Dashed' },
        { value: 'dotted', label: 'Dotted' },
      ]},
    ],
  },
  socialRow: {
    type: 'socialRow',
    label: 'Social Row',
    icon: 'Share2',
    defaultProps: {
      twitter: '',
      instagram: '',
      linkedin: '',
      github: '',
    } as SocialRowBlockProps,
    inspectorFields: [
      { key: 'twitter', label: 'Twitter/X Username', type: 'text', placeholder: '@username' },
      { key: 'instagram', label: 'Instagram Username', type: 'text', placeholder: '@username' },
      { key: 'linkedin', label: 'LinkedIn Username', type: 'text', placeholder: 'username' },
      { key: 'github', label: 'GitHub Username', type: 'text', placeholder: 'username' },
    ],
  },
};

export function getBlockDefinition(type: BlockType): BlockDefinition {
  return blockRegistry[type];
}
