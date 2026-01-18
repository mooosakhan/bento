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

export default function BuilderPage() {
  const [profile, setProfile] = useState<Profile>({
    handle: 'myprofile',
    displayName: 'Your Name',
    bio: 'Your bio',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    theme: {
      mode: 'light',
      background: '#f7f7f7',
      cardStyle: 'default',
      accentColor: '#000000',
      fontScale: 1,
    },
    blocks: [],
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaved, setIsSaved] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPublishModal, setShowPublishModal] = useState(false);
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
    const profile = getProfile();
    if (profile) {
      setProfile(profile);
      addToHistory(profile.blocks);
    }
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
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
        <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Preview Mode</h1> */}
              
              {/* View Mode Toggle in Preview */}
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
            <Button variant="secondary" onClick={() => setIsPreview(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
        <div className="p-8">
          <div className={`${previewContainerWidth} mx-auto bg-white dark:bg-neutral-800 rounded-3xl shadow-xl dark:shadow-2xl p-6 transition-all duration-300`}>
            <div className="space-y-4">
              {profile.blocks.map(block => (
                <div key={block.id}>
                  <BlockRenderer block={block} />
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
      <div className="h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
        {/* Top Bar */}
        <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-neutral-900 dark:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">BentoBuilder</h1>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 rounded-full p-1">{" "}
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

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Undo/Redo */}
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                >
                  <Undo2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="h-6 w-px bg-neutral-300 dark:bg-neutral-600" />

              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowTemplatePicker(true)}
              >
                <LayoutTemplate className="w-4 h-4 mr-2" />
                Templates
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setIsPreview(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>

              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setShowPublishModal(true)}
              >
                Publish
              </Button>

              <a
                href={`/u/${profile.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
              >
                /u/{profile.handle}
              </a>

              <Button variant="ghost" size="sm" onClick={resetProfile}>
                <RotateCcw className="w-4 h-4" />
              </Button>

              {!isSaved && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                  <Save className="w-3 h-3" /> Saving...
                </span>
              )}
              {isSaved && (
                <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Save className="w-3 h-3" /> Saved
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Block Library */}
          <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} lg:w-72 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-300`}>
            <div className="h-full overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-6 py-4 z-10">
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
              onSelectBlock={setSelectedBlockId}
              viewMode={viewMode}
            />
          </main>

          {/* Right Sidebar - Inspector */}
          <aside className="w-80 bg-neutral-50 dark:bg-neutral-850 border-l border-neutral-200 dark:border-neutral-700 overflow-y-auto">
            <Inspector
              selectedBlock={selectedBlock}
              onUpdateBlock={updateBlock}
              onDeleteBlock={deleteBlock}
              onDuplicateBlock={duplicateBlock}
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

// Import BlockRenderer
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
