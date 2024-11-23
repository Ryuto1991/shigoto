import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from '../components/LoginModal';
import { featuredItems } from '../data/featuredItems';
import { latestEntries } from '../data/latestEntries';
import { secretArticles } from '../data/secretArticles';
import { bannerArticles } from '../data/bannerArticles';

export function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  // Combine all articles for lookup
  const allArticles = [...featuredItems, ...latestEntries, ...secretArticles, ...bannerArticles];

  const article = allArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ja' ? '記事が見つかりません' : 'Article Not Found'}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:text-blue-600"
          >
            {language === 'ja' ? '戻る' : 'Back'}
          </button>
        </div>
      </PageLayout>
    );
  }

  // Handle secret articles
  if (article.isSecret && !isAuthenticated) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {language === 'ja' ? '戻る' : 'Back'}
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold mb-4">
              {language === 'ja' ? '認証が必要です' : 'Authentication Required'}
            </h1>
            <p className="text-gray-600 mb-6">
              {language === 'ja'
                ? 'この記事を閲覧するにはログインが必要です。'
                : 'Please log in to view this article.'}
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {language === 'ja' ? 'ログイン' : 'Login'}
            </button>
          </div>

          {showLoginModal && (
            <LoginModal
              onClose={() => setShowLoginModal(false)}
              onSuccess={() => setShowLoginModal(false)}
            />
          )}
        </div>
      </PageLayout>
    );
  }

  const adminUrl = import.meta.env.VITE_WORDPRESS_ADMIN_URL || 'https://admin.chizaizukan.com/wp-admin';
  const editUrl = article.wordpressId ? `${adminUrl}/post.php?post=${article.wordpressId}&action=edit` : undefined;

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {language === 'ja' ? '戻る' : 'Back'}
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[500px] object-cover"
            />
            {editUrl && (
              <a
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full text-gray-600 hover:text-gray-900"
                title={language === 'ja' ? 'WordPressで編集' : 'Edit in WordPress'}
              >
                <ExternalLink className="w-4 h-4" />
                {language === 'ja' ? '編集' : 'Edit'}
              </a>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ja' ? '概要' : 'Overview'}
                </h2>
                <p className="text-gray-600">{article.overview}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ja' ? '特徴と効果' : 'Why It Works'}
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'ja' ? '背景' : 'Background'}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.whyItWorks.background}</p>
                  
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'ja' ? '技術詳細' : 'Technical Details'}
                  </h3>
                  <p className="text-gray-600">{article.whyItWorks.technicalDetails}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ja' ? '独自の構成' : 'Unique Composition'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'ja' ? '素材' : 'Materials'}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.uniqueComposition.materials.description}</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {article.uniqueComposition.materials.sources.map((source, index) => (
                        <li key={index}>{source}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'ja' ? 'デザインプロセス' : 'Design Process'}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.uniqueComposition.designProcess.description}</p>
                    <h4 className="font-semibold mb-2">
                      {language === 'ja' ? '課題' : 'Challenges'}
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                      {article.uniqueComposition.designProcess.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                    <p className="text-gray-600">{article.uniqueComposition.designProcess.inspiration}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ja' ? 'コラボレーション' : 'Collaboration'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'ja' ? 'パートナー' : 'Partners'}
                    </h3>
                    {article.collaboration.partners.map((partner, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-semibold">{partner.name}</h4>
                        <p className="text-gray-600">{partner.role}</p>
                        <p className="text-gray-600">{partner.contribution}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'ja' ? 'コミュニティ活動' : 'Community Engagement'}
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                      {article.collaboration.communityEngagement.events.map((event, index) => (
                        <li key={index}>{event}</li>
                      ))}
                    </ul>
                    <p className="text-gray-600">{article.collaboration.communityEngagement.impact}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ja' ? '関連産業' : 'Relevant Industries'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.relevantIndustries.map((industry, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                      <p className="text-gray-600">{industry.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ja' ? 'ギャラリー' : 'Gallery'}
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'ja' ? '技法' : 'Techniques'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {article.gallery.techniques.map((item, index) => (
                        <figure key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.caption}
                            className="w-full h-48 object-cover"
                          />
                          <figcaption className="p-4 text-gray-600 text-center">
                            {item.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'ja' ? '製造施設' : 'Factory'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {article.gallery.factory.map((item, index) => (
                        <figure key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.caption}
                            className="w-full h-48 object-cover"
                          />
                          <figcaption className="p-4 text-gray-600 text-center">
                            {item.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'ja' ? '製品' : 'Products'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {article.gallery.products.map((item, index) => (
                        <figure key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.caption}
                            className="w-full h-48 object-cover"
                          />
                          <figcaption className="p-4 text-gray-600 text-center">
                            {item.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ja' ? '追加情報' : 'Additional Information'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.additionalInfo.patents && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {language === 'ja' ? '特許' : 'Patents'}
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {article.additionalInfo.patents.map((patent, index) => (
                          <li key={index}>{patent}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'ja' ? '技法' : 'Techniques'}
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {article.additionalInfo.techniques.map((technique, index) => (
                        <li key={index}>{technique}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'ja' ? '工程' : 'Processes'}
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {article.additionalInfo.processes.map((process, index) => (
                        <li key={index}>{process}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ja' ? 'お問い合わせ' : 'Contact'}
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> {article.contact.email}
                  </p>
                  {article.contact.phone && (
                    <p className="text-gray-600 mb-2">
                      <strong>{language === 'ja' ? '電話' : 'Phone'}:</strong> {article.contact.phone}
                    </p>
                  )}
                  {article.contact.website && (
                    <p className="text-gray-600">
                      <strong>{language === 'ja' ? 'ウェブサイト' : 'Website'}:</strong>{' '}
                      <a
                        href={article.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        {article.contact.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}