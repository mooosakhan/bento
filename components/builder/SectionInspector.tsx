'use client';

import React from 'react';
import { Section } from '@/types';
import { getSectionDefinition } from '@/lib/sectionRegistry';
import { VariantPicker } from './VariantPicker';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { SkillsEditor } from './SkillsEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { X } from 'lucide-react';

interface SectionInspectorProps {
  section: Section | null;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
  onClose: () => void;
}

export function SectionInspector({
  section,
  onUpdateSection,
  onClose,
}: SectionInspectorProps) {
  if (!section) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700">
        <div className="text-center text-neutral-400 dark:text-neutral-500 p-8">
          <p className="text-sm">Select a section to edit</p>
        </div>
      </div>
    );
  }

  const definition = getSectionDefinition(section.type);

  if (!definition) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700">
        <div className="text-center text-neutral-400 dark:text-neutral-500 p-8">
          <p className="text-sm">Section definition not found</p>
        </div>
      </div>
    );
  }

  const handleVariantChange = (variantName: string) => {
    const variant = definition.variants.find(v => v.name === variantName);
    if (variant) {
      // Merge existing props with new variant defaults
      onUpdateSection(section.id, {
        variant: variantName,
        props: { ...variant.defaultProps, ...section.props },
      });
    }
  };

  const handlePropChange = (key: string, value: any) => {
    // Handle nested keys like "layout.columns"
    if (key.includes('.')) {
      const keys = key.split('.');
      const newProps = { ...section.props };
      let current: any = newProps;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      
      onUpdateSection(section.id, { props: newProps });
    } else {
      onUpdateSection(section.id, {
        props: { ...section.props, [key]: value },
      });
    }
  };

  const getPropValue = (key: string) => {
    if (key.includes('.')) {
      const keys = key.split('.');
      let value = section.props;
      for (const k of keys) {
        value = value?.[k];
      }
      return value;
    }
    return section.props[key];
  };

  const renderField = (field: any) => {
    const value = getPropValue(field.key);

    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => handlePropChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => handlePropChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
          />
        );

      case 'markdown':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => handlePropChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={6}
            className="font-mono text-sm"
          />
        );

      case 'url':
        return (
          <Input
            type="url"
            value={value || ''}
            onChange={(e) => handlePropChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => handlePropChange(field.key, Number(e.target.value))}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );

      case 'select':
        return (
          <Select
            value={value || ''}
            onChange={(e) => handlePropChange(field.key, e.target.value)}
          >
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );

      case 'toggle':
        return (
          <Toggle
            checked={value || false}
            onChange={(checked) => handlePropChange(field.key, checked)}
          />
        );

      case 'skills-editor':
        return (
          <SkillsEditor
            skills={value || []}
            onChange={(skills) => handlePropChange(field.key, skills)}
          />
        );

      case 'experience-editor':
        return (
          <ExperienceEditor
            items={value || []}
            onChange={(items) => handlePropChange(field.key, items)}
          />
        );

      case 'projects-editor':
        return (
          <ProjectsEditor
            projects={value || []}
            onChange={(projects) => handlePropChange(field.key, projects)}
          />
        );

      default:
        return (
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Field type "{field.type}" not implemented
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-white">
            {definition.label} Settings
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {definition.description}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
        >
          <X size={18} className="text-neutral-600 dark:text-neutral-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-light scrollbar-dark p-4">
        {/* Variant Picker */}
        <VariantPicker
          section={section}
          onVariantChange={handleVariantChange}
        />

        {/* Inspector Fields */}
        <div className="space-y-4">
          {definition.inspectorFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                {field.label}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
