import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', id, ...props }: SelectProps) {
  const uid = (id as string) ?? React.useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={uid} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={uid}
          className={`w-full appearance-none px-3 py-2 pr-10 cursor-pointer border border-transparent dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-500 focus:border-transparent transition-all ${props.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-neutral-200 dark:hover:bg-neutral-700'} ${className}`}
          {...props}
        >
          {/* helpful placeholder when no value/defaultValue is provided */}
          {props.value == null && props.defaultValue == null && (
            <option value="" disabled hidden>
              Select...
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <ChevronDown className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        </div>
      </div>
    </div>
  );
}
