import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Magnetic from "./Magnetic";
import {
  ExternalLink,
  Briefcase,
  Globe,
  Layout,
  Smartphone,
  Brain,
  Cloud,
  TrendingUp,
  BadgeCheck,
  ShieldCheck,
  Bug,
  PackageCheck,
  LifeBuoy,
  MapPin,
  Users,
  Search,
  PenTool,
  Code2,
  Rocket,
  Repeat
} from "lucide-react";

interface StudentLancerSectionProps {
  /** Dedicated page already renders the title, so the in-section heading can be turned off. */
  showHeading?: boolean;
}

const StudentLancerSection = ({ showHeading = true }: StudentLancerSectionProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // The contact form lives on the home page, so reach it from the dedicated page too.
  const goToContact = () => {
    if (pathname === "/") {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/#contact");
  };

  const disciplines = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Web Engineering",
      description: "High-performance Next.js & React websites built to load fast and rank well."
    },
    {
      icon: <Layout className="w-5 h-5" />,
      title: "Product & Brand Design",
      description: "UI/UX systems and brand identity that make a product feel premium."
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Applications",
      description: "Cross-platform iOS & Android apps built with React Native."
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI & Automation",
      description: "LLM integrations, AI agents and workflow automation for real businesses."
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      title: "Cloud & DevOps",
      description: "Docker, CI/CD pipelines and infrastructure that stays online."
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Growth Engineering",
      description: "Technical SEO, analytics and conversion-focused design decisions."
    }
  ];

  const process = [
    { icon: <Search className="w-5 h-5" />, step: "01", title: "Discover", description: "Understanding the client's goal, audience and scope before a single line of code." },
    { icon: <PenTool className="w-5 h-5" />, step: "02", title: "Design", description: "Wireframes, UI systems and brand direction approved by the client first." },
    { icon: <Code2 className="w-5 h-5" />, step: "03", title: "Build", description: "Clean, secure and scalable engineering with progress shared at every milestone." },
    { icon: <Rocket className="w-5 h-5" />, step: "04", title: "Launch", description: "Full testing, bug-free deployment and a complete handover to the client." },
    { icon: <Repeat className="w-5 h-5" />, step: "05", title: "Evolve", description: "Post-launch support, improvements and maintenance after go-live." }
  ];

  const handover = [
    {
      icon: <Bug className="w-6 h-6" />,
      title: "Zero-Error Delivery",
      description: "Every project is tested line by line and page by page. The client receives a product that runs clean — no broken links, no console errors, no half-finished screens."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Full QA & Security Check",
      description: "Cross-browser and mobile responsiveness testing, form and API validation, plus a security pass on authentication, inputs and exposed endpoints."
    },
    {
      icon: <PackageCheck className="w-6 h-6" />,
      title: "Complete Client Handover",
      description: "Source code, hosting access, admin credentials, domain setup and a walkthrough — the client gets full ownership, not a dependency on me."
    },
    {
      icon: <LifeBuoy className="w-6 h-6" />,
      title: "Post-Launch Support",
      description: "Support after delivery on every plan, so the client is never left alone with a live product."
    }
  ];

  const responsibilities = [
    "Direct client communication & requirement gathering",
    "Scoping, timelines and fixed-fee project planning",
    "Architecture, development and code review",
    "Testing every build until it is completely error-free",
    "Deployment, domain setup and final handover",
    "Post-launch support and long-term maintenance"
  ];

  const facts = [
    { icon: <Briefcase className="w-4 h-4" />, label: "End-to-end project ownership" },
    { icon: <BadgeCheck className="w-4 h-4" />, label: "Govt. of India MSME / Udyam Registered" },
    { icon: <MapPin className="w-4 h-4" />, label: "Bhubaneswar, Odisha — serving worldwide" },
    { icon: <Users className="w-4 h-4" />, label: "6 disciplines under one roof" }
  ];

  return (
    <section id="studentlancer" className="py-12 md:py-20 bg-dark-surface relative overflow-hidden">
      {/* Background ornaments */}
      <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        {showHeading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-neon-green/10 text-neon-green border border-neon-green/20 mb-6">
              <Briefcase className="w-3.5 h-3.5" />
              Freelance Developer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-tech">
              <span className="heading-emoji">🚀 </span>Where I Freelance — <span className="text-neon-green">Student Lancer</span>
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto">
              A digital studio where emerging talent designs and ships world-class software — and where I take on
              client projects as a freelance developer.
            </p>
          </motion.div>
        )}

        {/* Main studio card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mb-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-gradient-card border border-dark-border rounded-2xl p-8 hover:border-neon-green/30 transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green">
                <Briefcase className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground font-tech">StudentLancer</h3>
                <p className="text-sm text-neon-green/80 tracking-wide">Freelance Developer · studentlancer.in</p>
              </div>
            </div>

            <div className="space-y-5 text-gray-text leading-relaxed">
              <p>
                I work as a <span className="text-neon-green">freelance developer</span> with{" "}
                <span className="text-neon-green">StudentLancer</span> — a digital studio where young engineers and
                designers build websites, products and brands at an international standard, for startups and growing
                businesses across India and beyond.
              </p>
              <p>
                Every project I take there, I own <span className="text-neon-green">end to end</span>: I join the first
                client call, scope the work, design the architecture, write and review the code, and personally test
                and sign off on the delivery before it reaches the client.
              </p>
              <p>
                It is registered with the <span className="text-neon-green">Government of India</span> as an MSME /
                Udyam enterprise, operating from Bhubaneswar, Odisha — and shipping worldwide.
              </p>
            </div>

            {/* Facts */}
            <div className="flex flex-wrap gap-3 mt-8">
              {facts.map((fact, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 text-xs font-medium text-foreground/80 bg-dark-bg/50 border border-dark-border rounded-full px-3 py-2"
                >
                  <span className="text-neon-green">{fact.icon}</span>
                  {fact.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Magnetic>
                <Button
                  onClick={() => window.open("https://www.studentlancer.in/", "_blank", "noopener,noreferrer")}
                  className="bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold px-6 py-3 transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit StudentLancer
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  onClick={goToContact}
                  variant="outline"
                  className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg font-semibold px-6 py-3 transition-all duration-300"
                >
                  Start a Project With Me
                </Button>
              </Magnetic>
            </div>
          </motion.div>

          {/* Responsibilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 bg-dark-bg/40 border border-dark-border rounded-2xl p-8 hover:border-neon-green/30 transition-all duration-500"
          >
            <h3 className="text-xl font-bold text-foreground mb-2 font-tech">What I Personally Handle</h3>
            <p className="text-sm text-gray-text mb-6">
              Working directly with the client means no translation loss between the brief and the code.
            </p>
            <ul className="space-y-4">
              {responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-text">
                  <BadgeCheck className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Disciplines */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3 font-tech">
            Services I <span className="text-neon-green">Deliver</span> Through StudentLancer
          </h3>
          <p className="text-gray-text text-center mb-10 max-w-2xl mx-auto">
            Six disciplines, one studio — so a client never has to stitch three vendors together.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplines.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="group bg-dark-bg/40 border border-dark-border rounded-2xl p-6 hover:border-neon-green/40 hover:shadow-neon transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-xl bg-dark-surface text-neon-green flex items-center justify-center mb-4 group-hover:bg-neon-green group-hover:text-dark-bg transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-neon-green transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-text leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delivery process */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3 font-tech">
            My <span className="text-neon-green">Delivery Process</span>
          </h3>
          <p className="text-gray-text text-center mb-10 max-w-2xl mx-auto">
            The same five stages on every project — this is how a client always knows where their project stands.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {process.map((stage, index) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative bg-gradient-card border border-dark-border rounded-2xl p-6 hover:border-neon-green/40 transition-all duration-500"
              >
                <span className="absolute top-4 right-5 text-3xl font-bold text-neon-green/10 group-hover:text-neon-green/20 transition-colors duration-300">
                  {stage.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 text-neon-green flex items-center justify-center mb-4">
                  {stage.icon}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{stage.title}</h4>
                <p className="text-sm text-gray-text leading-relaxed">{stage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Handover promise */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3 font-tech">
            How I <span className="text-neon-green">Hand Over</span> a Project
          </h3>
          <p className="text-gray-text text-center mb-10 max-w-2xl mx-auto">
            A project isn&apos;t finished when the code works on my machine. It is finished when the client has a
            complete, error-free product in their own hands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {handover.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group flex items-start gap-5 bg-dark-bg/40 border border-dark-border rounded-2xl p-7 hover:border-neon-green/40 hover:shadow-neon transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-neon-green/10 border border-neon-green/20 text-neon-green flex items-center justify-center flex-shrink-0 group-hover:bg-neon-green group-hover:text-dark-bg transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-neon-green transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-text leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLancerSection;
