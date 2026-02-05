import React from 'react';
import { SocialRowBlockProps } from '@/types';
import { Twitter, Instagram, Linkedin, Github, Globe, Mail, Youtube, Facebook } from 'lucide-react';

interface SocialRowBlockRendererProps {
  props: SocialRowBlockProps;
}

// Icon mapping for common platforms
const iconMap: Record<string, any> = {
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  youtube: Youtube,
  facebook: Facebook,
  email: Mail,
  globe: Globe,
};

export function SocialRowBlockRenderer({ props }: SocialRowBlockRendererProps) {
  // Build socials array from both old props and new links array
  const socials = [];

  // Add from old individual props
  if (props.twitter) {
    socials.push({
      key: 'twitter',
      icon: Twitter,
      url: props.twitter.startsWith('http') ? props.twitter : `https://twitter.com/${props.twitter.replace('@', '')}`,
      label: 'Twitter'
    });
  }
  if (props.instagram) {
    socials.push({
      key: 'instagram',
      icon: Instagram,
      url: props.instagram.startsWith('http') ? props.instagram : `https://instagram.com/${props.instagram.replace('@', '')}`,
      label: 'Instagram'
    });
  }
  if (props.linkedin) {
    socials.push({
      key: 'linkedin',
      icon: Linkedin,
      url: props.linkedin.startsWith('http') ? props.linkedin : `https://linkedin.com/in/${props.linkedin}`,
      label: 'LinkedIn'
    });
  }
  if (props.github) {
    socials.push({
      key: 'github',
      icon: Github,
      url: props.github.startsWith('http') ? props.github : `https://github.com/${props.github}`,
      label: 'GitHub'
    });
  }

  // Add from new links array
  if (props.links && props.links.length > 0) {
    props.links.forEach((link, index) => {
      if (link.url) {
        const platformLower = link.platform.toLowerCase();
        const Icon = iconMap[platformLower] || iconMap[link.icon?.toLowerCase() || ''] || Globe;
        socials.push({
          key: `link-${index}`,
          icon: Icon,
          url: link.url,
          label: link.platform
        });
      }
    });
  }

  if (socials.length === 0) {
    return (
      <div className="text-center py-4 text-neutral-400 dark:text-neutral-500 text-sm">
        No social links added
      </div>
    );
  }

  const alignment = props.alignment || 'center';
  const iconSize = props.iconSize || 24;

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div className={`flex items-center gap-4 ${alignmentClasses[alignment]}`}>
      {socials.map(({ key, icon: Icon, url, label }) => (
        <a
          key={key}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex items-center justify-center  border border-neutral-200 dark:border-neutral-700 rounded-full hover:border-neutral-900 dark:hover:border-neutral-500 hover:shadow-md transition-all duration-200"
          style={{ 
            width: `${iconSize + 24}px`, 
            height: `${iconSize + 24}px` 
          }}
        >
          <Icon style={{ width: `${iconSize}px`, height: `${iconSize}px` }} className="text-neutral-700 dark:text-neutral-300" />
        </a>
      ))}
    </div>
  );
}
