/**
 * Theme Management Utilities
 * Handles theme mode detection, persistence, and application
 */

export type ThemeMode = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'bento-theme-mode';

/**
 * Get the initial theme mode from localStorage or default to light
 */
export function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  
  return 'light';
}

/**
 * Get the effective theme (resolve 'system' to 'light' or 'dark')
 */
export function getEffectiveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}

/**
 * Apply theme mode to the document
 */
export function applyThemeMode(mode: ThemeMode) {
  if (typeof window === 'undefined') return;
  
  const effectiveTheme = getEffectiveTheme(mode);
  const root = document.documentElement;
  
  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Store the user's preference
  localStorage.setItem(THEME_STORAGE_KEY, mode);
}

/**
 * Watch for system theme changes when in 'system' mode
 */
export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }
  
  // Fallback for older browsers
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}
