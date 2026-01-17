import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block } from '@/types';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { GripVertical } from 'lucide-react';

interface SortableBlockItemProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
}

export function SortableBlockItem({ block, isSelected, onSelect }: SortableBlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: block.id,
    data: { type: 'block', block }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`group relative rounded-2xl transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-neutral-900 ring-offset-2' 
          : 'hover:ring-2 hover:ring-neutral-300 hover:ring-offset-2'
      } ${isDragging ? 'opacity-50 z-50' : ''}`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <div className="w-8 h-8 flex items-center justify-center bg-white border border-neutral-300 rounded-lg shadow-sm hover:shadow-md">
          <GripVertical className="w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* Block Content */}
      <div className="pointer-events-none">
        <BlockRenderer block={block} />
      </div>
    </div>
  );
}
