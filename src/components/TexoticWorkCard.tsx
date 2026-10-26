import { ArrowUpRight, Github } from "lucide-react";

type WorkCardProject = {
  title: string;
  description: string;
  image?: string;
  image_url?: string;
  tags?: string[];
  liveUrl?: string;
  live_link?: string;
  githubUrl?: string;
  github_link?: string;
};

/** Project card in the Texotic design — mirrors the product cards on texotic.in/portfolio. */
const TexoticWorkCard = ({ project }: { project: WorkCardProject }) => {
  const liveUrl = project.liveUrl || project.live_link;
  const githubUrl = project.githubUrl || project.github_link;
  const category = project.tags?.[0] ?? "Project";

  return (
    <article className="tx-card group p-3 h-full flex flex-col">
      <div className="overflow-hidden rounded-2xl aspect-[3/2] bg-black/5">
        <img
          src={project.image_url || project.image || "/placeholder.svg"}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 pt-4 pb-3 flex-1 flex flex-col">
        <span className="text-[12.5px] text-[#71717a]">{category}</span>

        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="text-[21.6px] leading-tight text-[#0a0a0a]">
            {liveUrl ? (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-[24px]">
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <ArrowUpRight className="mt-1 w-4 h-4 flex-shrink-0 text-[#0a0a0a] opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <p className="mt-2 text-[14.4px] leading-[1.55] text-[#71717a] line-clamp-2">{project.description}</p>

        {githubUrl && githubUrl !== "#" && (
          <div className="mt-auto pt-4 flex justify-end">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className="tx-icon-btn relative z-10 w-9 h-9"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default TexoticWorkCard;
