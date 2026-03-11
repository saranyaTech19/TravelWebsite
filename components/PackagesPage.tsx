
import React, { useState } from 'react';
import { TourCard } from './FactsSection';
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowRight, ChevronLeft, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRef, useEffect } from 'react';
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
  {
    id: 'P01',
    title: 'Maldives Paradise Escape',
    description: 'Bask in the absolute luxury of overwater villas and crystal clear lagoons. A dream destination for couples and sun-seekers alike.',
    duration: '8 Nights - 9 Days',
    rating: '5.00 (334)',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
    tag: 'Trending',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=600',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600'
    ],
    itinerary: [
      { day: "Day 1", title: "Malé Arrival", detail: "Arrive at Malé International Airport and transfer to your luxury resort via speedboat." },
      { day: "Day 2-4", title: "Island Life", detail: "Enjoy snorkeling, private beach dinners, and world-class spa treatments." },
      { day: "Day 5-7", title: "Water Sports", detail: "Participate in diving, windsurfing, or simply relax on the pristine white sands." },
      { day: "Day 8", title: "Sunset Cruise", detail: "Experience a private sunset cruise with dolphin watching." },
      { day: "Day 9", title: "Departure", detail: "Final breakfast and speedboat transfer back to Malé for departure." }
    ]
  },
  {
    id: 'P02',
    title: 'Swiss Alps Winter Tour',
    description: 'Experience the magic of the Alps with world-class skiing, gourmet dining, and breathtaking mountain vistas.',
    duration: '10 Nights - 11 Days',
    rating: '4.90 (128)',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=800&auto=format&fit=crop',
    tag: 'Limited',
    gallery: [
      'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=600',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600',
      'https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?q=80&w=600'
    ],
    itinerary: [
      { day: "Day 1", title: "Zürich Arrival", detail: "Arrival in Zürich and scenic train transfer to Zermatt." },
      { day: "Day 2-5", title: "Alpine Skiing", detail: "Four full days of premium skiing in the shadow of the Matterhorn." },
      { day: "Day 6-8", title: "St. Moritz Luxury", detail: "Transfer to St. Moritz for high-end shopping and glacier exploration." },
      { day: "Day 9-10", title: "Lucerne Retreat", detail: "Relax by Lake Lucerne and enjoy a panoramic cogwheel train ride." },
      { day: "Day 11", title: "Departure", detail: "Return to Zürich for your flight home." }
    ]
  },
  {
    id: 'P03',
    title: 'Tokyo Neon Nights',
    description: 'Explore the neon-lit streets, ancient temples, and culinary masterpieces of the world\'s most exciting metropolis.',
    duration: '6 Nights - 7 Days',
    rating: '4.80 (245)',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
    tag: 'Best Value',
    gallery: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600'
    ],
    itinerary: [
      { day: "Day 1", title: "Tokyo Arrival", detail: "Arrival at Narita. Check-in at Shinjuku and enjoy a local ramen tour." },
      { day: "Day 2", title: "Old & New Tokyo", detail: "Visit Meiji Shrine and Harajuku, followed by a trip to the SkyTree." },
      { day: "Day 3", title: "Tsukiji & Sushi", detail: "Fresh sushi breakfast at the fish market and a culinary workshop." },
      { day: "Day 4", title: "Akihabara Deep Dive", detail: "Explore the center of gaming and anime culture." },
      { day: "Day 5", title: "Mt. Fuji Excursion", detail: "Day trip to Lake Kawaguchi for views of the iconic peak." },
      { day: "Day 6", title: "Shibuya & Ginza", detail: "Luxury shopping and the world's busiest crossing." },
      { day: "Day 7", title: "Sayonara", detail: "Final morning in Tokyo before airport transfer." }
    ]
  },
  {
    id: 'P04',
    title: 'Santorini Sunset Escape',
    description: 'Experience the magic of Santorini with its iconic whitewashed buildings, blue domes, and breathtaking Aegean sunsets.',
    duration: '5 Nights - 6 Days',
    rating: '4.95 (182)',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
    tag: 'Romantic',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600',
      'https://images.unsplash.com/photo-1469796466635-455ede028acc?q=80&w=600',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600'
    ],
    itinerary: [
      { day: "Day 1", title: "Santorini Arrival", detail: "Arrival at Santorini Airport and transfer to your hotel in Oia." },
      { day: "Day 2", title: "Oia Exploration", detail: "Wander through the narrow streets and enjoy the caldera views." },
      { day: "Day 3", title: "Volcano & Hot Springs", detail: "Boat trip to the volcano and swimming in the hot springs." },
      { day: "Day 4", title: "Beach Day", detail: "Visit the unique Red Beach and Kamari Beach." },
      { day: "Day 5", title: "Wine Tasting", detail: "Enjoy a sunset wine tasting experience at a local vineyard." },
      { day: "Day 6", title: "Departure", detail: "Transfer to the airport for your flight home." }
    ]
  }
];

