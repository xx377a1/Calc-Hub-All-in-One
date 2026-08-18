import { HistoryItem } from '../types';

const HISTORY_KEY = 'calchub_history';
const MAX_HISTORY = 30;

export function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading history:', e);
    return [];
  }
}

export function addHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>): void {
  try {
    const list = getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
      timestamp: Date.now(),
    };

    // Filter out identical consecutive calculations
    if (list.length > 0) {
      const top = list[0];
      if (
        top.calculatorId === newItem.calculatorId &&
        top.inputSummary === newItem.inputSummary &&
        top.resultSummary === newItem.resultSummary
      ) {
        return;
      }
    }

    const updated = [newItem, ...list].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('calchub_history_updated', { detail: updated }));
  } catch (e) {
    console.error('Error adding history:', e);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new CustomEvent('calchub_history_updated', { detail: [] }));
  } catch (e) {
    console.error('Error clearing history:', e);
  }
}
