
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vhrqprthzkfqpssksprp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocnFwcnRoemtmcXBzc2tzcHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDM1ODIsImV4cCI6MjA4NjU3OTU4Mn0.S4DEm2ZiH4AoY-h0dhNCIyb4OoRM04FiKUOI6jglpx0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
