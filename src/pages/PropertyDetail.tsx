
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Share, 
  ArrowLeft, 
  CheckCircle, 
  MapPin, 
  Bed, 
  Bath, 
  Home,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Calendar 
} from "lucide-react";
import { toast } from "sonner";
import { ImageCarousel } from "@/components/ImageCarousel";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyMap from "@/components/PropertyMap";
import SimilarProperties from "@/components/SimilarProperties";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 py-16 flex items-center justify-center">
          <div className="animate-pulse space-y-8 w-full">
            <div className="h-64 w-full bg-muted rounded-xl"></div>
            <div className="h-8 w-2/3 bg-muted rounded-lg"></div>
            <div className="h-4 w-1/3 bg-muted rounded-lg"></div>
            <div className="h-40 w-full bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully"))
      .catch(() => toast.error("Error sharing"));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success("Link copied to clipboard"))
        .catch(() => toast.error("Failed to copy link"));
    }
  };

  const similarProperties = properties
    .filter(p => p.id !== id && p.beds === property.beds)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 pl-0 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="relative mb-6">
              <ImageCarousel images={property.images} title={property.title} />
              
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full bg-white hover:bg-white/90"
                  onClick={handleFavorite}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-airbenbe-primary text-airbenbe-primary' : 'text-airbenbe-dark'}`} />
                  <span className="sr-only">Favorite</span>
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full bg-white hover:bg-white/90"
                  onClick={handleShare}
                >
                  <Share className="h-5 w-5 text-airbenbe-dark" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            
            <div>
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-airbenbe-primary">${property.price.toLocaleString()}</div>
              </div>
              
              <div className="flex flex-wrap gap-6 py-6 border-y border-border my-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-airbenbe-primary" />
                  <div>
                    <div className="font-medium">{property.beds}</div>
                    <div className="text-xs text-muted-foreground">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-airbenbe-primary" />
                  <div>
                    <div className="font-medium">{property.baths}</div>
                    <div className="text-xs text-muted-foreground">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-airbenbe-primary" />
                  <div>
                    <div className="font-medium">{property.sqft.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Square Feet</div>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="details">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="map">Location</TabsTrigger>
                  <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <h3 className="text-xl font-medium">Property Description</h3>
                  <p className="text-muted-foreground">{property.description}</p>
                </TabsContent>
                
                <TabsContent value="features">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Property Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-airbenbe-secondary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="map">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">Property Location</h3>
                    <PropertyMap location={property.location} />
                  </div>
                </TabsContent>
                
                <TabsContent value="ai-analysis">
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">AI-Generated Insights</h3>
                      <p className="text-muted-foreground">
                        Based on our AI analysis of this property, we've generated the following insights:
                      </p>
                      
                      <div className="mt-4 space-y-4">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <h4 className="font-medium mb-2">Market Comparison</h4>
                          <p className="text-sm text-muted-foreground">
                            This property is priced approximately 5% below similar properties in the area,
                            making it a potentially good investment opportunity.
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <h4 className="font-medium mb-2">Property Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Our image recognition detected high-end finishes and recent renovations,
                            indicating good property maintenance and potential for value appreciation.
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md shadow-sm">
                          <h4 className="font-medium mb-2">Neighborhood Trends</h4>
                          <p className="text-sm text-muted-foreground">
                            This area has seen a 7% increase in property values over the past year,
                            with projections suggesting continued growth due to new development projects nearby.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Similar Properties</h3>
              <SimilarProperties properties={similarProperties} />
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Schedule a Viewing</h3>
                <PropertyContactForm propertyId={property.id} propertyTitle={property.title} />
              </div>
              
              <div className="border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Contact Agent</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" 
                      alt="Agent"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Michael Anderson</h4>
                    <p className="text-sm text-muted-foreground">Senior Property Consultant</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => toast.success("Call button clicked")}
                  >
                    <Phone className="h-4 w-4" />
                    Call Agent
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => toast.success("Email button clicked")}
                  >
                    <Mail className="h-4 w-4" />
                    Email Agent
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
