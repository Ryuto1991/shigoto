import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
      className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50"
    >
      {language === 'ja' ? 'EN' : '日本語'}
    </button>
  );
}

export default LanguageSwitch;