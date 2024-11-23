import React from 'react';
import type { Article } from '../types/article';
import { Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface SecretArticleCardProps {
  article: Article;
  onArticleClick: (article: Article) => void;
}

export function SecretArticleCard({ article, onArticleClick }: SecretArticleCardProps) {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onArticleClick(article)}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center">
          <Lock className="w-8 h-8 text-white" />
        </div>
        {/* Use a data URI for placeholder to prevent image indexing */}
        <div
          className="w-full h-48 bg-gray-200"
          role="img"
          aria-label={language === 'ja' ? '機密画像' : 'Confidential Image'}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">
          {isAuthenticated ? article.title : '* * * * *'}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {isAuthenticated ? article.description : language === 'ja' 
            ? 'この記事を閲覧するにはログインが必要です。'
            : 'Login required to view this article.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {isAuthenticated ? tag : '***'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}