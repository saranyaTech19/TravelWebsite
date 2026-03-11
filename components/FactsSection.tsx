
import React, { useRef, useEffect, useState } from 'react';
import { LocationIcon, ArrowUpRightIcon, ChevronDownIcon } from './Icons';
import { getWhatsAppLink } from "../utils/whatsapp";

export const tours = [
  {
    id: 1,
    title: "Desert Safari Adventure",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
    description: "Experience the thrill of dune bashing, camel riding, and a traditional Bedouin dinner under the stars.",
    rating: "5.00 (528)",
    duration: "6 Hours",
    tag: "Adventure",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600",
      "https://images.unsplash.com/photo-1523805081730-614449379e7d?q=80&w=600",
      "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Dune Bashing", detail: "Thrilling 4x4 drive across the golden sand dunes." },
      { day: "Day 2", title: "Camel Trek", detail: "Traditional camel ride through the desert landscape." },
      { day: "Day 3", title: "BBQ Dinner", detail: "Delicious buffet dinner with live cultural performances." }
    ]
  },
  {
    id: 2,
    title: "Burj Khalifa Observation Deck Tour",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    description: "Visit the world's tallest building and enjoy breathtaking 360-degree views of the city skyline.",
    rating: "5.00 (420)",
    duration: "2 Hours",
    tag: "Skyline",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Level 124 & 125", detail: "Access to the main observation decks for panoramic views." },
      { day: "Day 2", title: "Telescope View", detail: "High-powered telescopes to see the city in detail." },
      { day: "Day 3", title: "Sky Views", detail: "Optional glass slide experience for thrill-seekers." }
    ]
  },
  {
    id: 3,
    title: "Luxury Yacht & Marina Cruise",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=1200&auto=format&fit=crop",
    description: "Sail through the Dubai Marina on a luxury yacht and witness the city's futuristic architecture.",
    rating: "4.90 (215)",
    duration: "3 Hours",
    tag: "Luxury",
    gallery: [
      "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=600",
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600",
      "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Marina Cruise", detail: "Glide past the JBR and Blue Waters Island." },
      { day: "Day 2", title: "Sunset Views", detail: "Perfect photo opportunities as the sun sets over the Gulf." },
      { day: "Day 3", title: "Onboard Dining", detail: "Enjoy light refreshments and snacks while cruising." }
    ]
  },
  
];

interface TourCardProps {
  tour: any;
  onExplore?: (tour: any) => void;
  className?: string;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onExplore, className = "" }) => {
  return (
    <div className={`bg-white rounded-[2.5rem] overflow-hidden border border-brand-dark/5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group snap-start flex flex-col h-full ${className}`}>
      {/* Image Container */}
      <div className="p-5 pb-0">
        <div className="aspect-[16/11] rounded-[2rem] overflow-hidden relative">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop';
            }}
          />
          {/* Badge */}
          <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
            <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">{tour.tag}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 pt-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-brand-gold mb-3">
          <LocationIcon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{tour.location}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-gold transition-colors leading-tight">
          {tour.title}
        </h3>

       

        {/* Stats Row */}
        <div className="mt-auto bg-[#FFF8ED] rounded-2xl p-5 border border-brand-gold/10">
          <div className="flex justify-between items-center text-[12px] font-bold text-brand-dark">
            <div className="flex items-center gap-2  justify-center">
              <svg className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {tour.rating}
            </div>
            <div className="h-6 w-[1px] bg-brand-dark/10"></div>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <svg className="w-4 h-4 text-brand-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tour.duration}
            </div>
          </div>
        </div>

        {/* Footer Button */}
        
      </div>
    </div>
  );
};

interface FactsSectionProps {
  onExplore?: (tour: any) => void;
  onViewAll?: () => void;
}

const FactsSection: React.FC<FactsSectionProps> = ({ onExplore, onViewAll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const cardWidth = window.innerWidth < 768 ? 320 : 420;
      // Responsive gap matching the Packages page grid
      const gap = window.innerWidth < 1024 ? 32 : 64;
      const slideAmount = cardWidth + gap;

      let nextScrollPosition;

      if (direction === 'right') {
        nextScrollPosition = scrollLeft + slideAmount;
        if (nextScrollPosition >= scrollWidth - clientWidth + 10) {
          nextScrollPosition = 0;
        }
      } else {
        nextScrollPosition = scrollLeft - slideAmount;
        if (nextScrollPosition < 0) {
          nextScrollPosition = scrollWidth - clientWidth;
        }
      }

      scrollRef.current.scrollTo({ left: nextScrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (!isPaused) {
        scroll('right');
      }
    }, 4000);

    return () => clearInterval(autoplay);
  }, [isPaused]);

  return (
    <section className="global-page-container bg-brand-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-40 -right-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10 relative z-10">
          <div className="max-w-2xl">
            <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-4 text-left">
              Popular Packages
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-8 leading-tight text-left">
              The Journey of a Lifetime
            </h2>
            <p className="text-brand-dark/60 text-base md:text-lg leading-relaxed max-w-xl font-medium text-left">
              From the highest peaks to the deepest cultures, we curate travel experiences that speak to your soul. Explore our most requested tour packages.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => { scroll('left'); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
                className="w-14 h-14 rounded-full border-2 border-brand-dark/10 flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all transform rotate-90 active:scale-90"
                aria-label="Previous Slide"
              >
                <ChevronDownIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => { scroll('right'); setIsPaused(true); setTimeout(() => setIsPaused(false), 5000); }}
                className="w-14 h-14 rounded-full border-2 border-brand-dark/10 flex items-center justify-center hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all transform -rotate-90 active:scale-90"
                aria-label="Next Slide"
              >
                <ChevronDownIcon className="w-6 h-6" />
              </button>
            </div>

            <button
              onClick={() => onViewAll?.()}
              className="hidden lg:flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
            >
              View All Packages <ArrowUpRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group/carousel">
        <div
          // ref={scrollRef}
          // onMouseEnter={() => setIsPaused(true)}
          // onMouseLeave={() => setIsPaused(false)}
          // onScroll={updateProgress}
          className="flex flex-col md:flex-row    overflow-x-auto snap-x snap-mandatory    no-scrollbar scroll-smooth inline-flex gap-0 p-0 "
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onExplore={onExplore} className="min-w-[264px] md:min-w-[340px] mx-[10px]" />
          ))}
          {/* Spacer to prevent cutting off the last card */}
          <div className="min-w-[1px] h-full"></div>
        </div>

        {/* Progress Bar */}

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FactsSection;
