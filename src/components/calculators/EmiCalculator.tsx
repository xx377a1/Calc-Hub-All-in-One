import React, { useState, useEffect } from 'react';
import { DollarSign, RotateCcw } from 'lucide-react';
import { addHistoryItem } from '../../utils/history';

interface EmiCalculatorProps {
  onResultUpdate?: (result: string) => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({ onResultUpdate }) => {
  const [loanAmount, setLoanAmount] = useState('250000');
  const [interestRate, setInterestRate] = useState('7.5');
  const [loanTermYears, setLoanTermYears] = useState('20');

  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const calculate = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(loanTermYears) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R < 0 || N <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    let emiValue = 0;
    if (R === 0) {
      emiValue = P / N;
    } else {
      emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    }

    const totalPay = emiValue * N;
    const totalInt = totalPay - P;

    setEmi(emiValue);
    setTotalPayment(totalPay);
    setTotalInterest(totalInt);

    const summaryStr = `Monthly EMI: $${emiValue.toFixed(2)} | Total Interest: $${totalInt.toFixed(2)}`;
    onResultUpdate?.(summaryStr);

    addHistoryItem({
      calculatorId: 'emi-calculator',
      calculatorName: 'EMI / Loan Calculator',
      calculatorSlug: 'emi-calculator',
      inputSummary: `$${P.toLocaleString()} at ${interestRate}% for ${loanTermYears} yrs`,
      resultSummary: summaryStr,
    });
  };

  useEffect(() => {
    calculate();
  }, [loanAmount, interestRate, loanTermYears]);

  const handleReset = () => {
    setLoanAmount('250000');
    setInterestRate('7.5');
    setLoanTermYears('20');
  };

  const principalPct = totalPayment > 0 ? ((parseFloat(loanAmount) || 0) / totalPayment) * 100 : 50;
  const interestPct = 100 - principalPct;

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Loan Amount ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-400 font-bold">$</span>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Interest Rate (% p.a.)
          </label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Loan Tenure (Years)
          </label>
          <input
            type="number"
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(e.target.value)}
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
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Output Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-indigo-600 text-white shadow-md text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 block mb-1">
            Monthly EMI
          </span>
          <span className="text-2xl font-bold font-mono">
            ${emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Interest Owed
          </span>
          <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
            ${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Payoff Amount
          </span>
          <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
            ${totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Visual Breakdown Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
          <span>Principal vs Interest Breakdown</span>
          <span>{principalPct.toFixed(1)}% Principal / {interestPct.toFixed(1)}% Interest</span>
        </div>
        <div className="h-4 w-full bg-amber-500 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${principalPct}%` }}
            title={`Principal: ${principalPct.toFixed(1)}%`}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
            <span>Principal Amount (${(parseFloat(loanAmount) || 0).toLocaleString()})</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Interest (${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })})</span>
          </div>
        </div>
      </div>

    </div>
  );
};
