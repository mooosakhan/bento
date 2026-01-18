import React from 'react';
import { GitHubSectionProps } from '@/types';

interface GitHubSectionRendererProps {
  variant: string;
  props: GitHubSectionProps;
}

export function GitHubSectionRenderer({ variant, props }: GitHubSectionRendererProps) {
  const { title, username, widgets, theme: widgetTheme } = props;
  const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>('light');
  
  // Detect theme from document
  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setCurrentTheme(isDark ? 'dark' : 'light');
    
    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  if (!username) {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Please add your GitHub username to display widgets
          </p>
        </div>
      </div>
    );
  }

  const getThemeParam = () => {
    if (widgetTheme === 'auto') {
      return currentTheme === 'dark' ? 'dark' : 'default';
    }
    return widgetTheme === 'dark' ? 'dark' : 'default';
  };

  const themeParam = getThemeParam();

  const renderStreakWidget = () => {
    const streakUrl = `https://streak-stats.demolab.com/?user=${username}&theme=${themeParam}&hide_border=true&border_radius=8`;
    
    return (
      <div className="flex justify-center">
        <img 
          src={streakUrl} 
          alt={`${username} GitHub streak`}
          className="max-w-full h-auto"
          loading="lazy"
        />
      </div>
    );
  };

  const renderStatsWidget = () => {
    const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${themeParam === 'dark' ? 'dark' : 'default'}&hide_border=true&border_radius=8`;
    
    return (
      <div className="flex justify-center">
        <img 
          src={statsUrl} 
          alt={`${username} GitHub stats`}
          className="max-w-full h-auto"
          loading="lazy"
        />
      </div>
    );
  };

  if (variant === 'streak') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/50 p-6">
          {renderStreakWidget()}
        </div>
      </div>
    );
  }

  if (variant === 'stats') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/50 p-6">
          {renderStatsWidget()}
        </div>
      </div>
    );
  }

  if (variant === 'combined') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="space-y-6">
          {widgets.includes('streak') && (
            <div className="rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/50 p-6">
              {renderStreakWidget()}
            </div>
          )}
          
          {widgets.includes('stats') && (
            <div className="rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/50 p-6">
              {renderStatsWidget()}
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
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      <div className="rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/50 p-6">
        {renderStreakWidget()}
      </div>
    </div>
  );
}
