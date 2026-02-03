import React, { useState } from 'react';
import { Skill } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface SkillsEditorProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addSkill = () => {
    onChange([...skills, { name: 'New Skill', level: 'Intermediate' }]);
    setEditingIndex(skills.length);
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const updateSkill = (index: number, updates: Partial<Skill>) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], ...updates };
    onChange(newSkills);
  };

  return (
    <div className="space-y-4">
      {/* ===== SKILLS LIST ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Skills
        </h3>
      
      <div className="space-y-2 overflow-y-auto scrollbar-light scrollbar-dark  scrollbar-light scrollbar-dark">
        {skills.map((skill, index) => (
          <div key={index} className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-0">
              <Button
                variant="ghost"
                className=" text-neutral-400 cursor-grab"
                aria-label="Drag to reorder"
              >
                <GripVertical className="w-4 h-4" />
              </Button>
              <Input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, { name: e.target.value })}
                placeholder="Skill name"
                className="flex-1"
              />
              <Button
                variant="ghost"
                onClick={() => removeSkill(index)}
                className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Select
              value={skill.level || 'Intermediate'}
              onChange={(e) => updateSkill(index, { level: e.target.value as any })}
              options={[
                { value: 'Beginner', label: 'Beginner' },
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' },
              ]}
            />
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={addSkill}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Skill
      </Button>
      </div>
    </div>
  );
}
