
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { slugify } from '../utils/slugify';
import {
  LayoutDashboard, ShoppingCart, Users, Package, FileText,
  Settings, RefreshCcw, Bell, LogOut, ChevronRight, MapPin,
  Calendar, Star, CheckCircle2, Image as ImageIcon, Trash2, Save,
  Upload, X, Plus
} from 'lucide-react';

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

interface TourPackage {
  id?: string;
  title: string;
  slug: string;
  location: string;
  region: string;
  category: string;
  image_url: string;
  rating: string;
  duration: string;
  guest_capacity: string;
  tag: string;
  is_featured: boolean;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  itinerary: { day: string; title: string; detail: string }[];
}

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { profile, loading: authLoading, signOut } = useAuth();
  const [view, setView] = useState<'leads' | 'packages'>('leads');
  const [enquiries, setEnquiries] = useState<EnquieryEntry[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [selectedLead, setSelectedLead] = useState<EnquieryEntry | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `packages/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('package-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('package-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err: any) {
      alert('Upload failed. Please ensure "package-images" bucket exists in Supabase Storage and is public.');
      console.error(err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const getCategoryOptions = (region: string) => {
    if (region === 'Dubai') {
      return ["International trips from dubai", "Dubai local tours"];
    }
    if (region === 'India') {
      return ["International trips from india", "South india tours", "North india tours"];
    }
    return ["Standard", "Premium", "Luxury"];
  };

  // Auth Form State
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      if (view === 'leads') fetchLeads();
      else fetchPackages();
    }
  }, [profile, view]);

  const fetchLeads = async () => {
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
      setError("Failed to load records.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('tour_packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (err: any) {
      console.error('Fetch Packages Error:', err.message);
      setError("Failed to load packages. Ensure table exists.");
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

  const handleDeleteLead = async (id: string) => {
    if (window.confirm('Delete this enquiry permanently?')) {
      try {
        const { error } = await supabase.from('travel_details').delete().eq('id', id);
        if (error) throw error;
        setEnquiries(prev => prev.filter(e => e.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (window.confirm('Delete this package permanently?')) {
      try {
        const { error } = await supabase.from('tour_packages').delete().eq('id', id);
        if (error) throw error;
        setPackages(prev => prev.filter(p => p.id !== id));
        if (selectedPackage?.id === id) setSelectedPackage(null);
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;
    setIsLoading(true);
    try {
      const packageData = { ...selectedPackage };
      delete packageData.id; // Remove ID for upsert if it's new, though Supabase handles it

      const { data, error } = await supabase
        .from('tour_packages')
        .upsert([
          {
            ...selectedPackage,
            updated_at: new Date().toISOString()
          }
        ], { onConflict: 'id' })
        .select();

      if (error) throw error;

      alert('Package saved successfully!');
      setIsEditingPackage(false);
      fetchPackages();
    } catch (err: any) {
      alert('Save failed: ' + err.message);
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-[#F5F7FA] flex font-sans">
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-[260px] bg-[#222E3C] flex flex-col fixed inset-y-0 z-50 transition-all">
        <div className="p-8 pb-12 flex items-center gap-3">
          {/* <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center shadow-lg shadow-brand-gold/20">
            <Package className="text-brand-dark w-6 h-6" />
          </div> */}
          <img
            src="https://globalconnectworldtravel.com/img/logo.png"
            alt="Global Connect"
            className="h-16 md:h-20 w-auto object-contai"
          />
          {/* <span className="text-white font-black text-xl tracking-tighter">GLOBAL CONNECT</span> */}
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
          <button onClick={() => setView('leads')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${view === 'leads' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>

          <div className="pt-8 pb-2 px-6">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Catalogs</span>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setView('packages')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${view === 'packages' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Package className="w-5 h-5" /> Tour Packages
            </button>

            {/* SUBMENUS */}
            <div className="ml-12 space-y-1 pb-2">
              <button
                onClick={() => {
                  setView('packages');
                  setSelectedPackage({
                    title: '', slug: '', location: '', region: 'India', category: 'Standard',
                    image_url: '', rating: '5.0 (0)', duration: '', guest_capacity: '4-6 guest',
                    tag: 'Tour', is_featured: false, overview: '',
                    highlights: [], inclusions: [], exclusions: [], gallery: [], itinerary: []
                  });
                  setIsEditingPackage(true);
                  setFormStep(1);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-[12px] font-bold transition-all flex items-center gap-3 ${view === 'packages' && isEditingPackage && !selectedPackage?.id ? 'text-brand-gold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className={`w-1 h-1 rounded-full ${view === 'packages' && isEditingPackage && !selectedPackage?.id ? 'bg-brand-gold shadow-[0_0_8px_rgba(255,191,0,0.6)]' : 'bg-slate-600'}`} />
                Add New Package
              </button>

              <button
                onClick={() => {
                  setView('packages');
                  setIsEditingPackage(false);
                  setFormStep(1);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-[12px] font-bold transition-all flex items-center gap-3 ${view === 'packages' && !isEditingPackage ? 'text-brand-gold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className={`w-1 h-1 rounded-full ${view === 'packages' && !isEditingPackage ? 'bg-brand-gold shadow-[0_0_8px_rgba(255,191,0,0.6)]' : 'bg-slate-600'}`} />
                Manage Packages
              </button>
            </div>
          </div>

          <div className="pt-8 pb-2 px-6">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operations</span>
          </div>
          <button onClick={() => setView('leads')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${view === 'leads' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <Users className="w-5 h-5" /> All Leads
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold text-slate-400 hover:text-white">
            <ShoppingCart className="w-5 h-5" /> Bookings
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold text-slate-400 hover:text-white">
            <FileText className="w-5 h-5" /> Reports
          </button>
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <button onClick={signOut} className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut className="w-5 h-5" /> Logout Session
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 ml-[260px]">
        {/* Top Header Bar */}
        <header className="h-[80px] bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4 text-slate-400 font-bold text-[13px]">
            <span>GLOBAL CONNECT</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{view === 'leads' ? 'Dashboard' : 'Tour Packages'}</span>
            {selectedPackage && isEditingPackage && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900">{selectedPackage.title || 'New Package'}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-8">
            <button onClick={view === 'leads' ? fetchLeads : fetchPackages} className="text-slate-400 hover:text-slate-900 transition-colors">
              <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-8">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-none">{profile.full_name}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black">Admin Manager</p>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                {profile.full_name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-10">
          {view === 'leads' ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Lead Database</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5">Full Name</th>
                      <th className="px-8 py-5">Destination</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {enquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => setSelectedLead(e)}>
                        <td className="px-8 py-5 text-xs font-bold text-slate-500">{new Date(e.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-black text-slate-900">{e.full_name}</p>
                          <p className="text-[11px] text-slate-400 font-bold">{e.email}</p>
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-slate-700">{e.destination}</td>
                        <td className="px-8 py-5 text-right">
                          <button onClick={(ev) => { ev.stopPropagation(); handleDeleteLead(e.id); }} className="p-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-10">
              {/* Left Column: List (or Form if detailed view) */}
              <div className="col-span-12 space-y-8">
                {!isEditingPackage ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-black text-slate-900">Catalogs / Tour Packages</h2>
                      <button
                        onClick={() => {
                          setSelectedPackage({
                            title: '', slug: '', location: '', region: 'India', category: 'Standard',
                            image_url: '', rating: '5.0 (0)', duration: '', guest_capacity: '4-6 guest',
                            tag: 'Tour', is_featured: false, overview: '',
                            highlights: [], inclusions: [], exclusions: [], gallery: [], itinerary: []
                          });
                          setIsEditingPackage(true);
                        }}
                        className="bg-[#4F46E5] text-white px-8 py-3 rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-[#4338CA] transition-all"
                      >
                        Create New Package
                      </button>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                            <th className="px-8 py-5">Details</th>
                            <th className="px-8 py-5">Region</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {packages.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => { setSelectedPackage(p); setIsEditingPackage(true); }}>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                    <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-black text-slate-900 leading-none">{p.title}</p>
                                    <p className="text-[11px] text-slate-400 mt-1.5 font-bold uppercase tracking-widest">{p.slug}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{p.region}</span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <button onClick={(ev) => { ev.stopPropagation(); handleDeletePackage(p.id!); }} className="p-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSavePackage} className="space-y-8 animate-fade-in-up">
                    {/* Header with Step Indicator */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <button type="button" onClick={() => setIsEditingPackage(false)} className="p-2 text-slate-400 hover:text-slate-900"><ChevronRight className="w-6 h-6 rotate-180" /></button>
                          <h2 className="text-xl font-black text-slate-900">
                            {selectedPackage.id ? 'Edit Package' : 'Add New Package'}
                            <span className="text-slate-400 ml-3 text-sm font-bold uppercase tracking-widest">/ Phase {formStep} of 5</span>
                          </h2>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsEditingPackage(false)}
                          className="bg-[#4F46E5] text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-[#4338CA] transition-all"
                        >
                          Manage Packages
                        </button>
                      </div>
                      {/* Visual Step Progress */}
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(step => (
                          <div key={step} className={`h-1.5 flex-1 rounded-full transition-all ${step <= formStep ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      {/* PHASE 1: Identity & Core Details */}
                      {formStep === 1 && (
                        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-sm space-y-10 animate-fade-in">
                          <div>
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest border-b pb-4 mb-8">Phase 1: Basic Identity & Region</h3>
                            <div className="grid grid-cols-2 gap-8">
                              <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-500 uppercase">Package Name *</label>
                                <input value={selectedPackage.title} onChange={e => setSelectedPackage({ ...selectedPackage, title: e.target.value })} className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all" placeholder="e.g. Hidden Wonders of Leh" required />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-500 uppercase">URL Slug (System Unique)</label>
                                <input value={selectedPackage.slug} onChange={e => setSelectedPackage({ ...selectedPackage, slug: e.target.value })} className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all" placeholder="e.g. leh-wonders-tour" required />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-8">
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-500 uppercase">Operational Region</label>
                              <select value={selectedPackage.region} onChange={e => setSelectedPackage({ ...selectedPackage, region: e.target.value, category: getCategoryOptions(e.target.value)[0] })} className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all">
                                <option value="India">India</option>
                                <option value="Dubai">Dubai</option>
                                <option value="International">International</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-500 uppercase">Trip Category</label>
                              <select value={selectedPackage.category} onChange={e => setSelectedPackage({ ...selectedPackage, category: e.target.value })} className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all">
                                {getCategoryOptions(selectedPackage.region).map(opt => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-500 uppercase">Package Priority</label>
                              <select value={selectedPackage.is_featured ? 'yes' : 'no'} onChange={e => setSelectedPackage({ ...selectedPackage, is_featured: e.target.value === 'yes' })} className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all">
                                <option value="no">Standard Visibility</option>
                                <option value="yes">Feature on Home Page</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-8 pt-4">
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-500 uppercase">Duration</label>
                              <input value={selectedPackage.duration} onChange={e => setSelectedPackage({ ...selectedPackage, duration: e.target.value })} className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all" placeholder="5 Days 4 Nights" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-500 uppercase">Rating Score</label>
                              <input value={selectedPackage.rating} onChange={e => setSelectedPackage({ ...selectedPackage, rating: e.target.value })} className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all" placeholder="4.9 (240)" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-500 uppercase">Guest Capacity</label>
                              <input value={selectedPackage.guest_capacity} onChange={e => setSelectedPackage({ ...selectedPackage, guest_capacity: e.target.value })} className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all" placeholder="4-6 guest" />
                            </div>
                          </div>

                          <div className="space-y-4 pt-4">
                            <label className="text-[11px] font-black text-slate-500 uppercase">Primary Tour Image</label>
                            <div className="space-y-6">
                              <div className="w-full max-w-xl relative group">
                                <input
                                  value={selectedPackage.image_url}
                                  onChange={e => setSelectedPackage({ ...selectedPackage, image_url: e.target.value })}
                                  className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-3 text-sm font-bold outline-none transition-all pr-32"
                                  placeholder="Paste image URL or upload..."
                                />
                                <div className="absolute right-2 top-2 bottom-2">
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const url = await handleFileUpload(file);
                                        if (url) setSelectedPackage({ ...selectedPackage, image_url: url });
                                      }
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="h-full bg-white text-indigo-600 px-4 rounded-md text-[10px] font-black uppercase flex items-center gap-2 border border-slate-200 hover:border-indigo-300 transition-all shadow-sm"
                                  >
                                    {isUploading ? <RefreshCcw className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                    Upload
                                  </button>
                                </div>
                              </div>

                              <div className="w-full max-w-sm h-44 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative group">
                                {selectedPackage.image_url ? (
                                  <>
                                    <img src={selectedPackage.image_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <span className="bg-white/90 backdrop-blur text-indigo-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Live Preview Enabled</span>
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-center space-y-2">
                                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No Image Selected</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8">
                              <button
                                type="button"
                                onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900'}`}
                              >
                                Back Phase
                              </button>
                              <button
                                type="button"
                                onClick={() => setFormStep(prev => prev + 1)}
                                className="bg-[#222E3C] text-white px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg flex items-center gap-2 group"
                              >
                                Continue to Phase {formStep + 1}
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PHASE 2: Tour Overview */}
                      {formStep === 2 && (
                        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
                          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest border-b pb-4 mb-4">Phase 2: Experience Detail (Overview)</h3>
                          <textarea
                            value={selectedPackage.overview}
                            onChange={e => setSelectedPackage({ ...selectedPackage, overview: e.target.value })}
                            className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl px-10 py-10 text-base font-medium leading-relaxed outline-none transition-all h-96 shadow-inner"
                            placeholder="Write a storytelling overview of the experience..."
                          />
                          <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8">
                            <button
                              type="button"
                              onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                              className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-900"
                            >
                              Back Phase
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormStep(prev => prev + 1)}
                              className="bg-[#222E3C] text-white px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg flex items-center gap-2 group"
                            >
                              Continue to Phase {formStep + 1}
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* PHASE 3: Itinerary */}
                      {formStep === 3 && (
                        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-sm space-y-6 animate-fade-in">
                          <div className="flex justify-between items-center border-b pb-4 mb-8">
                            <div>
                              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Phase 3: Day-by-Day Itinerary</h3>
                              <p className="text-[10px] text-slate-400 font-bold mt-1">Add activities for each day of the tour</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedPackage({ ...selectedPackage, itinerary: [...selectedPackage.itinerary, { day: `Day ${selectedPackage.itinerary.length + 1}`, title: '', detail: '' }] })}
                              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
                            >
                              <Plus className="w-3 h-3" /> Add New Day
                            </button>
                          </div>

                          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                            {selectedPackage.itinerary.map((day, idx) => (
                              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative group animate-fade-in-up">
                                <button
                                  type="button"
                                  onClick={() => setSelectedPackage({ ...selectedPackage, itinerary: selectedPackage.itinerary.filter((_, i) => i !== idx) })}
                                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>

                                <div className="grid grid-cols-12 gap-6">
                                  <div className="col-span-3 space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Day Number</label>
                                    <input
                                      value={day.day}
                                      onChange={e => {
                                        const newItinerary = [...selectedPackage.itinerary];
                                        newItinerary[idx].day = e.target.value;
                                        setSelectedPackage({ ...selectedPackage, itinerary: newItinerary });
                                      }}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold outline-none focus:border-indigo-500 transition-all"
                                      placeholder="e.g. Day 1"
                                    />
                                  </div>
                                  <div className="col-span-9 space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Short Title</label>
                                    <input
                                      value={day.title}
                                      onChange={e => {
                                        const newItinerary = [...selectedPackage.itinerary];
                                        newItinerary[idx].title = e.target.value;
                                        setSelectedPackage({ ...selectedPackage, itinerary: newItinerary });
                                      }}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold outline-none focus:border-indigo-500 transition-all"
                                      placeholder="e.g. Arrival & Acclimatization"
                                    />
                                  </div>
                                  <div className="col-span-12 space-y-1.5">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Detail Description</label>
                                    <textarea
                                      value={day.detail}
                                      onChange={e => {
                                        const newItinerary = [...selectedPackage.itinerary];
                                        newItinerary[idx].detail = e.target.value;
                                        setSelectedPackage({ ...selectedPackage, itinerary: newItinerary });
                                      }}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs font-medium outline-none focus:border-indigo-500 transition-all h-24 resize-none"
                                      placeholder="Describe the day's activities..."
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}

                            {selectedPackage.itinerary.length === 0 && (
                              <div className="py-20 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                                <Calendar className="w-12 h-12 mb-4 opacity-10" />
                                <p className="text-sm font-black uppercase tracking-widest">No Itinerary Days Added</p>
                                <button
                                  type="button"
                                  onClick={() => setSelectedPackage({ ...selectedPackage, itinerary: [{ day: 'Day 1', title: '', detail: '' }] })}
                                  className="mt-4 text-indigo-600 font-bold text-xs hover:underline"
                                >
                                  + Click to add your first day
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8">
                            <button
                              type="button"
                              onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                              className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-900"
                            >
                              Back Phase
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormStep(prev => prev + 1)}
                              className="bg-[#222E3C] text-white px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg flex items-center gap-2 group"
                            >
                              Continue to Phase {formStep + 1}
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* PHASE 4: Logistics & Highlights */}
                      {formStep === 4 && (
                        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-sm space-y-10 animate-fade-in">
                          <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest border-b pb-4 mb-4">Phase 4: Logistics & Highlights</h3>

                          <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-500 uppercase">Tour Highlights (One per line)</label>
                              <textarea
                                value={selectedPackage.highlights.join('\n')}
                                onChange={e => setSelectedPackage({ ...selectedPackage, highlights: e.target.value.split('\n').filter(l => l.trim()) })}
                                className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-4 text-sm font-bold outline-none transition-all h-64"
                                placeholder="Burj Khalifa Entry&#10;Desert Safari"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-500 uppercase">What's Included</label>
                              <textarea
                                value={selectedPackage.inclusions.join('\n')}
                                onChange={e => setSelectedPackage({ ...selectedPackage, inclusions: e.target.value.split('\n').filter(l => l.trim()) })}
                                className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-4 text-sm font-bold outline-none transition-all h-64"
                                placeholder="4-Star Hotel&#10;Transfer"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 uppercase">Exclusions</label>
                            <textarea
                              value={selectedPackage.exclusions.join('\n')}
                              onChange={e => setSelectedPackage({ ...selectedPackage, exclusions: e.target.value.split('\n').filter(l => l.trim()) })}
                              className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-lg px-4 py-4 text-sm font-bold outline-none transition-all h-32"
                              placeholder="Flight details&#10;Personal tips"
                            />
                          </div>
                          <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8">
                            <button
                              type="button"
                              onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                              className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-900"
                            >
                              Back Phase
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormStep(prev => prev + 1)}
                              className="bg-[#222E3C] text-white px-10 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg flex items-center gap-2 group"
                            >
                              Continue to Phase {formStep + 1}
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* PHASE 5: Gallery */}
                      {formStep === 5 && (
                        <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-sm space-y-10 animate-fade-in">
                          <div className="flex justify-between items-center border-b pb-6">
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Phase 5: Media Gallery</h3>
                            <div className="flex items-center gap-4">
                              <input
                                type="file"
                                ref={galleryInputRef}
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={async (e) => {
                                  const files = Array.from(e.target.files || []) as File[];
                                  for (const file of files) {
                                    const url = await handleFileUpload(file);
                                    if (url) {
                                      setSelectedPackage(prev => prev ? { ...prev, gallery: [...prev.gallery, url] } : prev);
                                    }
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => galleryInputRef.current?.click()}
                                className="bg-indigo-50 text-indigo-600 px-6 py-2.5 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 hover:bg-indigo-100 transition-all border border-indigo-100"
                              >
                                <Upload className="w-4 h-4" /> Upload from Desktop
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.1em]">Manual Image URLs (One per line)</label>
                            <textarea
                              value={selectedPackage.gallery.join('\n')}
                              onChange={e => setSelectedPackage({ ...selectedPackage, gallery: e.target.value.split('\n').filter(l => l.trim()) })}
                              className="w-full max-w-2xl bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-indigo-500 rounded-xl px-4 py-4 text-sm font-mono outline-none transition-all h-32"
                              placeholder="https://example.com/img1.jpg&#10;https://example.com/img2.jpg"
                            />
                          </div>

                          <div className="grid grid-cols-4 gap-6 pt-6">
                            {selectedPackage.gallery.map((img, i) => (
                              <div key={i} className="h-32 rounded-xl bg-slate-100 overflow-hidden border relative group shadow-sm">
                                <img src={img} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedPackage({ ...selectedPackage, gallery: selectedPackage.gallery.filter((_, idx) => idx !== i) })}
                                    className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-transform"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            {selectedPackage.gallery.length === 0 && (
                              <div className="col-span-4 py-20 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                                <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-sm font-bold uppercase tracking-widest">No images yet</p>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8">
                            <button
                              type="button"
                              onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                              className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-900"
                            >
                              Back Phase
                            </button>
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="bg-indigo-600 text-white px-12 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg disabled:opacity-50"
                            >
                              {isLoading ? 'Syncing...' : 'Save & Publish Experience'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
