import { ArrowUpRight, ChevronDown, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpeg";
import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import { forceDownload } from "@/utils/download";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useSiteDesign } from "@/lib/siteDesign";

const roles = ["Freelance Developer", "Cybersecurity Specialist", "AI Agent Developer", "Security Researcher", "Full Stack Developer"];

const HeroSection = () => {
  const navigate = useNavigate();
  const { isTexotic } = useSiteDesign();
  const [clickCount, setClickCount] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Glitch Typing Effect
  useEffect(() => {
    const activeRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 150;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < activeRole.length) {
        setDisplayText(activeRole.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === activeRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(activeRole.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const { data, error } = await supabase.from('cv').select('file_url').order('created_at', { ascending: false }).limit(1).single();
        if (error && error.code !== 'PGRST116') throw error;
        if (data?.file_url) setCvUrl(data.file_url);
      } catch (err) {
        console.error("Fetch CV error:", err);
      }
    };
    
    const fetchProfilePhoto = async () => {
      try {
        const { data, error } = await supabase.from('profile_photo').select('file_url').order('created_at', { ascending: false }).limit(1).single();
        if (error && error.code !== 'PGRST116') throw error;
        if (data?.file_url) setProfilePhotoUrl(data.file_url);
      } catch (err) {
        console.error("Fetch Profile Photo error:", err);
      }
    };

    fetchCv();
    fetchProfilePhoto();
  }, []);

  const handleDownloadCv = async () => {
    if (!cvUrl) {
      toast.error("CV not available. Please upload from Admin Panel.");
      return;
    }
    
    toast.success("Downloading CV...");
    // Dynamically detect extension from URL
    const extension = cvUrl.split(".").pop()?.split("?")[0] || "pdf";
    await forceDownload(cvUrl, `Raja_CV.${extension}`);
  };

  useEffect(() => {
    if (clickCount === 0) return;
    const timer = setTimeout(() => setClickCount(0), 500);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleProfileClick = () => {
    const nextCount = clickCount + 1;
    if (nextCount === 3) {
      setIsAdminOpen(true);
      setClickCount(0);
    } else {
      setClickCount(nextCount);
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
        push: { quantity: 4 },
      },
    },
    particles: {
      color: { value: "#22c55e" },
      links: {
        color: "#22c55e",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
      },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  const subtitleText = "Securing the digital frontier and building intelligent agents for the future.";
  
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const letterVariants = {
    animate: {
      color: ["#9ca3af", "#22c55e", "#9ca3af"],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  if (isTexotic) {
    const facts = [
      { label: "Role", value: "Freelance Developer" },
      { label: "Focus", value: "Cybersecurity & AI" },
      { label: "Based in", value: "Bhubaneswar, Odisha" },
    ];

    return (
      <section id="home" className="relative overflow-hidden pt-32 md:pt-40 pb-10">
        <div className="tx-silk" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span className="tx-chip">
              Hi! I'm Biranchi · Creativity
            </span>

            <h1 className="sr-only">Biranchi — Securing the Digital Frontier</h1>

            {/* Animated profile circle: spinning amber ring, pulsing glow, gentle float */}
            <div className="mt-12 flex justify-center">
              <motion.div
                className="relative w-56 h-56 md:w-72 md:h-72 cursor-pointer"
                onClick={handleProfileClick}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {[0, 1.5].map((delay) => (
                  <motion.span
                    key={delay}
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: "0 0 0 2px rgba(245,144,13,.55), 0 0 40px 6px rgba(245,144,13,.35)" }}
                    animate={{ scale: [1, 1.22], opacity: [0.7, 0] }}
                    transition={{ duration: 3, delay, repeat: Infinity, ease: "easeOut" }}
                  />
                ))}
                <motion.span
                  aria-hidden
                  className="absolute -inset-2 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #f5900d, #fde68a, #0a0a0a 45%, #f5900d 70%, #fde68a, #f5900d)",
                    boxShadow: "0 20px 50px -12px rgba(245,144,13,.55)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-[#f5f8ef] shadow-[0_10px_30px_-8px_rgba(0,0,0,.35)]">
                  <img
                    src={profilePhotoUrl || profilePhoto}
                    alt="Biranchi - Cybersecurity Enthusiast & AI Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            <p className="mt-8 text-lg md:text-2xl text-[#71717a] min-h-[1.5em]">
              I'm a <span className="font-semibold text-[#0a0a0a]">{displayText}</span>
              <span className="inline-block w-[2px] h-[0.9em] translate-y-[0.12em] bg-[#f5900d] ml-0.5 animate-pulse" />
            </p>
            <p className="mt-3 text-base md:text-xl text-[#71717a] max-w-2xl mx-auto leading-relaxed">{subtitleText}</p>

            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
              <Magnetic>
                <button
                  onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  className="tx-btn-ink inline-flex items-center gap-2 px-10 py-3.5 text-sm min-w-[200px] justify-center"
                >
                  View My Work
                  <ArrowUpRight className="tx-arrow w-4 h-4" />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="tx-btn-clay px-10 py-3.5 text-sm min-w-[180px]"
                >
                  Get In Touch
                </button>
              </Magnetic>
              <Magnetic>
                <button onClick={() => navigate("/achievements")} className="tx-btn-clay px-10 py-3.5 text-sm min-w-[180px]">
                  My Achievements
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={handleDownloadCv}
                  className="tx-btn-clay inline-flex items-center justify-center gap-2 px-10 py-3.5 text-sm min-w-[180px]"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
              </Magnetic>
            </div>
          </motion.div>

          {/* Glass panel — the big rounded sheet under the Texotic hero */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:mt-20 mx-auto max-w-5xl rounded-[40px] md:rounded-[56px] border-2 border-white/80 bg-white/25 backdrop-blur-md p-5 md:p-8 shadow-[0_30px_80px_-30px_rgba(120,100,20,0.35)]"
          >
            <div>
              <div className="text-center md:px-6">
                <p className="tx-display text-2xl md:text-4xl font-bold tracking-[-0.03em] text-[#0a0a0a] leading-tight">
                  Building secure, intelligent software —{" "}
                  <span className="text-[#71717a]">delivered completely error-free.</span>
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {facts.map((fact) => (
                    <div key={fact.label} className="rounded-2xl px-4 py-3 tx-pressed">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#71717a]">{fact.label}</p>
                      <p className="mt-1 text-sm font-semibold text-[#0a0a0a]">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <AdminLogin isOpen={isAdminOpen} onOpenChange={setIsAdminOpen} />

          <button
            onClick={scrollToAbout}
            className="mt-14 inline-flex flex-col items-center text-[#71717a] hover:text-[#0a0a0a] transition-colors duration-300"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] mb-2">Scroll to explore</span>
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden pt-24 md:pt-28">
      {/* Animated ribbon text */}
      <div className="absolute top-20 left-0 right-0 overflow-hidden">
        <div className="whitespace-nowrap text-6xl md:text-8xl font-bold text-neon-green/10 animate-scroll-horizontal">
          Portfolio Portfolio Portfolio Portfolio Portfolio Portfolio
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          {/* Greeting */}
          <p className="text-gray-text text-lg mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Hi! I'm Biranchi | Based in Bhubaneswar, Odisha
          </p>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight min-h-[1.2em]" style={{ animationDelay: "0.4s" }}>
            <span className="relative">
              <span className="text-neon-green">{displayText.split(" ")[0]}</span>
              <span className="text-foreground">
                {displayText.includes(" ") ? " " + displayText.split(" ").slice(1).join(" ") : ""}
              </span>
            </span>
            <span className="inline-block w-[2px] h-[0.8em] bg-neon-green ml-1 animate-pulse"></span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            variants={containerVariants}
            animate="animate"
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 animate-slide-up font-medium" 
            style={{ animationDelay: "0.6s" }}
          >
            {subtitleText.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* Profile Photo */}
          <div className="flex justify-center mb-12 animate-scale-in" style={{ animationDelay: "0.8s" }}>
            <div className="relative cursor-pointer" onClick={handleProfileClick}>
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-neon-green shadow-neon-strong animate-float">
                <img
                  src={profilePhotoUrl || profilePhoto}
                  alt="Biranchi - Cybersecurity Enthusiast & AI Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-neon-green animate-glow"></div>
            </div>
          </div>

          <AdminLogin isOpen={isAdminOpen} onOpenChange={setIsAdminOpen} />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: "1s" }}>
            <Magnetic>
              <Button
                onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold px-8 py-3 text-lg transition-all duration-300 min-w-[180px]"
              >
                View My Work
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg font-semibold px-8 py-3 text-lg transition-all duration-300 min-w-[180px]"
              >
                Get In Touch
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                onClick={() => navigate("/achievements")}
                className="bg-dark-surface border border-neon-green/30 text-neon-green hover:border-neon-green hover:bg-neon-green/10 font-semibold px-8 py-3 text-lg transition-all duration-300 min-w-[180px]"
              >
                My Achievements
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                onClick={handleDownloadCv}
                variant="secondary"
                className="bg-dark-surface border border-neon-green/30 text-foreground hover:border-neon-green font-semibold px-8 py-3 text-lg transition-all duration-300 flex items-center gap-2 min-w-[180px]"
              >
                <Download size={20} className="text-neon-green" />
                Download CV
              </Button>
            </Magnetic>
          </div>

          {/* Scroll Down Indicator */}
          <button
            onClick={scrollToAbout}
            className="inline-flex flex-col items-center text-gray-text hover:text-neon-green transition-colors duration-300 animate-bounce"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="text-sm mb-2">Scroll Down to Explore More</span>
            <ChevronDown size={24} />
          </button>
        </div>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-black pointer-events-none z-[0]"></div>
    </section>
  );
};

export default HeroSection;