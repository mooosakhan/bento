import React from 'react';
import { CustomSectionProps } from '@/types';
import * as Icons from 'lucide-react';

interface CustomSectionRendererProps {
  variant: string;
  props: CustomSectionProps;
}

export function CustomSectionRenderer({ variant, props }: CustomSectionRendererProps) {
  const { title, subtitle, content, layout, cards } = props;

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon size={24} /> : null;
  };

  const getContainerWidth = () => {
    switch (layout.containerWidth) {
      case 'wide':
        return 'max-w-6xl';
      case 'full':
        return 'max-w-full';
      default:
        return 'max-w-4xl';
    }
  };

  const getColumns = () => {
    switch (layout.columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const getSpacing = () => {
    switch (layout.spacing) {
      case 'compact':
        return 'gap-3';
      case 'spacious':
        return 'gap-8';
      default:
        return 'gap-6';
    }
  };

  return (
    <div className="py-8 px-6">
      <div className={`mx-auto ${getContainerWidth()}`}>
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            {title}
          </h2>
        )}
        
        {subtitle && (
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {subtitle}
          </p>
        )}
        
        {content && (
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </div>
        )}
        
        {cards && cards.length > 0 && (
          <div className={`grid ${getColumns()} ${getSpacing()}`}>
            {cards.map((card) => (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              >
                {card.imageUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                {card.icon && (
                  <div className="mb-4 text-blue-600 dark:text-blue-400">
                    {getIcon(card.icon)}
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                
                {card.description && (
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed whitespace-pre-wrap">
                    {card.description}
                  </p>
                )}
                
                {card.tags && card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {card.link && card.buttonLabel && (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {card.buttonLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
