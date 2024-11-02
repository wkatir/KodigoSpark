'use client';
import { useAuth } from '@/hooks/useAuth';
import Dashboard from './dashboard/DashBoard/DashBoard';
import styles from './page.module.css';
import supabase from '@/utils/supabase';
import Login from './components/Login';


export default function Home() {
  const user = useAuth();

  return (
    <div>
      {!user ? (
        <Login supabase={supabase} />
      ) : (
        <Dashboard supabase={supabase} />
      )}
    </div>
  );
}