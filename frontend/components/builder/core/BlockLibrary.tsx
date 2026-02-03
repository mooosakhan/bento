import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { blockRegistry } from '@/lib/blockRegistry';
import { BlockType } from '@/types';
import * as Icons from 'lucide-react';

interface BlockLibraryProps {
  onAddBlock: (type: BlockType) => void;
  search?: string;
}

export function BlockLibrary({ onAddBlock, search = '' }: BlockLibraryProps) {
  const query = (search || '').trim().toLowerCase();

  const items = Object.values(blockRegistry).filter((block) => {
    if (!query) return true;
    const label = (block.label || '').toLowerCase();
    const type = (block.type || '').toLowerCase();
    return label.includes(query) || type.includes(query);
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((block) => (
          <DraggableBlockItem 
            key={block.type} 
            block={block}
            onAddBlock={onAddBlock}
          />
        ))}
        {items.length === 0 && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center py-3">
            No blocks found
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          More blocks coming soon
        </p>
      </div>
    </div>
  );
}

interface DraggableBlockItemProps {
  block: typeof blockRegistry[BlockType];
  onAddBlock: (type: BlockType) => void;
}

function DraggableBlockItem({ block, onAddBlock }: DraggableBlockItemProps) {
  const [mounted, setMounted] = React.useState(false);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${block.type}`,
    data: { type: 'library-item', blockType: block.type },
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // @ts-ignore - Dynamic icon lookup
  const Icon = Icons[block.icon] || Icons.Box;

  // Don't apply dnd attributes until mounted to avoid SSR hydration mismatch
  const dndAttributes = mounted ? attributes : {};
  const dndListeners = mounted ? listeners : {};

  return (
    <div
      ref={setNodeRef}
      {...dndAttributes}
      {...dndListeners}
      onClick={() => onAddBlock(block.type)}
      className={`group flex items-center gap-3 py-2 border-0 rounded-xl cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 box-border ${
        isDragging ? 'opacity-50 scale-95' : ''
      } hover:bg-neutral-100 dark:hover:bg-neutral-700`}
      style={{
        boxSizing : "border-box"
      }}
    >
      <div className="ml-2 p-1 py-[4px] flex items-center justify-center rounded-lg dark:bg-neutral-600 bg-neutral-200">
        <Icon className="w-5 h-5 text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors rounded-md" />
      </div>
      <div className="flex-1">
        <span className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white">{block.label}</span>
      </div>
    </div>
  );
}
