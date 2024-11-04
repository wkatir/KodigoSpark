'use client';
import Login from './Login/Login';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import supabase from '@/utils/supabase';

const LoginForm = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) { 
      router.push('/dashboard'); 
    }
  }, [user, loading, router]);

  return (
    <div>
      {!user && <Login supabase={supabase} />} 
    </div>
  );
};

export default LoginForm;
