import { useBootcamps } from '@/hooks/useBootcamps';
import { BootcampList } from './components/BootcampList/BootcampList';
import { InscripcionForm } from './components/InscriptionForm/InscriptionForm';
import { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Navbar } from '@/shared/components/Navbar/Navbar';
import styles from '@/app/dashboard/DashBoard/DashBoard.module.css';

export default function Dashboard({ supabase }: { supabase: SupabaseClient }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedBootcamp, setSelectedBootcamp] = useState<number | null>(null);

  const {
    bootcamps,
    user,
    isInscrito,
    handleDesinscripcion,
    handleInscripcion,
    handleLogout
  } = useBootcamps(supabase);

  if (!user) {
    return <div>Por favor, inicia sesión para ver los bootcamps</div>;
  }

  const selectedBootcampData = bootcamps.find(b => b.id === selectedBootcamp) ?? null;

  return (
    <>
      <div className={styles.header}>
        <Navbar />
        <div className={styles.user}>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div>
        <div className={styles.title}>
          <h2>Bootcamps <span>Disponibles</span></h2>
        </div>

        <BootcampList
          bootcamps={bootcamps}
          isInscrito={isInscrito}
          onDesinscripcion={handleDesinscripcion}
          onInscripcion={(bootcampId) => {
            setSelectedBootcamp(bootcampId);
            setShowForm(true);
          }}
        />

        {showForm && selectedBootcamp && (
          <InscripcionForm
            selectedBootcamp={selectedBootcampData}
            onSubmit={async (data) => {
              const success = await handleInscripcion(data, selectedBootcamp);
              if (success) {
                setShowForm(false);
                setSelectedBootcamp(null);
              }
            }}
            onCancel={() => {
              setShowForm(false);
              setSelectedBootcamp(null);
            }}
          />
        )}
      </div>
    </>
  );
}