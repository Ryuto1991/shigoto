import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  tags: string[];
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Sustainable Textiles',
    author: 'Tanaka Yuki',
    date: '2024-03-15',
    excerpt: 'Exploring innovative approaches to sustainable textile production...',
    content: `
      持続可能なテキスタイル製造の未来について探求します。環境に配慮した生産方法や、
      新しい素材開発の可能性について詳しく解説していきます。

      ## 持続可能な製造プロセス

      現在の textile 産業が直面している環境課題と、その解決に向けた革新的なアプローチを紹介します。
      
      - 水使用量の削減
      - エネルギー効率の改善
      - 廃棄物の削減

      ## 新素材の開発

      環境負荷を低減する新しい素材開発の最前線をお伝えします。
      
      - 生分解性素材
      - リサイクル素材
      - 天然素材の新しい活用法
    `,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    tags: ['Sustainability', 'Innovation'],
    slug: 'future-of-sustainable-textiles'
  },
  {
    id: 2,
    title: 'Smart Textiles in Healthcare',
    author: 'Suzuki Akiko',
    date: '2024-03-10',
    excerpt: 'How smart textiles are revolutionizing healthcare applications...',
    content: `
      医療分野におけるスマートテキスタイルの革新的な応用について解説します。
      
      ## 医療モニタリング

      - バイタルサイン監視
      - 姿勢分析
      - 睡眠品質の追跡
      
      ## リハビリテーション支援

      - 運動フィードバック
      - 筋活動モニタリング
      - 治療進捗の記録
    `,
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
    tags: ['Healthcare', 'Smart Textiles'],
    slug: 'smart-textiles-healthcare'
  }
];

export function BlogPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">
        {language === 'ja' ? 'ブログ' : 'Blog'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handlePostClick(post.slug)}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}