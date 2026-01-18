import React from 'react';
import { ProjectsSectionProps } from '@/types';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectsSectionRendererProps {
  variant: string;
  props: ProjectsSectionProps;
}

export function ProjectsSectionRenderer({ variant, props }: ProjectsSectionRendererProps) {
  const { title, projects, featured } = props;

  if (variant === 'grid') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {projects?.map((project, idx) => (
            <a
              key={idx}
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:shadow-lg dark:hover:bg-neutral-800 transition-all"
            >
              {project.image && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <ExternalLink
                  size={18}
                  className="text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                />
              </div>
              
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                {project.description}
              </p>
              
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="space-y-6">
          {projects?.map((project, idx) => (
            <a
              key={idx}
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:shadow-xl dark:hover:bg-neutral-800 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {project.image && (
                  <div className="md:w-1/3 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink
                      size={20}
                      className="text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-1"
                    />
                  </div>
                  
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 text-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'featuredList') {
    const featuredProjects = projects?.filter(p => featured?.includes(p.title)) || [];
    const otherProjects = projects?.filter(p => !featured?.includes(p.title)) || [];

    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
              Featured
            </h3>
            <div className="space-y-6">
              {featuredProjects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:shadow-xl transition-all"
                >
                  {project.image && (
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  
                  <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    {project.description}
                  </p>
                  
                  {project.techStack && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 text-sm bg-white/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                More Projects
              </h3>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {otherProjects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h4>
                    <ArrowRight
                      size={16}
                      className="text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5"
                    />
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {project.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'caseStudy') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="space-y-8">
          {projects?.map((project, idx) => (
            <a
              key={idx}
              href={project.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-800/50 hover:shadow-2xl transition-all"
            >
              {project.image && (
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink
                    size={24}
                    className="text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  />
                </div>
                
                <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-4 py-2 text-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="py-8 px-6">
      {title && (
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      <div className="space-y-4">
        {projects?.map((project, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
              {project.title}
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
