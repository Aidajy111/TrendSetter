import { useEffect, useState } from 'react';
import { Download, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import resultPhoto from '../../assets/images/home/street-fashion.jpg';
import styles from './TryOnModal.module.css';

export default function TryOnModal({ isOpen, onClose, productImage }) {
  const [step, setStep] = useState('upload');
  const [isAccepted, setIsAccepted] = useState(true);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setStep('upload');
    setPreview('');
  }, [isOpen]);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <button className={styles.close} type="button" onClick={onClose} aria-label="Закрыть">
        <X size={34} />
      </button>

      {step === 'upload' ? (
        <section className={styles.uploadModal} role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
          <h2>Загрузите свое фото</h2>
          <p>Загрузите свое фото на которое хотите примерить одежду. Лучше фото в полном росте</p>
          <div className={styles.uploadGrid}>
            <div>
              <span>Товар</span>
              <div className={styles.productThumb}>
                <img src={productImage} alt="Товар" />
              </div>
            </div>
            <strong>Ваша изображение</strong>
            <div>
              <span>Ваша изображение</span>
              <label className={styles.photoUpload}>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                {preview ? <img src={preview} alt="Ваше фото" /> : <Plus size={58} />}
              </label>
            </div>
          </div>
          <button className={styles.primary} type="button" disabled={!isAccepted} onClick={() => setStep('result')}>
            Примерить одежду
          </button>
          <label className={styles.agreement}>
            <input type="checkbox" checked={isAccepted} onChange={(event) => setIsAccepted(event.target.checked)} />
            <span>Согласен на обработку персональных данных</span>
          </label>
        </section>
      ) : (
        <section className={styles.resultModal} role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
          <div className={styles.resultImage}>
            <img src={preview || resultPhoto} alt="Результат примерки" />
            <button type="button" aria-label="Скачать результат">
              <Download size={22} />
            </button>
          </div>
          <div className={styles.resultSide}>
            <p>Добавьте свои детали и закажите кастомную одежду лично у дизайнера</p>
            <textarea defaultValue="Убрать пуговицы у куртки и воротничек побольше" />
            <button className={styles.primary} type="button" onClick={() => setStep('upload')}>
              Попробовать еще
            </button>
            <div className={styles.actionRow}>
              <Link to="/chat">Чат с дизайнером</Link>
              <button type="button">Добавить в корзину</button>
            </div>
            <label className={styles.agreement}>
              <input type="checkbox" defaultChecked />
              <span>Согласен на обработку персональных данных</span>
            </label>
            <div className={styles.uploadGridSmall}>
              <div>
                <span>Товар</span>
                <div className={styles.productThumb}>
                  <img src={productImage} alt="Товар" />
                </div>
              </div>
              <strong>
                Ваша изображение
                <small>••••</small>
              </strong>
              <div>
                <span>Ваша изображение</span>
                <label className={styles.photoUpload}>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} />
                  {preview ? <img src={preview} alt="Ваше фото" /> : <Plus size={52} />}
                </label>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
