import React from 'react';
import { useNavigate } from 'react-router-dom';
import { indiaTours } from './IndiaToursSection';
import { LocationIcon } from './Icons';
import { Users } from 'lucide-react';

const OFFERS = [
  { id: 1, title: 'INTERNATIONAL TOURS FROM INDIA', image: '/images/indiai.png', },
  // { id: 2, title: 'DUBAI TOURS', image: '/images/airplanes.png', },
  { id: 3, title: 'INDIA LOCAL TOURS', image: '/images/indiaL.png', },
  // { id: 4, title: 'DUBAI LOCAL TOURS', image: '/images/jeep.png', },
];

interface IndiaToursPageProps {
  onBack: () => void;
  onExplore: (tour: any) => void;
  onBookClick: () => void;
}

// Helper Component for Tour Card
function TourCard({ tour, onExplore, onBookClick }: any) {
  return (
    <div
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
            className="w-full bg-[#00A9D7]/10 text-[#00A9D7] px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:shadow-md">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

const IndiaToursPage: React.FC<IndiaToursPageProps> = ({ onBack, onExplore, onBookClick }) => {
  const navigate = useNavigate();

  const northTours = indiaTours.filter(tour => tour.category === 'North');
  const southTours = indiaTours.filter(tour => tour.category === 'South');

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Header */}
      <section className=" w-full flex items-center overflow-hidden bg-white px-6 md:px-14 ">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch relative z-10 py-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-5">
              <h1 className="text-5xl md:text-[59px] font-sans font-black text-slate-600 leading-[1.1] tracking-wide">
                Book Your <span className="text-[#2CB8E5]">India</span><br />
                <span className="text-[#2CB8E5]">Tours Today</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed">
                Explore the rich culture, historic landmarks, scenic landscapes, and vibrant traditions of India with our specially curated tour packages.              </p>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all group">
                  Tour Guide
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all">
                  Explore More
                </button>
              </div>
            </div>

            <div className="mt-[20px]">
              <img src="/images/INDIA.png" alt="" className="max-w-xs md:max-w-md" />
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="w-[600px] h-[492px]"
            style={{
              backgroundImage: "url('/images/indiaRight.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
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
          <div className="text-white text-[38px] font-bold text-center mb-12">International Trips from India
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full px-6 md:px-14">
            {indiaTours.slice(0, 4).map((tour) => (
              <TourCard key={tour.id} tour={tour} onExplore={onExplore} onBookClick={onBookClick} />
            ))}
          </div>
        </div>

        {/* North India Tours Section */}
        <div className="max-w-[1440px] mx-auto py-16 px-6 md:px-14 mt-40">
          <h2 className="text-4xl md:text-[38px] font-sans font-black text-slate-900 leading-tight mb-12">
            North India <span className="text-[#00A9D7]">Tours</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {northTours.slice(4).map((tour) => (
              <TourCard key={tour.id} tour={tour} onExplore={onExplore} onBookClick={onBookClick} />
            ))}
          </div>
        </div>

        {/* South India Tours Section */}
        <div className="max-w-[1440px] mx-auto py-16 px-6 md:px-14">
          <h2 className="text-4xl md:text-[38px] font-sans font-black text-slate-900 leading-tight mb-12">
            South India <span className="text-[#00A9D7]">Tours</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {southTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onExplore={onExplore} onBookClick={onBookClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaToursPage;
