import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABASE_PROJECT_URL, VITE_SUPABASE_KEY } = import.meta.env;
export const supabaseUrl = VITE_SUPABASE_PROJECT_URL;
const supabase = createClient(VITE_SUPABASE_PROJECT_URL, VITE_SUPABASE_KEY);

export default supabase;
