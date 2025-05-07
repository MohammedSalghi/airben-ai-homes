
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden md:block md:w-1/2 bg-airbenbe-primary relative">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80" 
          alt="Property" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              airben<span className="text-white">be</span>
            </h1>
            <p className="text-xl mb-8">
              AI-powered property discovery tailored just for you
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span>Advanced property search with AI-generated insights</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span>Automatic property details extraction from images</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span>Personalized property recommendations based on preferences</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:hidden">
            <h1 className="text-3xl font-bold">
              airben<span className="text-airbenbe-primary">be</span>
            </h1>
            <p className="text-muted-foreground mt-2">AI-powered property discovery</p>
          </div>
          
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:underline"
            >
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
