// ==========================================================================
// PASO 3 · Conexión con Firebase
// ==========================================================================
//
// 1. Instala el SDK:
//      pnpm add firebase
//
// 2. Copia el objeto de configuración desde la consola:
//      Descripción general del proyecto > Tus apps > Configuración del SDK.
//
// 3. Descomenta el bloque de código de abajo. Para hacerlo, borra:
//      - la línea que contiene solo  /*
//      - la línea que contiene solo  */
//
// 4. Reemplaza cada valor vacío de firebaseConfig por el de tu proyecto.
//
// Las claves de una app web son identificadores públicos, no secretos. El
// acceso real lo controlan las reglas de Firestore.
//
// --------------------------------------------------------------------------
// Qué hace cada parte del código que vas a descomentar
// --------------------------------------------------------------------------
//
// initializeApp(firebaseConfig)
//   Recibe:    el objeto con los valores del proyecto.
//   Propósito: registrar la aplicación en el SDK. Se ejecuta una sola vez y
//              devuelve la instancia de la app.
//
// getFirestore(app)
//   Recibe:    la app registrada.
//   Propósito: crear o recuperar la instancia de Cloud Firestore asociada a
//              esa app. Es la conexión que usan addDoc y getDocs.
//
// getAuth(app)
//   Recibe:    la app registrada.
//   Propósito: crear o recuperar la instancia de Firebase Authentication
//              asociada a esa app. Es la conexión que usa el login.

/*
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
*/
