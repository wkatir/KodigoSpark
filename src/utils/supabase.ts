import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Falta la URL o la clave de Supabase en las variables de entorno.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
