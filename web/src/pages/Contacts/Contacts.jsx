import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import styles from './Contacts.module.css';

const contacts = [
  { icon: Phone, label: 'Телефон', value: '+7 (924) 000-24-24' },
  { icon: Mail, label: 'Email', value: 'hello@trendsetter.ru' },
  { icon: MapPin, label: 'Город', value: 'Улан-Удэ, онлайн-платформа' },
];

export default function Contacts() {
  return (
    <main className={styles.contacts}>
      <section className={styles.hero}>
        <div>
          <p>Контакты</p>
          <h1>Свяжитесь с командой TrendSetter</h1>
          <span>Ответим по вопросам заказов, дизайнеров, кастомизации и подключения бренда.</span>
        </div>
        <div className={styles.quickLinks}>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <a href="https://telegram.org/" target="_blank" rel="noreferrer">
            <Send size={18} />
            Telegram
          </a>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.cards}>
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.label}>
                <Icon size={24} />
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              </article>
            );
          })}
        </div>

        <form className={styles.form}>
          <h2>Напишите нам</h2>
          <input type="text" placeholder="Ваше имя" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Сообщение" rows="5" />
          <button type="button">Отправить сообщение</button>
        </form>
      </section>
    </main>
  );
}
