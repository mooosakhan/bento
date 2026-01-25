'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { ThemeMode } from '@/lib/theme';

export function ThemeToggle() {
  const { themeMode, setThemeMode } = useTheme();

  const toggleTheme = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  const getIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getTooltip = () => {
    switch (themeMode) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'system':
        return 'System preference';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      title={getTooltip()}
      className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer text-neutral-700 dark:text-neutral-300"
    >
      {getIcon()}
    </button>
  );
}

export function ThemeSegmentedControl() {
  const { themeMode, setThemeMode } = useTheme();

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        Theme Mode
      </label>
      <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1">
        <button
          onClick={() => setThemeMode('light')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full font-medium transition-all text-sm ${
            themeMode === 'light'
              ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Light</span>
        </button>
        <button
          onClick={() => setThemeMode('dark')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full font-medium transition-all text-sm ${
            themeMode === 'dark'
              ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span>Dark</span>
        </button>
        <button
          onClick={() => setThemeMode('system')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full font-medium transition-all text-sm ${
            themeMode === 'system'
              ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>System</span>
        </button>
      </div>
    </div>
  );
}
