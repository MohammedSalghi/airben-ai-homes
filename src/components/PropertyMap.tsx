import { useState, useEffect } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyMapProps {
  location: string;
}

const PropertyMap = ({ location }: PropertyMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const openInGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/search/${encodedLocation}`, '_blank');
  };

  const openDirections = () => {
    const encodedLocation = encodeURIComponent(location);
    window.open(`https://www.google.com/maps/dir//${encodedLocation}`, '_blank');
  };

  // For demonstration purposes, we'll use a placeholder map image
  // In a real application, you would integrate with a maps API like Google Maps or Mapbox
  const placeholderMapUrl = "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300&q=80";

  return (
    <div className="space-y-4">
      <div className="h-[300px] rounded-lg overflow-hidden relative">
        {!isLoaded ? (
          <div className="animate-pulse w-full h-full bg-muted"></div>
        ) : (
          <>
            <img 
              src={placeholderMapUrl} 
              alt={`Map of ${location}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-airbenbe-primary text-white p-2 rounded-full shadow-lg animate-bounce">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded-md shadow-md text-sm font-medium">
              {location}
            </div>
          </>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={openInGoogleMaps}
          className="flex-1"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Google Maps
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={openDirections}
          className="flex-1"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Located in {location}, this property offers easy access to local amenities and transportation.
      </p>
    </div>
  );
};

export default PropertyMap;
