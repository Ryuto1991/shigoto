import React from 'react';
import type { Article } from '../types/article';
import { ExternalLink, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'regular';
  onArticleClick: (article: Article) => void;
  onSelect?: (article: Article) => void;
  isSelected?: boolean;
}

export function ArticleCard({ 
  article, 
  variant = 'regular', 
  onArticleClick,
  onSelect,
  isSelected = false
}: ArticleCardProps) {
  const { language } = useLanguage();
  const adminUrl = import.meta.env.VITE_WORDPRESS_ADMIN_URL || 'https://admin.chizaizukan.com/wp-admin';
  const editUrl = article.wordpressId ? `${adminUrl}/post.php?post=${article.wordpressId}&action=edit` : undefined;

  const handleClick = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      onSelect?.(article);
    } else {
      onArticleClick(article);
    }
  };

  return (
    <div 
      className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={handleClick}
      role="article"
      aria-selected={isSelected}
    >
      {onSelect && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(article);
          }}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full ${
            isSelected 
              ? 'bg-blue-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Check className="w-5 h-5" />
        </button>
      )}

      <img
        src={article.image}
        alt={article.title}
        className={`w-full object-cover ${variant === 'featured' ? 'h-[400px]' : 'h-48'}`}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{article.title}</h3>
          {editUrl && (
            <a
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
              title={language === 'ja' ? 'WordPressで編集' : 'Edit in WordPress'}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {article.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}