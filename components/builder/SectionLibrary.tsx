'use client';

import React, { useState } from 'react';
import { SectionType } from '@/types';
import { getSectionCategories } from '@/lib/sectionRegistry';
import * as Icons from 'lucide-react';
import { Search } from 'lucide-react';

interface SectionLibraryProps {
  onAddSection: (type: SectionType) => void;
}

export function SectionLibrary({ onAddSection }: SectionLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = getSectionCategories();
  const allSections = Object.values(categories).flat();

  const filteredSections = searchQuery
    ? allSections.filter(section =>
        section.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeCategory === 'all'
    ? allSections
    : categories[activeCategory as keyof typeof categories] || [];

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon size={20} /> : <Icons.Box size={20} />;
  };

  const categoryLabels = {
    all: 'All Sections',
    essentials: 'Essentials',
    showcase: 'Showcase',
    connect: 'Connect',
    custom: 'Custom',
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">
          Section Library
        </h3>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveCategory(key);
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === key
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Grid */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-light scrollbar-dark">
        <div className="grid gap-3">
          {filteredSections.map((section) => (
            <button
              key={section.type}
              onClick={() => onAddSection(section.type)}
              className="group p-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-neutral-800 text-left transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  {getIcon(section.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-neutral-900 dark:text-white mb-1">
                    {section.label}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {section.description}
                  </div>
                  {section.variants.length > 1 && (
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {section.variants.length} variants
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No sections found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
