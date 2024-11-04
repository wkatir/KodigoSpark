import { Bootcamp, FormInputs } from '@/interfaces';
import { useForm } from 'react-hook-form';
import styles from '@/app/dashboard/DashBoard/components/InscriptionForm/InscriptionForm.module.css';


interface InscripcionFormProps {
  selectedBootcamp: Bootcamp | null;
  onSubmit: (data: FormInputs) => void;
  onCancel: () => void;
}

export const InscripcionForm: React.FC<InscripcionFormProps> = ({
  selectedBootcamp,
  onSubmit,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormInputs>();

  return (
    <div className={styles.inscriptionForm}>
      <h2>Formulario de Inscripción</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Bootcamp {selectedBootcamp?.nombre}
          </label>
        </div>

        <div className={styles.userInfo}>
          <div>
            <input
              {...register('nombre', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres'
                }
              })}
              placeholder='Nombre completo'
            />
            {errors.nombre && <span>{errors.nombre.message}</span>}
          </div>

          <div>
            <input
              {...register('telefono', {
                required: 'El teléfono es requerido',
                pattern: {
                  value: /^\+?[0-9]{8,15}$/,
                  message: 'Introduce un número de teléfono válido'
                }
              })}
              placeholder='Número de teléfono'
            />
            {errors.telefono && <span>{errors.telefono.message}</span>}
          </div>
        </div>

        <div>
          <textarea
            {...register('motivacion', {
              required: 'La motivación es requerida',
              minLength: {
                value: 10,
                message: 'La motivación debe tener al menos 10 caracteres'
              }
            })}
            placeholder='Motivación'
          />
          {errors.motivacion && <span>{errors.motivacion.message}</span>}
        </div>

        <div>
          <select
            {...register('disponibilidad', {
              required: 'La disponibilidad es requerida'
            })}
          >
            <option value="">Disponibilidad horaria</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
            <option value="noche">Noche</option>
          </select>

          {errors.disponibilidad && <span>{errors.disponibilidad.message}</span>}
        </div>

        <div>
          <button type="submit">Confirmar Inscripción</button>
          <button type="button" onClick={() => {
            reset();
            onCancel();
          }} className={styles.buttonCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};