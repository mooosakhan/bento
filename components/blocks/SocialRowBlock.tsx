import React from 'react';
import { SocialRowBlockProps } from '@/types';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

interface SocialRowBlockRendererProps {
  props: SocialRowBlockProps;
}

export function SocialRowBlockRenderer({ props }: SocialRowBlockRendererProps) {
  const socials = [
    { 
      key: 'twitter', 
      icon: Twitter, 
      url: props.twitter ? `https://twitter.com/${props.twitter.replace('@', '')}` : null,
      label: 'Twitter'
    },
    { 
      key: 'instagram', 
      icon: Instagram, 
      url: props.instagram ? `https://instagram.com/${props.instagram.replace('@', '')}` : null,
      label: 'Instagram'
    },
    { 
      key: 'linkedin', 
      icon: Linkedin, 
      url: props.linkedin ? `https://linkedin.com/in/${props.linkedin}` : null,
      label: 'LinkedIn'
    },
    { 
      key: 'github', 
      icon: Github, 
      url: props.github ? `https://github.com/${props.github}` : null,
      label: 'GitHub'
    },
  ].filter(social => social.url);

  if (socials.length === 0) {
    return (
      <div className="text-center py-4 text-neutral-400 dark:text-neutral-500 text-sm">
        No social links added
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {socials.map(({ key, icon: Icon, url, label }) => (
        <a
          key={key}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-full hover:border-neutral-900 dark:hover:border-neutral-500 hover:shadow-md transition-all duration-200"
        >
          <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </a>
      ))}
    </div>
  );
}
