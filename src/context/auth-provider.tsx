import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { signIn, signOutUser, watchSession } from '../lib/auth';
import type { SessionUser } from '../types/auth';
import { AuthContext } from './auth-context';
import type { AuthContextValue } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Mantiene el estado de la sesión para toda la aplicación.
 *
 * `watchSession` se suscribe a los cambios de sesión. Es la única fuente de
 * verdad: el login y el logout no asignan el usuario directamente, solo
 * llaman a Firebase y esperan a que el observador notifique el cambio.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = watchSession((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        await signIn(email, password);
      },
      logout: async () => {
        await signOutUser();
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
