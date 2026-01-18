import React from 'react';
import { CTASectionProps } from '@/types';
import { Button } from '@/components/ui/Button';

interface CTASectionRendererProps {
  variant: string;
  props: CTASectionProps;
}

export function CTASectionRenderer({ variant, props }: CTASectionRendererProps) {
  const { title, subtitle, primaryButton, secondaryButton } = props;

  if (variant === 'centered') {
    return (
      <div className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
              {subtitle}
            </p>
          )}
          
          <div className="flex items-center justify-center gap-4">
            {primaryButton && (
              <Button
                onClick={() => window.location.href = primaryButton.url}
              >
                {primaryButton.label}
              </Button>
            )}
            
            {secondaryButton && (
              <Button
                variant="secondary"
                onClick={() => window.location.href = secondaryButton.url}
              >
                {secondaryButton.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div className="py-12 px-6">
        <div className="grid md:grid-cols-2 gap-6 p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-neutral-600 dark:text-neutral-400">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-end gap-4">
            {primaryButton && (
              <Button
                onClick={() => window.location.href = primaryButton.url}
              >
                {primaryButton.label}
              </Button>
            )}
            
            {secondaryButton && (
              <Button
                variant="secondary"
                onClick={() => window.location.href = secondaryButton.url}
              >
                {secondaryButton.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="py-12 px-6 text-center">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">
        {title}
      </h2>
      {primaryButton && (
        <Button onClick={() => window.location.href = primaryButton.url}>
          {primaryButton.label}
        </Button>
      )}
    </div>
  );
}
