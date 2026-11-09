import { GraduationCap } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import styles from './header.module.css';

/**
 * Barra superior con la marca y la navegación principal.
 *
 * `NavLink` es la versión de `Link` que conoce la ruta activa: recibe una
 * función en `className` y aplica el estilo solo cuando la ruta coincide.
 */
export default function Header() {
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
      </div>
    </header>
  );
}
