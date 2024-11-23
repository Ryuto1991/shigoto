import React from 'react';
import { X } from 'lucide-react';
import type { Article } from '../types/article';
import { useLanguage } from '../contexts/LanguageContext';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  const { language } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="px-6 py-4">
              <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 mb-6">
                {article.description}
              </p>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">
                  {language === 'ja' ? '関連情報' : 'Related Information'}
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>{language === 'ja' ? '出願日: 2023年10月1日' : 'Filing Date: October 1, 2023'}</li>
                  <li>{language === 'ja' ? '公開番号: JP2023-123456' : 'Publication Number: JP2023-123456'}</li>
                  <li>{language === 'ja' ? 'ステータス: 審査中' : 'Status: Under Examination'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}