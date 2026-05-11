import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Building2, FileCheck2, Image, Store, UploadCloud } from 'lucide-react';
import {
  emptySellerApplication,
  readSellerApplication,
  saveSellerApplication,
  sellerStatuses,
} from '../../data/mockSellers.js';
import styles from './SellerApplication.module.css';

const sellerTypes = ['самозанятый дизайнер', 'индивидуальный предприниматель', 'ООО / компания', 'представитель бренда'];
const categoryOptions = ['верхняя одежда', 'streetwear', 'платья', 'костюмы', 'апсайкл', 'аксессуары'];

export default function SellerApplication() {
  const [form, setForm] = useState(() => readSellerApplication());
  const status = sellerStatuses[form.status] || sellerStatuses.none;

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleCategory = (category) => {
    const current = form.categories ? form.categories.split(',').map((item) => item.trim()).filter(Boolean) : [];
    const next = current.includes(category) ? current.filter((item) => item !== category) : [...current, category];
    update('categories', next.join(', '));
  };

  const attachFile = (field, file) => {
    update(field, file?.name || '');
  };

  const submitApplication = (event) => {
    event.preventDefault();
    const next = {
      ...emptySellerApplication,
      ...form,
      status: 'pending',
      publicProfileComplete: Boolean(form.brandName && form.brandDescription),
      submittedAt: new Date().toLocaleString('ru-RU'),
    };
    saveSellerApplication(next);
    setForm(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setDemoStatus = (nextStatus) => {
    const next = {
      ...form,
      status: nextStatus,
      publicProfileComplete: nextStatus === 'approved' ? true : form.publicProfileComplete,
    };
    saveSellerApplication(next);
    setForm(next);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p>Заявка продавца</p>
          <h1>Один аккаунт, две роли</h1>
          <span>Покупатель может подать заявку, пройти проверку и получить кабинет продавца без отдельной регистрации.</span>
        </div>
        <div className={`${styles.statusCard} ${styles[status.tone]}`}>
          <BadgeCheck size={24} />
          <span>Текущий статус</span>
          <strong>{status.label}</strong>
          {form.submittedAt && <small>Отправлено: {form.submittedAt}</small>}
        </div>
      </section>

      {form.status === 'approved' && (
        <section className={styles.approvedBar}>
          <div>
            <strong>Заявка одобрена</strong>
            <span>Кабинет продавца уже доступен, а публичный профиль бренда может появиться на странице дизайнеров.</span>
          </div>
          <Link to="/seller">Перейти в кабинет продавца</Link>
        </section>
      )}

      {form.status === 'pending' && (
        <section className={styles.approvedBar}>
          <div>
            <strong>Заявка на проверке</strong>
            <span>Пока проверка не завершена, кабинет продавца закрыт.</span>
          </div>
          <Link to="/seller">Проверить доступ</Link>
        </section>
      )}

      <form className={styles.form} onSubmit={submitApplication}>
        <section className={styles.panel}>
          <div className={styles.panelTitle}>
            <Store size={22} />
            <div>
              <p>Тип продавца</p>
              <h2>Кто подает заявку</h2>
            </div>
          </div>
          <div className={styles.typeGrid}>
            {sellerTypes.map((type) => (
              <button key={type} className={form.sellerType === type ? styles.selected : ''} type="button" onClick={() => update('sellerType', type)}>
                {type}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelTitle}>
            <Building2 size={22} />
            <div>
              <p>Данные продавца</p>
              <h2>Юридическая информация</h2>
            </div>
          </div>
          <div className={styles.fieldGrid}>
            <Input label="ФИО или название организации" value={form.sellerName} onChange={(value) => update('sellerName', value)} required />
            <Input label="ИНН" value={form.inn} onChange={(value) => update('inn', value)} required />
            <Input label="ОГРН или ОГРНИП" value={form.ogrn} onChange={(value) => update('ogrn', value)} />
            <Input label="Телефон" value={form.phone} onChange={(value) => update('phone', value)} required />
            <Input label="Email" value={form.email} onChange={(value) => update('email', value)} required />
            <Input label="Город" value={form.city} onChange={(value) => update('city', value)} required />
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelTitle}>
            <Image size={22} />
            <div>
              <p>Публичный бренд</p>
              <h2>Профиль магазина</h2>
            </div>
          </div>
          <div className={styles.fieldGrid}>
            <Input label="Название бренда" value={form.brandName} onChange={(value) => update('brandName', value)} required />
            <Input label="Социальные сети" value={form.socials} onChange={(value) => update('socials', value)} placeholder="Instagram, TikTok, VK" />
            <label className={styles.fullField}>
              Описание бренда
              <textarea value={form.brandDescription} onChange={(event) => update('brandDescription', event.target.value)} required />
            </label>
            <div className={styles.fullField}>
              <span className={styles.fieldLabel}>Категории товаров</span>
              <div className={styles.categoryGrid}>
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    className={(form.categories || '').includes(category) ? styles.selected : ''}
                    type="button"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <FileInput label="Логотип бренда" value={form.logoName} onChange={(file) => attachFile('logoName', file)} />
            <FileInput label="Обложка магазина" value={form.coverName} onChange={(file) => attachFile('coverName', file)} />
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelTitle}>
            <FileCheck2 size={22} />
            <div>
              <p>Документы</p>
              <h2>Проверка продавца</h2>
            </div>
          </div>
          <div className={styles.docsGrid}>
            <FileInput label="Документ, подтверждающий личность" value={form.identityDocument} onChange={(file) => attachFile('identityDocument', file)} />
            <FileInput label="Документ ИП или ООО" value={form.companyDocument} onChange={(file) => attachFile('companyDocument', file)} />
            <FileInput label="Банковские реквизиты" value={form.bankDetails} onChange={(file) => attachFile('bankDetails', file)} />
            <FileInput label="Сертификат или декларация" value={form.certificate} onChange={(file) => attachFile('certificate', file)} />
            <FileInput label="Право использования бренда" value={form.brandRights} onChange={(file) => attachFile('brandRights', file)} />
          </div>
        </section>

        <section className={styles.submitPanel}>
          <div>
            <strong>Отправить заявку на проверку</strong>
            <span>После отправки в профиле появится статус заявки. До одобрения кабинет продавца закрыт.</span>
          </div>
          <button type="submit">Отправить заявку</button>
        </section>
      </form>

      <section className={styles.demoPanel}>
        <div>
          <strong>Демо-проверка статусов</strong>
          <span>Пока нет backend и модератора, эти кнопки позволяют проверить все состояния интерфейса.</span>
        </div>
        <div>
          <button type="button" onClick={() => setDemoStatus('pending')}>На проверке</button>
          <button type="button" onClick={() => setDemoStatus('approved')}>Одобрено</button>
          <button type="button" onClick={() => setDemoStatus('rejected')}>Отклонено</button>
          <button type="button" onClick={() => setDemoStatus('blocked')}>Заблокировано</button>
        </div>
      </section>
    </main>
  );
}

function Input({ label, value, onChange, placeholder = '', required = false }) {
  return (
    <label>
      {label}
      <input value={value} placeholder={placeholder} required={required} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function FileInput({ label, value, onChange }) {
  return (
    <label className={styles.fileBox}>
      <UploadCloud size={22} />
      <span>{label}</span>
      <b>{value || 'Выбрать файл'}</b>
      <input type="file" onChange={(event) => onChange(event.target.files?.[0])} />
    </label>
  );
}
