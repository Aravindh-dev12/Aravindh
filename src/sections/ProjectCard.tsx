import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/config/site";
import { ArrowUpRight, ChevronDown, ChevronUp, Github } from "lucide-react";
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
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TiltCard intensity={3.5} className="h-full">
      <article className="group relative min-h-[520px] overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--card)]">
        <div className="relative h-[270px] overflow-hidden border-b border-[var(--line)] bg-[var(--chip)]">
          {p.image ? (
            <motion.img
              src={p.image}
              alt={`${p.title} project preview`}
              className="h-full w-full object-contain p-4 transition duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div className="h-full w-full bg-[var(--chip)]" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--card)]/55 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex min-h-[250px] flex-col justify-between p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <motion.div
              className="relative grid size-20 place-items-center rounded-full border border-white/25 bg-black/45 backdrop-blur-md"
              whileHover={{ rotate: 8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
            >
              <div className="absolute inset-2 rounded-full border border-dashed border-white/25 transition-transform duration-700 group-hover:rotate-180" />
              <span className="font-mono text-xl tracking-[-0.08em] text-white">{projectMark(p.title)}</span>
            </motion.div>

            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-white/65">
              <span>{projectCategory(p)}</span>
              <span className="size-1 rounded-full bg-white/45" />
              <span>{p.year}</span>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              {p.status && (
                <span className="rounded-full border border-amber-200/30 bg-amber-300/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-amber-100 backdrop-blur-md">
                  {p.status}
                </span>
              )}
              {p.featured && (
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
                  Featured
                </span>
              )}
            </div>

            <div className="flex items-end justify-between gap-5">
              <div className="max-w-[80%]">
                <h3 className="font-serif text-4xl leading-[0.9] tracking-[-0.035em] text-[var(--fg)] sm:text-5xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-[var(--muted)] line-clamp-3">
                  {p.blurb}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {p.links.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} live site`}
                    className="grid size-11 place-items-center rounded-full border border-[var(--line)] bg-[var(--chip)] text-[var(--fg)] transition hover:-translate-y-1 hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
                {p.links.source && (
                  <a
                    href={p.links.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} repository`}
                    className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:text-black"
                  >
                    <Github className="size-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 5).map((t) => (
                <span key={t} className="rounded-full border border-[var(--line)] bg-[var(--chip)] px-2.5 py-1 font-mono text-[9px] text-[var(--muted)]">
                  {t}
                </span>
              ))}
            </div>

            {p.story && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55 transition hover:text-white"
                >
                  {showDetails ? "Close case study" : "Read engineering note"}
                  {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                <AnimatePresence initial={false}>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-2xl border border-[var(--line)] bg-[var(--chip)] p-4 text-[11px] leading-relaxed text-[var(--muted)]">
                        {p.story.split("\n\n").map((para, idx) => (
                          <p key={idx} className={idx ? "mt-2" : ""}>{para}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-6 top-[270px] h-px bg-gradient-to-r from-transparent via-[var(--fg)]/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </article>
    </TiltCard>
  );
}
