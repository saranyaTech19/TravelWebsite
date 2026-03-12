import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocationIcon } from './Icons';

interface IndiaToursSectionProps {
  onExplore?: (tour: any) => void;
}

export const indiaTours = [
  // North India Tours
  {
    id: 101,
    title: "Delhi City Highlights",
    location: "Delhi, India",
    image: "/images/delhiicityone.png",
    description: "Explore the historic monuments and vibrant markets of India's capital city.",
    rating: "4.95 (840)",
    duration: "2 Days",
    tag: "Cultural",
    category: "North",
    gallery: [
      "/images/delhiicityTwo.png",
      "/images/delhiiCityThree.png",
      "/images/DelhiiCityFour.png",
      "/images/DelhiiCityFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Old Delhi Heritage", detail: "Visit the iconic Red Fort and Jama Masjid." },
      { day: "Day 2", title: "New Delhi Landmark", detail: "Explore the Qutub Minar and Humayun's Tomb." }
    ]
  },
  {
    id: 102,
    title: "Agra (Taj Mahal) Heritage",
    location: "Agra, UP",
    image: "/images/majestic-mausoleum-ancient-god-spiritual-journey-generated-by-ai (1).jpg",
    description: "Witness the eternal beauty of the Taj Mahal, a masterpiece of Mughal architecture.",
    rating: "4.98 (1200)",
    duration: "1 Day",
    tag: "Historic",
    category: "North",
    gallery: [
      "/images/Tajii.jpg",
      "/images/Tajiiis.jpg",
      "/images/TajiisFour.jpg",
      "/images/majestic-mausoleum-ancient-god-spiritual-journey-generated-by-ai (1).jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Monument of Love", detail: "Experience the Taj Mahal at sunrise and sunset." }
    ]
  },
  {
    id: 103,
    title: "Jaipur Pink City Tour",
    location: "Jaipur, Rajasthan",
    image: "/images/jaipur.jpg",
    description: "Discover the majestic forts and palaces of Jaipur, the royal city of Rajasthan.",
    rating: "4.92 (750)",
    duration: "3 Days",
    tag: "Royal",
    category: "North",
    gallery: [
      "/images/jaipur.jpg",
      "/images/jaipurFour.jpg",
      "/images/jaipurThree.jpg",
      "/images/jaipurTwo.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Forts of Jaipur", detail: "Visit the grand Amer Fort and Nahargarh Fort." },
      { day: "Day 2", title: "City Palace Exploration", detail: "Guided tour of the City Palace and Hawa Mahal." },
      { day: "Day 3", title: "Cultural Heritage", detail: "Visit the Jantar Mantar and local craft markets." }
    ]
  },
  {
    id: 104,
    title: "Kashmir Paradise Valley",
    location: "Kashmir, J&K",
    image: "/images/kahtwo.jpg",
    description: "Experience the ethereal beauty of Dal Lake and the snow-capped mountains of Kashmir.",
    rating: "4.97 (560)",
    duration: "6 Days",
    tag: "Nature",
    category: "North",
    gallery: [
      "/images/kashone.jpg",
      "/images/kashmir.jfif",
      "/images/KashMirThree.jpg",
      "/images/KashmirTwo.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Srinagar", detail: "Check-in to a traditional houseboat on Dal Lake." },
      { day: "Day 3", title: "Gulmarg Day Trip", detail: "Enjoy the scenic beauty and activities in Gulmarg." },
      { day: "Day 5", title: "Pahalgam Nature Walk", detail: "Explore the lush meadows of Pahalgam." }
    ]
  },
  {
    id: 105,
    title: "Leh Ladakh Adventure",
    location: "Leh, Ladakh",
    image: "/images/ladaonetwo.jpg",
    description: "Conquer high-altitude passes and visit ancient monasteries in the land of high passes.",
    rating: "4.99 (420)",
    duration: "7 Days",
    tag: "Adventure",
    category: "North",
    gallery: [
      "/images/ladaone.jpg",
      "/images/ladaonetwo.jpg",
      "/images/ladaoneThree.jpg",
      "/images/ladaFour.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Leh Acclimatization", detail: "Ease into the altitude with a rest day." },
      { day: "Day 3", title: "Nubra Valley Crossing", detail: "Cross the highest motorable road in the world." },
      { day: "Day 5", title: "Pangong Lake Sightseeing", detail: "Experience the crystal clear waters of Pangong." }
    ]
  },
  {
    id: 106,
    title: "Varanasi Spiritual Ghats",
    location: "Varanasi, UP",
    image: "/images/varansiiImgthree.jpg",
    description: "Immerse yourself in the spiritual energy of the oldest living city in the world.",
    rating: "4.88 (980)",
    duration: "3 Days",
    tag: "Spiritual",
    category: "North",
    gallery: [
      "/images/varansiiSix.jpg",
      "/images/varansiiimgTwo.jpg",
      "/images/varansiiFive.png",
      "/images/varansii.jpg",

    ],
    itinerary: [
      { day: "Day 1", title: "Ganga Aarti Experience", detail: "Witness the magnificent evening prayer." },
      { day: "Day 2", title: "Ghats & Temples Tour", detail: "Morning boat ride and temple meditation." }
    ]
  },
  {
    id: 107,
    title: "Himachal Solitude Tour",
    location: "Shimla & Manali",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    description: "Explore the scenic beauty and colonial charm of the hill stations in Himachal Pradesh.",
    rating: "4.91 (680)",
    duration: "5 Days",
    tag: "Hill Station",
    category: "North",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600",
      "/images/Hima.jpg",
      "/images/HimaThree.jpg",
      "/images/HimaTwo.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Colonial Shimla", detail: "Stroll along the historic Mall Road." },
      { day: "Day 3", title: "Manali Adventure", detail: "Visit Solang Valley for breathtaking views." }
    ]
  },

  // South India Tours
  {
    id: 201,
    title: "Kerala Backwaters & Serenity",
    location: "Kerala, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
    description: "Experience God's Own Country with serene backwaters and lush tea plantations.",
    rating: "4.96 (1100)",
    duration: "5 Days",
    tag: "Relaxing",
    category: "South",
    gallery: [
      "/images/keone.jpg",
      "/images/ker2.jpg",
      "/images/kerthree.jpg",
      "/images/kerelaFour.jpg",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Cochin Coastal Life", detail: "Experience the mix of cultures in Old Kochi." },
      { day: "Day 2", title: "Munnar Tea Estates", detail: "Tour the sprawling green hills of Munnar." },
      { day: "Day 5", title: "Backwaters Cruise", detail: "Relax on a traditional houseboat journey." }
    ]
  },
  {
    id: 202,
    title: "Ooty Queen of Hills",
    location: "Ooty, Tamil Nadu",
    image: "/images/oooFour.png",
    description: "A charming hill station known for its tea estates and colonial-era architecture.",
    rating: "4.87 (540)",
    duration: "3 Days",
    tag: "Hill Station",
    category: "South",
    gallery: [
      "/images/ootyone.webp",
      "/images/ootyTwo.webp",
      "/images/oothree.jpg",
      "/images/oooFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Nilgiri Mountain Railway", detail: "Ride the toy train for spectacular views." }
    ]
  },
  {
    id: 203,
    title: "Kodaikanal Lakeside",
    location: "Kodaikanal, TN",
    image: "/images/kodaiOne.png",
    description: "Discover the princess of hill stations with its enchanting lake and mist-covered forests.",
    rating: "4.89 (430)",
    duration: "3 Days",
    tag: "Lake Side",
    category: "South",
    gallery: [
      "/images/KodaiFour.png",
      "/images/KodaiThre.png",
      "/images/kodaiTwo.png",
      "/images/kodaiOne.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Kodai Lake Serenity", detail: "Enjoy boating and nature walks by the lake." }
    ]
  },
  {
    id: 204,
    title: "Mysore Royal Heritage",
    location: "Mysore, Karnataka",
    image: "/images/mysorethree.jpg",
    description: "Visit the magnificent Mysore Palace and experience the city's rich cultural heritage.",
    rating: "4.93 (720)",
    duration: "2 Days",
    tag: "Royal",
    category: "South",
    gallery: [
      "/images/mysoreimg2.jpg",
      "/images/mysoreimage1.jpg",
      "/images/mysoreFour.jpg",
      "/images/mysorethree.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Palace Illumination", detail: "Witness the majestic palace lit up at night." }
    ]
  },
  {
    id: 205,
    title: "Coorg Coffee Plantations",
    location: "Coorg, Karnataka",
    image: "/images/coorgone.png",
    description: "Escape to the Scotland of India, famous for its coffee estates and misty hills.",
    rating: "4.94 (610)",
    duration: "4 Days",
    tag: "Nature",
    category: "South",
    gallery: [
      "/images/coorgTwo.png",
      "/images/coorgThree.png",
      "/images/CoorgFour.png",
      "/images/coorgFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Coffee Estate Walk", detail: "Learn about coffee harvesting and processing." }
    ]
  },
  {
    id: 206,
    title: "Madurai Temple City",
    location: "Madurai, TN",
    image: "/images/maduraione.png",
    description: "Explore the historic Meenakshi Amman Temple and the vibrant culture of Madurai.",
    rating: "4.86 (390)",
    duration: "2 Days",
    tag: "Spiritual",
    category: "South",
    gallery: [
      "/images/MaduraiTwo.png",
      "/images/MaduraiThree.png",
      "/images/MaduraiFour.png",
      "/images/MaduraiFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Night Ceremony", detail: "Witness the unique bedtime ritual at the temple." }
    ]
  },
  {
    id: 207,
    title: "Rameswaram Island Pilgrimage",
    location: "Rameswaram, TN",
    image: "/images/raone.png",
    description: "Embark on a spiritual journey to one of the most sacred pilgrimage sites in India.",
    rating: "4.90 (510)",
    duration: "2 Days",
    tag: "Spiritual",
    category: "South",
    gallery: [
      "/images/raTwo.png",
      "/images/Rathee.png",
      "/images/Rafour.png",
      "/images/raFive.png",
    ],
    itinerary: [
      { day: "Day 1", title: "Adam's Bridge Views", detail: "Scenic drive across the Pamban Bridge." }
    ]
  }
];

