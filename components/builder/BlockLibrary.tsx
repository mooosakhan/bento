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
      <div className="pt-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-500 text-center">
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
      className={`group flex items-center gap-3 px-4 py-3.5 bg-white border border-neutral-200 rounded-xl cursor-grab active:cursor-grabbing  hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-lg">
        <Icon className="w-5 h-5 text-neutral-500 group-hover:text-neutral-900 transition-colors" />
      </div>
      <div className="flex-1">
        <span className="font-semibold text-neutral-900 group-hover:text-neutral-900 group-hover:ml-0.5">{block.label}</span>
        <p className="text-xs text-neutral-500 group-hover:ml-0.5 group-hover:text-neutral-600">Click or drag</p>
      </div>
    </div>
  );
}
