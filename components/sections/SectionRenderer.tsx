import React from 'react';
import { Section } from '@/types';
import { HeroSectionRenderer } from './HeroSection';
import { AboutSectionRenderer } from './AboutSection';
import { SkillsSectionRenderer } from './SkillsSection';
import { ExperienceSectionRenderer } from './ExperienceSection';
import { ProjectsSectionRenderer } from './ProjectsSection';
import { HighlightsSectionRenderer } from './HighlightsSection';
import { GitHubSectionRenderer } from './GitHubSection';
import { ContactSectionRenderer } from './ContactSection';
import { CTASectionRenderer } from './CTASection';
import { CustomSectionRenderer } from './CustomSection';
import { 
  NowSectionRenderer, 
  ToolboxSectionRenderer, 
  TestimonialsSectionRenderer, 
  WritingSectionRenderer 
} from './MiscSections';

interface SectionRendererProps {
  section: Section;
  isBuilder?: boolean;
}

export function SectionRenderer({ section, isBuilder = false }: SectionRendererProps) {
  const { type, variant, props } = section;
  
  // Type assertion helper to safely pass props
  const safeProps = props as any;

  try {
    switch (type) {
      case 'hero':
        return <HeroSectionRenderer variant={variant} props={safeProps} />;
      
      case 'about':
        return <AboutSectionRenderer variant={variant} props={safeProps} />;
      
      case 'skills':
        return <SkillsSectionRenderer variant={variant} props={safeProps} />;
      
      case 'experience':
        return <ExperienceSectionRenderer variant={variant} props={safeProps} />;
      
      case 'projects':
        return <ProjectsSectionRenderer variant={variant} props={safeProps} />;
      
      case 'highlights':
        return <HighlightsSectionRenderer variant={variant} props={safeProps} />;
      
      case 'github':
        return <GitHubSectionRenderer variant={variant} props={safeProps} />;
      
      case 'contact':
        return <ContactSectionRenderer variant={variant} props={safeProps} />;
      
      case 'cta':
        return <CTASectionRenderer variant={variant} props={safeProps} />;
      
      case 'custom':
        return <CustomSectionRenderer variant={variant} props={safeProps} />;
      
      case 'now':
        return <NowSectionRenderer props={safeProps} />;
      
      case 'toolbox':
        return <ToolboxSectionRenderer variant={variant} props={safeProps} />;
      
      case 'testimonials':
        return <TestimonialsSectionRenderer variant={variant} props={safeProps} />;
      
      case 'writing':
        return <WritingSectionRenderer variant={variant} props={safeProps} />;
      
      default:
        return (
          <div className="py-8 px-6">
            <div className="p-6 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-center">
              <p className="text-neutral-600 dark:text-neutral-400">
                Section type "{type}" not found
              </p>
            </div>
          </div>
        );
    }
  } catch (error) {
    console.error(`Error rendering section ${type}:`, error);
    return (
      <div className="py-8 px-6">
        <div className="p-6 rounded-xl bg-red-50 dark:bg-red-900/20 text-center">
          <p className="text-red-600 dark:text-red-400">
            Error rendering section
          </p>
        </div>
      </div>
    );
  }
}
