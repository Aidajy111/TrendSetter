import { Star } from 'lucide-react';
import styles from './Reviews.module.css';

const reviews = [
  {
    name: 'Арина Цыденова',
    text: 'Заказала авторский жакет, быстро связались и помогли подобрать размер. Сайт выглядит как настоящий fashion-магазин.',
    product: 'Подиумный жакет',
  },
  {
    name: 'Даниил Соколов',
    text: 'Понравилась идея кастомизации и подборки локальных дизайнеров. Удобно, что можно сразу перейти к чату.',
    product: 'Студийный сет',
  },
  {
    name: 'Мария Бадмаева',
    text: 'Минималистичный интерфейс, товары легко смотреть. Хочу больше брендов и фильтров в каталоге.',
    product: 'Авторский образ',
  },
];

export default function Reviews() {
  return (
    <main className={styles.reviews}>
      <section className={styles.hero}>
        <p>Отзывы</p>
        <h1>Покупатели о TrendSetter</h1>
        <span>Собрали первые mock-отзывы, чтобы раздел был готов к подключению реальных данных из REST API.</span>
      </section>

      <section className={styles.grid}>
        {reviews.map((review) => (
          <article key={review.name}>
            <div className={styles.rating} aria-label="Оценка 5 из 5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
            </div>
            <p>{review.text}</p>
            <footer>
              <strong>{review.name}</strong>
              <span>{review.product}</span>
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
