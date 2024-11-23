import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { ArticleCard } from '../components/ArticleCard';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

const topics: Article[] = [
  {
    id: 1,
    title: 'Future of IP Protection',
    description: 'Emerging trends in intellectual property protection',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['Trends', 'Future'],
    slug: 'future-of-ip-protection',
    wordpressId: 6001
  },
  {
    id: 2,
    title: 'Open Source Licensing',
    description: 'Understanding different open source license types',
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80',
    tags: ['Open Source', 'Licensing'],
    slug: 'open-source-licensing',
    wordpressId: 6002
  }
];

export function TopicsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">
        {language === 'ja' ? 'トピックス' : 'Topics'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <ArticleCard
            key={topic.id}
            article={topic}
            onArticleClick={handleArticleClick}
          />
        ))}
      </div>
    </PageLayout>
  );
}