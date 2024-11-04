import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SupabaseClient } from '@supabase/supabase-js';
import styles from '@/app/components/Login/Login.module.css';
import { FaCircleUser } from 'react-icons/fa6';
import { RiLockPasswordFill } from 'react-icons/ri';

interface LoginProps {
  supabase: SupabaseClient;
}

interface FormInputs {
  email: string;
  password: string;
}

export default function Login({ supabase }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth: SubmitHandler<FormInputs> = async ({ email, password }) => {
    setLoading(true);

    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data) {
          alert('Revisa tu email para confirmar tu cuenta');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (error) {
      alert(error || 'Error en la autenticación');
      console.error('Error de auth:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Kodigo Spark</h1>
      <form onSubmit={handleSubmit(handleAuth)} className={styles.login}>
        <h2>{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
        <div>
          <label>
            <FaCircleUser />
          </label>
          <input
            type="email"
            {...register('email', { required: 'Email es requerido' })}
            placeholder='Correo electrónico'
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>
            <RiLockPasswordFill />

            <input
              type="password"
              {...register('password', {
                required: 'Contraseña es requerida',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
              placeholder='Contraseña'
            />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={loading} className={styles.signin}>
          {loading
            ? 'Cargando...'
            : isRegistering
              ? 'Registrarse'
              : 'Iniciar Sesión'}
        </button>

        <p>
          {isRegistering
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate'}
        </p>
        <button onClick={() => setIsRegistering(!isRegistering)} className={styles.register}>
          {isRegistering ? 'Inicia sesión' : 'Regístrate'}
        </button>
      </form>
    </div>
  );
}
