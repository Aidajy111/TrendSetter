import styles from './Footer.module.css'

const FOOTER_LINKS = [
  {
    heading: 'Каталог',
    links: [
      { label: 'Street wear', href: '#' },
      { label: 'Business',    href: '#' },
      { label: 'Casual',      href: '#' },
      { label: 'Glamour',     href: '#' },
    ],
  },
  {
    heading: 'Custom × Upcycle',
    links: [
      { label: 'Кастомизация', href: '#' },
      { label: 'Апсайклинг',   href: '#' },
      { label: 'Портфолио',    href: '#' },
      { label: 'Заказать',     href: '#' },
    ],
  },
  {
    heading: 'О нас',
    links: [
      { label: 'Дизайнеры',    href: '#' },
      { label: 'Мастер-классы', href: '#' },
      { label: 'Новинки',      href: '#' },
      { label: 'Контакты',     href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top: лого + колонки */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo}>
              TREND<span className={styles.dot}>·</span>SETTER
            </a>
            <p className={styles.tagline}>
              Уникальная мода.<br />Авторский стиль.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.social} aria-label="Instagram">IG</a>
              <a href="#" className={styles.social} aria-label="Telegram">TG</a>
              <a href="#" className={styles.social} aria-label="VKontakte">VK</a>
            </div>
          </div>

          <div className={styles.cols}>
            {FOOTER_LINKS.map((col) => (
              <nav key={col.heading} className={styles.col}>
                <p className={styles.colHeading}>{col.heading}</p>
                <ul className={styles.colLinks}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={styles.colLink}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom: копирайт */}
        <div className={styles.bottom}>
          <p className={styles.copy}>© 2025 TrendSetter. Все права защищены.</p>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>Политика конфиденциальности</a>
            <a href="#" className={styles.legalLink}>Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
