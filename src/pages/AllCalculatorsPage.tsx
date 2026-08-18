import React, { useState } from 'react';
import { Search, Heart, ArrowRight, X } from 'lucide-react';
import { CALCULATORS } from '../data/calculatorsData';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Icon } from '../components/Icon';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { AdSpace } from '../components/AdSpace';

interface AllCalculatorsPageProps {
  onNavigate: (path: string) => void;
}

export const AllCalculatorsPage: React.FC<AllCalculatorsPageProps> = ({ onNavigate }) => {
  const [selectedCat, setSelectedCat] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favs, setFavs] = useState<string[]>([]);

  const filtered = CALCULATORS.filter((calc) => {
    const matchesCat = selectedCat === 'all' || calc.category === selectedCat;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      calc.name.toLowerCase().includes(q) ||
      calc.description.toLowerCase().includes(q) ||
      calc.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const handleToggleFav = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavs([...favs]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('/') },
          { label: 'All Calculators' },
        ]}
      />

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
          All Calculators ({CALCULATORS.length})
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Browse our complete directory of free online calculators. Search by name or filter by category.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        
        {/* Instant Search Bar */}
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculators instantly (e.g., 'loan', 'bmi', 'integral')..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCat === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            All ({CALCULATORS.length})
          </button>

          {CATEGORIES.map((cat) => {
            const catCount = CALCULATORS.filter((c) => c.category === cat.id).length;
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.name} ({catCount})
              </button>
            );
          })}
        </div>

      </div>

      <AdSpace type="inline" />

      {/* Grid of Calculators */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="font-bold text-lg text-slate-800 dark:text-slate-200">No calculators found</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting a different category filter.</p>
          <button
            onClick={() => { setSelectedCat('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((calc) => {
            const fav = isFavorite(calc.id);
            const catObj = CATEGORIES.find((c) => c.id === calc.category);
            return (
              <div
                key={calc.id}
                onClick={() => onNavigate(`/calculators/${calc.slug}`)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                      <Icon name={calc.iconName} className="w-5 h-5" />
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {catObj && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {catObj.name}
                        </span>
                      )}
                      <button
                        onClick={(e) => handleToggleFav(e, calc.id)}
                        className="p-1 hover:text-rose-500 transition-colors text-slate-300 dark:text-slate-600"
                        title={fav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5">
                    {calc.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
