'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Portfolio } from '@/types';
import { loadPortfolio } from '@/lib/portfolioUtils';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { applyThemeMode } from '@/lib/theme';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  const params = useParams();
  const handle = params.handle as string;
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  // Poll for updates to enable live sync
  useEffect(() => {
    const loadData = () => {
      const loaded = loadPortfolio();
      
      // Check if the handle matches
      if (loaded && loaded.handle === handle) {
        setPortfolio(loaded);
        setLoading(false);
        
        // Apply theme mode
        if (loaded.theme?.mode) {
          applyThemeMode(loaded.theme.mode);
        }
      } else {
        setPortfolio(null);
        setLoading(false);
      }
    };

    loadData();

    // Poll every 500ms for live updates from builder
    const interval = setInterval(loadData, 500);

    return () => clearInterval(interval);
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Portfolio Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            The portfolio "@{handle}" doesn't exist or hasn't been published yet.
          </p>
          <Link
            href="/builder-v2"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Create Your Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Sort sections by order
  const sortedSections = [...portfolio.sections].sort((a, b) => a.order - b.order);

  return (
    <div 
      className="min-h-screen"
      style={{
        background: portfolio.theme.background,
      }}
    >
      {/* Edit Button (only visible when accessing your own portfolio) */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          href="/builder-v2"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm font-medium text-neutral-900 dark:text-white"
        >
          <ArrowLeft size={16} />
          Back to Editor
        </Link>
      </div>

      {/* Portfolio Content */}
      <div className="max-w-5xl mx-auto">
        {sortedSections.map((section) => (
          <div key={section.id}>
            <SectionRenderer section={section} isBuilder={false} />
          </div>
        ))}

        {sortedSections.length === 0 && (
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                Portfolio is Empty
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Start building your portfolio by adding sections in the editor.
              </p>
              <Link
                href="/builder-v2"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Open Editor
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="py-8 text-center border-t border-neutral-200 dark:border-neutral-700 mt-12">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Built with <span className="text-red-500">♥</span> using BentoBuilder
        </p>
      </div>
    </div>
  );
}
