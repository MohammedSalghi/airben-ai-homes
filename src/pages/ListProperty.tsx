import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Camera, Upload, MapPin, DollarSign, Home, Wand2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const ListProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    features: [] as string[],
    images: [] as File[]
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const propertyTypes = [
    "House", "Apartment", "Condo", "Townhouse", "Single Family", "Multi Family"
  ];

  const features = [
    "Swimming Pool", "Gym", "Parking", "Garden", "Balcony", 
    "Air Conditioning", "Fireplace", "Pet Friendly", "Security", "Elevator",
    "Laundry", "Dishwasher", "Hardwood Floors", "Updated Kitchen"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleAIAnalysis = async () => {
    if (formData.images.length === 0) {
      toast.error("Please upload at least one image for AI analysis");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const aiGeneratedData = {
        title: "Beautiful Modern Home with Updated Kitchen",
        description: "This stunning property features an open floor plan with hardwood floors throughout, a gourmet kitchen with stainless steel appliances, and a spacious master suite. The backyard offers a private oasis with mature landscaping.",
        sqft: "2,450",
        features: ["Updated Kitchen", "Hardwood Floors", "Garden", "Air Conditioning"]
      };

      setFormData(prev => ({
        ...prev,
        ...aiGeneratedData,
        features: [...new Set([...prev.features, ...aiGeneratedData.features])]
      }));

      toast.success("AI analysis complete! Property details have been generated.");
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In real app, would upload to Supabase
    const propertyData = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: "current-user"
    };

    // Save to localStorage for demo
    const existingProperties = JSON.parse(localStorage.getItem("userProperties") || "[]");
    localStorage.setItem("userProperties", JSON.stringify([...existingProperties, propertyData]));

    toast.success("Property listed successfully!");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">List Your Property</h1>
            <p className="text-muted-foreground">
              Use AI to help generate details from your photos
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera size={20} />
                Property Photos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <p className="text-sm">Upload photos of your property</p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>
              
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">{formData.images.length} photos selected</p>
                  <Button 
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing}
                    className="w-full"
                    variant="outline"
                  >
                    <Wand2 className="mr-2" size={16} />
                    {isAnalyzing ? "Analyzing with AI..." : "Generate Details with AI"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home size={20} />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Beautiful Modern Home"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your property..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                      placeholder="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                      placeholder="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sqft">Sq Ft</Label>
                    <Input
                      id="sqft"
                      value={formData.sqft}
                      onChange={(e) => setFormData(prev => ({ ...prev, sqft: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={20} />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Main St"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="City"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="State"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                      placeholder="12345"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {features.map(feature => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <Label htmlFor={feature} className="text-sm">{feature}</Label>
                      </div>
                    ))}
                  </div>
                  
                  {formData.features.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Features:</Label>
                      <div className="flex flex-wrap gap-2">
                        {formData.features.map(feature => (
                          <Badge key={feature} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg">
              List Property
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListProperty;