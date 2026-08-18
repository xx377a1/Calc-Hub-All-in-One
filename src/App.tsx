import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { AllCalculatorsPage } from './pages/AllCalculatorsPage';
import { CalculatorDetailPage } from './pages/CalculatorDetailPage';
import { InfoPage } from './pages/InfoPages';
import { SearchModal } from './components/SearchModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { HistoryDrawer } from './components/HistoryDrawer';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sync route path changes with browser history state
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Page Content according to path
  const renderContent = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={handleNavigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    if (currentPath === '/categories') {
      return <CategoriesPage onNavigate={handleNavigate} />;
    }

    if (currentPath.startsWith('/categories/')) {
      const slug = currentPath.replace('/categories/', '');
      return <CategoryDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    if (currentPath === '/calculators') {
      return <AllCalculatorsPage onNavigate={handleNavigate} />;
    }

    if (currentPath.startsWith('/calculators/')) {
      const slug = currentPath.replace('/calculators/', '');
      return <CalculatorDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    if (currentPath === '/about') {
      return <InfoPage type="about" onNavigate={handleNavigate} />;
    }

    if (currentPath === '/faq') {
      return <InfoPage type="faq" onNavigate={handleNavigate} />;
    }

    if (currentPath === '/privacy') {
      return <InfoPage type="privacy" onNavigate={handleNavigate} />;
    }

    if (currentPath === '/terms') {
      return <InfoPage type="terms" onNavigate={handleNavigate} />;
    }

    if (currentPath === '/disclaimer') {
      return <InfoPage type="disclaimer" onNavigate={handleNavigate} />;
    }

    // Default fallback to HomePage if unknown route
    return <HomePage onNavigate={handleNavigate} onOpenSearch={() => setIsSearchOpen(true)} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Page Body */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Slide-out Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCalculator={(slug) => handleNavigate(`/calculators/${slug}`)}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectCalculator={(slug) => handleNavigate(`/calculators/${slug}`)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectCalculator={(slug) => handleNavigate(`/calculators/${slug}`)}
      />

    </div>
  );
}

export default App;
