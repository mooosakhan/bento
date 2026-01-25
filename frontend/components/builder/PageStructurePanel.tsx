import React from 'react';
import { Block } from '@/types';
import { getBlockDefinition } from '@/lib/blockRegistry';
import { 
  LayoutDashboard,
  Type,
  Link as LinkIcon,
  Image,
  CreditCard,
  Minus,
  Share2,
  FileText,
  Layers,
  Briefcase,
  FolderOpen,
  Menu
} from 'lucide-react';

interface PageStructurePanelProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  onUpdateBlock: (blockId: string, updates: Partial<Block>) => void;
}

// Map block types to icons
const blockIcons: Record<string, React.ReactNode> = {
  navbar: <Menu className="w-4 h-4" />,
  header: <Type className="w-4 h-4" />,
  link: <LinkIcon className="w-4 h-4" />,
  gallery: <Image className="w-4 h-4" />,
  card: <CreditCard className="w-4 h-4" />,
  divider: <Minus className="w-4 h-4" />,
  socialRow: <Share2 className="w-4 h-4" />,
  sectionHeader: <FileText className="w-4 h-4" />,
  skills: <Layers className="w-4 h-4" />,
  experience: <Briefcase className="w-4 h-4" />,
  projects: <FolderOpen className="w-4 h-4" />,
};

export function PageStructurePanel({ blocks, selectedBlockId, onSelectBlock, onUpdateBlock }: PageStructurePanelProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Page Structure
          </h3>
        </div>
      </div>
      
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {blocks.length === 0 ? (
          <div className="px-3 py-6 text-center text-sm text-neutral-400 dark:text-neutral-500">
            No blocks added yet
          </div>
        ) : (
          blocks.map((block, index) => {
            const definition = getBlockDefinition(block.type);
            const isSelected = block.id === selectedBlockId;
            
            return (
              <div key={block.id} className="bg-white dark:bg-neutral-900">
                <button
                  onClick={() => onSelectBlock(block.id)}
                  className={`w-full px-3 py-2.5 flex items-center gap-3 transition-colors text-left ${
                    isSelected
                      ? 'bg-neutral-50 dark:bg-neutral-900/20'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {blockIcons[block.type] || <CreditCard className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        isSelected 
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-neutral-700 dark:text-neutral-300'
                      }`}>
                        {definition?.label || block.type}
                      </span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        #{index + 1}
                      </span>
                    </div>
                    
                    {/* Show a preview of block content */}
                    {block.type === 'header' && block.props?.displayName && (
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                        {block.props.displayName}
                      </div>
                    )}
                    {block.type === 'link' && block.props?.title && (
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                        {block.props.title}
                      </div>
                    )}
                    {block.type === 'sectionHeader' && block.props?.title && (
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                        {block.props.title}
                      </div>
                    )}
                    {block.type === 'card' && block.props?.title && (
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                        {block.props.title}
                      </div>
                    )}
                  </div>
                  
                  {isSelected && (
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-neutral-500" />
                  )}
                </button>
                
                {/* Gap control for each block (except first) */}
                {index > 0 && (
                  <div className="px-3 py-2 bg--50 dark:bg-neutral-800/50 border-t  dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                        Gap above:
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        value={block.gapBefore ?? 16}
                        onChange={(e) => {
                          e.stopPropagation();
                          onUpdateBlock(block.id, { gapBefore: Number(e.target.value) });
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neutral-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                      />
                      <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 w-10 text-right">
                        {block.gapBefore ?? 16}px
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
                        