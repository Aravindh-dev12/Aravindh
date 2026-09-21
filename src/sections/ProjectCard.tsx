import { motion } from "framer-motion";
import { type Project } from "@/config/site";
import { ArrowUpRight, Github, Globe2 } from "lucide-react";
import { TiltCard } from "@/components/CinematicEffects";

function projectMark(title: string) {
  const words = title.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").filter(Boolean);
  if (words.length > 1) return `${words[0][0]}${words[1][0]}`.toUpperCase();
  return title.slice(0, 2).toUpperCase();
}

function projectCategory(p: Project) {
  if (p.categories?.includes("AI")) return "AI / SYSTEMS";
  if (p.categories?.includes("Fullstack")) return "FULL STACK";
  if (p.categories?.includes("Backend")) return "ENGINEERING";
  return "PRODUCT / WEB";
}

export function ProjectCard({ project: p }: { project: Project; index?: number }) {
  return (
    <TiltCard intensity={3.5} className="h-full">
      <article className="group relative flex h-full min-h-[680px] flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)]">
        <div className="relative h-[270px] shrink-0 overflow-hidden border-b border-[var(--line)] bg-[var(--chip)]">
          {p.image ? (
            <motion.img
              src={p.image}
              alt={`${p.title} project preview`}
              className="h-full w-full object-contain p-4 transition duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div className="h-full w-full bg-[var(--chip)]" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--card)]/45 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <motion.div
              className="relative grid size-20 shrink-0 place-items-center rounded-full border border-white/25 bg-black/45 backdrop-blur-md"
              whileHover={{ rotate: 8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
            >
              <div className="absolute inset-2 rounded-full border border-dashed border-white/25 transition-transform duration-700 group-hover:rotate-180" />
              <span className="font-mono text-xl tracking-[-0.08em] text-white">{projectMark(p.title)}</span>
            </motion.div>

            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-[var(--soft)]">
              <span>{projectCategory(p)}</span>
              <span className="size-1 rounded-full bg-[var(--soft)]" />
              <span>{p.year}</span>
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {p.status && (
                <span className="rounded-full border border-amber-200/30 bg-amber-300/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-amber-100">
                  {p.status}
                </span>
              )}
              {p.featured && (
                <span className="rounded-full border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  Featured
                </span>
              )}
            </div>

            <h3 className="font-serif text-4xl leading-[0.9] tracking-[-0.035em] text-[var(--fg)] sm:text-5xl">
              {p.title}
            </h3>

            <p className="mt-4 text-[12px] leading-[1.65] text-[var(--muted)]">
              {p.blurb}
            </p>

            {p.story && (
              <div className="mt-5 border-l border-[var(--line)] pl-4">
                <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--soft)]">
                  Engineering note
                </div>
                <div className="space-y-2 text-[11px] leading-[1.65] text-[var(--muted)]">
                  {p.story.split("\\n\\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span key={t} className="rounded-full border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[9px] text-[var(--muted)]">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="mb-3 font-mono text-[8px] uppercase tracking-[0.18em] text-[var(--soft)]">
              Explore project
            </div>
            <div className="grid grid-cols-2 gap-2">
              {p.links.live && (
                <a
                  href={p.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.title + " website"}
                  className="group/link flex min-h-11 items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--chip)] px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--fg)]/40 hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                >
                  <span className="flex items-center gap-2"><Globe2 className="size-3.5" /> Website</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              )}
              {p.links.source && (
                <a
                  href={p.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.title + " GitHub repository"}
                  className="group/link flex min-h-11 items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--chip)] px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--fg)]/40 hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                >
                  <span className="flex items-center gap-2"><Github className="size-3.5" /> GitHub</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-6 top-[270px] h-px bg-gradient-to-r from-transparent via-[var(--fg)]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </article>
    </TiltCard>
  );
}
