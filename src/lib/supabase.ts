import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;