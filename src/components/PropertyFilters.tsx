
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Building, Hotel, Filter } from "lucide-react";

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

const PropertyFilters = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full space-y-4 py-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
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
            <TabsTrigger value="hotel" className="flex items-center gap-2">
              <Hotel className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline-block">Hotels</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Property Type</h3>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <Button key={type.value} variant="outline" size="sm" className="rounded-full">
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Price Range</h3>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <Button key={range.value} variant="outline" size="sm" className="rounded-full">
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Bedrooms</h3>
            <div className="flex flex-wrap gap-2">
              {bedOptions.map((option) => (
                <Button key={option.value} variant="outline" size="sm" className="rounded-full">
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
