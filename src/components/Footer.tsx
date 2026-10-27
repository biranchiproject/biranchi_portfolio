import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useSiteDesign } from "@/lib/siteDesign";

const Footer = () => {
  const { isTexotic } = useSiteDesign();

  const pageLinks = [
    { name: "Student Lancer", to: "/student-lancer" },
    { name: "Services & Skills", to: "/services" },
    { name: "Cybersecurity", to: "/cybersecurity" },
    { name: "Education", to: "/education" },
    { name: "My Work", to: "/projects" },
    { name: "Achievements", to: "/achievements" },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/biranchiproject", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/biranchisahoo/", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/biranchi._.sahoo?igsh=MWE4aWM0NWt4ZmRmbg==", label: "Instagram" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:sahoobiranchi8249@gmail.com", label: "Email" },
  ];

  if (isTexotic) {
    const email = socialLinks.find((social) => social.label === "Email");

    return (
      <footer className="relative overflow-hidden pt-24">
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6">
          <div className="rounded-[28px] p-8 md:p-10 tx-surface grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="tx-gradient-text text-5xl md:text-6xl leading-none pb-1">Biranchi</p>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[#71717a]">
                Freelance Developer at{" "}
                <a
                  href="https://www.studentlancer.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0a0a0a] underline decoration-[#f5900d] underline-offset-4"
                >
                  StudentLancer
                </a>{" "}
                — Cybersecurity Enthusiast, AI Developer &amp; Full Stack Developer. Building secure digital
                experiences and handing them over completely error-free.
              </p>
              {email && (
                <a href={email.href} className="tx-btn-clay mt-6 inline-flex items-center gap-2 px-4 py-1.5 text-sm">
                  <Mail className="w-4 h-4" />
                  sahoobiranchi8249@gmail.com
                </a>
              )}
              <p className="mt-5 flex items-start gap-3 text-sm text-[#52525b]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Bhubaneswar, Odisha, India
              </p>
            </div>

            <div className="md:col-span-4">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a]">Explore</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {pageLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-[15px] text-[#52525b] transition-colors hover:text-[#0a0a0a]">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-8 mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a]">Follow</p>
              <div className="flex items-center gap-3">
                {socialLinks
                  .filter((social) => social.label !== "Email")
                  .map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tx-icon-btn [&_svg]:w-4 [&_svg]:h-4"
                    >
                      {social.icon}
                    </a>
                  ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a]">Work with me</p>
              <p className="text-[15px] leading-relaxed text-[#52525b]">
                Have an idea? Let's build it — secure, tested and delivered error-free.
              </p>
              <a
                href="https://www.studentlancer.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="tx-btn-ink mt-6 inline-flex items-center gap-2 px-7 py-3 text-sm"
              >
                studentlancer.in
                <ArrowUpRight className="tx-arrow w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-[#52525b]">© Biranchi Creativity · All rights reserved.</p>
        </div>

        <div aria-hidden className="tx-watermark mt-10 -mb-[0.12em]">
          Biranchi
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold font-tech">
                <span className="text-foreground">Biranchi</span>
                <span className="text-neon-green">.</span>
              </span>
            </div>
            <p className="text-gray-text leading-relaxed max-w-md">
              Freelance Developer at{" "}
              <a
                href="https://www.studentlancer.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-green hover:text-foreground transition-colors duration-300"
              >
                StudentLancer
              </a>{" "}
              — Cybersecurity Enthusiast, AI Developer & Full Stack Developer based in Bhubaneswar, Odisha.
              Building secure digital experiences and handing them over completely error-free.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-text hover:text-neon-green transition-colors duration-300 p-2 rounded-lg hover:bg-neon-green/10"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Pages</h4>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-text hover:text-neon-green transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.studentlancer.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-text hover:text-neon-green transition-colors duration-300"
                >
                  studentlancer.in ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-text text-sm mb-4">
              Get notified about new projects and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-dark-surface border border-dark-border rounded-lg sm:rounded-r-none text-foreground text-sm focus:outline-none focus:border-neon-green"
              />
              <button className="px-4 py-2 bg-neon-green text-dark-bg rounded-lg sm:rounded-l-none hover:shadow-neon transition-all duration-300 text-sm font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="text-gray-text text-sm">
            © Biranchi Creativity | ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;