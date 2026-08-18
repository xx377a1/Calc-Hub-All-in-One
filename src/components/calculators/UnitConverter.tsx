import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { addHistoryItem } from '../../utils/history';

interface UnitConverterProps {
  type?: 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'time' | 'data' | 'energy' | 'pressure' | 'power' | 'frequency' | 'fuel';
  onResultUpdate?: (result: string) => void;
}

interface UnitDef {
  code: string;
  name: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const UNITS_MAP: Record<string, UnitDef[]> = {
  length: [
    { code: 'm', name: 'Meters (m)', toBase: (v) => v, fromBase: (v) => v },
    { code: 'km', name: 'Kilometers (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { code: 'cm', name: 'Centimeters (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { code: 'mm', name: 'Millimeters (mm)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { code: 'inch', name: 'Inches (in)', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { code: 'ft', name: 'Feet (ft)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { code: 'yd', name: 'Yards (yd)', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { code: 'mile', name: 'Miles (mi)', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
  ],
  weight: [
    { code: 'kg', name: 'Kilograms (kg)', toBase: (v) => v, fromBase: (v) => v },
    { code: 'g', name: 'Grams (g)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { code: 'mg', name: 'Milligrams (mg)', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { code: 'lb', name: 'Pounds (lbs)', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { code: 'oz', name: 'Ounces (oz)', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    { code: 'ton', name: 'Metric Ton (t)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  ],
  temperature: [
    { code: 'C', name: 'Celsius (°C)', toBase: (v) => v, fromBase: (v) => v },
    { code: 'F', name: 'Fahrenheit (°F)', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
    { code: 'K', name: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  area: [
    { code: 'm2', name: 'Square Meters (m²)', toBase: (v) => v, fromBase: (v) => v },
    { code: 'km2', name: 'Square Kilometers (km²)', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    { code: 'ft2', name: 'Square Feet (sq ft)', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    { code: 'acre', name: 'Acres', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    { code: 'ha', name: 'Hectares (ha)', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  ],
  data: [
    { code: 'B', name: 'Bytes (B)', toBase: (v) => v, fromBase: (v) => v },
    { code: 'KB', name: 'Kilobytes (KB)', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
    { code: 'MB', name: 'Megabytes (MB)', toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / (1024 * 1024) },
    { code: 'GB', name: 'Gigabytes (GB)', toBase: (v) => v * Math.pow(1024, 3), fromBase: (v) => v / Math.pow(1024, 3) },
    { code: 'TB', name: 'Terabytes (TB)', toBase: (v) => v * Math.pow(1024, 4), fromBase: (v) => v / Math.pow(1024, 4) },
  ]
};

export const UnitConverter: React.FC<UnitConverterProps> = ({ type = 'length', onResultUpdate }) => {
  const units = UNITS_MAP[type] || UNITS_MAP.length;
  
  const [val, setVal] = useState('10');
  const [fromCode, setFromCode] = useState(units[0].code);
  const [toCode, setToCode] = useState(units[1]?.code || units[0].code);

  const [converted, setConverted] = useState<number>(0);

  useEffect(() => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setConverted(0);
      return;
    }

    const fromUnit = units.find((u) => u.code === fromCode) || units[0];
    const toUnit = units.find((u) => u.code === toCode) || units[1];

    const baseVal = fromUnit.toBase(num);
    const resultVal = toUnit.fromBase(baseVal);
    setConverted(resultVal);

    const summaryStr = `${num} ${fromUnit.code} = ${parseFloat(resultVal.toFixed(6))} ${toUnit.code}`;
    onResultUpdate?.(summaryStr);

    addHistoryItem({
      calculatorId: `${type}-converter`,
      calculatorName: `${type.toUpperCase()} Converter`,
      calculatorSlug: `${type}-converter`,
      inputSummary: `${num} ${fromUnit.code} to ${toUnit.code}`,
      resultSummary: summaryStr,
    });
  }, [val, fromCode, toCode, type]);

  const handleSwap = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  return (
    <div className="max-w-xl mx-auto">
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Value to Convert
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] gap-3 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">From Unit</label>
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {units.map((u) => (
                <option key={u.code} value={u.code}>{u.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="p-3 mt-4 sm:mt-5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800 flex items-center justify-center self-center"
            title="Swap Units"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">To Unit</label>
            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {units.map((u) => (
                <option key={u.code} value={u.code}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="p-6 rounded-2xl bg-indigo-600 text-white text-center shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider opacity-80 block mb-1">
          Converted Value
        </span>
        <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight">
          {parseFloat(converted.toFixed(8))} {toCode}
        </div>
      </div>

    </div>
  );
};
