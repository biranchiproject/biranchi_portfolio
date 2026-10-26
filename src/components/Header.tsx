import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useSiteDesign } from "@/lib/siteDesign";
import DesignSwitch from "./DesignSwitch";

type NavItem = {
  name: string;
  /** Route this item belongs to. */
  to: string;
  /** Optional section on that route ("#about"), scrolled to after navigation. */
  hash?: string;
};

const navigation: NavItem[] = [
  { name: "Home", to: "/" },
  { name: "About", to: "/", hash: "#about" },
  { name: "Student Lancer", to: "/student-lancer" },
  { name: "Services", to: "/services" },
  { name: "Cybersecurity", to: "/cybersecurity" },
  { name: "Education", to: "/education" },
  { name: "My Work", to: "/projects" },
  { name: "Contact", to: "/", hash: "#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isTexotic } = useSiteDesign();

  // The Texotic nav turns into a frosted pill once the page scrolls.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (item: NavItem) => !item.hash && pathname === item.to;

  const handleNavigate = (item: NavItem) => {
    setIsMenuOpen(false);

    if (!item.hash) {
      navigate(item.to);
      return;
    }

    // Already on the page that owns the section — just scroll to it.
    if (pathname === item.to) {
      document.querySelector(item.hash)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Otherwise go to the page first; ScrollToTop handles the scroll on arrival.
    navigate(`${item.to}${item.hash}`);
  };

  const goToContact = () => {
    setIsMenuOpen(false);

    if (pathname === "/") {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/#contact");
  };

  if (isTexotic) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:pt-4">
        <div
          className={`mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full px-4 py-2 sm:px-5 transition-all duration-500 ${
            isScrolled || isMenuOpen
              ? "bg-[#f5f7e8]/85 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
              : "bg-transparent"
          }`}
        >
          <Link to="/" className="tx-gradient-text text-2xl leading-none py-1" onClick={() => setIsMenuOpen(false)}>
            Biranchi
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navigation.slice(0, -1).map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item)}
                className={`rounded-full px-3.5 py-2.5 text-[13px] font-medium tracking-[0.01em] transition-colors duration-200 ${
                  isActive(item) ? "text-[#0a0a0a]" : "text-[#71717a] hover:text-[#0a0a0a]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden lg:block w-px h-5 bg-black/10 mx-2" />
            <DesignSwitch className="mr-1" />
            <button onClick={goToContact} className="tx-btn-clay hidden sm:inline-flex px-8 py-2 text-[13px]">
              Contact
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="tx-icon-btn lg:hidden"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mx-auto mt-3 max-w-5xl rounded-[24px] bg-[#f5f7e8]/95 backdrop-blur-xl p-3 tx-surface-lift animate-fade-in">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item)}
                className={`block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                  isActive(item) ? "tx-pressed text-[#0a0a0a]" : "text-[#71717a] hover:text-[#0a0a0a]"
                }`}
              >
                {item.name}
              </button>
            ))}
            <button onClick={goToContact} className="tx-btn-ink mt-3 w-full py-3 text-sm">
              Contact Me
            </button>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold font-tech">
              <span className="text-foreground">Biranchi</span>
              <span className="text-neon-green">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item)}
                className={`transition-colors duration-300 font-medium ${
                  isActive(item) ? "text-neon-green" : "text-gray-text hover:text-neon-green"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <DesignSwitch />
            <Button
              onClick={goToContact}
              className="bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold transition-all duration-300"
            >
              Contact Me
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <DesignSwitch />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-gray-text hover:text-neon-green transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-surface/95 backdrop-blur-md rounded-lg mt-2 border border-dark-border">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item)}
                  className={`block px-3 py-2 transition-colors duration-300 font-medium w-full text-left ${
                    isActive(item) ? "text-neon-green" : "text-gray-text hover:text-neon-green"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button
                  onClick={goToContact}
                  className="w-full bg-neon-green text-dark-bg hover:shadow-neon-strong font-semibold transition-all duration-300"
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
