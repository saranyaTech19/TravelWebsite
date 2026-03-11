
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
        <Navbar
          onNavigate={navigateTo}
          onBookClick={toggleBooking}
          currentView={currentView as any}
        />

        <main className="w-full">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* <Hero onContactClick={toggleBooking} onSearch={handleSearch} />
                  <AboutSection onExplore={() => navigate("/about")} />
                  <DestinationsSection onExplore={() => navigate("/destinations")} />
                  <PopularToursSection onExplore={handlePackageClick} />
                  <IndiaToursSection onExplore={handlePackageClick} />
                  <PopularDestinationsSection
                    onExplore={handlePackageClick}
                    onViewAll={() => navigate("/destinations")}
                  />
                  <GallerySection /> */}
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
              element={<AdminDashboard />}
            />
            <Route
              path="/subhome"
              element={<SubHome onExplore={handlePackageClick} />}
            />

          </Routes>
        </main>

        <Footer onContactClick={toggleBooking} onNavigate={navigateTo} />
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />



        <button onClick={scrollTop} className={`fixed bottom-8 right-8 w-14 h-14 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 z-50 hover:bg-brand-gold hover:-translate-y-2 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
      </div>
    </AuthProvider>
  );
};

export default App;
