import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface BannerItem {
  id: string;
  title: string;
  image: string;
  slug: string;
  altText: string;
}

const bannerItems: BannerItem[] = [
  {
    id: 'apparel-brand',
    title: 'アパレルブランドをつくるなら',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    slug: '/article/creating-apparel-brand',
    altText: 'Fashion designer working on new collection'
  },
  {
    id: 'fabric-creation',
    title: '生地をつくるなら',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    slug: '/article/fabric-creation',
    altText: 'Traditional textile weaving process'
  },
  {
    id: 'profile',
    title: 'プロフィール',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    slug: '/article/profile',
    altText: 'Professional workspace in design studio'
  }
];

export function Banner() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleBannerClick = (slug: string) => {
    navigate(slug);
  };

  return (
    <section className="mb-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bannerItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleBannerClick(item.slug)}
            className="group relative h-16 rounded-lg shadow-md overflow-hidden flex items-center"
            aria-label={language === 'ja' ? item.title : `View ${item.title}`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={item.image}
                alt={item.altText}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative flex items-center justify-between w-full px-4">
              <h3 className="text-white text-sm font-medium">
                {item.title}
              </h3>
              
              {/* Arrow with animation */}
              <div className="flex items-center text-white/90">
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Bottom line animation */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20">
              <div className="h-full bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}