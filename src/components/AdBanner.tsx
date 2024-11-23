import React from 'react';
import { X } from 'lucide-react';

export function AdBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center min-w-0">
            <span className="flex p-2 rounded-lg bg-blue-800">
              <img
                src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=100&q=80"
                alt="Textile Design"
                className="h-6 w-6 object-cover rounded"
              />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">新しいテキスタイルデザインコース開講！</span>
              <span className="hidden md:inline">新しいテキスタイルデザインコースが開講。早期申込で20%オフ！</span>
            </p>
          </div>
          <div className="flex-shrink-0 w-full flex justify-center mt-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              詳細を見る
            </a>
          </div>
          <div className="flex-shrink-0 sm:ml-3">
            <button
              type="button"
              className="flex p-2 rounded-md hover:bg-blue-500 transition-colors focus:outline-none"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated highlight effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full animate-shimmer" />
      </div>
    </div>
  );
}