// Script to populate localStorage with demo data for better screenshots
// Run this in the browser console to add sample saved properties and user data

// Add some saved properties for better screenshots - Libya focused
const demoSavedProperties = [
  {
    id: "prop-1",
    title: "Luxury Villa in Hay Al-Andalus",
    price: "450,000 LYD",
    location: "Hay Al-Andalus, Tripoli",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60",
    savedAt: new Date().toISOString(),
    viewCount: 12
  },
  {
    id: "prop-2",
    title: "Modern Apartment in Downtown Benghazi",
    price: "180,000 LYD",
    location: "Downtown Benghazi, Benghazi",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60",
    savedAt: new Date(Date.now() - 86400000).toISOString(),
    viewCount: 8
  },
  {
    id: "prop-3",
    title: "Traditional House in Old Medina",
    price: "320,000 LYD",
    location: "Old Medina, Tripoli",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=60",
    savedAt: new Date(Date.now() - 172800000).toISOString(),
    viewCount: 5
  }
];

// Add sample property inquiries
const demoInquiries = [
  {
    id: "1",
    propertyId: "prop-1",
    propertyTitle: "Luxury Villa in Hay Al-Andalus",
    name: "Ahmed Al-Mansouri",
    email: "ahmed.mansouri@email.ly",
    phone: "+218 91 234 5678",
    message: "I'm interested in scheduling a viewing for this beautiful villa. Is it available this weekend?",
    date: "2025-08-01",
    submittedAt: new Date().toISOString(),
    status: "pending"
  }
];

// Add sample user properties (for portfolio demonstration)
const demoUserProperties = [
  {
    id: "user-prop-1",
    title: "My Listed Property in Misrata",
    price: "280000",
    location: "Misrata City Center, Misrata",
    status: "active",
    views: 45,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60"
  }
];

// Store demo data
localStorage.setItem("savedProperties", JSON.stringify(demoSavedProperties));
localStorage.setItem("propertyInquiries", JSON.stringify(demoInquiries));
localStorage.setItem("userProperties", JSON.stringify(demoUserProperties));

console.log("Demo data has been added to localStorage!");
console.log("Refresh the page to see the changes.");
console.log("Visit /saved to see saved properties");
console.log("Visit /profile to see user dashboard with data");
