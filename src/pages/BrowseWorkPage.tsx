import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { ArticleCard } from '../components/ArticleCard';
import { PopularTags } from '../components/PopularTags';
import { useNavigate } from 'react-router-dom';
import { featuredProjects } from '../data/featuredProjects';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { Project } from '../types/project';

const workCategories: Record<string, Project[]> = {
  fashion: featuredProjects.filter(project => project.category === 'fashion'),
  interior: featuredProjects.filter(project => project.category === 'interior'),
  technical: featuredProjects.filter(project => project.category === 'technical'),
  sustainable: featuredProjects.filter(project => project.tags.includes('Sustainable'))
};

type SortOption = 'latest' | 'oldest' | 'popular' | 'title';

export function BrowseWorkPage() {
  const { category } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [showFilters, setShowFilters] = useState(false);

  const handleProjectClick = (project: Project) => {
    navigate(`/project/${project.slug}`);
  };

  const renderCategoryGrid = () => {
    if (!category) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(workCategories).map(([key, projects]) => (
            <div
              key={key}
              className="group bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => navigate(`/browse-work/${key}`)}
            >
              <h2 className="text-xl font-semibold mb-4">{t(`nav.${key}`)}</h2>
              <p className="text-gray-600 mb-4">
                {language === 'ja'
                  ? `${projects.length}件の作品`
                  : `${projects.length} works`}
              </p>
              {projects.length > 0 && (
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={projects[0].image}
                    alt={key}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    const projects = workCategories[category] || [];
    const filteredProjects = projects.filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const sortedProjects = [...filteredProjects].sort((a, b) => {
      switch (sortOption) {
        case 'oldest':
          return a.id - b.id;
        case 'popular':
          return b.id - a.id;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return b.id - a.id;
      }
    });

    return (
      <>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ja' ? '作品を検索...' : 'Search works...'}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {language === 'ja' ? 'フィルター' : 'Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="latest">{language === 'ja' ? '最新順' : 'Latest'}</option>
                <option value="oldest">{language === 'ja' ? '古い順' : 'Oldest'}</option>
                <option value="popular">{language === 'ja' ? '人気順' : 'Popular'}</option>
                <option value="title">{language === 'ja' ? 'タイトル順' : 'By Title'}</option>
              </select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <ArticleCard
              key={project.id}
              article={project}
              onArticleClick={() => handleProjectClick(project)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {language === 'ja'
              ? '条件に一致する作品が見つかりませんでした。'
              : 'No works found matching your criteria.'}
          </div>
        )}
      </>
    );
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {category ? t(`nav.${category}`) : language === 'ja' ? '作品を探す' : 'Browse Work'}
        </h1>
        <p className="text-gray-600">
          {language === 'ja'
            ? 'テキスタイルデザインと研究の作品をご覧いただけます。'
            : 'Browse our textile design and research works.'}
        </p>
      </div>

      <PopularTags />
      {renderCategoryGrid()}
    </PageLayout>
  );
}