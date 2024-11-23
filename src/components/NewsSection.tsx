import React from 'react';
import { ArticleCard } from './ArticleCard';
import { newsArticles } from '../data/newsArticles';
import type { Article } from '../types/article';

interface NewsSectionProps {
  onArticleClick: (article: Article) => void;
}

export function NewsSection({ onArticleClick }: NewsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsArticles.map((article) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          onArticleClick={onArticleClick}
        />
      ))}
    </div>
  );
}