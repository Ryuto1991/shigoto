import React from 'react';
import { PageLayout } from '../layouts/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';
import { Download } from 'lucide-react';

interface Research {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  abstract: string;
  pdfUrl?: string;
  tags: string[];
}

const researchPapers: Research[] = [
  {
    id: 1,
    title: 'Sustainable Textile Production Methods',
    authors: ['Tanaka Yuki', 'Suzuki Akiko'],
    journal: 'Journal of Sustainable Textiles',
    year: '2024',
    abstract: 'This research explores innovative methods for sustainable textile production...',
    pdfUrl: '#',
    tags: ['Sustainability', 'Production Methods']
  },
  {
    id: 2,
    title: 'Smart Textiles in Healthcare Applications',
    authors: ['Yamamoto Ken', 'Sato Mai'],
    journal: 'Technical Textiles Research',
    year: '2023',
    abstract: 'An investigation into the applications of smart textiles in healthcare settings...',
    pdfUrl: '#',
    tags: ['Smart Textiles', 'Healthcare']
  }
];

export function ResearchPage() {
  const { language } = useLanguage();

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">
        {language === 'ja' ? '研究' : 'Research'}
      </h1>

      <div className="space-y-8">
        {researchPapers.map((paper) => (
          <div key={paper.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-2">{paper.title}</h2>
              {paper.pdfUrl && (
                <a
                  href={paper.pdfUrl}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">PDF</span>
                </a>
              )}
            </div>

            <p className="text-gray-600 mb-4">
              {paper.authors.join(', ')} • {paper.journal} • {paper.year}
            </p>

            <p className="text-gray-700 mb-4">{paper.abstract}</p>

            <div className="flex flex-wrap gap-2">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}