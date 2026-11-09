import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/auth-context';
import type { LoginRequest } from '../../types/auth';
import Button from '../ui/button';
import styles from './login-form.module.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Traduce el error de Firebase Auth a un mensaje para la persona.
 * Los códigos están documentados en la sección "Auth error codes" de Firebase.
 */
function messageForError(error: unknown): string {
  const code = (error as { code?: string }).code;

  if (
    code === 'auth/invalid-credential' ||
    code === 'auth/wrong-password' ||
    code === 'auth/user-not-found'
  ) {
    return 'Correo o contraseña incorrectos.';
  }

  if (code === 'auth/too-many-requests') {
    return 'Demasiados intentos. Espera unos minutos.';
  }

  if (code === 'auth/invalid-email') {
    return 'El correo no tiene un formato válido.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No se pudo iniciar sesión. Intenta de nuevo.';
}

/**
 * Formulario de inicio de sesión.
 *
 * No navega después del login: el cambio de `user` lo detecta la página de
 * login y redirige. Así se evita redirigir antes de que el observador de
 * sesión haya actualizado el estado.
 */
export default function LoginForm() {
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    defaultValues: { email: '', password: '' },
  });

  const submit = async (input: LoginRequest) => {
    setSubmitError(null);

    try {
      await login(input.email, input.password);
    } catch (caught) {
      setSubmitError(messageForError(caught));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
      <p className={styles.group}>
        <label htmlFor="login-email">Correo electrónico</label>

        <span className={styles.field}>
          <Mail
            className={styles.icon}
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <input
            id="login-email"
            type="email"
            placeholder="ana.rodriguez@ucr.ac.cr"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email', {
              required: 'Escribe el correo electrónico.',
              pattern: {
                value: EMAIL_PATTERN,
                message:
                  'Escribe un correo válido, por ejemplo nombre@ucr.ac.cr.',
              },
            })}
          />
        </span>

        {errors.email && (
          <span className={styles.error} role="alert">
            {errors.email.message}
          </span>
        )}
      </p>

      <p className={styles.group}>
        <label htmlFor="login-password">Contraseña</label>

        <span className={styles.field}>
          <Lock
            className={styles.icon}
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <input
            id="login-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            {...register('password', {
              required: 'Escribe la contraseña.',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres.',
              },
            })}
          />
        </span>

        {errors.password && (
          <span className={styles.error} role="alert">
            {errors.password.message}
          </span>
        )}
      </p>

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      <footer className={styles.actions}>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando…' : 'Iniciar sesión'}
        </Button>
      </footer>
    </form>
  );
}
