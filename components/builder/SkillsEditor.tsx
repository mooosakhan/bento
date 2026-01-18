import React, { useState } from 'react';
import { Skill } from '@/types';
import { Button } from '@/components/ui/Button';
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
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-700">
        Skills
      </label>
      
      <div className="space-y-2 overflow-y-auto">
        {skills.map((skill, index) => (
          <div key={index} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-neutral-400" />
              <Input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, { name: e.target.value })}
                placeholder="Skill name"
                className="flex-1"
              />
              <button
                onClick={() => removeSkill(index)}
                className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
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
  );
}
