'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Section } from '@/types';
import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { GripVertical, Copy, Trash2 } from 'lucide-react';

interface SortableSectionItemProps {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function SortableSectionItem({
  section,
  isSelected,
  onSelect,
  onDuplicate,
  onDelete,
}: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`relative group cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-blue-500 dark:ring-blue-400'
          : 'hover:ring-2 hover:ring-neutral-300 dark:hover:ring-neutral-600'
      }`}
    >
      {/* Drag Handle & Actions */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 p-1">
          <button
            {...attributes}
            {...listeners}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded cursor-move"
            title="Drag to reorder"
          >
            <GripVertical size={16} className="text-neutral-600 dark:text-neutral-400" />
          </button>
          
          <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600" />
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
            title="Duplicate section"
          >
            <Copy size={16} className="text-neutral-600 dark:text-neutral-400" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            title="Delete section"
          >
            <Trash2 size={16} className="text-red-600 dark:text-red-400" />
          </button>
        </div>
      )}

      {/* Section Content */}
      <div className={`${isDragging ? 'opacity-50' : ''}`}>
        <SectionRenderer section={section} isBuilder={true} />
      </div>
    </div>
  );
}
