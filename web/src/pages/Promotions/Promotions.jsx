import { Link } from 'react-router-dom';
import { Gift, Percent, ShieldCheck, Timer } from 'lucide-react';
import jacketCream from '../../assets/images/products/jacket-cream.svg';
import studioReal from '../../assets/images/home/studio-real.jpg';
import styles from './Promotions.module.css';

const offers = [
  { title: 'Скидка 20%', text: 'на сезонную верхнюю одежду и жакеты', icon: Percent },
  { title: 'Подарочная карта', text: 'для заказа у любимого дизайнера', icon: Gift },
  { title: 'Быстрый резерв', text: 'держим товар до подтверждения размера', icon: Timer },
  { title: 'Безопасная оплата', text: 'mock-сценарий готов под REST API заказов', icon: ShieldCheck },
];

export default function Promotions() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span>Акции</span>
          <h1>Выгодные предложения TrendSetter</h1>
          <p>Скидки, подарочные карты и специальные условия для покупателей дизайнерской одежды.</p>
          <Link to="/catalog">Выбрать товар</Link>
        </div>
        <div className={styles.saleCard}>
          <b>-20%</b>
          <img src={jacketCream} alt="Куртка со скидкой" />
          <p>Зимний drop: цена ниже до конца недели</p>
        </div>
      </section>

      <section className={styles.offerGrid}>
        {offers.map((offer) => {
          const Icon = offer.icon;
          return (
            <article key={offer.title}>
              <Icon size={28} />
              <h2>{offer.title}</h2>
              <p>{offer.text}</p>
            </article>
          );
        })}
      </section>

      <section className={styles.banner}>
        <img src={studioReal} alt="Fashion studio" />
        <div>
          <h2>Авторизуйтесь и получайте персональные предложения</h2>
          <p>В личном кабинете можно хранить избранное, отслеживать заказы и получать уведомления о новых акциях.</p>
          <Link to="/login">Войти в аккаунт</Link>
        </div>
      </section>
    </main>
  );
}
