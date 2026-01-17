import React from 'react';
import { HeaderBlockProps } from '@/types';
import { MapPin } from 'lucide-react';

interface HeaderBlockRendererProps {
  props: HeaderBlockProps;
}

export function HeaderBlockRenderer({ props }: HeaderBlockRendererProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-3 p-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img 
          src={props.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
          alt={props.displayName}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          {props.displayName || 'Your Name'}
        </h1>
        {props.bio && (
          <p className="mt-2 text-neutral-600 max-w-md">
            {props.bio}
          </p>
        )}
        {props.location && (
          <div className="flex items-center justify-center gap-1 mt-2 text-sm text-neutral-500">
            <MapPin className="w-4 h-4" />
            <span>{props.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
