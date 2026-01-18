'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Profile } from '@/types';
import { getProfileByHandle } from '@/lib/profileUtils';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { applyThemeMode, getEffectiveTheme } from '@/lib/theme';

export default function ProfilePage() {
  const params = useParams();
  const handle = params.handle as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Poll for updates to enable live sync
  useEffect(() => {
    const loadProfile = () => {
      const loadedProfile = getProfileByHandle(handle);
      setProfile(loadedProfile);
      setLoading(false);
      
      // Apply the theme mode from the profile
      if (loadedProfile?.theme?.mode) {
        applyThemeMode(loadedProfile.theme.mode);
      }
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
    <div 
      className="min-h-screen py-8 px-4 bg-neutral-100 dark:bg-neutral-900"
      style={{ backgroundColor: profile.theme.background }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Profile Content */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-6 mb-6">
          <div className="space-y-4">
            {profile.blocks.map(block => (
              <div key={block.id}>
                <BlockRenderer block={block} />
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
