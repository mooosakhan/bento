import { 
  SectionDefinition, 
  SectionType,
  HeroSectionProps,
  AboutSectionProps,
  SkillsSectionProps,
  ExperienceSectionProps,
  ProjectsSectionProps,
  HighlightsSectionProps,
  GitHubSectionProps,
  WritingSectionProps,
  TestimonialsSectionProps,
  ContactSectionProps,
  CTASectionProps,
  CustomSectionProps,
  NowSectionProps,
  ToolboxSectionProps,
} from '@/types';

export const sectionRegistry: Record<SectionType, SectionDefinition> = {
  hero: {
    type: 'hero',
    label: 'Hero',
    description: 'Introduce yourself with style',
    icon: 'User',
    category: 'essentials',
    variants: [
      {
        name: 'minimal',
        label: 'Minimal',
        description: 'Clean and simple',
        defaultProps: {
          displayName: 'Your Name',
          headline: 'Product Designer & Developer',
          bio: 'Building digital experiences that matter',
          location: 'San Francisco, CA',
          avatar: { type: 'initials', value: 'YN' },
          openToWork: false,
        } as HeroSectionProps,
      },
      {
        name: 'centered',
        label: 'Centered',
        description: 'Classic centered layout',
        defaultProps: {
          displayName: 'Your Name',
          headline: 'Product Designer & Developer',
          bio: 'I design and build digital products that help people and businesses grow.',
          avatar: { type: 'initials', value: 'YN' },
          openToWork: true,
          ctaButtons: [
            { label: 'View Work', url: '#projects', variant: 'primary' },
            { label: 'Contact Me', url: '#contact', variant: 'secondary' },
          ],
        } as HeroSectionProps,
      },
      {
        name: 'split',
        label: 'Split',
        description: 'Image on one side, content on other',
        defaultProps: {
          displayName: 'Your Name',
          headline: 'Product Designer & Developer',
          bio: 'Building digital experiences that matter. Currently designing at Amazing Company.',
          location: 'San Francisco, CA',
          avatar: { type: 'initials', value: 'YN' },
          openToWork: false,
        } as HeroSectionProps,
      },
      {
        name: 'withBadges',
        label: 'With Badges',
        description: 'Show your skills upfront',
        defaultProps: {
          displayName: 'Your Name',
          headline: 'Full Stack Developer',
          bio: 'Specialized in React, Next.js, and Node.js',
          badges: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
          avatar: { type: 'initials', value: 'YN' },
          openToWork: true,
        } as HeroSectionProps,
      },
      {
        name: 'withStats',
        label: 'With Stats',
        description: 'Highlight your achievements',
        defaultProps: {
          displayName: 'Your Name',
          headline: 'Senior Product Designer',
          bio: 'Creating delightful user experiences',
          avatar: { type: 'initials', value: 'YN' },
          stats: [
            { label: 'Years Experience', value: '5+' },
            { label: 'Projects', value: '50+' },
            { label: 'Happy Clients', value: '30+' },
          ],
        } as HeroSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'displayName', label: 'Display Name', type: 'text', placeholder: 'Your Name' },
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Product Designer & Developer' },
      { key: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell the world about yourself' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'City, Country' },
      { key: 'openToWork', label: 'Open to Work', type: 'toggle' },
    ],
  },

  about: {
    type: 'about',
    label: 'About',
    description: 'Tell your story',
    icon: 'FileText',
    category: 'essentials',
    variants: [
      {
        name: 'short',
        label: 'Short',
        description: 'Brief introduction',
        defaultProps: {
          title: 'About Me',
          content: 'Write a brief introduction about yourself...',
        } as AboutSectionProps,
      },
      {
        name: 'long',
        label: 'Long Form',
        description: 'Detailed story',
        defaultProps: {
          title: 'My Story',
          content: 'Share your journey, what drives you, and what you\'re passionate about...',
          highlights: ['Fast learner', 'Team player', 'Problem solver'],
        } as AboutSectionProps,
      },
      {
        name: 'twoColumn',
        label: 'Two Column',
        description: 'Text with image',
        defaultProps: {
          title: 'About',
          content: 'Tell your story with an accompanying image...',
          imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
        } as AboutSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'About Me' },
      { key: 'content', label: 'Content', type: 'markdown', placeholder: 'Write about yourself...' },
      { key: 'imageUrl', label: 'Image URL', type: 'url', placeholder: 'https://...' },
    ],
  },

  skills: {
    type: 'skills',
    label: 'Skills',
    description: 'Showcase your expertise',
    icon: 'Zap',
    category: 'showcase',
    variants: [
      {
        name: 'chips',
        label: 'Chips',
        description: 'Simple skill tags',
        defaultProps: {
          title: 'Skills',
          skills: [
            { name: 'React' },
            { name: 'TypeScript' },
            { name: 'Next.js' },
          ],
          showLevels: false,
        } as SkillsSectionProps,
      },
      {
        name: 'grid',
        label: 'Grid',
        description: 'Skills in cards',
        defaultProps: {
          title: 'Skills & Expertise',
          skills: [
            { name: 'React', level: 'Advanced' },
            { name: 'TypeScript', level: 'Advanced' },
            { name: 'Node.js', level: 'Intermediate' },
          ],
          showLevels: true,
        } as SkillsSectionProps,
      },
      {
        name: 'withLevels',
        label: 'With Levels',
        description: 'Show proficiency',
        defaultProps: {
          title: 'Technical Skills',
          skills: [
            { name: 'JavaScript', level: 'Advanced' },
            { name: 'React', level: 'Advanced' },
            { name: 'Python', level: 'Intermediate' },
          ],
          showLevels: true,
        } as SkillsSectionProps,
      },
      {
        name: 'grouped',
        label: 'Grouped',
        description: 'Organized by category',
        defaultProps: {
          title: 'Skills',
          grouped: true,
          categories: [
            {
              name: 'Frontend',
              skills: [
                { name: 'React' },
                { name: 'TypeScript' },
                { name: 'Tailwind CSS' },
              ],
            },
            {
              name: 'Backend',
              skills: [
                { name: 'Node.js' },
                { name: 'PostgreSQL' },
                { name: 'Redis' },
              ],
            },
          ],
        } as SkillsSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Skills' },
      { key: 'skills', label: 'Skills', type: 'skills-editor' },
      { key: 'showLevels', label: 'Show Levels', type: 'toggle' },
    ],
  },

  experience: {
    type: 'experience',
    label: 'Experience',
    description: 'Your work history',
    icon: 'Briefcase',
    category: 'showcase',
    variants: [
      {
        name: 'timeline',
        label: 'Timeline',
        description: 'Vertical timeline view',
        defaultProps: {
          title: 'Work Experience',
          items: [
            {
              role: 'Senior Developer',
              company: 'Tech Corp',
              startDate: '2022',
              endDate: 'Present',
              description: 'Leading frontend development',
            },
          ],
        } as ExperienceSectionProps,
      },
      {
        name: 'compact',
        label: 'Compact List',
        description: 'Simple list format',
        defaultProps: {
          title: 'Experience',
          items: [
            {
              role: 'Senior Developer',
              company: 'Tech Corp',
              startDate: '2022',
              endDate: 'Present',
              description: 'Leading frontend development',
            },
          ],
        } as ExperienceSectionProps,
      },
      {
        name: 'cards',
        label: 'Cards',
        description: 'Card-based layout',
        defaultProps: {
          title: 'Career',
          items: [
            {
              role: 'Senior Developer',
              company: 'Tech Corp',
              startDate: '2022',
              endDate: 'Present',
              description: 'Leading frontend development and mentoring junior developers',
            },
          ],
        } as ExperienceSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Experience' },
      { key: 'items', label: 'Experience Items', type: 'experience-editor' },
    ],
  },

  projects: {
    type: 'projects',
    label: 'Projects',
    description: 'Showcase your work',
    icon: 'Folder',
    category: 'showcase',
    variants: [
      {
        name: 'grid',
        label: 'Grid',
        description: 'Classic grid layout',
        defaultProps: {
          title: 'Projects',
          projects: [
            {
              title: 'Project Name',
              description: 'A brief description of your project',
              techStack: ['React', 'TypeScript'],
              link: 'https://example.com',
            },
          ],
        } as ProjectsSectionProps,
      },
      {
        name: 'cards',
        label: 'Cards',
        description: 'Featured card style',
        defaultProps: {
          title: 'Featured Work',
          projects: [
            {
              title: 'Project Name',
              description: 'A brief description of your project',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
              techStack: ['React', 'Node.js'],
              link: 'https://example.com',
            },
          ],
        } as ProjectsSectionProps,
      },
      {
        name: 'featuredList',
        label: 'Featured + List',
        description: 'Highlight top projects',
        defaultProps: {
          title: 'My Work',
          projects: [
            {
              title: 'Featured Project',
              description: 'Your most impressive project',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
              techStack: ['React', 'Next.js'],
              link: 'https://example.com',
            },
          ],
          featured: [],
        } as ProjectsSectionProps,
      },
      {
        name: 'caseStudy',
        label: 'Case Study',
        description: 'Detailed project tiles',
        defaultProps: {
          title: 'Case Studies',
          projects: [
            {
              title: 'Project Name',
              description: 'Detailed explanation of the problem, solution, and impact',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
              techStack: ['React', 'TypeScript', 'Node.js'],
              link: 'https://example.com',
            },
          ],
        } as ProjectsSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Projects' },
      { key: 'projects', label: 'Projects', type: 'projects-editor' },
    ],
  },

  highlights: {
    type: 'highlights',
    label: 'Highlights',
    description: 'Key achievements & metrics',
    icon: 'Star',
    category: 'showcase',
    variants: [
      {
        name: 'threeColumn',
        label: '3 Column',
        description: 'Three highlight cards',
        defaultProps: {
          title: 'Highlights',
          items: [
            { id: '1', label: 'Projects Completed', value: '50+', icon: 'Folder' },
            { id: '2', label: 'Happy Clients', value: '30+', icon: 'Users' },
            { id: '3', label: 'Years Experience', value: '5+', icon: 'Award' },
          ],
        } as HighlightsSectionProps,
      },
      {
        name: 'fourColumn',
        label: '4 Column',
        description: 'Four highlight cards',
        defaultProps: {
          title: 'By the Numbers',
          items: [
            { id: '1', label: 'Projects', value: '50+', icon: 'Folder' },
            { id: '2', label: 'Clients', value: '30+', icon: 'Users' },
            { id: '3', label: 'Years', value: '5+', icon: 'Award' },
            { id: '4', label: 'Coffee Cups', value: '1000+', icon: 'Coffee' },
          ],
        } as HighlightsSectionProps,
      },
      {
        name: 'withDescription',
        label: 'With Description',
        description: 'Includes detail text',
        defaultProps: {
          title: 'Achievements',
          items: [
            { 
              id: '1', 
              label: 'Open Source', 
              value: '10K+', 
              description: 'GitHub stars across projects',
              icon: 'Github' 
            },
            { 
              id: '2', 
              label: 'Community', 
              value: '5K+', 
              description: 'Followers on social media',
              icon: 'Users' 
            },
          ],
        } as HighlightsSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Highlights' },
    ],
  },

  github: {
    type: 'github',
    label: 'GitHub',
    description: 'Show your dev activity',
    icon: 'Github',
    category: 'showcase',
    variants: [
      {
        name: 'streak',
        label: 'Streak Only',
        description: 'GitHub streak widget',
        defaultProps: {
          title: 'GitHub Activity',
          username: '',
          widgets: ['streak'],
          theme: 'auto',
        } as GitHubSectionProps,
      },
      {
        name: 'stats',
        label: 'Stats',
        description: 'Stats overview',
        defaultProps: {
          title: 'GitHub Stats',
          username: '',
          widgets: ['stats'],
          theme: 'auto',
        } as GitHubSectionProps,
      },
      {
        name: 'combined',
        label: 'Combined',
        description: 'Streak + Stats',
        defaultProps: {
          title: 'GitHub',
          username: '',
          widgets: ['streak', 'stats'],
          theme: 'auto',
        } as GitHubSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'GitHub' },
      { key: 'username', label: 'GitHub Username', type: 'text', placeholder: 'yourusername' },
      { key: 'theme', label: 'Theme', type: 'select', options: [
        { value: 'auto', label: 'Auto' },
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ]},
    ],
  },

  writing: {
    type: 'writing',
    label: 'Writing',
    description: 'Blog posts & articles',
    icon: 'PenTool',
    category: 'showcase',
    variants: [
      {
        name: 'list',
        label: 'List',
        description: 'Simple list view',
        defaultProps: {
          title: 'Writing',
          posts: [
            {
              id: '1',
              title: 'Blog Post Title',
              excerpt: 'A brief summary of your blog post...',
              date: '2024-01-15',
              url: 'https://yourblog.com/post',
              tags: ['React', 'TypeScript'],
            },
          ],
        } as WritingSectionProps,
      },
      {
        name: 'cards',
        label: 'Cards',
        description: 'Card-based layout',
        defaultProps: {
          title: 'Latest Articles',
          posts: [
            {
              id: '1',
              title: 'Blog Post Title',
              excerpt: 'A brief summary of your blog post...',
              date: '2024-01-15',
              url: 'https://yourblog.com/post',
              tags: ['React', 'TypeScript'],
            },
          ],
        } as WritingSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Writing' },
    ],
  },

  testimonials: {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'What others say',
    icon: 'MessageSquare',
    category: 'showcase',
    variants: [
      {
        name: 'cards',
        label: 'Cards',
        description: 'Testimonial cards',
        defaultProps: {
          title: 'Testimonials',
          testimonials: [
            {
              id: '1',
              quote: 'Amazing work! Highly recommended.',
              author: 'John Doe',
              role: 'CEO',
              company: 'Tech Corp',
            },
          ],
        } as TestimonialsSectionProps,
      },
      {
        name: 'carousel',
        label: 'Carousel',
        description: 'Rotating testimonials',
        defaultProps: {
          title: 'Kind Words',
          testimonials: [
            {
              id: '1',
              quote: 'Amazing work! Highly recommended.',
              author: 'John Doe',
              role: 'CEO',
              company: 'Tech Corp',
            },
          ],
        } as TestimonialsSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Testimonials' },
    ],
  },

  contact: {
    type: 'contact',
    label: 'Contact',
    description: 'Ways to reach you',
    icon: 'Mail',
    category: 'connect',
    variants: [
      {
        name: 'simple',
        label: 'Simple',
        description: 'Email and socials',
        defaultProps: {
          title: 'Get in Touch',
          subtitle: 'Feel free to reach out!',
          email: 'hello@example.com',
          showForm: false,
        } as ContactSectionProps,
      },
      {
        name: 'withForm',
        label: 'With Form',
        description: 'Includes contact form',
        defaultProps: {
          title: 'Contact Me',
          subtitle: 'Let\'s work together',
          email: 'hello@example.com',
          showForm: true,
        } as ContactSectionProps,
      },
      {
        name: 'detailed',
        label: 'Detailed',
        description: 'All contact methods',
        defaultProps: {
          title: 'Let\'s Connect',
          email: 'hello@example.com',
          phone: '+1 (555) 123-4567',
          socialLinks: {
            twitter: 'yourusername',
            linkedin: 'yourusername',
            github: 'yourusername',
          },
          showForm: false,
        } as ContactSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Contact' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Get in touch' },
      { key: 'email', label: 'Email', type: 'text', placeholder: 'hello@example.com' },
      { key: 'phone', label: 'Phone', type: 'text', placeholder: '+1 (555) 123-4567' },
      { key: 'showForm', label: 'Show Contact Form', type: 'toggle' },
    ],
  },

  cta: {
    type: 'cta',
    label: 'Call to Action',
    description: 'Encourage action',
    icon: 'ArrowRight',
    category: 'connect',
    variants: [
      {
        name: 'centered',
        label: 'Centered',
        description: 'Single focused CTA',
        defaultProps: {
          title: 'Ready to work together?',
          subtitle: 'Let\'s create something amazing',
          primaryButton: { label: 'Get Started', url: '#contact' },
          style: 'centered',
        } as CTASectionProps,
      },
      {
        name: 'split',
        label: 'Split',
        description: 'Two call-to-actions',
        defaultProps: {
          title: 'Interested in working together?',
          primaryButton: { label: 'Hire Me', url: '#contact' },
          secondaryButton: { label: 'View Resume', url: '/resume.pdf' },
          style: 'split',
        } as CTASectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Ready to work together?' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Let\'s create something amazing' },
    ],
  },

  custom: {
    type: 'custom',
    label: 'Custom Section',
    description: 'Build anything you want',
    icon: 'Layout',
    category: 'custom',
    variants: [
      {
        name: 'simple',
        label: 'Simple',
        description: 'Title + Content',
        defaultProps: {
          title: 'Custom Section',
          content: 'Add your custom content here...',
          layout: {
            containerWidth: 'normal',
            columns: 1,
            spacing: 'comfortable',
          },
          cards: [],
        } as CustomSectionProps,
      },
      {
        name: 'cards',
        label: 'With Cards',
        description: 'Custom cards layout',
        defaultProps: {
          title: 'Custom Section',
          subtitle: 'Add your subtitle',
          layout: {
            containerWidth: 'normal',
            columns: 2,
            spacing: 'comfortable',
          },
          cards: [
            {
              id: '1',
              title: 'Card Title',
              description: 'Card description...',
              icon: 'Box',
            },
          ],
        } as CustomSectionProps,
      },
      {
        name: 'threeColumn',
        label: 'Three Column',
        description: 'Three column cards',
        defaultProps: {
          title: 'Custom Section',
          layout: {
            containerWidth: 'wide',
            columns: 3,
            spacing: 'comfortable',
          },
          cards: [
            { id: '1', title: 'Card 1', description: 'Description 1', icon: 'Box' },
            { id: '2', title: 'Card 2', description: 'Description 2', icon: 'Star' },
            { id: '3', title: 'Card 3', description: 'Description 3', icon: 'Zap' },
          ],
        } as CustomSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Custom Section' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Optional subtitle' },
      { key: 'content', label: 'Content', type: 'markdown', placeholder: 'Add custom content...' },
      { key: 'cards', label: 'Cards', type: 'cards-editor' },
      { key: 'layout.columns', label: 'Columns', type: 'select', options: [
        { value: '1', label: '1 Column' },
        { value: '2', label: '2 Columns' },
        { value: '3', label: '3 Columns' },
        { value: '4', label: '4 Columns' },
      ]},
      { key: 'layout.containerWidth', label: 'Width', type: 'select', options: [
        { value: 'normal', label: 'Normal' },
        { value: 'wide', label: 'Wide' },
        { value: 'full', label: 'Full Width' },
      ]},
      { key: 'layout.spacing', label: 'Spacing', type: 'select', options: [
        { value: 'compact', label: 'Compact' },
        { value: 'comfortable', label: 'Comfortable' },
        { value: 'spacious', label: 'Spacious' },
      ]},
    ],
  },

  now: {
    type: 'now',
    label: 'Now',
    description: 'What you\'re doing now',
    icon: 'Clock',
    category: 'essentials',
    variants: [
      {
        name: 'default',
        label: 'Default',
        description: 'Simple now page',
        defaultProps: {
          title: 'What I\'m Doing Now',
          content: 'Share what you\'re currently focused on...',
          lastUpdated: new Date().toISOString().split('T')[0],
        } as NowSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'What I\'m Doing Now' },
      { key: 'content', label: 'Content', type: 'markdown', placeholder: 'What are you up to?' },
      { key: 'lastUpdated', label: 'Last Updated', type: 'text', placeholder: '2024-01-15' },
    ],
  },

  toolbox: {
    type: 'toolbox',
    label: 'Toolbox',
    description: 'Your tech stack',
    icon: 'Wrench',
    category: 'showcase',
    variants: [
      {
        name: 'simple',
        label: 'Simple',
        description: 'Simple tool list',
        defaultProps: {
          title: 'My Toolbox',
          tools: [
            { id: '1', name: 'React', icon: 'Box' },
            { id: '2', name: 'TypeScript', icon: 'Code' },
            { id: '3', name: 'Figma', icon: 'Figma' },
          ],
          grouped: false,
        } as ToolboxSectionProps,
      },
      {
        name: 'grouped',
        label: 'Grouped',
        description: 'Organized by category',
        defaultProps: {
          title: 'Tech Stack',
          grouped: true,
          categories: [
            {
              name: 'Frontend',
              tools: [
                { id: '1', name: 'React', icon: 'Box' },
                { id: '2', name: 'TypeScript', icon: 'Code' },
              ],
            },
            {
              name: 'Design',
              tools: [
                { id: '3', name: 'Figma', icon: 'Figma' },
                { id: '4', name: 'Sketch', icon: 'Pen' },
              ],
            },
          ],
        } as ToolboxSectionProps,
      },
      {
        name: 'detailed',
        label: 'Detailed',
        description: 'With descriptions',
        defaultProps: {
          title: 'Tools I Use',
          tools: [
            { 
              id: '1', 
              name: 'React', 
              description: 'UI library for building interfaces',
              icon: 'Box',
              url: 'https://react.dev' 
            },
          ],
          grouped: false,
        } as ToolboxSectionProps,
      },
    ],
    inspectorFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Toolbox' },
    ],
  },
};

export function getSectionDefinition(type: SectionType): SectionDefinition | undefined {
  return sectionRegistry[type];
}

export function getSectionVariant(type: SectionType, variantName: string) {
  const definition = getSectionDefinition(type);
  return definition?.variants.find(v => v.name === variantName);
}

export function getSectionCategories() {
  const categories: Record<string, SectionDefinition[]> = {
    essentials: [],
    showcase: [],
    connect: [],
    custom: [],
  };

  Object.values(sectionRegistry).forEach(section => {
    categories[section.category].push(section);
  });

  return categories;
}
