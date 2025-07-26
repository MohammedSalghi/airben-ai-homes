
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [visibleCount, setVisibleCount] = useState(8);
  const [filters, setFilters] = useState({
    propertyType: "all",
    priceRange: "any",
    bedrooms: "any"
  });

  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);
  
  const applyFilters = (property: any) => {
    // Apply search filter
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Apply property type filter
    if (filters.propertyType !== "all") {
      // This is a simplified version - in a real app, you'd have property type data
      const typeMatch = property.title.toLowerCase().includes(filters.propertyType);
      if (!typeMatch) return false;
    }
    
    // Apply price range filter
    if (filters.priceRange !== "any") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (property.price < min || (max && property.price > max)) {
        return false;
      }
    }
    
    // Apply bedroom filter
    if (filters.bedrooms !== "any") {
      const minBeds = parseInt(filters.bedrooms);
      if (property.beds < minBeds) return false;
    }
    
    return true;
  };
  
  const filteredProperties = properties.filter(applyFilters);
  const visibleProperties = filteredProperties.slice(0, visibleCount);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredProperties.length));
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setVisibleCount(8); // Reset visible count when filters change
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Explore Properties</h1>
          
          <div className="relative w-full max-w-xl mb-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input 
              className="w-full rounded-full border border-input bg-background pl-12 pr-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Search by location, property type, features..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <PropertyFilters onFiltersChange={handleFiltersChange} />
          
          {visibleProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProperties.map(property => (
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
              
              {visibleCount < filteredProperties.length && (
                <div className="mt-12 text-center">
                  <Button 
                    variant="outline" 
                    className="px-8"
                    onClick={loadMore}
                  >
                    Load More Properties
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">😕</div>
              <h3 className="text-xl font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any properties matching your search criteria.
              </p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Explore;
