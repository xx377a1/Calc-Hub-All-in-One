import React, { useState, useEffect } from 'react';
import { Heart, X, ArrowRight, Trash2 } from 'lucide-react';
import { getFavorites, toggleFavorite } from '../utils/favorites';
import { CALCULATORS } from '../data/calculatorsData';
import { Icon } from './Icon';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (slug: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose, onSelectCalculator }) => {
  const [favIds, setFavIds] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setFavIds(getFavorites());
    update();
    window.addEventListener('calchub_favorites_updated', update);
    return () => window.removeEventListener('calchub_favorites_updated', update);
  }, [isOpen]);

  if (!isOpen) return null;

  const favoriteCalcs = CALCULATORS.filter((c) => favIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Favorite Calculators ({favoriteCalcs.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {favoriteCalcs.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3 stroke-1" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No Favorites Saved Yet</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                Click the heart icon on any calculator card to save it here for instant one-click access.
              </p>
            </div>
          ) : (
            favoriteCalcs.map((calc) => (
              <div
                key={calc.id}
                onClick={() => {
                  onSelectCalculator(calc.slug);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs shrink-0">
                    <Icon name={calc.iconName} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {calc.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {calc.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(calc.id);
                    }}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
