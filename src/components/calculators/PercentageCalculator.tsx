import React, { useState, useEffect } from 'react';
import { RotateCcw, Percent } from 'lucide-react';
import { addHistoryItem } from '../../utils/history';

interface PercentageCalculatorProps {
  onResultUpdate?: (result: string) => void;
}

export const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({ onResultUpdate }) => {
  const [mode, setMode] = useState<'of' | 'is_what' | 'change'>('of');
  const [val1, setVal1] = useState('15');
  const [val2, setVal2] = useState('200');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const x = parseFloat(val1);
    const y = parseFloat(val2);

    if (isNaN(x) || isNaN(y)) {
      setResult('Invalid Input');
      return;
    }

    let resStr = '';
    let summaryInput = '';

    if (mode === 'of') {
      const res = (x / 100) * y;
      resStr = `${x}% of ${y} = ${parseFloat(res.toFixed(6))}`;
      summaryInput = `${x}% of ${y}`;
    } else if (mode === 'is_what') {
      if (y === 0) {
        setResult('Cannot divide by zero');
        return;
      }
      const res = (x / y) * 100;
      resStr = `${x} is ${parseFloat(res.toFixed(4))}% of ${y}`;
      summaryInput = `${x} is what % of ${y}`;
    } else if (mode === 'change') {
      if (x === 0) {
        setResult('Initial value cannot be zero');
        return;
      }
      const diff = y - x;
      const pct = (diff / Math.abs(x)) * 100;
      const type = diff >= 0 ? 'Increase' : 'Decrease';
      resStr = `${Math.abs(parseFloat(pct.toFixed(4)))}% ${type} (from ${x} to ${y})`;
      summaryInput = `% change from ${x} to ${y}`;
    }

    setResult(resStr);
    onResultUpdate?.(resStr);

    addHistoryItem({
      calculatorId: 'percentage-calculator',
      calculatorName: 'Percentage Calculator',
      calculatorSlug: 'percentage-calculator',
      inputSummary: summaryInput,
      resultSummary: resStr,
    });
  };

  useEffect(() => {
    calculate();
  }, [mode, val1, val2]);

  const handleReset = () => {
    setVal1('15');
    setVal2('200');
  };

  return (
    <div className="max-w-xl mx-auto">
      
      {/* Mode Selector Tabs */}
      <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-6">
        <button
          onClick={() => setMode('of')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
            mode === 'of'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          What is X% of Y?
        </button>
        <button
          onClick={() => setMode('is_what')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
            mode === 'is_what'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          X is what % of Y?
        </button>
        <button
          onClick={() => setMode('change')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
            mode === 'change'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          % Change (Growth)
        </button>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {mode === 'of' && 'Percentage (X%)'}
            {mode === 'is_what' && 'Number (X)'}
            {mode === 'change' && 'Initial Value (From)'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {mode === 'of' && (
              <Percent className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            {mode === 'of' && 'Total Value (Y)'}
            {mode === 'is_what' && 'Total Value (Y)'}
            {mode === 'change' && 'Final Value (To)'}
          </label>
          <input
            type="number"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Reset & Calculate Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Values</span>
        </button>
      </div>

      {/* Result Display Box */}
      {result && (
        <div className="p-5 rounded-2xl bg-indigo-600 text-white shadow-lg text-center">
          <span className="text-xs font-medium uppercase tracking-wider opacity-80 block mb-1">
            Calculation Result
          </span>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight">
            {result}
          </div>
        </div>
      )}

    </div>
  );
};
