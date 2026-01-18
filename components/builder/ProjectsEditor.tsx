import React from 'react';
import { Project } from '@/types';
import { Button } from '@/components/ui/Button';
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
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-700">
        Projects
      </label>
      
      <div className="space-y-4 overflow-y-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <GripVertical className="w-4 h-4 text-neutral-400 mt-3" />
              <div className="flex-1 space-y-3">
                <Input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, { title: e.target.value })}
                  placeholder="Project Title"
                />
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, { description: e.target.value })}
                  placeholder="Description"
                  rows={3}
                />
                <Input
                  type="url"
                  value={project.image || ''}
                  onChange={(e) => updateProject(index, { image: e.target.value })}
                  placeholder="Image URL (optional)"
                />
                <Input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject(index, { link: e.target.value })}
                  placeholder="Project Link (optional)"
                />
                
                {/* Tech Stack */}
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-2">
                    Tech Stack
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(project.techStack || []).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-full text-xs border border-neutral-200"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechFromProject(index, techIndex)}
                          className="hover:text-red-600"
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
              <button
                onClick={() => removeProject(index)}
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
        onClick={addProject}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
