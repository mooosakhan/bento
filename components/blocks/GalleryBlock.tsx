import React from 'react';
import { GalleryBlockProps } from '@/types';

interface GalleryBlockRendererProps {
  props: GalleryBlockProps;
}

export function GalleryBlockRenderer({ props }: GalleryBlockRendererProps) {
  if (!props.images || props.images.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-400">
        No images added
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {props.images.map((imageUrl, index) => (
        <div 
          key={index} 
          className="aspect-square rounded-xl overflow-hidden bg-neutral-100"
        >
          <img 
            src={imageUrl} 
            alt={`Gallery ${index + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}
