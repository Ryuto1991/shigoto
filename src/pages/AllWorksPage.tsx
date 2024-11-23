import React, { useState, useMemo } from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { ArticleCard } from '../components/ArticleCard';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { Pagination } from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { allArticles } from '../data/allArticles';
import { X } from 'lucide-react';
import type { Article } from '../types/article';

const ITEMS_PER_PAGE = 20;

interface Tag {
  name: string;
  nameJa: string;
  count: number;
}

const popularTags: Tag[] = [
  { name: 'New Materials', nameJa: '新素材', count: 277 },
  { name: 'Environment', nameJa: '環境', count: 189 },
  { name: 'Fashion', nameJa: 'ファッション', count: 156 },
  { name: 'Design', nameJa: 'デザイン', count: 143 },
  { name: 'AI', nameJa: 'AI', count: 98 },
  { name: 'Sustainable', nameJa: 'サステナブル', count: 87 },
  { name: 'Traditional', nameJa: '伝統', count: 76 },
  { name: 'Innovation', nameJa: 'イノベーション', count: 65 }
];

export function AllWorksPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'popular'>('latest');

  // Filter and sort works
  const filteredWorks = useMemo(() => {
    let works = [...allArticles];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      works = works.filter(work => 
        work.title.toLowerCase().includes(query) ||
        work.description.toLowerCase().includes(query) ||
        work.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      works = works.filter(work => work.tags.includes(selectedCategory));
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      works = works.filter(work =>
        selectedTags.every(tag => work.tags.includes(tag))
      );
    }

    // Apply sorting
    works.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.id - b.id;
        case 'popular':
          return b.id - a.id;
        default:
          return b.id - a.id;
      }
    });

    return works;
  }, [allArticles, searchQuery, selectedCategory, selectedTags, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredWorks.length / ITEMS_PER_PAGE);
  const paginatedWorks = filteredWorks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  return (
    <PageLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="sticky top-24 space-y-6">
            <div className="space-y-4">
              <SearchBar
                value={searchQuery}
                onChange={(value) => {
                  setSearchQuery(value);
                  setCurrentPage(1);
                }}
                placeholder={language === 'ja' ? '作品を検索...' : 'Search works...'}
              />

              {/* Tags Section */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold mb-3">
                  {language === 'ja' ? 'タグで絞り込む' : 'Filter by Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag.name}
                      onClick={() => toggleTag(tag.name)}
                      className={`group relative inline-flex items-center px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                        selectedTags.includes(tag.name)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <span>{language === 'ja' ? tag.nameJa : tag.name}</span>
                      <span className={`ml-1 text-xs ${
                        selectedTags.includes(tag.name)
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}>
                        {tag.count}
                      </span>
                    </button>
                  ))}
                </div>

                {selectedTags.length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setSelectedTags([]);
                        setCurrentPage(1);
                      }}
                      className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4 mr-1" />
                      {language === 'ja' ? 'タグをクリア' : 'Clear tags'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <FilterPanel
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-bold mb-8">
            {language === 'ja' ? 'すべての作品' : 'All Works'}
          </h1>

          {paginatedWorks.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedWorks.map((work) => (
                  <ArticleCard
                    key={work.id}
                    article={work}
                    onArticleClick={handleArticleClick}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {language === 'ja'
                ? '条件に一致する作品が見つかりませんでした。'
                : 'No works found matching your criteria.'}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}