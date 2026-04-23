import ProductCard from '../../../entities/product/ui/ProductCard'
import { AUTUMN_PRODUCTS } from '../../../entities/product/model/products'
import styles from './SeasonCollection.module.css'

export default function SeasonCollection() {
  return (
    <section className={styles.section} aria-label="Осенняя одежда">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.tag}>КОЛЛЕКЦИЯ</p>
            <h2 className={styles.title}>Осенняя одежда</h2>
          </div>
          <p className={styles.desc}>
            Отборные вещи от лучших дизайнеров бутиков —<br />
            тепло, стиль и характер в каждом образе
          </p>
        </div>

        <div className={styles.grid}>
          {AUTUMN_PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              designer={p.designer}
              image={p.image}
              href={p.href}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
