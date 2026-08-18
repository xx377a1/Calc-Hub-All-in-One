import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw, RotateCcw } from 'lucide-react';
import { fetchCurrencyRates } from '../../utils/currency';
import { addHistoryItem } from '../../utils/history';

interface CurrencyConverterProps {
  onResultUpdate?: (result: string) => void;
}

const COMMON_CURRENCIES = [
  { code: 'USD', name: 'US Dollar ($)' },
  { code: 'EUR', name: 'Euro (€)' },
  { code: 'GBP', name: 'British Pound (£)' },
  { code: 'PKR', name: 'Pakistani Rupee (₨)' },
  { code: 'INR', name: 'Indian Rupee (₹)' },
  { code: 'AED', name: 'UAE Dirham (AED)' },
  { code: 'SAR', name: 'Saudi Riyal (SAR)' },
  { code: 'CAD', name: 'Canadian Dollar (C$)' },
  { code: 'AUD', name: 'Australian Dollar (A$)' },
  { code: 'JPY', name: 'Japanese Yen (¥)' },
  { code: 'CNY', name: 'Chinese Yuan (¥)' },
  { code: 'CHF', name: 'Swiss Franc (CHF)' },
  { code: 'BRL', name: 'Brazilian Real (R$)' },
  { code: 'SGD', name: 'Singapore Dollar (S$)' },
  { code: 'MXN', name: 'Mexican Peso ($)' },
  { code: 'NZD', name: 'New Zealand Dollar (NZ$)' },
];

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ onResultUpdate }) => {
  const [amount, setAmount] = useState('100');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('EUR');

  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [convertedResult, setConvertedResult] = useState<number>(0);

  const loadRates = async () => {
    setIsLoading(true);
    const data = await fetchCurrencyRates();
    setRates(data.rates);
    setIsLive(data.isLive);
    setLastUpdated(data.lastUpdated);
    setIsLoading(false);
  };

  useEffect(() => {
    loadRates();
  }, []);

  useEffect(() => {
    if (!rates[fromCurr] || !rates[toCurr]) return;

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt < 0) {
      setConvertedResult(0);
      return;
    }

    // Rate conversion: amount in USD = amt / rates[fromCurr], then * rates[toCurr]
    const usdVal = amt / rates[fromCurr];
    const targetVal = usdVal * rates[toCurr];
    setConvertedResult(targetVal);

    const summaryStr = `${amt} ${fromCurr} = ${targetVal.toFixed(2)} ${toCurr}`;
    onResultUpdate?.(summaryStr);

    addHistoryItem({
      calculatorId: 'currency-converter',
      calculatorName: 'Currency Converter',
      calculatorSlug: 'currency-converter',
      inputSummary: `${amt} ${fromCurr} to ${toCurr}`,
      resultSummary: summaryStr,
    });
  }, [amount, fromCurr, toCurr, rates]);

  const handleSwap = () => {
    const temp = fromCurr;
    setFromCurr(toCurr);
    setToCurr(temp);
  };

  return (
    <div className="max-w-xl mx-auto">
      
      {/* Live Rate Status Bar */}
      <div className="flex items-center justify-between mb-6 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {isLive ? 'Live Forex Market Rates' : 'Static Baseline Rates'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Updated: {lastUpdated}</span>
          <button onClick={loadRates} className="p-1 hover:text-indigo-600 rounded">
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Converter Inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] items-center gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">From Currency</label>
            <select
              value={fromCurr}
              onChange={(e) => setFromCurr(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {COMMON_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="p-3 mt-4 sm:mt-5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800 flex items-center justify-center self-center"
            title="Swap Currencies"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">To Currency</label>
            <select
              value={toCurr}
              onChange={(e) => setToCurr(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {COMMON_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="p-6 rounded-2xl bg-indigo-600 text-white text-center shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider opacity-80 block mb-1">
          Converted Value
        </span>
        <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight my-1">
          {convertedResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {toCurr}
        </div>
        <p className="text-xs opacity-80 mt-2 font-mono">
          1 {fromCurr} = {((rates[toCurr] || 1) / (rates[fromCurr] || 1)).toFixed(4)} {toCurr}
        </p>
      </div>

    </div>
  );
};
