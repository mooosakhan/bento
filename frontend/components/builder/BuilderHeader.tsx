"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Logout } from '@/api/auth';
import { ProfileModal } from '@/components/builder/ProfileModal';

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

  const [isJiggling, setIsJiggling] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showMenu = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setMenuVisible(true);
  };

  const startHideTimer = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setMenuVisible(false);
      hideTimeout.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  // Handle click event
  const handleClick = () => {
    setIsJiggling(true);

    // Reset jiggle animation after it ends (1s duration in this case)
    setTimeout(() => {
      setIsJiggling(false);
    }, 1000);
  };

  const handleLogout = async () => {
    await Logout();
    window.location.href = '/login';
  }
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#131111] border-b border-neutral-200 dark:border-neutral-800 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
                Portfoli.me
              </h1>
              {/* <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded">
                BETA
              </span> */}
            </div>
          </div>
        </div>

        {/* Center: View & Mode Controls */}
        <div className="flex items-center gap-4">
          {/* Cursor Mode Toggle */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 shadow-sm">
            <button
              onClick={() => onCursorModeChange('select')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer duration-200 ${cursorMode === 'select'
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              title="Select mode (V)"
            >
              <MousePointer2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onCursorModeChange('grab')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer duration-200 ${cursorMode === 'grab'
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
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer duration-200 ${viewMode === 'mobile'
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              title="Mobile view (M)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('tablet')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer duration-200 ${viewMode === 'tablet'
                ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              title="Tablet view (T)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('desktop')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer duration-200 ${viewMode === 'desktop'
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
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              title="Undo (⌘Z)"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
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
              className="px-3 py-1.5 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>Templates</span>
            </button>
            <button
              onClick={onPreviewClick}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <div  >

            <ThemeToggle />
          </div>
        </div>

        {/* Right: Primary Actions & Status */}
        <div className="flex items-center gap-4 cursor-pointer">
          {/* Saved Indicator */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={handleClick}>
            {/* Saved Indicator */}
            <div
              className={`flex w-full items-center gap-2 cursor-pointer ${isJiggling ? "animate-jiggle" : ""
                }`}
              title="Saving changes..."
            >
              <div className="flex items-center gap-1.5 w-full text-xs text-neutral-500 dark:text-neutral-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium w-full whitespace-nowrap overflow-hidden text-ellipsis" title="cloudLabel">
                  {cloudLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

          {/* Public Handle Link */}
          <a
            href={`/u/${publicHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 cursor-pointer"
            title="View public profile"
          >
            <span className="text-xs">portfoli.me/{publicHandle}</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />



          {/* Publish Button - Primary CTA */}
          <button
            onClick={onPublishClick}
            className="px-4 py-[7px] rounded-full bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-white dark:to-neutral-100 text-white dark:text-neutral-900 font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Publish</span>
          </button>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

          <div className='w-full h-full flex items-center justify-center'>
            <div
              className="relative"
              onMouseEnter={showMenu}
              onMouseLeave={startHideTimer}
            >
              <div className="cursor-pointer">
                <Avatar size="lg" className='overflow-auto hover:dark:bg-neutral-100 rounded-full'>
                  <AvatarImage src="https://api.dicebear.com/9.x/lorelei/svg?seed=Kingston" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div
                className={`absolute right-0 mt-2 w-44 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg py-2 z-50 transition-opacity ${menuVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onMouseEnter={showMenu}
                onMouseLeave={startHideTimer}
              >
                <button
                  onClick={() => setProfileModalOpen(true)}
                  className="w-full text-left block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          {profileModalOpen && (
            <ProfileModal
              initialHandle={publicHandle}
              onClose={() => setProfileModalOpen(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}
