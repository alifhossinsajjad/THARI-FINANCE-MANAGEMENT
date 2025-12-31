'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FilterSelectProps } from '@/types';

const FilterSelect: React.FC<FilterSelectProps> = ({ 
  value, 
  onChange, 
  options, 
  placeholder = 'Select...' 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string): void => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className={value === placeholder ? 'text-gray-400' : 'text-gray-900'}>
          {value}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
          {options.map((option: string, index: number) => (
            <button
              key={`option-${index}`}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                value === option ? 'text-blue-600 bg-blue-50' : 'text-gray-900'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSelect;