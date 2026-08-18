import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Calculator, Shield, HelpCircle, CheckCircle, FileText, Lock, RefreshCw, Zap } from 'lucide-react';

interface InfoPageProps {
  onNavigate: (path: string) => void;
  type: 'about' | 'faq' | 'privacy' | 'terms' | 'disclaimer';
}

export const InfoPage: React.FC<InfoPageProps> = ({ onNavigate, type }) => {
  const titles = {
    about: 'About CalcHub',
    faq: 'Frequently Asked Questions',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    disclaimer: 'Disclaimer & Medical / Financial Disclosure',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('/') },
          { label: titles[type] },
        ]}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        
        {type === 'about' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-md">
                <Calculator className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
                  About CalcHub
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Fast, Free, Precise Calculators for Everyday Life
                </p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              CalcHub was built with a simple mission: to make everyday calculations fast, intuitive, accurate, and completely free for everyone. Whether you're calculating mortgage payments, checking your BMI, solving trigonometric equations, converting currency rates, or planning age milestones, CalcHub brings all essential calculators under one clean roof.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
                <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Instant Results</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Real-time client-side calculation engine updates results instantly as you type numbers without page reloads.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
                <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">100% Private</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  No sign-up or accounts required. Your calculation inputs and values never leave your web browser.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50">
                <RefreshCw className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">70+ Calculators</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Comprehensive suites across Finance, Health, Fitness, Mathematics, Physics, Dates, Construction & Conversion.
                </p>
              </div>
            </div>
          </div>
        )}

        {type === 'faq' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
              Frequently Asked Questions
            </h1>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Is CalcHub completely free to use?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Yes, 100% free. Every single calculator on CalcHub can be used unlimited times without subscription, sign-up, or fees.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Do I need an account to save my calculations?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  No account needed! Your recent calculations and favorite calculators are saved locally in your web browser storage for quick access.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Are the currency conversion rates updated?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Yes, currency rates are continuously synchronized with major global forex exchange reference feeds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">How do I share a calculation result?</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Click the "Copy Result" or "Share" button at the bottom of any calculator to instantly copy a formatted summary or page link to your clipboard.
                </p>
              </div>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
              Privacy Policy
            </h1>
            <p><strong>Last Updated:</strong> January 2026</p>
            <p>At CalcHub, accessible from calchub.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by CalcHub and how we use it.</p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">1. No Personal Data Collection</h3>
            <p>CalcHub does not require registration or account login. We do not collect names, email addresses, phone numbers, or credit card details.</p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">2. Local Storage Usage</h3>
            <p>Calculations, favorites, and theme preferences (light/dark mode) are stored strictly inside your own device's browser local storage (`localStorage`). We cannot access or view your stored calculations.</p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">3. Log Files & Analytics</h3>
            <p>Like most standard websites, CalcHub utilizes basic browser log files (IP address, browser type, date/time stamp) solely for security maintenance and server performance monitoring.</p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
              Terms of Use
            </h1>
            <p>By accessing and using CalcHub, you accept and agree to be bound by the terms and provisions of this agreement.</p>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">1. Permitted Use</h3>
            <p>CalcHub provides free online tools for personal, academic, and business calculation convenience. You agree not to attempt to breach or compromise the security of the application.</p>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">2. Accuracy & Warranty Disclaimer</h3>
            <p>While we make every effort to verify calculation algorithms and formulas, CalcHub makes no warranties regarding absolute mathematical precision or suitabilities for critical legal or financial decisions.</p>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="space-y-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
              Disclaimer & Disclosures
            </h1>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300">
              <h3 className="font-bold text-base mb-1">Medical & Health Disclaimer</h3>
              <p className="text-xs leading-relaxed">
                All health, fitness, BMI, BMR, and nutritional calculators on CalcHub are for educational estimation purposes only. They are not intended as substitutes for clinical medical advice, diagnosis, or treatment. Always consult a qualified medical professional before undertaking weight loss or fitness regimens.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-300">
              <h3 className="font-bold text-base mb-1">Financial Disclaimer</h3>
              <p className="text-xs leading-relaxed">
                Loan, interest, mortgage, and investment calculators present mathematical models based on user inputs. They do not represent official loan commitments, banking rates, or tax advice. Consult a certified financial advisor or official bank officer prior to executing financial contracts.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
