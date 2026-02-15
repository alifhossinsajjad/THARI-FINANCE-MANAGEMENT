'use client';

import React from 'react';
import type { CheckboxInputProps } from '@/types';

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.checked);
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-900">{label}</span>
    </label>
  );
};

export default CheckboxInput;