import React, { useState, useEffect } from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { addHistoryItem } from '../../utils/history';

interface BasicCalculatorProps {
  onResultUpdate?: (result: string) => void;
}

export const BasicCalculator: React.FC<BasicCalculatorProps> = ({ onResultUpdate }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [prevAns, setPrevAns] = useState<string | null>(null);

  useEffect(() => {
    onResultUpdate?.(display);
  }, [display, onResultUpdate]);

  const handleDigit = (digit: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(digit);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOp = (op: string) => {
    if (display === 'Error') return;
    setExpression(expression + display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleToggleSign = () => {
    if (display === '0' || display === 'Error') return;
    if (display.startsWith('-')) {
      setDisplay(display.slice(1));
    } else {
      setDisplay('-' + display);
    }
  };

  const handlePercent = () => {
    try {
      const val = parseFloat(display);
      if (!isNaN(val)) {
        const res = (val / 100).toString();
        setDisplay(res);
      }
    } catch {
      setDisplay('Error');
    }
  };

  const handleEquals = () => {
    try {
      const fullExpr = expression + display;
      if (!fullExpr.trim()) return;

      // Safe evaluation of standard arithmetic
      const sanitized = fullExpr.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized})`)();
      
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        const formatted = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
        setDisplay(formatted);
        setPrevAns(formatted);
        addHistoryItem({
          calculatorId: 'basic-calculator',
          calculatorName: 'Basic Calculator',
          calculatorSlug: 'basic-calculator',
          inputSummary: fullExpr,
          resultSummary: formatted,
        });
        setExpression('');
      } else {
        setDisplay('Error');
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      if (e.key === '.') handleDecimal();
      if (e.key === '+') handleOp('+');
      if (e.key === '-') handleOp('-');
      if (e.key === '*') handleOp('×');
      if (e.key === '/') {
        e.preventDefault();
        handleOp('÷');
      }
      if (e.key === 'Enter' || e.key === '=') handleEquals();
      if (e.key === 'Backspace') handleDelete();
      if (e.key === 'Escape') handleClear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, expression]);

  return (
    <div className="max-w-md mx-auto">
      
      {/* Display Screen */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 mb-5 shadow-inner border border-slate-800 text-right">
        <div className="text-xs text-slate-400 font-mono h-6 truncate">
          {expression}
        </div>
        <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-emerald-400 truncate mt-1">
          {display}
        </div>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        
        {/* Row 1 */}
        <button
          onClick={handleClear}
          className="p-4 rounded-xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-xs transition-colors"
        >
          AC
        </button>
        <button
          onClick={handleDelete}
          className="p-4 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center transition-colors"
        >
          <Delete className="w-5 h-5" />
        </button>
        <button
          onClick={handlePercent}
          className="p-4 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
        >
          %
        </button>
        <button
          onClick={() => handleOp('÷')}
          className="p-4 rounded-xl font-bold text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleDigit('7')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          7
        </button>
        <button
          onClick={() => handleDigit('8')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          8
        </button>
        <button
          onClick={() => handleDigit('9')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          9
        </button>
        <button
          onClick={() => handleOp('×')}
          className="p-4 rounded-xl font-bold text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => handleDigit('4')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          4
        </button>
        <button
          onClick={() => handleDigit('5')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          5
        </button>
        <button
          onClick={() => handleDigit('6')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          6
        </button>
        <button
          onClick={() => handleOp('-')}
          className="p-4 rounded-xl font-bold text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
        >
          −
        </button>

        {/* Row 4 */}
        <button
          onClick={() => handleDigit('1')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          1
        </button>
        <button
          onClick={() => handleDigit('2')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          2
        </button>
        <button
          onClick={() => handleDigit('3')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          3
        </button>
        <button
          onClick={() => handleOp('+')}
          className="p-4 rounded-xl font-bold text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={handleToggleSign}
          className="p-4 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
        >
          +/−
        </button>
        <button
          onClick={() => handleDigit('0')}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="p-4 rounded-xl font-bold text-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="p-4 rounded-xl font-bold text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
        >
          =
        </button>

      </div>
    </div>
  );
};
