import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  const { language } = useLanguage();

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(i);
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={language === 'ja' ? '前のページ' : 'Previous page'}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {renderPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-4 py-2">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={language === 'ja' ? '次のページ' : 'Next page'}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}