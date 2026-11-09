/**
 * Datos que el formulario captura y entrega a la aplicación.
 * Son exactamente los tres campos que el usuario escribe.
 */
export interface StudentRequest {
  name: string;
  email: string;
  career: string;
}

/**
 * Estudiante ya guardado. Añade el identificador del documento, que lo genera
 * Firestore y no el formulario.
 */
export interface Student extends StudentRequest {
  id: string;
}
