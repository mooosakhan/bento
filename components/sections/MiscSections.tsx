import React from 'react';
import { NowSectionProps, ToolboxSectionProps, TestimonialsSectionProps, WritingSectionProps } from '@/types';
import * as Icons from 'lucide-react';
import { Calendar, ExternalLink } from 'lucide-react';

// Now Section
interface NowSectionRendererProps {
  props: NowSectionProps;
}

export function NowSectionRenderer({ props }: NowSectionRendererProps) {
  const { title, content, lastUpdated } = props;

  return (
    <div className="py-8 px-6">
      <div className="max-w-3xl mx-auto">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            {title}
          </h2>
        )}
        
        {lastUpdated && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            Last updated: {lastUpdated}
          </p>
        )}
        
        <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

// Toolbox Section
interface ToolboxSectionRendererProps {
  variant: string;
  props: ToolboxSectionProps;
}

export function ToolboxSectionRenderer({ variant, props }: ToolboxSectionRendererProps) {
  const { title, tools, grouped, categories } = props;

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon size={24} /> : null;
  };

  if (variant === 'grouped' && grouped && categories) {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
            {title}
          </h2>
        )}
        <div className="space-y-8">
          {categories.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                {category.name}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {category.tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {tool.icon && (
                      <div className="mb-3 text-blue-600 dark:text-blue-400">
                        {getIcon(tool.icon)}
                      </div>
                    )}
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                      {tool.name}
                    </h4>
                    {tool.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {tool.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools?.map((tool) => (
            <a
              key={tool.id}
              href={tool.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:shadow-lg dark:hover:bg-neutral-800 transition-all"
            >
              {tool.icon && (
                <div className="mb-4 text-blue-600 dark:text-blue-400">
                  {getIcon(tool.icon)}
                </div>
              )}
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h3>
              {tool.description && (
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {tool.description}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Simple variant
  return (
    <div className="py-8 px-6">
      {title && (
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      <div className="flex flex-wrap gap-3">
        {tools?.map((tool) => (
          <div
            key={tool.id}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          >
            {tool.icon && (
              <span className="text-blue-600 dark:text-blue-400">
                {getIcon(tool.icon)}
              </span>
            )}
            <span className="font-medium">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Testimonials Section
interface TestimonialsSectionRendererProps {
  variant: string;
  props: TestimonialsSectionProps;
}

export function TestimonialsSectionRenderer({ variant, props }: TestimonialsSectionRendererProps) {
  const { title, testimonials } = props;

  return (
    <div className="py-8 px-6">
      {title && (
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials?.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50"
          >
            <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed italic">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-3">
              {testimonial.avatarUrl ? (
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {testimonial.role}
                  {testimonial.company && ` at ${testimonial.company}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Writing Section
interface WritingSectionRendererProps {
  variant: string;
  props: WritingSectionProps;
}

export function WritingSectionRenderer({ variant, props }: WritingSectionRendererProps) {
  const { title, posts } = props;

  if (variant === 'cards') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {posts?.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:shadow-lg dark:hover:bg-neutral-800 transition-all"
            >
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                <Calendar size={14} />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                {post.excerpt}
              </p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md"
                    >
                      {tag}
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

  // List variant
  return (
    <div className="py-8 px-6">
      {title && (
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      <div className="space-y-4">
        {posts?.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <ExternalLink size={16} className="text-neutral-400 mt-1" />
            </div>
            
            <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {new Date(post.date).toLocaleDateString()}
              </span>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded"
                    >
                      {tag}
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
