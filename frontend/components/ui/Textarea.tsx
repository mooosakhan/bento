import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2  border dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-500  transition-all resize-none ${error ? 'border-red-500' : ''} ${className}`}
        rows={3}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
