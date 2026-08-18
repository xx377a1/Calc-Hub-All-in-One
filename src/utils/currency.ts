import { CurrencyRates } from '../types';

export const STATIC_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  PKR: 278.5,
  INR: 83.5,
  AED: 3.67,
  SAR: 3.75,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 155.2,
  CNY: 7.23,
  CHF: 0.90,
  BRL: 5.45,
  SGD: 1.35,
  MXN: 18.2,
  NZD: 1.64,
  KWD: 0.31,
  QAR: 3.64,
  TRY: 32.8,
  ZAR: 18.4,
};

let cachedRates: CurrencyRates | null = null;

export async function fetchCurrencyRates(): Promise<{ rates: Record<string, number>; isLive: boolean; lastUpdated: string }> {
  if (cachedRates) {
    return {
      rates: cachedRates.rates,
      isLive: true,
      lastUpdated: cachedRates.date || new Date().toISOString().split('T')[0],
    };
  }

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        cachedRates = {
          base: data.base_code || 'USD',
          date: data.time_last_update_utc ? new Date(data.time_last_update_utc).toLocaleDateString() : new Date().toLocaleDateString(),
          rates: { ...STATIC_RATES, ...data.rates },
        };
        return {
          rates: cachedRates.rates,
          isLive: true,
          lastUpdated: cachedRates.date,
        };
      }
    }
  } catch (err) {
    console.warn('Using fallback static currency rates due to fetch timeout/error:', err);
  }

  return {
    rates: STATIC_RATES,
    isLive: false,
    lastUpdated: 'Static Baseline Reference',
  };
}
