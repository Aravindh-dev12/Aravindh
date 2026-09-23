import { useState } from "react";
import { Link } from "react-router-dom";
import { site, type Project } from "@/config/site";
import { Reveal, SectionHeader } from "./reveal";
import { ArrowUpRight, GitHubIcon } from "./icons";

const fallbackProjectImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
];

export function ProjectCard({ p, i }: { p: Project; i: number }) {
  const fallbackImage = fallbackProjectImages[i % fallbackProjectImages.length];
  const [imageSrc, setImageSrc] = useState(p.image || fallbackImage);

  return (
    <Reveal delay={i * 0.04} className="w-full">
      <article
        id={`project-card-${p.title.toLowerCase().replace(/\\s+/g, "-")}`}
        className="group w-full overflow-hidden border-b border-neutral-800 pb-6"
      >
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-900">
          <img
            src={imageSrc}
            alt={`${p.title} preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            onError={() => {
              if (imageSrc !== fallbackImage) setImageSrc(fallbackImage);
            }}
          />
        </div>

        <div className="pt-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-serif text-2xl leading-tight text-neutral-100">
              {p.title}
            </h3>
            <span className="shrink-0 pt-1 font-mono text-xs text-neutral-500">{p.year}</span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-400">
            {p.blurb}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="font-mono text-[10px] text-neutral-500">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm">
            {p.links.live && (
              <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neutral-200 hover:text-white">
                Live <ArrowUpRight />
              </a>
            )}
            {p.links.source && (
              <a href={p.links.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white">
                <GitHubIcon className="h-4 w-4" /> Source
              </a>
            )}
            {p.featured && (
              <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                Featured
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  if (!site.projects.length) return null;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <SectionHeader id="projects" index="03" title="things I've built" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        {site.projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/projects" className="inline-flex items-center rounded-full border border-neutral-800 px-5 py-2.5 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white">
          View all projects →
        </Link>
      </div>
    </section>
  );
}
