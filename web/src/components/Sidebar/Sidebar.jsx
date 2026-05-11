import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar({ items }) {
  return (
    <aside className={styles.sidebar}>
      {items.map((item) => (
        <NavLink key={item.to} to={item.to}>
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
