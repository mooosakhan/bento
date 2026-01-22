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
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Block, BlockType, Profile, HistoryState } from '@/types';
import { getBlockDefinition } from '@/lib/blockRegistry';
import { generateHandle, saveProfile, getProfile } from '@/lib/profileUtils';
import { BlockLibrary } from '@/components/builder/BlockLibrary';
import { Canvas } from '@/components/builder/Canvas';
import { Inspector } from '@/components/builder/Inspector';
import { PublishModal } from '@/components/builder/PublishModal';
import { TemplatePickerModal } from '@/components/builder/TemplatePickerModal';
import { BuilderHeader } from '@/components/builder/BuilderHeader';
import { PageStructurePanel } from '@/components/builder/PageStructurePanel';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { 
  Eye, 
  Save, 
  RotateCcw, 
  Undo2, 
  Redo2, 
  Smartphone, 
  Tablet,
  Monitor,
  Menu,
  X,
  LayoutTemplate,
  MoveLeft,
  MoveUpLeftIcon,
  Backpack,
  ArrowLeft
} from 'lucide-react';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';


export default function BuilderPage() {
  // Get initial theme mode from localStorage
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
      background: '', // Use Tailwind classes instead
      cardStyle: 'default',
      accentColor: '#000000',
      fontScale: 1,
    },
    blocks: [],
    sectionGap: 16, // Default gap between sections in pixels
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaved, setIsSaved] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [cursorMode, setCursorMode] = useState<'select' | 'grab'>('select');
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Load from localStorage on mount
  useEffect(() => {
    const loadedProfile = getProfile();
    if (loadedProfile) {
      // Make sure theme mode is in sync with localStorage
      const themeMode = localStorage.getItem('bento-theme-mode');
      if (themeMode && (themeMode === 'light' || themeMode === 'dark' || themeMode === 'system')) {
        loadedProfile.theme.mode = themeMode;
      }
      setProfile(loadedProfile);
      addToHistory(loadedProfile.blocks);
    }
  }, []);

  // Sync profile theme with localStorage theme when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const themeMode = localStorage.getItem('bento-theme-mode');
      if (themeMode && (themeMode === 'light' || themeMode === 'dark' || themeMode === 'system')) {
        if (profile.theme.mode !== themeMode) {
          setProfile(prev => ({
            ...prev,
            theme: {
              ...prev.theme,
              mode: themeMode as 'light' | 'dark' | 'system',
            },
          }));
        }
      }
    }
  }, []);

  // Listen for storage events to sync theme across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bento-theme-mode' && e.newValue) {
        const newMode = e.newValue;
        if (newMode === 'light' || newMode === 'dark' || newMode === 'system') {
          setProfile(prev => ({
            ...prev,
            theme: {
              ...prev.theme,
              mode: newMode,
            },
          }));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Keyboard shortcut for cursor mode (V for select, H for grab)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.key === 'v' || e.key === 'V') {
        setCursorMode('select');
      } else if (e.key === 'h' || e.key === 'H') {
        setCursorMode('grab');
        setSelectedBlockId(null); // Deselect when switching to grab mode
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle cursor mode change
  const handleCursorModeChange = (mode: 'select' | 'grab') => {
    setCursorMode(mode);
    if (mode === 'grab') {
      setSelectedBlockId(null); // Deselect all when switching to grab mode
    }
  };

  // Listen for block selection from PageStructurePanel
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

  // Auto-save to localStorage (debounced) + Auto-generate handle
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-generate handle from displayName
      const headerBlock = profile.blocks.find(b => b.type === 'header');
      const displayName = headerBlock?.props?.displayName || 'Your Name';
      const generatedHandle = generateHandle(displayName);
      
      const updatedProfile = {
        ...profile,
        handle: generatedHandle,
        displayName: displayName,
      };
      
      saveProfile(updatedProfile);
      setProfile(updatedProfile);
      setIsSaved(true);
    }, 1000);

    setIsSaved(false);
    return () => clearTimeout(timer);
  }, [profile.blocks]); // Only watch blocks changes

  const addToHistory = useCallback((blocks: Block[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, { blocks: JSON.parse(JSON.stringify(blocks)), timestamp: Date.now() }];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

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

    // Check if dragging from library
    if (active.data.current?.type === 'library-item') {
      const blockType = active.data.current.blockType as BlockType;
      addBlock(blockType);
      return;
    }

    // Reordering existing blocks
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
              {/* <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Preview Mode</h1> */}
               <Button variant="secondary" onClick={() => setIsPreview(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
              {/* Theme Toggle in Preview */}
              <ThemeToggle />
            </div>
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 rounded-full p-1">
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    viewMode === 'mobile' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'
                  }`}
                  title="Mobile view"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    viewMode === 'tablet' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'
                  }`}
                  title="Tablet view"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    viewMode === 'desktop' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'
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
        {/* Header */}
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
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Block Library */}
          <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} lg:w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-300`}>
            <div className="h-full overflow-y-auto scrollbar-light scrollbar-dark ">
              <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4 z-10">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Blocks</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Drag or click to add</p>
              </div>
              <div className="p-6">
                <BlockLibrary onAddBlock={addBlock} />
              </div>
            </div>
          </aside>

          {/* Center - Canvas */}
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

          {/* Right Sidebar - Inspector */}
          <aside className="w-80 bg-neutral-50 dark:bg-neutral-850 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto scrollbar-light scrollbar-dark  scrollbar-light scrollbar-dark">
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

      <DragOverlay>
        {/* {activeDragId ? (
          <div className="bg-white border-2 border-neutral-300 rounded-xl p-4 shadow-lg opacity-80">
            Dragging...
          </div>
        ) : null} */}
      </DragOverlay>

      {/* Publish Modal */}
      {showPublishModal && (
        <PublishModal
          handle={profile.handle}
          onClose={() => setShowPublishModal(false)}
        />
      )}

      {showTemplatePicker && (
        <TemplatePickerModal
          onSelect={loadTemplate}
          onClose={() => setShowTemplatePicker(false)}
        />
      )}
    </DndContext>
  );
}
