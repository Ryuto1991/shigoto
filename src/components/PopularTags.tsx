import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTag } from '../contexts/TagContext';

interface Tag {
  name: string;
  count: number;
  nameJa: string;
}

const popularTags: Tag[] = [
  { name: 'New Materials', nameJa: '新素材', count: 277 },
  { name: 'Environment', nameJa: '環境', count: 189 },
  { name: 'Fashion', nameJa: 'ファッション', count: 156 },
  { name: 'Design', nameJa: 'デザイン', count: 143 },
  { name: 'AI', nameJa: 'AI', count: 98 },
  { name: 'Sustainable', nameJa: 'サステナブル', count: 87 },
  { name: 'Traditional', nameJa: '伝統', count: 76 },
  { name: 'Innovation', nameJa: 'イノベーション', count: 65 }
];

export function PopularTags() {
  const { language } = useLanguage();
  const { selectedTag, setSelectedTag } = useTag();

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">
        {language === 'ja' ? '人気のタグ' : 'Popular Tags'}
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {popularTags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
            className={`group relative px-4 py-2 rounded-full transition-all duration-300 ${
              selectedTag === tag.name
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="font-medium">
                {language === 'ja' ? tag.nameJa : tag.name}
              </span>
              <span className={`text-sm ${
                selectedTag === tag.name ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {tag.count}
              </span>
            </span>
            
            {/* Hover animation */}
            <span className="absolute inset-0 rounded-full bg-blue-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            
            {/* Selected indicator */}
            {selectedTag === tag.name && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}