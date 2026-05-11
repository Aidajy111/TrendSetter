import { Link } from 'react-router-dom';
import { ArrowDownRight, CheckCircle2, MessageCircle, Shirt, Sparkles, UsersRound } from 'lucide-react';
import studioReal from '../../assets/images/home/studio-real.jpg';
import streetFashion from '../../assets/images/home/street-fashion.jpg';
import designerWork from '../../assets/images/home/designer-work.jpg';
import styles from './Company.module.css';

const values = [
  {
    icon: Sparkles,
    title: 'Локальная мода',
    text: 'Собираем дизайнеров, ателье и бутики, которые создают вещи с характером и понятной историей.',
  },
  {
    icon: Shirt,
    title: 'Кастомизация',
    text: 'Поддерживаем upcycle, индивидуальную посадку, примерку по фото и прямой диалог с дизайнером.',
  },
  {
    icon: CheckCircle2,
    title: 'Готово к backend',
    text: 'Каталог, профиль, заказы, чат и примерка подготовлены так, чтобы подключить REST API без переделки интерфейса.',
  },
];

const timeline = [
  'Покупатель находит вещь по стилю, дизайнеру, сезону и размеру',
  'Добавляет товар в избранное, корзину или открывает виртуальную примерку',
  'Обсуждает кастомные детали с дизайнером и оформляет заказ',
];

export default function Company() {
  return (
    <main className={styles.company}>
      <section className={styles.hero}>
        <div>
          <p>О компании</p>
          <h1>TrendSetter объединяет дизайнерскую одежду, локальные бренды и покупателей</h1>
          <div className={styles.heroActions}>
            <Link to="/catalog" className={styles.cta}>
              Перейти в каталог
              <span>
                <ArrowDownRight size={18} />
              </span>
            </Link>
            <Link to="/contacts" className={styles.secondaryCta}>
              Связаться с нами
              <MessageCircle size={18} />
            </Link>
          </div>
        </div>
        <img src={studioReal} alt="Команда TrendSetter в студии" />
      </section>

      <section className={styles.story}>
        <div>
          <h2>Мы делаем локальную моду видимой</h2>
          <p>
            Платформа помогает покупателям находить авторские вещи, а дизайнерам показывать коллекции, принимать заказы,
            общаться с клиентами и развивать продажи онлайн. В проекте уже заложены сценарии каталога, профиля, избранного,
            чата, кастомизации и виртуальной примерки.
          </p>
        </div>
        <div className={styles.stats}>
          <span>40+</span>
          <p>брендов, бутиков и дизайнеров можно подключить в будущей версии платформы</p>
        </div>
      </section>

      <section className={styles.values}>
        {values.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title}>
              <Icon size={28} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className={styles.gallery}>
        <img src={streetFashion} alt="Streetwear образ" />
        <div>
          <UsersRound size={32} />
          <h2>Платформа для покупателей и дизайнеров</h2>
          <ol>
            {timeline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <img src={designerWork} alt="Работа дизайнера" />
      </section>
    </main>
  );
}
