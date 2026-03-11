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
    title: 'Santorini Sunset Villa',
    description: 'Stay in a luxury cliffside villa in Oia and witness the most famous sunsets in the world.',
    duration: '5 Nights - 6 Days',
    rating: '5.00 (156)',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
    tag: 'Luxury',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600'
    ],
    itinerary: [
      { day: "Day 1", title: "Santorini Welcome", detail: "Arrival and check-in at your private villa with caldera views." },
      { day: "Day 2", title: "Sailing the Aegean", detail: "Private catamaran cruise with swimming and BBQ lunch." },
      { day: "Day 3", title: "Wine & Culture", detail: "Tour of local volcanic vineyards and the ancient Akrotiri ruins." },
      { day: "Day 4", title: "Oia Exploration", detail: "Leisure day to explore the blue-domed churches and shops." },
      { day: "Day 5", title: "Beach & Spa", detail: "Relax at the Black Sand beach followed by a sunset spa session." },
      { day: "Day 6", title: "Departure", detail: "Final breakfast before airport transfer." }
    ]
  },
  {
    id: 'P05',
    title: 'Safari Adventure Kenya',
    description: 'Witness the Big Five in their natural habitat and experience the thrill of the African savannah.',
    duration: '12 Nights - 13 Days',
    rating: '4.90 (89)',
    location: 'Kenya',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop',
    tag: 'Adventure',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=600',
      'https://images.unsplash.com/photo-1523805081730-614449379e7d?q=80&w=600',
      'https://images.unsplash.com/photo-1519066629447-267fffa62d4b?q=80&w=600'
    ],
    itinerary: [
      { day: "Day 1-3", title: "Nairobi & Elephants", detail: "Visit the elephant orphanage and prepare for the safari." },
      { day: "Day 4-7", title: "Maasai Mara", detail: "Intensive game drives to see the Great Migration." },
      { day: "Day 8-10", title: "Amboseli Peaks", detail: "See elephants with the backdrop of Mt. Kilimanjaro." },
      { day: "Day 11-12", title: "Diani Beach", detail: "Relax by the Indian Ocean after your safari adventure." },
      { day: "Day 13", title: "Departure", detail: "Transfer to Mombasa for your flight home." }
    ]
  },
  {
    id: 'P06',
    title: 'Bali Spiritual Retreat',
    description: 'Find inner peace among lush rice terraces and sacred water temples in the heart of Indonesia.',
    duration: '8 Nights - 9 Days',
    rating: '4.70 (312)',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
    tag: 'Popular',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=600'
    ],
    itinerary: [
      { day: "Day 1-3", title: "Ubud Culture", detail: "Traditional dance performances and monkey forest visits." },
      { day: "Day 4-6", title: "Yoga & Wellness", detail: "Daily meditation sessions and organic raw food workshops." },
      { day: "Day 7-8", title: "Uluwatu Sunset", detail: "Cliffs, surfing, and the famous Kecak fire dance." },
      { day: "Day 9", title: "Departure", detail: "Final spa treatment before transfer to Denpasar." }
    ]
  },
];


export default packagesList;
