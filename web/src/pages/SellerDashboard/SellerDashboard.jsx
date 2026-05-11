import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Boxes,
  CreditCard,
  Eye,
  PackagePlus,
  PackageSearch,
  Settings,
  ShoppingBag,
  Star,
  Store,
  Wallet,
} from 'lucide-react';
import { readSellerApplication, sellerSections } from '../../data/mockSellers.js';
import styles from './SellerDashboard.module.css';

const sectionIcons = {
  home: Store,
  products: ShoppingBag,
  'add-product': PackagePlus,
  orders: PackageSearch,
  collections: Boxes,
  stock: Boxes,
  reviews: Star,
  analytics: BarChart3,
  finance: Wallet,
  settings: Settings,
};

const stats = [
  { label: 'Продажи за месяц', value: '128 400 ₽', icon: CreditCard },
  { label: 'Новые заказы', value: '12', icon: PackageSearch },
  { label: 'Товаров на витрине', value: '37', icon: ShoppingBag },
  { label: 'Средняя оценка', value: '4.8', icon: Star },
  { label: 'Просмотры магазина', value: '8 420', icon: Eye },
];

export default function SellerDashboard({ section = 'home' }) {
  const [application, setApplication] = useState(() => readSellerApplication());
  const activeSection = sellerSections.some((item) => item.id === section) ? section : 'home';

  useEffect(() => {
    const syncSeller = () => setApplication(readSellerApplication());
    window.addEventListener('trendsetter-seller-update', syncSeller);
    window.addEventListener('storage', syncSeller);
    return () => {
      window.removeEventListener('trendsetter-seller-update', syncSeller);
      window.removeEventListener('storage', syncSeller);
    };
  }, []);

  if (application.status !== 'approved') {
    return (
      <main className={styles.page}>
        <section className={styles.locked}>
          <Store size={48} />
          <p>Кабинет продавца закрыт</p>
          <h1>Кабинет продавца будет доступен после одобрения заявки</h1>
          <span>Текущий статус: {application.status === 'pending' ? 'На проверке' : 'заявка не одобрена'}</span>
          <div>
            <Link to="/seller/apply">Смотреть заявку</Link>
            <Link to="/profile">Вернуться в профиль</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.brandCard}>
          <div>{(application.brandName || 'TS').slice(0, 2).toUpperCase()}</div>
          <strong>{application.brandName || 'Мой бренд'}</strong>
          <span>{application.city || 'Москва'} · продавец одобрен</span>
        </div>
        <nav className={styles.menu} aria-label="Кабинет продавца">
          {sellerSections.map((item) => {
            const Icon = sectionIcons[item.id] || Store;
            return (
              <Link key={item.id} className={activeSection === item.id ? styles.active : ''} to={item.to}>
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <section className={styles.content}>
        <header className={styles.hero}>
          <div>
            <p>Кабинет продавца</p>
            <h1>{sellerSections.find((item) => item.id === activeSection)?.label}</h1>
            <span>Один аккаунт совмещает покупки и управление магазином. Здесь продавец работает с товарами, заказами и аналитикой.</span>
          </div>
          <Link to="/designer/my-brand">Публичная страница</Link>
        </header>

        {activeSection === 'home' ? (
          <>
            <section className={styles.stats}>
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label}>
                    <Icon size={22} />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                );
              })}
            </section>
            <section className={styles.gridTwo}>
              <div className={styles.panel}>
                <p>Быстрые действия</p>
                <h2>Управление витриной</h2>
                <div className={styles.actions}>
                  <Link to="/seller/add-product">Добавить товар</Link>
                  <Link to="/seller/orders">Новые заказы</Link>
                  <Link to="/seller/analytics">Смотреть аналитику</Link>
                </div>
              </div>
              <div className={styles.panel}>
                <p>Проверка магазина</p>
                <h2>Профиль бренда заполнен</h2>
                <span>Логотип, описание, город, категории и публичная страница готовы к показу на странице дизайнеров.</span>
              </div>
            </section>
          </>
        ) : (
          <section className={styles.panel}>
            <p>{sellerSections.find((item) => item.id === activeSection)?.label}</p>
            <h2>Раздел готов к подключению backend</h2>
            <span>
              Здесь будет REST-интерфейс для управления разделом: таблицы, формы, статусы, фильтры и действия продавца.
            </span>
            <div className={styles.mockTable}>
              <b>Название</b>
              <b>Статус</b>
              <b>Действие</b>
              <span>Нефорские куртки</span>
              <span>На витрине</span>
              <button type="button">Открыть</button>
              <span>Подиумный жакет</span>
              <span>Черновик</span>
              <button type="button">Редактировать</button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
