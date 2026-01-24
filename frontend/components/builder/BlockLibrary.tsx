import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { blockRegistry } from '@/lib/blockRegistry';
import { BlockType } from '@/types';
import * as Icons from 'lucide-react';

interface BlockLibraryProps {
  onAddBlock: (type: BlockType) => void;
}

export function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {Object.values(blockRegistry).map((block) => (
          <DraggableBlockItem 
            key={block.type} 
            block={block}
            onAddBlock={onAddBlock}
          />
        ))}
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
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${block.type}`,
    data: { type: 'library-item', blockType: block.type },
  });

  // @ts-ignore - Dynamic icon lookup
  const Icon = Icons[block.icon] || Icons.Box;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => onAddBlock(block.type)}
      className={`group hover:bg-[#232322] flex items-center gap-3 py-2 border-0 dark:border-neutral-800 rounded-xl cursor-grab active:cursor-grabbing  hover:shadow-lg  transition-all duration-200 box-border ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
      style={{
        boxSizing : "border-box"
      }}
    >
      <div className="ml-2 p-1 py-[4px] flex dark:bg-[#333232] items-center justify-center rounded-lg">
        <Icon className="w-5 h-5 text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors  rounded-md " />
      </div>
      <div className="flex-1">
        <span className="font-semibold text-neutral-900 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white ">{block.label}</span>
      </div>
    </div>
  );
}
