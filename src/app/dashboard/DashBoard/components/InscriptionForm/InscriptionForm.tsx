import { Bootcamp, FormInputs } from '@/interfaces';
import { useForm } from 'react-hook-form';

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
      <div>
        <h2>Formulario de Inscripción</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              Nombre completo:
              <input
                {...register('nombre', { 
                  required: 'El nombre es requerido',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                  }
                })}
              />
            </label>
            {errors.nombre && <span>{errors.nombre.message}</span>}
          </div>
  
          <div>
            <label>
              Número de Teléfono:
              <input
                {...register('telefono', {
                  required: 'El teléfono es requerido',
                  pattern: {
                    value: /^\+?[0-9]{8,15}$/,
                    message: 'Introduce un número de teléfono válido'
                  }
                })}
              />
            </label>
            {errors.telefono && <span>{errors.telefono.message}</span>}
          </div>
  
          <div>
            <label>
              Motivación:
              <textarea
                {...register('motivacion', {
                  required: 'La motivación es requerida',
                  minLength: {
                    value: 10,
                    message: 'La motivación debe tener al menos 10 caracteres'
                  }
                })}
              />
            </label>
            {errors.motivacion && <span>{errors.motivacion.message}</span>}
          </div>
  
          <div>
            <label>
              Disponibilidad:
              <select
                {...register('disponibilidad', {
                  required: 'La disponibilidad es requerida'
                })}
              >
                <option value="">Selecciona una opción</option>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </select>
            </label>
            {errors.disponibilidad && <span>{errors.disponibilidad.message}</span>}
          </div>
  
          <div>
            <label>
              Bootcamp seleccionado: {selectedBootcamp?.nombre}
            </label>
          </div>
  
          <div>
            <button type="submit">Confirmar Inscripción</button>
            <button type="button" onClick={() => {
              reset();
              onCancel();
            }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };