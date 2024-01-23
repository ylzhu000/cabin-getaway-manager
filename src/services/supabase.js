import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kypuawagpxapfkcutsqy.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5cHVhd2FncHhhcGZrY3V0c3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyNzY0ODksImV4cCI6MjAxMTg1MjQ4OX0.Of1u-_U6HIl9GDF8egtYzvmAR6wxfjweNzg4iiEejuM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
