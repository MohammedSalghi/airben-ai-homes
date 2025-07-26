import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Building, Hotel, Filter } from "lucide-react";
import { toast } from "sonner";

interface FilterOption {
  label: string;
  value: string;
}

const propertyTypes: FilterOption[] = [
  { label: "Houses", value: "house" },
  { label: "Apartments", value: "apartment" },
  { label: "Condos", value: "condo" },
  { label: "Townhomes", value: "townhome" },
];

const priceRanges: FilterOption[] = [
  { label: "Any", value: "any" },
  { label: "< $500k", value: "0-500000" },
  { label: "$500k - 1M", value: "500000-1000000" },
  { label: "$1M - 2M", value: "1000000-2000000" },
  { label: "$2M+", value: "2000000-999999999" },
];

const bedOptions: FilterOption[] = [
  { label: "Any", value: "any" },
  { label: "1+", value: "1" },
  { label: "2+", value: "2" },
  { label: "3+", value: "3" },
  { label: "4+", value: "4" },
];

interface PropertyFiltersProps {
  onFiltersChange?: (filters: {
    propertyType: string;
    priceRange: string;
    bedrooms: string;
  }) => void;
}

const PropertyFilters = ({ onFiltersChange }: PropertyFiltersProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState("any");
  const [selectedBedrooms, setSelectedBedrooms] = useState("any");

  const handleFilterChange = (type: string, value: string) => {
    const filters = {
      propertyType: type === 'type' ? value : activeTab,
      priceRange: type === 'price' ? value : selectedPriceRange,
      bedrooms: type === 'beds' ? value : selectedBedrooms,
    };

    if (type === 'type') setActiveTab(value);
    if (type === 'price') setSelectedPriceRange(value);
    if (type === 'beds') setSelectedBedrooms(value);

    onFiltersChange?.(filters);
  };

  return (
    <div className="w-full space-y-4 py-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={(value) => {
          handleFilterChange('type', value);
        }}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <span className="sr-only sm:not-sr-only sm:inline-block">All</span>
            </TabsTrigger>
            <TabsTrigger value="house" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline-block">Houses</span>
            </TabsTrigger>
            <TabsTrigger value="apartment" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline-block">Apartments</span>
            </TabsTrigger>
            <TabsTrigger value="condo" className="flex items-center gap-2">
              <Hotel className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline-block">Condos</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
          className="ml-4"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <Select value={selectedPriceRange} onValueChange={(value) => handleFilterChange('price', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms</label>
            <Select value={selectedBedrooms} onValueChange={(value) => handleFilterChange('beds', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {bedOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 flex items-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedPriceRange("any");
                setSelectedBedrooms("any");
                setActiveTab("all");
                onFiltersChange?.({
                  propertyType: "all",
                  priceRange: "any",
                  bedrooms: "any"
                });
                toast.success("Filters cleared");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
