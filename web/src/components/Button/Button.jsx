import { ArrowDownRight } from 'lucide-react';
import styles from './Button.module.css';

export default function Button({
  children,
  as: Component = 'button',
  variant = 'accent',
  size = 'md',
  icon = false,
  className = '',
  ...props
}) {
  return (
    <Component className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`} {...props}>
      <span>{children}</span>
      {icon && <ArrowDownRight size={16} strokeWidth={2.2} aria-hidden="true" />}
    </Component>
  );
}
