'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import TextInput from '@/components/admin/inputs/TextInput';
import SelectInput from '@/components/admin/inputs/SelectInput';
import DateInput from '@/components/admin/inputs/DateInput';
import TextAreaInput from '@/components/admin/inputs/TextAreaInput';
import CheckboxInput from '@/components/admin/inputs/CheckboxInput';
import PrimaryButton from '@/components/admin/buttons/PrimaryButton';
import type { NewsModalProps, NewsFormData, NewsCategory, NewsStatus } from '@/types';

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, news, mode, onSubmit }) => {
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    category: 'Stock',
    publishDate: '',
    content: '',
    status: 'Draft',
    markAsFeatured: false,
  });

  useEffect(() => {
    if (news && mode === 'edit') {
      setFormData({
        title: news.title,
        category: news.category,
        publishDate: news.publishDate,
        content: news.content,
        status: news.status,
        markAsFeatured: news.featured,
      });
    } else {
      setFormData({
        title: '',
        category: 'Stock',
        publishDate: '',
        content: '',
        status: 'Draft',
        markAsFeatured: false,
      });
    }
  }, [news, mode, isOpen]);

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
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === 'add' ? 'Add News' : 'Edit News'}
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
            label="Title"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            placeholder=""
            required
          />

          <SelectInput
            label="Category"
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value as NewsCategory })}
            options={['Stock', 'Crypto', 'Economy', 'Commodity']}
            required
          />

          <DateInput
            label="Publish Date"
            value={formData.publishDate}
            onChange={(value) => setFormData({ ...formData, publishDate: value })}
            required
          />

          <TextAreaInput
            label="Content"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder=""
            required
            rows={6}
          />

          <SelectInput
            label="Status"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value as NewsStatus })}
            options={['Draft', 'Published', 'Archived']}
            required
          />

          <CheckboxInput
            label="Mark as Featured"
            checked={formData.markAsFeatured}
            onChange={(checked) => setFormData({ ...formData, markAsFeatured: checked })}
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

export default NewsModal;