interface PackagesPageProps {
  onBack: () => void;
  onExplore: (tour: any) => void;
  onBookClick?: () => void;
}

const PackagesPage: React.FC<PackagesPageProps> = ({ onBack, onExplore, onBookClick }) => {
  const navigate = useNavigate();
  const [activeDestination, setActiveDestination] = useState(0);
  const [activeDestinationSouth, setActiveDestinationSouth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPausedSouth, setIsPausedSouth] = useState(false);



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
                <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all group">
                  Package Guide
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all">
                  Explore More
                </button>
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
                {/* TITLE */}
                <h3 className="text-white font-bold text-[20px] leading-tight">
                  {offer.title.split(' ').slice(0, -1).join(' ')}<br />
                  {offer.title.split(' ').slice(-1)}
                </h3>

                {/* BUTTON */}
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
        {/* Trending Destinations Banner with First 4 Cards */}
        <div
          className="w-full h-[360px] mx-auto  relative flex flex-col items-center justify-start pt-24 pb-20 overflow-visible mt-12 rounded-[40px]"
          style={{
            backgroundImage: "url('/images/bannerfive.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-white text-[38px] font-bold text-center mb-12">Amazing Trendings desinations</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14">
            {packagesList.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => handleBookNow(pkg)}
                  className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer border border-slate-50"
                >
                  {/* Image Container */}
                  <div className="relative p-3 h-[200px]">
                    <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Top Rated Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md">
                        <span className="text-[#00A9D7] text-[10px] font-black uppercase tracking-wider">Top Rated</span>
                      </div>

                      {/* Heart Icon */}
                      <button className="absolute top-4 right-4 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform group/heart">
                        <svg className="w-4 h-4 text-slate-400 group-hover/heart:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="px-7 pb-7 pt-2 flex flex-col flex-grow text-left">
                    <h3 className="text-[17px] font-black text-slate-900 leading-tight mb-4 group-hover:text-[#00A9D7] transition-colors line-clamp-2 h-12">
                      {pkg.title}
                    </h3>

                    <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                        </div>
                        {pkg.duration.split(' ')[0]} Days
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                          <Users className="w-3.5 h-3.5 text-[#00A9D7]" strokeWidth={3} />
                        </div>
                        4-6 guest
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

        {/* Remaining Cards through out Packages Sections */}
        <div className="max-w-[1440px] mx-auto py-16 px-6 md:px-14 mt-[200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packagesList.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => handleBookNow(pkg)}
                className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer border border-slate-50 mt-[20px]"
              >
                {/* Image Container */}
                <div className="relative p-3 h-[200px]">
                  <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Top Rated Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md">
                      <span className="text-[#00A9D7] text-[10px] font-black uppercase tracking-wider">Top Rated</span>
                    </div>

                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform group/heart">
                      <svg className="w-4 h-4 text-slate-400 group-hover/heart:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content Details */}
                <div className="px-7 pb-7 pt-2 flex flex-col flex-grow text-left">
                  <h3 className="text-[17px] font-black text-slate-900 leading-tight mb-4 group-hover:text-[#00A9D7] transition-colors line-clamp-2 h-12">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                      </div>
                      {pkg.duration.split(' ')[0]} Days
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-[#00A9D7]" strokeWidth={3} />
                      </div>
                      4-6 guest
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
    </div>
  );
};

export default PackagesPage;
