import Button from '../../../shared/ui/Button/Button'
import { ArrowRightIcon } from '../../../shared/ui/icons/index'
import styles from './HeroBanner.module.css'

/* 5 фото для мозаики: 2 слева | 1 большое центр | 2 справа */
const MOSAIC = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80',
    alt: 'Street fashion look',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&auto=format&fit=crop&q=80',
    alt: 'Glamour fashion',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80',
    alt: 'Featured collection',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    alt: 'Business style',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=80',
    alt: 'Casual wear',
  },
]

export default function HeroBanner() {
  return (
    <section className={styles.section} aria-label="Главный баннер">
      <div className={styles.container}>
        {/* Мозаика фото */}
        <div className={styles.mosaic}>
          <div className={styles.col}>
            <img src={MOSAIC[0].src} alt={MOSAIC[0].alt} className={styles.img} loading="eager" />
            <img src={MOSAIC[1].src} alt={MOSAIC[1].alt} className={styles.img} loading="eager" />
          </div>
          <div className={`${styles.col} ${styles.colCenter}`}>
            <img src={MOSAIC[2].src} alt={MOSAIC[2].alt} className={`${styles.img} ${styles.imgTall}`} loading="eager" />
          </div>
          <div className={styles.col}>
            <img src={MOSAIC[3].src} alt={MOSAIC[3].alt} className={styles.img} loading="eager" />
            <img src={MOSAIC[4].src} alt={MOSAIC[4].alt} className={styles.img} loading="eager" />
          </div>
        </div>

        {/* Текст */}
        <div className={styles.text}>
          <div className={styles.textInner}>
            <h1 className={styles.title}>
              Работы лучших<br />
              <span className={styles.accent}>дизайнеров</span> бутиков
            </h1>
            <p className={styles.subtitle}>
              Уникальные образы от мастеров своего дела — кастом, апсайклинг,
              авторские коллекции для тех, кто ценит индивидуальность
            </p>
          </div>
          <Button variant="primary" size="lg" as="a" href="/catalog">
            Перейти в каталог
            <ArrowRightIcon size={18} />
          </Button>
        </div>
      </div>
    </section>
  )
}
