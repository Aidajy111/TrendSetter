import { useEffect, useState } from 'react';
import { ArrowDownRight, MessageCircle, Send } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('trendsetter-token')));
  }, [location.pathname]);

  return (
    <footer className={styles.footer}>
      {!isAuthenticated && (
        <Link className={styles.sellStrip} to="/login">
          Авторизуйтесь и продавайте вещи
        </Link>
      )}
      <div className={styles.panel}>
        <div className={styles.content}>
          <div className={styles.brandBlock}>
            <Link className={styles.logo} to="/">
              TREND<span>/</span>SETTER
            </Link>
            <div className={styles.socials}>
              <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="https://telegram.org/" target="_blank" rel="noreferrer">
                <Send size={16} /> Telegram
              </a>
            </div>
          </div>
          <div className={styles.column}>
            <h3>О компании</h3>
            <Link to="/company">О компании</Link>
            <Link to="/designers">Дизайнерам</Link>
            <Link to="/about">О нас</Link>
            <Link to="/reviews">Отзывы</Link>
          </div>
          <div className={styles.column}>
            <h3>Остальное</h3>
            <Link to="/catalog">Бутики</Link>
            <Link to="/designers">Дизайнеры</Link>
            <Link to="/custom-upcycle">Кастомизация</Link>
          </div>
          <div className={styles.column}>
            <h3>Мой Trend/Setter</h3>
            <Link to="/promotions">Акции</Link>
            <Link to="/profile">Личный кабинет</Link>
            <Link to="/promotions">Подарочные карты</Link>
          </div>
          <div className={styles.contactWrap}>
            <Link className={styles.contact} to="/contacts">
              Связаться с нами
              <span>
                <ArrowDownRight size={15} />
              </span>
            </Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2025 TREND-SETTER</span>
          <Link to="/about">Политика конфиденциальности</Link>
          <Link to="/about">Оферта</Link>
          <Link to="/about">Пользовательское соглашение</Link>
        </div>
      </div>
    </footer>
  );
}
