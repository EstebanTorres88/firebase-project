import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/section-header';
import StudentForm from '../components/students/student-form';
import Button from '../components/ui/button';
import type { StudentRequest } from '../types/student';
import styles from './student-new.module.css';

export default function StudentNew() {
  const navigate = useNavigate();

  const handleSubmit = async (input: StudentRequest) => {
    /*
      ======================================================================
      PASO 3 · Guardar el estudiante en Cloud Firestore
      ======================================================================

      1. Imports:

           import { addDoc, collection } from 'firebase/firestore';
           import { db } from '../firebase';

      2. Reemplaza el console.log por:

           await addDoc(collection(db, 'students'), input);
    */
    console.log('Estudiante capturado por el formulario:', input);

    navigate('/');
  };

  return (
    <main className={`wrapper ${styles.page}`}>
      <SectionHeader
        title="Registrar estudiante"
        desc="Completa los tres campos. El formulario valida el nombre, el formato del correo y la carrera antes de entregar los datos."
      >
        <Button variant="secondary" onClick={() => navigate('/')}>
          Volver a la lista
        </Button>
      </SectionHeader>

      <section className={styles.card}>
        <StudentForm onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
