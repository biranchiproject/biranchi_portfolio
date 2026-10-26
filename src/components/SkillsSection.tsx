import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Brain, Rocket, Figma, Users, Database, ShieldCheck } from "lucide-react";

type Skill = {
  icon: LucideIcon;
  title: string;
  label: string;
  description: string;
};

const skills: Skill[] = [
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Ethical Hacking",
    label: "Security",
    description:
      "Securing web applications, identifying vulnerabilities, and performing penetration testing using tools like Nmap, Wireshark, and Burp Suite. Focused on protecting systems against XSS, SQL Injection, and modern cyber threats."
  },
  {
    icon: Database,
    title: "Basics of Python",
    label: "Scripting",
    description:
      "Knowledge of basic Python programming, used for scripting, automated workflows, and problem-solving. Exploring AI integration and security scripting through Python."
  },
  {
    icon: Brain,
    title: "AI & LLM Development",
    label: "Artificial Intelligence",
    description:
      "Building intelligent applications using Retrieval-Augmented Generation (RAG), LLM integrations (local and API-based), prompt engineering, and document-grounded AI systems."
  },
  {
    icon: Rocket,
    title: "Deployment & DevOps",
    label: "Shipping",
    description:
      "Managing production deployments, server configuration, environment setup, and performance optimization for reliable and scalable applications."
  },
  {
    icon: Figma,
    title: "Figma",
    label: "UI / UX Design",
    description:
      "UI/UX design with precision and empathy, creating user-centered digital experiences."
  },
  {
    icon: Users,
    title: "Art Lead",
    label: "Creative Direction",
    description:
      "Creative direction for digital teams, ensuring cohesive brand experiences across all touchpoints."
  }
];

const SkillsSection = () => {
  // Hover reveals the detail on desktop; tapping does the same on touch devices.
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-12 md:py-20 bg-gradient-dark relative overflow-hidden">
      {/* Animated ribbon text - Background */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden pointer-events-none opacity-20">
        <div className="whitespace-nowrap text-6xl md:text-8xl font-bold text-neon-green/10 animate-scroll-horizontal" style={{ animationDuration: "30s" }}>
          Skills Skills Skills Skills Skills Skills Skills Skills Skills Skills
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="heading-emoji">🧩 </span>My <span className="text-neon-green">Skills</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            Tools I use to design, develop, and deliver results.
          </p>
          <p className="text-sm text-neon-green/60 mt-4 tracking-wide">
            Hover or tap a skill to read the details
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const isOpen = activeSkill === skill.title;

            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <button
                  type="button"
                  onClick={() => setActiveSkill(isOpen ? null : skill.title)}
                  onMouseLeave={() => setActiveSkill(null)}
                  aria-expanded={isOpen}
                  className={`group relative w-full h-48 sm:h-52 overflow-hidden rounded-2xl border bg-dark-bg/50 transition-all duration-500 focus:outline-none focus-visible:border-neon-green hover:shadow-neon ${
                    isOpen ? "border-neon-green/50 shadow-neon" : "border-dark-border hover:border-neon-green/50"
                  }`}
                >
                  {/* Resting state — small logo + name */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-3 transition-all duration-300 ${
                      isOpen ? "opacity-0 scale-95" : "group-hover:opacity-0 group-hover:scale-95"
                    }`}
                  >
                    <span className="w-14 h-14 rounded-2xl bg-neon-green/10 border border-neon-green/20 text-neon-green flex items-center justify-center transition-all duration-300 group-hover:bg-neon-green group-hover:text-dark-bg">
                      <Icon className="w-7 h-7" />
                    </span>
                    <span className="text-sm font-bold text-foreground leading-snug text-center">
                      {skill.title}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-neon-green/60">
                      {skill.label}
                    </span>
                  </div>

                  {/* Revealed state — description */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-center gap-2 overflow-y-auto bg-dark-surface/95 backdrop-blur-sm p-4 sm:p-5 text-left transition-all duration-300 ${
                      isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
                    }`}
                  >
                    <span className="flex items-center gap-2 text-neon-green">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-bold uppercase tracking-wider">{skill.title}</span>
                    </span>
                    <p className="text-[10px] sm:text-xs text-gray-text leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <span className="absolute top-0 right-0 w-16 h-16 bg-neon-green/5 blur-2xl rounded-full pointer-events-none"></span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none"></div>
    </section>
  );
};

export default SkillsSection;
