import type { SessionUser } from '../types/auth';

// ==========================================================================
// PASO 2 · Autenticación con correo y contraseña
// Descomenta el bloque y sustituyelo por el bloque de abajo actual.
// ==========================================================================

/*
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

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
