import { ALSO_CHECK } from '../../../entities/product/model/products'
import styles from './AlsoCheck.module.css'

export default function AlsoCheck() {
  return (
    <section className={styles.section} aria-label="Также можете посмотреть">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.tag}>КАТЕГОРИИ</p>
          <h2 className={styles.title}>Также можете посмотреть</h2>
        </div>

        <div className={styles.grid}>
          {ALSO_CHECK.map((item) => (
            <a key={item.id} href={item.href} className={styles.card}>
              <img src={item.image} alt={item.label} className={styles.image} loading="lazy" />
              <div className={styles.overlay} />
              <span className={styles.label}>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
