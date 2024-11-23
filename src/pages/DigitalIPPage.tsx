import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { ArticleCard } from '../components/ArticleCard';
import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/article';

const digitalIPArticles: Record<string, Article[]> = {
  software: [
    {
      id: 1,
      title: 'Cloud Computing Architecture',
      description: 'Novel microservices architecture for scalable cloud applications',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      tags: ['Cloud', 'Software', 'Architecture'],
      slug: 'cloud-computing-architecture',
      wordpressId: 3001
    },
    {
      id: 2,
      title: 'Distributed Database System',
      description: 'High-performance distributed database with ACID compliance',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      tags: ['Database', 'Distributed Systems'],
      slug: 'distributed-database-system',
      wordpressId: 3002
    }
  ],
  'ai-ml': [
    {
      id: 3,
      title: 'Neural Network Optimization',
      description: 'Advanced techniques for training deep neural networks',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
      tags: ['AI', 'Machine Learning'],
      slug: 'neural-network-optimization',
      wordpressId: 3003
    },
    {
      id: 4,
      title: 'Computer Vision Algorithm',
      description: 'Real-time object detection and tracking system',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      tags: ['AI', 'Computer Vision'],
      slug: 'computer-vision-algorithm',
      wordpressId: 3004
    }
  ],
  blockchain: [
    {
      id: 5,
      title: 'Smart Contract Security',
      description: 'Novel security protocols for blockchain smart contracts',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
      tags: ['Blockchain', 'Security'],
      slug: 'smart-contract-security',
      wordpressId: 3005
    },
    {
      id: 6,
      title: 'Consensus Algorithm',
      description: 'Energy-efficient blockchain consensus mechanism',
      image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=800&q=80',
      tags: ['Blockchain', 'Consensus'],
      slug: 'consensus-algorithm',
      wordpressId: 3006
    }
  ],
  iot: [
    {
      id: 7,
      title: 'IoT Sensor Network',
      description: 'Efficient protocol for low-power IoT sensor networks',
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
      tags: ['IoT', 'Networks'],
      slug: 'iot-sensor-network',
      wordpressId: 3007
    },
    {
      id: 8,
      title: 'Smart Home System',
      description: 'Integrated IoT platform for home automation',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      tags: ['IoT', 'Smart Home'],
      slug: 'smart-home-system',
      wordpressId: 3008
    }
  ]
};

export function DigitalIPPage() {
  const { category } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  const renderCategoryGrid = () => {
    if (!category) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(digitalIPArticles).map(([key, articles]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/digital-ip/${key}`)}
            >
              <h2 className="text-xl font-semibold mb-4">{t(`nav.${key}`)}</h2>
              <p className="text-gray-600 mb-4">
                {language === 'ja'
                  ? `${articles.length}件の知財`
                  : `${articles.length} IP items`}
              </p>
              <img
                src={articles[0].image}
                alt={key}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      );
    }

    const articles = digitalIPArticles[category] || [];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onArticleClick={handleArticleClick}
          />
        ))}
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {category ? t(`nav.${category}`) : language === 'ja' ? 'デジタル知財' : 'Digital IP'}
        </h1>
        <p className="text-gray-600">
          {language === 'ja'
            ? 'デジタル技術に関する知的財産をご覧いただけます。'
            : 'Browse intellectual property related to digital technologies.'}
        </p>
      </div>

      {renderCategoryGrid()}
    </PageLayout>
  );
}