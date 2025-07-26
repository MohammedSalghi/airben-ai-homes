
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  images,
  beds,
  baths,
  sqft,
  isNew = false,
  isFeatured = false,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if property is already saved
    const savedProperties = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    setIsFavorite(savedProperties.some((p: any) => p.id === id));
  }, [id]);
  
  const handleCardClick = () => {
    navigate(`/property/${id}`);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const savedProperties = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    
    if (isFavorite) {
      // Remove from saved
      const updated = savedProperties.filter((p: any) => p.id !== id);
      localStorage.setItem("savedProperties", JSON.stringify(updated));
      setIsFavorite(false);
      toast.success("Removed from saved properties");
    } else {
      // Add to saved
      const propertyData = {
        id,
        title,
        price: `$${price.toLocaleString()}`,
        location,
        bedrooms: beds,
        bathrooms: baths,
        sqft,
        image: images[0],
        savedAt: new Date().toISOString(),
        viewCount: 1
      };
      savedProperties.push(propertyData);
      localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
      setIsFavorite(true);
      toast.success("Added to saved properties");
    }
  };

  return (
    <div 
      className="property-card cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={images[0]} 
          alt={title} 
          className="property-image transition-transform group-hover:scale-105 duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white text-airbenbe-dark hover:text-airbenbe-primary"
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-airbenbe-primary text-airbenbe-primary' : ''}`} />
          <span className="sr-only">Favorite</span>
        </Button>
        
        {isNew && (
          <span className="badge-new absolute top-2 left-2">
            New
          </span>
        )}
        
        {isFeatured && (
          <span className="badge-featured absolute bottom-2 left-2">
            Featured
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <span className="property-price">${price.toLocaleString()}</span>
        </div>
        
        <p className="property-location line-clamp-1">{location}</p>
        
        <div className="property-features mt-2">
          <span className="flex items-center gap-1">
            <span className="font-medium">{beds}</span> bed{beds !== 1 ? 's' : ''}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
          <span className="flex items-center gap-1">
            <span className="font-medium">{baths}</span> bath{baths !== 1 ? 's' : ''}
          </span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
          <span className="flex items-center gap-1">
            <span className="font-medium">{sqft.toLocaleString()}</span> sqft
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
