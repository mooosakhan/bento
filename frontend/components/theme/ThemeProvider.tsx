'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, getInitialThemeMode, applyThemeMode, getEffectiveTheme, watchSystemTheme } from '@/lib/theme';

interface ThemeContextType {
  themeMode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme on mount
  useEffect(() => {
    const initialMode = getInitialThemeMode();
    setThemeModeState(initialMode);
    applyThemeMode(initialMode);
    setEffectiveTheme(getEffectiveTheme(initialMode));
  }, []);

  // Watch for system theme changes when in system mode
  useEffect(() => {
    if (themeMode !== 'system') return;

    const cleanup = watchSystemTheme((isDark) => {
      setEffectiveTheme(isDark ? 'dark' : 'light');
      applyThemeMode('system');
    });

    return cleanup;
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    applyThemeMode(mode);
    setEffectiveTheme(getEffectiveTheme(mode));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, effectiveTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
