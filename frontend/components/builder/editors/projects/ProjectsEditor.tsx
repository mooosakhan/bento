import React from "react";
import { Project, CustomButton } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Plus, Trash2, X } from "lucide-react";
import { Toggle } from "@/components/ui/Toggle";
import { Select } from "@/components/ui/Select";
import { ColorPicker } from "@/components/ui/ColorPicker";

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  showBorder?: boolean;
  borderThickness?: number;
  borderRadius?: number;
  borderColor?: string;
  borderOpacity?: number;
  showShadow?: boolean;
  layout?: 'grid-1' | 'grid-2' | 'grid-3' | 'list';
  paddingX?: number;
  paddingY?: number;
  buttonRoundness?: number;
  buttonSize?: 'sm' | 'md' | 'lg';
  projectButtonText?: string;
  codeButtonText?: string;
  showButtonIcon?: boolean;
  showIconFirst?: boolean;
  chipsShowBorder?: boolean;
  chipsBorderRadius?: number;
  chipsBorderOpacity?: number;
  onPropChange?: (key: string, value: any) => void;
}

export function ProjectsEditor({
  projects,
  onChange,
  showBorder = true,
  borderThickness = 1,
  borderRadius = 16,
  borderColor = 'rgb(229, 229, 229)',
  borderOpacity = 100,
  showShadow = true,
  layout = 'grid-2',
  paddingX = 24,
  paddingY = 24,
  buttonRoundness = 16,
  buttonSize = 'md',
  projectButtonText = 'Live Preview',
  codeButtonText = 'View Code',
  showButtonIcon = true,
  showIconFirst = true,
  chipsShowBorder = true,
  chipsBorderRadius = 16,
  chipsBorderOpacity = 100,
  onPropChange,
}: ProjectsEditorProps) {
  const addProject = () => {
    onChange([
      ...projects,
      {
        title: 'Project Name',
        description: 'Brief description of your project and its impact.',
        image: '',
        techStack: [],
        link: '',
        codeLink: '',
      },
    ]);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, updates: Partial<Project>) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], ...updates };
    onChange(newProjects);
  };

  const addTechToProject = (index: number, tech: string) => {
    if (!tech.trim()) return;
    const project = projects[index];
    const techStack = [...(project.techStack || []), tech.trim()];
    updateProject(index, { techStack });
  };

  const removeTechFromProject = (projectIndex: number, techIndex: number) => {
    const project = projects[projectIndex];
    const techStack = (project.techStack || []).filter((_, i) => i !== techIndex);
    updateProject(projectIndex, { techStack });
  };

  const addCustomButton = (index: number) => {
    const project = projects[index];
    const currentButtons = project.customButtons || [];
    
    // Limit to 4 buttons
    if (currentButtons.length >= 4) {
      alert('Maximum 4 buttons allowed per project');
      return;
    }

    const newButton = {
      text: "Button",
      url: "",
      icon: "link" as "link" | "code" | "globe" | "github" | "video" | "document" | "download" | "play" | "none",
      variant: "primary" as "primary" | "secondary",
    };
    const newProjects = [...projects];
    newProjects[index].customButtons = [...currentButtons, newButton];
    onChange(newProjects);
  };

  const removeCustomButton = (projectIndex: number, buttonIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].customButtons = newProjects[projectIndex].customButtons?.filter((_, i) => i !== buttonIndex) || [];
    onChange(newProjects);
  };

  const updateCustomButton = (projectIndex: number, buttonIndex: number, updates: Partial<CustomButton>) => {
    const newProjects = [...projects];
    const project = newProjects[projectIndex];
    if (project.customButtons) {
      project.customButtons[buttonIndex] = { ...project.customButtons[buttonIndex], ...updates };
      onChange(newProjects);
    }
  };

  return (
    <div className="space-y-6">
      {/* ===== CARD STYLING CONTROLS ===== */}
      <div className="space-y-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Card Styling
        </h3>

        {/* Layout */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Layout
          </label>
          <Select
            value={layout}
            onChange={(e) => onPropChange?.('layout', e.target.value)}
            options={[
              { value: 'grid-1', label: '1 Column' },
              { value: 'grid-2', label: '2 Columns' },
              { value: 'grid-3', label: '3 Columns' },
              { value: 'list', label: 'List' }
            ]}
            className="text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl"
          />
        </div>

        {/* Border Controls */}
        <div className="space-y-3">
          <Toggle
            label="Show Border"
            checked={showBorder}
            onChange={(checked) => onPropChange?.('showBorder', checked)}
          />

          {showBorder && (
            <>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Border Thickness: {borderThickness}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={borderThickness}
                  onChange={(e) => onPropChange?.('borderThickness', parseInt(e.target.value))}
                  className="w-full accent-neutral-900 dark:accent-neutral-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Border Roundness: {borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={borderRadius}
                  onChange={(e) => onPropChange?.('borderRadius', parseInt(e.target.value))}
                  className="w-full accent-neutral-900 dark:accent-neutral-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Border Opacity: {borderOpacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={borderOpacity}
                  onChange={(e) => onPropChange?.('borderOpacity', parseInt(e.target.value))}
                  className="w-full accent-neutral-900 dark:accent-neutral-100"
                />
              </div>
            </>
          )}
        </div>

        {/* Shadow Control */}
        <Toggle
          label="Show Shadow"
          checked={showShadow}
          onChange={(checked) => onPropChange?.('showShadow', checked)}
        />

        {/* Padding Controls */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Horizontal Padding (X): {paddingX}px
          </label>
          <input
            type="range"
            min="0"
            max="64"
            value={paddingX}
            onChange={(e) => onPropChange?.('paddingX', parseInt(e.target.value))}
            className="w-full accent-neutral-900 dark:accent-neutral-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Vertical Padding (Y): {paddingY}px
          </label>
          <input
            type="range"
            min="0"
            max="64"
            value={paddingY}
            onChange={(e) => onPropChange?.('paddingY', parseInt(e.target.value))}
            className="w-full accent-neutral-900 dark:accent-neutral-100"
          />
        </div>
      </div>

      {/* ===== CHIPS CUSTOMIZATION ===== */}
      <div className="space-y-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Tech Chips Styling
        </h3>

        <Toggle
          label="Show Chips Border"
          checked={chipsShowBorder}
          onChange={(checked) => onPropChange?.('chipsShowBorder', checked)}
        />

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Chips Roundness: {chipsBorderRadius}px
          </label>
          <input
            type="range"
            min="0"
            max="32"
            value={chipsBorderRadius}
            onChange={(e) => onPropChange?.('chipsBorderRadius', parseInt(e.target.value))}
            className="w-full accent-neutral-900 dark:accent-neutral-100"
          />
        </div>

        {chipsShowBorder && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Chips Border Opacity: {chipsBorderOpacity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={chipsBorderOpacity}
              onChange={(e) => onPropChange?.('chipsBorderOpacity', parseInt(e.target.value))}
              className="w-full accent-neutral-900 dark:accent-neutral-100"
            />
          </div>
        )}
      </div>

      {/* ===== BUTTON CUSTOMIZATION ===== */}
      <div className="space-y-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Button Styling
        </h3>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Button Size
          </label>
          <Select
            value={buttonSize}
            onChange={(e) => onPropChange?.('buttonSize', e.target.value)}
            options={[
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' }
            ]}
            className="text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Button Roundness: {buttonRoundness}px
          </label>
          <input
            type="range"
            min="0"
            max="32"
            value={buttonRoundness}
            onChange={(e) => onPropChange?.('buttonRoundness', parseInt(e.target.value))}
            className="w-full accent-neutral-900 dark:accent-neutral-100"
          />
        </div>

        {/* <Input
          type="text"
          value={projectButtonText}
          onChange={(e) => onPropChange?.('projectButtonText', e.target.value)}
          placeholder="Live Preview"
          label="Project Button Text"
        />

        <Input
          type="text"
          value={codeButtonText}
          onChange={(e) => onPropChange?.('codeButtonText', e.target.value)}
          placeholder="View Code"
          label="Code Button Text"
        /> */}

        <Toggle
          label="Show Button Icons"
          checked={showButtonIcon}
          onChange={(checked) => onPropChange?.('showButtonIcon', checked)}
        />
       <Toggle
          label="Show Icon First"
          checked={showIconFirst}
          onChange={(checked) => onPropChange?.('showIconFirst', checked)}
        />
      </div>

      {/* ===== PROJECTS LIST ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Projects
        </h3>

        <div className="space-y-4 overflow-y-auto scrollbar-light scrollbar-dark">
          {projects.map((project, index) => (
            <div key={index} className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 space-y-3">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center justify-between w-full">
                  <span className="py-2 cursor-context-menu text-neutral-400 hover:text-neutral-600 transition-colors">
                    # {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => removeProject(index)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 space-y-3">
                  <Input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(index, { title: e.target.value })}
                    placeholder="Project Title"
                    label="Title"
                  />
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, { description: e.target.value })}
                    placeholder="Description"
                    rows={3}
                    label="Description"
                  />
                  <Input
                    type="url"
                    value={project.image || ""}
                    onChange={(e) => updateProject(index, { image: e.target.value })}
                    placeholder="Image URL (optional)"
                    label="Image URL"
                  />

                  {/* Buttons Section */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Buttons ({(project.customButtons || []).length}/4)
                      </label>
                      <Button
                        variant="secondary"
                        onClick={() => addCustomButton(index)}
                        className="h-8 px-3 text-xs"
                        disabled={(project.customButtons || []).length >= 4}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Button
                      </Button>
                    </div>

                    {/* Custom Buttons List */}
                    {project.customButtons && project.customButtons.length > 0 && (
                      <div className="space-y-2">
                        {project.customButtons.map((button, btnIndex) => (
                          <div key={btnIndex} className="p-3 bg-white dark:bg-neutral-900 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Button {btnIndex + 1}</span>
                              <button
                                onClick={() => removeCustomButton(index, btnIndex)}
                                className="text-neutral-400 hover:text-red-600 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <Input
                                type="text"
                                value={button.text}
                                onChange={(e) => updateCustomButton(index, btnIndex, { text: e.target.value })}
                                placeholder="Button Text"
                                label="Text"
                              />
                              <Input
                                type="url"
                                value={button.url}
                                onChange={(e) => updateCustomButton(index, btnIndex, { url: e.target.value })}
                                placeholder="https://..."
                                label="URL"
                              />
                              <div className="grid grid-cols-1 gap-2">
                                <Select
                                  value={button.variant || 'primary'}
                                  onChange={(e) => updateCustomButton(index, btnIndex, { variant: e.target.value as "primary" | "secondary" })}
                                  options={[
                                    { value: 'primary', label: 'Primary' },
                                    { value: 'secondary', label: 'Secondary' } 
                                  ]}
                                  label="Variant"
                                />
                                <Select
                                  value={button.icon || 'link'}
                                  onChange={(e) => updateCustomButton(index, btnIndex, { icon: e.target.value as "link" | "code" | "globe" | "github" | "video" | "document" | "download" | "play" | "none" })}
                                  options={[
                                    { value: 'link', label: 'Link' },
                                    { value: 'code', label: 'Code' },
                                    { value: 'globe', label: 'Globe' },
                                    { value: 'github', label: 'GitHub' },
                                    { value: 'video', label: 'Video' },
                                    { value: 'play', label: 'Play' },
                                    { value: 'document', label: 'Document' },
                                    { value: 'download', label: 'Download' },
                                    { value: 'none', label: 'No Icon' }
                                  ]}
                                  label="Icon"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {(project.customButtons || []).length === 0 && (
                      <div className="text-center py-4 text-neutral-400 dark:text-neutral-500 text-xs">
                        No buttons added. Click "Add Button" to create one.
                      </div>
                    )}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Tech Stack
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(project.techStack || []).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-neutral-800 rounded-full text-xs border border-neutral-200 dark:border-neutral-700"
                        >
                          {tech}
                          <button
                            onClick={() => removeTechFromProject(index, techIndex)}
                            className="hover:text-red-600 cursor-pointer transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <Input
                      type="text"
                      placeholder="Add technology (press Enter)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          addTechToProject(index, input.value);
                          input.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          onClick={addProject}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>
    </div>
  );
}

export default ProjectsEditor;