import React from 'react';
import { SectionHeaderBlockProps } from '@/types';

interface SectionHeaderBlockRendererProps {
  props: SectionHeaderBlockProps;
}

export function SectionHeaderBlockRenderer({ props }: SectionHeaderBlockRendererProps) {
  const alignment = props.alignment || 'left';
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={`py-4 ${alignmentClasses[alignment as keyof typeof alignmentClasses]}`}>
      {(props.showSupertext ?? false) && props.supertext && (
        <p 
          className="text-neutral-500 dark:text-neutral-400 font-medium tracking-wide"
          style={{ 
            fontSize: `${props.supertextFontSize || 12}px`,
            marginBottom: `${props.supertextGap ?? 8}px`
          }}
        >
          {props.supertext}
        </p>
      )}
      <h2 
        className="font-bold text-neutral-900 dark:text-white"
        style={{ fontSize: `${props.titleFontSize || 24}px` }}
      >
        {props.title}
      </h2>
      {(props.showSubtitle ?? true) && props.subtitle && (
        <p 
          className="text-neutral-600 dark:text-neutral-400"
          style={{ 
            fontSize: `${props.subtitleFontSize || 14}px`,
            marginTop: `${props.subtitleGap ?? 4}px`
          }}
        >
          {props.subtitle}
        </p>
      )}
    </div>
  );
}
