import ProductCard from '../../../entities/product/ui/ProductCard'
import { FOR_YOU_PRODUCTS } from '../../../entities/product/model/products'
import styles from './ForYou.module.css'

export default function ForYou() {
  return (
    <section className={styles.section} aria-label="Специально для вас">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.tag}>ПОДБОРКА</p>
            <h2 className={styles.title}>Специально для вас</h2>
          </div>
          <a href="/catalog" className={styles.link}>Смотреть всё →</a>
        </div>

        <div className={styles.grid}>
          {FOR_YOU_PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              designer={p.designer}
              image={p.image}
              href={p.href}
              btnLabel="Купить"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
