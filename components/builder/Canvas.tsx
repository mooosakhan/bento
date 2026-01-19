import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block } from '@/types';
import { SortableBlockItem } from './SortableBlockItem';

interface CanvasProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string | null) => void;
  viewMode: 'mobile' | 'tablet' | 'desktop';
  cursorMode: 'select' | 'grab';
}

export function Canvas({ blocks, selectedBlockId, onSelectBlock, viewMode, cursorMode }: CanvasProps) {
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const containerWidth = 
    viewMode === 'mobile' ? 'max-w-md' : 
    viewMode === 'tablet' ? 'max-w-3xl' : 
    'max-w-5xl';

  const cursorStyle = cursorMode === 'grab' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default';

  return (
    <div className={`h-full overflow-y-auto scrollbar-light scrollbar-dark bg-neutral-100 dark:bg-neutral-900 p-8 ${cursorStyle}`}>
      <div 
        ref={setNodeRef}
        className={`mx-auto ${containerWidth} min-h-full bg-white dark:bg-neutral-800 rounded-3xl shadow-xl dark:shadow-2xl p-6 transition-all duration-300`}
      >
        {blocks.length === 0 ? (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-2xl">
            <div className="text-center text-neutral-400 dark:text-neutral-500">
              <p className="text-lg font-medium">Drag blocks here to start</p>
              <p className="text-sm mt-2">Or click on a block to add it</p>
            </div>
          </div>
        ) : (
          <SortableContext 
            items={blocks.map(b => b.id)} 
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {blocks.map((block) => (
                <SortableBlockItem
                  key={block.id}
                  block={block}
                  isSelected={cursorMode === 'select' && block.id === selectedBlockId}
                  onSelect={() => cursorMode === 'select' && onSelectBlock(block.id)}
                  cursorMode={cursorMode}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}
