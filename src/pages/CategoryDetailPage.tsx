import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculatorsData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Icon } from '../components/Icon';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { CategoryId } from '../types';

interface CategoryDetailPageProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ categorySlug, onNavigate }) => {
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const calcs = CALCULATORS.filter((c) => c.category === (category?.id as CategoryId));

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Category Not Found</h2>
        <button
          onClick={() => onNavigate('/categories')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
        >
          Back to All Categories
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('/') },
          { label: 'Categories', onClick: () => onNavigate('/categories') },
          { label: category.name },
        ]}
      />

      {/* Category Header Banner */}
      <div className={`p-8 rounded-3xl border ${category.bgLight} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}>
        <div className="flex items-start space-x-4">
          <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-md ${category.color} shrink-0`}>
            <Icon name={category.iconName} className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
              {category.name} Calculators
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xs text-xs font-bold text-slate-700 dark:text-slate-200 shrink-0">
          {calcs.length} Calculators Available
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {calcs.map((calc) => {
          const fav = isFavorite(calc.id);
          return (
            <div
              key={calc.id}
              onClick={() => onNavigate(`/calculators/${calc.slug}`)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon name={calc.iconName} className="w-5 h-5" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(calc.id);
                    }}
                    className="p-1 text-slate-300 dark:text-slate-600 hover:text-rose-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
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

    </div>
  );
};
