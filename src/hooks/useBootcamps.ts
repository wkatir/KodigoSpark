import { useState, useEffect } from 'react';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { Bootcamp, FormInputs, Inscripcion } from '@/interfaces';

export const useBootcamps = (supabase: SupabaseClient) => {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchBootcamps();
        fetchInscripciones(user.id);
      }
    };
    getCurrentUser();
  }, []);

  const fetchBootcamps = async () => {
    try {
      const { data, error } = await supabase.from('bootcamps').select('*');
      if (error) throw error;
      if (data) setBootcamps(data);
    } catch (error) {
      console.error('Error cargando bootcamps:', error);
    }
  };

  const fetchInscripciones = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('inscripciones')
        .select('*')
        .eq('user_id', userId);
      if (error) throw error;
      if (data) setInscripciones(data);
    } catch (error) {
      console.error('Error cargando inscripciones:', error);
    }
  };

  const handleDesinscripcion = async (bootcampId: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('inscripciones')
        .delete()
        .eq('user_id', user.id)
        .eq('bootcamp_id', bootcampId);

      if (error) throw error;
      
      fetchInscripciones(user.id);
      alert('Desinscripción exitosa');
    } catch (error) {
      console.error('Error en la desinscripción:', error);
      alert('Error al procesar la desinscripción');
    }
  };

  const handleInscripcion = async (data: FormInputs, bootcampId: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('inscripciones')
        .insert([
          {
            user_id: user.id,
            bootcamp_id: bootcampId,
            fecha_inscripcion: new Date(),
            ...data
          }
        ]);

      if (error) throw error;
      
      fetchInscripciones(user.id);
      alert('Inscripción exitosa');
      return true;
    } catch (error) {
      console.error('Error en la inscripción:', error);
      alert('Error al procesar la inscripción');
      return false;
    }
  };

  const isInscrito = (bootcampId: number): boolean => {
    return inscripciones.some(inscripcion => inscripcion.bootcamp_id === bootcampId);
  };

  return {
    bootcamps,
    user,
    isInscrito,
    handleDesinscripcion,
    handleInscripcion,
    handleLogout: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión');
      }
    }
  };
};
