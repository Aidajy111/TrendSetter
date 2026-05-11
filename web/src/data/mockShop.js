import jacketCream from '../assets/images/products/jacket-cream.svg';
import jacketBlack from '../assets/images/products/jacket-black.svg';
import jacketPink from '../assets/images/products/jacket-pink.svg';

export const CART_STORAGE_KEY = 'trendsetter-cart';
export const FAVORITES_STORAGE_KEY = 'trendsetter-favorites';

export const initialCartItems = [
  { id: 'nefor-jacket-1', title: 'Нефорские куртки', designer: 'Лариса Гузеева', price: 5890, size: 'XL', image: jacketCream, qty: 1 },
  { id: 'nefor-jacket-2', title: 'Подиумный жакет', designer: 'Atelier North', price: 6490, size: 'M', image: jacketPink, qty: 1 },
];

export const initialFavoriteItems = [
  { id: 'nefor-jacket-3', title: 'Студийный бомбер', designer: 'Buryat Craft', price: 5290, image: jacketBlack },
  { id: 'nefor-jacket-1', title: 'Нефорские куртки', designer: 'Лариса Гузеева', price: 5890, image: jacketCream },
];

export function readStoredItems(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
