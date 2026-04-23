import styles from './Button.module.css'

/**
 * @param {'primary'|'secondary'|'outline'|'ghost'|'glass'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {string} [as] — тег-полиморф: 'button' | 'a'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className = '',
  ...props
}) {
  return (
    <Tag
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
