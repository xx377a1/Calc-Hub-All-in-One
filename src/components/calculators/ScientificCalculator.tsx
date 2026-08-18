import React, { useState, useEffect } from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { addHistoryItem } from '../../utils/history';

interface ScientificCalculatorProps {
  onResultUpdate?: (result: string) => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ onResultUpdate }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isRad, setIsRad] = useState(false);

  useEffect(() => {
    onResultUpdate?.(display);
  }, [display, onResultUpdate]);

  const append = (val: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
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

  const applyFunc = (funcName: string) => {
    try {
      const x = parseFloat(display);
      if (isNaN(x)) return;

      let res = 0;
      let exprText = `${funcName}(${display})`;

      if (funcName === 'sin') {
        const rad = isRad ? x : (x * Math.PI) / 180;
        res = Math.sin(rad);
      } else if (funcName === 'cos') {
        const rad = isRad ? x : (x * Math.PI) / 180;
        res = Math.cos(rad);
      } else if (funcName === 'tan') {
        const rad = isRad ? x : (x * Math.PI) / 180;
        res = Math.tan(rad);
      } else if (funcName === 'log') {
        res = Math.log10(x);
      } else if (funcName === 'ln') {
        res = Math.log(x);
      } else if (funcName === 'sqrt') {
        res = Math.sqrt(x);
        exprText = `√(${display})`;
      } else if (funcName === 'cbrt') {
        res = Math.cbrt(x);
        exprText = `∛(${display})`;
      } else if (funcName === 'square') {
        res = Math.pow(x, 2);
        exprText = `${display}²`;
      } else if (funcName === 'cube') {
        res = Math.pow(x, 3);
        exprText = `${display}³`;
      } else if (funcName === 'factorial') {
        if (x < 0 || !Number.isInteger(x)) {
          setDisplay('Error');
          return;
        }
        let f = 1;
        for (let i = 2; i <= x; i++) f *= i;
        res = f;
        exprText = `${x}!`;
      }

      if (isNaN(res) || !isFinite(res)) {
        setDisplay('Error');
      } else {
        const str = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(8)).toString();
        setDisplay(str);
        setExpression(exprText);
        addHistoryItem({
          calculatorId: 'scientific-calculator',
          calculatorName: 'Scientific Calculator',
          calculatorSlug: 'scientific-calculator',
          inputSummary: exprText,
          resultSummary: str,
        });
      }
    } catch {
      setDisplay('Error');
    }
  };

  const handleEquals = () => {
    try {
      let fullExpr = expression + display;
      if (!fullExpr) return;

      fullExpr = fullExpr
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString())
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${fullExpr})`)();

      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        const str = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
        setDisplay(str);
        addHistoryItem({
          calculatorId: 'scientific-calculator',
          calculatorName: 'Scientific Calculator',
          calculatorSlug: 'scientific-calculator',
          inputSummary: fullExpr,
          resultSummary: str,
        });
        setExpression('');
      } else {
        setDisplay('Error');
      }
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      
      {/* Display Screen */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 mb-5 shadow-inner border border-slate-800 text-right">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <button
            onClick={() => setIsRad(!isRad)}
            className="px-2 py-0.5 rounded bg-slate-800 text-indigo-400 font-bold hover:bg-slate-700 transition-colors"
          >
            {isRad ? 'RAD' : 'DEG'}
          </button>
          <span className="font-mono truncate">{expression}</span>
        </div>
        <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-emerald-400 truncate">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-5 gap-2">
        
        {/* Scientific Functions */}
        <button onClick={() => applyFunc('sin')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">sin</button>
        <button onClick={() => applyFunc('cos')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">cos</button>
        <button onClick={() => applyFunc('tan')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">tan</button>
        <button onClick={() => applyFunc('log')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">log10</button>
        <button onClick={() => applyFunc('ln')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">ln</button>

        <button onClick={() => applyFunc('sqrt')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">√x</button>
        <button onClick={() => applyFunc('cbrt')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">∛x</button>
        <button onClick={() => applyFunc('square')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">x²</button>
        <button onClick={() => applyFunc('factorial')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">n!</button>
        <button onClick={() => append('π')} className="p-3 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">π</button>

        {/* Numeric & Basic Ops */}
        <button onClick={handleClear} className="p-3.5 rounded-xl font-bold text-xs bg-rose-500 hover:bg-rose-600 text-white">AC</button>
        <button onClick={handleDelete} className="p-3.5 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center"><Delete className="w-4 h-4" /></button>
        <button onClick={() => append('(')} className="p-3.5 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200">(</button>
        <button onClick={() => append(')')} className="p-3.5 rounded-xl font-bold text-sm bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200">)</button>
        <button onClick={() => { setExpression(expression + display + ' ÷ '); setDisplay('0'); }} className="p-3.5 rounded-xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white">÷</button>

        <button onClick={() => append('7')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">7</button>
        <button onClick={() => append('8')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">8</button>
        <button onClick={() => append('9')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">9</button>
        <button onClick={() => append('e')} className="p-3.5 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">e</button>
        <button onClick={() => { setExpression(expression + display + ' × '); setDisplay('0'); }} className="p-3.5 rounded-xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white">×</button>

        <button onClick={() => append('4')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">4</button>
        <button onClick={() => append('5')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">5</button>
        <button onClick={() => append('6')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">6</button>
        <button onClick={() => { setExpression(expression + display + ' ^ '); setDisplay('0'); }} className="p-3.5 rounded-xl font-bold text-xs bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">x^y</button>
        <button onClick={() => { setExpression(expression + display + ' - '); setDisplay('0'); }} className="p-3.5 rounded-xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white">−</button>

        <button onClick={() => append('1')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">1</button>
        <button onClick={() => append('2')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">2</button>
        <button onClick={() => append('3')} className="p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">3</button>
        <button onClick={() => append('.')} className="p-3.5 rounded-xl font-bold text-base bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100">.</button>
        <button onClick={() => { setExpression(expression + display + ' + '); setDisplay('0'); }} className="p-3.5 rounded-xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white">+</button>

        <button onClick={() => append('0')} className="col-span-3 p-3.5 rounded-xl font-bold text-base bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">0</button>
        <button onClick={handleEquals} className="col-span-2 p-3.5 rounded-xl font-bold text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">=</button>

      </div>
    </div>
  );
};
