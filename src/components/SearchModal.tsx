import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Heart } from 'lucide-react';
import { CALCULATORS } from '../data/calculatorsData';
import { CATEGORIES } from '../data/categories';
import { Icon } from './Icon';
import { isFavorite, toggleFavorite } from '../utils/favorites';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectCalculator }) => {
  const [query, setQuery] = useState('');
  const [favs, setFavs] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = CALCULATORS.filter((calc) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      calc.name.toLowerCase().includes(q) ||
      calc.description.toLowerCase().includes(q) ||
      calc.tags.some((t) => t.toLowerCase().includes(q)) ||
      calc.category.toLowerCase().includes(q)
    );
  });

  const handleToggleFav = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavs([...favs]); // trigger force re-render
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 70+ calculators (e.g. 'bmi', 'loan', 'percentage')..."
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm sm:text-base outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-lg text-xs font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No calculators found for "{query}"</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try searching for keywords like math, interest, date, or bmi.</p>
            </div>
          ) : (
            filtered.map((calc) => {
              const cat = CATEGORIES.find((c) => c.id === calc.category);
              const fav = isFavorite(calc.id);
              return (
                <div
                  key={calc.id}
                  onClick={() => {
                    onSelectCalculator(calc.slug);
                    onClose();
                  }}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 cursor-pointer transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800/50"
                >
                  <div className="flex items-center space-x-3 min-w-0 pr-2">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                      <Icon name={calc.iconName} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {calc.name}
                        </span>
                        {cat && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {cat.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {calc.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={(e) => handleToggleFav(e, calc.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-rose-500 transition-colors"
                      title={fav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{filtered.length} calculators available</span>
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">Ctrl+K</kbd> anywhere</span>
        </div>

      </div>
    </div>
  );
};
