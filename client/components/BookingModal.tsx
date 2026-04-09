import React, { useState, useEffect } from 'react';
import { CalendarIcon, UsersIcon } from './Icons';
import { enquiries } from '../lib/apiClient';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  travelDate: string;
  countryCode: string;
  phone: string;
  travelOrigin: string;
  destination: string;
  adults: string;
  children: string;
  tentativeBudget: string;
  specificRequirements: string;
}

interface FormErrors {
  [key: string]: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    travelDate: '',
    countryCode: '+971',
    phone: '',
    travelOrigin: '',
    destination: '',
    adults: '',
    children: '',
    tentativeBudget: '',
    specificRequirements: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.travelDate.trim()) newErrors.travelDate = 'Travel date is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.countryCode === '+91' && formData.phone.length !== 10) {
      newErrors.phone = 'Indian number must be exactly 10 digits';
    } else if (formData.countryCode === '+971' && formData.phone.length !== 9) {
      newErrors.phone = 'UAE number must be exactly 9 digits';
    }
    if (!formData.travelOrigin.trim()) newErrors.travelOrigin = 'Travel origin is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.adults.trim()) {
      newErrors.adults = 'Required';
    } else if (Number(formData.adults) < 1) {
      newErrors.adults = 'At least 1 adult';
    }
    if (formData.children && Number(formData.children) < 0) {
      newErrors.children = 'Invalid number';
    }
    if (!formData.tentativeBudget.trim()) newErrors.tentativeBudget = 'Budget is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Save to MySQL via API
      await enquiries.submit({
        full_name: formData.fullName,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        travel_origin: formData.travelOrigin,
        destination: formData.destination || 'General Enquiry',
        travel_date: formData.travelDate,
        adults: formData.adults,
        children: formData.children,
        tentative_budget: formData.tentativeBudget,
        specific_requirements: formData.specificRequirements,
      });

      setIsSubmitted(true);
      setFormData({
        fullName: '', email: '', travelDate: '', countryCode: '+971', phone: '',
        travelOrigin: '', destination: '', adults: '', children: '',
        tentativeBudget: '', specificRequirements: '',
      });
    } catch (err: any) {
      console.error('Submission Error:', err.message);
      alert(err.message || 'Submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPhoneMaxLength = (code: string) => (code === '+91' ? 10 : 9);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      const maxLen = getPhoneMaxLength(formData.countryCode);
      setFormData(prev => ({ ...prev, phone: digitsOnly.slice(0, maxLen) }));
    } else if (name === 'countryCode') {
      const maxLen = getPhoneMaxLength(value);
      setFormData(prev => ({
        ...prev,
        countryCode: value,
        phone: prev.phone.slice(0, maxLen),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
    if (name === 'countryCode' && errors.phone) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs.phone;
        return newErrs;
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 overflow-y-auto py-4 no-scrollbar">
      <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[600px] max-h-[90vh] rounded-[3rem] shadow-2xl animate-fade-in-up flex flex-col shrink-0 overflow-y-auto no-scrollbar">
        <button onClick={onClose} className="absolute top-8 right-8 text-brand-dark/20 hover:text-brand-dark transition-colors z-20">✕</button>

        <div className="p-6 md:p-8 h-full flex flex-col justify-center">
          {isSubmitted ? (
            <div className="py-16 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl">✓</div>
              <h2 className="text-2xl font-serif font-bold text-brand-dark">Enquiry Sent!</h2>
              <p className="text-[#64718C] text-base max-w-xs mx-auto">
                Thank you! Our consultant will contact you shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="">
                <h2 className="text-[32px] font-serif font-bold text-brand-dark leading-tight">Enquiry Form</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Full Name</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} autoComplete="off" placeholder="name" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.fullName ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} autoComplete="off" type="email" placeholder="email" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.email ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Preferred Travel Date</label>
                    <div className="relative">
                      <input name="travelDate" value={formData.travelDate} onChange={handleChange} type="date" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none appearance-none font-medium text-sm border ${errors.travelDate ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all`} />
                      <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-dark/20 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">
                      Mobile Number
                    </label>
                    <div className={`flex items-center bg-[#FFF8F1] rounded-xl border ${errors.phone ? 'border-red-400' : 'border-transparent'} focus-within:border-brand-gold/30 transition-all`}>
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="bg-transparent  py-2.5 text-brand-dark outline-none font-bold text-sm cursor-pointer"
                      >
                        <option value="+971">+971</option>
                        <option value="+91">+91</option>
                      </select>
                      {/* <div className="w-px h-5 bg-brand-dark/10 shrink-0"></div> */}
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="off"
                        type="tel"
                        maxLength={formData.countryCode === '+91' ? 10 : 9}
                        placeholder={formData.countryCode === '+91' ? '9876543210' : '501234567'}
                        className="w-full bg-transparent px-3 py-2.5 text-brand-dark outline-none font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Travel Origin</label>
                    <input name="travelOrigin" value={formData.travelOrigin} onChange={handleChange} placeholder="e.g. Dubai" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.travelOrigin ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Destination</label>
                    <input name="destination" value={formData.destination} onChange={handleChange} placeholder="e.g. Maldives" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.destination ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">No. of Adults</label>
                    <input name="adults" value={formData.adults} onChange={handleChange} type="number" min="1" placeholder="e.g. 2" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.adults ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">No. of Children</label>
                    <input name="children" value={formData.children} onChange={handleChange} type="number" min="0" placeholder="e.g. 1" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.children ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Tentative Budget</label>
                    <input name="tentativeBudget" value={formData.tentativeBudget} onChange={handleChange} placeholder="AED 149" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.tentativeBudget ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Any Specific Requirements</label>
                  <textarea name="specificRequirements" value={formData.specificRequirements} onChange={handleChange} rows={3} placeholder="Please share any special requests, preferences, or travel requirements such as meal preferences, accessibility needs, hotel preferences, or additional assistance" className="w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border border-transparent focus:border-brand-gold/30 transition-all font-medium text-sm resize-none" />
                </div>

                <div className="pt-1">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-brand-dark text-white py-3.5 rounded-xl font-bold text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg transition-all hover:bg-brand-gold hover:text-brand-dark disabled:opacity-70 group">
                    {isSubmitting ? 'Sending...' : 'SEND ENQUIRY'}
                    <span className="text-base transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;