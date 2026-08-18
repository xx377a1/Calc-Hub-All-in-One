import React from 'react';

interface AdSpaceProps {
  type?: 'banner' | 'sidebar' | 'inline' | 'footer';
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ type = 'inline', className = '' }) => {
  return (
    <div
      className={`relative my-6 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/40 text-center select-none overflow-hidden ${className}`}
    >
      <div className="flex flex-col items-center justify-center py-3">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-1">
          Advertisement
        </span>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm">
          {type === 'banner' && 'Responsive Top Header Ad Banner (728x90 / 320x100)'}
          {type === 'sidebar' && 'Sidebar Unit (300x250 Medium Rectangle)'}
          {type === 'inline' && 'In-Content Ad Display Space'}
          {type === 'footer' && 'Footer Responsive Ad Unit'}
        </div>
      </div>
    </div>
  );
};
