import { site } from "@/config/site";
import { Writing } from "@/components/writing";
import { Reveal } from "@/components/reveal";
import { ExternalLink } from "lucide-react";
import { MediumIcon } from "@/components/icons";

export function WritingPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-[#0066ff] dark:text-emerald-400 font-semibold">
            03 / Articles & Insights
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-neutral-900 dark:text-neutral-100 font-normal mt-2">
            Writing & Thoughts
          </h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl leading-relaxed">
            Technical write-ups, architecture breakdowns, system design insights, and lessons learned while engineering software.
          </p>
        </Reveal>

        <Writing />

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white">
                <MediumIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-950 dark:text-neutral-100 text-lg">Follow on Medium</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">View the full archive and follow new posts.</p>
              </div>
            </div>

            <a
              href={site.socials.medium}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-900 dark:bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 shrink-0"
            >
              Medium Profile <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
