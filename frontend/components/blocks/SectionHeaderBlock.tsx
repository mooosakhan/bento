import React from 'react';
import { SectionHeaderBlockProps } from '@/types';

interface SectionHeaderBlockRendererProps {
  props: SectionHeaderBlockProps;
}

export function SectionHeaderBlockRenderer({ props }: SectionHeaderBlockRendererProps) {
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
        {props.title}
      </h2>
      {props.subtitle && (
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {props.subtitle}
        </p>
      )}
    </div>
  );
}
