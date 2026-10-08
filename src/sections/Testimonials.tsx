import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Shell, SectionHeader } from "@/components/Layout";

const testimonials = [
  {
    client: "Reperto AI",
    label: "Healthcare AI · Client",
    quote:
      "Since integrating Reperto AI, we've shortened case-capture time and improved documentation accuracy. The assistant understands patient complaints in English and Hinglish, suggests relevant rubrics in real time, and guides follow-up questions so clinicians can focus on care rather than forms.",
  },
  {
    client: "NucleiTech",
    label: "Industrial Software · Client",
    quote:
      "The SCADA workspace for our solar plant transformed our operations. Real-time monitoring, clear alerts, and historical telemetry made troubleshooting faster and helped reduce downtime. The dashboards are intuitive for engineers and provide actionable insights every day.",
  },
  {
    client: "Propecare",
    label: "Renewable Energy · Client",
    quote:
      "The new Propecare website gives our renewable-energy work a clearer digital presence. The service structure, project visuals, and responsive experience make it much easier for visitors to understand our capabilities and explore what we deliver.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials">
      <SectionHeader title="Client Testimonials" />
      <Shell className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.client}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="group flex min-h-[280px] flex-col rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--soft)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="font-serif text-xl text-[var(--fg)]">
                    {testimonial.client}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--soft)]">
                    {testimonial.label}
                  </p>
                </div>
                <Quote className="size-6 text-[var(--soft)] transition-colors group-hover:text-[var(--fg)]" />
              </div>

              <p className="text-[12px] leading-[1.75] text-[var(--muted)]">
                “{testimonial.quote}”
              </p>

              <div className="mt-auto pt-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-400">
                  Client feedback
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </Shell>
    </section>
  );
}
