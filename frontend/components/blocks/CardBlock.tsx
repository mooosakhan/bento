import React from 'react';
import { CardBlockProps } from '@/types';
import { ExternalLink } from 'lucide-react';

interface CardBlockRendererProps {
  props: CardBlockProps;
}

export function CardBlockRenderer({ props }: CardBlockRendererProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {props.imageUrl && (
        <div className="aspect-video w-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
          <img 
            src={props.imageUrl} 
            alt={props.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
          {props.title}
        </h3>
        {props.description && (
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            {props.description}
          </p>
        )}
        {props.ctaText && props.ctaUrl && (
          <a
            href={props.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            <span>{props.ctaText}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
