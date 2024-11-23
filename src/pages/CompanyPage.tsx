import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

export function CompanyPage() {
  const { language } = useLanguage();

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'ja' ? '会社概要' : 'Company Profile'}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <table className="w-full">
            <tbody className="divide-y">
              <tr className="py-4">
                <th className="py-4 text-left w-1/3 text-gray-600">
                  {language === 'ja' ? '会社名' : 'Company Name'}
                </th>
                <td className="py-4">Work Encyclopedia Inc.</td>
              </tr>
              <tr>
                <th className="py-4 text-left text-gray-600">
                  {language === 'ja' ? '設立' : 'Established'}
                </th>
                <td className="py-4">2024</td>
              </tr>
              <tr>
                <th className="py-4 text-left text-gray-600">
                  {language === 'ja' ? '代表者' : 'Representative'}
                </th>
                <td className="py-4">Tanaka Yuki</td>
              </tr>
              <tr>
                <th className="py-4 text-left text-gray-600">
                  {language === 'ja' ? '所在地' : 'Location'}
                </th>
                <td className="py-4">Tokyo, Japan</td>
              </tr>
              <tr>
                <th className="py-4 text-left text-gray-600">
                  {language === 'ja' ? '事業内容' : 'Business Description'}
                </th>
                <td className="py-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>{language === 'ja' ? 'テキスタイルデザイン研究' : 'Textile Design Research'}</li>
                    <li>{language === 'ja' ? '持続可能な素材開発' : 'Sustainable Material Development'}</li>
                    <li>{language === 'ja' ? 'デザインコンサルティング' : 'Design Consulting'}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}