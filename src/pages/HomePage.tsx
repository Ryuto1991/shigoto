import React from 'react';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { HomeAdBanner } from '../components/HomeAdBanner';
import { BrandBanners } from '../components/BrandBanners';
import { FeaturedSlider } from '../components/FeaturedSlider';
import { NewsSection } from '../components/NewsSection';
import { AllWorks } from '../components/AllWorks';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

export function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <Navbar />
      <HomeAdBanner />
      <BrandBanners />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">{t('featured.title')}</h2>
          <FeaturedSlider onArticleClick={handleArticleClick} />
        </section>
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">{t('news.title')}</h2>
          <NewsSection onArticleClick={handleArticleClick} />
        </section>
        <AllWorks />
      </main>
      <Footer />
    </div>
  );
}