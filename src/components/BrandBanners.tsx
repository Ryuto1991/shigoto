import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';

interface BrandBanner {
  id: string;
  name: string;
  image: string;
  path: string;
  wordpressId?: number;
}

const brandBanners: BrandBanner[] = [
  {
    id: 'orange-cosmetics',
    name: 'ORANGE COSMETICS',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    path: '/brands/orange',
    wordpressId: 1001
  },
  {
    id: 'minimal-beauty',
    name: 'MINIMAL BEAUTY',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    path: '/brands/minimal',
    wordpressId: 1002
  },
  {
    id: 'pure-essence',
    name: 'PURE ESSENCE',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    path: '/brands/pure',
    wordpressId: 1003
  }
];

export function BrandBanners() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const adminUrl = import.meta.env.VITE_WORDPRESS_ADMIN_URL || 'https://admin.chizaizukan.com/wp-admin';

  return (
    <section className="px-4 pt-8 pb-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {language === 'ja' ? 'ブランド制作' : 'Produce Brand'}
        </h2>
        {/* WordPress edit link for admins */}
        <a
          href={`${adminUrl}/edit.php?post_type=brand`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          {language === 'ja' ? '編集' : 'Edit'}
        </a>
      </div>

      {/* Mobile: Stack vertically */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {brandBanners.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(brand.path)}
            className="relative aspect-[21/9] overflow-hidden rounded-lg cursor-pointer group"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Always visible overlay on mobile for better text readability */}
            <div className="absolute inset-0 bg-black/40 transition-colors duration-300" />
            
            {/* Always visible brand name on mobile */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-lg font-bold tracking-wider px-4 text-center">
                {brand.name}
              </h3>
            </div>

            {/* WordPress edit link for individual brands */}
            {brand.wordpressId && (
              <a
                href={`${adminUrl}/post.php?post=${brand.wordpressId}&action=edit`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 text-white/80 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Tablet and Desktop: Grid layout */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {brandBanners.map((brand) => (
          <div
            key={brand.id}
            onClick={() => navigate(brand.path)}
            className="relative aspect-[42/9] overflow-hidden rounded-lg cursor-pointer group"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Overlay that darkens on hover */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
            
            {/* Brand Name */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-xl font-bold tracking-wider transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {brand.name}
              </h3>
            </div>

            {/* WordPress edit link for individual brands */}
            {brand.wordpressId && (
              <a
                href={`${adminUrl}/post.php?post=${brand.wordpressId}&action=edit`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 text-white/80 hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}