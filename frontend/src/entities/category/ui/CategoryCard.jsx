import Button from '../../../shared/ui/Button/Button'
import styles from './CategoryCard.module.css'

/**
 * @param {string}  label      — название категории
 * @param {string}  [image]    — URL фотографии
 * @param {string}  [href]     — ссылка
 * @param {string}  [className] — grid-позиционирование снаружи
 */
export default function CategoryCard({ label, image, href = '#', className = '' }) {
  return (
    <a
      href={href}
      className={`${styles.card} ${className}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <Button variant="glass" size="sm">{label}</Button>
      </div>
    </a>
  )
}
