import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  bgColor: string;
  image: string;
  path: string;
}

const banners: Banner[] = [
  {
    id: 'apparel-brand',
    title: 'アパレルブランドを',
    subtitle: 'つくるなら',
    description: 'ブランド立ち上げから運営まで、成功への包括的なガイドをご紹介します。',
    ctaText: 'ブランド作りを始める',
    bgColor: 'from-indigo-600 via-purple-600 to-pink-600',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    path: '/article/creating-apparel-brand'
  },
  {
    id: 'costume-making',
    title: '衣装作りを',
    subtitle: 'サポート',
    description: 'プロの衣装デザイナーによる、素材選びから製作テクニックまでをご紹介。',
    ctaText: '衣装作りを学ぶ',
    bgColor: 'from-rose-600 via-red-600 to-orange-600',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    path: '/article/costume-making-guide'
  },
  {
    id: 'accessory-brand',
    title: 'アクセサリーブランドを',
    subtitle: 'つくるなら',
    description: '独自性のあるアクセサリーブランドの作り方と、市場での差別化戦略をご紹介。',
    ctaText: 'ブランド展開を始める',
    bgColor: 'from-amber-600 via-yellow-600 to-lime-600',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    path: '/article/creating-accessory-brand'
  }
];

export function HomeAdBanner() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {banners.map((banner) => (
        <div
          key={banner.id}
          onClick={() => navigate(banner.path)}
          className={`relative bg-gradient-to-r ${banner.bgColor} rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
        >
          <div className="relative z-10 p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">{banner.title}</h2>
              <p className="text-xl text-white/90">{banner.subtitle}</p>
            </div>
            <p className="text-sm text-white/80 mb-6">
              {banner.description}
            </p>
            <button
              className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {banner.ctaText}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <img
              src={banner.image}
              alt=""
              className="w-full h-full object-cover opacity-50"
            />
          </div>

          {/* Animated shine effect */}
          <div className="absolute inset-0 z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}