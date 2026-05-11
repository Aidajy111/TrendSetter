import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDownRight, Percent } from 'lucide-react';
import Button from '../../components/Button/Button.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import { heroTiles, productSections, recommendations, sliders } from '../../data/mockHomeSections.js';
import styles from './Home.module.css';

function CategoryPill({ title }) {
  return (
    <span className={styles.categoryPill}>
      {title}
      <span>
        <ArrowDownRight size={16} />
      </span>
    </span>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className={styles.sectionHeading}>
      <span />
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <span />
    </div>
  );
}

function PromoSlider({ slider }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slider.slides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slider.slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slider.slides.length]);

  const showPrev = () => {
    setActiveIndex((index) => (index === 0 ? slider.slides.length - 1 : index - 1));
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % slider.slides.length);
  };

  return (
    <section className={styles.sliderSection}>
      <SectionHeading title={slider.title} subtitle={slider.subtitle} />
      <div className={styles.sliderCard}>
        <img src={activeSlide.image} alt={slider.title} />
        <p>{activeSlide.text}</p>
        <button className={`${styles.sliderArrow} ${styles.left}`} aria-label="Предыдущий слайд" type="button" onClick={showPrev}>
          <span aria-hidden="true" />
        </button>
        <button className={`${styles.sliderArrow} ${styles.right}`} aria-label="Следующий слайд" type="button" onClick={showNext}>
          <span aria-hidden="true" />
        </button>
        <div className={styles.dots}>
          {slider.slides.map((slide, index) => (
            <button
              key={`${slider.id}-${index}`}
              className={index === activeIndex ? styles.activeDot : ''}
              type="button"
              aria-label={`Показать слайд ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem('trendsetter-token')));
  }, [location.pathname]);

  return (
    <main className={styles.home}>
      <section className={`${styles.hero} container`}>
        <div className={styles.heroGrid}>
          {heroTiles.map((tile) => (
            <Link key={tile.id} to={tile.to} className={`${styles.heroTile} ${styles[tile.variant] || ''}`}>
              <img src={tile.image} alt={tile.title} />
              <CategoryPill title={tile.title} />
            </Link>
          ))}
        </div>
        <div className={styles.heroBottom}>
          <div>
            <h1>Работы лучших дизайнеров Бурятии</h1>
            <p>Из лучших бутиков по всей России и не только</p>
          </div>
          <Button as={Link} to="/catalog" icon className={styles.heroCta}>
            Смотреть все товары
          </Button>
        </div>
      </section>

      {!isAuthenticated && (
        <Link to="/login" className={styles.authStrip}>
          <Percent size={21} />
          Авторизуйтесь и получите выгоду
        </Link>
      )}

      {productSections.slice(0, 1).map((section) => (
        <section key={section.id} className={`${styles.productSection} container`}>
          <SectionHeading title={section.title} subtitle={section.subtitle} />
          <div className={styles.productsGrid}>
            {section.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.centerAction}>
            <Button as={Link} to="/catalog" variant="outline" icon>
              Смотреть все товары
            </Button>
          </div>
        </section>
      ))}

      {sliders.map((slider) => (
        <PromoSlider key={slider.id} slider={slider} />
      ))}

      {productSections.slice(1).map((section) => (
        <section key={section.id} className={`${styles.productSection} container`}>
          <SectionHeading title={section.title} subtitle={section.subtitle} />
          <div className={styles.productsGrid}>
            {section.products.map((product) => (
              <ProductCard key={`${section.id}-${product.id}`} product={product} />
            ))}
          </div>
          <div className={styles.centerAction}>
            <Button as={Link} to="/catalog" variant="outline" icon>
              Смотреть все товары
            </Button>
          </div>
        </section>
      ))}

      <section className={`${styles.recommendations} container`}>
        <SectionHeading title="Также можете посмотреть" subtitle="От лучших дизайнеров по всей России" />
        <div className={styles.recGrid}>
          {recommendations.map((item) => (
            <Link key={item.id} to="/catalog/business" className={`${styles.recTile} ${item.size === 'large' ? styles.recLarge : ''}`}>
              <img src={item.image} alt={item.title} />
              <CategoryPill title={item.title} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
