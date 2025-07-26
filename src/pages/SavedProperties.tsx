import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Square, Share2, Eye } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface SavedProperty {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  savedAt: string;
  viewCount?: number;
}

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [viewFilter, setViewFilter] = useState<'all' | 'recent' | 'frequent'>('all');

  useEffect(() => {
    // Load saved properties from localStorage
    const saved = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    setSavedProperties(saved);
  }, []);

  const handleUnsave = (propertyId: string) => {
    const updated = savedProperties.filter(p => p.id !== propertyId);
    setSavedProperties(updated);
    localStorage.setItem("savedProperties", JSON.stringify(updated));
    toast.success("Property removed from saved list");
  };

  const handleShare = (property: SavedProperty) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: `/property/${property.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/property/${property.id}`);
      toast.success("Property link copied to clipboard");
    }
  };

  const filteredProperties = savedProperties.filter(property => {
    switch (viewFilter) {
      case 'recent':
        return new Date(property.savedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      case 'frequent':
        return (property.viewCount || 0) > 3;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Saved Properties</h1>
              <p className="text-muted-foreground">
                {savedProperties.length} properties saved
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setViewFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={viewFilter === 'recent' ? 'default' : 'outline'}
                onClick={() => setViewFilter('recent')}
                size="sm"
              >
                Recent
              </Button>
              <Button
                variant={viewFilter === 'frequent' ? 'default' : 'outline'}
                onClick={() => setViewFilter('frequent')}
                size="sm"
              >
                Frequently Viewed
              </Button>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <Card className="p-12 text-center">
              <CardContent>
                <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved properties</h3>
                <p className="text-muted-foreground mb-4">
                  Start exploring properties and save your favorites here
                </p>
                <Button asChild>
                  <Link to="/explore">Browse Properties</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => handleShare(property)}
                      >
                        <Share2 size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white text-red-500"
                        onClick={() => handleUnsave(property.id)}
                      >
                        <Heart size={16} fill="currentColor" />
                      </Button>
                    </div>
                    {property.viewCount && property.viewCount > 0 && (
                      <Badge className="absolute bottom-2 left-2 bg-black/60 text-white">
                        <Eye size={12} className="mr-1" />
                        {property.viewCount} views
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-1">{property.title}</h3>
                      <p className="text-2xl font-bold text-primary">{property.price}</p>
                      
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin size={16} className="mr-1" />
                        {property.location}
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Bed size={16} className="mr-1" />
                          {property.bedrooms} bed
                        </div>
                        <div className="flex items-center">
                          <Bath size={16} className="mr-1" />
                          {property.bathrooms} bath
                        </div>
                        <div className="flex items-center">
                          <Square size={16} className="mr-1" />
                          {property.sqft.toLocaleString()} sqft
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Saved {new Date(property.savedAt).toLocaleDateString()}
                      </div>
                      
                      <Button asChild className="w-full mt-3">
                        <Link to={`/property/${property.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedProperties;