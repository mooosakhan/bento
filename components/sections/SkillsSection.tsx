import React from 'react';
import { SkillsSectionProps } from '@/types';

interface SkillsSectionRendererProps {
  variant: string;
  props: SkillsSectionProps;
}

export function SkillsSectionRenderer({ variant, props }: SkillsSectionRendererProps) {
  const { title, skills, grouped, categories, showLevels } = props;

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-green-500';
      case 'Intermediate':
        return 'bg-yellow-500';
      case 'Beginner':
        return 'bg-blue-500';
      default:
        return 'bg-neutral-500';
    }
  };

  if (variant === 'chips') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills?.map((skill, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="font-semibold text-neutral-900 dark:text-white mb-1">
                {skill.name}
              </div>
              {showLevels && skill.level && (
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {skill.level}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'withLevels') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="space-y-4">
          {skills?.map((skill, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {skill.name}
                </span>
                {skill.level && (
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {skill.level}
                  </span>
                )}
              </div>
              {skill.level && (
                <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getLevelColor(skill.level)} transition-all`}
                    style={{
                      width:
                        skill.level === 'Advanced'
                          ? '90%'
                          : skill.level === 'Intermediate'
                          ? '60%'
                          : '30%',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'grouped' && grouped && categories) {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
            {title}
          </h2>
        )}
        <div className="space-y-8">
          {categories.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
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
      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, idx) => (
          <span
            key={idx}
            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
