import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArticleCard } from './ArticleCard';
import { PopularTags } from './PopularTags';
import { featuredItems } from '../data/featuredItems';
import { latestEntries } from '../data/latestEntries';
import { ArrowRight } from 'lucide-react';
import { useTag } from '../contexts/TagContext';

const INITIAL_DISPLAY_COUNT = 6;

export function AllWorks() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { selectedTag } = useTag();

  // Combine and deduplicate works
  const allWorks = React.useMemo(() => {
    const seen = new Set();
    return [...featuredItems, ...latestEntries].filter(work => {
      const duplicate = seen.has(work.id);
      seen.add(work.id);
      return !duplicate;
    });
  }, []);

  // Filter works by selected tag
  const filteredWorks = React.useMemo(() => {
    if (!selectedTag) return allWorks;
    return allWorks.filter(work => work.tags.includes(selectedTag));
  }, [allWorks, selectedTag]);

  const displayedWorks = showAll 
    ? filteredWorks 
    : filteredWorks.slice(0, INITIAL_DISPLAY_COUNT);

  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`);
  };

  return (
    <section className="mt-16">
      <div className="mb-12">
        <PopularTags />
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">
          {language === 'ja' ? 'すべての作品' : 'All Works'}
        </h2>
        
        <button
          onClick={() => navigate('/all-works')}
          className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className="text-sm font-medium">
            {language === 'ja' ? 'すべての作品を見る' : 'View All Works'}
          </span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </button>
      </div>

      {displayedWorks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedWorks.map((work) => (
            <ArticleCard
              key={work.id}
              article={work}
              onArticleClick={() => handleArticleClick(work.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          {language === 'ja'
            ? '選択したタグに一致する作品が見つかりません。'
            : 'No works found matching the selected tag.'}
        </div>
      )}

      {!showAll && filteredWorks.length > INITIAL_DISPLAY_COUNT && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>
              {language === 'ja' ? 'もっと見る' : 'Load More'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}