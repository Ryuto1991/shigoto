import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

export function TermsPage() {
  const { language } = useLanguage();

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'ja' ? '利用規約' : 'Terms of Service'}
        </h1>

        <div className="prose max-w-none">
          <div className="bg-white rounded-lg shadow-md p-8">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '第1条（適用）' : 'Article 1 (Application)'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'ja'
                  ? 'この利用規約は、当社が提供するすべてのサービスの利用に適用されます。'
                  : 'These Terms of Service apply to all services provided by our company.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '第2条（禁止事項）' : 'Article 2 (Prohibited Actions)'}
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  {language === 'ja'
                    ? '著作権、商標権などの知的財産権を侵害する行為'
                    : 'Actions that infringe intellectual property rights'}
                </li>
                <li>
                  {language === 'ja'
                    ? '他のユーザーに害を及ぼす行為'
                    : 'Actions that harm other users'}
                </li>
                <li>
                  {language === 'ja'
                    ? '法令に違反する行為'
                    : 'Actions that violate laws and regulations'}
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '第3条（免責事項）' : 'Article 3 (Disclaimer)'}
              </h2>
              <p className="text-gray-600">
                {language === 'ja'
                  ? '当社は、提供するサービスの完全性、正確性、有用性等について、いかなる保証も行いません。'
                  : 'We make no warranties regarding the completeness, accuracy, usefulness, etc. of the services provided.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}