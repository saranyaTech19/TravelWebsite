
import React, { useState, useEffect, useRef } from 'react';
import { auth, packages as packagesApi, enquiries as enquiriesApi, packageEnquiries as pkgEnquiriesApi, contact as contactApi, uploadImage, trendingDestinations as trendingApi } from '../lib/apiClient';
import { useAuth } from '../context/AuthContext';
import { slugify } from '../utils/slugify';
import {
  LayoutDashboard, ShoppingCart, Users, Package, FileText,
  Settings, RefreshCcw, Bell, LogOut, ChevronRight, MapPin,
  Calendar, Star, CheckCircle2, Image as ImageIcon, Trash2, Save,
  Upload, X, Plus, Mail, MessageSquare, Eye, EyeOff
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

interface PackageEnquiryEntry {
  id: string;
  package_id?: string;
  package_title?: string;
  name: string;
  email: string;
  phone: string;
  travel_date: string;
  num_travelers: number;
  message: string;
  created_at: string;
}

interface ContactEntry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { profile, loading: authLoading, signOut } = useAuth();
  const [view, setView] = useState<'leads' | 'packages' | 'package-enquiries' | 'contact' | 'trending'>('leads');
  const [enquiries, setEnquiries] = useState<EnquieryEntry[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [packageEnquiries, setPackageEnquiries] = useState<PackageEnquiryEntry[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactEntry[]>([]);

  const [selectedLead, setSelectedLead] = useState<EnquieryEntry | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [selectedPkgEnquiry, setSelectedPkgEnquiry] = useState<PackageEnquiryEntry | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactEntry | null>(null);
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const trendingInputRef = useRef<HTMLInputElement>(null);
  const [trendingDestinationsList, setTrendingDestinationsList] = useState<{ id: number; name: string; image_url: string }[]>([]);
  const [isTrendingUploading, setIsTrendingUploading] = useState(false);
  const [trendingNewName, setTrendingNewName] = useState('');

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const publicUrl = await uploadImage(file);
      return publicUrl;
    } catch (err: any) {
      alert('Upload failed. Please ensure the server is running.');
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
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrendingDestinations = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await trendingApi.getAll();
      setTrendingDestinationsList(data || []);
    } catch (err: any) {
      setError(`Trending Destinations: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      if (view === 'leads') fetchLeads();
      else if (view === 'packages') fetchPackages();
      else if (view === 'package-enquiries') fetchPackageEnquiries();
      else if (view === 'contact') fetchContactMessages();
      else if (view === 'trending') fetchTrendingDestinations();
    }
  }, [profile, view]);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await enquiriesApi.getAll();
      console.log('Fetched Leads:', data);
      setEnquiries(data || []);
    } catch (err: any) {
      console.error('Fetch Error:', err.message);
      setError(`Travel Details: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPackages = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await packagesApi.getAll();
      console.log('Fetched Packages:', data);
      setPackages(data || []);
    } catch (err: any) {
      console.error('Fetch Packages Error:', err.message);
      setError("Failed to load packages. Ensure table exists.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPackageEnquiries = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await pkgEnquiriesApi.getAll();
      console.log('Fetched Pkg Enquiries:', data);
      setPackageEnquiries(data || []);
    } catch (err: any) {
      console.error('Fetch Package Enquiries Error:', err.message);
      setError(`Package Enquiries: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContactMessages = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await contactApi.getAll();
      console.log('Fetched Contacts:', data);
      setContactMessages(data || []);
    } catch (err: any) {
      console.error('Fetch Contact Error:', err.message);
      setError(`Contact Messages: ${err.message}`);
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
        await auth.signInWithPassword(email.trim(), password);
        // AuthContext will pick up the new token and reload profile
        window.location.reload();
      } else {
        if (!fullName.trim()) throw new Error("Full name is required for registration.");
        await auth.signUp(email.trim(), password, fullName.trim());
        window.location.reload();
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
        await enquiriesApi.delete(id);
        setEnquiries(prev => prev.filter(e => e.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const handleDeletePackageEnquiry = async (id: string) => {
    if (window.confirm('Delete this package enquiry permanently?')) {
      try {
        await pkgEnquiriesApi.delete(id);
        setPackageEnquiries(prev => prev.filter(e => e.id !== id));
        if (selectedPkgEnquiry?.id === id) setSelectedPkgEnquiry(null);
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const handleDeleteContactMessage = async (id: string) => {
    if (window.confirm('Delete this contact message permanently?')) {
      try {
        await contactApi.delete(id);
        setContactMessages(prev => prev.filter(e => e.id !== id));
        if (selectedContact?.id === id) setSelectedContact(null);
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (window.confirm('Delete this package permanently?')) {
      try {
        await packagesApi.delete(id);
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
      if (selectedPackage.id) {
        await packagesApi.update(selectedPackage.id, selectedPackage);
      } else {
        await packagesApi.create(selectedPackage);
      }

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
            <h1 className="text-3xl font-serif font-bold text-brand-dark">Admin Manager Access</h1>
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
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#FFF8F1] rounded-2xl px-6 py-4 pr-12 text-brand-dark outline-none border border-transparent focus:border-brand-gold/30 transition-all font-medium text-sm" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E95A5] hover:text-brand-dark transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                <p className="text-red-500 text-[10px] font-bold text-center leading-relaxed">{error}</p>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-brand-gold transition-colors shadow-xl disabled:opacity-50 group mt-2">
              {isLoading ? 'Processing...' : mode === 'login' ? 'Authorize Access' : 'Create Admin Manager Account'}
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

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar pt-6">
          <button onClick={() => { setView('leads'); setIsEditingPackage(false); setError(''); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${view === 'leads' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <LayoutDashboard className="w-5 h-5" /> Enquiry Details
          </button>

          <div className="pt-8 pb-2 px-6">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Catalogs</span>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => { setView('packages'); setError(''); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${view === 'packages' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Package className="w-5 h-5" /> Tour Packages
            </button>

            {/* SUBMENUS */}
            <div className="ml-12 space-y-1 pb-2">
              <button
                onClick={() => {
                  setView('packages');
                  setError('');
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
                  setError('');
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

          <button
            onClick={() => { setView('trending'); setError(''); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${view === 'trending' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <ImageIcon className="w-5 h-5" /> Trending Destinations
          </button>

          <div className="pt-8 pb-2 px-6">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Operations</span>
          </div>
          <button onClick={() => { setView('package-enquiries'); setError(''); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${view === 'package-enquiries' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <MessageSquare className="w-5 h-5" /> Package Enquiries
          </button>
          <button onClick={() => { setView('contact'); setError(''); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-bold transition-all ${view === 'contact' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>
            <Mail className="w-5 h-5" /> Contact Details
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
            <span className="text-slate-900 capitalize">
              {view === 'leads' ? 'Travel Details' : view.replace('-', ' ')}
            </span>
            {selectedPackage && isEditingPackage && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900">{selectedPackage.title || 'New Package'}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                if (view === 'leads') fetchLeads();
                else if (view === 'packages') fetchPackages();
                else if (view === 'package-enquiries') fetchPackageEnquiries();
                else if (view === 'contact') fetchContactMessages();
                else if (view === 'trending') fetchTrendingDestinations();
              }}
              className="text-slate-400 hover:text-slate-900 transition-colors"
            >
              <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-8">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-none">{profile.full_name}</p>
                <p className="text-[10px] text-[#00A9D7] mt-1 uppercase font-black">Admin Manager</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
                <img src="/images/Favicon.png" alt="Admin" className="w-8 h-8 object-contain" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-10">
          {error && (
            <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-4 animate-shake">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-black text-red-900">System Sync Error</p>
                <p className="text-xs font-bold text-red-500 mt-0.5">{error}</p>
              </div>
              <button
                onClick={() => {
                  setError('');
                  if (view === 'leads') fetchLeads();
                  else if (view === 'packages') fetchPackages();
                  else if (view === 'package-enquiries') fetchPackageEnquiries();
                  else if (view === 'contact') fetchContactMessages();
                  else if (view === 'trending') fetchTrendingDestinations();
                }}
                className="ml-auto bg-white text-red-600 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-50 transition-all"
              >
                Attempt Retry
              </button>
            </div>
          )}
          {view === 'leads' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Travel Details (General Enquiries) <span className="text-slate-400 ml-2 font-bold">({enquiries.length})</span></h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5">Full Name</th>
                      <th className="px-8 py-5">Destination</th>
                      <th className="px-8 py-5">Phone</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Loading travel details...</p>
                          </div>
                        </td>
                      </tr>
                    ) : enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                              <RefreshCcw className="w-5 h-5 text-slate-300" />
                            </div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No travel enquiries found</p>
                            <p className="text-[11px] text-slate-300 font-bold">Try refreshing or check database connection</p>
                          </div>
                        </td>
                      </tr>
                    ) : enquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => setSelectedLead(e)}>
                        <td className="px-8 py-5 text-xs font-bold text-slate-500">{new Date(e.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-black text-slate-900">{e.full_name}</p>
                          <p className="text-[11px] text-slate-400 font-bold">{e.email}</p>
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-slate-700">{e.destination}</td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">{e.phone}</td>
                        <td className="px-8 py-5 text-right">
                          <button onClick={(ev) => { ev.stopPropagation(); handleDeleteLead(e.id); }} className="p-2 text-slate-300 hover:text-red-500 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === 'package-enquiries' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Package Enquiries <span className="text-slate-400 ml-2 font-bold">({packageEnquiries.length})</span></h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5">User</th>
                      <th className="px-8 py-5">Package</th>
                      <th className="px-8 py-5">Travel Date</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Loading package enquiries...</p>
                          </div>
                        </td>
                      </tr>
                    ) : packageEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-slate-300" />
                            </div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No package enquiries found</p>
                          </div>
                        </td>
                      </tr>
                    ) : packageEnquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => setSelectedPkgEnquiry(e)}>
                        <td className="px-8 py-5 text-xs font-bold text-slate-500">{new Date(e.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-black text-slate-900">{e.name}</p>
                          <p className="text-[11px] text-slate-400 font-bold">{e.email}</p>
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-slate-700">{e.package_title || 'N/A'}</td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">{e.travel_date || 'N/A'}</td>
                        <td className="px-8 py-5 text-right">
                          <button onClick={(ev) => { ev.stopPropagation(); handleDeletePackageEnquiry(e.id); }} className="p-2 text-slate-300 hover:text-red-500 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === 'contact' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900">Contact Messages <span className="text-slate-400 ml-2 font-bold">({contactMessages.length})</span></h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-widest">
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5">Name</th>
                      <th className="px-8 py-5">Phone</th>
                      <th className="px-8 py-5">Message Snippet</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Loading contact messages...</p>
                          </div>
                        </td>
                      </tr>
                    ) : contactMessages.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                              <Mail className="w-5 h-5 text-slate-300" />
                            </div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No contact messages found</p>
                          </div>
                        </td>
                      </tr>
                    ) : contactMessages.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => setSelectedContact(m)}>
                        <td className="px-8 py-5 text-xs font-bold text-slate-500">{new Date(m.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-black text-slate-900">{m.first_name} {m.last_name}</p>
                          <p className="text-[11px] text-slate-400 font-bold">{m.email}</p>
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">{m.phone}</td>
                        <td className="px-8 py-5 text-sm text-slate-700 truncate max-w-[200px]">{m.message}</td>
                        <td className="px-8 py-5 text-right">
                          <button onClick={(ev) => { ev.stopPropagation(); handleDeleteContactMessage(m.id); }} className="p-2 text-slate-300 hover:text-red-500 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === 'packages' && (
            <div className="grid grid-cols-12 gap-10">
              {/* Left Column: List (or Form if detailed view) */}
              <div className="col-span-12 space-y-8">
                {!isEditingPackage ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-black text-slate-900">Catalogs / Tour Packages <span className="text-slate-400 ml-2 font-bold">({packages.length})</span></h2>
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
                            <th className="px-8 py-5">Package Details</th>
                            <th className="px-6 py-5">Region</th>
                            <th className="px-6 py-5">Category</th>
                            <th className="px-6 py-5">Duration</th>
                            <th className="px-6 py-5">Guests</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {packages.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-3">
                                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                                    <Package className="w-5 h-5 text-slate-300" />
                                  </div>
                                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No tour packages found</p>
                                </div>
                              </td>
                            </tr>
                          ) : packages.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => { setSelectedPackage(p); setIsEditingPackage(true); }}>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm shrink-0">
                                    <img src={p.image_url} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-black text-slate-900 leading-tight mb-1">{p.title}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.slug}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-6 font-bold text-xs text-slate-600">
                                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{p.region}</span>
                              </td>
                              <td className="px-6 py-6">
                                <span className="text-xs font-bold text-slate-500">{p.category}</span>
                              </td>
                              <td className="px-6 py-6">
                                <span className="text-xs font-bold text-slate-500">{p.duration}</span>
                              </td>
                              <td className="px-6 py-6 text-xs font-bold text-slate-500">
                                {p.guest_capacity}
                              </td>
                              <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={(ev) => { ev.stopPropagation(); setSelectedPackage(p); setIsEditingPackage(true); }}
                                    className="p-2.5 bg-slate-100 text-slate-400 hover:bg-indigo-600 hover:text-white rounded-lg transition-all shadow-sm"
                                    title="Edit Package"
                                  >
                                    <RefreshCcw className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={(ev) => { ev.stopPropagation(); handleDeletePackage(p.id!); }}
                                    className="p-2.5 bg-slate-100 text-slate-400 hover:bg-red-500 hover:text-white rounded-lg transition-all shadow-sm"
                                    title="Delete Package"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
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
                        <div className="flex items-center gap-3">
                          {selectedPackage.id && (
                            <button
                              type="button"
                              onClick={() => handleDeletePackage(selectedPackage.id!)}
                              className="bg-red-50 text-red-600 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border border-red-100 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Delete Package
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setIsEditingPackage(false)}
                            className="bg-[#4F46E5] text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-[#4338CA] transition-all"
                          >
                            Manage Packages
                          </button>
                        </div>
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
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Package Title (Public Display)</label>
                                <input value={selectedPackage.title} onChange={e => setSelectedPackage({ ...selectedPackage, title: e.target.value })} className="w-full bg-[#f8fafc] border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="e.g. Luxury Maldives Escape" required />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Slug (System Reference)</label>
                                <input value={selectedPackage.slug} onChange={e => setSelectedPackage({ ...selectedPackage, slug: e.target.value })} className="w-full bg-[#f8fafc] border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="e.g. maldives-luxury-one" required />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-8">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Region</label>
                              <select value={selectedPackage.region} onChange={e => setSelectedPackage({ ...selectedPackage, region: e.target.value, category: getCategoryOptions(e.target.value)[0] })} className="w-full bg-[#f8fafc] border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all">
                                <option value="India">India</option>
                                <option value="Dubai">Dubai</option>
                                <option value="International">International</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Trip Category</label>
                              <select value={selectedPackage.category} onChange={e => setSelectedPackage({ ...selectedPackage, category: e.target.value })} className="w-full bg-[#f8fafc] border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all">
                                {getCategoryOptions(selectedPackage.region).map(opt => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Package Priority</label>
                              <select value={selectedPackage.is_featured ? 'yes' : 'no'} onChange={e => setSelectedPackage({ ...selectedPackage, is_featured: e.target.value === 'yes' })} className="w-full bg-[#f8fafc] border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all">
                                <option value="no">Standard Visibility</option>
                                <option value="yes">Feature on Home Page</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-8 pt-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                              <input value={selectedPackage.duration} onChange={e => setSelectedPackage({ ...selectedPackage, duration: e.target.value })} className="w-full bg-[#f8fafc] border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="e.g. 5 Days 4 Nights" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rating Score</label>
                              <input value={selectedPackage.rating} onChange={e => setSelectedPackage({ ...selectedPackage, rating: e.target.value })} className="w-full bg-[#f8fafc] border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="e.g. 4.9 (240)" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Guest Capacity</label>
                              <input value={selectedPackage.guest_capacity} onChange={e => setSelectedPackage({ ...selectedPackage, guest_capacity: e.target.value })} className="w-full bg-[#f8fafc] border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="e.g. 4-6 guest" />
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

        {/* --- DETAIL MODALS --- */}
        {selectedLead && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fade-in" onClick={() => setSelectedLead(null)}>
            <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900">Enquiry Particulars</h3>
                <button onClick={() => setSelectedLead(null)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                    <p className="text-base font-bold text-slate-900">{selectedLead.full_name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-base font-bold text-slate-900 underline underline-offset-4 decoration-indigo-200">{selectedLead.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                    <p className="text-base font-bold text-slate-900">{selectedLead.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requested Destination</p>
                    <p className="text-base font-bold text-indigo-600">{selectedLead.destination}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Travel Date</p>
                    <p className="text-base font-bold text-slate-900">{selectedLead.travel_date || 'Not specified'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Travelers (A+C)</p>
                    <p className="text-base font-bold text-slate-900">{selectedLead.adults} Adults / {selectedLead.children || '0'} Children</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Customer Message</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-wrap bg-slate-50 p-6 rounded-2xl border border-slate-100">{selectedLead.message || "No specific instructions provided."}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPkgEnquiry && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fade-in" onClick={() => setSelectedPkgEnquiry(null)}>
            <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Package Enquiry Detail</h3>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">Specific Property Interest</p>
                </div>
                <button onClick={() => setSelectedPkgEnquiry(null)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Person</p>
                    <p className="text-base font-bold text-slate-900">{selectedPkgEnquiry.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Work Email</p>
                    <p className="text-base font-bold text-slate-900">{selectedPkgEnquiry.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                    <p className="text-base font-bold text-slate-900">{selectedPkgEnquiry.phone || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Package</p>
                    <p className="text-base font-bold text-indigo-600">{selectedPkgEnquiry.package_title || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proposed Date</p>
                    <p className="text-base font-bold text-slate-900">{selectedPkgEnquiry.travel_date || 'Flexible'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Travelers</p>
                    <p className="text-base font-bold text-slate-900">{selectedPkgEnquiry.num_travelers || '1'} Person(s)</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Message / Requirements</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-wrap bg-indigo-50/20 p-6 rounded-2xl border border-indigo-100/50">{selectedPkgEnquiry.message || "No specific requirements."}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedContact && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-fade-in" onClick={() => setSelectedContact(null)}>
            <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-black text-slate-900">General Contact Message</h3>
                <button onClick={() => setSelectedContact(null)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</p>
                    <p className="text-base font-bold text-slate-900">{selectedContact.first_name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</p>
                    <p className="text-base font-bold text-slate-900">{selectedContact.last_name || 'N/A'}</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-base font-bold text-slate-900 underline underline-offset-4 decoration-indigo-200">{selectedContact.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                    <p className="text-base font-bold text-slate-900">{selectedContact.phone || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submission Date</p>
                    <p className="text-base font-bold text-slate-900">{new Date(selectedContact.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Complete Message</p>
                  <p className="text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-wrap bg-slate-50 p-6 rounded-2xl border border-slate-100">{selectedContact.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {view === 'trending' && (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900">
                  Trending Destinations{' '}
                  <span className="text-slate-400 ml-2 font-bold">({trendingDestinationsList.length})</span>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={trendingNewName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrendingNewName(e.target.value)}
                  placeholder="Place name (e.g. Maldives)"
                  className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  onClick={() => trendingInputRef.current?.click()}
                  disabled={isTrendingUploading}
                  className="bg-[#4F46E5] text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-[#4338CA] transition-all flex items-center gap-2 disabled:opacity-60 whitespace-nowrap"
                >
                  <Upload className="w-4 h-4" />
                  {isTrendingUploading ? 'Uploading…' : 'Upload Image'}
                </button>
              </div>
              <input
                ref={trendingInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setIsTrendingUploading(true);
                  try {
                    const url = await handleFileUpload(file);
                    if (url) {
                      const added = await trendingApi.add(url, trendingNewName.trim(), trendingDestinationsList.length);
                      setTrendingDestinationsList(prev => [...prev, added]);
                      setTrendingNewName('');
                    }
                  } catch (err: any) {
                    alert('Upload failed: ' + err.message);
                  } finally {
                    setIsTrendingUploading(false);
                    e.target.value = '';
                  }
                }}
              />
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center gap-3 py-20">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Loading images…</p>
              </div>
            ) : trendingDestinationsList.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center gap-4 py-20">
                <ImageIcon className="w-10 h-10 text-slate-300" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No images yet</p>
                <p className="text-[11px] text-slate-300 font-bold">Upload images to show in the marquee</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {trendingDestinationsList.map((dest) => (
                  <div key={dest.id} className="flex flex-col gap-1">
                    <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-slate-200 aspect-[6/5] bg-slate-100">
                      <img src={dest.image_url} alt={dest.name || 'Trending'} className="w-full h-full object-cover" />
                      <button
                        onClick={async () => {
                          if (!window.confirm('Delete this image?')) return;
                          try {
                            await trendingApi.delete(dest.id);
                            setTrendingDestinationsList((prev: { id: number; name: string; image_url: string }[]) => prev.filter((d: { id: number }) => d.id !== dest.id));
                          } catch (err: any) {
                            alert('Delete failed: ' + err.message);
                          }
                        }}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {dest.name && (
                      <p className="text-xs font-bold text-slate-600 text-center truncate px-1">{dest.name}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
