import type { ReactNode } from 'react';
import styles from './section-header.module.css';

interface Props {
  title: string;
  desc: string;
  children?: ReactNode;
}

/**
 * Encabezado de página: título, descripción y un espacio opcional a la derecha
 * para acciones (por ejemplo, el botón que navega al formulario).
 */
export default function SectionHeader({ title, desc, children }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.copy}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>{desc}</p>
      </div>

      {children && <div className={styles.actions}>{children}</div>}
    </header>
  );
}
