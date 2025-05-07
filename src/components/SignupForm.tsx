
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { toast } from "sonner";

interface SignupFormProps {
  onToggleForm: () => void;
}

const SignupForm = ({ onToggleForm }: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: "At least 8 characters", test: () => password.length >= 8 },
    { label: "At least one uppercase letter", test: () => /[A-Z]/.test(password) },
    { label: "At least one number", test: () => /\d/.test(password) },
    { label: "Passwords match", test: () => password === confirmPassword && password !== "" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock signup, in real app would connect to Supabase
      console.log("Signing up with:", { email, password });
      toast.success("Account created successfully!");
      
      // For demo purposes, navigate to onboarding
      setTimeout(() => {
        navigate("/onboarding");
      }, 1000);
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Sign up to start exploring properties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Password requirements:</p>
            <ul className="space-y-1">
              {passwordRequirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  {req.test() ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={req.test() ? "text-green-500" : "text-muted-foreground"}>
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-airbenbe-primary hover:bg-airbenbe-primary/90" 
            disabled={isLoading || passwordRequirements.some(req => !req.test())}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={onToggleForm}>
          Already have an account? Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
