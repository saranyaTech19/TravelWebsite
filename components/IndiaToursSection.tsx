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
    image: "/images/delhi highlights.jpg",
    description: "Explore the historic monuments and vibrant markets of India's capital city.",
    rating: "4.95 (840)",
    duration: "2 Days",
    tag: "Cultural",
    category: "North",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-1f20d430c35a?q=80&w=600",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600",
      "https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=600",
      "https://images.unsplash.com/photo-1621644784742-998845112f46?q=80&w=600",
      "https://images.unsplash.com/photo-1624314138470-5ca973e895c1?q=80&w=600"
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
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea023?q=80&w=1200&auto=format&fit=crop",
    description: "Witness the eternal beauty of the Taj Mahal, a masterpiece of Mughal architecture.",
    rating: "4.98 (1200)",
    duration: "1 Day",
    tag: "Historic",
    category: "North",
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea023?q=80&w=600",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600",
      "https://images.unsplash.com/photo-1610443107062-63778583482d?q=80&w=600",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Monument of Love", detail: "Experience the Taj Mahal at sunrise and sunset." }
    ]
  },
  {
    id: 103,
    title: "Jaipur Pink City Tour",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1534051139411-2eb750fa4e76?q=80&w=1200&auto=format&fit=crop",
    description: "Discover the majestic forts and palaces of Jaipur, the royal city of Rajasthan.",
    rating: "4.92 (750)",
    duration: "3 Days",
    tag: "Royal",
    category: "North",
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600",
      "https://images.unsplash.com/photo-1534051139411-2eb750fa4e76?q=80&w=600",
      "https://images.unsplash.com/photo-1599661046289-e318978b66bc?q=80&w=600",
      "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=600",
      "https://images.unsplash.com/photo-1624314138470-5ca973e895c1?q=80&w=600"
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
    image: "https://images.unsplash.com/photo-1561054453-382a87850228?q=80&w=1200&auto=format&fit=crop",
    description: "Experience the ethereal beauty of Dal Lake and the snow-capped mountains of Kashmir.",
    rating: "4.97 (560)",
    duration: "6 Days",
    tag: "Nature",
    category: "North",
    gallery: [
      "https://images.unsplash.com/photo-1561054453-382a87850228?q=80&w=600",
      "https://images.unsplash.com/photo-1598305372104-f2a13f2441ce?q=80&w=600",
      "https://images.unsplash.com/photo-1589308454676-4654fd86f8c2?q=80&w=600",
      "https://images.unsplash.com/photo-1623150532298-2503956bf155?q=80&w=600",
      "https://images.unsplash.com/photo-1618018265007-8e6f1f4417f7?q=80&w=600"
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
    image: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=1200&auto=format&fit=crop",
    description: "Conquer high-altitude passes and visit ancient monasteries in the land of high passes.",
    rating: "4.99 (420)",
    duration: "7 Days",
    tag: "Adventure",
    category: "North",
    gallery: [
      "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?q=80&w=600",
      "https://images.unsplash.com/photo-1581791534721-e599df4417f7?q=80&w=600",
      "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?q=80&w=600",
      "https://images.unsplash.com/photo-1540324151-2e6377858348?q=80&w=600",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=600"
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
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop",
    description: "Immerse yourself in the spiritual energy of the oldest living city in the world.",
    rating: "4.88 (980)",
    duration: "3 Days",
    tag: "Spiritual",
    category: "North",
    gallery: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600",
      "https://images.unsplash.com/photo-1518066629447-267fffa62d4b?q=80&w=600",
      "https://images.unsplash.com/photo-1598533161405-19e359005917?q=80&w=600",
      "https://images.unsplash.com/photo-1627830601330-ed4020fd8e2d?q=80&w=600",
      "https://images.unsplash.com/photo-1621644784742-998845112f46?q=80&w=600"
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
      "https://images.unsplash.com/photo-1605141203445-1200e5e7f1e5?q=80&w=600",
      "https://images.unsplash.com/photo-1610448107577-fb17e3f79e27?q=80&w=600",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=600",
      "https://images.unsplash.com/photo-1618018265007-8e6f1f4417f7?q=80&w=600"
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
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600",
      "https://images.unsplash.com/photo-1589136777351-fdc9c9c85f95?q=80&w=600",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600",
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
    image: "https://images.unsplash.com/photo-1590483488277-285628574768?q=80&w=1200&auto=format&fit=crop",
    description: "A charming hill station known for its tea estates and colonial-era architecture.",
    rating: "4.87 (540)",
    duration: "3 Days",
    tag: "Hill Station",
    category: "South",
    gallery: [
      "https://images.unsplash.com/photo-1590483488277-285628574768?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587474260584-1f20d430c35a?q=80&w=600",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600",
      "https://images.unsplash.com/photo-1621644784742-998845112f46?q=80&w=600",
      "https://images.unsplash.com/photo-1618018265007-8e6f1f4417f7?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Nilgiri Mountain Railway", detail: "Ride the toy train for spectacular views." }
    ]
  },
  {
    id: 203,
    title: "Kodaikanal Lakeside",
    location: "Kodaikanal, TN",
    image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=1200&auto=format&fit=crop",
    description: "Discover the princess of hill stations with its enchanting lake and mist-covered forests.",
    rating: "4.89 (430)",
    duration: "3 Days",
    tag: "Lake Side",
    category: "South",
    gallery: [
      "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=600",
      "https://images.unsplash.com/photo-1598305372104-f2a13f2441ce?q=80&w=600",
      "https://images.unsplash.com/photo-1589308454676-4654fd86f8c2?q=80&w=600",
      "https://images.unsplash.com/photo-1623150532298-2503956bf155?q=80&w=600",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Kodai Lake Serenity", detail: "Enjoy boating and nature walks by the lake." }
    ]
  },
  {
    id: 204,
    title: "Mysore Royal Heritage",
    location: "Mysore, Karnataka",
    image: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=1200&auto=format&fit=crop",
    description: "Visit the magnificent Mysore Palace and experience the city's rich cultural heritage.",
    rating: "4.93 (720)",
    duration: "2 Days",
    tag: "Royal",
    category: "South",
    gallery: [
      "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=600",
      "https://images.unsplash.com/photo-1581335967167-336df322814b?q=80&w=600",
      "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?q=80&w=600",
      "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?q=80&w=600",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Palace Illumination", detail: "Witness the majestic palace lit up at night." }
    ]
  },
  {
    id: 205,
    title: "Coorg Coffee Plantations",
    location: "Coorg, Karnataka",
    image: "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?q=80&w=1200&auto=format&fit=crop",
    description: "Escape to the Scotland of India, famous for its coffee estates and misty hills.",
    rating: "4.94 (610)",
    duration: "4 Days",
    tag: "Nature",
    category: "South",
    gallery: [
      "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?q=80&w=600",
      "https://images.unsplash.com/photo-1540324151-2e6377858348?q=80&w=600",
      "https://images.unsplash.com/photo-1582390169123-5e75da9bc554?q=80&w=600",
      "https://images.unsplash.com/photo-1627830601330-ed4020fd8e2d?q=80&w=600",
      "https://images.unsplash.com/photo-1518066629447-267fffa62d4b?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Coffee Estate Walk", detail: "Learn about coffee harvesting and processing." }
    ]
  },
  {
    id: 206,
    title: "Madurai Temple City",
    location: "Madurai, TN",
    image: "https://images.unsplash.com/photo-1582390169123-5e75da9bc554?q=80&w=1200&auto=format&fit=crop",
    description: "Explore the historic Meenakshi Amman Temple and the vibrant culture of Madurai.",
    rating: "4.86 (390)",
    duration: "2 Days",
    tag: "Spiritual",
    category: "South",
    gallery: [
      "https://images.unsplash.com/photo-1582390169123-5e75da9bc554?q=80&w=600",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600",
      "https://images.unsplash.com/photo-1589136777351-fdc9c9c85f95?q=80&w=600",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Night Ceremony", detail: "Witness the unique bedtime ritual at the temple." }
    ]
  },
  {
    id: 207,
    title: "Rameswaram Island Pilgrimage",
    location: "Rameswaram, TN",
    image: "https://images.unsplash.com/photo-1582390169123-5e75da9bc554?q=80&w=1200&auto=format&fit=crop",
    description: "Embark on a spiritual journey to one of the most sacred pilgrimage sites in India.",
    rating: "4.90 (510)",
    duration: "2 Days",
    tag: "Spiritual",
    category: "South",
    gallery: [
      "https://images.unsplash.com/photo-1540324151-2e6377858348?q=80&w=600",
      "https://images.unsplash.com/photo-1582390169123-5e75da9bc554?q=80&w=600",
      "https://images.unsplash.com/photo-1627830601330-ed4020fd8e2d?q=80&w=600",
      "https://images.unsplash.com/photo-1518066629447-267fffa62d4b?q=80&w=600",
      "https://images.unsplash.com/photo-1561054453-382a87850228?q=80&w=600"
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
