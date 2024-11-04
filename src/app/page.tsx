'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login'); 
    } else {
      router.push('/dashboard');
    }
  }, [user, router]);

  return null; 
}