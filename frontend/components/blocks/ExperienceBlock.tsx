import React from 'react';
import { ExperienceBlockProps } from '@/types';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceBlockRendererProps {
  props: ExperienceBlockProps;
  theme: any;
}

// Parse description text for markdown and chips
function parseDescriptionText(text: string, chipLogos: { [key: string]: string } = {}) {
  // Split by lines to handle lists
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  let listItems: { type: 'ul' | 'ol', items: React.ReactNode[] } | null = null;
  let listKey = 0;

  lines.forEach((line, lineIndex) => {
    // Check for unordered list
    const ulMatch = line.match(/^[-*]\s+(.+)$/);
    // Check for ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    
    if (ulMatch) {
      const content = parseInlineMarkdown(ulMatch[1], chipLogos, lineIndex);
      if (!listItems || listItems.type !== 'ul') {
        if (listItems) {
          result.push(createList(listItems, listKey++));
        }
        listItems = { type: 'ul', items: [] };
      }
      listItems.items.push(<li key={`li-${lineIndex}`} className="ml-4">{content}</li>);
    } else if (olMatch) {
      const content = parseInlineMarkdown(olMatch[1], chipLogos, lineIndex);
      if (!listItems || listItems.type !== 'ol') {
        if (listItems) {
          result.push(createList(listItems, listKey++));
        }
        listItems = { type: 'ol', items: [] };
      }
      listItems.items.push(<li key={`li-${lineIndex}`} className="ml-4">{content}</li>);
    } else {
      // Not a list item
      if (listItems) {
        result.push(createList(listItems, listKey++));
        listItems = null;
      }
      
      if (line.trim()) {
        const content = parseInlineMarkdown(line, chipLogos, lineIndex);
        result.push(<div key={`line-${lineIndex}`} className="block">{content}</div>);
      } else if (lineIndex < lines.length - 1) {
        result.push(<br key={`br-${lineIndex}`} />);
      }
    }
  });
  
  // Add remaining list if any
  if (listItems) {
    result.push(createList(listItems, listKey++));
  }
  
  return result.length > 0 ? result : text;
}

function createList(listItems: { type: 'ul' | 'ol', items: React.ReactNode[] }, key: number) {
  const ListTag = listItems.type;
  return (
    <ListTag key={`list-${key}`} className={listItems.type === 'ul' ? 'list-disc' : 'list-decimal'}>
      {listItems.items}
    </ListTag>
  );
}

function parseInlineMarkdown(text: string, chipLogos: { [key: string]: string } = {}, lineIndex: number = 0) {
  const elements: React.ReactNode[] = [];
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
        if (italicMatch[1]) elements.push(<span key={`text-${lineIndex}-${i}-pre`}>{italicMatch[1]}</span>);
        elements.push(<em key={`italic-${lineIndex}-${i}`} className="italic">{italicMatch[2]}</em>);
        if (italicMatch[3]) elements.push(<span key={`text-${lineIndex}-${i}-post`}>{italicMatch[3]}</span>);
      } else {
        elements.push(<span key={`text-${lineIndex}-${i}`}>{textBefore}</span>);
      }
    }
    
    // Add the matched element
    if (match.type === 'chip') {
      const logoData = chipLogos[match.content];
      const isSvg = logoData && logoData.trim().startsWith('<svg');
      
      elements.push(
        <span
          key={`chip-${lineIndex}-${i}`}
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
      elements.push(<strong key={`bold-${lineIndex}-${i}`} className="font-bold">{match.content}</strong>);
    } else if (match.type === 'link') {
      elements.push(
        <a
          key={`link-${lineIndex}-${i}`}
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
      if (italicMatch[1]) elements.push(<span key={`text-${lineIndex}-end-pre`}>{italicMatch[1]}</span>);
      elements.push(<em key={`italic-${lineIndex}-end`} className="italic">{italicMatch[2]}</em>);
      if (italicMatch[3]) elements.push(<span key={`text-${lineIndex}-end-post`}>{italicMatch[3]}</span>);
    } else {
      elements.push(<span key={`text-${lineIndex}-end`}>{remainingText}</span>);
    }
  }
  
  return elements.length > 0 ? <>{elements}</> : text;
}

