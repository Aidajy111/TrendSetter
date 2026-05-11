import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Heart,
  MapPin,
  MessageCircle,
  Package,
  PenLine,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TicketPercent,
  Truck,
  UserRound,
  Store,
} from 'lucide-react';
import { products } from '../../data/mockProducts.js';
import { readSellerApplication, sellerStatuses } from '../../data/mockSellers.js';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './Profile.module.css';

const profileUser = {
  name: 'Анна Белова',
  role: 'Покупатель TrendSetter',
  email: 'anna.belova@mail.ru',
  phone: '+7 999 214-45-80',
  city: 'Москва',
  address: 'ул. Большая Дмитровка, 18',
  avatar: 'А',
  level: 'Style Insider',
  bonus: 1840,
};

const orderSteps = ['Оформлен', 'В работе', 'Передан дизайнеру', 'Доставка'];

const initialOrders = [
  {
    id: 'TS-2408',
    title: 'Нефорские куртки',
    designer: 'Лариса Гузеева',
    date: '8 мая 2026',
    status: 'Передан дизайнеру',
    statusTone: 'accent',
    price: 5890,
    image: products[0].image,
    progress: 3,
  },
  {
    id: 'TS-2382',
    title: 'Подиумный жакет',
    designer: 'Atelier North',
    date: '30 апреля 2026',
    status: 'Доставлен',
    statusTone: 'success',
    price: 6490,
    image: products[1].image,
    progress: 4,
  },
];

const messages = [
  { title: 'Чат поддержки', text: 'Мы проверили оплату, заказ уже в работе.', time: '12:40', icon: MessageCircle },
  { title: 'Дизайнер Лариса', text: 'Можно убрать пуговицы и сделать воротник больше.', time: '11:15', icon: Sparkles },
  { title: 'Доставка', text: 'Курьер свяжется за час до приезда.', time: 'Вчера', icon: Truck },
];

const menuItems = [
  { id: 'overview', label: 'Главная', to: '/profile', icon: UserRound },
  { id: 'orders', label: 'Заказы', to: '/profile/orders', icon: Package },
  { id: 'favorites', label: 'Избранное', to: '/profile/favorites', icon: Heart },
  { id: 'settings', label: 'Настройки', to: '/profile/settings', icon: Settings },
];

