'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { SelectInputProps } from '@/types';

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          required={required}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {options.map((option: string, index: number) => (
            <option key={`option-${index}`} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown 
          size={18} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default SelectInput;