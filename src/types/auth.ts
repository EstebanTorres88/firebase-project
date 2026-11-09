/**
 * Usuario con sesión iniciada, reducido a los dos campos que usa la interfaz.
 * El objeto completo de Firebase Auth tiene muchas más propiedades; aquí solo
 * se conservan las necesarias.
 */
export interface SessionUser {
  uid: string;
  email: string | null;
}

/**
 * Datos que captura el formulario de inicio de sesión.
 */
export interface LoginRequest {
  email: string;
  password: string;
}
