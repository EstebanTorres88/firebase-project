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
      PASO 5 · Guardar el estudiante en Cloud Firestore
      ======================================================================

      1. Agrega estos dos imports al inicio del archivo, debajo del último
         import que ya existe:

           import { addDoc, collection } from 'firebase/firestore';
           import { db } from '../firebase';

      2. Reemplaza la línea `console.log(...)` por esta:

           await addDoc(collection(db, 'students'), input);

      ----------------------------------------------------------------------
      Métodos utilizados
      ----------------------------------------------------------------------

      collection(db, 'students')
        Recibe:   db, la instancia de Firestore que exporta src/firebase.ts.
                  'students', el nombre de la colección.
        Propósito: devolver una referencia a la colección. Si todavía no
                  existe, Firestore la crea al guardar el primer documento.

      addDoc(referencia, input)
        Recibe:   la referencia de la colección y el objeto con los campos
                  del estudiante (name, email, career).
        Propósito: crear un documento nuevo con un ID automático y guardarlo
                  en la colección. Devuelve una promesa; si falla, el
                  formulario muestra el mensaje de error.
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
