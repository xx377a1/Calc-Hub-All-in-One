import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { addHistoryItem } from '../../utils/history';

interface BmiCalculatorProps {
  onResultUpdate?: (result: string) => void;
}

export const BmiCalculator: React.FC<BmiCalculatorProps> = ({ onResultUpdate }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Metric: cm, kg
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('70');

  // Imperial: feet, inches, lbs
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');
  const [weightLbs, setWeightLbs] = useState('154');

  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [catColor, setCatColor] = useState<string>('');
  const [healthyRange, setHealthyRange] = useState<string>('');

  const calculate = () => {
    let bmiValue = 0;
    let hMeters = 0;

    if (unit === 'metric') {
      const h = parseFloat(heightCm) / 100;
      const w = parseFloat(weightKg);
      if (h > 0 && w > 0) {
        hMeters = h;
        bmiValue = w / (h * h);
      }
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalIn = ft * 12 + inch;
      const lbs = parseFloat(weightLbs);
      if (totalIn > 0 && lbs > 0) {
        hMeters = totalIn * 0.0254;
        bmiValue = (lbs / (totalIn * totalIn)) * 703;
      }
    }

    if (bmiValue > 0) {
      setBmi(bmiValue);

      let cat = '';
      let color = '';
      if (bmiValue < 18.5) {
        cat = 'Underweight';
        color = 'bg-blue-500 text-white';
      } else if (bmiValue < 25) {
        cat = 'Normal / Healthy Weight';
        color = 'bg-emerald-500 text-white';
      } else if (bmiValue < 30) {
        cat = 'Overweight';
        color = 'bg-amber-500 text-white';
      } else {
        cat = 'Obesity Class';
        color = 'bg-rose-600 text-white';
      }

      setCategory(cat);
      setCatColor(color);

      // Healthy weight range (BMI 18.5 - 24.9)
      if (unit === 'metric' && hMeters > 0) {
        const minW = 18.5 * hMeters * hMeters;
        const maxW = 24.9 * hMeters * hMeters;
        setHealthyRange(`${minW.toFixed(1)} kg - ${maxW.toFixed(1)} kg`);
      } else if (hMeters > 0) {
        const minLbs = (18.5 * (hMeters / 0.0254) * (hMeters / 0.0254)) / 703;
        const maxLbs = (24.9 * (hMeters / 0.0254) * (hMeters / 0.0254)) / 703;
        setHealthyRange(`${minLbs.toFixed(1)} lbs - ${maxLbs.toFixed(1)} lbs`);
      }

      const summaryStr = `BMI: ${bmiValue.toFixed(1)} (${cat})`;
      onResultUpdate?.(summaryStr);

      addHistoryItem({
        calculatorId: 'bmi-calculator',
        calculatorName: 'BMI Calculator',
        calculatorSlug: 'bmi-calculator',
        inputSummary: unit === 'metric' ? `${heightCm} cm, ${weightKg} kg` : `${heightFt}ft ${heightIn}in, ${weightLbs} lbs`,
        resultSummary: summaryStr,
      });
    }
  };

  useEffect(() => {
    calculate();
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  return (
    <div className="max-w-xl mx-auto">
      
      {/* Unit Switcher */}
      <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-6">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            unit === 'metric' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Metric Units (cm, kg)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            unit === 'imperial' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Imperial Units (ft/in, lbs)
        </button>
      </div>

      {/* Form Fields */}
      {unit === 'metric' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Height (cm)
            </label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Height (ft)</label>
            <input
              type="number"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Height (in)</label>
            <input
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Weight (lbs)</label>
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Result Card */}
      {bmi > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Your Body Mass Index (BMI)
          </span>
          <div className="text-4xl sm:text-5xl font-bold font-mono text-slate-900 dark:text-white my-2">
            {bmi.toFixed(1)}
          </div>
          <div className="inline-block px-4 py-1.5 rounded-full font-bold text-sm shadow-xs mt-1">
            <span className={`px-3 py-1 rounded-full ${catColor}`}>{category}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
            Healthy Weight Target Range: <strong className="text-slate-900 dark:text-white font-mono">{healthyRange}</strong>
          </div>
        </div>
      )}

      {/* Visual WHO Scale Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-semibold text-slate-500 block mb-2">WHO BMI Categories</span>
        <div className="grid grid-cols-4 gap-1 text-[10px] font-bold text-white text-center">
          <div className="p-1.5 rounded-l-lg bg-blue-500">&lt; 18.5</div>
          <div className="p-1.5 bg-emerald-500">18.5 - 24.9</div>
          <div className="p-1.5 bg-amber-500">25 - 29.9</div>
          <div className="p-1.5 rounded-r-lg bg-rose-600">30+</div>
        </div>
      </div>

    </div>
  );
};
