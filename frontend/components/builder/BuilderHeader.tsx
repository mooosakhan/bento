import React from 'react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  LayoutTemplate,
  Undo2,
  Redo2,
  ExternalLink,
  Sparkles,
  MousePointer2,
  Hand,
} from 'lucide-react';

interface BuilderHeaderProps {
  viewMode: 'mobile' | 'tablet' | 'desktop';
  onViewModeChange: (mode: 'mobile' | 'tablet' | 'desktop') => void;
  cursorMode: 'select' | 'grab';
  onCursorModeChange: (mode: 'select' | 'grab') => void;
  onTemplatesClick: () => void;
  onPreviewClick: () => void;
  onPublishClick: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSaved: boolean;
  publicHandle: string;
  cloudStatus?: "idle" | "loading" | "saving" | "saved" | "local-only" | "error";

}

export function BuilderHeader({
  viewMode,
  onViewModeChange,
  cursorMode,
  onCursorModeChange,
  onTemplatesClick,
  onPreviewClick,
  onPublishClick,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isSaved,
  publicHandle,
  cloudStatus,
}: BuilderHeaderProps) {
  const cloudLabel =
    cloudStatus === "loading" ? "Loading..."
      : cloudStatus === "saving" ? "Saving..."
        : cloudStatus === "saved" ? "Saved"
          : cloudStatus === "local-only" ? "Saved locally"
            : cloudStatus === "error" ? "Sync error"
              : "";

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#131111] border-b border-neutral-200 dark:border-neutral-800 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
                BentoBuilder
              </h1>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded">
                BETA
              </span>
            </div>
          </div>
        </div>

        {/* Center: View & Mode Controls */}
        <div className="flex items-center gap-4">
          {/* Cursor Mode Toggle */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 shadow-sm">
            <button
              onClick={() => onCursorModeChange('select')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${cursorMode === 'select'
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              title="Select mode (V)"
            >
              <MousePointer2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onCursorModeChange('grab')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${cursorMode === 'grab'
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              title="Grab mode (H)"
            >
              <Hand className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

          {/* Device Preview Toggle */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 shadow-sm">
            <button
              onClick={() => onViewModeChange('mobile')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${viewMode === 'mobile'
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              title="Mobile view (M)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('tablet')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${viewMode === 'tablet'
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              title="Tablet view (T)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('desktop')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${viewMode === 'desktop'
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              title="Desktop view (D)"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              title="Undo (⌘Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              title="Redo (⌘⇧Z)"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

          {/* Builder Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTemplatesClick}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 flex items-center gap-2"
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>Templates</span>
            </button>
            <button
              onClick={onPreviewClick}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Right: Primary Actions & Status */}
        <div className="flex items-center gap-4">
          {/* Saved Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">{cloudLabel}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

          {/* Public Handle Link */}
          <a
            href={`/u/${publicHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
            title="View public profile"
          >
            <span className="text-xs">/u/{publicHandle}</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Publish Button - Primary CTA */}
          <button
            onClick={onPublishClick}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-white dark:to-neutral-100 text-white dark:text-neutral-900 font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-200 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Publish</span>
          </button>
        </div>
      </div>
    </header>
  );
}
