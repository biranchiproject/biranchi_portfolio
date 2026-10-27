import { Button } from "@/components/ui/button";
import { ArrowUpRight, ExternalLink, Github, Loader2 } from "lucide-react";
import project2 from "@/assets/project-2.jpg";
import hackerStoreImg from "@/assets/hacker-store.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useSiteDesign } from "@/lib/siteDesign";
import TexoticWorkCard from "./TexoticWorkCard";

const PortfolioSection = () => {
  const navigate = useNavigate();
  const { isTexotic } = useSiteDesign();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fallbackProjects = [
    {
      id: 1,
      title: "Sona Store",
      description: "A dynamic app store platform featuring a vast library of applications, seamless downloads, and an intuitive, modern interface similar to the Play Store.",
      image: project2,
      tags: ["App Store", "React", "Web App"],
      liveUrl: "https://sona-store.pages.dev/",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Hacker Store",
      description: "A modern cyber-themed app store platform designed with a hacker-style UI. It features a sleek dark interface, secure download system, and categorized applications.",
      image: hackerStoreImg,
      tags: ["Cybersecurity", "React", "Web App", "Full Stack"],
      liveUrl: "https://hacker-store.pages.dev/",
      githubUrl: "#"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
            // Strictly ONLY show Sona Store and Hacker Store on the first page
            const featured = data.filter((p: any) => 
                p.title === "Sona Store" || p.title === "Hacker Store"
            );
            
            if (featured.length > 0) {
                setProjects(featured);
            } else {
                setProjects(fallbackProjects);
            }
        } else {
            setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error("Fetch projects error:", error);
        setProjects(fallbackProjects);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (isTexotic) {
    return (
      <section id="portfolio" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-[clamp(3rem,7vw,5rem)] leading-[1.05] pb-1">My Work</h2>
          <p className="mt-3 text-lg text-[#71717a] max-w-2xl">
            A collection of projects built with love, strategy, and creative impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <span className="tx-pressed rounded-full bg-black/[0.06] px-5 py-2 text-sm font-bold text-[#0a0a0a] tx-display">
              Featured · {projects.length}
            </span>
            <button
              onClick={() => navigate("/projects")}
              className="tx-btn-clay inline-flex items-center gap-1.5 px-5 py-2 text-sm tx-display"
            >
              All projects
              <ArrowUpRight className="tx-arrow w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-16">
                <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
              </div>
            ) : (
              projects.map((project) => <TexoticWorkCard key={project.id} project={project} />)
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-12 md:py-20 bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="heading-emoji">📂 </span>My <span className="text-neon-green">Work</span>
          </h2>
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            A collection of projects built with love, strategy, and creative impact.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="w-full max-w-sm lg:max-w-md group bg-gradient-card border border-dark-border rounded-2xl overflow-hidden hover:shadow-neon transition-all duration-500 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48">
                {isLoading ? (
                    <div className="w-full h-full bg-dark-bg flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
                    </div>
                ) : (
                    <img
                      src={project.image_url || project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-neon-green transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-text mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-semibold text-neon-green bg-neon-green/10 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-neon-green text-dark-bg hover:shadow-neon font-semibold transition-all duration-300"
                    onClick={() => window.open(project.liveUrl || project.live_link, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live
                  </Button>
                  <Button
                    variant="outline"
                    className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
                    onClick={() => window.open(project.githubUrl || project.github_link, "_blank")}
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/projects")}
            variant="outline"
            className="border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-bg font-semibold px-8 py-3 text-lg transition-all duration-300"
          >
            View More Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;