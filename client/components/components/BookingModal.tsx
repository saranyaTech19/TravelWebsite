import React, { useState } from 'react';
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
  phone: string;

}

interface FormErrors {
  [key: string]: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    travelDate: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Required';

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
        phone: formData.phone,
        travel_date: formData.travelDate,
        adults: '1 Adult',
        destination: 'General Enquiry',
      });

      setIsSubmitted(true);
      setFormData({
        fullName: '', email: '', travelDate: '', phone: '',
      });
    } catch (err: any) {
      console.error('Submission Error:', err.message);
      alert(err.message || 'Submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-4 no-scrollbar">
      <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[600px] rounded-[3rem] shadow-2xl animate-fade-in-up flex flex-col shrink-0">
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
              <div className="mb-4">
                <p className="font-cursive text-brand-gold text-[24px] leading-none mb-1">Book your spot</p>
                <h2 className="text-[32px] font-serif font-bold text-brand-dark leading-tight">Enquiry Form</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Full Name</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="name" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.fullName ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email" className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.email ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">Preferred Travel Date</label>
                    <div className="relative">
                      <input name="travelDate" value={formData.travelDate} onChange={handleChange} type="date" className="w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none appearance-none font-medium text-sm" />
                      <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-dark/20 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-[#8E95A5] uppercase tracking-widest ml-1">
                      Mobile Number
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="+971 50 123 4567"
                      className={`w-full bg-[#FFF8F1] rounded-xl px-4 py-2.5 text-brand-dark outline-none border ${errors.phone ? 'border-red-400' : 'border-transparent'} focus:border-brand-gold/30 transition-all font-medium text-sm`}
                    />
                  </div>
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