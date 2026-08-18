import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto whitespace-nowrap pb-1">
      <button
        onClick={items[0]?.onClick}
        className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 py-0.5"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </button>

      {items.slice(1).map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 dark:text-slate-600 shrink-0" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-1 py-0.5"
            >
              {item.label}
            </button>
          ) : (
            <span className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[200px] sm:max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
