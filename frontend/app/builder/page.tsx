'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Block, BlockType, Profile, HistoryState } from '@/types';
import { getBlockDefinition } from '@/lib/blockRegistry';
import { generateHandle, saveProfile, getProfile } from '@/lib/profileUtils';
import { BlockLibrary } from '@/components/builder/BlockLibrary';
import { Canvas } from '@/components/builder/Canvas';
import { Inspector } from '@/components/builder/Inspector';
import { PublishModal } from '@/components/builder/PublishModal';
import { TemplatePickerModal } from '@/components/builder/TemplatePickerModal';
import { BuilderHeader } from '@/components/builder/BuilderHeader';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Smartphone,
  Tablet,
  Monitor,
  Search,
  Plus,
  HammerIcon,
  RectangleHorizontal,
  LayoutGrid,
  Menu,
  Backpack,
  ExternalLink,
  LayoutTemplate,
  CreditCard,
  Share2,
  Minus,
  ArrowLeft,
} from 'lucide-react';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { getMyProfile,updateMyProfile } from '@/api/profile';

const TABS = [
  { id: '1', label: 'Navbar', icon: <HammerIcon className="w-4 h-4" /> },
  { id: '2', label: 'Header', icon: <RectangleHorizontal className="w-4 h-4" /> },
  { id: '3', label: 'Experience', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: '4', label: 'Projects', icon: <Menu className="w-4 h-4" /> },
  { id: '5', label: 'Skills', icon: <Backpack className="w-4 h-4" /> },
  { id: '6', label: 'Link', icon: <ExternalLink className="w-4 h-4" /> },
  { id: '7', label: 'Gallery', icon: <LayoutTemplate className="w-4 h-4" /> },
  { id: '8', label: 'Card', icon: <CreditCard className="w-4 h-4" /> },
  { id: '9', label: 'Divider', icon: <Minus className="w-4 h-4" /> },
  { id: '10', label: 'Social Row', icon: <Share2 className="w-4 h-4" /> },
  { id: '11', label: 'Section Header', icon: <CreditCard className="w-4 h-4" /> },
];

type CloudStatus = "idle" | "loading" | "saving" | "saved" | "local-only" | "error";

