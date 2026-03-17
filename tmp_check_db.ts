import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vhrqprthzkfqpssksprp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocnFwcnRoemtmcXBzc2tzcHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDM1ODIsImV4cCI6MjA4NjU3OTU4Mn0.S4DEm2ZiH4AoY-h0dhNCIyb4OoRM04FiKUOI6jglpx0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkPackages() {
  const { data, error } = await supabase
    .from('tour_packages')
    .select('id, title, region, category')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('COUNT:' + data.length);
  data.forEach((p, i) => {
    console.log(`P${i}:${p.id}|${p.title}|${p.region}|${p.category}`);
  });
}

checkPackages();