const IndiaTourCard: React.FC<{ tour: any; onExplore?: (tour: any) => void }> = ({ tour, onExplore }) => {
  return (
    <div
      onClick={() => onExplore?.(tour)}
      className="bg-white rounded-[2.5rem] overflow-hidden border border-brand-dark/5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="p-5 pb-0">
        <div className="aspect-[16/11] rounded-[2rem] overflow-hidden relative">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
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
  );
};

const IndiaToursSection: React.FC<IndiaToursSectionProps> = ({ onExplore }) => {
  const navigate = useNavigate();

  return (
    <section className="global-page-container max-w-screen-2xl mx-auto bg-brand-bg py-24">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
        <div className="max-w-2xl">
          <p className="font-cursive text-brand-gold text-3xl md:text-4xl mb-4">
            Explore More
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-bold text-brand-dark mb-8 leading-tight tracking-tight">
            India Tours
          </h2>
          <p className="text-brand-dark/60 text-sm md:text-base leading-relaxed max-w-md font-medium">
            Discover the vibrant colors, rich heritage, and diverse landscapes of India. From the Taj Mahal to the backwaters of Kerala.
          </p>
        </div>

        <button
          onClick={() => navigate("/india-tours")}
          className="flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-[12px] tracking-[0.2em] uppercase shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 hover:-translate-y-1 transition-all duration-300 group"
        >
          View More
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
        {indiaTours.slice(0, 4).map((tour) => (
          <IndiaTourCard key={tour.id} tour={tour} onExplore={onExplore} />
        ))}
      </div>
    </section>
  );
};

export default IndiaToursSection;
