import React from "react";
import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { Reveal } from "@/components/CinematicEffects";
import { ArrowUpRight } from "lucide-react";

function formatBulletText(text: string) {
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)\]]+)/g;
  const elements: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      elements.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noreferrer"
          className="text-[#0066ff] underline underline-offset-2 hover:opacity-80 font-medium inline-flex items-center gap-0.5"
        >
          {match[1]}
          <ArrowUpRight className="size-3 inline shrink-0" />
        </a>
      );
    } else if (match[3]) {
      const url = match[3];
      elements.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-[#0066ff] underline underline-offset-2 hover:opacity-80 font-medium inline-flex items-center gap-0.5"
        >
          {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          <ArrowUpRight className="size-3 inline shrink-0" />
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

const EXPERIENCE_META: Record<string, { focus: string; tags: string[] }> = {
  "Nuclei Tech Solutions": {
    focus: "Renewable SCADA telemetry · Solar & Wind monitoring · Naga Ltd & Surya Batteries · 100+ user CRM · 5+ web apps",
    tags: ["Solar & Wind Monitoring", "SCADA Services", "Naga Ltd & Surya", "IoT Telemetry", "100+ User CRM", "5+ Delivered Apps", "MLP-Mixer"],
  },
  "Loam AI": {
    focus: "Full-stack product ownership · Suspire (400+ Brands) · AI engineering · Team leadership",
    tags: ["Suspire (400+ Brands)", "800+ Vendors", "Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "PWA"],
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
          <div className="absolute bottom-8 left-[31px] top-8 hidden w-px overflow-hidden bg-[var(--line)] sm:block">
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2, ease: "easeOut" }} className="h-full w-full origin-top bg-[var(--fg)]/60" />
          </div>

          {site.experience.map((job, i) => {
            const meta = EXPERIENCE_META[job.company];

            return (
              <Reveal delay={i * 0.06}>
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
                    {job.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2.5">
                        <span className="mt-[9px] size-1 shrink-0 rounded-full bg-[var(--soft)]" />
                        <span>{formatBulletText(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {job.clients?.length ? (
                  <div className="mt-5 pt-4 border-t border-[var(--line)]">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--soft)] font-medium block mb-3">
                      SCADA Services & Enterprise Clients
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {job.clients.map((client) => (
                        <a
                          key={client.name}
                          href={client.url || "#"}
                          target={client.url ? "_blank" : undefined}
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border border-[var(--line)] bg-[var(--card)] hover:bg-[var(--chip)] transition-colors group/client"
                        >
                          <div className="size-11 rounded-md overflow-hidden bg-white flex items-center justify-center p-1 border border-neutral-200 shrink-0 shadow-xs">
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[13px] font-semibold text-[var(--fg)] flex items-center gap-1 group-hover/client:text-[#0066ff] transition-colors">
                              <span className="truncate">{client.name}</span>
                              <ArrowUpRight className="size-3 shrink-0 opacity-0 group-hover/client:opacity-100 transition-opacity" />
                            </div>
                            {client.role && (
                              <div className="text-[11px] text-[var(--muted)] truncate mt-0.5">
                                {client.role}
                              </div>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
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
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </div>
  );
}
