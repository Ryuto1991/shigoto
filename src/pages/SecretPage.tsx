import React, { useState } from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { SecretArticleCard } from '../components/SecretArticleCard';
import { LoginModal } from '../components/LoginModal';
import { secretArticles } from '../data/secretArticles';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

export function SecretPage() {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleClick = (article: Article) => {
    if (!isAuthenticated) {
      setSelectedArticle(article);
      setShowLoginModal(true);
    } else {
      navigate(`/article/${article.slug}`);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (selectedArticle) {
      navigate(`/article/${selectedArticle.slug}`);
    }
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {language === 'ja' ? 'シークレット' : 'Secret Articles'}
        </h1>
        <p className="text-gray-600">
          {language === 'ja'
            ? 'これらの記事は認証が必要です。'
            : 'These articles require authentication to view.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secretArticles.map((article) => (
          <SecretArticleCard
            key={article.id}
            article={article}
            onArticleClick={handleArticleClick}
          />
        ))}
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </PageLayout>
  );
}