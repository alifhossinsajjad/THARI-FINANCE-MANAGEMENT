'use client';

import React from 'react';
import type { NumberInputProps } from '@/types';

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  placeholder = '0',
  required = false,
  min = 0,
  step = 0.01,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        min={min}
        step={step}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default NumberInput;