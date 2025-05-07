
export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export const properties: Property[] = [
  {
    id: "prop-1",
    title: "Luxury Waterfront Villa",
    description: "Experience unparalleled luxury in this stunning waterfront villa with panoramic ocean views. This beautiful modern home features floor-to-ceiling windows, custom Italian furniture, and a private infinity pool overlooking the ocean. The gourmet kitchen includes top-of-the-line appliances and marble countertops. The primary suite offers a spa-like bathroom and private balcony.",
    location: "Miami Beach, FL",
    price: 3250000,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60"
    ],
    beds: 5,
    baths: 4.5,
    sqft: 4200,
    features: ["Waterfront", "Pool", "Smart Home", "Wine Cellar", "Home Theater"],
    isFeatured: true,
    createdAt: "2025-01-15T10:30:00Z"
  },
  {
    id: "prop-2",
    title: "Modern Urban Condo",
    description: "Sleek and sophisticated urban living in the heart of downtown. This designer condo features an open concept layout, high ceilings, and premium finishes throughout. The chef's kitchen is equipped with stainless steel appliances and quartz countertops. Building amenities include a rooftop pool, fitness center, and 24-hour concierge service.",
    location: "Downtown Los Angeles, CA",
    price: 785000,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60"
    ],
    beds: 2,
    baths: 2,
    sqft: 1200,
    features: ["Concierge", "Gym", "Rooftop Deck", "Pet Friendly", "City Views"],
    isNew: true,
    createdAt: "2025-04-28T15:45:00Z"
  },
  {
    id: "prop-3",
    title: "Charming Suburban Farmhouse",
    description: "Beautifully renovated farmhouse with modern amenities and classic charm. This spacious family home features hardwood floors, a stone fireplace, and custom cabinetry throughout. The large kitchen opens to a bright family room with vaulted ceilings. The private backyard includes a covered patio, mature landscaping, and a fire pit.",
    location: "Austin, TX",
    price: 925000,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&auto=format&fit=crop&q=60"
    ],
    beds: 4,
    baths: 3,
    sqft: 2800,
    features: ["Renovated", "Fireplace", "Large Yard", "Open Floorplan", "Office Space"],
    createdAt: "2025-03-10T09:15:00Z"
  },
  {
    id: "prop-4",
    title: "Historic Brownstone",
    description: "Historic charm meets modern luxury in this meticulously restored brownstone. Original architectural details include crown moldings, pocket doors, and two decorative fireplaces. Updates include a custom kitchen with premium appliances, spa-like bathrooms, and smart home technology throughout. Perfect location steps from parks, shopping, and restaurants.",
    location: "Brooklyn, NY",
    price: 2450000,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&auto=format&fit=crop&q=60"
    ],
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    features: ["Historic", "Restored", "Original Details", "Garden", "Fireplace"],
    isFeatured: true,
    createdAt: "2025-02-22T13:20:00Z"
  },
  {
    id: "prop-5",
    title: "Mountain View Retreat",
    description: "Escape to this stunning mountain home with breathtaking views and privacy. Featuring exposed beam ceilings, a massive stone fireplace, and floor-to-ceiling windows that showcase the surrounding mountains. The gourmet kitchen includes premium appliances and a large center island. Multiple decks provide ample space for outdoor entertaining.",
    location: "Aspen, CO",
    price: 4100000,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60"
    ],
    beds: 6,
    baths: 5.5,
    sqft: 5800,
    features: ["Mountain Views", "Hot Tub", "Game Room", "Fireplace", "Guest Suite"],
    createdAt: "2025-01-05T11:10:00Z"
  },
  {
    id: "prop-6",
    title: "Beachfront Cottage",
    description: "Charming beachfront cottage with direct access to white sand beaches. This fully renovated home features an open concept living space with stunning ocean views, a modern kitchen, and coastal-inspired decor throughout. Fall asleep to the sound of waves in the oceanfront primary suite. Large deck perfect for sunset watching and outdoor dining.",
    location: "Santa Barbara, CA",
    price: 1950000,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop&q=60"
    ],
    beds: 3,
    baths: 2,
    sqft: 1600,
    features: ["Beachfront", "Renovated", "Ocean Views", "Deck", "Beach Access"],
    isNew: true,
    createdAt: "2025-05-03T08:45:00Z"
  },
  {
    id: "prop-7",
    title: "Contemporary Desert Oasis",
    description: "Stunning contemporary home showcasing the best of desert living. This architectural masterpiece features walls of glass, soaring ceilings, and seamless indoor-outdoor living spaces. The resort-style backyard includes a negative-edge pool, spa, and outdoor kitchen. Smart home technology controls lighting, climate, security, and entertainment systems.",
    location: "Scottsdale, AZ",
    price: 2750000,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=60"
    ],
    beds: 4,
    baths: 4.5,
    sqft: 3400,
    features: ["Pool", "Smart Home", "Mountain Views", "Outdoor Kitchen", "Home Office"],
    createdAt: "2025-03-18T14:30:00Z"
  },
  {
    id: "prop-8",
    title: "Lakefront Estate",
    description: "Magnificent estate on a private peninsula with panoramic lake views. This elegant home features soaring ceilings, a grand staircase, and exquisite finishes throughout. The gourmet kitchen opens to a spacious family room with a wall of windows overlooking the lake. The resort-like grounds include a pool, private dock, and meticulously landscaped gardens.",
    location: "Lake Tahoe, NV",
    price: 5900000,
    images: [
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&auto=format&fit=crop&q=60"
    ],
    beds: 6,
    baths: 7,
    sqft: 8200,
    features: ["Lakefront", "Dock", "Pool", "Wine Cellar", "Guest House"],
    isFeatured: true,
    createdAt: "2025-02-10T16:50:00Z"
  }
];
