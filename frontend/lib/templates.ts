import { Block, BlockType } from '@/types';
import { getBlockDefinition } from './blockRegistry';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  blocks: Omit<Block, 'id'>[];
}

function generateBlockId(): string {
  return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createBlock(type: BlockType, props: any, order: number): Omit<Block, 'id'> {
  return {
    type,
    props,
    order,
  };
}

export const templates: Template[] = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Perfect for software engineers and developers',
    icon: 'Code',
    blocks: [
      createBlock('header', {
        displayName: 'Your Name',
        bio: 'Full Stack Developer passionate about building elegant solutions',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=developer',
        location: 'San Francisco, CA',
      }, 0),
      createBlock('sectionHeader', {
        title: 'Skills',
        subtitle: 'Technologies I work with',
      }, 1),
      createBlock('skills', {
        skills: [
          { name: 'JavaScript', level: 'Advanced' },
          { name: 'TypeScript', level: 'Advanced' },
          { name: 'React', level: 'Advanced' },
          { name: 'Node.js', level: 'Intermediate' },
          { name: 'Python', level: 'Intermediate' },
          { name: 'SQL', level: 'Intermediate' },
        ],
        layout: 'chips',
      }, 2),
      createBlock('sectionHeader', {
        title: 'Experience',
        subtitle: 'Where I\'ve worked',
      }, 3),
      createBlock('experience', {
        items: [
          {
            role: 'Senior Software Engineer',
            company: 'Tech Company',
            startDate: 'Jan 2023',
            endDate: '',
            description: 'Leading development of scalable web applications using React, TypeScript, and Node.js.',
          },
          {
            role: 'Software Engineer',
            company: 'Startup Inc',
            startDate: 'Jun 2021',
            endDate: 'Dec 2022',
            description: 'Built and maintained full-stack features for a SaaS platform.',
          },
        ],
      }, 4),
      createBlock('sectionHeader', {
        title: 'Projects',
        subtitle: 'Things I\'ve built',
      }, 5),
      createBlock('projects', {
        projects: [
          {
            title: 'Portfolio Builder',
            description: 'A modern tool for creating beautiful portfolio websites with no code.',
            image: '',
            techStack: ['React', 'TypeScript', 'Tailwind CSS'],
            link: 'https://example.com',
          },
        ],
      }, 6),
      createBlock('divider', { style: 'solid' }, 7),
      createBlock('socialRow', {
        github: 'yourusername',
        linkedin: 'yourusername',
        twitter: '@yourusername',
      }, 8),
    ],
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Ideal for UI/UX designers and creatives',
    icon: 'Palette',
    blocks: [
      createBlock('header', {
        displayName: 'Your Name',
        bio: 'Product Designer crafting delightful user experiences',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer',
        location: 'New York, NY',
      }, 0),
      createBlock('sectionHeader', {
        title: 'Skills',
        subtitle: 'What I bring to the table',
      }, 1),
      createBlock('skills', {
        skills: [
          { name: 'UI Design', level: 'Advanced' },
          { name: 'UX Research', level: 'Advanced' },
          { name: 'Figma', level: 'Advanced' },
          { name: 'Prototyping', level: 'Advanced' },
          { name: 'Design Systems', level: 'Intermediate' },
          { name: 'HTML/CSS', level: 'Intermediate' },
        ],
        layout: 'grid',
      }, 2),
      createBlock('sectionHeader', {
        title: 'Projects',
        subtitle: 'Featured work',
      }, 3),
      createBlock('projects', {
        projects: [
          {
            title: 'E-commerce Redesign',
            description: 'Complete redesign of a major e-commerce platform, improving conversion by 35%.',
            image: '',
            techStack: ['Figma', 'Design System', 'User Testing'],
            link: '',
          },
          {
            title: 'Mobile Banking App',
            description: 'Designed an intuitive mobile banking experience for millennials.',
            image: '',
            techStack: ['Figma', 'Prototyping', 'iOS/Android'],
            link: '',
          },
        ],
      }, 4),
      createBlock('divider', { style: 'solid' }, 5),
      createBlock('socialRow', {
        instagram: '@yourusername',
        linkedin: 'yourusername',
        twitter: '@yourusername',
      }, 6),
    ],
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Great for students and recent graduates',
    icon: 'GraduationCap',
    blocks: [
      createBlock('header', {
        displayName: 'Your Name',
        bio: 'Computer Science student passionate about technology and innovation',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
        location: 'Boston, MA',
      }, 0),
      createBlock('sectionHeader', {
        title: 'Skills',
        subtitle: 'What I\'m learning',
      }, 1),
      createBlock('skills', {
        skills: [
          { name: 'Python', level: 'Intermediate' },
          { name: 'Java', level: 'Intermediate' },
          { name: 'React', level: 'Beginner' },
          { name: 'Data Structures', level: 'Intermediate' },
          { name: 'Algorithms', level: 'Intermediate' },
        ],
        layout: 'chips',
      }, 2),
      createBlock('sectionHeader', {
        title: 'Education',
        subtitle: '',
      }, 3),
      createBlock('experience', {
        items: [
          {
            role: 'B.S. Computer Science',
            company: 'University Name',
            startDate: 'Sep 2022',
            endDate: 'May 2026',
            description: 'Relevant coursework: Data Structures, Algorithms, Web Development, Machine Learning',
          },
        ],
      }, 4),
      createBlock('sectionHeader', {
        title: 'Projects',
        subtitle: 'What I\'ve built',
      }, 5),
      createBlock('projects', {
        projects: [
          {
            title: 'Course Scheduler App',
            description: 'Built a web app to help students plan their course schedules more efficiently.',
            image: '',
            techStack: ['React', 'Node.js', 'MongoDB'],
            link: '',
          },
        ],
      }, 6),
      createBlock('socialRow', {
        github: 'yourusername',
        linkedin: 'yourusername',
      }, 7),
    ],
  },
  {
    id: 'founder',
    name: 'Founder',
    description: 'For entrepreneurs and startup founders',
    icon: 'Rocket',
    blocks: [
      createBlock('header', {
        displayName: 'Your Name',
        bio: 'Founder & CEO building products that matter',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=founder',
        location: 'Austin, TX',
      }, 0),
      createBlock('card', {
        title: 'Current Venture',
        description: 'Building a platform that revolutionizes how teams collaborate. We\'re backed by leading VCs and growing rapidly.',
        imageUrl: '',
        ctaText: 'Learn More',
        ctaUrl: 'https://yourcompany.com',
      }, 1),
      createBlock('sectionHeader', {
        title: 'Experience',
        subtitle: 'My journey',
      }, 2),
      createBlock('experience', {
        items: [
          {
            role: 'Founder & CEO',
            company: 'Your Startup',
            startDate: 'Jan 2023',
            endDate: '',
            description: 'Building a SaaS platform that serves 10k+ users. Raised $2M in seed funding.',
          },
          {
            role: 'Product Lead',
            company: 'Previous Company',
            startDate: 'Jan 2020',
            endDate: 'Dec 2022',
            description: 'Led product strategy and grew the user base from 0 to 100k.',
          },
        ],
      }, 3),
      createBlock('sectionHeader', {
        title: 'Projects',
        subtitle: 'Things I\'ve built',
      }, 4),
      createBlock('projects', {
        projects: [
          {
            title: 'Your Startup',
            description: 'A platform that helps teams collaborate more effectively with AI-powered insights.',
            image: '',
            techStack: ['Next.js', 'Python', 'AWS'],
            link: 'https://yourcompany.com',
          },
        ],
      }, 5),
      createBlock('divider', { style: 'solid' }, 6),
      createBlock('socialRow', {
        twitter: '@yourusername',
        linkedin: 'yourusername',
      }, 7),
    ],
  },
];

export function applyTemplate(template: Template): Block[] {
  return template.blocks.map((block, index) => ({
    ...block,
    id: generateBlockId(),
    order: index,
  }));
}

export function getTemplate(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}
