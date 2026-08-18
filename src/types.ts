export type CategoryId = 
  | 'everyday'
  | 'math'
  | 'finance'
  | 'health'
  | 'conversion'
  | 'date-time'
  | 'statistics'
  | 'education'
  | 'business'
  | 'other';

export interface CalculatorCategory {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
  bgLight: string;
}

export interface CalculatorMeta {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  tags: string[];
  formula?: string;
  example?: {
    input: string;
    output: string;
    explanation: string;
  };
  faq?: Array<{ question: string; answer: string }>;
}

export interface HistoryItem {
  id: string;
  calculatorId: string;
  calculatorName: string;
  calculatorSlug: string;
  inputSummary: string;
  resultSummary: string;
  timestamp: number;
}

export interface CurrencyRates {
  base: string;
  date: string;
  time_last_update_utc?: string;
  rates: Record<string, number>;
}
