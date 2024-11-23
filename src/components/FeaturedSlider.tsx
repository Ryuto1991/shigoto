import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleCard } from './ArticleCard';
import { featuredItems } from '../data/featuredItems';
import { useLanguage } from '../contexts/LanguageContext';
import type { Article } from '../types/article';

interface FeaturedSliderProps {
  onArticleClick: (article: Article) => void;
}

export function FeaturedSlider({ onArticleClick }: FeaturedSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { language } = useLanguage();

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isAnimating]);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-gray-200">
        <div
          className="h-full bg-blue-500 transition-all duration-5000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / featuredItems.length) * 100}%`
          }}
        />
      </div>

      {/* Slides */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0 relative"
              onClick={() => onArticleClick(item)}
            >
              <div className="relative h-[500px] group cursor-pointer">
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                      {item.title}
                    </h2>
                    <p className="text-lg text-white/90 mb-6 line-clamp-2 transform group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 transform group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/10 text-white rounded-full text-sm backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors transform hover:-translate-y-1/2 hover:scale-110 duration-300"
        aria-label={language === 'ja' ? '前のスライド' : 'Previous slide'}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors transform hover:-translate-y-1/2 hover:scale-110 duration-300"
        aria-label={language === 'ja' ? '次のスライド' : 'Next slide'}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'w-8 bg-white'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}