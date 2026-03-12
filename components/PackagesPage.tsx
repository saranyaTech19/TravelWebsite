
import React, { useState, useEffect } from 'react';
import { TourCard } from './FactsSection';
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, ArrowRight, ChevronLeft, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { indiaTours } from './IndiaToursSection';
import { popularTours } from './PopularToursSection';
import { useRef } from 'react';
import { LocationIcon } from './Icons';

const OFFERS = [
  { id: 1, title: 'INDIA TOURS', image: '/images/travel.png', },
  { id: 2, title: 'DUBAI TOURS', image: '/images/airplanes.png', },
  { id: 3, title: 'INDIA LOCAL TOURS', image: '/images/trolly.png', },
  { id: 4, title: 'DUBAI LOCAL TOURS', image: '/images/jeep.png', },
];

const INDIA_DESTINATIONS = [
  {
    name: 'Andaman',
    price: '17,300',
    image: 'https://img.freepik.com/free-photo/beautiful-tropical-beach-sea_74190-6583.jpg?t=st=1772696448~exp=1772700048~hmac=e6bcdb44f062cfbb307890ab604633f14a83b86e277dfa067312089ae40aa986&w=1060',
    tourId: 105
  },
  {
    name: 'Sri lanka',
    price: '34,100',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'North east',
    price: '18,900',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Rajasthan',
    price: '18,000',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Kashmir',
    price: '16,300',
    image: 'https://img.freepik.com/free-photo/beautiful-view-rigi-mountain-range-sunny-winter-day-with-brick-buildings_181624-16950.jpg?t=st=1772696594~exp=1772700194~hmac=04aa72cfe8d3fc7e356a5a905a0c06da4de8ea992703a4677cae456016ae6704&w=1060',
  },
];


const INDIA_DESTINATION_SOUTH = [
  {
    name: 'Munnar',
    price: '17,300',
    image: 'https://img.freepik.com/free-photo/beautiful-tropical-beach-sea_74190-6583.jpg?t=st=1772696448~exp=1772700048~hmac=e6bcdb44f062cfbb307890ab604633f14a83b86e277dfa067312089ae40aa986&w=1060',
    tourId: 105
  },
  {
    name: 'Ooty',
    price: '34,100',
    image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Mysore',
    price: '18,900',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Hampi',
    price: '18,000',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Rameswaram',
    price: '16,300',
    image: 'https://img.freepik.com/free-photo/beautiful-view-rigi-mountain-range-sunny-winter-day-with-brick-buildings_181624-16950.jpg?t=st=1772696594~exp=1772700194~hmac=04aa72cfe8d3fc7e356a5a905a0c06da4de8ea992703a4677cae456016ae6704&w=1060',
  },
];



const BEST_SELLING_PACKAGES = [
  {
    id: 'B01',
    title: 'Andaman',
    price: '49,999',
    image: 'public/images/aerial-view-sandy-beach-with-tourists-swimming-beautiful-clear-sea-water-sumilon-island-beach-landing-near-oslob-cebu-philippines-boost-up-color-processing.jpg',
    tourId: 105
  },
  {
    id: 'B02',
    title: 'Kashmir',
    price: '37,900',
    image: 'public/images/snow-village-shirakawago.jpg',
  },
  {
    id: 'B03',
    title: 'Kerala',
    price: '53,000',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
    tourId: 102
  },
  {
    id: 'B04',
    title: 'Sri Lanka',
    price: '34,128',
    image: 'https://img.freepik.com/free-photo/beautiful-tropical-beach-sea_74190-6583.jpg?t=st=1772696448~exp=1772700048~hmac=e6bcdb44f062cfbb307890ab604633f14a83b86e277dfa067312089ae40aa986&w=1060',
  },
  {
    id: 'B05',
    title: 'Andaman',
    price: '49,990',
    image: 'public/images/aerial-view-sandy-beach-with-tourists-swimming-beautiful-clear-sea-water-sumilon-island-beach-landing-near-oslob-cebu-philippines-boost-up-color-processing.jpg',
    tourId: 105
  }
];

