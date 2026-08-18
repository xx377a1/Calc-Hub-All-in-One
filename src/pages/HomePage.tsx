import React, { useState } from 'react';
import {
  Search,
  Zap,
  Shield,
  Smartphone,
  Sparkles,
  ArrowRight,
  Heart,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculatorsData';
import { Icon } from '../components/Icon';
import { AdSpace } from '../components/AdSpace';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

const POPULAR_BUTTONS = [
  { name: 'Percentage Calculator', slug: 'percentage-calculator' },
  { name: 'Age Calculator', slug: 'age-calculator' },
  { name: 'BMI Calculator', slug: 'bmi-calculator' },
  { name: 'Loan Calculator', slug: 'loan-calculator' },
  { name: 'EMI Calculator', slug: 'emi-calculator' },
  { name: 'Scientific Calculator', slug: 'scientific-calculator' },
  { name: 'Currency Converter', slug: 'currency-converter' },
  { name: 'Discount Calculator', slug: 'discount-calculator' },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const [heroQuery, setHeroQuery] = useState('');

  const featuredCalcs = CALCULATORS.filter((c) => c.featured || c.popular).slice(0, 8);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch();
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-950 pt-12 pb-16 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 border border-indigo-200 dark:border-indigo-800 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Fast, Free, Accurate & Account-Free Calculators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            All Your Calculators in <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">One Place</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Fast, free, simple calculators for everyday math, finance, health, conversions, date & time, and more.
          </p>

          {/* Large Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <form
              onSubmit={handleHeroSearchSubmit}
              onClick={onOpenSearch}
              className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 cursor-pointer group hover:border-indigo-500 transition-all"
            >
              <Search className="w-5 h-5 text-slate-400 ml-3 mr-3 shrink-0 group-hover:text-indigo-600 transition-colors" />
              <input
                type="text"
                readOnly
                placeholder="Search calculators (e.g. 'percentage', 'loan', 'bmi', 'currency')..."
                className="w-full bg-transparent text-slate-900 dark:text-white text-sm sm:text-base outline-none cursor-pointer placeholder-slate-400"
              />
              <button
                type="button"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-colors shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* Popular Calculators Chips */}
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Popular Calculators
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {POPULAR_BUTTONS.map((btn) => (
                <button
                  key={btn.slug}
                  onClick={() => onNavigate(`/calculators/${btn.slug}`)}
                  className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-2xs transition-all"
                >
                  {btn.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSpace type="banner" />
      </div>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Explore Calculator Categories
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Organized tools designed for precision and quick results.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="mt-3 sm:mt-0 flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const count = CALCULATORS.filter((c) => c.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(`/categories/${cat.slug}`)}
                className={`p-5 rounded-2xl border transition-all hover:shadow-lg cursor-pointer group flex flex-col justify-between ${cat.bgLight}`}
              >
                <div>
                  <div className={`p-3 rounded-xl bg-white dark:bg-slate-900 w-fit mb-3 shadow-xs ${cat.color} group-hover:scale-110 transition-transform`}>
                    <Icon name={cat.iconName} className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>{count} Calculators</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Calculators Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Featured Calculators
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Most frequently used tools by thousands of daily users.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/calculators')}
            className="flex items-center space-x-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>All Calculators Grid</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {featuredCalcs.map((calc) => (
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
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {calc.category}
                  </span>
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
          ))}
        </div>
      </section>

      {/* Why Use CalcHub? Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
            Why Use CalcHub?
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-12">
            Designed to deliver effortless calculations without popups, paywalls, or complicated setup.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-left">
              <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl w-fit mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">100% Free</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Use all calculators as much as you need without paying fees or creating an account.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-left">
              <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl w-fit mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">Instant Results</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get real-time answers as you type with high-precision math routines executed locally.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-left">
              <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl w-fit mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">Easy to Use</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean, uncluttered SaaS interfaces designed for clarity with step-by-step formulas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-left">
              <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl w-fit mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">Mobile Friendly</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responsive layouts optimized for touch screens on Android, iPhone, iPad, and Desktop.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* General FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Common questions about using CalcHub online calculators.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Are all calculators on CalcHub completely free?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes! All 70+ calculators on CalcHub are 100% free to use with no hidden fees, limits, or subscriptions required.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Do I need to register or create an account?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No registration or personal login is required. Your favorites and recent calculation history are securely stored right in your browser's local storage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Can I use CalcHub on mobile phones and tablets?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Absolutely. CalcHub is designed with mobile-first responsive touch targets for seamless operation on smartphones and tablets.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Are the calculations accurate?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes. All calculators execute verified mathematical formulas with floating-point precision handling.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
