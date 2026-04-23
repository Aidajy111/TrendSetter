import { useState } from 'react'
import { SearchIcon, BagIcon, UserIcon, ChevronDownIcon } from '../../../shared/ui/icons/index'
import styles from './Header.module.css'

const NAV_ITEMS = [
  {
    label: 'КАТАЛОГ',
    items: ['Street wear', 'Business', 'Casual', 'Glamour', 'Все категории'],
  },
  {
    label: 'CUSTOMxUPCYCLE',
    items: ['Кастомизация', 'Апсайклинг', 'Портфолио', 'Заказать'],
  },
  {
    label: 'НОВИНКИ',
    items: ['Этот сезон', 'Коллекции', 'Лукбук'],
  },
]

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          TREND<span className={styles.dot}>·</span>SETTER
        </a>

        <nav className={styles.nav} aria-label="Главное меню">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                className={`${styles.navBtn} ${openMenu === item.label ? styles.active : ''}`}
                aria-expanded={openMenu === item.label}
              >
                {item.label}
                <ChevronDownIcon
                  className={`${styles.chevron} ${openMenu === item.label ? styles.chevronOpen : ''}`}
                />
              </button>

              {openMenu === item.label && (
                <div className={styles.dropdown} role="menu">
                  {item.items.map((sub) => (
                    <a key={sub} href="#" className={styles.dropdownItem} role="menuitem">
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Поиск">
            <SearchIcon />
          </button>
          <button className={styles.iconBtn} aria-label="Корзина">
            <BagIcon />
          </button>
          <button className={styles.iconBtn} aria-label="Профиль">
            <UserIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
