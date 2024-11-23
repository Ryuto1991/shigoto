import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { TagProvider } from './contexts/TagContext';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { BrowseWorkPage } from './pages/BrowseWorkPage';
import { AllWorksPage } from './pages/AllWorksPage';
import { ResearchPage } from './pages/ResearchPage';
import { CollaborationsPage } from './pages/CollaborationsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectPage } from './pages/ProjectPage';
import { ArticlePage } from './pages/ArticlePage';
import { CompanyPage } from './pages/CompanyPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SecretPage } from './pages/SecretPage';
import { AuthScreen } from './components/AuthScreen';
import { NewsPage } from './pages/NewsPage';

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <TagProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse-work" element={<BrowseWorkPage />} />
              <Route path="/browse-work/:category" element={<BrowseWorkPage />} />
              <Route path="/all-works" element={<AllWorksPage />} />
              <Route path="/project/:slug" element={<ProjectPage />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/collaborations" element={<CollaborationsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/company" element={<CompanyPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/secret" element={<SecretPage />} />
              <Route path="/auth" element={<AuthScreen />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          </BrowserRouter>
        </TagProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}