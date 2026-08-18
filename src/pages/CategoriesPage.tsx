import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculatorsData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Icon } from '../components/Icon';

interface CategoriesPageProps {
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('/') },
          { label: 'Categories' },
        ]}
      />

      <div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
          Calculator Categories ({CATEGORIES.length})
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Select a category to explore specialized calculation tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const calcsInCat = CALCULATORS.filter((c) => c.category === cat.id);
          return (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/categories/${cat.slug}`)}
              className={`p-6 rounded-2xl border transition-all hover:shadow-xl cursor-pointer group flex flex-col justify-between ${cat.bgLight}`}
            >
              <div>
                <div className={`p-3.5 rounded-2xl bg-white dark:bg-slate-900 w-fit mb-4 shadow-sm ${cat.color} group-hover:scale-110 transition-transform`}>
                  <Icon name={cat.iconName} className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Popular Calculators Preview */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Popular in {cat.name}:
                  </span>
                  {calcsInCat.slice(0, 3).map((item) => (
                    <div key={item.id} className="text-xs text-slate-700 dark:text-slate-300 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>Browse {calcsInCat.length} Calculators</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
