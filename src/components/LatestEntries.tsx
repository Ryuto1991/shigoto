import React from 'react';
import { ArticleCard } from './ArticleCard';
import { latestEntries } from '../data/latestEntries';
import { useTag } from '../contexts/TagContext';
import type { Article } from '../types/article';

interface LatestEntriesProps {
  onArticleClick: (article: Article) => void;
}

export function LatestEntries({ onArticleClick }: LatestEntriesProps) {
  const { selectedTag } = useTag();

  const filteredEntries = selectedTag
    ? latestEntries.filter(entry => entry.tags.includes(selectedTag))
    : latestEntries;

  if (filteredEntries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No articles found with the selected tag.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEntries.map((entry) => (
        <ArticleCard 
          key={entry.id} 
          article={entry} 
          onArticleClick={onArticleClick}
        />
      ))}
    </div>
  );
}