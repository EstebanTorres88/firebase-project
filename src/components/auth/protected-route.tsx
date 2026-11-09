import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import styles from './protected-route.module.css';

/**
 * Envoltorio de las rutas que exigen sesión iniciada.
 *
 * Mientras `loading` es true todavía no se sabe si hay sesión: se muestra un
 * mensaje en lugar de redirigir, para no expulsar al usuario al recargar.
 * Si ya se sabe que no hay usuario, se redirige a /login y se guarda la ruta
 * de origen para volver después del login.
 */
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className={`wrapper ${styles.page}`}>
        <p className={styles.message}>Cargando sesión…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
}
