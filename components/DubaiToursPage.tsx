import React from 'react';
import { useNavigate } from 'react-router-dom';
import { popularTours } from './PopularToursSection';
import { LocationIcon } from './Icons';
import { Users } from 'lucide-react';

interface DubaiToursPageProps {
  onBack: () => void;
  onExplore: (tour: any) => void;
  onBookClick: () => void;
}

const OFFERS = [
  // { id: 1, title: 'INDIA TOURS', image: '/images/travel.png', },
  { id: 2, title: 'INTERNATIONAL TOURS FROM DUBAI', image: '/images/dubaii.png', },
  // { id: 3, title: 'INDIA LOCAL TOURS', image: '/images/trolly.png', },
  { id: 4, title: 'DUBAI LOCAL TOURS', image: '/images/dubaiL.png', },
];

const DubaiToursPage: React.FC<DubaiToursPageProps> = ({ onBack, onExplore, onBookClick }) => {
  const navigate = useNavigate();
  const standardTours = popularTours.filter(tour => tour.category === 'Standard');
  const localTours = popularTours.filter(tour => tour.category === 'Local');

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header */}
      <section className=" w-full flex items-center overflow-hidden bg-white px-6 md:px-14 ">
        {/* DUBAI Background Watermark */}


        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch relative z-10 py-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-5">
              <h1 className="text-5xl md:text-[59px] font-sans font-black text-slate-600 leading-[1.1] tracking-wide">
                Book Your <span className="text-[#2CB8E5]">Dubai</span><br />
                <span className="text-[#2CB8E5]">Tours Today</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed">
                Explore Dubai’s famous landmarks, desert safaris, luxury shopping, and top attractions with our curated tour experiences.             </p>
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
              <img src="/images/DUBAI.png" alt="" className="max-w-xs md:max-w-md" />
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

          <div className="flex  justify-center gap-12 relative">
            {OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="relative rounded-[40px] overflow-hidden p-10 h-[300px] w-[550px] bg-no-repeat bg-center bg-cover rounded-[2.5rem]   group cursor-pointer"
                style={{ backgroundImage: `url(${offer.image})` }}
              >
                {/* TITLE */}
                <h3 className="text-white font-black text-[32px] leading-tight">
                  {offer.title}<br />
                </h3>

                {/* BUTTON */}
                <button
                  onClick={onBookClick}
                  className="absolute bottom-10 left-10 text-sm border-2 text-[#00A9D7] bg-white px-[32px] py-[14px] rounded-full font-bold hover:bg-white hover:text-[#00A9D7] transition-all"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        {/* New Design Grid */}


        {/* Commented Old Design - Kept as requested */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {popularTours.map((tour) => (
            <div
              key={tour.id}
              onClick={() => onExplore(tour)}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-dark/5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-full cursor-pointer"
            >
              <div className="p-5 pb-0">
                <div className="aspect-[16/11] rounded-[2rem] overflow-hidden relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                    <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">{tour.tag}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-brand-gold mb-3">
                  <LocationIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{tour.location}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                  {tour.title}
                </h3>

                <div className="mt-auto bg-[#FFF8ED] rounded-2xl p-5 border border-brand-gold/10">
                  <div className="flex justify-between items-center text-[12px] font-bold text-brand-dark">
                    <div className="flex items-center gap-2 justify-center">
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
              </div>
            </div>
          ))}
        </div> */}

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
          <div className="text-white text-[38px] font-bold text-center mb-12">International Trips from Dubai</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14">
            {popularTours.slice(0, 4).map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer border border-slate-50"
              >
                {/* Image Container */}
                <div className="relative p-3 h-[200px]">
                  <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                    <img
                      src={tour.image}
                      alt={tour.title}
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
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                      </div>
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-[#00A9D7]" strokeWidth={3} />
                      </div>
                      4-6 guest
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookClick();
                      }}
                      className="w-full bg-[#00A9D7]/10 text-[#00A9D7] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:shadow-md">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dubai Tour Section */}
        <div className="max-w-[1440px] mx-auto py-16 px-6 md:px-14 mt-[180px]">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standardTours.slice(4).map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer border border-slate-50"
              >
                {/* Image Container */}
                <div className=" p-3 h-[200px] ">
                  <div className="w-full h-full rounded-[24px] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
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
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                      </div>
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-[#00A9D7]" strokeWidth={3} />
                      </div>
                      4-6 guest
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookClick();
                      }}
                      className="w-full bg-[#00A9D7]/10 text-[#00A9D7] px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:shadow-md">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dubai Local Tour Section */}
        <div className="max-w-[1440px] mx-auto py-12 px-6 md:px-14">
          <h2 className="text-4xl md:text-[38px] font-sans font-black text-slate-900 leading-tight mb-12">
            Dubai <span className="text-[#00A9D7]">Local Tour</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {localTours.map((tour) => (
              <div
                key={tour.id}
                onClick={() => onExplore(tour)}
                className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer border border-slate-50"
              >
                {/* Image Container */}
                <div className="relative p-3 h-[200px]">
                  <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                    <img
                      src={tour.image}
                      alt={tour.title}
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
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#00A9D7]" />
                      </div>
                      {tour.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-[#00A9D7]" strokeWidth={3} />
                      </div>
                      4-6 guest
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookClick();
                      }}
                      className="w-full bg-[#00A9D7]/10 text-[#00A9D7] px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:shadow-md">
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

export default DubaiToursPage;
