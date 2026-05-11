import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  MessageSquareText,
  Navigation,
  PackageCheck,
  QrCode,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';
import { CART_STORAGE_KEY, initialCartItems, readStoredItems } from '../../data/mockShop.js';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './Checkout.module.css';

const cities = ['Москва', 'Санкт-Петербург', 'Казань', 'Иркутск', 'Улан-Удэ'];

const pickupPoints = {
  Москва: [
    { id: 'msk-1', name: 'TrendSetter Петровка', address: 'ул. Петровка, 17', metro: 'Кузнецкий мост', hours: '10:00-22:00', x: 26, y: 36 },
    { id: 'msk-2', name: 'Пункт выдачи Арбат', address: 'Арбат, 24', metro: 'Арбатская', hours: '09:00-21:00', x: 58, y: 50 },
    { id: 'msk-3', name: 'Studio Pick-up', address: 'Большая Дмитровка, 18', metro: 'Театральная', hours: '11:00-20:00', x: 72, y: 28 },
  ],
  'Санкт-Петербург': [
    { id: 'spb-1', name: 'TrendSetter Невский', address: 'Невский пр., 44', metro: 'Гостиный двор', hours: '10:00-22:00', x: 38, y: 34 },
    { id: 'spb-2', name: 'Лофт выдачи', address: 'Лиговский пр., 74', metro: 'Лиговский', hours: '10:00-21:00', x: 66, y: 57 },
  ],
  Казань: [
    { id: 'kzn-1', name: 'Крафт-пункт Центр', address: 'ул. Баумана, 12', metro: 'Площадь Тукая', hours: '10:00-20:00', x: 44, y: 44 },
    { id: 'kzn-2', name: 'TrendSetter Казань', address: 'ул. Пушкина, 5', metro: 'Кремлевская', hours: '11:00-21:00', x: 70, y: 32 },
  ],
  Иркутск: [
    { id: 'irk-1', name: 'Пункт выдачи 130 квартал', address: 'ул. 3 Июля, 25', metro: 'центр', hours: '10:00-20:00', x: 50, y: 42 },
    { id: 'irk-2', name: 'TrendSetter Байкал', address: 'ул. Ленина, 18', metro: 'центр', hours: '11:00-21:00', x: 30, y: 62 },
  ],
  'Улан-Удэ': [
    { id: 'uud-1', name: 'Бурятия Design Hub', address: 'ул. Ленина, 31', metro: 'центр', hours: '10:00-20:00', x: 42, y: 38 },
    { id: 'uud-2', name: 'Пункт выдачи Столица', address: 'пр. 50-летия Октября, 8', metro: 'центр', hours: '09:00-21:00', x: 68, y: 58 },
  ],
};

const paymentOptions = [
  { id: 'card', title: 'Онлайн картой', text: 'Visa, Mastercard, Мир', icon: CreditCard },
  { id: 'sbp', title: 'СБП', text: 'Оплата по QR-коду', icon: QrCode },
  { id: 'cash', title: 'При получении', text: 'После примерки и проверки', icon: Banknote },
];

