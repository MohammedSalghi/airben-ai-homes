
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Heart, Settings, LogOut, Plus } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("favorites");
  
  // Mock user data
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://i.pravatar.cc/300",
    joinDate: "January 2025"
  };
  
  // Mock favorite properties (using a subset of our properties data)
  const favoriteProperties = properties.slice(0, 3);
  
  // Mock user listings (using a different subset)
  const userListings = properties.slice(3, 5);
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 lg:w-1/4">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-airbenbe-primary">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                <p className="text-xs text-muted-foreground">Member since {user.joinDate}</p>
                
                <div className="flex gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Your Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted px-2 py-1 rounded-full text-xs">Houses</span>
                  <span className="bg-muted px-2 py-1 rounded-full text-xs">2+ Beds</span>
                  <span className="bg-muted px-2 py-1 rounded-full text-xs">$500k-1M</span>
                  <span className="bg-muted px-2 py-1 rounded-full text-xs">Waterfront</span>
                  <span className="bg-muted px-2 py-1 rounded-full text-xs">Pool</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  className="w-full bg-airbenbe-primary hover:bg-airbenbe-primary/90 flex items-center gap-2"
                  onClick={() => navigate("/list-property")}
                >
                  <Plus className="h-4 w-4" />
                  List a Property
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 lg:w-3/4">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="favorites" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="history">Browsing History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="favorites" className="mt-6">
                {favoriteProperties.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProperties.map(property => (
                      <PropertyCard
                        key={property.id}
                        id={property.id}
                        title={property.title}
                        location={property.location}
                        price={property.price}
                        images={property.images}
                        beds={property.beds}
                        baths={property.baths}
                        sqft={property.sqft}
                        isNew={property.isNew}
                        isFeatured={property.isFeatured}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-muted" />
                    <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-6">
                      When you find properties you love, add them to your favorites for quick access.
                    </p>
                    <Button onClick={() => navigate("/explore")}>Explore Properties</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="listings" className="mt-6">
                {userListings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userListings.map(property => (
                      <PropertyCard
                        key={property.id}
                        id={property.id}
                        title={property.title}
                        location={property.location}
                        price={property.price}
                        images={property.images}
                        beds={property.beds}
                        baths={property.baths}
                        sqft={property.sqft}
                        isNew={property.isNew}
                        isFeatured={property.isFeatured}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Home className="h-12 w-12 mx-auto mb-4 text-muted" />
                    <h3 className="text-lg font-medium mb-2">No listings yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Start listing your properties to reach potential buyers and renters.
                    </p>
                    <Button onClick={() => navigate("/list-property")}>List a Property</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <div className="text-center py-16">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted" />
                  <h3 className="text-lg font-medium mb-2">Browsing history</h3>
                  <p className="text-muted-foreground mb-6">
                    Properties you've viewed recently will appear here.
                  </p>
                  <Button onClick={() => navigate("/explore")}>Explore Properties</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

// Define any missing components locally
const Home = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
};

const Clock = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

export default Profile;
