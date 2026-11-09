import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/section-header';
import { StudentTable } from '../components/students/student-table';
import Button from '../components/ui/button';
import type { Student } from '../types/student';
import styles from './students.module.css';

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        /*
          ==================================================================
          PASO 5 · Leer los estudiantes desde Cloud Firestore
          ==================================================================

          1. Agrega estos dos imports al inicio del archivo, debajo del
             último import que ya existe:

               import { collection, getDocs } from 'firebase/firestore';
               import { db } from '../firebase';

          2. Reemplaza la línea `setStudents([]);` por este código:

               const snapshot = await getDocs(collection(db, 'students'));

               setStudents(
                 snapshot.docs.map((document) => ({
                   id: document.id,
                   ...(document.data() as Omit<Student, 'id'>),
                 })),
               );

          ------------------------------------------------------------------
          Métodos utilizados
          ------------------------------------------------------------------

          collection(db, 'students')
            Recibe:    db, la instancia de Firestore que exporta
                       src/firebase.ts. 'students', el nombre de la colección.
            Propósito: devolver una referencia a la colección.

          getDocs(referencia)
            Recibe:    la referencia de la colección.
            Propósito: leer todos los documentos una sola vez. Devuelve una
                       promesa con un QuerySnapshot.

          snapshot.docs
            Propósito: arreglo con los documentos leídos. Si la colección
                       está vacía, es un arreglo vacío.

          document.id
            Propósito: el identificador que Firestore generó al crear el
                       documento.

          document.data()
            Recibe:    nada.
            Propósito: devolver los campos del documento (name, email,
                       career) como un objeto.

        */
        setStudents([]);
      } catch (caught) {
        setError(
          caught instanceof Error
            ? caught.message
            : 'No fue posible leer los estudiantes.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  return (
    <main className={`wrapper ${styles.page}`}>
      <SectionHeader
        title="Estudiantes registrados"
        desc="Registros almacenados en Cloud Firestore. La lista se actualiza sin refrescar la página cuando se agrega un estudiante."
      >
        <Button onClick={() => navigate('/registrar')}>
          Registrar estudiante
        </Button>
      </SectionHeader>

      <section className={styles.body}>
        <StudentTable
          students={students}
          isLoading={isLoading}
          error={error}
        />
      </section>
    </main>
  );
}
