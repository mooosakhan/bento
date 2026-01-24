import React from 'react';
import { LinkBlockProps } from '@/types';
import { ExternalLink } from 'lucide-react';

interface LinkBlockRendererProps {
  props: LinkBlockProps;
}

export function LinkBlockRenderer({ props }: LinkBlockRendererProps) {
  if (props.style === 'button') {
    return (
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-6 py-4 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl hover:border-neutral-900 dark:hover:border-neutral-500 hover:shadow-md transition-all duration-200 group"
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-neutral-900 dark:text-white">
            {props.title}
          </span>
          <ExternalLink className="w-5 h-5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
        </div>
      </a>
    );
  }

  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 transition-colors"
    >
      <span>{props.title}</span>
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}
