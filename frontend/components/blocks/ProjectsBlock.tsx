import React from 'react';
import { ProjectsBlockProps } from '@/types';
import { ExternalLink, Code, Link, Globe, Github, Video, FileText, Download, Play } from 'lucide-react';

interface ProjectsBlockRendererProps {
  props: ProjectsBlockProps;
  theme: any;
}

export function ProjectsBlockRenderer({ props , theme }: ProjectsBlockRendererProps & { theme: any }) {
  if (!props.projects || props.projects.length === 0) {
    return (
      <div className="bg-white dark:bg-[#161617] rounded-2xl p-6 shadow-sm text-center text-neutral-500 dark:text-neutral-400">
        No projects added yet
      </div>
    );
  }

  // Layout grid classes
  const layoutClasses = {
    'grid-1': 'grid grid-cols-1 gap-4',
    'grid-2': 'grid grid-cols-1 md:grid-cols-2 gap-4',
    'grid-3': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    'list': 'flex flex-col gap-4'
  };

  const layout = props.layout || 'grid-2';
  const showBorder = props.showBorder !== false; // Default true
  const borderThickness = props.borderThickness || 1;
  const borderRadius = props.borderRadius !== undefined ? props.borderRadius : 16; // Default 16px
  const borderColor = props.borderColor || 'rgb(229, 229, 229)'; // Default neutral-200
  const borderOpacity = props.borderOpacity !== undefined ? props.borderOpacity : 100; // Default 100
  const showShadow = props.showShadow !== false; // Default true

  // Chips customization
  const chipsShowBorder = props.chipsShowBorder !== false; // Default true
  const chipsBorderRadius = props.chipsBorderRadius !== undefined ? props.chipsBorderRadius : 16; // Default 16px
  const chipsBorderOpacity = props.chipsBorderOpacity !== undefined ? props.chipsBorderOpacity : 100; // Default 100

  // Padding controls
  const paddingX = props.paddingX !== undefined ? props.paddingX : 24; // Default 24px
  const paddingY = props.paddingY !== undefined ? props.paddingY : 24; // Default 24px

  // Button customization
  const buttonRoundness = props.buttonRoundness !== undefined ? props.buttonRoundness : 16; // Default 16px
  const buttonSize = props.buttonSize || 'md';
  const projectButtonText = props.projectButtonText || 'Live Preview';
  const codeButtonText = props.codeButtonText || 'View Code';
  const showButtonIcon = props.showButtonIcon !== false; // Default true
  const showIconFirst = props.showIconFirst !== false; // Default true

  // Button size classes
  const buttonSizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  // Shadow class
  const shadowClass = showShadow ? 'shadow-sm hover:shadow-md' : '';

  // Icon mapping
  const getButtonIcon = (iconName?: string) => {
    const iconSize = iconSizeClasses[buttonSize];
    switch (iconName) {
      case 'link':
        return <ExternalLink className={iconSize} />;
      case 'code':
        return <Code className={iconSize} />;
      case 'globe':
        return <Globe className={iconSize} />;
      case 'github':
        return <Github className={iconSize} />;
      case 'video':
        return <Video className={iconSize} />;
      case 'play':
        return <Play className={iconSize} />;
      case 'document':
        return <FileText className={iconSize} />;
      case 'download':
        return <Download className={iconSize} />;
      case 'none':
        return null;
      default:
        return <Link className={iconSize} />;
    }
  };

  // Helper function to convert RGB/color to RGBA with opacity
  const applyOpacity = (color: string, opacity: number): string => {
    // If already rgba, replace alpha
    if (color.startsWith('rgba')) {
      return color.replace(/[\d.]+\)$/g, `${opacity / 100})`);
    }
    // If rgb, convert to rgba
    if (color.startsWith('rgb(')) {
      return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity / 100})`);
    }
    // If hex, convert to rgba
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }
    // Default: return as is with opacity wrapper
    return color;
  };

  const borderColorWithOpacity = showBorder ? applyOpacity(borderColor, borderOpacity) : 'transparent';

  return (
    <div className={layoutClasses[layout]}>
      {props.projects.map((project, index) => (
        <div 
          key={index}
          className={`overflow-hidden transition-shadow duration-200 ${shadowClass}`}
          style={{
            border: showBorder ? `${borderThickness}px solid ${borderColorWithOpacity}` : 'none',
            borderRadius: `${borderRadius}px`,
          }}
        >
          {project.image && (
            <div className="aspect-video w-full bg-neutral-100 dark:bg-[#262626] overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div style={{ padding: `${paddingY}px ${paddingX}px` }}>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                {project.description}
              </p>
            )}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-[#262626] dark:text-neutral-300"
                    style={{
                      borderRadius: `${chipsBorderRadius}px`,
                      border: chipsShowBorder ? `1px solid rgba(0, 0, 0, ${chipsBorderOpacity / 1000})` : 'none',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {(project.link || project.codeLink || (project.customButtons && project.customButtons.length > 0)) && (
              <div className="flex flex-wrap gap-2">
                {/* Legacy support for old link/codeLink fields */}
                {/* {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors font-medium ${buttonSizeClasses[buttonSize]}`}
                    style={{ borderRadius: `${buttonRoundness}px` }}
                  >
                    <span>{project.customLiveText || projectButtonText}</span>
                    {showButtonIcon && <ExternalLink className={iconSizeClasses[buttonSize]} />}
                  </a>
                )} */}
                {/* {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors font-medium ${buttonSizeClasses[buttonSize]}`}
                    style={{ borderRadius: `${buttonRoundness}px` }}
                  >
                    <span>{project.customCodeText || codeButtonText}</span>
                    {showButtonIcon && <Code className={iconSizeClasses[buttonSize]} />}
                  </a>
                )} */}
                
                {/* New custom buttons system */}
                {project.customButtons && project.customButtons.map((button, btnIndex) => {
                  const variant = button.variant || 'primary';
                  const isPrimary = variant === 'primary';
                  
                  return (
                    <a
                      key={btnIndex}
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 transition-colors font-medium ${buttonSizeClasses[buttonSize]} ${
                        !showIconFirst ? 'flex-row' : 'flex-row-reverse'
                      } ${
                        isPrimary
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                      style={{ borderRadius: `${buttonRoundness}px` }}
                    >
                      <span>{button.text}</span>
                      {showButtonIcon && getButtonIcon(button.icon)}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
