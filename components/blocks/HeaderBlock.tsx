import React from 'react';
import { HeaderBlockProps } from '@/types';
import { MapPin } from 'lucide-react';

interface HeaderBlockRendererProps {
  props: HeaderBlockProps;
}

// Parse bio text for markdown and chips - now including chips inline
function parseBioText(text: string, chipLogos: { [key: string]: string } = {}) {
  const elements: JSX.Element[] = [];
  let currentIndex = 0;
  
  // Regex patterns
  const chipPattern = /#(\w+)/g;
  const boldPattern = /\*\*(.+?)\*\*/g;
  const italicPattern = /\*(.+?)\*/g;
  const linkPattern = /\[(.+?)\]\((.+?)\)/g;
  
  // Combine all patterns to find all matches
  const allMatches: Array<{index: number, length: number, type: string, content: string, href?: string}> = [];
  
  let match;
  
  // Find chips
  while ((match = chipPattern.exec(text)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: 'chip',
      content: match[1]
    });
  }
  
  // Find bold
  while ((match = boldPattern.exec(text)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: 'bold',
      content: match[1]
    });
  }
  
  // Find links
  while ((match = linkPattern.exec(text)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: 'link',
      content: match[1],
      href: match[2]
    });
  }
  
  // Sort matches by index
  allMatches.sort((a, b) => a.index - b.index);
  
  // Build elements
  allMatches.forEach((match, i) => {
    // Add text before this match
    if (match.index > currentIndex) {
      const textBefore = text.slice(currentIndex, match.index);
      // Check for italic in plain text
      const italicMatch = textBefore.match(/^(.*?)\*(.+?)\*(.*)$/);
      if (italicMatch) {
        if (italicMatch[1]) elements.push(<span key={`text-${i}-pre`}>{italicMatch[1]}</span>);
        elements.push(<em key={`italic-${i}`} className="italic">{italicMatch[2]}</em>);
        if (italicMatch[3]) elements.push(<span key={`text-${i}-post`}>{italicMatch[3]}</span>);
      } else {
        elements.push(<span key={`text-${i}`}>{textBefore}</span>);
      }
    }
    
    // Add the matched element - NOW including chips inline
    if (match.type === 'chip') {
      const logoData = chipLogos[match.content];
      const isSvg = logoData && logoData.trim().startsWith('<svg');
      
      elements.push(
        <span
          key={`chip-${i}`}
          className="chip-inner-shadow inline-flex items-center gap-1 px-2 py-1 mx-0.5 rounded-md border-2 border-dotted border-neutral-400 dark:border-white/30 dark:bg-white/15 text-sm font-bold text-neutral-700 dark:text-neutral-300"
        >
          {logoData && (
            isSvg ? (
              <span 
                className="w-3.5 h-3.5 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: logoData }}
              />
            ) : (
              <img 
                src={logoData} 
                alt={match.content}
                className="w-3.5 h-3.5 object-contain"
              />
            )
          )}
          {match.content}
        </span>
      );
    } else if (match.type === 'bold') {
      elements.push(<strong key={`bold-${i}`} className="font-bold">{match.content}</strong>);
    } else if (match.type === 'link') {
      elements.push(
        <a
          key={`link-${i}`}
          href={match.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {match.content}
        </a>
      );
    }
    
    currentIndex = match.index + match.length;
  });
  
  // Add remaining text
  if (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);
    // Check for italic in remaining text
    const italicMatch = remainingText.match(/^(.*?)\*(.+?)\*(.*)$/);
    if (italicMatch) {
      if (italicMatch[1]) elements.push(<span key="text-end-pre">{italicMatch[1]}</span>);
      elements.push(<em key="italic-end" className="italic">{italicMatch[2]}</em>);
      if (italicMatch[3]) elements.push(<span key="text-end-post">{italicMatch[3]}</span>);
    } else {
      elements.push(<span key="text-end">{remainingText}</span>);
    }
  }
  
  return elements.length > 0 ? elements : text;
}

export function HeaderBlockRenderer({ props }: HeaderBlockRendererProps) {
  const chipLogos = props.chipLogos || {};
  const avatarBgColor = props.avatarBgColor || '#ffffff';
  const avatarRoundness = props.avatarRoundness !== undefined ? props.avatarRoundness : 100;
  const avatarSize = props.avatarSize || 96;
  const contentAlignment = props.contentAlignment || 'left';
  const avatarToContentGap = props.avatarToContentGap !== undefined ? props.avatarToContentGap : 28;
  const contentItemsGap = props.contentItemsGap !== undefined ? props.contentItemsGap : 20;
  const nameFontSize = props.nameFontSize || 36;
  const bioFontSize = props.bioFontSize || 18;
  const bioLineHeight = props.bioLineHeight !== undefined ? props.bioLineHeight : 1.56;
  
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };
  
  return (
    <div 
      className={`flex flex-col justify-start p-0 ${alignmentClasses[contentAlignment]}`}
      style={{ gap: `${avatarToContentGap}px` }}
    >
      <div 
        className="overflow-hidden shadow-md"
        style={{ 
          width: `${avatarSize}px`,
          height: `${avatarSize}px`,
          borderRadius: `${avatarRoundness}%`,
          backgroundColor: avatarBgColor 
        }}
      >
        <img 
          src={props.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
          alt={props.displayName}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div 
        className={`flex flex-col w-full ${alignmentClasses[contentAlignment]}`}
        style={{ gap: `${contentItemsGap}px` }}
      >
        <h1 
          className="font-bold text-neutral-900 dark:text-white"
          style={{ fontSize: `${nameFontSize}px` }}
        >
          {props.displayName || 'Your Name'}
        </h1>
        {props.bio && (
          <p 
            className="text-neutral-600 dark:text-neutral-400 flex flex-wrap items-center gap-1"
            style={{ 
              fontSize: `${bioFontSize}px`,
              lineHeight: bioLineHeight 
            }}
          >
            {parseBioText(props.bio, chipLogos)}
          </p>
        )}
        
        {props.location && (
          <div className="flex items-center gap-1 mt-3 text-sm text-neutral-500 dark:text-neutral-500">
            <MapPin className="w-4 h-4" />
            <span>{props.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
