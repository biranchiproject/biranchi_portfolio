import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { useSiteDesign } from "@/lib/siteDesign";

interface PageLayoutProps {
  eyebrow?: string;
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

const PageLayout = ({ eyebrow, eyebrowIcon, title, description, children }: PageLayoutProps) => {
  const { isTexotic } = useSiteDesign();

  if (isTexotic) {
    return (
      <div className="min-h-screen">
        <Header />

        <main>
          <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <Link to="/" className="tx-btn-clay inline-flex items-center gap-2 px-5 py-2 text-sm mb-10">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              <div className="max-w-4xl animate-fade-in">
                {eyebrow && (
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-sm font-semibold text-[#a1a1aa]">01</span>
                    <span className="w-6 h-px bg-black/15" />
                    <span className="tx-chip">
                      {eyebrowIcon}
                      {eyebrow}
                    </span>
                  </div>
                )}

                <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] pb-2">{title}</h1>

                {description && (
                  <p className="mt-6 text-lg md:text-xl text-[#71717a] leading-relaxed max-w-3xl">{description}</p>
                )}
              </div>
            </div>
          </section>

          {children}
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        {/* Page hero */}
        <section className="relative overflow-hidden bg-gradient-dark pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-neon-green/5 rounded-full blur-[130px] pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-text hover:text-neon-green transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="max-w-3xl animate-fade-in">
              {eyebrow && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-neon-green/10 text-neon-green border border-neon-green/20 mb-6">
                  {eyebrowIcon}
                  {eyebrow}
                </span>
              )}

              <h1 className="text-4xl md:text-6xl font-bold font-tech text-foreground mb-6 leading-tight">
                {title}
              </h1>

              {description && (
                <p className="text-lg md:text-xl text-gray-text leading-relaxed">{description}</p>
              )}

              <div className="w-24 h-1 bg-neon-green mt-8"></div>
            </div>
          </div>
        </section>

        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
