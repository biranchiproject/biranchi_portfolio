import { GraduationCap, Landmark, BookOpen } from "lucide-react";

interface EducationSectionProps {
    /** Dedicated page already renders the title, so the in-section heading can be turned off. */
    showHeading?: boolean;
}

const EducationSection = ({ showHeading = true }: EducationSectionProps) => {
    const education = [
        {
            id: 1,
            degree: "Bachelor of Technology (B.Tech)",
            specialization: "Computer Science & Engineering (Artificial Intelligence)",
            institution: "GIET, Bhubaneswar",
            status: "Currently Pursuing",
            description: [
                "Specialized in Artificial Intelligence and emerging technologies",
                "Focused on Machine Learning fundamentals, Data Structures, and Software Development",
                "Actively building real-world AI and development projects"
            ]
        },
        {
            id: 2,
            degree: "Diploma in Computer Science Engineering",
            specialization: "",
            institution: "BOSE (BhubanaNanda Odisha School of Engineering), Cuttack",
            status: "Completed",
            description: [
                "Completed core subjects including Programming, Database Management, and Computer Fundamentals",
                "Built foundational knowledge in software development and system design",
                "Participated in technical workshops and seminars"
            ]
        }
    ];

    return (
        <section id="education" className="py-12 md:py-20 bg-dark-bg relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {showHeading && (
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            <span className="heading-emoji">📘 </span>My <span className="text-neon-green">Education</span>
                        </h2>
                        <p className="text-xl text-gray-text max-w-3xl mx-auto">
                            My academic journey and qualifications.
                        </p>
                    </div>
                )}

                <div className="max-w-4xl mx-auto space-y-8">
                    {education.map((edu, index) => (
                        <div
                            key={edu.id}
                            className="group bg-gradient-card border border-dark-border rounded-2xl p-8 hover:shadow-neon transition-all duration-500 hover:scale-[1.02] animate-fade-in relative overflow-hidden"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute -right-10 -bottom-10 text-neon-green/5 group-hover:text-neon-green/10 transition-colors duration-500">
                                <GraduationCap className="w-64 h-64 transform rotate-12" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-6">
                                {/* Icon Column */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center text-neon-green border border-neon-green/30 group-hover:bg-neon-green group-hover:text-black transition-all duration-300">
                                        <Landmark className="w-8 h-8" />
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                        <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-green transition-colors duration-300">
                                            {edu.degree}
                                        </h3>
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neon-green/10 text-neon-green border border-neon-green/20 mt-2 md:mt-0 w-fit">
                                            {edu.status}
                                        </span>
                                    </div>

                                    {edu.specialization && (
                                        <div className="text-lg text-gray-text font-medium mb-1">
                                            {edu.specialization}
                                        </div>
                                    )}

                                    <div className="text-lg text-gray-text/80 mb-6 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neon-green"></span>
                                        {edu.institution}
                                    </div>

                                    <div className="space-y-3">
                                        {edu.description.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 text-gray-text group-hover:text-gray-300 transition-colors duration-300">
                                                <BookOpen className="w-5 h-5 text-neon-green/70 mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none"></div>
        </section>
    );
};

export default EducationSection;
