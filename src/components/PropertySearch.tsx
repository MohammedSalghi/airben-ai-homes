import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, X, Wand2 } from "lucide-react";
import { toast } from "sonner";

interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  features: string[];
}

interface PropertySearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  onAISearch: (query: string) => void;
}

const PropertySearch = ({ onFiltersChange, onAISearch }: PropertySearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    propertyType: "",
    priceRange: [100000, 1000000],
    bedrooms: "",
    bathrooms: "",
    features: []
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aiQuery, setAIQuery] = useState("");

  const propertyTypes = ["House", "Apartment", "Condo", "Townhouse"];
  const features = [
    "Swimming Pool", "Gym", "Parking", "Garden", "Balcony", 
    "Air Conditioning", "Fireplace", "Pet Friendly", "Security"
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    handleFilterChange('features', newFeatures);
  };

  const handleAISearchSubmit = () => {
    if (!aiQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }
    onAISearch(aiQuery);
    toast.success("AI search activated! Finding properties that match your description.");
  };

  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
      location: "",
      propertyType: "",
      priceRange: [100000, 1000000],
      bedrooms: "",
      bathrooms: "",
      features: []
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
    setAIQuery("");
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        {/* AI-Powered Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Wand2 size={16} />
            AI-Powered Search
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., 'Modern 3-bedroom with pool near downtown'"
              value={aiQuery}
              onChange={(e) => setAIQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAISearchSubmit} className="shrink-0">
              <Wand2 size={16} className="mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Traditional Filters</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Filter size={16} className="mr-2" />
                {showAdvanced ? "Hide" : "Show"} Filters
              </Button>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X size={16} className="mr-2" />
                Clear
              </Button>
            </div>
          </div>

          {/* Basic Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="City, State, or ZIP"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Property Type</label>
              <Select onValueChange={(value) => handleFilterChange('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any type</SelectItem>
                  {propertyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Price Range: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
                max={2000000}
                min={50000}
                step={50000}
                className="w-full"
              />
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="mt-6 space-y-4 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bedrooms</label>
                  <Select onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bathrooms</label>
                  <Select onValueChange={(value) => handleFilterChange('bathrooms', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Features & Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {features.map(feature => (
                    <Badge
                      key={feature}
                      variant={filters.features.includes(feature) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFeatureToggle(feature)}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
                {filters.features.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {filters.features.length} features selected
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertySearch;