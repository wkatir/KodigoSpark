import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SupabaseClient } from '@supabase/supabase-js';

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
    <div>
      <h1>{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h1>
      <form onSubmit={handleSubmit(handleAuth)}>
        <div>
          <label>
            Email:
            <input
              type="email"
              {...register('email', { required: 'Email es requerido' })}
            />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>
            Contraseña:
            <input
              type="password"
              {...register('password', {
                required: 'Contraseña es requerida',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
            />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading
            ? 'Cargando...'
            : isRegistering
            ? 'Registrarse'
            : 'Iniciar Sesión'}
        </button>
      </form>

      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? '¿Ya tienes cuenta? Inicia sesión'
          : '¿No tienes cuenta? Regístrate'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={async () => {
            const { data } = await supabase.auth.getSession();
            console.log('Sesión actual:', data);
          }}
        >
          Verificar Sesión (ver consola)
        </button>
      </div>
    </div>
  );
}
