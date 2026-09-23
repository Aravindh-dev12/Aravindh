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
        className="group flex h-[300px] w-full flex-col overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950 transition-colors duration-300 hover:border-neutral-700"
      >
        <div className="relative h-[125px] w-full shrink-0 overflow-hidden bg-neutral-900">
          <img
            src={imageSrc}
            alt={`${p.title} preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            onError={() => {
              if (imageSrc !== fallbackImage) setImageSrc(fallbackImage);
            }}
          />
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-neutral-950/80 px-2 py-1 font-mono text-[9px] text-neutral-400 backdrop-blur-sm">
            {p.year}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 truncate font-serif text-lg leading-tight text-neutral-100">
              {p.title}
            </h3>
            {p.featured && (
              <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-emerald-400">
                Featured
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
            {p.blurb}
          </p>

          <div className="mt-3 flex min-h-[18px] flex-wrap gap-x-2.5 gap-y-1">
            {p.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="font-mono text-[9px] text-neutral-500">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 border-t border-neutral-900 pt-3 text-xs">
            {p.links.live && (
              <a
                href={p.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-300 transition-colors hover:text-white"
              >
                Live <ArrowUpRight />
              </a>
            )}
            {p.links.source && (
              <a
                href={p.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-500 transition-colors hover:text-white"
              >
                <GitHubIcon className="h-3.5 w-3.5" /> Source
              </a>
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
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {site.projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center rounded-full border border-neutral-800 px-5 py-2.5 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
        >
          View all projects →
        </Link>
      </div>
    </section>
  );
}
