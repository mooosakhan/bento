import React from 'react';
import { Profile } from '@/types';

interface SectionGapControlProps {
  profile: Profile;
  onUpdateProfile: (profile: Profile) => void;
}

export const SectionGapControl: React.FC<SectionGapControlProps> = ({ profile, onUpdateProfile }) => {
  return (
    <div className="p-4 border-t z-99 border-neutral-200 dark:border-[#2a2b2a] dark:bg-[#111010]">
      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Page Settings</h3>

        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
          Section Gap
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="80"
            value={profile.sectionGap || 16}
            onChange={(e) => onUpdateProfile({ ...profile, sectionGap: Number(e.target.value) })}
            className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg"
          />
          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 w-12 text-right">
            {profile.sectionGap || 0}px
          </span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5">Space between all sections</p>
      </div>
    </div>
  );
};
