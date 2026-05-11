import { Link } from 'react-router-dom';
import { ArrowDownRight, Clock, Sparkles, TrendingUp } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { products } from '../../data/mockProducts.js';
import runwayModel from '../../assets/images/home/runway-model.jpg';
import streetFashion from '../../assets/images/home/street-fashion.jpg';
import styles from './NewArrivals.module.css';

const drops = [
  { title: 'Drop 01', text: 'верхняя одежда, жакеты, унисекс-силуэты', icon: Sparkles },
  { title: '48 часов', text: 'новые изделия попадают в быструю подборку', icon: Clock },
  { title: 'Тренды недели', text: 'streetwear, крафт, кастомные детали', icon: TrendingUp },
];

export default function NewArrivals() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <img src={runwayModel} alt="Новая коллекция TrendSetter" />
        <div>
          <span>Новинки</span>
          <h1>Свежие дропы дизайнерской одежды</h1>
          <p>Подборка вещей, которые только появились на платформе: новые бренды, свежие капсулы и модели для примерки.</p>
          <Link to="/catalog">
            Открыть весь каталог
            <ArrowDownRight size={18} />
          </Link>
        </div>
      </section>

      <section className={styles.drops}>
        {drops.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon size={28} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className={styles.products}>
        <div className={styles.heading}>
          <div>
            <span>витрина</span>
            <h2>Новые поступления</h2>
          </div>
          <img src={streetFashion} alt="Streetwear образ" />
        </div>
        <div className={styles.grid}>
          {[...products, ...products].slice(0, 6).map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={{ ...product, id: `${product.id}-${index}` }} />
          ))}
        </div>
      </section>
    </main>
  );
}
