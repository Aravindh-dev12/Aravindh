import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";

export function Experience() {
  if (!site.experience.length) return null;

  return (
    <div id="experience">
      <SectionHeader title="Experience" />
      <Shell>
        {site.experience.map((job, i) => (
          <motion.div
            key={`${job.company}-${i}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`px-6 py-6 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8 ${
              i > 0 ? "border-t border-[var(--line)]" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15.5px] font-semibold text-[var(--fg)]">
                <span>{job.role}</span>
                <span className="text-[var(--soft)]">·</span>
                <span className="text-[var(--muted)]">{job.company}</span>
              </h3>
              <span className="font-mono text-[11px] text-[var(--soft)]">{job.period}</span>
            </div>

            {job.bullets?.length ? (
              <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-[var(--muted)]">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5">
                    <span className="mt-[9px] size-1 shrink-0 rounded-full bg-[var(--soft)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        ))}
      </Shell>
    </div>
  );
}
