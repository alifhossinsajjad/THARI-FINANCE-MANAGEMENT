// FILE: app/admin/news/page.tsx
'use client';

import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Star } from 'lucide-react';
import SearchInput from '@/components/admin/SearchInput';
import FilterSelect from '@/components/admin/FilterSelect';
import NewsModal from '@/components/admin/modals/NewsModal';
import PrimaryButton from '@/components/admin/buttons/PrimaryButton';
import type { News, NewsFormData } from '@/types';

export default function NewsPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const news: News[] = [
    {
      id: 1,
      title: 'Market Rally Continues as Tech Stocks Surge',
      category: 'Stock',
      publishDate: '2024-01-15',
      status: 'Published',
      featured: true,
      content: 'Lorem ipsum dolor sit amet...',
    },
    {
      id: 2,
      title: 'Bitcoin Reaches New All-Time High',
      category: 'Crypto',
      publishDate: '2024-01-15',
      status: 'Published',
      featured: false,
      content: 'Lorem ipsum dolor sit amet...',
    },
    {
      id: 3,
      title: 'Fed Announces Interest Rate Decision',
      category: 'Economy',
      publishDate: '2024-01-15',
      status: 'Draft',
      featured: true,
      content: 'Lorem ipsum dolor sit amet...',
    },
  ];

  const filteredNews = news.filter((item: News) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Stock':
        return '#3B82F6';
      case 'Crypto':
        return '#A855F7';
      case 'Economy':
        return '#10B981';
      case 'Commodity':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Published':
        return '#10B981';
      case 'Draft':
        return '#6B7280';
      case 'Archived':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const handleAddNews = (): void => {
    setModalMode('add');
    setSelectedNews(null);
    setIsModalOpen(true);
  };

  const handleEditNews = (item: News): void => {
    setModalMode('edit');
    setSelectedNews(item);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: NewsFormData): void => {
    console.log('News data:', data);
    // Handle form submission
  };

  const handleDeleteNews = (newsId: number): void => {
    console.log('Delete news:', newsId);
    // Handle delete
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">News</h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated with the latest news and updates.</p>
        </div>

        {/* Search, Filters, and Add Button */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search news..."
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full lg:w-48">
              <FilterSelect
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={['All', 'Stock', 'Crypto', 'Economy', 'Commodity']}
                placeholder="All"
              />
            </div>
            <div className="w-full lg:w-48">
              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={['All', 'Published', 'Draft', 'Archived']}
                placeholder="All"
              />
            </div>
            <PrimaryButton onClick={handleAddNews} className="flex items-center justify-center gap-2 whitespace-nowrap">
              <Plus size={18} />
              Add News
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
                    Title
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Publish Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredNews.map((item: News) => (
                  <tr 
                    key={`news-${item.id}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${getCategoryColor(item.category)}20`,
                          color: getCategoryColor(item.category),
                        }}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{item.publishDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-sm font-medium"
                        style={{ color: getStatusColor(item.status) }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Star
                        size={20}
                        className={item.featured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditNews(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit news"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNews(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete news"
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
            {filteredNews.map((item: News) => (
              <div key={`news-mobile-${item.id}`} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.publishDate}</p>
                  </div>
                  <Star
                    size={20}
                    className={item.featured ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getCategoryColor(item.category)}20`,
                      color: getCategoryColor(item.category),
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${getStatusColor(item.status)}20`,
                      color: getStatusColor(item.status),
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleEditNews(item)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteNews(item.id)}
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

      {/* News Modal */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        news={selectedNews}
        mode={modalMode}
        onSubmit={handleSubmit}
      />
    </>
  );
}