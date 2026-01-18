import React from 'react';
import { ExperienceBlockProps } from '@/types';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceBlockRendererProps {
  props: ExperienceBlockProps;
}

export function ExperienceBlockRenderer({ props }: ExperienceBlockRendererProps) {
  if (!props.items || props.items.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm text-center text-neutral-500 dark:text-neutral-400">
        No experience added yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {props.items.map((item, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                {item.role}
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                {item.company}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {item.startDate} - {item.endDate || 'Present'}
                </span>
              </div>
              {item.description && (
                <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
