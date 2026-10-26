import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import CybersecuritySection from "@/components/CybersecuritySection";
import EducationSection from "@/components/EducationSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import NameBreak from "@/components/motion/NameBreak";
import StackCards from "@/components/motion/StackCards";
import VelocityMarquee from "@/components/motion/VelocityMarquee";
import { useSiteDesign } from "@/lib/siteDesign";

const Index = () => {
  const { motionOn } = useSiteDesign();

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header />

      <main>
        <HeroSection />
        {motionOn && <NameBreak />}
        <AboutSection />
        {motionOn && <StackCards />}
        <ServicesSection />
        {motionOn && <VelocityMarquee />}
        <SkillsSection />
        <CybersecuritySection />
        <EducationSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
