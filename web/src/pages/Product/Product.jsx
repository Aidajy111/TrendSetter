import { useEffect, useMemo, useState } from 'react';
import { Heart, SlidersHorizontal, Star, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import TryOnModal from '../../components/TryOnModal/TryOnModal';
import {
  CART_STORAGE_KEY,
  FAVORITES_STORAGE_KEY,
  initialCartItems,
  initialFavoriteItems,
  readStoredItems,
} from '../../data/mockShop.js';
import jacketCream from '../../assets/images/products/jacket-cream.svg';
import jacketBlack from '../../assets/images/products/jacket-black.svg';
import jacketPink from '../../assets/images/products/jacket-pink.svg';
import styles from './Product.module.css';

const productVariants = [
  {
    title: 'Нефорские куртки',
    brand: 'Лариса Гузеева',
    designer: 'Лариса Долина',
    description: 'Неклассические куртки с теплые и мягкие зимние',
    price: 5890,
    oldPrice: 9890,
    article: 'TS-2047-NF',
    composition: '65% шерсть, 25% хлопок, 10% экокожа',
    gender: 'Унисекс',
    season: 'Зима',
    modelSize: 'XL, рост модели 182 см',
    colors: ['Белый', 'Синий', 'Красный'],
    gallery: [
      { image: jacketCream, tone: 'red', label: 'Красный вариант' },
      { image: jacketPink, tone: 'blue', label: 'Синий вариант' },
      { image: jacketBlack, tone: 'light', label: 'Белый вариант' },
    ],
  },
  {
    title: 'Подиумный жакет',
    brand: 'Atelier North',
    designer: 'Арина Север',
    description: 'Фактурный дизайнерский жакет для городского образа',
    price: 6490,
    oldPrice: 10990,
    article: 'TS-1894-AT',
    composition: '80% хлопок, 15% вискоза, 5% полиэстер',
    gender: 'Женское',
    season: 'Демисезон',
    modelSize: 'M, рост модели 176 см',
    colors: ['Синий', 'Белый', 'Черный'],
    gallery: [
      { image: jacketPink, tone: 'blue', label: 'Синий вариант' },
      { image: jacketCream, tone: 'light', label: 'Белый вариант' },
      { image: jacketBlack, tone: 'dark', label: 'Черный вариант' },
    ],
  },
  {
    title: 'Студийный бомбер',
    brand: 'Buryat Craft',
    designer: 'Мила Байкалова',
    description: 'Мягкий бомбер ручной работы с контрастной отделкой',
    price: 5290,
    oldPrice: 7890,
    article: 'TS-3312-BC',
    composition: '55% хлопок, 35% полиэстер, 10% шерсть',
    gender: 'Мужское',
    season: 'Осень',
    modelSize: 'L, рост модели 184 см',
    colors: ['Черный', 'Красный', 'Белый'],
    gallery: [
      { image: jacketBlack, tone: 'dark', label: 'Черный вариант' },
      { image: jacketCream, tone: 'red', label: 'Красный вариант' },
      { image: jacketPink, tone: 'blue', label: 'Белый вариант' },
    ],
  },
];

const reviews = [
  {
    name: 'Андрей малышев',
    rating: '4.6',
    text: 'Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев и теплый кров. Один из проверенных способов это сделать — помочь благотворительному фонду Луч добра Благодаря их труду ежегодно сотни питомцев находят свой новый дом.',
  },
  {
    name: 'Андрей малышев',
    rating: '4.6',
    text: 'Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев и теплый кров. Один из проверенных способов это сделать — помочь благотворительному фонду Луч добра Благодаря их труду ежегодно сотни питомцев находят свой новый дом.',
  },
  {
    name: 'Андрей малышев',
    rating: '4.6',
    text: 'Мы любим животных и стараемся поддерживать тех из них, кому не посчастливилось иметь ласковых хозяев и теплый кров. Один из проверенных способов это сделать — помочь благотворительному фонду Луч добра Благодаря их труду ежегодно сотни питомцев находят свой новый дом.',
  },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function getProductByRouteId(id = '') {
  const number = Number(id.match(/\d+/)?.[0] || 1);
  return productVariants[(number - 1) % productVariants.length];
}

function colorClass(color) {
  if (color === 'Синий') return styles.swatchBlue;
  if (color === 'Красный') return styles.swatchRed;
  if (color === 'Черный') return styles.swatchBlack;
  return styles.swatchWhite;
}

export default function Product() {
  const { id } = useParams();
  const product = useMemo(() => getProductByRouteId(id), [id]);
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [activeSize, setActiveSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  const currentImage = product.gallery[activeImage]?.image || product.gallery[0].image;
  const productId = id || product.article;
  const relatedProducts = productVariants.map((item, index) => ({
    id: index + 1,
    image: item.gallery[0].image,
    title: item.title,
    brand: item.brand,
    description: item.description,
    price: item.price,
    oldPrice: item.oldPrice,
  }));

  const characteristics = [
    ['Артикул', product.article],
    ['Состав', product.composition],
    ['Пол', product.gender],
    ['Сезон', product.season],
    ['Размер на модели', product.modelSize],
    ['Уход', 'Деликатная стирка до 30°C, сушить на плечиках'],
    ['Производство', 'Малая дизайнерская мастерская TrendSetter'],
  ];

  useEffect(() => {
    const storedCart = readStoredItems(CART_STORAGE_KEY, initialCartItems);
    const storedFavorites = readStoredItems(FAVORITES_STORAGE_KEY, initialFavoriteItems);
    setIsInCart(storedCart.some((item) => item.id === productId));
    setIsFavorite(storedFavorites.some((item) => item.id === productId));
  }, [productId]);

  useEffect(() => {
    if (!isSpecsOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSpecsOpen]);

  const toggleProductCart = () => {
    const stored = readStoredItems(CART_STORAGE_KEY, initialCartItems);
    const exists = stored.some((item) => item.id === productId);
    const next = exists
      ? stored.filter((item) => item.id !== productId)
      : [
          ...stored,
          {
            id: productId,
            title: product.title,
            designer: product.designer,
            price: product.price,
            oldPrice: product.oldPrice,
            size: activeSize || 'M',
            image: product.gallery[0].image,
            qty: 1,
          },
        ];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('trendsetter-shop-update'));
    setIsInCart(!exists);
  };

  const toggleProductFavorite = () => {
    const stored = readStoredItems(FAVORITES_STORAGE_KEY, initialFavoriteItems);
    const exists = stored.some((item) => item.id === productId);
    const next = exists
      ? stored.filter((item) => item.id !== productId)
      : [
          ...stored,
          {
            id: productId,
            title: product.title,
            designer: product.designer,
            price: product.price,
            image: product.gallery[0].image,
          },
        ];

    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('trendsetter-shop-update'));
    setIsFavorite(!exists);
  };

  return (
    <main className={styles.productPage}>
      <section className={styles.summary}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {product.gallery.map((item, index) => (
              <button
                className={`${styles.thumb} ${styles[item.tone]} ${activeImage === index ? styles.thumbActive : ''}`}
                key={item.label}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={item.label}
              >
                <img src={item.image} alt={item.label} />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img src={currentImage} alt={product.title} />
          </div>
        </div>

        <article className={styles.info}>
          <span className={styles.kicker}>Дизайнерская одежда</span>
          <h1>{product.title}</h1>
          <div className={styles.rating}>
            <Star size={18} fill="#ffd400" stroke="#ffd400" />
            <span>4.8 - Средний отзыв</span>
          </div>

          <div className={styles.optionBlock}>
            <p>Цвет: {activeColor}</p>
            <div className={styles.swatches} aria-label="Выбор цвета">
              {product.colors.map((color) => (
                <button
                  className={`${styles.swatch} ${colorClass(color)} ${activeColor === color ? styles.swatchActive : ''}`}
                  key={color}
                  type="button"
                  onClick={() => setActiveColor(color)}
                  aria-label={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.optionBlock}>
            <p>Размер: {activeSize}</p>
            <div className={styles.sizes} aria-label="Выбор размера">
              {sizes.map((size) => (
                <button
                  className={activeSize === size ? styles.sizeActive : ''}
                  key={size}
                  type="button"
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <h2>О товаре</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.designer}>Дизайнер: <strong>{product.designer}</strong></p>

          <dl className={styles.specs}>
            {characteristics.slice(0, 5).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <button className={styles.specButton} type="button" onClick={() => setIsSpecsOpen(true)}>
            <SlidersHorizontal size={18} />
            Характеристика
          </button>
        </article>

        <aside className={styles.purchaseCard}>
          <div className={styles.priceLine}>
            <strong>{product.price}Р</strong>
            <span>{product.oldPrice}Р</span>
          </div>
          <p>Загрузите свое фото и посмотрите как одежду будет сидеть на вас</p>
          <Link className={styles.outlineButton} to="/chat">Связаться с дизайнером</Link>
          <button className={styles.tryButton} type="button" onClick={() => setIsTryOnOpen(true)}>
            Примерить одежду
          </button>
          <div className={styles.cartLine}>
            <button className={styles.cartButton} type="button" onClick={toggleProductCart}>
              {isInCart ? 'В корзине' : 'Добавить в корзину'}
            </button>
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
              type="button"
              onClick={toggleProductFavorite}
              aria-label="Добавить в избранное"
            >
              <Heart size={34} fill={isFavorite ? '#ef3b73' : 'none'} />
            </button>
          </div>
        </aside>
      </section>

      <section className={styles.contentBlock}>
        <h2>Описание товара</h2>
        <p>
          {product.title} создана как вещь для повседневного гардероба: плотная посадка, мягкая подкладка и аккуратные
          контрастные детали. Модель можно кастомизировать вместе с дизайнером: изменить фурнитуру, добавить вышивку или
          подобрать другой оттенок материала.
        </p>
      </section>

      <section className={styles.reviews}>
        <h2>Отзывы</h2>
        <div className={styles.reviewGrid}>
          {reviews.map((review, index) => (
            <article className={styles.reviewCard} key={`${review.name}-${index}`}>
              <div className={styles.reviewHeader}>
                <span>A</span>
                <div>
                  <strong>{review.name}</strong>
                  <div className={styles.reviewStars}>
                    <span>★ ★ ★</span>
                    <em>★ ★</em>
                    <b>{review.rating}</b>
                  </div>
                </div>
              </div>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.related}>
        <h2>Похожие товары</h2>
        <div className={styles.relatedGrid}>
          {relatedProducts.map((item) => (
            <article className={styles.relatedCard} key={item.id}>
              <Link className={styles.relatedImage} to={`/product/nefor-jacket-${item.id}`}>
                <span>Можно примерить</span>
                <img src={item.image} alt={item.title} />
              </Link>
              <h3>{item.title}</h3>
              <p>Дизайнер: <strong>{item.brand}</strong></p>
              <small>{item.description}</small>
              <div className={styles.relatedPrice}>
                <button type="button">В корзину</button>
                <strong>{item.price}Р</strong>
                <span>{item.oldPrice}Р</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TryOnModal isOpen={isTryOnOpen} onClose={() => setIsTryOnOpen(false)} productImage={currentImage} />

      {isSpecsOpen && (
        <div className={styles.drawerOverlay} onMouseDown={() => setIsSpecsOpen(false)}>
          <aside className={styles.specDrawer} onMouseDown={(event) => event.stopPropagation()} aria-label="Характеристики товара">
            <button className={styles.drawerClose} type="button" onClick={() => setIsSpecsOpen(false)} aria-label="Закрыть">
              <X size={22} />
            </button>
            <span>Характеристики</span>
            <h2>{product.title}</h2>
            <dl>
              {characteristics.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      )}
    </main>
  );
}
