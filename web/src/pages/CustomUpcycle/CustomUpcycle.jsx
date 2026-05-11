import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, Camera, Recycle, Scissors, Upload } from 'lucide-react';
import TryOnModal from '../../components/TryOnModal/TryOnModal.jsx';
import jacketCream from '../../assets/images/products/jacket-cream.svg';
import designerWork from '../../assets/images/home/designer-work.jpg';
import streetFashion from '../../assets/images/home/street-fashion.jpg';
import styles from './CustomUpcycle.module.css';

const stages = [
  { title: 'Фото и идея', text: 'Загрузите образ, референс или выберите товар из каталога.', icon: Upload },
  { title: 'Детали', text: 'Опишите цвет, фурнитуру, вышивку, длину и посадку.', icon: Scissors },
  { title: 'Примерка', text: 'Проверьте образ в mock-примерке и отправьте дизайнеру.', icon: Camera },
  { title: 'Upcycle', text: 'Даем вторую жизнь вещам через ремонт, декор и кастом.', icon: Recycle },
];

export default function CustomUpcycle() {
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span>Custom x Upcycle</span>
          <h1>Кастомизация одежды вместе с дизайнером</h1>
          <p>
            Выберите вещь, загрузите фото, опишите детали и отправьте запрос дизайнеру. Страница готова под будущий backend:
            фото, заказ и чат можно подключить через REST API.
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={() => setIsTryOnOpen(true)}>
              Открыть примерку
              <Camera size={18} />
            </button>
            <Link to="/chat">
              Чат с дизайнером
              <ArrowDownRight size={18} />
            </Link>
          </div>
        </div>
        <img src={designerWork} alt="Кастомизация одежды" />
      </section>

      <section className={styles.stages}>
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <article key={stage.title}>
              <Icon size={28} />
              <h2>{stage.title}</h2>
              <p>{stage.text}</p>
            </article>
          );
        })}
      </section>

      <section className={styles.request}>
        <img src={streetFashion} alt="Streetwear примерка" />
        <form>
          <span>Заявка на кастом</span>
          <h2>Расскажите, что изменить</h2>
          <label>
            Тип работы
            <select defaultValue="upcycle">
              <option value="upcycle">Апсайкл вещи</option>
              <option value="fit">Подгонка посадки</option>
              <option value="decor">Вышивка и декор</option>
            </select>
          </label>
          <label>
            Комментарий
            <textarea defaultValue="Например: заменить пуговицы, добавить контрастный воротник, сделать рукава короче." />
          </label>
          <button type="button">Отправить дизайнеру</button>
        </form>
      </section>

      <TryOnModal isOpen={isTryOnOpen} onClose={() => setIsTryOnOpen(false)} productImage={jacketCream} />
    </main>
  );
}
