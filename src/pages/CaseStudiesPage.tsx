import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { ArticleCard } from '../components/ArticleCard';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

const caseStudies: Article[] = [
  {
    id: 1,
    title: 'Patent Portfolio Strategy',
    description: 'How a tech company built a defensive patent portfolio',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    tags: ['Strategy', 'Portfolio'],
    slug: 'patent-portfolio-strategy',
    wordpressId: 4001
  },
  {
    id: 2,
    title: 'Trademark Dispute Resolution',
    description: 'Successfully resolving international trademark conflicts',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    tags: ['Trademark', 'Legal'],
    slug: 'trademark-dispute-resolution',
    wordpressId: 4002
  }
];

export function CaseStudiesPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">
        {language === 'ja' ? '事例紹介' : 'Case Studies'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study) => (
          <ArticleCard
            key={study.id}
            article={study}
            onArticleClick={handleArticleClick}
          />
        ))}
      </div>
    </PageLayout>
  );
}