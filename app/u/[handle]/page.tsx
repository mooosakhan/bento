'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Profile } from '@/types';
import { getProfileByHandle } from '@/lib/profileUtils';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Sun, Moon, Monitor } from 'lucide-react';
import Link from 'next/link';
import { applyThemeMode, getEffectiveTheme, getInitialThemeMode, ThemeMode } from '@/lib/theme';

export default function ProfilePage() {
  const params = useParams();
  const handle = params.handle as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const initialMode = getInitialThemeMode();
    setThemeModeState(initialMode);
    applyThemeMode(initialMode);
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const newMode = modes[nextIndex];
    setThemeModeState(newMode);
    applyThemeMode(newMode);
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
    }
  };

  // Poll for updates to enable live sync
  useEffect(() => {
    const loadProfile = () => {
      const loadedProfile = getProfileByHandle(handle);
      setProfile(loadedProfile);
      setLoading(false);
    };

    loadProfile();

    // Poll every 500ms for live updates
    const interval = setInterval(loadProfile, 500);

    return () => clearInterval(interval);
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Profile not found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The profile "@{handle}" doesn't exist or hasn't been published yet.
          </p>
          <Link href="/builder">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Builder
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-neutral-100 dark:bg-[#0b0a0b]">
    

      <div className="max-w-4xl mx-auto">
        {/* Profile Content */}
        <div className="rounded-3xl p-6 mb-6 bg-neutral-100 dark:bg-[#0b0a0b] ">
          <div className="space-y-4">
            {profile.blocks.map(block => (
              <div key={block.id}>
                <BlockRenderer block={block} theme={profile.theme} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <Link href="/builder">
            <Button variant="ghost" size="sm">
              Create your own with BentoBuilder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
