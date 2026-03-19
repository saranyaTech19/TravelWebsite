
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LocationIcon } from './Icons';

const OFFERS = [
    { id: 1, title: 'INDIA TOURS', image: '/images/travel.png', },
    { id: 2, title: 'DUBAI TOURS', image: '/images/airplanes.png', },
    { id: 3, title: 'INDIA LOCAL TOURS', image: '/images/trolly.png', },
    { id: 4, title: 'DUBAI LOCAL TOURS', image: '/images/jeep.png', },
];

const HOLIDAY_DESTINATIONS = [
    {
        name: 'Maldives Honeymoon',
        price: '85,000',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop',
        tourId: 101
    },
    {
        name: 'Bali Luxury Retreat',
        price: '65,000',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'Swiss Alps Escape',
        price: '1,45,000',
        image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'Santorini Sunset',
        price: '1,10,000',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'Paris Romance',
        price: '95,000',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    }
];

const ADVENTURE_HOLIDAYS = [
    {
        name: 'Leh Ladakh Bike Trip',
        price: '35,000',
        image: 'https://images.unsplash.com/photo-1581791538302-03537b9c97bf?q=80&w=1200&auto=format&fit=crop',
        tourId: 103
    },
    {
        name: 'Everest Base Camp',
        price: '1,20,000',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'Iceland Northern Lights',
        price: '1,80,000',
        image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'African Safari Kenya',
        price: '2,10,000',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
    },
    {
        name: 'New Zealand Skydiving',
        price: '2,40,000',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    }
];



const RECOMMENDED_HOLIDAYS = [
    {
        id: 'RH01',
        title: 'Swiss Alps',
        price: '1,45,000',
        image: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'RH02',
        title: 'Maldives',
        price: '85,000',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
        tourId: 101
    },
    {
        id: 'RH03',
        title: 'Santorini',
        price: '1,10,000',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'RH04',
        title: 'Bali',
        price: '65,000',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'RH05',
        title: 'Paris',
        price: '95,000',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    }
];

interface HolidaysPageProps {
    onBack: () => void;
    onExplore: (tour: any) => void;
    onBookClick?: () => void;
}

const HolidaysPage: React.FC<HolidaysPageProps> = ({ onBack, onExplore, onBookClick }) => {
    const navigate = useNavigate();
    const [activeHoliday, setActiveHoliday] = useState(0);
    const [activeAdventure, setActiveAdventure] = useState(0);
    const [isPausedHoliday, setIsPausedHoliday] = useState(false);
    const [isPausedAdventure, setIsPausedAdventure] = useState(false);

    const recommendedRef = useRef<HTMLDivElement>(null);
    const [recommendedPaused, setRecommendedPaused] = useState(false);



    // Autoplay for Holidays
    useEffect(() => {
        if (isPausedHoliday) return;
        const timer = setInterval(() => {
            setActiveHoliday((prev) => (prev + 1) % HOLIDAY_DESTINATIONS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isPausedHoliday]);

    // Autoplay for Adventure
    useEffect(() => {
        if (isPausedAdventure) return;
        const timer = setInterval(() => {
            setActiveAdventure((prev) => (prev + 1) % ADVENTURE_HOLIDAYS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isPausedAdventure]);

    const recommendedScroll = (direction: 'left' | 'right') => {
        if (recommendedRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = recommendedRef.current;
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

            recommendedRef.current.scrollTo({ left: nextScrollPosition, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const autoplay = setInterval(() => {
            if (!recommendedPaused) {
                recommendedScroll('right');
            }
        }, 4000);
        return () => clearInterval(autoplay);
    }, [recommendedPaused]);



    const allHolidays = [...HOLIDAY_DESTINATIONS, ...ADVENTURE_HOLIDAYS];

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
                                <span className="text-[#2CB8E5]">Holiday Today</span>
                            </h1>
                            <p className="text-slate-500 text-lg md:text-xl max-w-lg leading-relaxed">
                                Escape the ordinary and rediscover the world through our curated holiday journeys and luxury escapes.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all group">
                                    Holiday Guide
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                                <button className="px-8 py-4 rounded-full border border-[#2CB8E5] text-[#2CB8E5] font-bold text-sm hover:bg-[#2CB8E5]/5 transition-all">
                                    Explore More
                                </button>
                            </div>
                        </div>

                        <div className="mt-[20px]">
                            <img src="/images/HOLIDAYS.png" alt="" className="h-[59px] object-cover max-w-[100%] " />
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

            {/* Holiday Packages Grid Section */}
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
                        {RECOMMENDED_HOLIDAYS.slice(0, 4).map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => pkg.tourId && navigate(`/package/${pkg.tourId}`)}
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
                                            6 Days
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

                {/* Remaining Cards through out Holiday Sections */}
                <div className="max-w-[1440px] mx-auto py-16 px-6 md:px-14 mt-[200px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {RECOMMENDED_HOLIDAYS.map((pkg) => (
                            <div
                                key={pkg.id}
                                onClick={() => pkg.tourId && navigate(`/package/${pkg.tourId}`)}
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
                                            6 Days
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

export default HolidaysPage;
