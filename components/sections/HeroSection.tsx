import React from 'react';
import { HeroSectionProps } from '@/types';
import { MapPin, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroSectionRendererProps {
  variant: string;
  props: HeroSectionProps;
}

export function HeroSectionRenderer({ variant, props }: HeroSectionRendererProps) {
  const {
    displayName,
    headline,
    bio,
    location,
    avatar,
    openToWork,
    badges,
    stats,
    socialLinks,
    ctaButtons,
  } = props;

  // Avatar renderer
  const renderAvatar = () => {
    if (!avatar) return null;
    
    if (avatar.type === 'initials') {
      return (
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {avatar.value}
        </div>
      );
    }
    
    if (avatar.type === 'url' || avatar.type === 'upload') {
      return (
        <img 
          src={avatar.value} 
          alt={displayName}
          className="w-24 h-24 rounded-full object-cover"
        />
      );
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="py-12 px-6">
        <div className="flex items-start gap-6">
          {renderAvatar()}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              {displayName}
            </h1>
            {headline && (
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-3">
                {headline}
              </p>
            )}
            {bio && (
              <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                {bio}
              </p>
            )}
            {location && (
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <MapPin size={16} />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <div className="py-16 px-6 text-center">
        <div className="flex justify-center mb-6">
          {renderAvatar()}
        </div>
        
        {openToWork && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium mb-4">
            <Check size={16} />
            <span>Open to Work</span>
          </div>
        )}
        
        <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          {displayName}
        </h1>
        
        {headline && (
          <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-4">
            {headline}
          </p>
        )}
        
        {bio && (
          <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
            {bio}
          </p>
        )}
        
        {ctaButtons && ctaButtons.length > 0 && (
          <div className="flex items-center justify-center gap-4">
            {ctaButtons.map((btn, idx) => (
              <Button
                key={idx}
                variant={btn.variant === 'primary' ? 'primary' : 'secondary'}
                onClick={() => window.location.href = btn.url}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div className="py-12 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              {displayName}
            </h1>
            
            {headline && (
              <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-4">
                {headline}
              </p>
            )}
            
            {bio && (
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
                {bio}
              </p>
            )}
            
            {location && (
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-6">
                <MapPin size={18} />
                <span>{location}</span>
              </div>
            )}
            
            {openToWork && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                <Check size={16} />
                <span>Available for Work</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <div className="w-64 h-64 relative">
              {avatar && (avatar.type === 'url' || avatar.type === 'upload') ? (
                <img 
                  src={avatar.value} 
                  alt={displayName}
                  className="w-full h-full rounded-2xl object-cover shadow-2xl"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                  {avatar?.value || displayName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'withBadges') {
    return (
      <div className="py-12 px-6">
        <div className="flex items-start gap-6 mb-6">
          {renderAvatar()}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              {displayName}
            </h1>
            {headline && (
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-3">
                {headline}
              </p>
            )}
            {openToWork && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium mb-4">
                <Check size={14} />
                <span>Open to Work</span>
              </div>
            )}
          </div>
        </div>
        
        {bio && (
          <p className="text-neutral-700 dark:text-neutral-300 mb-6">
            {bio}
          </p>
        )}
        
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'withStats') {
    return (
      <div className="py-12 px-6">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            {renderAvatar()}
          </div>
          
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-3">
            {displayName}
          </h1>
          
          {headline && (
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
              {headline}
            </p>
          )}
          
          {bio && (
            <p className="text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              {bio}
            </p>
          )}
        </div>
        
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50"
              >
                <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Fallback to minimal
  return (
    <div className="py-12 px-6">
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
        {displayName}
      </h1>
      {headline && (
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-3">
          {headline}
        </p>
      )}
      {bio && (
        <p className="text-neutral-700 dark:text-neutral-300">
          {bio}
        </p>
      )}
    </div>
  );
}
