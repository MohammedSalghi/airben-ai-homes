
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share, ArrowLeft, CheckCircle, MapPin, Bed, Bath, Home } from "lucide-react";
import { toast } from "sonner";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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
    // In a real app, this would open a share dialog
    toast.success("Share dialog opened");
  };

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
            <div className="relative">
              <div className="rounded-xl overflow-hidden aspect-video mb-4">
                <img 
                  src={property.images[activeImageIndex]} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {property.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 h-20 w-32 rounded-lg overflow-hidden cursor-pointer border-2 ${activeImageIndex === index ? 'border-airbenbe-primary' : 'border-transparent'}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`Photo ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
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
            
            <div className="mt-6">
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
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
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
                
                <TabsContent value="ai-analysis">
                  <div className="space-y-6">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">AI-Generated Insights</h3>
                      <p className="text-muted-foreground">
                        Based on our AI analysis of this property, we've generated the following insights:
                      </p>
                      
                      <div className="mt-4 space-y-4">
                        <div className="bg-white p-4 rounded-md">
                          <h4 className="font-medium mb-2">Market Comparison</h4>
                          <p className="text-sm text-muted-foreground">
                            This property is priced approximately 5% below similar properties in the area,
                            making it a potentially good investment opportunity.
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md">
                          <h4 className="font-medium mb-2">Property Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Our image recognition detected high-end finishes and recent renovations,
                            indicating good property maintenance and potential for value appreciation.
                          </p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-md">
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
          </div>
          
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Schedule a Viewing</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">Today</Button>
                    <Button variant="outline" className="justify-start">Tomorrow</Button>
                    <Button variant="outline" className="justify-start">Thursday</Button>
                    <Button variant="outline" className="justify-start">Friday</Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Fill in your details and we'll connect you with the property agent.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 rounded-md border"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 rounded-md border"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full px-4 py-2 rounded-md border"
                      />
                      <textarea
                        placeholder="Message (Optional)"
                        rows={3}
                        className="w-full px-4 py-2 rounded-md border"
                      ></textarea>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-airbenbe-primary hover:bg-airbenbe-primary/90"
                    onClick={() => toast.success("Viewing request sent!")}
                  >
                    Request Viewing
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
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
