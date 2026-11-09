import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrapper ${styles.inner}`}>
        <p className={styles.copy}>
          Registro de estudiantes · React, TypeScript y Cloud Firestore
        </p>

        <p className={styles.meta}>
          IF0009 Desarrollo de Software VI · UCR Sede de Occidente
        </p>
      </div>
    </footer>
  );
}
