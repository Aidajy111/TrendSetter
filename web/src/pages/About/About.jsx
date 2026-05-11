import { Link } from 'react-router-dom';
import { ArrowDownRight, Instagram, MessageCircle, Music2, Palette, Ruler, Sparkles } from 'lucide-react';
import designerWork from '../../assets/images/home/designer-work.jpg';
import streetFashion from '../../assets/images/home/street-fashion.jpg';
import runwayModel from '../../assets/images/home/runway-model.jpg';
import styles from './About.module.css';

const team = [
  {
    name: 'Владислав',
    role: 'Frontend и интерфейсы',
    text: 'Собирает страницы, роутинг, карточки товаров, модальные окна и адаптив.',
  },
  {
    name: 'Дизайнеры',
    role: 'Визуальная система',
    text: 'Помогают держать стиль fashion/e-commerce: сетки, ритм, акцент и карточки.',
  },
  {
    name: 'Backend-команда',
    role: 'Golang + PostgreSQL',
    text: 'Позже подключит реальные товары, авторизацию, заказы, чат и примерку через REST API.',
  },
];

const principles = [
  { icon: Palette, title: 'Минимализм', text: 'Чистый фон, тонкие линии, много воздуха и розовый акцент.' },
  { icon: Ruler, title: 'Практичность', text: 'Каждая кнопка ведет на страницу или готова к подключению backend.' },
  { icon: Sparkles, title: 'Fashion-настроение', text: 'Реальные фото, дизайнерская одежда, кастомизация и витрина брендов.' },
];

export default function About() {
  return (
    <main className={styles.about}>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img src={streetFashion} alt="Команда TrendSetter" />
          <div>
            <span>TrendSetter</span>
            <b>Команда проекта</b>
          </div>
        </div>
        <div className={styles.heroText}>
          <span>О нас</span>
          <h1>Мы создаем учебный fashion-маркетплейс для дизайнерской одежды</h1>
          <p>
            TrendSetter задуман как современная онлайн-платформа, где покупатель находит авторские вещи, дизайнер показывает
            коллекции, а кастомизация и примерка по фото делают покупку понятнее.
          </p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <Instagram size={19} />
              Instagram
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
              <Music2 size={19} />
              TikTok
            </a>
            <Link to="/contacts">
              <MessageCircle size={19} />
              Контакты
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div>
          <span>Миссия</span>
          <h2>Показать, как может выглядеть локальная мода в цифровом сервисе</h2>
        </div>
        <p>
          Это не просто страница с товарами. В проекте собраны каталог, карточка товара, профиль, избранное, чат, акции,
          дизайнеры и виртуальная примерка. Интерфейс сделан так, чтобы студент мог легко менять тексты, изображения и данные.
        </p>
      </section>

      <section className={styles.principles}>
        {principles.map((item) => {
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

      <section className={styles.team}>
        <div className={styles.teamIntro}>
          <img src={designerWork} alt="Работа над коллекцией" />
          <div>
            <span>Кто делает</span>
            <h2>Проект собирается как полноценный интернет-магазин</h2>
            <Link to="/company">
              О компании
              <ArrowDownRight size={18} />
            </Link>
          </div>
        </div>
        <div className={styles.teamCards}>
          {team.map((item) => (
            <article key={item.name}>
              <h3>{item.name}</h3>
              <span>{item.role}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalBlock}>
        <img src={runwayModel} alt="Fashion editorial" />
        <div>
          <span>Соцсети</span>
          <h2>Следите за обновлениями и новыми страницами</h2>
          <p>В Instagram и TikTok можно показывать новые дропы, видео примерки, дизайнеров и процесс создания вещей.</p>
          <div className={styles.finalLinks}>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
      </section>
    </main>
  );
}
