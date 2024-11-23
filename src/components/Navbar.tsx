import React, { useState } from 'react';
import { ChevronDown, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  {
    name: 'nav.browseWork',
    path: '/browse-work',
    submenu: [
      { name: 'nav.fashion', path: '/browse-work/fashion' },
      { name: 'nav.interior', path: '/browse-work/interior' },
      { name: 'nav.technical', path: '/browse-work/technical' },
      { name: 'nav.sustainable', path: '/browse-work/sustainable' }
    ]
  },
  { name: 'nav.research', path: '/research' },
  { name: 'nav.collaborations', path: '/collaborations' },
  { name: 'nav.news', path: '/news' },
  { name: 'nav.blog', path: '/blog' },
  { name: 'nav.contact', path: '/contact' },
  { name: 'nav.about', path: '/about' }
];

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleSecretClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/secret');
    }
  };

  return (
    <nav className="border-b bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 pb-2 text-sm font-medium ${
                  isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-blue-500'
                }`}
              >
                {t(item.name)}
                {item.submenu && (
                  <ChevronDown className="ml-1 w-4 h-4" />
                )}
              </Link>
              
              {item.submenu && activeMenu === item.name && (
                <div className="absolute top-full left-0 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={`block px-4 py-2 text-sm ${
                        isActive(subItem.path)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {t(subItem.name)}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={handleSecretClick}
              className="inline-flex items-center px-1 pt-1 pb-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <Lock className="w-4 h-4 mr-1" />
              {language === 'ja' ? 'シークレット' : 'Secret'}
            </button>
          </li>
          {isAuthenticated && (
            <li>
              <button
                onClick={logout}
                className="inline-flex items-center px-1 pt-1 pb-2 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                {language === 'ja' ? 'ログアウト' : 'Logout'}
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}