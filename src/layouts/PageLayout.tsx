import React from 'react';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AdBanner } from '../components/AdBanner';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AdBanner />
      <Header />
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}