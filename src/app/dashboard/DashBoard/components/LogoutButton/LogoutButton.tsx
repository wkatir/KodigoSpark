// LogoutButton.tsx
'use client';
import { useAuth } from '@/context/AuthContext';
import supabase from '@/utils/supabase';
import { useRouter } from 'next/navigation'; 

const LogoutButton = () => {
  const { user } = useAuth(); 
  const router = useRouter(); 

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); 
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      router.push('/login'); 
    }
  };

  return (
    user && ( 
      <button onClick={handleLogout} className="logout-button">
        Cerrar Sesión
      </button>
    )
  );
};

export default LogoutButton;
