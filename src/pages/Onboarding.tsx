import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Home, Building, MapPin } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    propertyTypes: [] as string[],
    budget: [500000],
    location: "",
    bedrooms: [2],
    bathrooms: [1],
    features: [] as string[]
  });
  const navigate = useNavigate();

  const propertyTypes = [
    { id: "house", label: "House", icon: Home },
    { id: "apartment", label: "Apartment", icon: Building },
    { id: "condo", label: "Condo", icon: Building },
    { id: "townhouse", label: "Townhouse", icon: Home }
  ];

  const features = [
    "Swimming Pool", "Gym", "Parking", "Garden", "Balcony", 
    "Air Conditioning", "Fireplace", "Pet Friendly", "Security", "Elevator"
  ];

  const handlePropertyTypeToggle = (type: string) => {
    setPreferences(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setPreferences(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleComplete = () => {
    // Save preferences to localStorage (in real app would save to Supabase)
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    toast.success("Preferences saved! Welcome to Airben Be!");
    navigate("/explore");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>What type of property are you looking for?</CardTitle>
              <CardDescription>Select all that apply</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {propertyTypes.map(type => {
                  const Icon = type.icon;
                  const isSelected = preferences.propertyTypes.includes(type.id);
                  return (
                    <Button
                      key={type.id}
                      variant={isSelected ? "default" : "outline"}
                      className="h-20 flex flex-col gap-2"
                      onClick={() => handlePropertyTypeToggle(type.id)}
                    >
                      <Icon size={24} />
                      {type.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>What's your budget range?</CardTitle>
              <CardDescription>We'll show you properties within this range</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Budget: ${preferences.budget[0].toLocaleString()}</Label>
                <Slider
                  value={preferences.budget}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}
                  max={2000000}
                  min={100000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$100k</span>
                  <span>$2M+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Preferred location</CardTitle>
              <CardDescription>Where would you like to live?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">City or Area</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={preferences.location}
                    onChange={(e) => setPreferences(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Bedrooms & Bathrooms</CardTitle>
              <CardDescription>How many do you need?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Bedrooms: {preferences.bedrooms[0]}</Label>
                <Slider
                  value={preferences.bedrooms}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, bedrooms: value }))}
                  max={6}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Bathrooms: {preferences.bathrooms[0]}</Label>
                <Slider
                  value={preferences.bathrooms}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, bathrooms: value }))}
                  max={6}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Desired features</CardTitle>
              <CardDescription>What amenities are important to you?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {features.map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={preferences.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Label htmlFor={feature} className="text-sm">{feature}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome to Airben Be</h1>
          <p className="text-muted-foreground">Let's personalize your experience</p>
        </div>

        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {renderStep()}

        <div className="flex gap-4">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={step === 5 ? handleComplete : () => setStep(step + 1)}
            className="flex-1"
            disabled={step === 1 && preferences.propertyTypes.length === 0}
          >
            {step === 5 ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;