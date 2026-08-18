import React, { useState, useEffect } from 'react';
import { History, X, Trash2, Copy, Check, ArrowRight } from 'lucide-react';
import { getHistory, clearHistory } from '../utils/history';
import { HistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (slug: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose, onSelectCalculator }) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setHistoryItems(getHistory());
    update();
    window.addEventListener('calchub_history_updated', update);
    return () => window.removeEventListener('calchub_history_updated', update);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Calculation History
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {historyItems.length > 0 && (
              <button
                onClick={() => clearHistory()}
                className="flex items-center text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-2 py-1 rounded-lg transition-colors"
                title="Clear all history"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {historyItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <History className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3 stroke-1" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No Calculations Yet</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                Perform calculations on any calculator to automatically save your input and result records here locally.
              </p>
            </div>
          ) : (
            historyItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectCalculator(item.calculatorSlug);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-indigo-600 dark:text-indigo-400 group-hover:underline">
                    {item.calculatorName}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 font-mono mb-1 truncate">
                  Input: {item.inputSummary}
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/50">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono truncate mr-2">
                    {item.resultSummary}
                  </span>
                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={(e) => handleCopy(e, item.resultSummary, item.id)}
                      className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                      title="Copy result"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
