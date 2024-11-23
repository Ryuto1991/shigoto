import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { ArticleCard } from '../components/ArticleCard';
import { useNavigate } from 'react-router-dom';
import { newsArticles } from '../data/newsArticles';
import { PopularTags } from '../components/PopularTags';
import { useTag } from '../contexts/TagContext';

export function NewsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { selectedTag } = useTag();

  const filteredArticles = selectedTag
    ? newsArticles.filter(article => article.tags.includes(selectedTag))
    : newsArticles;

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {language === 'ja' ? 'ニュース' : 'News'}
        </h1>
        <p className="text-gray-600">
          {language === 'ja'
            ? 'テキスタイル業界の最新ニュースと動向をお届けします。'
            : 'Latest news and trends in the textile industry.'}
        </p>
      </div>

      <PopularTags />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onArticleClick={() => handleArticleClick(article.slug)}
          />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {language === 'ja'
            ? '選択したタグに一致するニュースが見つかりません。'
            : 'No news found matching the selected tag.'}
        </div>
      )}
    </PageLayout>
  );
}