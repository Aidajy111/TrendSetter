import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageWrap} aria-label={product.title}>
        {product.badge && (
          <span className={`${styles.badge} ${styles[product.badgeTone || 'accent']}`}>{product.badge}</span>
        )}
        <button className={styles.favorite} type="button" aria-label="Добавить в избранное">
          <Heart size={18} fill={product.isFavorite ? 'currentColor' : 'none'} />
        </button>
        <img src={product.image} alt={product.title} className={styles.image} />
      </Link>
      <div className={styles.body}>
        <h3>{product.title}</h3>
        <p className={styles.brand}>
          Дизайнер: <b>{product.brand}</b>
        </p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.purchase}>
          <Button size="sm">В корзину</Button>
          <span className="price">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
        </div>
      </div>
    </article>
  );
}
