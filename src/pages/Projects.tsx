import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import project2 from "@/assets/project-2.png";
import hackerStoreImg from "@/assets/hacker-store.png";
import { supabase } from "@/lib/supabase";
import { useSiteDesign } from "@/lib/siteDesign";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TexoticWorkCard from "@/components/TexoticWorkCard";

const Projects = () => {
    const navigate = useNavigate();
    const { isTexotic } = useSiteDesign();
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Define neon colors for decorative cubes
    const colors = [
        "rgba(34, 197, 94, 0.6)",   // Neon Green
        "rgba(234, 179, 8, 0.6)",   // Yellow
        "rgba(219, 39, 119, 0.6)",  // Pink
        "rgba(147, 51, 234, 0.6)",  // Purple
        "rgba(59, 130, 246, 0.6)",  // Blue
        "rgba(6, 182, 212, 0.6)",   // Cyan
    ];

    const fallbackProjects = [
        {
            id: 1,
            title: "Sona Store",
            description: "A dynamic app store platform featuring a vast library of applications, seamless downloads, and an intuitive, modern interface similar to the Play Store.",
            image_url: project2,
            tags: ["App Store", "React", "Web App"],
            live_link: "https://sona-store.pages.dev/",
            github_link: "#"
        },
        {
            id: 2,
            title: "Hacker Store",
            description: "A modern cyber-themed app store platform designed with a hacker-style UI. It features a sleek dark interface, secure download system, and categorized applications.",
            image_url: hackerStoreImg,
            tags: ["Cybersecurity", "React", "Web App", "Full Stack"],
            live_link: "https://hacker-store.pages.dev/",
            github_link: "#"
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
                    // EXCLUDE Sona Store and Hacker Store from this page
                    const upcoming = data.filter((p: any) => 
                        p.title !== "Sona Store" && p.title !== "Hacker Store"
                    );
                    setProjects(upcoming);
                } else {
                    setProjects([]);
                }
            } catch (error) {
                console.error("Fetch projects error:", error);
                setProjects([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (isTexotic) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="pt-32 md:pt-36 pb-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <h1 className="text-[clamp(3.25rem,8vw,5rem)] leading-[1.1] pb-1">My Projects</h1>
                        <p className="mt-3 text-lg text-[#71717a] max-w-2xl">
                            Explore all the works I've built, from creative designs to complex engineering.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate("/#portfolio")}
                                className="tx-btn-clay px-5 py-2 text-sm tx-display"
                            >
                                Featured
                            </button>
                            <span className="tx-pressed rounded-full bg-black/[0.06] px-5 py-2 text-sm font-bold text-[#0a0a0a] tx-display">
                                All projects · {projects.length}
                            </span>
                        </div>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoading ? (
                                <div className="col-span-full flex justify-center py-20">
                                    <Loader2 className="w-10 h-10 text-neon-green animate-spin" />
                                </div>
                            ) : projects.length > 0 ? (
                                projects.map((project) => <TexoticWorkCard key={project.id} project={project} />)
                            ) : (
                                <div className="col-span-full text-center py-20 rounded-[24px] tx-pressed">
                                    <p className="tx-display text-2xl font-bold text-[#0a0a0a]">No projects found yet.</p>
                                    <p className="text-[#71717a] mt-2">Check back soon — new work is on the way.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Generate random cubes
    const cubes = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        // Larger sizes for "3d" feel
        size: Math.random() * 80 + 40, // 40px to 120px
        left: Math.random() * 95, // %
        top: Math.random() * 95, // %
        duration: Math.random() * 8 + 12, // 12-20s duration (slow)
        delay: Math.random() * 5, // s
        color: colors[Math.floor(Math.random() * colors.length)],
        rotationDuration: Math.random() * 10 + 10, // s
    }));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">

            {/* Dark Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0"></div>

            {/* Floating Cubes Background */}
            <div className="floating-cubes-container pointer-events-none">
                {cubes.map((cube) => (
                    <div
                        key={cube.id}
                        className="cube"
                        style={{
                            width: `${cube.size}px`,
                            height: `${cube.size}px`,
                            left: `${cube.left}%`,
                            top: `${cube.top}%`,
                            // Neon Border & Glow
                            border: `2px solid ${cube.color}`,
                            boxShadow: `0 0 15px ${cube.color}, inset 0 0 10px ${cube.color}`,
                            // Animation
                            animationDuration: `${cube.duration}s`,
                            animationDelay: `${cube.delay}s`,
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
                <div className="flex flex-col items-center mb-16 animate-fade-in text-center">
                    <Button
                        onClick={() => navigate("/")}
                        variant="ghost"
                        className="mb-8 text-gray-text hover:text-neon-green transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Button>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground font-tech">
                        My <span className="text-neon-green">Projects</span>
                    </h1>
                    <p className="text-xl text-gray-text max-w-2xl mx-auto">
                        Explore all the works I've built, from creative designs to complex engineering.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 text-neon-green animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="group bg-dark-bg/40 backdrop-blur-md border border-dark-border rounded-2xl overflow-hidden hover:shadow-neon transition-all duration-500 hover:scale-105 animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <img
                                            src={project.image_url || "/placeholder.svg"}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-neon-green transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-text mb-6 line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex gap-3 mt-auto">
                                            <Button
                                                className="flex-1 bg-neon-green text-dark-bg hover:shadow-neon font-bold"
                                                onClick={() => window.open(project.live_link, "_blank")}
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" /> Live
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="border-neon-green text-neon-green hover:bg-neon-green hover:text-black"
                                                onClick={() => window.open(project.github_link, "_blank")}
                                            >
                                                <Github className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-dark-bg/20 rounded-2xl border border-dark-border">
                                <p className="text-2xl text-gray-text font-tech">No projects found in the database.</p>
                                <p className="text-gray-text mt-2">Check back soon or visit the admin panel to add some!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
