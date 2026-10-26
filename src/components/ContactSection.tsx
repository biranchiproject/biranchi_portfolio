import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { supabase } from "@/lib/supabase";

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Both delivery routes run independently — if one is down, the other still gets the message through.
    let savedToDashboard = false;
    let emailDelivered = false;

    // Route 1: store it for the Admin Dashboard.
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      if (error) throw error;
      savedToDashboard = true;
    } catch (error) {
      console.error("Could not save the message to the dashboard:", error);
    }

    // Route 2: send the email copy.
    if (form.current) {
      try {
        await emailjs.sendForm(
          "service_k19te1r", // Service ID
          "template_rmf4u1e", // Template ID
          form.current,
          "shXq1a-NPznrYz13n" // Public Key
        );
        emailDelivered = true;
      } catch (error) {
        console.error("Could not deliver the message by email:", error);
      }
    }

    if (savedToDashboard || emailDelivered) {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
      form.current?.reset();
    } else {
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "sahoobiranchi8249@gmail.com",
      href: "mailto:sahoobiranchi8249@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 8249735998",
      href: "tel:+918249735998"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Bhubaneswar, Odisha",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-12 md:py-20 bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="heading-emoji">📩 </span>Contact <span className="text-neon-green">Me</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            Interested in working together or want to connect? Feel free to reach out!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-card border border-dark-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Send me a message
            </h3>

            <form id="contact-form" ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-text mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name" // This matches 'from_name' or similar variables in EmailJS template
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-dark-bg border-dark-border focus:border-neon-green focus:ring-neon-green text-foreground"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-text mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email" // This matches 'from_email' or similar variables in EmailJS template
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-dark-bg border-dark-border focus:border-neon-green focus:ring-neon-green text-foreground"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-text mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message" // This matches 'message' in EmailJS template
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-dark-bg border-dark-border focus:border-neon-green focus:ring-neon-green text-foreground resize-none"
                  placeholder="Tell me about your project or just say hello..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold py-3 text-lg transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get in touch
              </h3>
              <p className="text-gray-text text-lg leading-relaxed mb-8">
                I'm always open to discussing new opportunities, creative projects,
                or potential collaborations. Whether you have a specific project in mind
                or just want to connect, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gradient-card border border-dark-border rounded-xl hover:shadow-neon-strong transition-all duration-300"
                >
                  <div className="text-neon-green">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-text">
                      {info.label}
                    </div>
                    <a
                      href={info.href}
                      className="text-foreground font-medium hover:text-neon-green transition-colors duration-300"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="bg-neon-green/10 border border-neon-green/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-neon-green mb-2">
                Currently Available
              </h4>
              <p className="text-gray-text">
                I'm currently accepting new projects and collaborations.
                Let's create something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;