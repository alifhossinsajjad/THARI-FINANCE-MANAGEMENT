'use client';

import React from 'react';
import { Search } from 'lucide-react';
import type { SearchInputProps } from '@/types';

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search...' 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
        size={18}
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default SearchInput;