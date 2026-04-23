import Button from '../../../shared/ui/Button/Button'
import styles from './ProductCard.module.css'

/**
 * @param {string}  name       — название товара
 * @param {string}  designer   — имя дизайнера
 * @param {string}  image      — URL фото
 * @param {string}  [href]
 * @param {string}  [btnLabel] — текст кнопки
 * @param {string}  [className]
 */
export default function ProductCard({
  name,
  designer,
  image,
  href = '#',
  btnLabel = 'Подробнее',
  className = '',
}) {
  return (
    <article className={`${styles.card} ${className}`}>
      <a href={href} className={styles.imageWrap}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
      </a>
      <div className={styles.info}>
        <p className={styles.designer}>{designer}</p>
        <h3 className={styles.name}>{name}</h3>
        <Button variant="ghost" size="sm" as="a" href={href} className={styles.btn}>
          {btnLabel}
        </Button>
      </div>
    </article>
  )
}
