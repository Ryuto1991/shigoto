import React from 'react';
import { Mail, Instagram, Twitter } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { LanguageSwitch } from './LanguageSwitch';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="group relative text-2xl font-bold text-gray-900 hover:text-gray-900"
        >
          {/* Split text into individual characters for animation */}
          <span className="relative inline-block overflow-hidden">
            {t('site.title').split('').map((char, index) => (
              <span
                key={index}
                className="inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-blue-600"
                style={{ 
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
          {/* Animated underline */}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
        </Link>

        <div className="flex items-center gap-6">
          <SearchBar />
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
            <Mail className="w-4 h-4" />
            <span>{t('newsletter.button')}</span>
          </button>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}

export default Header;