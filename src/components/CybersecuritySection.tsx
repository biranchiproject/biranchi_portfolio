import { Shield, Lock, Terminal, ShieldAlert, Cpu } from "lucide-react";

interface CybersecuritySectionProps {
  /** Dedicated page already renders the title, so the in-section heading can be turned off. */
  showHeading?: boolean;
}

const CybersecuritySection = ({ showHeading = true }: CybersecuritySectionProps) => {
  const cards = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Network Scanning & Security Basics",
      description: "I have foundational knowledge in cybersecurity with hands-on experience in network scanning using tools like Nmap. I can identify open ports, analyze basic network vulnerabilities, and understand how systems communicate over a network.",
      points: [
        "Nmap (Port Scanning & Service Detection)",
        "Basic Network Security Concepts",
        "Understanding of Open Ports & Risks",
        "IP Scanning & Analysis"
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Learning & Growth",
      description: "Currently learning ethical hacking, vulnerability assessment, and cybersecurity fundamentals to strengthen practical skills.",
      points: [
        "Ethical Hacking Fundamentals",
        "Vulnerability Assessment",
        "Cybersecurity Principles"
      ]
    }
  ];

  return (
    <section id="cybersecurity" className="py-12 md:py-20 bg-gradient-dark relative overflow-hidden">
      {/* Animated background text */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden pointer-events-none opacity-20">
        <div className="whitespace-nowrap text-6xl md:text-8xl font-bold text-neon-green/10 animate-scroll-horizontal" style={{ animationDuration: "35s" }}>
          Security Cyber Security Network Ethical Hacking Protection
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {showHeading && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="heading-emoji">🔐 </span><span className="text-neon-green">Cybersecurity</span>
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              Exploring network security, ethical hacking, and vulnerability detection.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-gradient-card border border-dark-border rounded-2xl p-8 hover:shadow-neon transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-neon-green group-hover:animate-glow transition-all duration-300">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-text leading-relaxed">
                    {card.description}
                  </p>
                  {card.points && (
                    <ul className="mt-4 space-y-2">
                      {card.points.map((point, i) => (
                        <li key={i} className="flex items-center text-gray-text text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green mr-2 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none"></div>
    </section>
  );
};

export default CybersecuritySection;
