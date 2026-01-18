import React from 'react';
import { ExperienceSectionProps } from '@/types';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceSectionRendererProps {
  variant: string;
  props: ExperienceSectionProps;
}

export function ExperienceSectionRenderer({ variant, props }: ExperienceSectionRendererProps) {
  const { title, items } = props;

  const formatDateRange = (startDate: string, endDate?: string) => {
    return `${startDate} - ${endDate || 'Present'}`;
  };

  if (variant === 'timeline') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
            {title}
          </h2>
        )}
        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700" />
          
          {items?.map((item, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-500 transform -translate-x-[3px]" />
              
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {item.role}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                      {item.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  <Calendar size={14} />
                  <span>{formatDateRange(item.startDate, item.endDate)}</span>
                </div>
                
                <p className="text-neutral-700 dark:text-neutral-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="space-y-4">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {item.role}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {item.company}
                  </p>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap ml-4">
                  {formatDateRange(item.startDate, item.endDate)}
                </span>
              </div>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:shadow-lg dark:hover:bg-neutral-800 transition-all"
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                {item.role}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 font-medium mb-3">
                {item.company}
              </p>
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                <Calendar size={14} />
                <span>{formatDateRange(item.startDate, item.endDate)}</span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300">
                {item.description}
              </p>
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
      <div className="space-y-4">
        {items?.map((item, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
              {item.role} at {item.company}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {formatDateRange(item.startDate, item.endDate)}
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
