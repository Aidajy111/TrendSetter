import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Sparkles, Trash2 } from 'lucide-react';
import {
  CART_STORAGE_KEY,
  FAVORITES_STORAGE_KEY,
  initialCartItems,
  initialFavoriteItems,
  readStoredItems,
} from '../../data/mockShop.js';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './Favorites.module.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => readStoredItems(FAVORITES_STORAGE_KEY, initialFavoriteItems));
  const [cart, setCart] = useState(() => readStoredItems(CART_STORAGE_KEY, initialCartItems));
  const [notice, setNotice] = useState('');
  const total = useMemo(() => favorites.reduce((sum, item) => sum + item.price, 0), [favorites]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const removeItem = (id) => {
    setFavorites((items) => items.filter((item) => item.id !== id));
    setNotice('Товар убран из избранного.');
  };

  const addToCart = (item) => {
    setCart((items) => {
      const exists = items.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        return items.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem));
      }
      return [...items, { ...item, size: 'M', qty: 1 }];
    });
    setNotice('Товар добавлен в корзину.');
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p>Мой TrendSetter</p>
          <h1>Избранное</h1>
          <span>Здесь лежат сохраненные вещи из меню шапки и каталога. Можно быстро открыть товар или перенести его в корзину.</span>
        </div>
        <div className={styles.summary}>
          <Heart size={24} />
          <strong>{favorites.length}</strong>
          <span>товара на сумму {formatPrice(total)}</span>
        </div>
      </section>

      {notice && (
        <button className={styles.notice} type="button" onClick={() => setNotice('')}>
          <Sparkles size={17} />
          {notice}
        </button>
      )}

      {favorites.length > 0 ? (
        <section className={styles.grid}>
          {favorites.map((item) => (
            <article className={styles.card} key={item.id}>
              <Link className={styles.imageWrap} to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} />
              </Link>
              <div className={styles.cardBody}>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.designer}</p>
                </div>
                <strong>{formatPrice(item.price)}</strong>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => addToCart(item)}>
                  <ShoppingBag size={17} />
                  В корзину
                </button>
                <button type="button" onClick={() => removeItem(item.id)}>
                  <Trash2 size={17} />
                  Убрать
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className={styles.empty}>
          <Heart size={42} />
          <h2>Избранное пустое</h2>
          <p>Сохраняйте дизайнерские вещи сердечком, чтобы они появлялись здесь и в меню шапки.</p>
          <Link to="/catalog">Перейти в каталог</Link>
        </section>
      )}
    </main>
  );
}
