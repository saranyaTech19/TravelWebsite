
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

interface EnquieryEntry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  destination: string;
  travel_date: string;
  adults: string;
  children: string;
  message: string;
  created_at: string;
}

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { profile, loading: authLoading, signOut } = useAuth();
  const [enquiries, setEnquiries] = useState<EnquieryEntry[]>([]);
  const [selected, setSelected] = useState<EnquieryEntry | null>(null);
  
  // Auth Form State
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) fetchData();
  }, [profile]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('travel_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnquiries(data || []);
    } catch (err: any) {
      console.error('Fetch Error:', err.message);
      setError("Failed to load records. Ensure you are an approved admin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        // --- LOGIN FLOW ---
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (signInError) throw signInError;

        // Verify if user exists in admins table
        const { data: adminCheck, error: checkError } = await supabase
          .from('admins')
          .select('status')
          .eq('id', data.user?.id)
          .single();

        if (checkError || !adminCheck) {
          await supabase.auth.signOut();
          throw new Error("Access Denied: You are not registered as an administrator.");
        }
      } else {
        // --- SIGNUP FLOW ---
        if (!fullName.trim()) throw new Error("Full name is required for registration.");

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
        });

        if (signUpError) throw signUpError;
        if (!signUpData.user) throw new Error("Failed to create account.");

        // Ensure user exists in 'users' table first to satisfy FK constraint in 'admins'
        // Some setups require a record in public.users before admins can be created.
        try {
          await supabase.from('users').upsert([{
            id: signUpData.user.id,
            email: email.trim(),
            full_name: fullName.trim()
          }], { onConflict: 'id' });
        } catch (e) {
          console.warn("Could not upsert to users table, continuing...", e);
        }

        // FIX: Use .upsert() instead of .insert() to prevent duplicate key errors
        // if the profile already exists in the admins table.
        const { error: profileError } = await supabase
          .from('admins')
          .upsert([{
            id: signUpData.user.id,
            email: email.trim(),
            full_name: fullName.trim(),
            role: 'admin',
            status: 'active'
          }], { onConflict: 'id' });

        if (profileError) {
          console.error("Profile Creation Error:", profileError);
          throw new Error(profileError.message || "Account created but profile setup failed.");
        }
        
        // Success - AuthContext will detect the new session
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this enquiry permanently?')) {
      try {
        const { error } = await supabase.from('travel_details').delete().eq('id', id);
        if (error) throw error;
        setEnquiries(prev => prev.filter(e => e.id !== id));
        if (selected?.id === id) setSelected(null);
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- LOGIN / SIGNUP VIEW ---
  if (!profile) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6 py-12">
        <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-brand-dark/5 w-full max-w-lg animate-fade-in-up">
          <div className="text-center mb-10">
            <p className="font-cursive text-brand-gold text-3xl mb-1">Global Connect</p>
            <h1 className="text-3xl font-serif font-bold text-brand-dark">Admin Access</h1>
            <p className="text-brand-dark/40 text-[9px] font-bold uppercase tracking-[0.2em] mt-2">Authorized Personnel Only</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-brand-bg p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-white text-brand-dark shadow-sm' : 'text-brand-dark/30 hover:text-brand-dark'}`}
            >
              Login
            </button>
            <button 
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-white text-brand-dark shadow-sm' : 'text-brand-dark/30 hover:text-brand-dark'}`}
            >
              Register
            </button>
          </div>
          
          <form onSubmit={handleAuthAction} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1 animate-fade-in-down">
                <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  placeholder="e.g. Siddhartha Ghosh" 
                  className="w-full bg-[#FFF8F1] rounded-2xl px-6 py-4 text-brand-dark outline-none border border-transparent focus:border-brand-gold/30 transition-all font-medium text-sm" 
                  required={mode === 'signup'} 
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Work Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@globalconnect.travel" className="w-full bg-[#FFF8F1] rounded-2xl px-6 py-4 text-brand-dark outline-none border border-transparent focus:border-brand-gold/30 transition-all font-medium text-sm" required />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#FFF8F1] rounded-2xl px-6 py-4 text-brand-dark outline-none border border-transparent focus:border-brand-gold/30 transition-all font-medium text-sm" required />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                <p className="text-red-500 text-[10px] font-bold text-center leading-relaxed">{error}</p>
              </div>
            )}
            
            <button type="submit" disabled={isLoading} className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-brand-gold transition-colors shadow-xl disabled:opacity-50 group mt-2">
              {isLoading ? 'Processing...' : mode === 'login' ? 'Authorize Access' : 'Create Admin Account'}
            </button>
          </form>

          <button onClick={onBack} className="mt-8 text-brand-dark/20 text-[9px] font-bold uppercase tracking-widest hover:text-brand-dark transition-colors block mx-auto">Return to Website</button>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-brand-bg pt-32 pb-24">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p className="font-cursive text-brand-gold text-3xl mb-1">Hello, {profile.full_name}</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark tracking-tight">Lead Database</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-green-100 text-green-600 text-[8px] font-black px-2 py-0.5 rounded uppercase">{profile.role}</span>
              <p className="text-brand-dark/30 font-bold uppercase text-[9px] tracking-widest">{profile.email}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="bg-white border border-brand-dark/10 text-brand-dark px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-dark/5 transition-colors shadow-sm">Refresh</button>
            <button onClick={signOut} className="bg-brand-dark text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 transition-colors shadow-lg">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-sm border border-brand-dark/5 overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-brand-dark/5 text-brand-dark text-[10px] font-bold uppercase tracking-[0.2em] border-b border-brand-dark/5">
                    <th className="px-8 py-6">Date</th>
                    <th className="px-8 py-6">Lead Details</th>
                    <th className="px-8 py-6">Target</th>
                    <th className="px-8 py-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-dark/5">
                  {isLoading && enquiries.length === 0 ? (
                    <tr><td colSpan={4} className="px-8 py-20 text-center"><div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto"></div></td></tr>
                  ) : enquiries.length === 0 ? (
                    <tr><td colSpan={4} className="px-8 py-20 text-center text-brand-dark/30 font-medium italic">No leads captured yet.</td></tr>
                  ) : (
                    enquiries.map((e) => (
                      <tr key={e.id} className={`hover:bg-brand-gold/5 cursor-pointer transition-colors ${selected?.id === e.id ? 'bg-brand-gold/10' : ''}`} onClick={() => setSelected(e)}>
                        <td className="px-8 py-6 text-xs text-brand-dark/50 font-medium">{new Date(e.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-brand-dark leading-none">{e.full_name}</p>
                          <p className="text-[10px] text-brand-dark/40 mt-1.5 font-medium">{e.email}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[11px] font-bold text-brand-dark">{e.destination}</span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <button onClick={(ev) => { ev.stopPropagation(); handleDelete(e.id); }} className="text-brand-dark/10 hover:text-red-500 transition-colors p-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-1">
            {selected ? (
              <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-brand-dark/5 sticky top-32 animate-fade-in-up">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="bg-brand-gold/10 text-brand-gold text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Customer Profile</span>
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mt-4">{selected.full_name}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-brand-dark/20 hover:text-brand-dark p-2">✕</button>
                </div>

                <div className="space-y-6 text-sm">
                  <div className="bg-brand-bg/50 p-6 rounded-3xl space-y-4">
                    <div className="flex justify-between"><span className="text-brand-dark/40 font-bold uppercase text-[9px] tracking-widest">Phone</span><span className="font-bold">{selected.phone}</span></div>
                    <div className="flex justify-between"><span className="text-brand-dark/40 font-bold uppercase text-[9px] tracking-widest">Date</span><span className="font-bold">{selected.travel_date || 'N/A'}</span></div>
                    <div className="flex justify-between"><span className="text-brand-dark/40 font-bold uppercase text-[9px] tracking-widest">Group</span><span className="font-bold">{selected.adults} • {selected.children}</span></div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-brand-dark/40 font-bold uppercase text-[9px] tracking-widest ml-1">Message Detail</span>
                    <p className="bg-[#FFF8F1] p-6 rounded-3xl italic text-brand-dark/70 text-xs leading-relaxed border border-brand-gold/5">
                      "{selected.message || 'No specific requests provided.'}"
                    </p>
                  </div>
                  
                  <a href={`mailto:${selected.email}`} className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg flex items-center justify-center">
                    Reply to Customer
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-brand-dark/5 border-2 border-dashed border-brand-dark/10 rounded-[3rem] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark/20 text-xl mb-4">ⓘ</div>
                <p className="text-brand-dark/30 font-bold uppercase text-[9px] tracking-widest max-w-[150px] leading-relaxed">Select a lead to view full enquiry insights</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
