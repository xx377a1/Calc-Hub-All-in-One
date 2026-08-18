import React, { useState } from 'react';
import { CALCULATORS } from '../data/calculatorsData';
import { CalculatorWrapper } from '../components/CalculatorWrapper';

import { BasicCalculator } from '../components/calculators/BasicCalculator';
import { ScientificCalculator } from '../components/calculators/ScientificCalculator';
import { PercentageCalculator } from '../components/calculators/PercentageCalculator';
import { EmiCalculator } from '../components/calculators/EmiCalculator';
import { AgeCalculator } from '../components/calculators/AgeCalculator';
import { BmiCalculator } from '../components/calculators/BmiCalculator';
import { CurrencyConverter } from '../components/calculators/CurrencyConverter';
import { UnitConverter } from '../components/calculators/UnitConverter';
import { GenericCalculator } from '../components/calculators/GenericCalculator';

interface CalculatorDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const CalculatorDetailPage: React.FC<CalculatorDetailPageProps> = ({ slug, onNavigate }) => {
  const [resultCopySummary, setResultCopySummary] = useState<string>('');

  const meta = CALCULATORS.find((c) => c.slug === slug);

  if (!meta) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Calculator Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">The calculator slug "{slug}" does not exist.</p>
        <button
          onClick={() => onNavigate('/calculators')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
        >
          View All Calculators
        </button>
      </div>
    );
  }

  // Render appropriate interactive calculator component
  const renderCalculatorWidget = () => {
    switch (meta.slug) {
      case 'basic-calculator':
        return <BasicCalculator onResultUpdate={setResultCopySummary} />;
      case 'scientific-calculator':
        return <ScientificCalculator onResultUpdate={setResultCopySummary} />;
      case 'percentage-calculator':
        return <PercentageCalculator onResultUpdate={setResultCopySummary} />;
      case 'emi-calculator':
      case 'loan-calculator':
        return <EmiCalculator onResultUpdate={setResultCopySummary} />;
      case 'age-calculator':
        return <AgeCalculator onResultUpdate={setResultCopySummary} />;
      case 'bmi-calculator':
        return <BmiCalculator onResultUpdate={setResultCopySummary} />;
      case 'currency-converter':
        return <CurrencyConverter onResultUpdate={setResultCopySummary} />;
      case 'length-converter':
        return <UnitConverter type="length" onResultUpdate={setResultCopySummary} />;
      case 'weight-converter':
        return <UnitConverter type="weight" onResultUpdate={setResultCopySummary} />;
      case 'temperature-converter':
        return <UnitConverter type="temperature" onResultUpdate={setResultCopySummary} />;
      case 'area-converter':
        return <UnitConverter type="area" onResultUpdate={setResultCopySummary} />;
      case 'data-storage-converter':
        return <UnitConverter type="data" onResultUpdate={setResultCopySummary} />;
      default:
        return <GenericCalculator meta={meta} onResultUpdate={setResultCopySummary} />;
    }
  };

  return (
    <CalculatorWrapper
      meta={meta}
      onNavigate={onNavigate}
      resultSummaryForCopy={resultCopySummary}
    >
      {renderCalculatorWidget()}
    </CalculatorWrapper>
  );
};
