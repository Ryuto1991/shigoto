import React, { createContext, useContext, useState } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ja: {
    'site.title': '仕事図鑑',
    'nav.browseWork': '作品を探す',
    'nav.fashion': 'ファッション',
    'nav.interior': 'インテリア',
    'nav.technical': 'テクニカル',
    'nav.sustainable': 'サステナブル',
    'nav.research': '研究',
    'nav.collaborations': 'コラボレーション',
    'nav.news': 'ニュース',
    'nav.blog': 'ブログ',
    'nav.contact': 'お問い合わせ',
    'nav.about': '私たちについて',
    'search.placeholder': '作品、研究を検索...',
    'newsletter.button': 'ニュースレター',
    'featured.title': '注目の作品',
    'tags.title': '人気のタグ',
    'news.title': 'ニュース',
    'footer.about': '仕事図鑑は、テキスタイルデザインと研究の世界を探索するためのプラットフォームです。',
    'footer.newsletter': '最新のニュースを受け取る',
    'footer.email': 'メールアドレスを入力',
    'footer.quickLinks': 'クイックリンク',
    'footer.company': '会社概要',
    'footer.contact': 'お問い合わせ',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
    'footer.rights': '© 2024 仕事図鑑. All rights reserved.'
  },
  en: {
    'site.title': 'Work Encyclopedia',
    'nav.browseWork': 'Browse Work',
    'nav.fashion': 'Fashion',
    'nav.interior': 'Interior',
    'nav.technical': 'Technical',
    'nav.sustainable': 'Sustainable',
    'nav.research': 'Research',
    'nav.collaborations': 'Collaborations',
    'nav.news': 'News',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'search.placeholder': 'Search works, research...',
    'newsletter.button': 'Newsletter',
    'featured.title': 'Featured Work',
    'tags.title': 'Popular Tags',
    'news.title': 'News',
    'footer.about': 'Work Encyclopedia is a platform for exploring the world of textile design and research.',
    'footer.newsletter': 'Stay updated with the latest news',
    'footer.email': 'Enter your email',
    'footer.quickLinks': 'Quick Links',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': '© 2024 Work Encyclopedia. All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}