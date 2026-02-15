'use client';

import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import SearchInput from '@/components/admin/SearchInput';
import CommodityModal from '@/components/admin/modals/CommodityModal';
import PrimaryButton from '@/components/admin/buttons/PrimaryButton';
import type { Commodity, CommodityFormData } from '@/types';

export default function CommoditiesPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCommodity, setSelectedCommodity] = useState<Commodity | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const commodities: Commodity[] = [
    {
      id: 1,
      name: 'Gold',
      price: 2050.50,
      premiumAccess: false,
    },
    {
      id: 2,
      name: 'Silver',
      price: 2050.50,
      premiumAccess: false,
    },
    {
      id: 3,
      name: 'Gold',
      price: 2050.50,
      premiumAccess: true,
    },
    {
      id: 4,
      name: 'Gold',
      price: 2050.50,
      premiumAccess: false,
    },
    {
      id: 5,
      name: 'Gold',
      price: 2050.50,
      premiumAccess: true,
    },
    {
      id: 6,
      name: 'Silver',
      price: 2050.50,
      premiumAccess: false,
    },
    {
      id: 7,
      name: 'Gold',
      price: 2050.50,
      premiumAccess: true,
    },
  ];

  const filteredCommodities = commodities.filter((commodity: Commodity) => {
    const matchesSearch = commodity.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddCommodity = (): void => {
    setModalMode('add');
    setSelectedCommodity(null);
    setIsModalOpen(true);
  };

  const handleEditCommodity = (commodity: Commodity): void => {
    setModalMode('edit');
    setSelectedCommodity(commodity);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: CommodityFormData): void => {
    console.log('Commodity data:', data);
    // Handle form submission
  };

  const handleDeleteCommodity = (commodityId: number): void => {
    console.log('Delete commodity:', commodityId);
    // Handle delete
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Commodities</h1>
          <p className="text-sm text-gray-500 mt-1">Track commodity prices and market trends.</p>
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search commodities..."
            />
          </div>
          <PrimaryButton onClick={handleAddCommodity} className="flex items-center justify-center gap-2 whitespace-nowrap">
            <Plus size={18} />
            Add Commodity
          </PrimaryButton>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price (USD)
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Premium Access
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCommodities.map((commodity: Commodity) => (
                  <tr 
                    key={`commodity-${commodity.id}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{commodity.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">${commodity.price.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-sm font-medium"
                        style={{ color: commodity.premiumAccess ? '#9333EA' : '#6B7280' }}
                      >
                        {commodity.premiumAccess ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditCommodity(commodity)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit commodity"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCommodity(commodity.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete commodity"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {filteredCommodities.map((commodity: Commodity) => (
              <div key={`commodity-mobile-${commodity.id}`} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{commodity.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">${commodity.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Premium Access:</span>
                  <span
                    className="font-medium"
                    style={{ color: commodity.premiumAccess ? '#9333EA' : '#6B7280' }}
                  >
                    {commodity.premiumAccess ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleEditCommodity(commodity)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCommodity(commodity.id)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commodity Modal */}
      <CommodityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        commodity={selectedCommodity}
        mode={modalMode}
        onSubmit={handleSubmit}
      />
    </>
  );
}