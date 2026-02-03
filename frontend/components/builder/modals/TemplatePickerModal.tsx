import React from 'react';
import { templates, Template, applyTemplate } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { X, Code, Palette, GraduationCap, Rocket } from 'lucide-react';
import { Block } from '@/types';

interface TemplatePickerModalProps {
  onSelect: (blocks: Block[]) => void;
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
  Rocket: <Rocket className="w-8 h-8" />,
};

export function TemplatePickerModal({ onSelect, onClose }: TemplatePickerModalProps) {
  const handleSelectTemplate = (template: Template) => {
    const blocks = applyTemplate(template);
    onSelect(blocks);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-neutral-200 dark:border-neutral-700">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <div>
            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
               Choose a Portfolio Template
            </h2>
            <p className="text-base text-neutral-600 mt-2 dark:text-neutral-400">
              Start with a beautiful, pre-built portfolio or create your own from scratch.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
            aria-label="Close modal"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-8 bg-neutral-50 dark:bg-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group text-left bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary dark:hover:border-primary rounded-2xl p-7 transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary relative"
                style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)' }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-xl bg-neutral-100 dark:from-neutral-700  dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:bg-primary group-hover:text-white transition-colors border border-neutral-200 dark:border-neutral-700">
                    {iconMap[template.icon]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded">
                        {template.blocks.length} blocks
                      </span>
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded">
                        Popular
                      </span>
                    </div>
                  </div>
                </div>
                <span className="absolute top-4 right-4 text-xs text-neutral-400 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">Click to preview</span>
              </button>
            ))}
          </div>

          {/* Start from Scratch Option */}
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full text-left bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-primary dark:hover:border-primary rounded-2xl p-7 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary flex flex-col items-center justify-center gap-2"
            >
              <div className="flex flex-col items-center">
                <Rocket className="w-8 h-8 text-primary mb-2" />
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-100 mb-1">
                  Start from Scratch
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Build your portfolio from the ground up
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
