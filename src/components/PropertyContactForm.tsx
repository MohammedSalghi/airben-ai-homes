
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

interface PropertyContactFormProps {
  propertyId: string;
  propertyTitle: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().optional(),
  date: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const PropertyContactForm = ({ propertyId, propertyTitle }: PropertyContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    date: "",
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<FormData> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof FormData] = err.message as string;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request and save to localStorage
    setTimeout(() => {
      const inquiries = JSON.parse(localStorage.getItem("propertyInquiries") || "[]");
      const newInquiry = {
        id: Date.now().toString(),
        propertyId,
        propertyTitle,
        ...formData,
        submittedAt: new Date().toISOString(),
        status: "pending"
      };
      
      inquiries.push(newInquiry);
      localStorage.setItem("propertyInquiries", JSON.stringify(inquiries));
      
      toast.success("Viewing request sent! We'll contact you shortly.");
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        date: "",
      });
    }, 1000);
  };
  
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Button 
          type="button"
          variant={formData.date === today ? "default" : "outline"} 
          className="justify-start"
          onClick={() => handleChange({ target: { name: "date", value: today } } as React.ChangeEvent<HTMLInputElement>)}
        >
          Today
        </Button>
        <Button 
          type="button"
          variant={formData.date === new Date(Date.now() + 86400000).toISOString().split("T")[0] ? "default" : "outline"} 
          className="justify-start"
          onClick={() => handleChange({ 
            target: { 
              name: "date", 
              value: new Date(Date.now() + 86400000).toISOString().split("T")[0]
            } 
          } as React.ChangeEvent<HTMLInputElement>)}
        >
          Tomorrow
        </Button>
      </div>
      
      <div className="relative">
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
      </div>
      
      <div className="relative">
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
      </div>
      
      <div className="relative">
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
      </div>
      
      <div className="relative">
        <textarea
          name="message"
          placeholder="Message (Optional)"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-input bg-background resize-none"
        />
      </div>
      
      <div className="relative">
        <div className="flex items-center">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>
      
      <Button 
        type="submit"
        className="w-full bg-airbenbe-primary hover:bg-airbenbe-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending Request..." : "Request Viewing"}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
};

export default PropertyContactForm;
