import { Navigate, useLocation } from 'react-router-dom';
import LoginForm from '../components/auth/login-form';
import { useAuth } from '../context/auth-context';
import styles from './login.module.css';

export default function Login() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  if (loading) {
    return (
      <main className={`wrapper ${styles.page}`}>
        <p className={styles.loading}>Cargando sesión…</p>
      </main>
    );
  }

  if (user) {
    return <Navigate to={from ?? '/'} replace />;
  }

  return (
    <main className={`wrapper ${styles.page}`}>
      <section className={styles.card}>
        <header className={styles.head}>
          <h1 className={styles.title}>Iniciar sesión</h1>
          <p className={styles.desc}>
            Accede con una cuenta creada en Firebase Authentication.
          </p>
        </header>

        <LoginForm />
      </section>
    </main>
  );
}
