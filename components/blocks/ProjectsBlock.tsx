import React from 'react';
import { ProjectsBlockProps } from '@/types';
import { ExternalLink } from 'lucide-react';

interface ProjectsBlockRendererProps {
  props: ProjectsBlockProps;
  theme: any;
}

export function ProjectsBlockRenderer({ props , theme }: ProjectsBlockRendererProps & { theme: any }) {
  if (!props.projects || props.projects.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm text-center text-neutral-500 dark:text-neutral-400">
        No projects added yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {props.projects.map((project, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {project.image && (
            <div className="aspect-video w-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                {project.description}
              </p>
            )}
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors text-sm font-medium"
              >
                <span>View Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