const EXPLORE_BY_THEME = [
  {
    title: 'Honeymoon',
    image: 'public/images/snow-village-shirakawago.jpg'
  },
  {
    title: 'Wildlife & Safari',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Short Getaways',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Spiritual Journeys',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop'
  },
  {
    title: 'Luxury Holidays',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop'
  }
];

const packagesList = [
  ...indiaTours.slice(0, 4),
  ...popularTours.slice(0, 4)
];

interface PackagesPageProps {
  onBack: () => void;
  onExplore: (tour: any) => void;
  onBookClick?: () => void;
}

const PackagesPage: React.FC<PackagesPageProps> = ({ onBack, onExplore, onBookClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDestination, setActiveDestination] = useState(0);
  const [activeDestinationSouth, setActiveDestinationSouth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPausedSouth, setIsPausedSouth] = useState(false);

  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  // Filter packages based on search query
  const filteredPackages = packagesList.filter(pkg =>
    pkg.title.toLowerCase().includes(searchQuery) ||
    pkg.location.toLowerCase().includes(searchQuery) ||
    pkg.description.toLowerCase().includes(searchQuery)
  );



  // Autoplay Effect
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveDestination((prev) => (prev + 1) % INDIA_DESTINATIONS.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, [isPaused]);

  // Autoplay Effect for South India
  React.useEffect(() => {
    if (isPausedSouth) return;

    const timer = setInterval(() => {
      setActiveDestinationSouth((prev) => (prev + 1) % INDIA_DESTINATION_SOUTH.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, [isPausedSouth]);

  const handleBookNow = (pkg: any) => {
    navigate(`/package/${pkg.id}`);
  };

  const bestSellingRef = useRef<HTMLDivElement>(null);
  const [bestSellingPaused, setBestSellingPaused] = useState(false);

  const bestSellingScroll = (direction: 'left' | 'right') => {
    if (bestSellingRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = bestSellingRef.current;
      const scrollAmount = clientWidth / (window.innerWidth < 1024 ? 1 : 4);

      let nextScrollPosition;
      if (direction === 'right') {
        nextScrollPosition = scrollLeft + scrollAmount;
        if (nextScrollPosition >= scrollWidth - clientWidth) {
          nextScrollPosition = 0;
        }
      } else {
        nextScrollPosition = scrollLeft - scrollAmount;
        if (nextScrollPosition < 0) {
          nextScrollPosition = scrollWidth - clientWidth;
        }
      }

      bestSellingRef.current.scrollTo({ left: nextScrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (!bestSellingPaused) {
        bestSellingScroll('right');
      }
    }, 4000);
    return () => clearInterval(autoplay);
  }, [bestSellingPaused]);

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header */}
      <section className=" w-full flex items-center overflow-hidden bg-white px-6 md:px-14 ">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch relative z-10 py-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-5">
              <h1 className="text-5xl md:text-[56px] font-sans font-black text-slate-600 leading-[1.1] tracking-wide">
                Book Your <span className="text-[#2CB8E5]">Special</span><br />
                <span className="text-[#2CB8E5]">Packages Today</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed">
                Curated journeys designed for those who seek the extraordinary. Explore our exclusive travel packages tailored to your desires.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onBookClick}
                  className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all group">
                  Book Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                {/* <button className="px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all">
                  Explore More
                </button> */}
              </div>
            </div>

            <div className="mt-[20px]">
              <img src="/images/PACKAGES.png" alt="" className="" />
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="w-[600px] h-[492px]"
            style={{
              backgroundImage: "url('/images/dubaibanner.png')",
              backgroundSize: "contain",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </section>

      {/* Main Content Area */}
      {searchQuery ? (
        <div className="max-w-screen-2xl mx-auto px-6 md:px-14 py-20">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-[38px] font-sans font-black text-slate-900">
              Search Results for <span className="text-[#00A9D7]">"{searchQuery}"</span>
            </h2>
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{filteredPackages.length} Packages</span>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handleBookNow(pkg)}
                  className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer border border-slate-50"
                >
                  <div className="relative p-3 h-[200px]">
                    <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                    </div>
                  </div>
                  <div className="px-7 pb-7 pt-2 flex flex-col flex-grow text-left">
                    <h3 className="text-[17px] font-black text-slate-900 leading-tight mb-4 group-hover:text-[#00A9D7] transition-colors line-clamp-2 h-12">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                        </div>
                        {pkg.duration}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button className="w-full bg-[#00A9D7]/10 text-[#00A9D7] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No packages found</h3>
              <p className="text-slate-500">Try adjusting your search terms to find what you're looking for.</p>
              <button
                onClick={() => navigate('/packages')}
                className="mt-8 px-8 py-3 bg-[#00A9D7] text-white rounded-full font-bold text-sm hover:bg-[#008db3] transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Dream Destination Section */}
          <section className="relative overflow-hidden py-4 bg-white">
            <div className="max-w-[1440px] mx-auto relative z-10 px-6 md:px-14">
              <div className="text-left mb-12">
                <h2 className="text-4xl md:text-[38px] font-sans font-black text-slate-900 leading-tight">
                  Choose Your <br /> <span className="text-[#00A9D7]">Dream Destination</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {OFFERS.map((offer) => (
                  <div
                    key={offer.id}
                    className="relative rounded-3xl overflow-hidden p-6 h-[180px] bg-no-repeat bg-right-bottom bg-contain shadow-sm border border-slate-100"
                    style={{ backgroundImage: `url(${offer.image})` }}
                  >
                    <h3 className="text-white font-bold text-[20px] leading-tight">
                      {offer.title.split(' ').slice(0, -1).join(' ')}<br />
                      {offer.title.split(' ').slice(-1)}
                    </h3>
                    <button className="absolute bottom-6 left-6 text-xs border border-white text-white px-[20px] py-[10px] rounded-full hover:bg-white/10 transition-colors">
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Packages Grid Section */}
          <div className="max-w-screen-2xl mx-auto px-6 py-4">
            <div
              className="w-full h-[360px] mx-auto relative flex flex-col items-center justify-start pt-24 pb-20 overflow-visible mt-12 rounded-[40px]"
              style={{
                backgroundImage: "url('/images/bannerfive.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="text-white text-[38px] font-bold text-center mb-12">Amazing Trendings desinations</div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14">
                {packagesList.slice(0, 4).map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handleBookNow(pkg)}
                    className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer border border-slate-50"
                  >
                    <div className="relative p-3 h-[200px]">
                      <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                      </div>
                    </div>
                    <div className="px-7 pb-7 pt-2 flex flex-col flex-grow text-left">
                      <h3 className="text-[17px] font-black text-slate-900 leading-tight mb-4 group-hover:text-[#00A9D7] transition-colors line-clamp-2 h-12">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                          </div>
                          {pkg.duration}
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-center">
                        <button className="w-full bg-[#00A9D7]/10 text-[#00A9D7] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:shadow-md">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[1440px] mx-auto py-16 px-6 md:px-14 mt-[200px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {packagesList.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handleBookNow(pkg)}
                    className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer border border-slate-50 mt-[20px]"
                  >
                    <div className="relative p-3 h-[200px]">
                      <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                      </div>
                    </div>
                    <div className="px-7 pb-7 pt-2 flex flex-col flex-grow text-left">
                      <h3 className="text-[17px] font-black text-slate-900 leading-tight mb-4 group-hover:text-[#00A9D7] transition-colors line-clamp-2 h-12">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                          </div>
                          {pkg.duration}
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-center">
                        <button className="w-full bg-[#00A9D7]/10 text-[#00A9D7] px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:shadow-md">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PackagesPage;
