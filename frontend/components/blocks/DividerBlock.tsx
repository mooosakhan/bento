import React from 'react';
import { DividerBlockProps } from '@/types';

interface DividerBlockRendererProps {
  props: DividerBlockProps;
}

export function DividerBlockRenderer({ props }: DividerBlockRendererProps) {
  const styleClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  return (
    <hr className={`border-neutral-300 dark:border-neutral-700 ${styleClasses[props.style]} my-4`} />
  );
}
