import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";

const EXPERIENCE_META: Record<string, { focus: string; tags: string[] }> = {
  "Nuclei Tech Solutions": {
    focus: "Enterprise systems · embedded data · applied ML",
    tags: ["On-Prem ERP", "Embedded Data", "MLP-Mixer", "Applied ML"],
  },
  "Loam AI": {
    focus: "Full-stack product ownership · AI engineering · team leadership",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "PWA", "CI/CD"],
  },
  "Perspectiv Labs": {
    focus: "Full-stack architecture · product engineering · production delivery",
    tags: ["React", "Next.js", "TypeScript", "PostgreSQL", "RBAC", "Integrations"],
  },
};

export function Experience() {
  if (!site.experience.length) return null;

  return (
    <div id="experience">
      <SectionHeader
        title="Professional Experience"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            product · systems · AI
          </span>
        }
      />

      <Shell className="relative">
        <div className="border-b border-[var(--line)] px-6 py-4 sm:px-8">
          <p className="max-w-2xl text-[13px] leading-relaxed text-[var(--muted)]">
            Building production software across full-stack product engineering, AI systems,
            data workflows, architecture, and team execution.
          </p>
        </div>

        <div className="relative">
          <div className="absolute bottom-8 left-[31px] top-8 hidden w-px bg-[var(--line)] sm:block" />

          {site.experience.map((job, i) => {
            const meta = EXPERIENCE_META[job.company];

            return (
              <motion.article
                key={`${job.company}-${i}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className={`group relative px-6 py-7 transition-colors duration-200 hover:bg-[var(--hover)] sm:pl-14 sm:pr-8 ${
                  i > 0 ? "border-t border-[var(--line)]" : ""
                }`}
              >
                <span className="absolute left-[27px] top-[34px] hidden size-[9px] rounded-full border-2 border-[var(--bg)] bg-[var(--fg)] ring-1 ring-[var(--line)] transition-transform group-hover:scale-125 sm:block" />

                <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-2">
                  <div>
                    <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[16px] font-semibold text-[var(--fg)]">
                      <span>{job.role}</span>
                      <span className="text-[var(--soft)]">·</span>
                      <span className="text-[var(--muted)]">{job.company}</span>
                    </h3>
                    {meta?.focus ? (
                      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--soft)]">
                        {meta.focus}
                      </p>
                    ) : null}
                  </div>

                  <span className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2 py-1 font-mono text-[10.5px] text-[var(--muted)]">
                    {job.period}
                  </span>
                </div>

                {job.bullets?.length ? (
                  <ul className="mt-4 space-y-2.5 text-[13.5px] leading-relaxed text-[var(--muted)]">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5">
                        <span className="mt-[9px] size-1 shrink-0 rounded-full bg-[var(--soft)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {meta?.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[var(--line)] bg-[var(--card)] px-2 py-1 font-mono text-[10.5px] text-[var(--soft)] transition-colors group-hover:text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </Shell>
    </div>
  );
}