export function ExperienceBlockRenderer({ props , theme }: ExperienceBlockRendererProps) {
  if (!props.items || props.items.length === 0) {
    return (
      <div className="bg-white dark:bg-[#161617] rounded-2xl p-6 shadow-sm text-center text-neutral-500 dark:text-neutral-400">
        No experience added yet
      </div>
    );
  }

  // Default values
  const showBorder = props.showBorder ?? true;
  const borderThickness = props.borderThickness ?? 1;
  const borderRadius = props.borderRadius ?? 16;
  const showShadow = props.showShadow ?? false;
  const paddingX = props.paddingX ?? 24;
  const paddingY = props.paddingY ?? 24;
  const contentAlignment = props.contentAlignment || 'left';
  const showLogo = props.showLogo ?? true;
  const showCompany = props.showCompany ?? true;
  const showRole = props.showRole ?? true;
  const showDate = props.showDate ?? true;
  const showDescription = props.showDescription ?? true;
  const showChips = props.showChips ?? true;

  // Alignment classes
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center flex-col',
    right: 'items-end text-right'
  };

  return (
    <div className="space-y-4">
      {props.items.map((item, index) => {
        const logoRoundness = item.logoRoundness !== undefined ? item.logoRoundness : 16;
        let logoBgColor = item.logoBgColor;
        if (!logoBgColor || logoBgColor === undefined) logoBgColor = '#ffffff';
        if (logoBgColor === 'none') logoBgColor = 'transparent';
        const chipLogos = item.chipLogos || {};
        const isSvgLogo = item.companyLogo && item.companyLogo.trim().startsWith('<svg');
        
        return (
          <div 
            key={index} 
            className={`transition-shadow duration-200 ${showShadow ? 'shadow-md' : ''}`}
            style={{
              borderRadius: `${borderRadius}px`,
              paddingLeft: `${paddingX}px`,
              paddingRight: `${paddingX}px`,
              paddingTop: `${paddingY}px`,
              paddingBottom: `${paddingY}px`,
              border: showBorder ? `${borderThickness}px solid rgba(0, 0, 0, 0.1)` : 'none',
            }}
          >
            <div className={`flex  gap-4 ${alignmentClasses[contentAlignment]}`}>
              {/* Company Logo */}
              {showLogo && (
                <div 
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: item.companyLogo ? logoBgColor : 'transparent',
                    borderRadius: `${logoRoundness}%`
                  }}
                >
                  {item.companyLogo ? (
                    isSvgLogo ? (
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: item.companyLogo }}
                      />
                    ) : (
                      <img 
                        src={item.companyLogo} 
                        alt={item.company}
                        style={{
                           borderRadius: `${logoRoundness}%`
                        }}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="w-full h-full rounded-xl bg-neutral-100 dark:bg-[#262626] flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                    </div>
                  )}
                </div>
              )}
              
              {/* Content */}
              <div className={`flex-1 min-w-0 flex flex-col ${alignmentClasses[contentAlignment]}`}>
                {showRole && (
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {item.role}
                  </h3>
                )}
                {showCompany && (
                  <p 
                    className={`text-neutral-700 dark:text-neutral-300 font-medium ${
                      item.blurCompanyTitle ? 'blur-sm hover:blur-none transition-all duration-300' : ''
                    }`}
                  >
                    {item.company}
                  </p>
                )}
                {showDate && (
                  <div className={`flex items-center gap-1.5 mt-2 text-sm text-neutral-500 dark:text-neutral-400 ${
                    contentAlignment === 'center' ? 'justify-center' : contentAlignment === 'right' ? 'justify-end' : ''
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>
                      {item.startDate} - {item.endDate || 'Present'}
                    </span>
                  </div>
                )}
                
                {/* Description with Markdown support */}
                {showDescription && item.description && (
                  <div className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-1">
                    {parseDescriptionText(item.description, chipLogos)}
                  </div>
                )}
                
                {/* Chips */}
                {showChips && item.chips && item.chips.length > 0 && (
                  <div className={`flex flex-wrap gap-2 mt-3 ${
                    contentAlignment === 'center' ? 'justify-center' : contentAlignment === 'right' ? 'justify-end' : ''
                  }`}>
                    {item.chips.map((chip, chipIndex) => {
                      const logoData = chipLogos[chip];
                      const isChipSvg = logoData && logoData.trim().startsWith('<svg');
                      
                      return (
                        <span
                          key={chipIndex}
                          className=" inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-1 border-dashed border-neutral-400 dark:border-white/30 dark:bg-none text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                        >
                          {logoData && (
                            isChipSvg ? (
                              <span 
                                className="w-4 h-4 flex items-center justify-center"
                                dangerouslySetInnerHTML={{ __html: logoData }}
                              />
                            ) : (
                              <img 
                                src={logoData} 
                                alt={chip}
                                className="w-4 h-4 object-contain"
                              />
                            )
                          )}
                          {chip}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
