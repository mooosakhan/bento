import React from 'react';
import { HighlightsSectionProps } from '@/types';
import * as Icons from 'lucide-react';

interface HighlightsSectionRendererProps {
  variant: string;
  props: HighlightsSectionProps;
}

export function HighlightsSectionRenderer({ variant, props }: HighlightsSectionRendererProps) {
  const { title, items } = props;

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon size={28} /> : null;
  };

  if (variant === 'threeColumn') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          {items?.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-center"
            >
              {item.icon && (
                <div className="flex justify-center mb-3 text-blue-600 dark:text-blue-400">
                  {getIcon(item.icon)}
                </div>
              )}
              <div className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                {item.value}
              </div>
              <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'fourColumn') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items?.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 text-center"
            >
              {item.icon && (
                <div className="flex justify-center mb-3 text-blue-600 dark:text-blue-400">
                  {getIcon(item.icon)}
                </div>
              )}
              <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
                {item.value}
              </div>
              <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'withDescription') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {items?.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50"
            >
              <div className="flex items-start gap-4">
                {item.icon && (
                  <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                    {getIcon(item.icon)}
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    {item.label}
                  </div>
                  {item.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="py-8 px-6">
      {title && (
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      <div className="grid md:grid-cols-3 gap-6">
        {items?.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 text-center"
          >
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              {item.value}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
