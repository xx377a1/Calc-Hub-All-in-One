const FAVORITES_KEY = 'calchub_favorites';

export function getFavorites(): string[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading favorites:', e);
    return [];
  }
}

export function isFavorite(id: string): boolean {
  const list = getFavorites();
  return list.includes(id);
}

export function toggleFavorite(id: string): boolean {
  try {
    const list = getFavorites();
    const index = list.indexOf(id);
    let updated: string[];
    let added = false;

    if (index >= 0) {
      updated = list.filter((fav) => fav !== id);
    } else {
      updated = [...list, id];
      added = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('calchub_favorites_updated', { detail: updated }));
    return added;
  } catch (e) {
    console.error('Error updating favorites:', e);
    return false;
  }
}
