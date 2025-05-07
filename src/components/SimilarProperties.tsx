
import { useNavigate } from "react-router-dom";
import { PropertyCardProps } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Home } from "lucide-react";

interface SimilarPropertiesProps {
  properties: PropertyCardProps[];
}

const SimilarProperties = ({ properties }: SimilarPropertiesProps) => {
  const navigate = useNavigate();

  if (properties.length === 0) {
    return (
      <div className="text-center py-6 border rounded-lg">
        <p className="text-muted-foreground">No similar properties found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div 
          key={property.id} 
          className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate(`/property/${property.id}`)}
        >
          <div className="relative">
            <img 
              src={property.images[0]} 
              alt={property.title} 
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="text-white font-bold">${property.price.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium line-clamp-1">{property.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{property.location}</span>
            </p>
            
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span>{property.beds}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span>{property.baths}</span>
              </div>
              <div className="flex items-center gap-1">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span>{property.sqft.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarProperties;
