import { Bootcamp } from '@/interfaces';

interface BootcampListProps {
    bootcamps: Bootcamp[];
    isInscrito: (bootcampId: number) => boolean;
    onDesinscripcion: (bootcampId: number) => void;
    onInscripcion: (bootcampId: number) => void;
  }
  
  export const BootcampList: React.FC<BootcampListProps> = ({
    bootcamps,
    isInscrito,
    onDesinscripcion,
    onInscripcion
  }) => {
    return (
      <div>
        {bootcamps.map((bootcamp) => (
          <div key={bootcamp.id}>
            <h2>{bootcamp.nombre}</h2>
            <img 
              src={bootcamp.imagen_url} 
              alt={bootcamp.nombre}
              style={{ maxWidth: '300px' }}
            />
            <p>{bootcamp.descripcion}</p>
            {isInscrito(bootcamp.id) ? (
              <button onClick={() => onDesinscripcion(bootcamp.id)}>
                Desinscribirse
              </button>
            ) : (
              <button onClick={() => onInscripcion(bootcamp.id)}>
                Inscribirse
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };