import type { SessionUser } from '../types/auth';

// ==========================================================================
// PASO 4 · Autenticación con correo y contraseña
// ==========================================================================
// --------------------------------------------------------------------------
// Qué hace cada parte del código que vas a descomentar
// --------------------------------------------------------------------------
//
// onAuthStateChanged(auth, onChange)
//   Recibe:    auth, la instancia de Firebase Auth que exporta
//              src/firebase.ts, y onChange, la función que recibe el
//              usuario actual o null.
//   Propósito: avisar cuando cambia la sesión. Se ejecuta una vez al cargar
//              la página y otra vez en cada inicio o cierre de sesión.
//              Devuelve una función que cancela la suscripción.
//
// signInWithEmailAndPassword(auth, correo, contrasena)
//   Recibe:    auth, el correo y la contraseña escritos en el formulario.
//   Propósito: iniciar sesión con una cuenta existente. Devuelve una promesa
//              con el usuario autenticado. Si las credenciales son
//              incorrectas, la promesa se rechaza.
//
// signOut(auth)
//   Recibe:    auth.
//   Propósito: cerrar la sesión actual. Después, onAuthStateChanged se
//              ejecuta otra vez con null.
//
// El observador es la única fuente de verdad de la sesión. No asignes el
// usuario a mano después del login: el observador ya lo hace, y dos fuentes
// de verdad pueden desincronizarse.

/*
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Recibe:    la función que se ejecuta cuando cambia la sesión.
// Propósito: suscribirse a los cambios de sesión y devolver la función que
export function watchSession(onChange: (user: SessionUser | null) => void) {
  return onAuthStateChanged(auth, onChange);
}

export async function signIn(
  email: string,
  password: string,
): Promise<SessionUser> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}


export async function signOutUser(): Promise<void> {
  await signOut(auth);
}
*/

// --------------------------------------------------------------------------
// Respaldo: se borra al descomentar el bloque de arriba.
// Mantiene la aplicación compilando y navegable sin Firebase.
// --------------------------------------------------------------------------
export function watchSession(onChange: (user: SessionUser | null) => void) {
  onChange(null);
  return () => { };
}

export async function signIn(
  _email: string,
  _password: string,
): Promise<SessionUser> {
  throw new Error('Firebase Auth no está conectado.');
}

export async function signOutUser(): Promise<void> { }
