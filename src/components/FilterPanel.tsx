import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FilterPanelProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: 'latest' | 'oldest' | 'popular';
  onSortChange: (sort: 'latest' | 'oldest' | 'popular') => void;
}

const categories = [
  { id: 'fashion', nameJa: 'ファッション', nameEn: 'Fashion' },
  { id: 'interior', nameJa: 'インテリア', nameEn: 'Interior' },
  { id: 'technical', nameJa: 'テクニカル', nameEn: 'Technical' },
  { id: 'sustainable', nameJa: 'サステナブル', nameEn: 'Sustainable' }
];

export function FilterPanel({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}: FilterPanelProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">
          {language === 'ja' ? 'カテゴリー' : 'Categories'}
        </h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(
                selectedCategory === category.id ? null : category.id
              )}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {language === 'ja' ? category.nameJa : category.nameEn}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          {language === 'ja' ? '並び替え' : 'Sort By'}
        </h2>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'latest' | 'oldest' | 'popular')}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="latest">
            {language === 'ja' ? '最新順' : 'Latest'}
          </option>
          <option value="oldest">
            {language === 'ja' ? '古い順' : 'Oldest'}
          </option>
          <option value="popular">
            {language === 'ja' ? '人気順' : 'Popular'}
          </option>
        </select>
      </div>
    </div>
  );
}