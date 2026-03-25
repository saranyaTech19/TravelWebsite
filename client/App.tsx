
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import DestinationsSection from './components/DestinationsSection';
import PopularToursSection from './components/PopularToursSection';
import IndiaToursSection from './components/IndiaToursSection';
import PopularDestinationsSection from './components/PopularDestinationsSection';
import FactsSection from './components/FactsSection';
import StatsSection from './components/StatsSection';
import WideBanner from './components/WideBanner';
import GallerySection from './components/GallerySection';
import BlogSection from './components/BlogSection';
import CaptureBeautySection from './components/CaptureBeautySection';
import FaqSection from './components/FaqSection';
import TestimonialSection from './components/TestimonialSection';
import Footer from './components/Footer';
import DestinationsPage from './components/DestinationsPage';
import DubaiToursPage from './components/DubaiToursPage';
import IndiaToursPage from './components/IndiaToursPage';
import PackagesPage from './components/PackagesPage';
import HolidaysPage from './components/HolidaysPage';
import AboutPage from './components/AboutPage';
import SearchPage from './components/SearchPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import BookingModal from './components/BookingModal';
import PackageDetailPage from './components/PackageDetailPage';
import BlogDetailPage from './components/BlogDetailPage';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SubHome from './components/SubHome';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import { getWhatsAppLink } from './utils/whatsapp';
import { slugify } from './utils/slugify';
import { motion } from "motion/react";


function RouteSync() {
  const location = useLocation();

  useEffect(() => {
    window.parent.postMessage(
      { path: location.pathname },
      "*"
    );
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}


const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScroll, setShowScroll] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'destinations' | 'packages' | 'about' | 'search' | 'blog' | 'contact' | 'package-detail' | 'blog-detail' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const navigateTo = (view: string) => {
    if (view.startsWith('/')) {
      navigate(view);
      return;
    }

    const pathMap: Record<string, string> = {
      home: '/',
      destinations: '/destinations',
      packages: '/packages',
      about: '/about',
      aboutus: '/about',
      blog: '/blog',
      contact: '/contact',
      search: '/search',
      admin: '/admin'
    };

    const normalizedView = view.toLowerCase().replace(/\s/g, '');
    const path = pathMap[normalizedView] || pathMap[view] || '/';
    navigate(path);
    setCurrentView(view as any);
  };
  const handleSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (q === 'india') {
      navigate('/india-tours');
    } else if (q === 'dubai') {
      navigate('/dubai-tours');
    } else {
      setSearchQuery(query);
      navigateTo('search');
    }
  };
  const toggleBooking = () => setIsBookingOpen(!isBookingOpen);
  const handlePackageClick = (tour: any) => {
    const slug = slugify(tour.title);
    navigate(`/tour/${slug}`);
  };
  const handleBlogClick = (blog: any) => {
    setSelectedBlog(blog);
    navigateTo(`/blog/${blog.id}`);
  };

  return (
    <AuthProvider>
      <RouteSync />
      <div className="min-h-screen bg-brand-bg relative w-full overflow-x-hidden">
        {location.pathname !== '/admin' && (
          <Navbar
            onNavigate={navigateTo}
            onBookClick={toggleBooking}
            currentView={currentView as any}
          />
        )}

        <main className="w-full">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SubHome
                    onExplore={handlePackageClick}
                    onBookClick={toggleBooking}
                  />

                </>
              }
            />

            <Route
              path="/destinations"
              element={<DestinationsPage onBookClick={toggleBooking} />}
            />

            <Route
              path="/dubai-tours"
              element={<DubaiToursPage onBack={() => navigate("/")} onExplore={handlePackageClick} onBookClick={toggleBooking} />}
            />

            <Route
              path="/india-tours"
              element={<IndiaToursPage onBack={() => navigate("/")} onExplore={handlePackageClick} onBookClick={toggleBooking} />}
            />

            <Route
              path="/packages"
              element={<PackagesPage onBack={() => navigate("/")}
                onExplore={handlePackageClick} onBookClick={toggleBooking} />}
            />

            <Route
              path="/holidays"
              element={<HolidaysPage onBack={() => navigate("/")}
                onExplore={handlePackageClick} onBookClick={toggleBooking} />}
            />

            <Route
              path="/about"
              element={<AboutPage onBack={() => navigate("/")} onBookClick={toggleBooking} />}
            />

            <Route
              path="/search"
              element={<SearchPage query={searchQuery} onBack={() => navigate("/")} />}
            />

            <Route
              path="/blog"

              element={<BlogPage onBlogClick={handleBlogClick} onExplore={handlePackageClick} />}
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />

            <Route
              path="/package/:id"
              element={<PackageDetailPage onBookClick={toggleBooking} />}
            />

            <Route
              path="/tour/:id"
              element={<PackageDetailPage onBookClick={toggleBooking} />}
            />

            <Route
              path="/blog/:id"
              element={<BlogDetailPage />}
            />

            <Route
              path="/admin"
              element={<AdminDashboard onBack={() => navigate("/")} />}
            />
            <Route
              path="/terms"
              element={<TermsAndConditions />}
            />
            <Route
              path="/privacy"
              element={<PrivacyPolicy />}
            />
            <Route
              path="/subhome"
              element={<SubHome onExplore={handlePackageClick} />}
            />

          </Routes>
        </main>

        {location.pathname !== '/admin' && (
          <Footer onContactClick={toggleBooking} onNavigate={navigateTo} />
        )}
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />



        {location.pathname !== '/admin' && (
          <a
            href={getWhatsAppLink('Hi! I would like to enquire about your travel packages.')}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-[60px] right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 hover:-translate-y-2"
            style={{ backgroundColor: '#25D366' }}
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.003 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.358.632 4.663 1.832 6.678L2.667 29.333l6.823-1.789A13.267 13.267 0 0 0 16.003 29.333C23.365 29.333 29.333 23.363 29.333 16c0-7.363-5.968-13.333-13.33-13.333Zm0 24.267a11.006 11.006 0 0 1-5.61-1.536l-.402-.238-4.046 1.06 1.08-3.938-.262-.414A10.976 10.976 0 0 1 5.001 16c0-6.068 4.937-11.001 11.002-11.001C22.069 4.999 27 9.932 27 16c0 6.066-4.931 10.934-10.997 10.934Zm6.03-8.197c-.33-.166-1.953-.963-2.256-1.072-.303-.11-.523-.165-.743.166-.22.33-.852 1.072-1.044 1.292-.193.22-.385.247-.715.083-.33-.165-1.394-.514-2.656-1.638-.982-.875-1.645-1.955-1.838-2.285-.193-.33-.02-.509.145-.673.149-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.79-1.018-2.45-.268-.643-.54-.555-.743-.565l-.633-.011c-.22 0-.578.083-.881.413-.303.33-1.155 1.128-1.155 2.75s1.183 3.19 1.348 3.41c.165.22 2.328 3.556 5.643 4.988.789.34 1.404.543 1.884.695.791.252 1.511.216 2.08.131.635-.094 1.953-.798 2.228-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385Z" />
            </svg>
          </a>
        )}

        {/* <button onClick={scrollTop} className={`fixed bottom-8 right-8 w-14 h-14 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 hover:bg-brand-gold hover:-translate-y-2 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button> */}
      </div>
    </AuthProvider>
  );
};

export default App;
