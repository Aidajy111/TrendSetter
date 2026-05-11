import { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, title, children, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <section className={styles.modal} onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Закрыть">
            <X size={22} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
