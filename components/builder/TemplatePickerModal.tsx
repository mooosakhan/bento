import React from 'react';
import { templates, Template, applyTemplate } from '@/lib/templates';
import { Button } from '@/components/ui/Button';
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
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-300">
              Choose a Template
            </h2>
            <p className="text-sm text-neutral-600 mt-1 dark:text-neutral-400">
              Start with a pre-built portfolio template
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto scrollbar-light scrollbar-dark  scrollbar-light scrollbar-dark p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className="group text-left bg-white dark:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-600 hover:border-neutral-900 dark:hover:border-neutral-400 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-600 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                    {iconMap[template.icon]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-300 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {template.description}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                      {template.blocks.length} blocks included
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Start from Scratch Option */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full text-left bg-neutral-50 dark:bg-neutral-700 border-2 border-dashed border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-400 rounded-2xl p-6 transition-all duration-200"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
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
