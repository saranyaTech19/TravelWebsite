import React from 'react';
import { tours } from './FactsSection';
import { useNavigate } from 'react-router-dom';
import { LocationIcon } from './Icons';

interface PopularToursSectionProps {
  onExplore?: (tour: any) => void;
}

export const popularTours = [
  {
    id: 1,
    title: "Thailand",
    location: "Dubai, UAE",
    image: "/images/thailand.jpg",
    description: "Experience the thrill of dune bashing, camel riding, and a traditional Bedouin dinner under the stars.",
    rating: "5.00 (528)",
    duration: "6 Hours",

    tag: "Adventure",
    category: "Standard",
    gallery: [
      "/images/thailand.jpg",
      "/images/thai.jpg",
      "/images/thaiFour.jpg",
      "/images/thaiThe.jpg",
      "/images/thaione.jpg"
    ],
    overview: "Explore the Land of Smiles with our comprehensive Thailand tour. From the vibrant street life of Bangkok to the serene beaches of Phuket and the misty mountains of the North, experience the rich culture and hospitality that Thailand is famous for.",
    highlights: [
      "Visit the majestic Grand Palace and Temple of Emerald Buddha",
      "Island hopping tour in the crystal clear waters of Phuket",
      "Authentic Thai cooking class with a local chef",
      "Traditional Thai massage session for relaxation",
      "Exploring the bustling night markets in Bangkok"
    ],
    inclusions: [
      "Luxury 4-star hotel accommodations",
      "Daily international breakfast buffet",
      "All inter-city transfers in private AC vehicles",
      "Guided temple tours with English-speaking guides",
      "Speedboat transfers for island hopping"
    ],
    exclusions: [
      "International flight tickets",
      "Personal shopping and souvenirs",
      "Travel insurance",
      "Alcoholic drinks during meals",
      "Gratuities for guides and drivers"
    ],
    itinerary: [
      { day: "Day 1", title: "Dune Bashing", detail: "Thrilling 4x4 drive across the golden sand dunes." },
      { day: "Day 2", title: "Camel Trek", detail: "Traditional camel ride through the desert landscape." },
      { day: "Day 3", title: "BBQ Dinner", detail: "Delicious buffet dinner with live cultural performances." }
    ]
  },
  {
    id: 2,
    title: "Bali",
    location: "Dubai, UAE",
    image: "/images/BALI.jpg",
    description: "Visit the world's tallest building and enjoy breathtaking 360-degree views of the city skyline.",
    rating: "5.00 (420)",
    duration: "2 Hours",
    tag: "Skyline",
    category: "Standard",
    gallery: [
      "/images/baliimageoneTwo.jpg",
      "/images/baliimageoneFour.jpg",
      "/images/baliimageoneThree.jpg",
      "/images/baliimageone.jpg"
    ],
    overview: "Find your zen in the Island of the Gods. Our Bali retreat combines spiritual exploration in Ubud with relaxing beach days in Seminyak, offering a perfect balance of culture, nature, and tropical relaxation.",
    highlights: [
      "Spiritual morning yoga session overlooking rice terraces",
      "Visit the sacred Uluwatu Temple at sunset",
      "Private Balinese cooking class and market tour",
      "Snorkeling adventure in the Blue Lagoon",
      "Traditional Balinese spa and flower bath"
    ],
    inclusions: [
      "Private pool villa accommodation",
      "Daily healthy organic breakfast",
      "Private car and driver for all sightseeing",
      "All entrance fees for temples and parks",
      "Aromatherapy massage session"
    ],
    exclusions: [
      "International airfare to Denpasar",
      "Personal laundry and phone calls",
      "Additional meals not specified",
      "Water sports activities in Nusa Dua",
      "Tips for local guides"
    ],
    itinerary: [
      { day: "Day 1", title: "Level 124 & 125", detail: "Access to the main observation decks for panoramic views." },
      { day: "Day 2", title: "Telescope View", detail: "High-powered telescopes to see the city in detail." },
      { day: "Day 3", title: "Sky Views", detail: "Optional glass slide experience for thrill-seekers." }
    ]
  },
  {
    id: 3,
    title: "Maldives",
    location: "Dubai, UAE",
    image: "/images/maladives.jpg",
    description: "Sail through the Dubai Marina on a luxury yacht and witness the city's futuristic architecture.",
    rating: "4.90 (215)",
    duration: "3 Hours",
    tag: "Luxury",
    category: "Standard",
    gallery: [
      "/images/maladives.jpg",
      "/images/malone.jpg",
      "/images/mal2.jpg",
      "/images/mal3.jpg",
      "/images/mal4.jpg"
    ],
    overview: "Escape to the ultimate luxury of the Maldives. Stay in a private villa perched over crystal-clear turquoise waters and enjoy world-class diving, private beach dinners, and unparalleled serenity in this island paradise.",
    highlights: [
      "Direct ocean access from your private overwater villa",
      "Guided snorkeling tour with sea turtles",
      "Private sandbank picnic with gourmet lunch",
      "Sunset dolphin cruise with champagne",
      "World-class spa treatment with ocean views"
    ],
    inclusions: [
      "Overwater villa accommodation at a luxury resort",
      "All-inclusive meal plan (All meals and drinks)",
      "Speedboat/Seaplane transfers from Malé Airport",
      "Complimentary non-motorized water sports",
      "Private butler service 24/7"
    ],
    exclusions: [
      "International flights to Malé",
      "Personal laundry and scuba diving lessons",
      "Motorized water sports (Jet ski, etc.)",
      "Souvenirs from the resort boutique",
      "Tips and gratuities"
    ],
    itinerary: [
      { day: "Day 1", title: "Marina Cruise", detail: "Glide past the JBR and Blue Waters Island." },
      { day: "Day 2", title: "Sunset Views", detail: "Perfect photo opportunities as the sun sets over the Gulf." },
      { day: "Day 3", title: "Onboard Dining", detail: "Enjoy light refreshments and snacks while cruising." }
    ]
  },
  {
    id: 4,
    title: "Malaysia ",
    location: "Dubai, UAE",
    image: "/images/siya.jpg",
    description: "Float above the Arabian desert at sunrise and enjoy a unique perspective of the dunes and wildlife.",
    rating: "4.98 (185)",
    duration: "4 Hours",
    tag: "Romantic",
    category: "Standard",
    gallery: [
      "https://images.unsplash.com/photo-1534171472159-edb6d1e0b63c?q=80&w=600",
      "https://images.unsplash.com/photo-1523805081730-614449379e7d?q=80&w=600",
      "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?q=80&w=600",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=600",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Sunrise Launch", detail: "Early morning take-off as the sun begins to rise." },
      { day: "Day 2", title: "Aerial Safari", detail: "Spot oryx and gazelles from the sky." },
      { day: "Day 3", title: "Gourmet Breakfast", detail: "Traditional breakfast in a desert camp after landing." }
    ]
  },
  {
    id: 5,
    title: "Dubai City Tour",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
    description: "Experience the thrill of dune bashing, camel riding, and a traditional Bedouin dinner under the stars.",
    rating: "5.00 (528)",
    duration: "6 Hours",
    tag: "Adventure",
    category: "Standard",
    gallery: [
      "/images/desertone.jpg",
      "/images/desertTwo.jpg",
      "/images/desrtFour.jpg",
      "/images/desertTwo.jpg",
      "/images/desrtFour.jpg"
    ],
    itinerary: [
      { day: "Day 1", title: "Dune Bashing", detail: "Thrilling 4x4 drive across the golden sand dunes." },
      { day: "Day 2", title: "Camel Trek", detail: "Traditional camel ride through the desert landscape." },
      { day: "Day 3", title: "BBQ Dinner", detail: "Delicious buffet dinner with live cultural performances." }
    ]
  },
  {
    id: 6,
    title: "Desert Safari",
    location: "Dubai, UAE",
    image: "/images/safari.jpg",
    description: "Visit the world's tallest building and enjoy breathtaking 360-degree views of the city skyline.",
    rating: "5.00 (420)",
    duration: "2 Hours",
    tag: "Skyline",
    category: "Standard",
    gallery: [
      "/images/safarione.jpg",
      "/images/safariThree.jpg",
      "/images/safariThree.jpg",
      "/images/safarifour.jpg",
      "/images/safari.jpg"
    ],
    itinerary: [
      { day: "Day 1", title: "Level 124 & 125", detail: "Access to the main observation decks for panoramic views." },
      { day: "Day 2", title: "Telescope View", detail: "High-powered telescopes to see the city in detail." },
      { day: "Day 3", title: "Sky Views", detail: "Optional glass slide experience for thrill-seekers." }
    ]
  },
  {
    id: 7,
    title: "Yacht",
    location: "Dubai, UAE",
    image: "/images/Yatchfour.jpg",
    description: "Sail through the Dubai Marina on a luxury yacht and witness the city's futuristic architecture.",
    rating: "4.90 (215)",
    duration: "3 Hours",
    tag: "Luxury",
    category: "Standard",
    gallery: [
      "/images/yatchone.jpg",
      "/images/yatchtwo.jpg",
      "/images/YatchThree.jpg",
      "/images/Yatchfour.jpg",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Marina Cruise", detail: "Glide past the JBR and Blue Waters Island." },
      { day: "Day 2", title: "Sunset Views", detail: "Perfect photo opportunities as the sun sets over the Gulf." },
      { day: "Day 3", title: "Onboard Dining", detail: "Enjoy light refreshments and snacks while cruising." }
    ]
  },
  {
    id: 8,
    title: "Abu Dhabi City Tour",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1534171472159-edb6d1e0b63c?q=80&w=1200&auto=format&fit=crop",
    description: "Float above the Arabian desert at sunrise and enjoy a unique perspective of the dunes and wildlife.",
    rating: "4.98 (185)",
    duration: "4 Hours",
    tag: "Romantic",
    category: "Standard",
    gallery: [
      "/images/AbhudaiCityTour (1).jpg",
      "/images/AbhudaiCityTourthree.jpg",
      "/images/AbhudaiCityTourTwo.webp",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Sunrise Launch", detail: "Early morning take-off as the sun begins to rise." },
      { day: "Day 2", title: "Aerial Safari", detail: "Spot oryx and gazelles from the sky." },
      { day: "Day 3", title: "Gourmet Breakfast", detail: "Traditional breakfast in a desert camp after landing." }
    ]
  },
  {
    id: 9,
    title: "Burj Khalifa",
    location: "Dubai, UAE",
    image: "/images/bdimage.jpg",
    description: "Take to the skies for an unforgettable helicopter tour over the Palm Jumeirah and Burj Al Arab.",
    rating: "4.92 (156)",
    duration: "22 Minutes",
    tag: "Adventure",
    category: "Local",
    gallery: [
      "/images/bd.jpg",
      "/images/bdimage.jpg",
      "/images/bdone.jpg",
      "/images/btwo.jpg",
      "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?q=80&w=600"
    ],
    itinerary: [
      { day: "Day 1", title: "Palm Jumeirah", detail: "Fly over the iconic man-made island." },
      { day: "Day 2", title: "World Islands", detail: "See the archipelago from a bird's eye view." },
      { day: "Day 3", title: "Burj Al Arab", detail: "Close-up aerial views of the sail-shaped hotel." }
    ]
  },
  {
    id: 10,
    title: "Miracle Garden",
    location: "Dubai, UAE",
    image: "/images/miracleone.jpg",
    description: "Explore the wonders of the ocean at one of the largest suspended aquariums in the world.",
    rating: "4.88 (342)",
    duration: "3 Hours",
    tag: "Family",
    category: "Local",
    gallery: [
      "/images/mircleFour.jpg",
      "/images/mircleThree.jpg",
      "/images/mircleTwo.jpg",
      "/images/miracleone.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "Aquarium Tunnel", detail: "Walk through the 48-meter long glass tunnel." },
      { day: "Day 2", title: "Underwater Zoo", detail: "Meet penguins, crocodiles, and exotic fish." },
      { day: "Day 3", title: "Glass Bottom Boat", detail: "Optional boat ride over the main tank." }
    ]
  },
  {
    id: 11,
    title: "Global Village",
    location: "Dubai, UAE",
    image: "/images/villatwo.jpg",
    description: "Experience the ultimate multicultural festival park, where the world comes together for shopping and dining.",
    rating: "4.85 (410)",
    duration: "4 Hours",
    tag: "Culture",
    category: "Local",
    gallery: [
      "/images/villaone.jpg",
      "/images/villatwo.jpg",
      "/images/villathree.jpg",
      "/images/villafive.avif",
      "/images/villaone.jpg"
    ],
    itinerary: [
      { day: "Day 1", title: "World Pavilions", detail: "Explore cultures from over 80 countries." },
      { day: "Day 2", title: "Street Food", detail: "Sample diverse cuisines from across the globe." }
    ]
  },
  {
    id: 12,
    title: "Safari Park",
    location: "Dubai, UAE",
    image: "/images/safariiis.jpg",
    description: "Home to over 3,000 animals, offering a unique wildlife experience with safari drives and shows.",
    rating: "4.78 (295)",
    duration: "5 Hours",
    tag: "Wildlife",
    category: "Local",
    gallery: [
      "/images/safariiis.jpg",
      "/images/safariiii.jpg",
      "/images/safarOne.jpg",
      "/images/saftwo.jpg",
    ],
    itinerary: [
      { day: "Day 1", title: "African Village", detail: "See lions, giraffes, and elephants." },
      { day: "Day 2", title: "Safari Drive", detail: "Guided tour through the open-air wildlife habitats." }
    ]
  }
];

const PopularTourCard: React.FC<{ tour: any; onExplore?: (tour: any) => void }> = ({ tour, onExplore }) => {
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

const PopularToursSection: React.FC<PopularToursSectionProps> = ({ onExplore }) => {
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
            Dubai Tours
          </h2>
          <p className="text-brand-dark/60 text-sm md:text-base leading-relaxed max-w-md font-medium">
            Join our most loved tours and create memories that last a lifetime. From desert adventures to city wonders.
          </p>
        </div>

        <button
          onClick={() => navigate("/dubai-tours")}
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
        {popularTours.slice(0, 4).map((tour) => (
          <PopularTourCard key={tour.id} tour={tour} onExplore={onExplore} />
        ))}
      </div>
    </section>
  );
};

export default PopularToursSection;
