
import React from 'react';
import { LocationIcon, ArrowUpRightIcon } from './Icons';
import { useNavigate } from 'react-router-dom';


export const popularDestinations = [
  {
    id: 1,
    title: "Paris, France",
    location: "Europe",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
    rating: "4.95 (1.2k)",
    duration: "5 Days",
    tag: "Romantic",
    description: "Experience the magic of the City of Light. From the iconic Eiffel Tower to the charming streets of Montmartre, Paris offers an unparalleled blend of history, art, and romance.",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=600",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Eiffel Tower", detail: "Arrive in Paris and check into your luxury hotel. Evening visit to the Eiffel Tower for sunset views." },
      { day: "Day 2", title: "Louvre Museum", detail: "Guided tour of the world's largest art museum, home to the Mona Lisa." },
      { day: "Day 3", title: "Seine River Cruise", detail: "Relaxing boat cruise along the Seine, passing Notre Dame and Musée d'Orsay." }
    ]
  },
  {
    id: 2,
    title: "Bali, Indonesia",
    location: "Asia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    rating: "4.88 (950)",
    duration: "7 Days",
    tag: "Tropical",
    description: "Escape to the Island of the Gods. Bali is a tropical paradise known for its volcanic mountains, iconic rice paddies, coral reefs, and spiritual culture.",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600",
      "https://images.unsplash.com/photo-1537953391648-762d018c19ad?q=80&w=600",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Ubud Arrival", detail: "Transfer to Ubud, the cultural heart of Bali. Evening traditional dance performance." },
      { day: "Day 2", title: "Tegalalang Rice Terrace", detail: "Explore the stunning rice terraces and visit the Sacred Monkey Forest Sanctuary." },
      { day: "Day 3", title: "Beach Day", detail: "Head to the southern coast for surfing, sunbathing, and a seafood dinner at Jimbaran Bay." }
    ]
  },
  {
    id: 3,
    title: "Santorini, Greece",
    location: "Europe",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    rating: "4.92 (840)",
    duration: "4 Days",
    tag: "Coastal",
    description: "Witness the most beautiful sunsets in the world. Santorini is famous for its white-washed buildings, blue-domed churches, and dramatic volcanic cliffs.",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=600",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Oia Sunset", detail: "Check into your caldera-view hotel and explore the charming village of Oia." },
      { day: "Day 2", title: "Volcano Tour", detail: "Boat trip to the volcanic islands of Nea Kameni and Palea Kameni." },
      { day: "Day 3", title: "Wine Tasting", detail: "Visit local wineries and sample Santorini's unique volcanic wines." }
    ]
  },
 
];

interface DestinationCardProps {
  destination: any;
  onExplore?: (destination: any) => void;
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onExplore, className = "" }) => {
  return (
    <div 
      onClick={() => onExplore?.(destination)}
      className={`bg-white rounded-[2.5rem] overflow-hidden border border-brand-dark/5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-full cursor-pointer ${className}`}
    >
      {/* Image Container */}
      <div className="p-5 pb-0">
        <div className="aspect-[16/11] rounded-[2rem] overflow-hidden relative">
          <img
            src={destination.image}
            alt={destination.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop';
            }}
          />
          {/* Badge */}
          <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
            <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">{destination.tag}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 pt-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-brand-gold mb-3">
          <LocationIcon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{destination.location}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-gold transition-colors leading-tight">
          {destination.title}
        </h3>

        {/* Stats Row */}
        <div className="mt-auto bg-[#FFF8ED] rounded-2xl p-5 border border-brand-gold/10">
          <div className="flex justify-between items-center text-[12px] font-bold text-brand-dark">
            <div className="flex items-center gap-2 justify-center">
              <svg className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {destination.rating}
            </div>
            <div className="h-6 w-[1px] bg-brand-dark/10"></div>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <svg className="w-4 h-4 text-brand-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {destination.duration}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting from</span>
            <span className="text-xl font-black text-brand-gold">
              {destination.price ? (destination.price.toString().startsWith('$') || destination.price.toString().startsWith('₹') ? destination.price : `₹${destination.price}`) : '₹17,300'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularDestinationsSection: React.FC<{ onExplore?: (dest: any) => void; onViewAll?: () => void }> = ({ onExplore, onViewAll }) => {
    const navigate = useNavigate();

  return (
    <section className="global-page-container bg-brand-bg relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10 relative z-10">
          <div className="max-w-2xl">
            <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-4">
              Explore More
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-8 leading-tight">
              Popular Packages
            </h2>
            <p className="text-brand-dark/60 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              Discover the most sought-after locations around the globe. From historical cities to tropical paradises, find your next dream destination.
            </p>
          </div>

          <button
            onClick={() => navigate("/packages")}
            className="hidden lg:flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:-translate-y-1 transition-all duration-300"
          >
            Explore All <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} onExplore={onExplore} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsSection;
