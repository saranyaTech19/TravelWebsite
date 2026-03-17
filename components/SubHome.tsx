
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import {
    Plane, Hotel, Palmtree, Ticket, FileText, Search, MapPin,
    Calendar, Users, ChevronRight, Star, Quote, Smartphone,
    Instagram, Facebook, Twitter, Linkedin, Mail, Phone,
    PlaneTakeoff, ShieldCheck, Headphones, ArrowUpRight, MoveRight
} from 'lucide-react';

const TABS = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'holidays', label: 'Holidays', icon: Palmtree },
    { id: 'tours', label: 'Tours', icon: Ticket },
    { id: 'visa', label: 'Visa', icon: FileText },
];

const OFFERS = [
    { id: 1, title: 'INDIA TOURS', image: '/images/indiaFrom.png', },
    { id: 2, title: 'DUBAI TOURS', image: '/images/dubaii.png', },
    { id: 3, title: 'INDIA LOCAL TOURS', image: '/images/indiaL.png', },
    { id: 4, title: 'DUBAI LOCAL TOURS', image: '/images/dubaiL.png', },
];

const AIRLINES = [
    { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg' },
    { name: 'US Airways', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/US_Airways_Logo.svg/1200px-US_Airways_Logo.svg.png' },
    { name: 'Wizz Air', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Wizz_Air_logo.svg/1280px-Wizz_Air_logo.svg.png' },
    { name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png' },
];

export const TOURS = [
    {
        id: 201, title: 'Rajasthan Heritage & Palaces Tour', location: 'Rajasthan, India', price: '$450', rating: '4.9', duration: '7 days 6 nights', guest: '2-4 guest', image: '/images/htwo.jpg', tag: 'Heritage',
        gallery: [
            "/images/hone.jpg",
            "/images/htwo.jpg",
            "/images/AbhudaiCityTourTwo.webp",
            "/images/hthree.jpg",
            "/images/hfour.jpg"
        ],
        overview: "Journey through the land of Maharajas and majestic forts. Our Rajasthan Heritage tour brings you into a world of royal palaces, vibrant bazaars, and golden desert sands, offering a glimpse into the opulent history of India's most colorful state.",
        highlights: [
            "Visit the majestic Amer Fort and City Palace in Jaipur",
            "Witness the sunset over the desert dunes",
            "Traditional Folk dance and music performance",
            "Guided tour of Jodhpur's Mehrangarh Fort",
            "Luxury stay in converted palace hotels"
        ],
        inclusions: [
            "6 nights premium heritage accommodation",
            "Daily royal breakfast and traditional Rajasthani dinner",
            "Private chauffeured transportation",
            "English-speaking local guides at all monuments",
            "Entry tickets to major palaces and forts"
        ],
        exclusions: [
            "Internal flight to Jaipur/Jodhpur",
            "Personal tips and gratuities",
            "Alcoholic beverages during meals",
            "Personal shopping and souvenirs",
            "Laundry and other room services"
        ]
    },
    {
        id: 202, title: 'Mumbai City Lights & Street Food', location: 'Mumbai, India', price: '$120', rating: '4.8', duration: '2 days 1 nights', guest: '2-6 guest', image: '/images/mumbai street food.jpg', tag: 'City',
        gallery: [
            "/images/mumfour.jpg",
            "/images/mumone.jpg",
            "/images/mumtwo.jpg",
            "/images/mumthree.jpg",
            "/images/hfour.jpg"
        ],
        overview: "Experience the electric energy of India's maximum city. From the colonial landmarks of South Mumbai to the bustling street food trails of Colaba and the iconic Marine Drive sunset, this tour captures the true spirit of Mumbai.",
        highlights: [
            "Guided street food crawl through Mumbai's best eateries",
            "Visit the iconic Gateway of India and Taj Mahal Palace",
            "Scenic drive along Marine Drive and Bandra-Worli Sea Link",
            "Explore the historic Victoria Terminus (CST) station",
            "Sunset views at Juhu Beach"
        ],
        inclusions: [
            "1 night stay in a luxury sea-facing hotel",
            "Curated street food tasting tour",
            "Private AC car for city sightseeing",
            "Local expert guide for market tours",
            "All toll and parking charges"
        ],
        exclusions: [
            "Lunch and Dinner (beyond street food tour)",
            "Monument entry fees",
            "Personal insurance",
            "Laundry and phone calls",
            "Anything not mentioned in inclusions"
        ]
    },
    {
        id: 203, title: 'Dubai Mall & Burj Khalifa Experience', location: 'Dubai, UAE', price: '$199', rating: '5.0', duration: '1 day', guest: '1-10 guest', image: '/images/burij khalifa.avif', tag: 'Luxury',
        gallery: [
            "/images/dm.jpg",
            "/images/DmFive.jpg",
            "/images/dmThree.jpg",
            "/images/dmtwo.jpg",
            "/images/hfour.jpg"
        ],
        overview: "Touch the sky with our exclusive Burj Khalifa experience. Visit the world's tallest building, witness the spectacular Dubai Fountain show, and enjoy world-class shopping and dining at the iconic Dubai Mall.",
        highlights: [
            "Access to At the Top level 124 & 125",
            "VIP view of the Dubai Fountain show",
            "Guided tour of the Dubai Aquarium & Underwater Zoo",
            "Luxury shopping experience at Dubai Mall",
            "Gourmet dining with views of the Burj Khalifa"
        ],
        inclusions: [
            "Entry tickets to Burj Khalifa observation deck",
            "Tickets to Dubai Aquarium & Underwater Zoo",
            "Private luxury transfer from hotel",
            "Gourmet lunch at a Dubai Mall restaurant",
            "Professional photographer for one souvenir portrait"
        ],
        exclusions: [
            "Personal shopping expenses",
            "Alcoholic drinks",
            "Tips for the driver",
            "Access to Level 148 (Sky level) unless upgraded",
            "Travel insurance"
        ]
    },
    {
        id: 204, title: 'Goa Coastal Adventure & Water Sports', location: 'Goa, India', price: '$85', rating: '4.7', duration: '1 day', guest: '2-8 guest', image: '/images/raul-varela-MnDgb8HH-y8-unsplash.jpg', tag: 'Adventure',

        gallery: [
            "/images/goa.jpg",
            "/images/goa.jpg",
            "/images/goaThree.jpg",
            "/images/goaTwo.jpg",
            "/images/hfour.jpg"
        ],
        overview: "Get your heart racing with our Goa coastal adventure. Spend a day on Goa's sun-drenched beaches participating in thrilling water sports, exploring hidden coves, and enjoying fresh seafood by the Arabian Sea.",
        highlights: [
            "Parasailing with views of the Goan coastline",
            "Jet ski and banana boat rides at Calangute",
            "Private boat trip for dolphin spotting",
            "Authentic Goan shack lunch on the beach",
            "Sunset beach walk at North Goa"
        ],
        inclusions: [
            "Full day of managed water sports activities",
            "Goan seafood buffet lunch",
            "Hotel pickup and drop-off in North Goa",
            "Professional life jackets and safety gear",
            "Safety instruction from certified trainers"
        ],
        exclusions: [
            "Personal video/photos during activities",
            "Additional snacks and drinks",
            "Alcoholic beverages",
            "Swimwear and sunscreen",
            "Gratuities for instructors"
        ]
    },
];

export const PACKAGES = [
    {
        id: 1, title: 'Kerala Premium Backwater Package', location: 'Kerala, India', price: '$299', rating: '4.9', duration: '5 days 4 nights', guest: '2-4 guest', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
        overview: "Experience God's Own Country with our premium backwater package. Stay in a luxury houseboat, explore lush tea plantations in Munnar, and relax by the serene beaches of Marari.",
        highlights: ["Overnight Houseboat Cruise", "Munnar Tea Garden Tour", "Kathakali Performance", "Spice Plantation Visit", "Kochi Heritage Walk"],
        inclusions: ["Luxury Accommodation", "All Meals on Houseboat", "Private transfers", "Guide services", "Entry tickets"],
        exclusions: ["Airfare", "Personal expenses", "Tips", "Insurance", "Optional activities"]
    },
    {
        id: 2, title: 'Himachal Snow Adventure Tour', location: 'Manali, India', price: '$350', rating: '4.7', duration: '6 days 5 nights', guest: '2-6 guest', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
        overview: "Discover the snow-capped peaks and adventurous spirit of Himachal. From paragliding in Solang Valley to the tranquility of Old Manali, this tour is perfect for thrill-seekers and nature lovers.",
        highlights: ["Rohtang Pass excursion", "Paragliding in Solang", "River Rafting in Beas", "Hadimba Temple visit", "Shopping at Mall Road"],
        inclusions: ["Mountain View Hotels", "Breakfast & Dinner", "Adventure activity guidance", "Private SUV for travel", "Permit fees"],
        exclusions: ["Flight tickets", "Equipment rental", "Personal snacks", "Tips", "Insurance"]
    },
    {
        id: 3, title: 'Andaman Crystal Waters Getaway', location: 'Andaman, India', price: '$450', rating: '4.8', duration: '4 days 3 nights', guest: '2-4 guest', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop',
        overview: "Relax on the pristine white sands of the Andaman Islands. Enjoy world-class scuba diving, explore historic sites like Cellular Jail, and witness stunning sunsets over the Bay of Bengal.",
        highlights: ["Scuba Diving at Havelock", "Cellular Jail Light & Sound Show", "Radhanagar Beach sunset", "Glass bottom boat ride", "Coral reef exploration"],
        inclusions: ["Island resorts stay", "Daily breakfast", "Ferry transfers between islands", "Snorkeling gear", "Private tours"],
        exclusions: ["Airfare to Port Blair", "Scuba diving costs", "Personal expenses", "Dinner (except cruise)", "Tips"]
    },
    {
        id: 4, title: 'Goa Sun-Kissed Beach Vacation', location: 'Goa, India', price: '$199', rating: '4.6', duration: '3 days 2 nights', guest: '2-8 guest', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
        overview: "Immerse yourself in the laid-back vibe of Goa. From North Goa's bustling beaches to the serene churches of Old Goa, experience the perfect coastal holiday.",
        highlights: ["Baga Beach water sports", "Old Goa Church tour", "Sunset cruise", "Night market visit", "Seafood shack experience"],
        inclusions: ["Beach-side hotel stay", "Daily breakfast", "Full day city tour", "Shared airport transfers", "Welcome drinks"],
        exclusions: ["Flights", "Water sports fees", "Alcoholic drinks", "Tips", "Personal shopping"]
    },
    {
        id: 5, title: 'Switzerland Alpine Magic Tour', location: 'Interlaken, Switzerland', price: '$899', rating: '4.9', duration: '7 days 6 nights', guest: '2-4 guest', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop',
        overview: "Discover the breathtaking beauty of the Swiss Alps. Visit iconic peaks, charming villages, and crystal-clear lakes in this ultimate European alpine adventure.",
        highlights: ["Jungfraujoch Top of Europe", "Mount Titlis cable car", "Scenic Golden Pass rail journey", "Lake Brienz boat trip", "Lucerne city tour"],
        inclusions: ["Luxury alpine hotels", "Daily Swiss breakfast", "Swiss Travel Pass", "Mountain excursion tickets", "Professional guides"],
        exclusions: ["International flights", "Ski equipment", "Lunch & Dinner", "Insurance", "Visas"]
    },
    {
        id: 6, title: 'Bali Tropical Paradise Escape', location: 'Ubud, Bali', price: '$499', rating: '4.8', duration: '5 days 4 nights', guest: '2-6 guest', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
        overview: "Relax in the heart of Bali's cultural soul. From lush rice terraces to ancient temples and stunning beaches, experience the magic of Ubud and Seminyak.",
        highlights: ["Tegalalang Rice Terrace tour", "Uluwatu Temple sunset", "Mount Batur sunrise trek", "Monkey Forest visit", "Beach club relaxation"],
        inclusions: ["Private pool villas", "Daily breakfast", "Private car & driver", "Snorkeling tour", "Temple entrance fees"],
        exclusions: ["International airfare", "Personal laundry", "Additional meals", "Tips", "Travel insurance"]
    },
    {
        id: 7, title: 'Paris Romantic City Getaway', location: 'Paris, France', price: '$650', rating: '4.7', duration: '4 days 3 nights', guest: '2-4 guest', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
        overview: "Fall in love with the City of Lights. Enjoy romantic walks along the Seine, visit iconic landmarks, and indulge in world-class French cuisine and pastries.",
        highlights: ["Eiffel Tower top level access", "Louvre Museum guided tour", "Seine River dinner cruise", "Montmartre walking tour", "Palace of Versailles trip"],
        inclusions: ["Chic Parisian hotel stay", "Daily breakfast", "Paris Museum Pass", "Public transport pass", "Gourmet dinner cruise"],
        exclusions: ["International flights", "Extra meals", "Shopping", "Tips", "Travel insurance"]
    },
    {
        id: 8, title: 'Dubai Desert Sands Adventure', location: 'Dubai, UAE', price: '$399', rating: '4.8', duration: '3 days 2 nights', guest: '2-8 guest', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
        overview: "Experience the thrill of the desert and the luxury of the city. From high-speed dune bashing to the top of the Burj Khalifa, Dubai is a world like no other.",
        highlights: ["Burj Khalifa Level 124", "Luxury Desert Safari with BBQ", "Dubai Fountain show", "Global Village tour", "Old Dubai boat ride"],
        inclusions: ["Luxury hotel stay", "Daily breakfast", "All tour transfers", "BBQ dinner in desert", "Observation deck tickets"],
        exclusions: ["International flights", "Adventure sports add-ons", "Tips", "Personal shopping", "Visas"]
    },
];

const BLOGS = [
    { id: 1, title: 'The Best Destination New York City For Drinks', date: 'September 12, 2024', image: 'https://images.unsplash.com/photo-1496442226666-8d4d2e62e6e9?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'All Inclusive Ultimate Cruise Island Day with Lunch', date: 'October 24, 2024', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'The Story Which Backpackers Around The World', date: 'November 05, 2024', image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'The Famous Great National Park Adventure Walkers', date: 'December 18, 2024', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop' },
];

const INSTAGRAM = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=400&auto=format&fit=crop',
];

const TRENDING_DESTINATIONS = [
    { id: 1, image: '/images/AbhudaiCityTourthree.jpg' },
    { id: 2, image: '/images/maladives.jpg' },
    { id: 3, image: '/images/siya.jpg' },
    { id: 4, image: '/images/desertone.jpg' },
    { id: 5, image: '/images/desrtFour.jpg' },
    { id: 6, image: '/images/safari.jpg' },
];

interface SubHomeProps {
    onExplore: (tour: any) => void;
    onBookClick: () => void;
}

const SubHome: React.FC<SubHomeProps> = ({ onExplore, onBookClick }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('holidays');
    const [dynamicTours, setDynamicTours] = useState<any[]>([]);
    const [dynamicPackages, setDynamicPackages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            setIsLoading(true);
            try {
                const { data: toursData } = await supabase
                    .from('tour_packages')
                    .select('*')
                    .eq('is_featured', true);

                if (toursData) {
                    setDynamicTours(toursData);
                    setDynamicPackages(toursData); // Use same featured set or refine query
                }
            } catch (err) {
                console.error('Error fetching home data:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHomeData();
    }, []);

    const displayTours = dynamicTours.length > 0 ? dynamicTours : TOURS;
    const displayPackages = dynamicPackages.length > 0 ? dynamicPackages : PACKAGES;

    const filteredTours = displayTours.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredPackages = displayPackages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const packagesPerPage = 4;
    const [pkgIndex, setPkgIndex] = useState(0);

    const handleNextPkg = () => {
        setPkgIndex((prev) => (prev + packagesPerPage >= filteredPackages.length ? 0 : prev + packagesPerPage));
    };

    const handlePrevPkg = () => {
        setPkgIndex((prev) => (prev - packagesPerPage < 0 ? Math.max(0, filteredPackages.length - packagesPerPage) : prev - packagesPerPage));
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow-subtle {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scroll-subtle {
          0% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
          100% { transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 1s ease-out forwards; }
        .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
        .animate-spin-slow-subtle { animation: spin-slow-subtle 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-scroll-subtle { animation: scroll-subtle 10s ease-in-out infinite; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .shadow-3xl { shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.4); }
      ` }} />

            {/* 1. HERO SECTION (BANNER) */}
            <section
                className="relative w-full lg:h-[760px] h-[500px]  lg:bg-white  bg-cover bg-center overflow-hidden flex items-center justify-center bg-[url('/images/backgrond.png')]   lg:bg-[url('/images/homeBg.png')] lg:bg-contain lg:bg-no-repeat lg:bg-center "
            // style={{
            //     backgroundImage: "url('/images/homeBg.png')",
            //     backgroundSize: "contain",
            //     backgroundRepeat: "no-repeat",
            //     backgroundPosition: "center"
            // }}
            >

                <div className="relative z-10 lg:left-[60px] max-w-[1440px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="lg:mt-[-60px] mt-[82px]">
                        <h2 className="text-[30px] md:text-[60px] font-sans font-bold text-center lg:text-left text-white drop-shadow-2xl leading-tight animate-fade-in-up">
                            Book Your Next <br /> Adventure Today
                        </h2>

                        <div className="flex gap-4 animate-fade-in-up delay-200 justify-center lg:justify-start">
                            {/* <button className="px-8 py-3 rounded-full border border-white/40 text-white font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-all group backdrop-blur-md">
                                Tour Guide <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button> */}
                            <button
                                onClick={onBookClick}
                                className="px-8 py-3 rounded-full border border-white/40 text-white font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-md"
                            >
                                Book Now
                            </button>
                        </div>

                        {/* Premium Redesigned Search Bar - Single Location Input */}
                        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-[32px] shadow-3xl p-3 animate-fade-in-up delay-400  border border-white/20 mt-[20px]">
                            <div className="flex items-center lg:gap-4 gap-2">
                                <div className="flex-1 flex items-center gap-4 lg:px-6 px-2 py-3 bg-gray-50/50 rounded-2xl border border-gray-100 group focus-within:border-[#00A9D7]/30 focus-within:bg-white transition-all">
                                    <MapPin className="w-5 h-5 text-[#00A9D7]" />
                                    <input
                                        type="text"
                                        placeholder="Where do you want to go?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-transparent text-lg font-bold text-gray-800 focus:outline-none w-full placeholder:text-gray-400 border-none ring-0"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        if (searchQuery.trim()) {
                                            navigate(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
                                        }
                                    }}
                                    className="lg:px-10 lg:h-14 h-10 bg-[#00A9D7] hover:bg-[#008db3] text-white rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest transition-all shadow-lg hover:shadow-xl shrink-0 group">
                                    <Search className="lg:w-4 lg:h-4  w-10 transition-transform group-hover:scale-110" />
                                    <span className="lg:block hidden"> Search</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* 2. DREAM DESTINATION SECTION */}
            <section className="global-page-container lg:mt-[-95px] relative overflow-hidden">
                <div className="max-w-7xl mx-auto  z-10">
                    <div className="text-left mb-10 animate-fade-in-up">
                        <h2 className="text-3xl text-center lg:text-left md:text-[45px] font-sans font-black text-slate-900 leading-tight px-[20px]">
                            Choose Your <br /> <span className="text-[#00A9D7]">Dream Destination</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative mx-[20px]">
                        {/* Decorative background element (curved dashed line) */}




                        {OFFERS.map((offer, idx) => (
                            <div
                                key={offer.id}
                                className={`relative rounded-3xl overflow-hidden p-6 h-[180px]  bg-no-repeat bg-right-bottom bg-cover  `}
                                style={{ backgroundImage: `url(${offer.image})` }}
                            >

                                {/* TITLE */}
                                <h3 className="text-white font-semibold text-[20px] leading-5 ">
                                    {offer.title.split(' ').slice(0, -1).join(' ')}<br />
                                    {offer.title.split(' ').slice(-1)}
                                </h3>

                                {/* BUTTON */}
                                <button
                                    onClick={() => {
                                        if (offer.title.includes('INDIA')) {
                                            navigate('/india-tours');
                                        } else if (offer.title.includes('DUBAI')) {
                                            navigate('/dubai-tours');
                                        }
                                    }}
                                    className="absolute bottom-6 left-6 text-xs  bg-white text-[#00A9D7] px-[20px] py-[10px] rounded-full"
                                >
                                    Book Now
                                </button>

                            </div>
                        ))}
                    </div>
                </div>
            </section>




            {/* section 3 */}

            <section className="bg-white  ">
                <div
                    className="w-full h-[360px] relative flex flex-col items-center justify-start lg:pt-24 overflow-visible global-page-container p-cards   lg:mt-[30px]"
                    style={{
                        backgroundImage: "url('/images/bannerfive.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="lg:text-white text-3xl text-black lg:text-[45px] text-3xl font-bold text-center">Amazing Trendings Desinations</div>

                    {/* Decorative Dashed Line */}
                    <div className="absolute top-[60%] left-0 right-0 -translate-y-1/2 pointer-events-none z-0 opacity-40">
                        <svg className="w-full h-40 overflow-visible" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M-50 80 C 200 140, 500 -20, 720 80 C 940 180, 1240 -20, 1490 80"
                                stroke="white"
                                strokeWidth="3"
                                strokeDasharray="12 12"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
                        {/* Heading with 3D Plane */}


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mt-[80px]">
                            {displayTours.map((tour: any) => (
                                <div
                                    key={tour.id}
                                    onClick={() => onExplore(tour)}
                                    className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer"
                                >
                                    {/* Image Container */}
                                    <div className="relative p-3 h-[160px]">
                                        <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                                            <img src={tour.image_url || tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />


                                        </div>
                                    </div>

                                    {/* Content Details */}
                                    <div className="px-7 pb-7 pt-2 flex flex-col flex-grow">
                                        <h3 className="text-[17px] font-black text-slate-900 leading-tight mb-4 group-hover:text-[#35BCE2] transition-colors">
                                            {tour.title}
                                        </h3>

                                        <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 mb-8 uppercase tracking-wide">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#35BCE2]/20 flex items-center justify-center">
                                                    <div className="w-1 h-1 rounded-full bg-[#35BCE2]" />
                                                </div>
                                                {tour.duration}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#35BCE2]/20 flex items-center justify-center">
                                                    <Users className="w-3.5 h-3.5 text-[#35BCE2]" strokeWidth={3} />
                                                </div>
                                                {tour.guest_capacity || tour.guest}
                                            </div>
                                        </div>

                                        <div className="mt-auto flex items-center justify-center">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); onBookClick?.(); }}
                                                className="bg-[#35BCE2]/10 text-[#35BCE2] w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#35BCE2] hover:text-white transition-all shadow-sm hover:shadow-md"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Recommended Packages */}
            {/* <section className=" bg-white relative overflow-hidden mt-[280px]">
                <div className="max-w-7xl mx-auto mx-6 relative z-10 global-page-container ">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-4xl md:text-[38px] font-sans font-black text-slate-900 mb-4 mx-6">
                                Recommend packages
                            </h2>
                            <p className="text-slate-400 font-medium mx-6">Specially curated travel experiences for you</p>
                        </div>
                    </div>

                    <div className="relative group/carousel  mx-6">
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0 opacity-10 ">
                            <svg className="w-full h-40 overflow-visible" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-50 80 C 200 140, 500 -20, 720 80 C 940 180, 1240 -20, 1490 80"
                                    stroke="#00A9D7"
                                    strokeWidth="3"
                                    strokeDasharray="12 12"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <button
                            onClick={handlePrevPkg}
                            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#00A9D7] border border-slate-200 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5 rotate-180 text-white" />
                        </button>
                        <button
                            onClick={handleNextPkg}
                            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#00A9D7] text-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            {filteredPackages.length > 0 ? (
                                filteredPackages.slice(pkgIndex, pkgIndex + packagesPerPage).map((pkg: any) => (
                                    <div
                                        key={pkg.id}
                                        onClick={() => onExplore(pkg)}
                                        className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer"
                                    >
                                        <div className="relative p-3 h-[200px]">
                                            <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                                                <img src={pkg.image_url || pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                                            </div>
                                        </div>

                                        <div className="px-7 pb-7 pt-2 flex flex-col flex-grow">
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
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-[#00A9D7]/20 flex items-center justify-center">
                                                        <Users className="w-3.5 h-3.5 text-[#00A9D7]" strokeWidth={3} />
                                                    </div>
                                                     {pkg.guest_capacity || pkg.guest}
                                                </div>
                                            </div>
                                            <div className="mt-auto flex items-center justify-center">
                                                <button className="bg-[#00A9D7]/10 text-[#00A9D7] w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00A9D7] hover:text-white transition-all shadow-sm hover:shadow-md">
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <p className="text-gray-400 text-lg font-bold">No packages found for "{searchQuery}".</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section> */}
            {/* sections 5*/}

            <section className="w-full lg:h-[621px] h-[400px] relative bg-[#00A9D7] lg:bg-white overflow-hidden lg:bg-[url('/images/bannerFour.png')] lg:bg-cover lg:bg-no-repeat lg:bg-center flex items-center justify-end px-6 lg:px-40 lg:mt-[275px] mt-[20px]" style={{
                // backgroundImage: "url('/images/bannerFour.png')",
                // backgroundSize: "cover",
                // backgroundPosition: "center",
                // backgroundRepeat: "no-repeat"
            }}>
                <div className="absolute lg:left-10 left-0 lg:top-12 z-10 max-w-2xl text-white space-y-8 animate-fade-in-right">
                    <h2 className="text-3xl md:text-[60px] text-center lg:text-left font-sans font-black leading-[1.1] tracking-tight drop-shadow-lg">
                        30% off for Online <br />
                        <span className="text-white">1st Booking</span>
                    </h2>

                    <p className="text-xl md:text-[20px] text-center lg:text-left font-medium leading-relaxed opacity-90 drop-shadow-md max-w-xl">
                        From sun-kissed beaches to vibrant city escapes,
                        soak up the perfect weather and create
                        unforgettable memories.
                    </p>

                    <div className="flex flex-wrap gap-6 pt-4 justify-center lg:justify-start">
                        <button
                            onClick={onBookClick}
                            className="px-10 py-4 bg-white/20 backdrop-blur-md border-2 border-white rounded-full text-white font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:bg-white hover:text-[#00A9D7] transition-all group shadow-xl"
                        >
                            Book Now
                            <MoveRight className="w-6 h-6 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                        </button>
                        {/* <button className="px-10 py-4 border-2 border-white/60 rounded-full text-white font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
                            Explore More
                        </button> */}
                    </div>
                </div>
            </section>

            {/* section 6 */}
            <div className="my-[40px]">

                <div
                    className="w-full h-[340px] relative flex flex-col items-center justify-start mt-[40px] overflow-visible rounded-[40px]"
                    style={{
                        backgroundImage: "url('/images/bannerfive.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="relative z-10 mt-[30px] ">
                        <h2 className="text-3xl md:text-[45px] font-sans font-black text-white text-center drop-shadow-lg lg:pt-[59px] ">
                            Trending India And Around  Destinations
                        </h2>
                    </div>

                    {/* Infinite Marquee Container */}
                    <div className="relative w-full overflow-hidden mt-6">
                        {/* Decorative Dashed Line background */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0 opacity-20">
                            <svg className="w-full h-40 overflow-visible" viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M-50 80 C 200 140, 500 -20, 720 80 C 940 180, 1240 -20, 1490 80"
                                    stroke="white"
                                    strokeWidth="4"
                                    strokeDasharray="15 15"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <motion.div
                            className="flex gap-8 px-6 relative z-10"
                            animate={{
                                x: [0, -1500],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...TRENDING_DESTINATIONS, ...TRENDING_DESTINATIONS, ...TRENDING_DESTINATIONS].map((dest, idx) => (
                                <div
                                    key={`${dest.id}-${idx}`}
                                    className="flex-shrink-0 w-[180px] h-[150px] rounded-[20px] overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500"
                                >
                                    <img
                                        src={dest.image}
                                        alt="Trending Destination"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
};

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 488 512" fill="#EA4335">
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
    </svg>
);

export default SubHome;