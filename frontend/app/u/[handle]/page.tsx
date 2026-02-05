'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { Button } from '@/components/ui/button';
import { applyThemeMode, getInitialThemeMode, ThemeMode } from '@/lib/theme';
import type { Profile as UiProfile, Block } from '@/types';
import { getPublicProfile } from '@/api/profile';

// -----------------------------
// 1) Backend response types
// -----------------------------
type ApiProfileResponse = {
  _id: string;
  version: number;
  handle: string;
  profile: {
    displayName: string;
    headline?: string;
    bio?: string;
    location?: string;
    avatar?: { type: 'url' | 'upload' | 'preset'; value: string };
  };
  theme: any; // your backend theme object
  layout?: any;
  blocks: Block[]; // ✅ same Block shape in your response (id,type,props,gapBefore,...)
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

// -----------------------------
// 2) Adapter: API -> UI Profile
// -----------------------------
function normalizeApiToUiProfile(api: ApiProfileResponse): UiProfile {
  const avatarUrl =
    api.profile?.avatar?.value ||
    'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

  return {
    handle: api.handle,
    displayName: api.profile?.displayName || 'Your Name',
    bio: api.profile?.bio || '',
    avatarUrl, // ✅ your UI uses avatarUrl
    theme: {
      // keep your UI theme keys compatible
      mode: (api.theme?.mode as ThemeMode) || getInitialThemeMode(),
      background: '', // you said you use tailwind classes instead
      cardStyle: api.theme?.cardStyle || 'default',
      accentColor: api.theme?.accentColor || '#000000',
      fontScale: api.theme?.fontScale ?? 1,
      // if your UI supports more, you can map them too
    },
    blocks: Array.isArray(api.blocks) ? api.blocks : [],
    sectionGap: api.layout?.page?.sectionGap ?? 16, // ✅ comes from layout.page.sectionGap
    portfolioWidth: api.layout?.page?.portfolioWidth ?? 0, // ✅ portfolio width setting
  };
}

// -----------------------------
// 3) Fetch function
// -----------------------------
async function fetchPublicProfile(handle: string): Promise<ApiProfileResponse | null> {
  try {
    const res = await getPublicProfile(handle)
    console.log(res);
    // if (!res.ok) return null;
    return res as ApiProfileResponse;
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const params = useParams();
  const handle = (params.handle as string) || '';

  const [profile, setProfile] = useState<UiProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    const api = await fetchPublicProfile(handle);
    console.log(api);
    
    if (!api || !api.published) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const uiProfile = normalizeApiToUiProfile(api);
    setProfile(uiProfile);

    // ✅ apply theme based on backend
    applyThemeMode(uiProfile.theme.mode);

    setLoading(false);
  };

  // first load
  useEffect(() => {
    // if nothing exists, apply saved theme so page doesn't flash
    applyThemeMode(getInitialThemeMode());
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  const content = useMemo(() => {
    if (!profile) return null;

    return (
      <div className="space-y-0">
        {profile.blocks.map((block) => (
          <div 
            key={block.id} 
            style={{ marginTop: `${block.gapBefore ?? profile.sectionGap ?? 16}px` }}
          >
            <BlockRenderer block={block} theme={profile.theme} />
          </div>
        ))}
      </div>
    );
  }, [profile]);

  // -----------------------------
  // UI states
  // -----------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-[#0b0a0b] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white mx-auto" />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-[#0b0a0b] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Profile not found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The profile "@{handle}" doesn't exist or hasn't been published yet.
          </p>

          <div className="flex items-center justify-center gap-2">
            <Link href="/builder">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go to Builder
              </Button>
            </Link>

            <Button variant="secondary" onClick={load}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Render
  // -----------------------------
  const portfolioWidth = profile?.portfolioWidth ?? 0;
  const containerStyle = portfolioWidth > 0 
    ? { width: `${portfolioWidth}px`, maxWidth: '100%' } 
    : {};

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#0b0a0b]">
      <div 
        className={`mx-auto ${portfolioWidth > 0 ? '' : 'max-w-4xl'}`}
        style={containerStyle}
      >
        {/* small info bar */}
        {/* <div className="mb-4 flex items-center justify-between">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Viewing <span className="font-mono">@{handle}</span>
          </div>

          <Button variant="secondary" size="sm" onClick={load}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div> */}

        {/* Profile */}
        <div className="rounded-3xl p-6 mb-6 bg-neutral-100 dark:bg-[#0b0a0b]">
          {content}
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
