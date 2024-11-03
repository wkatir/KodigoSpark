import { Bootcamp } from '@/interfaces';
import styles from './BootcampList.module.css';
import Image from 'next/image';

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
  onInscripcion,
}) => {
  return (
    <div className={styles.container}>
      {bootcamps.map((bootcamp) => (
        <div key={bootcamp.id} className={styles.card}>
          <Image
            src={bootcamp.imagen_url}
            alt={bootcamp.nombre}
            className={styles.image}
            priority
            layout="responsive" 
            width={100} 
            height={100} 
          />
          <h2>{bootcamp.nombre}</h2>
          <p>{bootcamp.descripcion}</p>
          {isInscrito(bootcamp.id) ? (
            <button onClick={() => onDesinscripcion(bootcamp.id)} className={styles.button}>
              Desinscribirse
            </button>
          ) : (
            <button onClick={() => onInscripcion(bootcamp.id)} className={styles.button}>
              Inscribirse
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
