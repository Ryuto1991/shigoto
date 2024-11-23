import React from 'react';
import { useTag } from '../contexts/TagContext';

const tags = [
  { name: 'Sustainable', count: 156 },
  { name: 'Natural Dyes', count: 89 },
  { name: 'Smart Textiles', count: 67 },
  { name: 'Traditional', count: 45 },
  { name: 'Innovation', count: 78 },
  { name: 'Digital Printing', count: 92 },
  { name: 'Zero Waste', count: 34 },
  { name: 'Pattern Making', count: 56 },
  { name: 'Weaving', count: 88 },
  { name: 'Fashion Tech', count: 43 }
];

export function TagCloud() {
  const { selectedTag, setSelectedTag } = useTag();

  const handleTagClick = (tagName: string) => {
    setSelectedTag(selectedTag === tagName ? null : tagName);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <button
          key={tag.name}
          onClick={() => handleTagClick(tag.name)}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedTag === tag.name
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <span className="font-medium">{tag.name}</span>
          <span className={`ml-2 text-sm ${
            selectedTag === tag.name ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {tag.count}
          </span>
        </button>
      ))}
    </div>
  );
}