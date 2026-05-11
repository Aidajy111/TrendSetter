import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import styles from './Auth.module.css';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('trendsetter-token', 'mock-token');
    navigate('/profile');
  };

  return (
    <main className={styles.authPage}>
      <section className={styles.card}>
        <Link className={styles.logo} to="/">
          TREND<span>/</span>SETTER
        </Link>
        <h1>Регистрация</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input label="Имя" placeholder="Ваше имя" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Пароль" type="password" placeholder="Придумайте пароль" />
          <Button type="submit">Зарегистрироваться</Button>
        </form>
        <Link className={styles.switch} to="/login">
          Уже есть аккаунт
        </Link>
      </section>
    </main>
  );
}
