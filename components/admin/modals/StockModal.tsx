'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import TextInput from '@/components/admin/inputs/TextInput';
import SelectInput from '@/components/admin/inputs/SelectInput';
import CheckboxInput from '@/components/admin/inputs/CheckboxInput';
import PrimaryButton from '@/components/admin/buttons/PrimaryButton';
import type { StockModalProps, StockFormData, RiskLevel, ShariaStatus } from '@/types';

const StockModal: React.FC<StockModalProps> = ({ isOpen, onClose, stock, mode, onSubmit }) => {
  const [formData, setFormData] = useState<StockFormData>({
    stockName: '',
    symbol: '',
    riskLevel: 'Low',
    shariaStatus: 'Halal',
    premiumOnly: false,
  });

  useEffect(() => {
    if (stock && mode === 'edit') {
      setFormData({
        stockName: stock.stockName,
        symbol: stock.symbol,
        riskLevel: stock.riskLevel,
        shariaStatus: stock.shariaStatus,
        premiumOnly: stock.premium,
      });
    } else {
      setFormData({
        stockName: '',
        symbol: '',
        riskLevel: 'Low',
        shariaStatus: 'Halal',
        premiumOnly: false,
      });
    }
  }, [stock, mode, isOpen]);

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
            {mode === 'add' ? 'Add Stock' : 'Edit Stock'}
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
            label="Stock Name"
            value={formData.stockName}
            onChange={(value) => setFormData({ ...formData, stockName: value })}
            placeholder="e.g., Apple Inc."
            required
          />

          <TextInput
            label="Symbol"
            value={formData.symbol}
            onChange={(value) => setFormData({ ...formData, symbol: value })}
            placeholder="e.g., AAPL"
            required
          />

          <SelectInput
            label="Risk Level"
            value={formData.riskLevel}
            onChange={(value) => setFormData({ ...formData, riskLevel: value as RiskLevel })}
            options={['Low', 'Medium', 'High']}
            required
          />

          <SelectInput
            label="Sharia Status"
            value={formData.shariaStatus}
            onChange={(value) => setFormData({ ...formData, shariaStatus: value as ShariaStatus })}
            options={['Halal', 'Doubtful', 'Haram']}
            required
          />

          <CheckboxInput
            label="Premium Access Only"
            checked={formData.premiumOnly}
            onChange={(checked) => setFormData({ ...formData, premiumOnly: checked })}
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

export default StockModal;