import React, { useState, useEffect } from 'react';
import { Heart, Share2, Copy, Check, Info, HelpCircle, ArrowRight, Download, FileText } from 'lucide-react';
import { CalculatorMeta } from '../types';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculatorsData';
import { Breadcrumbs } from './Breadcrumbs';
import { Icon } from './Icon';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { AdSpace } from './AdSpace';
import { generateCalculatorPDF } from '../utils/pdfExport';

export interface CalculatorPDFExportData {
  inputs: Array<{ label: string; value: string }>;
  results: Array<{ label: string; value: string; isHighlight?: boolean }>;
}

interface CalculatorWrapperProps {
  meta: CalculatorMeta;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
  resultSummaryForCopy?: string;
  pdfData?: CalculatorPDFExportData;
}

export const CalculatorWrapper: React.FC<CalculatorWrapperProps> = ({
  meta,
  onNavigate,
  children,
  resultSummaryForCopy,
  pdfData,
}) => {
  const [fav, setFav] = useState(() => isFavorite(meta.id));
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    setFav(isFavorite(meta.id));
  }, [meta.id]);

  const categoryObj = CATEGORIES.find((c) => c.id === meta.category);

  const handleToggleFav = () => {
    const isNowFav = toggleFavorite(meta.id);
    setFav(isNowFav);
  };

  const handleCopyResult = () => {
    if (resultSummaryForCopy) {
      navigator.clipboard.writeText(resultSummaryForCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${meta.name} - CalcHub`,
      text: meta.description,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    const inputsToUse = pdfData?.inputs || [
      { label: 'Calculator Name', value: meta.name },
      { label: 'Category', value: categoryObj?.name || meta.category },
    ];

    const resultsToUse = pdfData?.results || [
      {
        label: 'Calculation Result',
        value: resultSummaryForCopy || 'Summary Available',
        isHighlight: true,
      },
    ];

    generateCalculatorPDF({
      calculatorName: meta.name,
      categoryName: categoryObj?.name || meta.category,
      inputs: inputsToUse,
      results: resultsToUse,
      formula: meta.formula,
    });
  };

  // Related calculators in same category
  const relatedCalcs = CALCULATORS.filter(
    (c) => c.category === meta.category && c.id !== meta.id
  ).slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('/') },
          { label: 'Categories', onClick: () => onNavigate('/categories') },
          {
            label: categoryObj?.name || meta.category,
            onClick: () => onNavigate(`/categories/${meta.category}`),
          },
          { label: meta.name },
        ]}
      />

      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md shrink-0">
            <Icon name={meta.iconName} className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                {meta.name}
              </h1>
              {categoryObj && (
                <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {categoryObj.name}
                </span>
              )}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
              {meta.description}
            </p>
          </div>
        </div>

        {/* Favorite, PDF & Share Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 transition-all shadow-2xs"
            title="Download calculation report as PDF"
          >
            <Download className="w-4 h-4" />
            <span>PDF Report</span>
          </button>

          <button
            onClick={handleToggleFav}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              fav
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{fav ? 'Saved' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
            title="Share page link"
          >
            <Share2 className="w-4 h-4" />
            <span>{shared ? 'Copied Link!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Calculator Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 mb-8">
        {children}

        {/* Copy Result & PDF Download Bar if result is available */}
        {resultSummaryForCopy && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-indigo-50/50 dark:bg-indigo-950/30 p-3.5 rounded-xl">
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Result Summary: <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{resultSummaryForCopy}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyResult}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-2xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Result'}</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Top Banner Ad Space */}
      <AdSpace type="inline" />

      {/* Health / Financial Disclaimer Notice if applicable */}
      {meta.category === 'health' && (
        <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs leading-relaxed flex items-start space-x-2.5">
          <Info className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <strong>Medical Notice:</strong> Results produced by health calculators are estimates intended solely for informational and educational purposes. They do not constitute professional medical advice or diagnosis. Always consult a licensed healthcare provider before starting any dietary or physical exercise program.
          </div>
        </div>
      )}

      {meta.category === 'finance' && (
        <div className="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-300 text-xs leading-relaxed flex items-start space-x-2.5">
          <Info className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <strong>Financial Disclaimer:</strong> Financial figures, interest projections, and payment schedules are calculations based on standard compounding formulas. Actual bank rates, taxes, insurance premiums, and loan fees may vary depending on individual lender terms.
          </div>
        </div>
      )}

      {/* Explanation Section */}
      <div className="space-y-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        
        {/* How It Works & Formula */}
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
            How the {meta.name} Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
            This calculator processes your parameters instantly using standard mathematical formulas. All calculations are executed locally in real-time.
          </p>

          {meta.formula && (
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Mathematical Formula
              </span>
              <code className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {meta.formula}
              </code>
            </div>
          )}
        </div>

        {/* Example Calculation */}
        {meta.example && (
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Step-by-Step Example Calculation
            </h3>
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 space-y-2 text-sm">
              <p><strong className="text-slate-900 dark:text-slate-100">Input:</strong> <span className="font-mono text-slate-700 dark:text-slate-300">{meta.example.input}</span></p>
              <p><strong className="text-slate-900 dark:text-slate-100">Output Result:</strong> <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{meta.example.output}</span></p>
              <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-indigo-200/50 dark:border-indigo-900/50">
                {meta.example.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Calculator Specific FAQs */}
        {meta.faq && meta.faq.length > 0 && (
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {meta.faq.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                    {item.question}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Related Calculators in Same Category */}
      {relatedCalcs.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-4">
            Related {categoryObj?.name} Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedCalcs.map((calc) => (
              <button
                key={calc.id}
                onClick={() => onNavigate(`/calculators/${calc.slug}`)}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-left transition-all hover:shadow-md group"
              >
                <div className="flex items-center space-x-2.5 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon name={calc.iconName} className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {calc.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {calc.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