export default function Profile({ section = 'overview' }) {
  const [orders, setOrders] = useState(initialOrders);
  const [favorites, setFavorites] = useState(products.slice(0, 3));
  const [isEditing, setIsEditing] = useState(false);
  const [saveState, setSaveState] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');
  const [sellerApplication, setSellerApplication] = useState(() => readSellerApplication());
  const [settings, setSettings] = useState({
    name: profileUser.name,
    email: profileUser.email,
    phone: profileUser.phone,
    city: profileUser.city,
    address: profileUser.address,
    orderUpdates: true,
    designerMessages: true,
    promoNews: false,
  });

  useEffect(() => {
    const syncSeller = () => setSellerApplication(readSellerApplication());
    window.addEventListener('trendsetter-seller-update', syncSeller);
    window.addEventListener('storage', syncSeller);
    return () => {
      window.removeEventListener('trendsetter-seller-update', syncSeller);
      window.removeEventListener('storage', syncSeller);
    };
  }, []);

  const activeSection = ['overview', 'orders', 'favorites', 'settings'].includes(section) ? section : 'overview';

  const visibleOrders = useMemo(() => {
    if (orderFilter === 'active') {
      return orders.filter((order) => order.status !== 'Доставлен');
    }
    if (orderFilter === 'done') {
      return orders.filter((order) => order.status === 'Доставлен');
    }
    return orders;
  }, [orders, orderFilter]);

  const removeFavorite = (id) => {
    setFavorites((items) => items.filter((item) => item.id !== id));
  };

  const repeatOrder = (order) => {
    setOrders((items) => [
      {
        ...order,
        id: `TS-${Math.floor(2500 + Math.random() * 300)}`,
        date: 'Сегодня',
        status: 'Оформлен',
        statusTone: 'accent',
        progress: 1,
      },
      ...items,
    ]);
    setSaveState('Заказ повторен и добавлен в список.');
  };

  const cancelOrder = (id) => {
    setOrders((items) => items.filter((order) => order.id !== id));
    setSaveState('Заказ удален из активного списка.');
  };

  const saveSettings = (event) => {
    event.preventDefault();
    setIsEditing(false);
    setSaveState('Изменения профиля сохранены.');
  };

  const toggleSetting = (name) => {
    setSettings((value) => ({ ...value, [name]: !value[name] }));
  };

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>{profileUser.avatar}</div>
            <div>
              <strong>{settings.name}</strong>
              <span>{profileUser.level}</span>
            </div>
          </div>

          <nav className={styles.menu} aria-label="Разделы профиля">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.id} to={item.to} className={activeSection === item.id ? styles.menuActive : ''}>
                  <Icon size={18} />
                  {item.label}
                  <ChevronRight size={16} />
                </Link>
              );
            })}
          </nav>

          <div className={styles.bonusCard}>
            <TicketPercent size={22} />
            <span>Бонусы</span>
            <strong>{profileUser.bonus} ₽</strong>
            <p>Можно списать при следующем заказе.</p>
          </div>
        </aside>

        <div className={styles.content}>
          <header className={styles.hero}>
            <div>
              <p>Личный кабинет</p>
              <h1>{settings.name}</h1>
              <span>Заказы, примерки, сообщения дизайнеров и настройки профиля в одном месте.</span>
            </div>
            <div className={styles.heroActions}>
              <Link to="/chat">
                <MessageCircle size={18} />
                Чат
              </Link>
              <Link to="/catalog">
                <ShoppingBag size={18} />
                В каталог
              </Link>
            </div>
          </header>

          {saveState && (
            <button className={styles.toast} type="button" onClick={() => setSaveState('')}>
              <CheckCircle2 size={18} />
              {saveState}
            </button>
          )}

          {activeSection === 'overview' && (
            <>
              <section className={styles.stats}>
                <article>
                  <Package size={22} />
                  <span>Активные заказы</span>
                  <strong>{orders.filter((order) => order.status !== 'Доставлен').length}</strong>
                </article>
                <article>
                  <Heart size={22} />
                  <span>Избранное</span>
                  <strong>{favorites.length}</strong>
                </article>
                <article>
                  <Bell size={22} />
                  <span>Новые уведомления</span>
                  <strong>{messages.length}</strong>
                </article>
                <article>
                  <ShieldCheck size={22} />
                  <span>Профиль</span>
                  <strong>92%</strong>
                </article>
              </section>

              <section className={`${styles.sellerCard} ${styles[sellerStatuses[sellerApplication.status]?.tone || 'neutral']}`}>
                <div>
                  <span>
                    <Store size={18} />
                    Роль продавца
                  </span>
                  <h2>{sellerStatuses[sellerApplication.status]?.label || 'Стать продавцом'}</h2>
                  {sellerApplication.status === 'none' && (
                    <p>Один аккаунт остается покупательским, а после одобрения заявки дополнительно открывает кабинет продавца.</p>
                  )}
                  {sellerApplication.status === 'pending' && (
                    <p>Заявка отправлена и ожидает проверки. Кабинет продавца будет доступен после одобрения заявки.</p>
                  )}
                  {sellerApplication.status === 'approved' && (
                    <p>Проверка пройдена. Теперь можно управлять магазином, товарами, заказами и аналитикой.</p>
                  )}
                  {sellerApplication.status === 'rejected' && (
                    <p>Заявка не прошла проверку. Исправьте данные и отправьте ее повторно.</p>
                  )}
                  {sellerApplication.status === 'blocked' && (
                    <p>Доступ продавца временно ограничен. Обратитесь в поддержку TrendSetter.</p>
                  )}
                </div>
                <div className={styles.sellerActions}>
                  {sellerApplication.status === 'none' && <Link to="/seller/apply">Стать продавцом</Link>}
                  {sellerApplication.status === 'pending' && <Link to="/seller/apply">Смотреть статус</Link>}
                  {sellerApplication.status === 'approved' && <Link to="/seller">Перейти в кабинет продавца</Link>}
                  {sellerApplication.status === 'rejected' && <Link to="/seller/apply">Подать заявку повторно</Link>}
                  {sellerApplication.status === 'blocked' && <Link to="/chat">Написать в поддержку</Link>}
                </div>
              </section>

              <section className={styles.gridTwo}>
                <div className={styles.panel}>
                  <div className={styles.panelTitle}>
                    <div>
                      <p>Последний заказ</p>
                      <h2>{orders[0]?.title}</h2>
                    </div>
                    <Link to="/profile/orders">Все заказы</Link>
                  </div>
                  {orders[0] && <OrderCard order={orders[0]} onRepeat={repeatOrder} onCancel={cancelOrder} />}
                </div>

                <div className={styles.panel}>
                  <div className={styles.panelTitle}>
                    <div>
                      <p>Сообщения</p>
                      <h2>Поддержка и дизайнер</h2>
                    </div>
                    <Link to="/chat">Открыть</Link>
                  </div>
                  <div className={styles.messageList}>
                    {messages.map((message) => {
                      const Icon = message.icon;
                      return (
                        <Link to="/chat" className={styles.messageItem} key={message.title}>
                          <span>
                            <Icon size={18} />
                          </span>
                          <div>
                            <strong>{message.title}</strong>
                            <p>{message.text}</p>
                          </div>
                          <time>{message.time}</time>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            </>
          )}

          {activeSection === 'orders' && (
            <section className={styles.panel}>
              <div className={styles.panelTitle}>
                <div>
                  <p>История покупок</p>
                  <h2>Мои заказы</h2>
                </div>
                <div className={styles.segmented}>
                  <button type="button" className={orderFilter === 'all' ? styles.segmentActive : ''} onClick={() => setOrderFilter('all')}>Все</button>
                  <button type="button" className={orderFilter === 'active' ? styles.segmentActive : ''} onClick={() => setOrderFilter('active')}>Активные</button>
                  <button type="button" className={orderFilter === 'done' ? styles.segmentActive : ''} onClick={() => setOrderFilter('done')}>Готовые</button>
                </div>
              </div>
              <div className={styles.ordersList}>
                {visibleOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onRepeat={repeatOrder} onCancel={cancelOrder} />
                ))}
              </div>
            </section>
          )}

          {activeSection === 'favorites' && (
            <section className={styles.panel}>
              <div className={styles.panelTitle}>
                <div>
                  <p>Сохраненные вещи</p>
                  <h2>Избранное</h2>
                </div>
                <Link to="/catalog">Добавить еще</Link>
              </div>
              {favorites.length > 0 ? (
                <div className={styles.favoriteGrid}>
                  {favorites.map((product) => (
                    <article className={styles.favoriteCard} key={product.id}>
                      <Link to={`/product/${product.id}`}>
                        <img src={product.image} alt={product.title} />
                      </Link>
                      <div>
                        <h3>{product.title}</h3>
                        <p>{product.brand}</p>
                        <strong>{formatPrice(product.price)}</strong>
                      </div>
                      <button type="button" onClick={() => removeFavorite(product.id)}>
                        Убрать
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <Heart size={34} />
                  <h3>Пока нет избранных товаров</h3>
                  <p>Сохраняйте дизайнерские вещи из каталога, чтобы быстро вернуться к ним позже.</p>
                  <Link to="/catalog">Перейти в каталог</Link>
                </div>
              )}
            </section>
          )}

          {activeSection === 'settings' && (
            <section className={styles.settingsGrid}>
              <form className={styles.panel} onSubmit={saveSettings}>
                <div className={styles.panelTitle}>
                  <div>
                    <p>Личные данные</p>
                    <h2>Профиль покупателя</h2>
                  </div>
                  <button className={styles.ghostButton} type="button" onClick={() => setIsEditing((value) => !value)}>
                    <PenLine size={16} />
                    {isEditing ? 'Отменить' : 'Изменить'}
                  </button>
                </div>
                <div className={styles.formGrid}>
                  <label>
                    Имя
                    <input value={settings.name} disabled={!isEditing} onChange={(event) => setSettings({ ...settings, name: event.target.value })} />
                  </label>
                  <label>
                    Email
                    <input value={settings.email} disabled={!isEditing} onChange={(event) => setSettings({ ...settings, email: event.target.value })} />
                  </label>
                  <label>
                    Телефон
                    <input value={settings.phone} disabled={!isEditing} onChange={(event) => setSettings({ ...settings, phone: event.target.value })} />
                  </label>
                  <label>
                    Город
                    <input value={settings.city} disabled={!isEditing} onChange={(event) => setSettings({ ...settings, city: event.target.value })} />
                  </label>
                  <label className={styles.fullField}>
                    Адрес доставки
                    <input value={settings.address} disabled={!isEditing} onChange={(event) => setSettings({ ...settings, address: event.target.value })} />
                  </label>
                </div>
                <button className={styles.primaryButton} type="submit" disabled={!isEditing}>
                  Сохранить изменения
                </button>
              </form>

              <div className={styles.panel}>
                <div className={styles.panelTitle}>
                  <div>
                    <p>Уведомления</p>
                    <h2>Что показывать</h2>
                  </div>
                </div>
                <div className={styles.toggleList}>
                  <Toggle label="Статусы заказов" checked={settings.orderUpdates} onClick={() => toggleSetting('orderUpdates')} />
                  <Toggle label="Сообщения дизайнеров" checked={settings.designerMessages} onClick={() => toggleSetting('designerMessages')} />
                  <Toggle label="Акции и новинки" checked={settings.promoNews} onClick={() => toggleSetting('promoNews')} />
                </div>
                <div className={styles.addressCard}>
                  <MapPin size={18} />
                  <div>
                    <strong>{settings.city}</strong>
                    <span>{settings.address}</span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

function OrderCard({ order, onRepeat, onCancel }) {
  return (
    <article className={styles.orderCard}>
      <img src={order.image} alt={order.title} />
      <div className={styles.orderBody}>
        <div className={styles.orderTop}>
          <div>
            <span>{order.id} · {order.date}</span>
            <h3>{order.title}</h3>
            <p>{order.designer}</p>
          </div>
          <strong>{formatPrice(order.price)}</strong>
        </div>
        <div className={styles.progress} aria-label="Статус заказа">
          {orderSteps.map((step, index) => (
            <span key={step} className={index < order.progress ? styles.progressDone : ''}>
              {step}
            </span>
          ))}
        </div>
        <div className={styles.orderActions}>
          <b className={styles[order.statusTone]}>{order.status}</b>
          <button type="button" onClick={() => onRepeat(order)}>
            Повторить
          </button>
          {order.status !== 'Доставлен' && (
            <button type="button" onClick={() => onCancel(order.id)}>
              Отменить
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function Toggle({ label, checked, onClick }) {
  return (
    <button className={styles.toggle} type="button" aria-pressed={checked} onClick={onClick}>
      <span>{label}</span>
      <i className={checked ? styles.toggleOn : ''} />
    </button>
  );
}
