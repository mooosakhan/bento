import React from 'react';
import { ContactSectionProps } from '@/types';
import { Mail, Phone, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

interface ContactSectionRendererProps {
  variant: string;
  props: ContactSectionProps;
}

export function ContactSectionRenderer({ variant, props }: ContactSectionRendererProps) {
  const { title, subtitle, email, phone, socialLinks, showForm } = props;

  const socialIcons: Record<string, any> = {
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    instagram: Instagram,
  };

  if (variant === 'simple') {
    return (
      <div className="py-8 px-6">
        {title && (
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {subtitle}
          </p>
        )}
        
        <div className="space-y-4 mb-6">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Mail size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-neutral-700 dark:text-neutral-300">{email}</span>
            </a>
          )}
          
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Phone size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-neutral-700 dark:text-neutral-300">{phone}</span>
            </a>
          )}
        </div>
        
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div className="flex gap-3">
            {Object.entries(socialLinks).map(([platform, handle]) => {
              if (!handle) return null;
              const Icon = socialIcons[platform];
              if (!Icon) return null;
              
              return (
                <a
                  key={platform}
                  href={`https://${platform}.com/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Icon size={20} className="text-neutral-700 dark:text-neutral-300" />
                </a>
              );
            })}
          </div>
        )}
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
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {email && (
              <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={24} className="text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white">Email</h3>
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {email}
                </a>
              </div>
            )}
            
            {phone && (
              <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Phone size={24} className="text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white">Phone</h3>
                </div>
                <a
                  href={`tel:${phone}`}
                  className="text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
          
          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                Social Media
              </h3>
              <div className="space-y-3">
                {Object.entries(socialLinks).map(([platform, handle]) => {
                  if (!handle) return null;
                  const Icon = socialIcons[platform];
                  if (!Icon) return null;
                  
                  return (
                    <a
                      key={platform}
                      href={`https://${platform}.com/${handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Icon size={18} />
                      <span className="capitalize">{platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
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
      {email && (
        <a
          href={`mailto:${email}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {email}
        </a>
      )}
    </div>
  );
}
