export interface Bootcamp {
  id: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
}

export interface Inscripcion {
  id: number;
  user_id: string;
  bootcamp_id: number;
  fecha_inscripcion: Date;
  nombre: string;
  telefono: string;
  motivacion: string;
  disponibilidad: 'mañana' | 'tarde' | 'noche';
}

export interface FormInputs {
  nombre: string;
  telefono: string;
  motivacion: string;
  disponibilidad: 'mañana' | 'tarde' | 'noche';
}
