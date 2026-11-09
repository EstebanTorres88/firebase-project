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
          PASO 4 · Leer los estudiantes desde Cloud Firestore
          ==================================================================

          1. Imports:

               import { collection, getDocs } from 'firebase/firestore';
               import { db } from '../firebase';

          2. Reemplaza setStudents([]) por:

               const snapshot = await getDocs(collection(db, 'students'));

               setStudents(
                 snapshot.docs.map((document) => ({
                   id: document.id,
                   ...(document.data() as Omit<Student, 'id'>),
                 })),
               );
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