export default function Checkout() {
  const [cartItems, setCartItems] = useState(() => readStoredItems(CART_STORAGE_KEY, initialCartItems));
  const [city, setCity] = useState('Москва');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [selectedPointId, setSelectedPointId] = useState(pickupPoints.Москва[0].id);
  const [payment, setPayment] = useState('card');
  const [comment, setComment] = useState('');
  const [courierAddress, setCourierAddress] = useState('ул. Большая Дмитровка, 18');
  const [success, setSuccess] = useState(false);

  const points = pickupPoints[city];
  const selectedPoint = points.find((point) => point.id === selectedPointId) || points[0];
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0), [cartItems]);
  const deliveryPrice = deliveryType === 'courier' ? 390 : 0;
  const total = subtotal + deliveryPrice;

  useEffect(() => {
    setSelectedPointId(pickupPoints[city][0].id);
  }, [city]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQty = (id, delta) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)));
  };

  const submitOrder = () => {
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (success) {
    return (
      <main className={styles.page}>
        <section className={styles.success}>
          <CheckCircle2 size={54} />
          <p>Заказ оформлен</p>
          <h1>Спасибо! Мы уже передали заказ дизайнеру.</h1>
          <span>Уведомления о статусе появятся в профиле и в чате поддержки.</span>
          <div>
            <Link to="/profile/orders">Мои заказы</Link>
            <Link to="/catalog">Вернуться в каталог</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p>Корзина</p>
          <h1>Оформление заказа</h1>
          <span>Выберите город, способ получения, пункт выдачи на карте и удобную оплату.</span>
        </div>
        <PackageCheck size={46} />
      </section>

      <section className={styles.layout}>
        <div className={styles.main}>
          <section className={styles.panel}>
            <div className={styles.panelTitle}>
              <div>
                <p>1 шаг</p>
                <h2>Город и получение</h2>
              </div>
              <Navigation size={22} />
            </div>

            <div className={styles.cityRow}>
              {cities.map((item) => (
                <button key={item} className={city === item ? styles.activeChip : ''} type="button" onClick={() => setCity(item)}>
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.deliveryTabs}>
              <button className={deliveryType === 'pickup' ? styles.activeDelivery : ''} type="button" onClick={() => setDeliveryType('pickup')}>
                <MapPin size={18} />
                Пункт выдачи
              </button>
              <button className={deliveryType === 'courier' ? styles.activeDelivery : ''} type="button" onClick={() => setDeliveryType('courier')}>
                <Truck size={18} />
                Курьер
              </button>
            </div>

            {deliveryType === 'pickup' ? (
              <div className={styles.pickupGrid}>
                <div className={styles.points}>
                  {points.map((point) => (
                    <button key={point.id} className={selectedPoint.id === point.id ? styles.activePoint : ''} type="button" onClick={() => setSelectedPointId(point.id)}>
                      <strong>{point.name}</strong>
                      <span>{point.address}</span>
                      <small>{point.metro} · {point.hours}</small>
                    </button>
                  ))}
                </div>
                <div className={styles.map}>
                  <div className={styles.mapGrid} />
                  {points.map((point) => (
                    <button
                      key={point.id}
                      className={`${styles.mapPoint} ${selectedPoint.id === point.id ? styles.mapPointActive : ''}`}
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      type="button"
                      onClick={() => setSelectedPointId(point.id)}
                      aria-label={point.name}
                    />
                  ))}
                  <div className={styles.mapCard}>
                    <strong>{selectedPoint.name}</strong>
                    <span>{selectedPoint.address}</span>
                    <small>{selectedPoint.hours}</small>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.courierBox}>
                <label>
                  Адрес курьерской доставки
                  <input value={courierAddress} onChange={(event) => setCourierAddress(event.target.value)} />
                </label>
                <p>Курьер привезет заказ после подтверждения дизайнером. Перед доставкой можно уточнить время в чате.</p>
              </div>
            )}
          </section>

          <section className={styles.panel}>
            <div className={styles.panelTitle}>
              <div>
                <p>2 шаг</p>
                <h2>Оплата</h2>
              </div>
              <CreditCard size={22} />
            </div>
            <div className={styles.paymentGrid}>
              {paymentOptions.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} className={payment === item.id ? styles.activePayment : ''} type="button" onClick={() => setPayment(item.id)}>
                    <Icon size={22} />
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelTitle}>
              <div>
                <p>3 шаг</p>
                <h2>Пожелания</h2>
              </div>
              <MessageSquareText size={22} />
            </div>
            <textarea
              className={styles.commentInput}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Например: позвонить за час, оставить воротник крупнее, уточнить упаковку..."
            />
          </section>
        </div>

        <aside className={styles.summaryPanel}>
          <div className={styles.summaryHead}>
            <div>
              <p>Ваш заказ</p>
              <h2>{cartItems.length} товара</h2>
            </div>
            <ShoppingBag size={24} />
          </div>

          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <article key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <span>{item.designer}</span>
                  <small>Размер: {item.size}</small>
                  <div className={styles.qty}>
                    <button type="button" onClick={() => updateQty(item.id, -1)}>-</button>
                    <b>{item.qty}</b>
                    <button type="button" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <strong>{formatPrice(item.price * item.qty)}</strong>
              </article>
            ))}
          </div>

          <div className={styles.totalBox}>
            <span>Товары <b>{formatPrice(subtotal)}</b></span>
            <span>Доставка <b>{deliveryPrice ? formatPrice(deliveryPrice) : 'Бесплатно'}</b></span>
            <strong>Итого <b>{formatPrice(total)}</b></strong>
          </div>

          <button className={styles.submit} type="button" onClick={submitOrder}>
            <Sparkles size={18} />
            Подтвердить заказ
          </button>
        </aside>
      </section>
    </main>
  );
}
