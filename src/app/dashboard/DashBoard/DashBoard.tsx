import { useBootcamps } from '@/hooks/useBootcamps';
import { BootcampList } from './components/BootcampList/BootcampList';
import { InscripcionForm } from './components/InscriptionForm/InscriptionForm';
import { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Bootcamps Disponibles</h1>
        <div>
          <span>Usuario: {user.email}</span>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
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
  );
}