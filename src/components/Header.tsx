import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Search,
  Moon,
  Sun,
  Heart,
  History,
  Menu,
  X,
  Grid,
  ChevronRight,
  Info
} from 'lucide-react';
import { getFavorites } from '../utils/favorites';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenFavorites,
  onOpenHistory,
}) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('calchub_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [favCount, setFavCount] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('calchub_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('calchub_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const updateCount = () => setFavCount(getFavorites().length);
    updateCount();
    window.addEventListener('calchub_favorites_updated', updateCount);
    return () => window.removeEventListener('calchub_favorites_updated', updateCount);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Categories', path: '/categories' },
    { label: 'All Calculators', path: '/calculators' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center space-x-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1 group"
            >
              <div className="p-2 bg-gradient-to-tr from-indigo-600 to-blue-500 text-white rounded-xl shadow-md group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
                  Calc<span className="text-indigo-600 dark:text-indigo-400">Hub</span>
                </span>
                <span className="block text-[10px] font-medium text-slate-400 -mt-1 tracking-wider uppercase">
                  All-in-One
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 ml-6 pl-6 border-l border-slate-200 dark:border-slate-800">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 px-3 py-1.5 rounded-xl transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
              title="Search calculators (Ctrl+K)"
            >
              <Search className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline text-xs font-medium">Search...</span>
              <kbd className="hidden md:inline-block ml-3 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400 shadow-2xs">
                Ctrl K
              </kbd>
            </button>

            {/* History Drawer Trigger */}
            <button
              onClick={onOpenHistory}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Recent Calculations History"
            >
              <History className="w-5 h-5" />
            </button>

            {/* Favorites Drawer Trigger */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Favorite Calculators"
            >
              <Heart className="w-5 h-5 text-rose-500" />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favCount}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                currentPath === link.path
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2 text-xs text-slate-500">
            <span>70+ Free Online Calculators</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">CalcHub v2026</span>
          </div>
        </div>
      )}
    </header>
  );
};
