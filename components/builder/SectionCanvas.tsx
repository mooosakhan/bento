'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Section } from '@/types';
import { SortableSectionItem } from './SortableSectionItem';

interface SectionCanvasProps {
  sections: Section[];
  selectedSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
  onDuplicateSection: (sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  viewMode: 'mobile' | 'tablet' | 'desktop';
}

export function SectionCanvas({
  sections,
  selectedSectionId,
  onSelectSection,
  onDuplicateSection,
  onDeleteSection,
  viewMode,
}: SectionCanvasProps) {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const containerWidth =
    viewMode === 'mobile' ? 'max-w-md' :
    viewMode === 'tablet' ? 'max-w-3xl' :
    'max-w-5xl';

  return (
    <div className="h-full overflow-y-auto scrollbar-light scrollbar-dark bg-neutral-100 dark:bg-neutral-900 p-8">
      <div
        ref={setNodeRef}
        className={`mx-auto ${containerWidth} min-h-full bg-white dark:bg-neutral-800 rounded-3xl shadow-xl dark:shadow-2xl transition-all duration-300`}
      >
        {sections.length === 0 ? (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-2xl m-6">
            <div className="text-center text-neutral-400 dark:text-neutral-500">
              <p className="text-lg font-medium">Add sections to start building</p>
              <p className="text-sm mt-2">Choose from the section library on the right</p>
            </div>
          </div>
        ) : (
          <SortableContext
            items={sections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {sections.map((section) => (
                <SortableSectionItem
                  key={section.id}
                  section={section}
                  isSelected={section.id === selectedSectionId}
                  onSelect={() => onSelectSection(section.id)}
                  onDuplicate={() => onDuplicateSection(section.id)}
                  onDelete={() => onDeleteSection(section.id)}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}
