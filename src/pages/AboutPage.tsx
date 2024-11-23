import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutPage() {
  const { language } = useLanguage();

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'ja' ? '知財図鑑について' : 'About IP Encyclopedia'}
        </h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            {language === 'ja'
              ? '知財図鑑は、知的財産の世界をより分かりやすく、アクセスしやすいものにすることを目指しています。'
              : 'IP Encyclopedia aims to make the world of intellectual property more accessible and understandable.'}
          </p>

          <h2 className="text-xl font-semibold mb-4">
            {language === 'ja' ? 'ミッション' : 'Our Mission'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'ja'
              ? '革新的なアイデアと知的財産の保護の重要性を広め、より良い未来の創造に貢献します。'
              : 'We contribute to creating a better future by spreading awareness about innovative ideas and the importance of intellectual property protection.'}
          </p>

          <h2 className="text-xl font-semibold mb-4">
            {language === 'ja' ? '特徴' : 'Features'}
          </h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>{language === 'ja' ? '最新の知財情報' : 'Latest IP Information'}</li>
            <li>{language === 'ja' ? '事例研究' : 'Case Studies'}</li>
            <li>{language === 'ja' ? '専門家の見解' : 'Expert Insights'}</li>
            <li>{language === 'ja' ? '業界動向' : 'Industry Trends'}</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">
            {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
          </h2>
          <p className="text-gray-600">
            {language === 'ja'
              ? 'ご質問やフィードバックがございましたら、お気軽にお問い合わせください。'
              : 'If you have any questions or feedback, please feel free to contact us.'}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}