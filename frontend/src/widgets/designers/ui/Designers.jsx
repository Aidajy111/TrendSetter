import { useState } from 'react'
import Button from '../../../shared/ui/Button/Button'
import { ArrowRightIcon } from '../../../shared/ui/icons/index'
import { DESIGNERS } from '../../../entities/product/model/products'
import styles from './Designers.module.css'

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function Designers() {
  const [idx, setIdx] = useState(0)
  const designer = DESIGNERS[idx]

  const prev = () => setIdx((i) => (i - 1 + DESIGNERS.length) % DESIGNERS.length)
  const next = () => setIdx((i) => (i + 1) % DESIGNERS.length)

  return (
    <section className={styles.section} aria-label="Дизайнеры">
      <div className={styles.container}>
        {/* Левая: текст */}
        <div className={styles.left}>
          <p className={styles.tag}>НАШИ МАСТЕРА</p>
          <h2 className={styles.title}>Дизайнеры</h2>

          <div className={styles.card}>
            <h3 className={styles.name}>{designer.name}</h3>
            <p className={styles.specialty}>{designer.specialty}</p>
            <p className={styles.bio}>{designer.bio}</p>

            <Button variant="ghost" size="sm" as="a" href="/designers">
              Смотреть портфолио
              <ArrowRightIcon size={14} />
            </Button>
          </div>

          {/* Навигация */}
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={prev} aria-label="Предыдущий дизайнер">
              <ChevronLeftIcon />
            </button>
            <span className={styles.counter}>
              {String(idx + 1).padStart(2, '0')} / {String(DESIGNERS.length).padStart(2, '0')}
            </span>
            <button className={styles.navBtn} onClick={next} aria-label="Следующий дизайнер">
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Правая: фото */}
        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <img
              key={designer.id}
              src={designer.image}
              alt={designer.name}
              className={styles.image}
              loading="lazy"
            />
            {/* Прогресс-точки */}
            <div className={styles.dots}>
              {DESIGNERS.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Дизайнер ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
