'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import TextInput from '@/components/admin/inputs/TextInput';
import NumberInput from '@/components/admin/inputs/NumberInput';
import CheckboxInput from '@/components/admin/inputs/CheckboxInput';
import PrimaryButton from '@/components/admin/buttons/PrimaryButton';
import type { CommodityModalProps, CommodityFormData } from '@/types';

const CommodityModal: React.FC<CommodityModalProps> = ({ isOpen, onClose, commodity, mode, onSubmit }) => {
  const [formData, setFormData] = useState<CommodityFormData>({
    name: '',
    price: 0,
    premiumAccessOnly: false,
  });

  useEffect(() => {
    if (commodity && mode === 'edit') {
      setFormData({
        name: commodity.name,
        price: commodity.price,
        premiumAccessOnly: commodity.premiumAccess,
      });
    } else {
      setFormData({
        name: '',
        price: 0,
        premiumAccessOnly: false,
      });
    }
  }, [commodity, mode, isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === 'add' ? 'Add Commodity' : 'Edit Commodity'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <TextInput
            label="Name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="e.g., Gold"
            required
          />

          <NumberInput
            label="Price (USD)"
            value={formData.price}
            onChange={(value) => setFormData({ ...formData, price: value })}
            placeholder="0"
            required
            min={0}
            step={0.01}
          />

          <CheckboxInput
            label="Premium Access Only"
            checked={formData.premiumAccessOnly}
            onChange={(checked) => setFormData({ ...formData, premiumAccessOnly: checked })}
          />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <PrimaryButton type="submit" variant="primary" fullWidth>
              {mode === 'add' ? 'Add' : 'Update'}
            </PrimaryButton>
            <PrimaryButton type="button" variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommodityModal;