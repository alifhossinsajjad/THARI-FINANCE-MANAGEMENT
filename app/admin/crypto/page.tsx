'use client';

import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import SearchInput from '@/components/admin/SearchInput';
import FilterSelect from '@/components/admin/FilterSelect';
import CryptoModal from '@/components/admin/modals/CryptoModal';
import PrimaryButton from '@/components/admin/buttons/PrimaryButton';
import type { Crypto, CryptoFormData } from '@/types';

export default function CryptoPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const cryptos: Crypto[] = [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      riskLevel: 'Medium',
      premiumAccess: false,
    },
    {
      id: 2,
      name: 'Bitcoin',
      symbol: 'BTC',
      riskLevel: 'Medium',
      premiumAccess: false,
    },
    {
      id: 3,
      name: 'Bitcoin',
      symbol: 'BTC',
      riskLevel: 'High',
      premiumAccess: false,
    },
    {
      id: 4,
      name: 'Bitcoin',
      symbol: 'BTC',
      riskLevel: 'Medium',
      premiumAccess: false,
    },
    {
      id: 5,
      name: 'Bitcoin',
      symbol: 'BTC',
      riskLevel: 'High',
      premiumAccess: false,
    },
    {
      id: 6,
      name: 'Bitcoin',
      symbol: 'BTC',
      riskLevel: 'Low',
      premiumAccess: false,
    },
  ];

  const filteredCryptos = cryptos.filter((crypto: Crypto) => {
    const matchesSearch = crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'All' || crypto.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'Low':
        return '#10B981';
      case 'Medium':
        return '#F59E0B';
      case 'High':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const handleAddCrypto = (): void => {
    setModalMode('add');
    setSelectedCrypto(null);
    setIsModalOpen(true);
  };

  const handleEditCrypto = (crypto: Crypto): void => {
    setModalMode('edit');
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: CryptoFormData): void => {
    console.log('Crypto data:', data);
    // Handle form submission
  };

  const handleDeleteCrypto = (cryptoId: number): void => {
    console.log('Delete crypto:', cryptoId);
    // Handle delete
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Crypto</h1>
          <p className="text-sm text-gray-500 mt-1">Track crypto prices and market trends.</p>
        </div>

        {/* Search, Filter, and Add Button */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search commodities..."
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full lg:w-48">
              <FilterSelect
                value={riskFilter}
                onChange={setRiskFilter}
                options={['All', 'Low', 'Medium', 'High']}
                placeholder="All"
              />
            </div>
            <PrimaryButton onClick={handleAddCrypto} className="flex items-center justify-center gap-2 whitespace-nowrap">
              <Plus size={18} />
              Add Crypto
            </PrimaryButton>
          </div>
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
                    Symbol
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Risk Level
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
                {filteredCryptos.map((crypto: Crypto) => (
                  <tr 
                    key={`crypto-${crypto.id}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{crypto.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{crypto.symbol}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getRiskColor(crypto.riskLevel)}20`,
                          color: getRiskColor(crypto.riskLevel),
                        }}
                      >
                        {crypto.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{crypto.premiumAccess ? 'Yes' : 'No'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditCrypto(crypto)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit crypto"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCrypto(crypto.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete crypto"
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
            {filteredCryptos.map((crypto: Crypto) => (
              <div key={`crypto-mobile-${crypto.id}`} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{crypto.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{crypto.symbol}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getRiskColor(crypto.riskLevel)}20`,
                      color: getRiskColor(crypto.riskLevel),
                    }}
                  >
                    {crypto.riskLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Premium Access:</span>
                  <span className="font-medium text-gray-900">{crypto.premiumAccess ? 'Yes' : 'No'}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleEditCrypto(crypto)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCrypto(crypto.id)}
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

      {/* Crypto Modal */}
      <CryptoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        crypto={selectedCrypto}
        mode={modalMode}
        onSubmit={handleSubmit}
      />
    </>
  );
}