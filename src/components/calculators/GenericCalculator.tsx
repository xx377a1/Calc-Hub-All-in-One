import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { CalculatorMeta } from '../../types';
import { addHistoryItem } from '../../utils/history';

interface GenericCalculatorProps {
  meta: CalculatorMeta;
  onResultUpdate?: (result: string) => void;
}

export const GenericCalculator: React.FC<GenericCalculatorProps> = ({ meta, onResultUpdate }) => {
  // Configurable input parameter states
  const [val1, setVal1] = useState('100');
  const [val2, setVal2] = useState('20');
  const [val3, setVal3] = useState('5');

  const [resultText, setResultText] = useState('');

  const calculate = () => {
    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);
    const n3 = parseFloat(val3);

    if (isNaN(n1)) return;

    let res = '';
    const slug = meta.slug;

    if (slug === 'discount-calculator') {
      const discountVal = (n1 * (n2 || 0)) / 100;
      const subtotal = n1 - discountVal;
      const taxVal = (subtotal * (n3 || 0)) / 100;
      const finalPrice = subtotal + taxVal;
      res = `Final Price: $${finalPrice.toFixed(2)} | Total Saved: $${discountVal.toFixed(2)}`;
    } else if (slug === 'tip-calculator') {
      const tipAmount = (n1 * (n2 || 0)) / 100;
      const total = n1 + tipAmount;
      const perPerson = total / (n3 || 1);
      res = `Tip: $${tipAmount.toFixed(2)} | Total: $${total.toFixed(2)} | Per Person: $${perPerson.toFixed(2)}`;
    } else if (slug === 'simple-interest-calculator') {
      const interest = (n1 * (n2 || 0) * (n3 || 0)) / 100;
      const total = n1 + interest;
      res = `Interest Earned: $${interest.toFixed(2)} | Total Balance: $${total.toFixed(2)}`;
    } else if (slug === 'compound-interest-calculator') {
      // Principal n1, Rate n2%, Years n3
      const rate = (n2 || 0) / 100;
      const total = n1 * Math.pow(1 + rate / 12, 12 * (n3 || 1));
      const interest = total - n1;
      res = `Future Value: $${total.toFixed(2)} | Total Interest: $${interest.toFixed(2)}`;
    } else if (slug === 'profit-calculator' || slug === 'loss-calculator') {
      const diff = (n2 || 0) - n1;
      const pct = (diff / n1) * 100;
      const type = diff >= 0 ? 'Profit' : 'Loss';
      res = `${type}: $${Math.abs(diff).toFixed(2)} (${Math.abs(pct).toFixed(2)}%)`;
    } else if (slug === 'profit-margin-calculator') {
      // Cost n1, Selling Price n2
      if (n2 === 0) return;
      const marginPct = ((n2 - n1) / n2) * 100;
      res = `Profit Margin: ${marginPct.toFixed(2)}% | Gross Profit: $${(n2 - n1).toFixed(2)}`;
    } else if (slug === 'markup-calculator') {
      // Cost n1, Markup % n2
      const sellingPrice = n1 * (1 + (n2 || 0) / 100);
      res = `Selling Price: $${sellingPrice.toFixed(2)} | Gross Profit: $${(sellingPrice - n1).toFixed(2)}`;
    } else if (slug === 'salary-calculator' || slug === 'hourly-wage-calculator') {
      // Hourly rate n1, hours per week n2
      const annual = n1 * (n2 || 40) * 52;
      const monthly = annual / 12;
      res = `Annual Salary: $${annual.toLocaleString(undefined, { maximumFractionDigits: 2 })} | Monthly: $${monthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    } else if (slug === 'roi-calculator') {
      // Initial n1, Final n2
      const gain = (n2 || 0) - n1;
      const roi = (gain / n1) * 100;
      res = `Total Gain: $${gain.toFixed(2)} | Total ROI: ${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%`;
    } else if (slug === 'break-even-calculator') {
      // Fixed cost n1, Price per unit n2, Variable cost n3
      const margin = (n2 || 0) - (n3 || 0);
      if (margin <= 0) {
        res = 'Price per unit must be greater than variable cost per unit.';
      } else {
        const units = Math.ceil(n1 / margin);
        const revenue = units * n2;
        res = `Break-Even Quantity: ${units.toLocaleString()} Units ($${revenue.toLocaleString()} Revenue)`;
      }
    } else if (slug === 'average-calculator') {
      // Average of values
      res = `Mean Average: ${((n1 + (n2 || 0) + (n3 || 0)) / (n3 ? 3 : n2 ? 2 : 1)).toFixed(2)}`;
    } else if (slug === 'ratio-calculator') {
      // A:B = C:D find missing D = (B * C) / A
      if (n1 === 0) return;
      const d = ((n2 || 0) * (n3 || 0)) / n1;
      res = `Missing Value D = ${parseFloat(d.toFixed(4))} (Ratio ${n1}:${n2} = ${n3}:${d.toFixed(2)})`;
    } else if (slug === 'quadratic-equation-calculator') {
      // ax² + bx + c = 0
      const disc = n2 * n2 - 4 * n1 * n3;
      if (disc > 0) {
        const x1 = (-n2 + Math.sqrt(disc)) / (2 * n1);
        const x2 = (-n2 - Math.sqrt(disc)) / (2 * n1);
        res = `Two Real Roots: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)} (Discriminant Δ = ${disc})`;
      } else if (disc === 0) {
        const x = -n2 / (2 * n1);
        res = `Single Real Root: x = ${x.toFixed(4)} (Discriminant Δ = 0)`;
      } else {
        res = `Complex Roots: Discriminant Δ = ${disc} (No real roots)`;
      }
    } else if (slug === 'area-calculator') {
      // Length n1, Width n2
      res = `Area: ${(n1 * (n2 || n1)).toFixed(2)} sq units`;
    } else if (slug === 'volume-calculator') {
      // L n1, W n2, H n3
      res = `Volume: ${(n1 * (n2 || 1) * (n3 || 1)).toFixed(2)} cubic units`;
    } else {
      // Fallback mathematical formula evaluation
      const product = n1 * (n2 || 1) * (n3 || 1);
      res = `Calculated Result = ${parseFloat(product.toFixed(4))}`;
    }

    setResultText(res);
    onResultUpdate?.(res);

    addHistoryItem({
      calculatorId: meta.id,
      calculatorName: meta.name,
      calculatorSlug: meta.slug,
      inputSummary: `${val1}${val2 ? ', ' + val2 : ''}${val3 ? ', ' + val3 : ''}`,
      resultSummary: res,
    });
  };

  useEffect(() => {
    calculate();
  }, [val1, val2, val3, meta.slug]);

  const handleReset = () => {
    setVal1('100');
    setVal2('20');
    setVal3('5');
  };

  return (
    <div className="max-w-xl mx-auto">
      
      {/* Parameter Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Primary Value (X)
          </label>
          <input
            type="number"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Secondary Parameter (Y)
          </label>
          <input
            type="number"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Tertiary Option (Z)
          </label>
          <input
            type="number"
            value={val3}
            onChange={(e) => setVal3(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Inputs</span>
        </button>
      </div>

      {/* Result Display Box */}
      {resultText && (
        <div className="p-6 rounded-2xl bg-indigo-600 text-white text-center shadow-xl">
          <span className="text-xs font-bold uppercase tracking-wider opacity-80 block mb-1">
            Calculated Output
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight leading-relaxed">
            {resultText}
          </div>
        </div>
      )}

    </div>
  );
};
