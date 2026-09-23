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
    <Reveal delay={i * 0.05} className="h-[560px] min-h-[560px] w-full">
      <article
        id={`project-card-${p.title.toLowerCase().replace(/\\s+/g, "-")}`}
        className="flex h-[560px] min-h-[560px] w-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 transition-colors duration-200 hover:border-neutral-600"
      >
        <div className="h-48 w-full shrink-0 overflow-hidden bg-neutral-900">
          <img
            src={imageSrc}
            alt={`${p.title} preview`}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => {
              if (imageSrc !== fallbackImage) setImageSrc(fallbackImage);
            }}
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 font-serif text-2xl font-normal leading-tight text-neutral-100">
              {p.title}
            </h3>
            <span className="shrink-0 pt-1 font-mono text-xs text-neutral-500">{p.year}</span>
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-400">
            {p.blurb}
          </p>

          <div className="mt-4 flex min-h-[58px] flex-wrap content-start gap-2 overflow-hidden">
            {p.stack.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 font-mono text-[10px] text-neutral-400"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-neutral-800 pt-4">
            <div className="flex items-center gap-4 text-sm">
              {p.links.live && (
                <a
                  href={p.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-neutral-200 hover:text-white"
                >
                  Live <ArrowUpRight />
                </a>
              )}
              {p.links.source && (
                <a
                  href={p.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white"
                >
                  <GitHubIcon className="h-4 w-4" /> Source
                </a>
              )}
            </div>

            {p.featured && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
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
