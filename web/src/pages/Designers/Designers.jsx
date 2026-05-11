import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowDownRight, BadgeCheck, ExternalLink, MapPin, Package, Star } from 'lucide-react';
import { getPublicDesigners, readSellerApplication } from '../../data/mockSellers.js';
import styles from './Designers.module.css';

export default function Designers() {
  const { id } = useParams();
  const [sellerApplication, setSellerApplication] = useState(() => readSellerApplication());
  const designers = useMemo(() => getPublicDesigners(sellerApplication), [sellerApplication]);
  const currentDesigner = id ? designers.find((designer) => designer.id === id) : null;

  useEffect(() => {
    const syncSeller = () => setSellerApplication(readSellerApplication());
    window.addEventListener('trendsetter-seller-update', syncSeller);
    window.addEventListener('storage', syncSeller);
    return () => {
      window.removeEventListener('trendsetter-seller-update', syncSeller);
      window.removeEventListener('storage', syncSeller);
    };
  }, []);

  if (id) {
    if (!currentDesigner) {
      return (
        <main className={styles.page}>
          <section className={styles.emptyStore}>
            <h1>Магазин не найден</h1>
            <p>Публичная страница доступна только после одобрения заявки продавца и заполнения профиля бренда.</p>
            <Link to="/designers">К дизайнерам</Link>
          </section>
        </main>
      );
    }

    return <DesignerStore designer={currentDesigner} />;
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span>Проверенные продавцы</span>
          <h1>Дизайнеры и бренды TrendSetter</h1>
          <p>Здесь показываются только продавцы с одобренной заявкой и заполненным публичным профилем бренда.</p>
          <div className={styles.heroActions}>
            <Link to="/seller/apply">
              Стать продавцом
              <ArrowDownRight size={18} />
            </Link>
            <Link to="/catalog">Смотреть изделия</Link>
          </div>
        </div>
        <img src={designers[0]?.cover} alt="Дизайнерская студия" />
      </section>

      <section className={styles.designersGrid}>
        {designers.map((designer) => (
          <article className={styles.designerCard} key={designer.id}>
            <img src={designer.cover} alt={designer.brandName} />
            <div className={styles.cardBody}>
              <div className={styles.logo}>{designer.logo}</div>
              <div className={styles.cardTop}>
                <span>
                  <BadgeCheck size={16} />
                  Одобрен
                </span>
                <b>
                  <Star size={16} fill="currentColor" />
                  {designer.rating}
                </b>
              </div>
              <h2>{designer.brandName}</h2>
              <p>{designer.description}</p>
              <small>
                <MapPin size={14} />
                {designer.city}
              </small>
              <div className={styles.tags}>
                {designer.categories.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardMeta}>
                <span>
                  <Package size={15} />
                  {designer.productsCount} товаров
                </span>
              </div>
              <Link to={`/designer/${designer.id}`}>Перейти в магазин</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function DesignerStore({ designer }) {
  return (
    <main className={styles.page}>
      <section className={styles.storeHero}>
        <img src={designer.cover} alt={designer.brandName} />
        <div className={styles.storeInfo}>
          <div className={styles.logo}>{designer.logo}</div>
          <span>
            <BadgeCheck size={16} />
            Проверенный продавец
          </span>
          <h1>{designer.brandName}</h1>
          <p>{designer.description}</p>
          <div className={styles.storeMeta}>
            <b>{designer.city}</b>
            <b>{designer.rating} рейтинг</b>
            <b>{designer.productsCount} товаров</b>
          </div>
          <div className={styles.socials}>
            {designer.socials.map((social) => (
              <a key={social} href={`https://${social}`} target="_blank" rel="noreferrer">
                {social}
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.storeProducts}>
        <div className={styles.sectionTitle}>
          <p>Витрина бренда</p>
          <h2>Товары дизайнера</h2>
        </div>
        {designer.products.length > 0 ? (
          <div className={styles.productsGrid}>
            {designer.products.map((product) => (
              <article key={product.id}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <Link to={`/product/${product.id}`}>Открыть товар</Link>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyStore}>
            <h2>Товары скоро появятся</h2>
            <p>Продавец уже одобрен, но пока не добавил товары на витрину.</p>
            <Link to="/seller">Перейти в кабинет продавца</Link>
          </div>
        )}
      </section>
    </main>
  );
}
