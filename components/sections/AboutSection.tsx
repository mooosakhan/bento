import React from 'react';
import { AboutSectionProps } from '@/types';

interface AboutSectionRendererProps {
  variant: string;
  props: AboutSectionProps;
}

export function AboutSectionRenderer({ variant, props }: AboutSectionRendererProps) {
  const { title, content, imageUrl, highlights } = props;

  if (variant === 'short') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            {title}
          </h2>
        )}
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {content}
        </p>
      </div>
    );
  }

  if (variant === 'long') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
        
        {highlights && highlights.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
              Key Strengths
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-center"
                >
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'twoColumn') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </div>
          
          {imageUrl && (
            <div className="rounded-2xl overflow-hidden">
              <img
                src={imageUrl}
                alt="About"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="py-8 px-6">
      {title && (
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {content}
      </p>
    </div>
  );
}
