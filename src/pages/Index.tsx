
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, properties.length));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-8">
        <section className="mb-12">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80" 
              alt="Luxury home" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
              <div className="text-white p-8 md:p-12 max-w-lg">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Dream Home</h1>
                <p className="text-lg mb-6">Explore AI-powered property listings tailored just for you</p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-airbenbe-primary hover:bg-airbenbe-primary/90"
                    onClick={() => navigate("/explore")}
                  >
                    Start Exploring
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white text-white"
                    onClick={() => navigate("/auth")}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Properties</h2>
            <Button variant="ghost" onClick={() => navigate("/explore")}>View all</Button>
          </div>
          
          <PropertyFilters />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties
              .filter(property => property.isFeatured)
              .slice(0, 4)
              .map(property => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  images={property.images}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                  isNew={property.isNew}
                  isFeatured={property.isFeatured}
                />
              ))}
          </div>
        </section>
        
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">New Listings</h2>
            <Button variant="ghost" onClick={() => navigate("/explore")}>View all</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties
              .slice(0, visibleCount)
              .map(property => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  images={property.images}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                  isNew={property.isNew}
                  isFeatured={property.isFeatured}
                />
              ))}
          </div>
          
          {visibleCount < properties.length && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                className="px-8"
                onClick={loadMore}
              >
                Load More
              </Button>
            </div>
          )}
        </section>
        
        <section className="py-12 px-4 bg-airbenbe-light rounded-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">AI-Powered Property Analysis</h2>
            <p className="text-lg mb-8">Let our AI technology analyze property images to extract details and generate insights.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-airbenbe-primary/10 text-airbenbe-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                </div>
                <h3 className="font-medium mb-2">OCR Technology</h3>
                <p className="text-muted-foreground text-sm">Extract property details directly from listing images</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-airbenbe-secondary/10 text-airbenbe-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="M7 13l3-4 4 6 3-5"/>
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Market Analysis</h3>
                <p className="text-muted-foreground text-sm">Get AI-powered insights on property value and market trends</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-airbenbe-accent/10 text-airbenbe-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Auto-Generated Descriptions</h3>
                <p className="text-muted-foreground text-sm">Create compelling property descriptions with our AI</p>
              </div>
            </div>
            
            <Button 
              className="mt-8 bg-airbenbe-primary hover:bg-airbenbe-primary/90"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-airbenbe-dark text-white py-10">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">airben<span className="text-airbenbe-primary">be</span></h3>
              <p className="text-gray-300 text-sm">The future of property discovery powered by advanced AI technology.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Subscribe</h3>
              <p className="text-gray-300 text-sm mb-4">Stay updated with our latest properties and features</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l bg-white/10 text-white w-full focus:outline-none focus:bg-white/20"
                />
                <Button className="rounded-l-none bg-airbenbe-primary hover:bg-airbenbe-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 text-sm">© 2025 airbenbe. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
