import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactPage() {
  const { language } = useLanguage();

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'ja' ? 'お問い合わせ' : 'Contact Us'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {language === 'ja' ? 'お問い合わせフォーム' : 'Contact Form'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ja' ? 'お名前' : 'Name'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ja' ? 'メールアドレス' : 'Email'}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ja' ? 'メッセージ' : 'Message'}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {language === 'ja' ? '送信する' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '連絡先情報' : 'Contact Information'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>+81 (0)3-1234-5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>Tokyo, Japan</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === 'ja' ? '営業時間' : 'Office Hours'}
              </h2>
              <p className="text-gray-600">
                {language === 'ja'
                  ? '月曜日〜金曜日: 9:00 - 18:00'
                  : 'Monday - Friday: 9:00 AM - 6:00 PM'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}