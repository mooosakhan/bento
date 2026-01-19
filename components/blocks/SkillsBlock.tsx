import React from 'react';
import { SkillsBlockProps } from '@/types';

interface SkillsBlockRendererProps {
  props: SkillsBlockProps;
  theme: any;
}

export function SkillsBlockRenderer({ props, theme }: SkillsBlockRendererProps & { theme: any }) {
  if (!props.skills || props.skills.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm text-center text-neutral-500 dark:text-neutral-400">
        No skills added yet
      </div>
    );
  }

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600';
      case 'Intermediate':
        return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600';
      case 'Beginner':
        return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600';
      default:
        return 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600';
    }
  };

  if (props.layout === 'chips') {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm"
        // style={{ backgroundColor: theme?.background }}
        >
        <div className="flex flex-wrap gap-2">
          {props.skills.map((skill, index) => (
            <div
              key={index}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border  ${getLevelColor(skill.level)}`}

            >
              <span className="font-medium">{skill.name}</span>
              {skill.level && (
                <span className="text-xs opacity-75">• {skill.level}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Grid layout
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {props.skills.map((skill, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${getLevelColor(skill.level)} text-center`}
          >
            <div className="font-semibold">{skill.name}</div>
            {skill.level && (
              <div className="text-xs mt-1 opacity-75">{skill.level}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
