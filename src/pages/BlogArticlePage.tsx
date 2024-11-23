import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { blogPosts } from './BlogPage';
import ReactMarkdown from 'react-markdown';

export function BlogArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ja' ? '記事が見つかりません' : 'Article Not Found'}
          </h1>
          <button
            onClick={() => navigate('/blog')}
            className="text-blue-500 hover:text-blue-600"
          >
            {language === 'ja' ? 'ブログ一覧に戻る' : 'Back to Blog'}
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <article className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {language === 'ja' ? 'ブログ一覧に戻る' : 'Back to Blog'}
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose max-w-none">
              <ReactMarkdown>{post.content || post.excerpt}</ReactMarkdown>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}