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
import { Section, SectionType, Portfolio } from '@/types';
import { getSectionDefinition, getSectionVariant } from '@/lib/sectionRegistry';
import { loadPortfolio, savePortfolio, generateHandle } from '@/lib/portfolioUtils';
import { SectionLibrary } from '@/components/builder/SectionLibrary';
import { SectionCanvas } from '@/components/builder/SectionCanvas';
import { SectionInspector } from '@/components/builder/SectionInspector';
import { BuilderHeader } from '@/components/builder/BuilderHeader';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/Button';
import {
  Save,
  Eye,
  Undo2,
  Redo2,
  Smartphone,
  Tablet,
  Monitor,
  LayoutTemplate,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdvancedBuilderPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    version: 2,
    handle: 'myportfolio',
    profile: {
      displayName: 'Your Name',
      headline: 'Product Designer & Developer',
      bio: 'Building digital experiences that matter',
    },
    theme: {
      mode: 'light',
      background: '#f7f7f7',
      cardStyle: 'default',
      accentColor: '#000000',
      fontScale: 1,
    },
    sections: [],
  });

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [history, setHistory] = useState<Portfolio[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaved, setIsSaved] = useState(true);
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Load portfolio on mount
  useEffect(() => {
    const loaded = loadPortfolio();
    if (loaded) {
      setPortfolio(loaded);
      addToHistory(loaded);
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (portfolio.sections.length === 0 && !portfolio.profile.displayName) return;
    
    const timer = setTimeout(() => {
      savePortfolio(portfolio);
      setIsSaved(true);
    }, 1000);

    setIsSaved(false);
    return () => clearTimeout(timer);
  }, [portfolio]);

  // Auto-generate handle
  useEffect(() => {
    const heroSection = portfolio.sections.find(s => s.type === 'hero');
    const displayName = heroSection?.props?.displayName || portfolio.profile.displayName;
    if (displayName) {
      const handle = generateHandle(displayName);
      if (handle !== portfolio.handle) {
        setPortfolio(prev => ({ ...prev, handle }));
      }
    }
  }, [portfolio.sections, portfolio.profile.displayName]);

  const addToHistory = (p: Portfolio) => {
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), p]);
    setHistoryIndex((prev) => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setPortfolio(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setPortfolio(history[historyIndex + 1]);
    }
  };

  const handleAddSection = (type: SectionType) => {
    const definition = getSectionDefinition(type);
    if (!definition) return;

    const defaultVariant = definition.variants[0];
    const newSection: Section = {
      id: `section-${type}-${Date.now()}`,
      type,
      variant: defaultVariant.name,
      props: { ...defaultVariant.defaultProps },
      order: portfolio.sections.length,
    };

    const updatedPortfolio = {
      ...portfolio,
      sections: [...portfolio.sections, newSection],
    };

    setPortfolio(updatedPortfolio);
    addToHistory(updatedPortfolio);
    setSelectedSectionId(newSection.id);
  };

  const handleUpdateSection = (sectionId: string, updates: Partial<Section>) => {
    const updatedPortfolio = {
      ...portfolio,
      sections: portfolio.sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    };

    setPortfolio(updatedPortfolio);
    addToHistory(updatedPortfolio);
  };

  const handleDuplicateSection = (sectionId: string) => {
    const section = portfolio.sections.find((s) => s.id === sectionId);
    if (!section) return;

    const newSection: Section = {
      ...section,
      id: `section-${section.type}-${Date.now()}`,
      order: section.order + 1,
    };

    const updatedPortfolio = {
      ...portfolio,
      sections: [
        ...portfolio.sections.slice(0, section.order + 1),
        newSection,
        ...portfolio.sections.slice(section.order + 1),
      ].map((s, idx) => ({ ...s, order: idx })),
    };

    setPortfolio(updatedPortfolio);
    addToHistory(updatedPortfolio);
  };

  const handleDeleteSection = (sectionId: string) => {
    const updatedPortfolio = {
      ...portfolio,
      sections: portfolio.sections
        .filter((s) => s.id !== sectionId)
        .map((s, idx) => ({ ...s, order: idx })),
    };

    setPortfolio(updatedPortfolio);
    addToHistory(updatedPortfolio);
    
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = portfolio.sections.findIndex((s) => s.id === active.id);
      const newIndex = portfolio.sections.findIndex((s) => s.id === over.id);

      const reorderedSections = arrayMove(portfolio.sections, oldIndex, newIndex).map(
        (s, idx) => ({ ...s, order: idx })
      );

      const updatedPortfolio = {
        ...portfolio,
        sections: reorderedSections,
      };

      setPortfolio(updatedPortfolio);
      addToHistory(updatedPortfolio);
    }

    setActiveDragId(null);
  };

  const handlePreview = () => {
    savePortfolio(portfolio);
    window.open(`/u/${portfolio.handle}`, '_blank');
  };

  const selectedSection = portfolio.sections.find((s) => s.id === selectedSectionId) || null;

  return (
    <div className="h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-neutral-900 dark:text-white">
            Portfolio Builder
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              <Undo2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo2 size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Selector */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded ${
                viewMode === 'mobile'
                  ? 'bg-white dark:bg-neutral-600 shadow'
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-600'
              }`}
            >
              <Smartphone size={16} />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded ${
                viewMode === 'tablet'
                  ? 'bg-white dark:bg-neutral-600 shadow'
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-600'
              }`}
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded ${
                viewMode === 'desktop'
                  ? 'bg-white dark:bg-neutral-600 shadow'
                  : 'hover:bg-neutral-200 dark:hover:bg-neutral-600'
              }`}
            >
              <Monitor size={16} />
            </button>
          </div>

          <ThemeToggle />

          <Button variant="secondary" size="sm" onClick={handlePreview}>
            <Eye size={16} className="mr-2" />
            Preview
          </Button>

          <div className="flex items-center gap-2">
            {!isSaved && (
              <span className="text-xs text-neutral-500">Saving...</span>
            )}
            {isSaved && (
              <span className="text-xs text-green-600">Saved</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Canvas */}
          <div className="flex-1">
            <SectionCanvas
              sections={portfolio.sections}
              selectedSectionId={selectedSectionId}
              onSelectSection={setSelectedSectionId}
              onDuplicateSection={handleDuplicateSection}
              onDeleteSection={handleDeleteSection}
              viewMode={viewMode}
            />
          </div>

          {/* Right Panels */}
          <div className="w-80 flex flex-col">
            {selectedSection ? (
              <SectionInspector
                section={selectedSection}
                onUpdateSection={handleUpdateSection}
                onClose={() => setSelectedSectionId(null)}
              />
            ) : (
              <SectionLibrary onAddSection={handleAddSection} />
            )}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
