import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Shield,
  Lock,
  Wifi,
  Bug,
  Globe,
  Cloud,
  Layout,
  Brain,
  Cpu,
  Database,
  Mic,
  ArrowRight
} from "lucide-react";

interface ServicesSectionProps {
  /** Dedicated page already renders the title, so the in-section heading can be turned off. */
  showHeading?: boolean;
}

const ServicesSection = ({ showHeading = true }: ServicesSectionProps) => {
  const [openService, setOpenService] = useState<string | null>(null);

  const cybersecurityServices = [
    {
      id: "eth-hacking",
      icon: <Shield className="w-6 h-6" />,
      title: "Ethical Hacking & Penetration Testing",
      description: "Identifying vulnerabilities through real-world attack simulations.",
      details: [
        "Infrastructure VAPT",
        "Security Assessment",
        "Vulnerability Scanning",
        "Remediation Guidance"
      ]
    },
    {
      id: "web-sec",
      icon: <Lock className="w-6 h-6" />,
      title: "Web Application Security",
      description: "Securing platforms against XSS, SQL Injection, and modern threats.",
      details: [
        "OWASP Top 10 Audit",
        "Authentication Security",
        "Secure API Design",
        "CSRF & Session Protection"
      ]
    },
    {
      id: "net-sec",
      icon: <Wifi className="w-6 h-6" />,
      title: "Network Security & Analysis",
      description: "Securing network traffic using Wireshark, Nmap, and traffic analysis.",
      details: [
        "Traffic Interception",
        "Protocol Analysis",
        "Firewall Optimization",
        "Intrusion Detection"
      ]
    },
    {
      id: "bug-bounty",
      icon: <Bug className="w-6 h-6" />,
      title: "Bug Bounty & Research",
      description: "Responsible disclosure of security flaws in complex systems.",
      details: [
        "Vulnerability Research",
        "Exploit Development",
        "PoC Creation",
        "Security Reporting"
      ]
    },
    {
      id: "secure-web",
      icon: <Globe className="w-6 h-6" />,
      title: "Secure Web Development",
      description: "Building fast, high-performance websites with a security-first mindset.",
      details: [
        "Full-stack Architecture",
        "Security Integration",
        "Performance Optimization",
        "Responsive & Scalable"
      ]
    },


  ];

  const aiAgentServices = [
    {
      id: "ai-agents",
      icon: <Brain className="w-6 h-6" />,
      title: "AI Agent Development",
      description: "Building autonomous agents using LLMs, APIs, and automation.",
      details: [
        "Custom Agent Workflows",
        "API & Tool Integration",
        "Autonomous Decision Logic",
        "Long-term Memory Systems"
      ]
    },
    {
      id: "ai-automation",
      icon: <Cpu className="w-6 h-6" />,
      title: "Custom AI Tools & Automation",
      description: "Creating AI-powered tools for workflow and productivity automation.",
      details: [
        "Python-based Automations",
        "Custom Model Fine-tuning",
        "Automated Content Pipeline",
        "Task Automation APIs"
      ]
    },
    {
      id: "rag-systems",
      icon: <Database className="w-6 h-6" />,
      title: "RAG-based Systems",
      description: "Building intelligent retrieval systems with LLMs and Vector DBs.",
      details: [
        "Vector Search (Pinecone/Milvus)",
        "Document Embedding",
        "Large Dataset Context",
        "Scalable AI Search"
      ]
    },
    {
      id: "voice-ai",
      icon: <Mic className="w-6 h-6" />,
      title: "Voice AI Assistants",
      description: "Developing real-time voice-enabled AI assistants.",
      details: [
        "Speech-to-Text Integration",
        "Real-time Logic Flow",
        "Natural Voice Generation",
        "Interactive AI Coaching"
      ]
    }
  ];

  const toggleService = (id: string) => {
    setOpenService(openService === id ? null : id);
  };

  const ServiceCard = ({ service }: { service: any }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group bg-dark-bg/40 border border-dark-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-neon-green/40 hover:shadow-[0_0_20px_rgba(0,255,163,0.1)] ${openService === service.id ? "bg-dark-surface/60 border-neon-green/30" : ""
        }`}
    >
      <button
        onClick={() => toggleService(service.id)}
        className="w-full px-6 py-5 text-left flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl transition-all duration-300 ${openService === service.id ? "bg-neon-green text-dark-bg" : "bg-dark-surface text-neon-green group-hover:bg-neon-green/10"
            }`}>
            {service.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-neon-green transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-gray-text line-clamp-1">
              {service.description}
            </p>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${openService === service.id ? "rotate-180" : ""}`}>
          <ChevronDown className={`w-5 h-5 ${openService === service.id ? "text-neon-green" : "text-gray-text"}`} />
        </div>
      </button>

      <AnimatePresence>
        {openService === service.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-6 pb-6"
          >
            <div className="pt-4 border-t border-dark-border/50">
              <p className="text-gray-text text-sm mb-4">
                {service.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.details.map((detail: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-xs text-foreground/80 bg-dark-surface/40 p-2 rounded-lg border border-dark-border/30 hover:border-neon-green/20 transition-all"
                  >
                    <ArrowRight className="w-3 h-3 text-neon-green" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-neon-green/5 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold font-tech mb-6 tracking-tighter uppercase">
                My <span className="text-neon-green">Specialized</span> Services
              </h2>
              <div className="w-24 h-1 bg-neon-green mx-auto mb-8"></div>
              <p className="text-xl text-gray-text max-w-2xl mx-auto font-light leading-relaxed">
                Focusing on high-impact security solutions and next-gen AI agent development to build secure, autonomous digital futures.
              </p>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cybersecurity Column */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-neon-green/10 flex items-center justify-center border border-neon-green/20">
                <Shield className="w-6 h-6 text-neon-green" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground font-tech">CYBERSECURITY</h3>
                <p className="text-xs text-neon-green/60 tracking-widest uppercase">Offensive & Defensive Security</p>
              </div>
            </div>
            <div className="space-y-4">
              {cybersecurityServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* AI & Agent Column */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-neon-green/10 flex items-center justify-center border border-neon-green/20">
                <Brain className="w-6 h-6 text-neon-green" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground font-tech">AI & AGENT DEV</h3>
                <p className="text-xs text-neon-green/60 tracking-widest uppercase">Autonomous intelligence</p>
              </div>
            </div>
            <div className="space-y-4">
              {aiAgentServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;