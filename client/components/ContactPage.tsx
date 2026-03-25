
import React, { useState } from 'react';
import { ArrowUpRightIcon, LocationIcon } from './Icons';
import { contact } from '../lib/apiClient';
import { Facebook, Twitter, Instagram, Plane } from 'lucide-react';

const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await contact.submit({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setIsSent(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});

      setTimeout(() => setIsSent(false), 5000);

    }
    catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header Section */}
      <div className="lg:h-[340px] z-0 mt-[-9%]  h-[300px] w-full flex items-center justify-center lg:bg-contain bg-cover  " style={{
        backgroundImage: "url('/images/contact.png')",
        // backgroundSize: "contain",
        backgroundPosition: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}>
        <h1 className="text-3xl  md:text-6xl font-sans font-black text-white text-center drop-shadow-lg">
          Get In Touch
        </h1>
      </div>

      <div className="w-full md:w-[80%] mx-auto px-6 py-[30px]">
        <div className="flex flex-col md:flex-row justify-between md:items-start items-center justify-center gap-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-[38px] text-center lg:text-left font-sans font-black text-slate-900 tracking-tight">
              Get in touch with us
            </h2>
            <h3 className="text-3xl md:text-[38px] text-center lg:text-left font-sans font-black text-[#00A9D7] tracking-tight">
              We're here to assist you
            </h3>
          </div>
          <div className="flex flex-row md:flex-col gap-5 pt-4">
            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full border border-[#00A9D7]/60 flex items-center justify-center text-[#1B2534] hover:bg-[#00A9D7]/5 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {isSent ? (
          <div className="py-20 text-center animate-fade-in-up bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-[#00A9D7]/10 rounded-full flex items-center justify-center text-[#00A9D7] text-4xl mx-auto mb-6">✓</div>
            <h3 className="text-3xl font-sans font-black text-slate-900 mb-4">Message Sent!</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-[30px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 lg:gap-y-10 gap-y-6">
              <div className="">
                <label className="text-[17px] font-medium text-slate-800 block">First Name</label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-slate-200 pb-3 text-slate-900 focus:border-[#00A9D7] outline-none transition-colors text-lg"
                />
              </div>
              <div className="">
                <label className="text-[17px] font-medium text-slate-800 block">Last Name</label>
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-transparent border-b border-slate-200 pb-3 text-slate-900 focus:border-[#00A9D7] outline-none transition-colors text-lg"
                />
              </div>
              <div className="">
                <label className="text-[17px] font-medium text-slate-800 block">Email Address</label>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full bg-transparent border-b border-slate-200 pb-3 text-slate-900 focus:border-[#00A9D7] outline-none transition-colors text-lg"
                />
              </div>
              <div className="">
                <label className="text-[17px] font-medium text-slate-800 block">Phone Number</label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className="w-full bg-transparent border-b border-slate-200 pb-3 text-slate-900 focus:border-[#00A9D7] outline-none transition-colors text-lg"
                />
              </div>
            </div>

            <div className="">
              <label className="text-[17px] font-medium text-slate-800 block">Message</label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={1}
                className="w-full bg-transparent border-b border-slate-200 pb-3 text-slate-900 focus:border-[#00A9D7] outline-none transition-colors resize-none text-lg "
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-3 bg-[#00A9D7] text-white px-6 py-5 rounded-full font-bold text-[14px] shadow-xl hover:bg-[#0092BA] transition-all transform hover:-translate-y-1 active:scale-95 group"
            >
              {isSubmitting ? "Sending..." : "Leave us a Message"}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>
        )}


      </div>
      <div className="mt-20 lg:mb-48">
        <div
          className="w-full h-[300px] relative flex flex-col items-center justify-start pt-16 overflow-visible rounded-[3rem]   hidden lg:block  "
          style={{
            backgroundImage: "url('/images/bannerfive.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >

          <h2 className="text-3xl md:text-[38px] font-sans font-black text-white text-center z-10 px-4">
            We are always happy to assist you
          </h2>

          {/* Floating Contact Card */}
          <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-10 md:p-14 border border-slate-50 z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#00A9D7]/30">
              {/* Office Section */}
              <div className="md:pr-10">
                <h4 className="text-xl font-bold text-slate-900 mb-6">Our Office</h4>
                <div className="w-8 h-1 bg-[#00A9D7] mb-8"></div>
                <p className="text-slate-600 text-[15px] leading-relaxed">
                  Dream Destinas Tours & Travels (A Division of Global Connect World Travel) 1st Floor, Tenco Complex, Pallikkunnu, Kannur, Kerala – 670004
                </p>
              </div>

              {/* Phone Section */}
              <div className="md:px-10">
                <h4 className="text-xl font-bold text-slate-900 mb-6">Phone Support</h4>
                <div className="w-8 h-1 bg-[#00A9D7] mb-8"></div>
                <div className="space-y-2">
                  <p className="text-slate-600 text-[15px]">
                    +971 58 952 0398,<br /> +91 89210 959738<span className="text-slate-400 font-medium"></span>
                  </p>
                  <p className="text-slate-600 text-[15px]">
                    +91 80758521708 ,<br />+91 7025791083 <span className="text-slate-400 font-medium"></span>
                  </p>
                </div>
              </div>

              {/* Email Section */}
              <div className="md:pl-10">
                <h4 className="text-xl font-bold text-slate-900 mb-6">Email Address</h4>
                <div className="w-8 h-1 bg-[#00A9D7] mb-8"></div>
                <p className="text-slate-600 text-[15px] break-all leading-relaxed">
                  santhosh@globalconnectworldtravel.com
                  <br />  booking@globalconnectworldtravel.com
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* mobile */}
        {/* mobile */}
        <div className="lg:hidden block text-center px-4">

          <h2 className="text-3xl font-sans font-white text-slate-900 mb-10 font-bold">
            We are always happy to assist you
          </h2>

          {/* Contact Card */}
          <div className="w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 border border-slate-50">

            <div className="grid grid-cols-1 gap-8 divide-y divide-[#00A9D7]/30">

              {/* Office */}
              <div className="pt-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Our Office</h4>
                <div className="w-8 h-1 bg-[#00A9D7] mb-6 mx-auto"></div>

                <p className="text-slate-600 text-[14px] leading-relaxed">
                  Dream Destinas Tours & Travels (A Division of Global Connect World Travel)
                  1st Floor, Tenco Complex, Pallikkunnu, Kannur, Kerala – 670004
                </p>
              </div>

              {/* Phone */}
              <div className="pt-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Phone Support</h4>
                <div className="w-8 h-1 bg-[#00A9D7] mb-6 mx-auto"></div>

                <p className="text-slate-600 text-[14px]">
                  +971 58 952 0398 <br />
                  +91 89210 959738
                </p>

                <p className="text-slate-600 text-[14px] mt-2">
                  +91 80758521708 <br />
                  +91 7025791083
                </p>
              </div>

              {/* Email */}
              <div className="pt-6">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Email Address</h4>
                <div className="w-8 h-1 bg-[#00A9D7] mb-6 mx-auto"></div>

                <p className="text-slate-600 text-[14px] break-all">
                  santhosh@globalconnectworldtravel.com
                  <br />
                  booking@globalconnectworldtravel.com
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
