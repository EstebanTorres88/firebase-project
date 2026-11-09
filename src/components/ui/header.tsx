import { GraduationCap, LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import Button from './button';
import styles from './header.module.css';

/**
 * Barra superior con la marca, la navegación principal y la sesión actual.
 *
 * `NavLink` es la versión de `Link` que conoce la ruta activa: recibe una
 * función en `className` y aplica el estilo solo cuando la ruta coincide.
 */
export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={`wrapper ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">
            <GraduationCap size={20} strokeWidth={1.8} />
          </span>
          <span className={styles.brandText}>
            Registro de estudiantes
            <span className={styles.brandMeta}>Firebase · Firestore</span>
          </span>
        </Link>

        <div className={styles.actions}>
          <nav aria-label="Navegación principal">
            <ul className={styles.nav}>
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                >
                  Lista
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/registrar"
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                >
                  Registrar
                </NavLink>
              </li>
            </ul>
          </nav>

          {user && (
            <div className={styles.session}>
              <span className={styles.email} title={user.email ?? ''}>
                {user.email}
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
              >
                <LogOut size={15} strokeWidth={1.8} aria-hidden="true" />
                <span className={styles.logoutLabel}>Cerrar sesión</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
