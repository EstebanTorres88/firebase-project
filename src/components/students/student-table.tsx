import type { Student } from '../../types/student';
import styles from './student-table.module.css';

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  error: string | null;
}

const COLUMNS = 3;

const getCountLabel = (count: number) =>
  count === 1 ? '1 estudiante registrado' : `${count} estudiantes registrados`;

export function StudentTable({ students, isLoading, error }: StudentTableProps) {
  const hasRows = !isLoading && !error && students.length > 0;

  return (
    <div className={styles.tableWrap}>
      <div className={styles.toolbar}>
        <h2 className={styles.heading}>Lista de estudiantes</h2>
        <span className={styles.count}>
          {isLoading ? 'Consultando…' : getCountLabel(students.length)}
        </span>
      </div>

      <table className={styles.table}>
        <caption className={styles.caption}>
          Estudiantes registrados en la colección students
        </caption>

        <thead>
          <tr>
            <th scope="col">Estudiante</th>
            <th scope="col">Correo</th>
            <th scope="col">Carrera</th>
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td className={styles.message} colSpan={COLUMNS}>
                Cargando estudiantes…
              </td>
            </tr>
          )}

          {!isLoading && error && (
            <tr>
              <td className={`${styles.message} ${styles.messageError}`} colSpan={COLUMNS} role="alert">
                {error}
              </td>
            </tr>
          )}

          {!isLoading && !error && students.length === 0 && (
            <tr>
              <td className={styles.message} colSpan={COLUMNS}>
                Todavía no hay estudiantes registrados. Usa el botón
                «Registrar estudiante» para agregar el primero.
              </td>
            </tr>
          )}

          {hasRows &&
            students.map((student) => (
              <tr key={student.id} className={styles.row}>
                <th scope="row" className={styles.nameCell} data-label="Estudiante">
                  {student.name}
                </th>

                <td className={styles.emailCell} data-label="Correo">
                  {student.email}
                </td>

                <td className={styles.careerCell} data-label="Carrera">
                  <span className={styles.career}>{student.career}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
