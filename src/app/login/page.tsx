'use client';
import supabase from '@/utils/supabase';
import Login from './Login/Login';
import { useAuth } from '@/hooks/useAuth'; // Asumiendo que este hook devuelve el estado de autenticación
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginForm = () => {
  const user = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard'); 
    }
  }, [user, router]);

  return (
    <div>
      {!user && <Login supabase={supabase} />} 
    </div>
  );
};

export default LoginForm;