export default function BuilderPage() {
  const getInitialThemeMode = (): 'light' | 'dark' | 'system' => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bento-theme-mode');
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    }
    return 'light';
  };

  const [profile, setProfile] = useState<Profile>({
    handle: 'myprofile',
    displayName: 'Your Name',
    bio: 'Your bio',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    theme: {
      mode: getInitialThemeMode(),
      background: '',
      cardStyle: 'default',
      accentColor: '#000000',
      fontScale: 1,
    },
    blocks: [],
    sectionGap: 16,
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [isSaved, setIsSaved] = useState(true);
  const [cloudStatus, setCloudStatus] = useState<CloudStatus>("idle");

  const [isPreview, setIsPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [cursorMode, setCursorMode] = useState<'select' | 'grab'>('select');
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const addToHistory = useCallback((blocks: Block[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, { blocks: JSON.parse(JSON.stringify(blocks)), timestamp: Date.now() }];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // ✅ Load profile: cloud first if logged in, else local. Cloud failure falls back to local.
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        // CLOUD
        setCloudStatus("loading");
        const cloud = await getMyProfile();
        // if (!alive) return;

        // keep theme mode synced
        const themeMode = localStorage.getItem('bento-theme-mode');
        if (themeMode && (themeMode === 'light' || themeMode === 'dark' || themeMode === 'system')) {
          cloud.theme.mode = themeMode;
        }

        setProfile(cloud);
        addToHistory(cloud.blocks);
        saveProfile(cloud); // also keep local cache
        setCloudStatus("saved");
        setIsSaved(true);
        return;

        // LOCAL
        // const local = getProfile();
        // if (local && alive) {
        //   const themeMode = localStorage.getItem('bento-theme-mode');
        //   if (themeMode && (themeMode === 'light' || themeMode === 'dark' || themeMode === 'system')) {
        //     local.theme.mode = themeMode;
        //   }
        //   setProfile(local);
        //   addToHistory(local.blocks);
        //   setCloudStatus("local-only");
        //   setIsSaved(true);
        // }
      } catch {
        // fallback to local

        setCloudStatus("error");
      }
    }

    load();
  }, []);

  // ✅ Sync theme mode from localStorage if changed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const themeMode = localStorage.getItem('bento-theme-mode');
      if (themeMode && (themeMode === 'light' || themeMode === 'dark' || themeMode === 'system')) {
        if (profile.theme.mode !== themeMode) {
          setProfile(prev => ({
            ...prev,
            theme: { ...prev.theme, mode: themeMode as 'light' | 'dark' | 'system' },
          }));
        }
      }
    }
  }, [profile.theme.mode]);

  // ✅ Listen storage theme changes across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bento-theme-mode' && e.newValue) {
        const newMode = e.newValue;
        if (newMode === 'light' || newMode === 'dark' || newMode === 'system') {
          setProfile(prev => ({
            ...prev,
            theme: { ...prev.theme, mode: newMode },
          }));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Keyboard shortcut cursor mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'v' || e.key === 'V') setCursorMode('select');
      else if (e.key === 'h' || e.key === 'H') {
        setCursorMode('grab');
        setSelectedBlockId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCursorModeChange = (mode: 'select' | 'grab') => {
    setCursorMode(mode);
    if (mode === 'grab') setSelectedBlockId(null);
  };

  // selection from PageStructurePanel
  useEffect(() => {
    const handleSelectBlock = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setSelectedBlockId(customEvent.detail);
        setCursorMode('select');
      }
    };

    window.addEventListener('selectBlock', handleSelectBlock);
    return () => window.removeEventListener('selectBlock', handleSelectBlock);
  }, []);

  // ✅ Unified autosave (local always + cloud if logged in)
  // Watches blocks + sectionGap + theme (so those save too)
  useEffect(() => {
    setIsSaved(false);

    const timer = setTimeout(async () => {
      // generate handle from header name
      const headerBlock = profile.blocks.find(b => b.type === 'header');
      // const generatedHandle = generateHandle(displayName);

      const updatedProfile: Profile = {
        ...profile,
        // displayName,
      };

      // ✅ save local
      saveProfile(updatedProfile);

      // ✅ avoid infinite loop: only setProfile if needed
      // const needsSet =
      //   updatedProfile.handle !== profile.handle ||
      //   updatedProfile.displayName !== profile.displayName;

      // if (needsSet) {
      //   setProfile(updatedProfile);
      // }

      // ✅ save cloud if logged in
      if (true) {
        try {
          setCloudStatus("saving");
          await updateMyProfile(updatedProfile);
          setCloudStatus("saved");
        } catch {
          setCloudStatus("error");
        }
      } else {
        setCloudStatus("local-only");
      }

      setIsSaved(true);
    }, 900);

    return () => clearTimeout(timer);
  }, [profile.blocks, profile.sectionGap, profile.theme.mode]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setProfile(prev => ({
        ...prev,
        blocks: JSON.parse(JSON.stringify(history[newIndex].blocks)),
      }));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setProfile(prev => ({
        ...prev,
        blocks: JSON.parse(JSON.stringify(history[newIndex].blocks)),
      }));
    }
  };

  const addBlock = (type: BlockType) => {
    const definition = getBlockDefinition(type);
    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      props: JSON.parse(JSON.stringify(definition.defaultProps)),
      order: profile.blocks.length,
    };

    const newBlocks = [...profile.blocks, newBlock];
    setProfile(prev => ({ ...prev, blocks: newBlocks }));
    addToHistory(newBlocks);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (blockId: string, props: any) => {
    const newBlocks = profile.blocks.map(block =>
      block.id === blockId ? { ...block, props } : block
    );
    setProfile(prev => ({ ...prev, blocks: newBlocks }));
  };

  const updateBlockMeta = (blockId: string, updates: Partial<Block>) => {
    const newBlocks = profile.blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    setProfile(prev => ({ ...prev, blocks: newBlocks }));
  };

  const deleteBlock = (blockId: string) => {
    const newBlocks = profile.blocks.filter(b => b.id !== blockId);
    setProfile(prev => ({ ...prev, blocks: newBlocks }));
    addToHistory(newBlocks);
    setSelectedBlockId(null);
  };

  const duplicateBlock = (blockId: string) => {
    const block = profile.blocks.find(b => b.id === blockId);
    if (!block) return;

    const newBlock: Block = {
      ...block,
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      props: JSON.parse(JSON.stringify(block.props)),
    };

    const index = profile.blocks.findIndex(b => b.id === blockId);
    const newBlocks = [
      ...profile.blocks.slice(0, index + 1),
      newBlock,
      ...profile.blocks.slice(index + 1),
    ];

    setProfile(prev => ({ ...prev, blocks: newBlocks }));
    addToHistory(newBlocks);
    setSelectedBlockId(newBlock.id);
  };

  const resetProfile = () => {
    if (confirm('Are you sure you want to reset? This will clear all blocks.')) {
      const emptyBlocks: Block[] = [];
      setProfile(prev => ({ ...prev, blocks: emptyBlocks }));
      addToHistory(emptyBlocks);
      setSelectedBlockId(null);
    }
  };

  const loadTemplate = (blocks: Block[]) => {
    setProfile(prev => ({ ...prev, blocks }));
    addToHistory(blocks);
    setSelectedBlockId(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;
    if (!over) return;

    if (active.data.current?.type === 'library-item') {
      const blockType = active.data.current.blockType as BlockType;
      addBlock(blockType);
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = profile.blocks.findIndex(b => b.id === active.id);
      const newIndex = profile.blocks.findIndex(b => b.id === over.id);
      const newBlocks = arrayMove(profile.blocks, oldIndex, newIndex);
      setProfile(prev => ({ ...prev, blocks: newBlocks }));
      addToHistory(newBlocks);
    }
  };

  const selectedBlock = profile.blocks.find(b => b.id === selectedBlockId) || null;

  const previewContainerWidth =
    viewMode === 'mobile' ? 'max-w-md' :
      viewMode === 'tablet' ? 'max-w-3xl' :
        'max-w-5xl';

  if (isPreview) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-black">
        <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="secondary" onClick={() => setIsPreview(false)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <ThemeToggle />
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 rounded-full p-1">
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1.5 rounded-full transition-colors ${viewMode === 'mobile' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'
                  }`}
                title="Mobile view"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`px-3 py-1.5 rounded-full transition-colors ${viewMode === 'tablet' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'
                  }`}
                title="Tablet view"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-3 py-1.5 rounded-full transition-colors ${viewMode === 'desktop' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'
                  }`}
                title="Desktop view"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 bg-neutral-100 dark:bg-black">
          <div className={`${previewContainerWidth} mx-auto bg-neutral-100 dark:bg-black rounded-3xl p-6 transition-all duration-300 shadow-sm`}>
            <div className="space-y-4">
              {profile.blocks.map(block => (
                <div key={block.id}>
                  <BlockRenderer block={block} theme={profile.theme} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-neutral-50 dark:bg-black">
        <BuilderHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          cursorMode={cursorMode}
          onCursorModeChange={handleCursorModeChange}
          onTemplatesClick={() => setShowTemplatePicker(true)}
          onPreviewClick={() => setIsPreview(true)}
          onPublishClick={() => setShowPublishModal(true)}
          onUndo={undo}
          onRedo={redo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          isSaved={isSaved}
          publicHandle={profile.handle}
          // ✅ new prop (add to BuilderHeader component)
          cloudStatus={cloudStatus}
        />

        <div className="flex-1 flex overflow-hidden">
          <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} lg:w-72 bg-white dark:bg-[#111010] border-r border-neutral-200 dark:border-[#111010] overflow-hidden transition-all duration-300`}>
            <div className="h-full overflow-y-auto scrollbar-light scrollbar-dark px-4 py-4 space-y-6">
              <div className="pt-4">
                <div className="flex items-center gap-2 text-sm text-neutral-400 px-2">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </div>

                <div className="my-4 px-2 h-px bg-neutral-800" />

                <div className="text-md px-2 font-semibold text-neutral-500 mb-3">Start</div>

                <div className="mt-3 px-2 flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100">
                    {/* <Plus className="h-4 w-4 text-neutral-900" /> */}
                  </div>
                  <div className="text-md font-semibold text-neutral-400">My Portolfio</div>
                </div>

                <div className="my-6 h-px bg-neutral-800 px-2" />
                <div className="text-md px-2 font-semibold text-neutral-500 mb-3">Basics</div>

                <div>
                  <BlockLibrary onAddBlock={addBlock} />
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-hidden">
            <Canvas
              blocks={profile.blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={(id) => cursorMode === 'select' ? setSelectedBlockId(id) : null}
              viewMode={viewMode}
              cursorMode={cursorMode}
              sectionGap={profile.sectionGap}
            />
          </main>

          <aside className="w-80 bg-neutral-50 dark:bg-neutral-850 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto scrollbar-light scrollbar-dark">
            <Inspector
              selectedBlock={selectedBlock}
              onUpdateBlock={updateBlock}
              onDeleteBlock={deleteBlock}
              onDuplicateBlock={duplicateBlock}
              onDeselectBlock={() => setSelectedBlockId(null)}
              onUpdateBlockMeta={updateBlockMeta}
              profile={profile}
              onUpdateProfile={setProfile}
            />
          </aside>
        </div>
      </div>

      <DragOverlay />
      {showPublishModal && (
        <PublishModal handle={profile.handle} onClose={() => setShowPublishModal(false)} />
      )}
      {showTemplatePicker && (
        <TemplatePickerModal onSelect={loadTemplate} onClose={() => setShowTemplatePicker(false)} />
      )}
    </DndContext>
  );
}
