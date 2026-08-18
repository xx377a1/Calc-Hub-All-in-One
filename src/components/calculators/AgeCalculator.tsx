import React, { useState, useEffect } from 'react';
import { Calendar, RotateCcw } from 'lucide-react';
import { addHistoryItem } from '../../utils/history';

interface AgeCalculatorProps {
  onResultUpdate?: (result: string) => void;
}

export const AgeCalculator: React.FC<AgeCalculatorProps> = ({ onResultUpdate }) => {
  const [dob, setDob] = useState('1995-01-15');
  const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [ageYears, setAgeYears] = useState<number>(0);
  const [ageMonths, setAgeMonths] = useState<number>(0);
  const [ageDays, setAgeDays] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [nextBdayDays, setNextBdayDays] = useState<number>(0);

  const calculate = () => {
    if (!dob || !targetDate) return;

    const birth = new Date(dob);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      return;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = target.getTime() - birth.getTime();
    const totDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Next birthday calculation
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToNext = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setAgeYears(years);
    setAgeMonths(months);
    setAgeDays(days);
    setTotalDays(totDays);
    setNextBdayDays(daysToNext);

    const resStr = `${years} Years, ${months} Months, ${days} Days (${totDays.toLocaleString()} total days)`;
    onResultUpdate?.(resStr);

    addHistoryItem({
      calculatorId: 'age-calculator',
      calculatorName: 'Age Calculator',
      calculatorSlug: 'age-calculator',
      inputSummary: `DOB: ${dob}`,
      resultSummary: resStr,
    });
  };

  useEffect(() => {
    calculate();
  }, [dob, targetDate]);

  const handleReset = () => {
    setDob('1995-01-15');
    setTargetDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-xl mx-auto">
      
      {/* Date Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Calculate Age At Date
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Dates</span>
        </button>
      </div>

      {/* Main Age Card */}
      <div className="p-6 rounded-2xl bg-indigo-600 text-white text-center shadow-xl mb-6">
        <span className="text-xs font-bold uppercase tracking-wider opacity-80 block mb-2">
          Exact Age
        </span>
        <div className="grid grid-cols-3 gap-2 py-2">
          <div>
            <span className="text-3xl sm:text-4xl font-bold font-mono">{ageYears}</span>
            <span className="block text-xs opacity-80 uppercase mt-1">Years</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-bold font-mono">{ageMonths}</span>
            <span className="block text-xs opacity-80 uppercase mt-1">Months</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-bold font-mono">{ageDays}</span>
            <span className="block text-xs opacity-80 uppercase mt-1">Days</span>
          </div>
        </div>
      </div>

      {/* Extended Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Lived Time
          </span>
          <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
            {totalDays.toLocaleString()} Days
          </span>
          <span className="block text-xs text-slate-500 mt-0.5">
            ≈ {(totalDays * 24).toLocaleString()} Hours
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Next Birthday Countdown
          </span>
          <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {nextBdayDays} Days Left
          </span>
          <span className="block text-xs text-slate-500 mt-0.5">
            🎉 Mark your calendar!
          </span>
        </div>
      </div>

    </div>
  );
};
