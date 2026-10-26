import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sara Rahmani",
      role: "CEO, TechVision",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      content: "Biranchi's work exceeded our expectations. The website he created perfectly captured our brand identity and significantly improved our online presence. His attention to detail and creative approach made all the difference.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, StartupLab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Working with Biranchi was an absolute pleasure. He delivered a stunning, responsive website that not only looks amazing but also performs exceptionally well. His technical expertise and design skills are top-notch.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthCo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Biranchi transformed our outdated website into a modern, user-friendly platform that our customers love. His strategic approach to UX design resulted in a 40% increase in user engagement.",
      rating: 5
    },
    {
      id: 4,
      name: "David Kumar",
      role: "Product Manager, InnovateTech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The dashboard Biranchi designed for our SaaS platform is intuitive, beautiful, and highly functional. His ability to translate complex requirements into elegant solutions is remarkable.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="heading-emoji">💬 </span><span className="text-neon-green">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            What clients say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-gradient-card border border-dark-border rounded-2xl p-8 hover:shadow-neon transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating Stars */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-neon-green text-neon-green" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-text text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-neon-green/30"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-text">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Notice */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-text max-w-2xl mx-auto">
            All testimonials are from real clients who have given consent to share their feedback.
            Client privacy and confidentiality are always respected in our work relationships.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;