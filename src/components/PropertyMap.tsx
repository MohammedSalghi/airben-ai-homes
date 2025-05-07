
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface PropertyMapProps {
  location: string;
}

const PropertyMap = ({ location }: PropertyMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // For demonstration purposes, we'll use a placeholder map image
  // In a real application, you would integrate with a maps API like Google Maps or Mapbox
  
  const formattedLocation = encodeURIComponent(location);
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${formattedLocation}&zoom=14&size=600x300&markers=color:red%7C${formattedLocation}&key=YOUR_API_KEY`;
  
  // Placeholder map for demo purposes (not requiring an API key)
  const placeholderMapUrl = "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300&q=80";
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-2">
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
              <div className="bg-airbenbe-primary text-white p-2 rounded-full shadow-lg">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded-md shadow-md text-sm font-medium">
              {location}
            </div>
          </>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground">
        Located in {location}, this property offers easy access to local amenities and transportation.
      </p>
    </div>
  );
};

export default PropertyMap;
