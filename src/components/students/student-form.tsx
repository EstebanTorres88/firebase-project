import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BookOpen, Mail, UserRound } from 'lucide-react';
import { CAREERS } from '../../constants/students';
import type { StudentRequest } from '../../types/student';
import Button from '../ui/button';
import styles from './student-form.module.css';

interface StudentFormProps {
  onSubmit: (input: StudentRequest) => Promise<void>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StudentForm({ onSubmit }: StudentFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentRequest>({
    defaultValues: { name: '', email: '', career: '' },
  });

  const submit = async (input: StudentRequest) => {
    setSubmitError(null);

    try {
      await onSubmit(input);
      reset();
    } catch (caught) {
      setSubmitError(
        caught instanceof Error
          ? caught.message
          : 'No fue posible guardar el estudiante.',
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)} noValidate>
      <div className={styles.row}>
        {/* Nombre */}
        <p className={styles.group}>
          <label htmlFor="student-name">Nombre completo</label>

          <span className={styles.field}>
            <UserRound
              className={styles.icon}
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <input
              id="student-name"
              type="text"
              placeholder="Ana María Rodríguez"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              {...register('name', {
                required: 'Escribe el nombre completo.',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres.',
                },
              })}
            />
          </span>

          {errors.name && (
            <span className={styles.error} role="alert">
              {errors.name.message}
            </span>
          )}
        </p>

        {/* Correo */}
        <p className={styles.group}>
          <label htmlFor="student-email">Correo electrónico</label>

          <span className={styles.field}>
            <Mail
              className={styles.icon}
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <input
              id="student-email"
              type="email"
              placeholder="ana.rodriguez@ucr.ac.cr"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email', {
                required: 'Escribe el correo electrónico.',
                pattern: {
                  value: EMAIL_PATTERN,
                  message: 'Escribe un correo válido, por ejemplo nombre@ucr.ac.cr.',
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
      </div>

      {/* Carrera */}
      <p className={styles.group}>
        <label htmlFor="student-career">Carrera</label>

        <span className={styles.field}>
          <BookOpen
            className={styles.icon}
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <select
            id="student-career"
            aria-invalid={Boolean(errors.career)}
            {...register('career', {
              required: 'Selecciona una carrera.',
            })}
          >
            <option value="" disabled>
              Selecciona una carrera
            </option>

            {CAREERS.map((career) => (
              <option key={career} value={career}>
                {career}
              </option>
            ))}
          </select>
        </span>

        {errors.career && (
          <span className={styles.error} role="alert">
            {errors.career.message}
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
          {isSubmitting ? 'Guardando…' : 'Registrar estudiante'}
        </Button>
      </footer>
    </form>
  );
}
