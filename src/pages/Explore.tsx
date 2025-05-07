
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const visibleProperties = filteredProperties.slice(0, visibleCount);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredProperties.length));
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
          
          <PropertyFilters />
          
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
