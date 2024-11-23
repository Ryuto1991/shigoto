import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

export function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
        </h1>

        <div className="prose max-w-none">
          <div className="bg-white rounded-lg shadow-md p-8">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '個人情報の取り扱いについて' : 'Personal Information Handling'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'ja'
                  ? '当社は、個人情報の重要性を認識し、適切な管理と保護に努めています。'
                  : 'We recognize the importance of personal information and strive to manage and protect it appropriately.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '収集する情報' : 'Information We Collect'}
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>{language === 'ja' ? '氏名' : 'Name'}</li>
                <li>{language === 'ja' ? 'メールアドレス' : 'Email Address'}</li>
                <li>{language === 'ja' ? '連絡先情報' : 'Contact Information'}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '情報の利用目的' : 'Purpose of Use'}
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  {language === 'ja'
                    ? 'サービスの提供および改善'
                    : 'Service Provision and Improvement'}
                </li>
                <li>
                  {language === 'ja'
                    ? 'お問い合わせへの対応'
                    : 'Response to Inquiries'}
                </li>
                <li>
                  {language === 'ja'
                    ? 'ニュースレターの配信'
                    : 'Newsletter Distribution'}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}