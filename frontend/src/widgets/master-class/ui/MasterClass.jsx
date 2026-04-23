import Button from '../../../shared/ui/Button/Button'
import { ArrowRightIcon } from '../../../shared/ui/icons/index'
import styles from './MasterClass.module.css'

export default function MasterClass() {
  return (
    <section className={styles.section} aria-label="Мастер-классы">
      <div className={styles.container}>
        {/* Левая часть: текст */}
        <div className={styles.left}>
          <p className={styles.tag}>ОБУЧЕНИЕ</p>
          <h2 className={styles.title}>Мастер-классы</h2>
          <p className={styles.desc}>
            Учись у лучших — наши дизайнеры проводят живые мастер-классы
            по кастомизации, крою и созданию авторских образов.
            Для начинающих и опытных мастеров.
          </p>
          <ul className={styles.list}>
            <li>Кастомизация одежды с нуля</li>
            <li>Апсайклинг — вторая жизнь любимых вещей</li>
            <li>Авторская вышивка и принт</li>
            <li>Построение образа и стиль-консультация</li>
          </ul>
          <Button variant="primary" size="md" as="a" href="/masterclass">
            Записаться
            <ArrowRightIcon size={16} />
          </Button>
        </div>

        {/* Правая часть: фото */}
        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop&q=80"
              alt="Мастер-класс по моде"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.badge}>
              <span className={styles.badgeNum}>12+</span>
              <span className={styles.badgeText}>мастер-классов<br />в месяц</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
