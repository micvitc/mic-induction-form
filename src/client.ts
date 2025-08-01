
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Save form data to Supabase
 * @param table - The Supabase table name
 * @param formData - Key-value pairs of the form input
 */
export async function saveFormData(formData : any) {
  const { data, error } = await supabase
    .from("registrations")
    .insert([formData])

  if (error) {
    console.error('Error saving form data:', error.message)
    throw error
  }
  let regCount=0;
  await supabase
    .from("registrations")
    .select("*")
    .then(({ data, error }) => {
      if (error) {
        console.error('Error fetching registration count:', error.message)
        throw error
      }
      regCount = data.length;
    });
  return regCount;
}

export async function getRegistrationCount() {
  let regCount = 0;
  await supabase
    .from("registrations")
    .select("*")
    .then(({ data, error }) => {
      if (error) {
        console.error('Error fetching registration count:', error.message);
        throw error;
      }
      regCount = data.length;
    });
  return regCount;
}
