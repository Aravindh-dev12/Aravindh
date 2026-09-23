import { motion } from "framer-motion";
import { type Project } from "@/config/site";
import { ArrowUpRight, Github, Globe2 } from "lucide-react";

function projectCategory(p: Project) {
  if (p.categories?.includes("AI")) return "AI / SYSTEMS";
  if (p.categories?.includes("Fullstack")) return "FULL STACK";
  if (p.categories?.includes("Backend")) return "ENGINEERING";
  return "PRODUCT / WEB";
}

export function ProjectCard({ project: p }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-[390px] w-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--soft)]"
    >
      <div className="relative h-[155px] shrink-0 overflow-hidden bg-[var(--chip)]">
        {p.image ? (
          <img
            src={p.image}
            alt={`${p.title} project preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="h-full w-full bg-[var(--chip)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
          {projectCategory(p)}
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[9px] text-white/75 backdrop-blur-sm">
          {p.year}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 font-serif text-2xl leading-none tracking-[-0.02em] text-[var(--fg)]">
            {p.title}
          </h3>
          {p.featured && (
            <span className="shrink-0 pt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-emerald-400">
              Featured
            </span>
          )}
        </div>

        <p className="mt-3 line-clamp-3 text-[11px] leading-[1.6] text-[var(--muted)]">
          {p.blurb}
        </p>

        <div className="mt-3 flex min-h-[18px] flex-wrap gap-x-2.5 gap-y-1">
          {p.stack.slice(0, 5).map((tech) => (
            <span key={tech} className="font-mono text-[9px] text-[var(--soft)]">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-[var(--line)] pt-4">
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.title + " website"}
              className="flex h-9 items-center justify-between rounded-lg border border-[var(--line)] px-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--fg)] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            >
              <span className="flex items-center gap-1.5"><Globe2 className="size-3" /> Live</span>
              <ArrowUpRight className="size-3" />
            </a>
          )}
          {p.links.source && (
            <a
              href={p.links.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.title + " GitHub repository"}
              className="flex h-9 items-center justify-between rounded-lg border border-[var(--line)] px-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--fg)] transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            >
              <span className="flex items-center gap-1.5"><Github className="size-3" /> GitHub</span>
              <ArrowUpRight className="size-3" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
