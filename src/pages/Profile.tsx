import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Settings, Heart, Home, Bell, LogOut, Eye, DollarSign, MapPin, Edit3 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface UserProperty {
  id: string;
  title: string;
  price: string;
  location: string;
  status: 'active' | 'pending' | 'sold';
  views: number;
  image: string;
}

interface UserStats {
  savedProperties: number;
  listedProperties: number;
  totalViews: number;
  inquiries: number;
}

const Profile = () => {
  const [userProperties, setUserProperties] = useState<UserProperty[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    savedProperties: 0,
    listedProperties: 0,
    totalViews: 0,
    inquiries: 0
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const properties = JSON.parse(localStorage.getItem("userProperties") || "[]");
    const saved = JSON.parse(localStorage.getItem("savedProperties") || "[]");
    
    setUserProperties(properties);
    setUserStats({
      savedProperties: saved.length,
      listedProperties: properties.length,
      totalViews: properties.reduce((acc: number, prop: any) => acc + (prop.views || 0), 0),
      inquiries: Math.floor(Math.random() * 20) + 5 // Mock data
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userPreferences");
    localStorage.removeItem("userProperties");
    localStorage.removeItem("savedProperties");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
    toast.success("Notification preferences updated");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <h1 className="text-3xl font-bold">John Doe</h1>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  <p className="text-sm text-muted-foreground">Member since March 2024</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Premium Member</Badge>
                    <Badge variant="outline">Verified</Badge>
                    <Badge variant="secondary">Property Investor</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 mx-auto text-red-500 mb-2" />
                <div className="text-2xl font-bold">{userStats.savedProperties}</div>
                <div className="text-sm text-muted-foreground">Saved Properties</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Home className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <div className="text-2xl font-bold">{userStats.listedProperties}</div>
                <div className="text-sm text-muted-foreground">Listed Properties</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <div className="text-2xl font-bold">{userStats.totalViews}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Bell className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                <div className="text-2xl font-bold">{userStats.inquiries}</div>
                <div className="text-sm text-muted-foreground">Inquiries</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Saved Properties
                  </CardTitle>
                  <CardDescription>
                    Properties you've marked as favorites
                  </CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link to="/saved">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {userStats.savedProperties === 0 ? (
                  <div className="text-center py-6">
                    <Heart className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-sm">No saved properties yet</p>
                    <Button asChild className="mt-3" variant="outline" size="sm">
                      <Link to="/explore">Browse Properties</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{userStats.savedProperties}</p>
                    <p className="text-sm text-muted-foreground">Properties saved</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    My Listings
                  </CardTitle>
                  <CardDescription>
                    Properties you've listed for sale or rent
                  </CardDescription>
                </div>
                <Button asChild size="sm">
                  <Link to="/list-property">Add New</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {userStats.listedProperties === 0 ? (
                  <div className="text-center py-6">
                    <Home className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-sm">No properties listed yet</p>
                    <Button asChild className="mt-3" variant="outline" size="sm">
                      <Link to="/list-property">List a Property</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{userStats.listedProperties}</p>
                    <p className="text-sm text-muted-foreground">Properties listed</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Manage how you receive updates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive property matches and updates via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get instant alerts for new property matches</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={() => handleNotificationChange('push')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive urgent updates via text message</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={() => handleNotificationChange('sms')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;