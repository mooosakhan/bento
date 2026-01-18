import React from 'react';
import { ExperienceItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface ExperienceEditorProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

export function ExperienceEditor({ items, onChange }: ExperienceEditorProps) {
  const addItem = () => {
    onChange([
      ...items,
      {
        role: 'Your Role',
        company: 'Company Name',
        startDate: 'Jan 2024',
        endDate: '',
        description: 'Brief description of your responsibilities and achievements.',
      },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updates: Partial<ExperienceItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium  dark:text-neutral-300">
        Experience
      </label>
      
      <div className="space-y-4 overflow-y-auto scrollbar-light scrollbar-dark  scrollbar-light scrollbar-dark">
        {items.map((item, index) => (
          <div key={index} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <GripVertical className="w-4 h-4 text-neutral-400 mt-3" />
              <div className="flex-1 space-y-3">
                <Input
                  type="text"
                  value={item.role}
                  onChange={(e) => updateItem(index, { role: e.target.value })}
                  placeholder="Role"
                />
                <Input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateItem(index, { company: e.target.value })}
                  placeholder="Company"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="text"
                    value={item.startDate}
                    onChange={(e) => updateItem(index, { startDate: e.target.value })}
                    placeholder="Start Date"
                  />
                  <Input
                    type="text"
                    value={item.endDate || ''}
                    onChange={(e) => updateItem(index, { endDate: e.target.value })}
                    placeholder="End Date (or leave empty)"
                  />
                </div>
                <Textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, { description: e.target.value })}
                  placeholder="Description"
                  rows={3}
                />
              </div>
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={addItem}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
