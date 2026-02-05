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
  cursorMode?: 'select' | 'grab';
}

export function SortableBlockItem({ block, isSelected, onSelect, cursorMode = 'select' }: SortableBlockItemProps) {
  const [mounted, setMounted] = React.useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: block.id,
    data: { type: 'block', block },
    disabled: cursorMode === 'grab', // Disable dragging in grab mode
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const containerCursor = cursorMode === 'grab' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer';

  // Don't apply dnd attributes until mounted to avoid SSR hydration mismatch
  const dndAttributes = mounted ? attributes : {};
  const dndListeners = mounted ? listeners : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`group relative rounded-2xl transition-all duration-200 ${containerCursor} ${
        isSelected 
          ? '' 
          : cursorMode === 'select' 
            ? 'hover:ring-2 hover:ring-black/12 dark:hover:ring-black'
            : ''
      } ${isDragging ? 'opacity-50 z-50' : ''}`}
    >
      {/* Drag Handle */}
      {cursorMode === 'select' && (
        <div
          {...dndAttributes}
          {...dndListeners}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm hover:shadow-md">
            <GripVertical className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
          </div>
        </div>
      )}

      {/* Block Content */}
      <div className="pointer-events-none">
        <BlockRenderer block={block} theme={{}} />
      </div>
    </div>
  );
}
