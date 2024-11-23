import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { ArticleCard } from '../components/ArticleCard';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

const categoryArticles: Record<string, Article[]> = {
  patents: [
    {
      id: 1,
      title: 'Advanced Battery Technology',
      description: 'Novel lithium-ion battery design with improved energy density',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
      tags: ['Energy', 'Battery', 'Innovation'],
      slug: 'advanced-battery-technology',
      wordpressId: 2001
    }
  ],
  trademarks: [
    {
      id: 2,
      title: 'Global Brand Protection',
      description: 'Strategies for international trademark registration',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      tags: ['Branding', 'International'],
      slug: 'global-brand-protection',
      wordpressId: 2002
    }
  ]
};

export function BrowseIPPage() {
  const { category } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const articles = category ? categoryArticles[category] || [] : [];

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">
        {category
          ? t(`nav.${category}`)
          : language === 'ja'
          ? '知的財産を探す'
          : 'Browse Intellectual Property'}
      </h1>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onArticleClick={handleArticleClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {language === 'ja'
              ? 'この分野の記事は準備中です。'
              : 'Articles in this category are coming soon.'}
          </p>
        </div>
      )}
    </PageLayout>
  );
}