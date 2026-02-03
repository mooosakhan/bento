import React from 'react';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Plus, Trash2, GripVertical, X } from 'lucide-react';

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsEditor({ projects, onChange }: ProjectsEditorProps) {
  const addProject = () => {
    onChange([
      ...projects,
      {
        title: 'Project Name',
        description: 'Brief description of your project and its impact.',
        image: '',
        techStack: [],
        link: '',
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

  return (
    <div className="space-y-4">
      {/* ===== PROJECTS LIST ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">
          Projects
        </h3>

      <div className="space-y-4 overflow-y-auto scrollbar-light scrollbar-dark  scrollbar-light scrollbar-dark">
        {projects.map((project, index) => (
          <div key={index} className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 space-y-3">
            <div className="flex flex-col items-start gap-2">
              <div className='flex items-center justify-between w-full'>
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
                  label='Title'
                />
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, { description: e.target.value })}
                  placeholder="Description"
                  rows={3}
                  label='Description'
                />
                <Input
                  type="url"
                  value={project.image || ''}
                  onChange={(e) => updateProject(index, { image: e.target.value })}
                  placeholder="Image URL (optional)"
                  label='Image URL'
                />
                <Input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject(index, { link: e.target.value })}
                  placeholder="Project Link (optional)"
                  label='Project Link'
                />

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
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        addTechToProject(index, input.value);
                        input.value = '';
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
