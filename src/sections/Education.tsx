import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { Reveal } from "@/components/CinematicEffects";

export function Education() {
  if (!site.education.length) return null;

  return (
    <div id="education">
      <SectionHeader
        title="Education"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            academic background
          </span>
        }
      />

      <Shell className="relative">
        <div className="relative border-b border-[var(--line)]">
          {site.education.map((edu, i) => (
            <Reveal key={`${edu.institution}-${i}`} delay={i * 0.06}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative px-6 py-7 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-3">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[var(--fg)]">
                      {edu.degree} · {edu.field}
                    </h3>
                    <p className="mt-1 text-[13.5px] text-[var(--muted)]">
                      {edu.institution}
                    </p>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--soft)]">
                      {edu.location}
                    </p>
                  </div>

                  <span className="rounded-md border border-[var(--line)] bg-[var(--chip)] px-2 py-1 font-mono text-[10.5px] text-[var(--muted)]">
                    {edu.period}
                  </span>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Shell>
    </div>
  );
}
