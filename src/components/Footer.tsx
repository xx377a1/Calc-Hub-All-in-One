import React from 'react';
import { Calculator, Heart, Shield, FileText, HelpCircle, MapPin } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                Calc<span className="text-indigo-400">Hub</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              CalcHub provides fast, free, accurate online calculators for everyday math, finance, health, unit conversions, and date calculations. Designed for simplicity on desktop, tablet, and mobile.
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center space-x-1">
              <span>Made with care for precision & speed</span>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/categories/${cat.slug}`)}
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-left"
                  >
                    {cat.name} Calculators
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('/categories')}
                  className="text-indigo-400 font-semibold hover:underline text-left text-xs"
                >
                  View All Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/calculators')} className="text-slate-400 hover:text-indigo-400 transition-colors">
                  All Calculators Grid
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="text-slate-400 hover:text-indigo-400 transition-colors">
                  About CalcHub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faq')} className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/sitemap')} className="text-slate-400 hover:text-indigo-400 transition-colors">
                  XML Sitemap
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">
              Legal & Info
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/disclaimer')} className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Notice Banner */}
        <div className="py-6 border-b border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> All calculations, results, and conversions on CalcHub are provided for general educational and informational purposes only. Health calculations (BMI, BMR, calories) are estimates and do not constitute medical advice. Financial calculations (loans, interest, mortgages) are estimates and actual bank offers may vary.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-4 sm:space-y-0">
          <p>© 2026 CalcHub. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-slate-300 transition-colors">Privacy</button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-slate-300 transition-colors">Terms</button>
            <button onClick={() => onNavigate('/disclaimer')} className="hover:text-slate-300 transition-colors">Disclaimer</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
