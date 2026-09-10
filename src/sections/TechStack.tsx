import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { Icon } from "@iconify/react";

const CATEGORY_ICONS: Record<string, string> = {
  All: "lucide:layers",
  "AI & ML": "lucide:brain-circuit",
  Languages: "lucide:code-2",
  Frontend: "lucide:layout",
  Backend: "lucide:server",
  Databases: "lucide:database",
  "DevOps & Tools": "lucide:terminal",
};

const SKILL_ICONS: Record<string, string> = {
  TypeScript: "logos:typescript-icon",
  JavaScript: "logos:javascript",
  Python: "logos:python",
  "C++": "logos:c-plusplus",
  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  "Tailwind CSS": "logos:tailwindcss-icon",
  "Shadcn UI": "simple-icons:shadcnui",
  "Node.js": "logos:nodejs-icon",
  "Express.js": "logos:express",
  FastAPI: "logos:fastapi-icon",
  PostgreSQL: "logos:postgresql",
  MongoDB: "logos:mongodb-icon",
  Redis: "logos:redis",
  Qdrant: "simple-icons:qdrant",
  Prisma: "logos:prisma",
  "Drizzle ORM": "simple-icons:drizzle",
  Supabase: "logos:supabase-icon",
  Firebase: "logos:firebase",
  Docker: "logos:docker-icon",
  Kubernetes: "logos:kubernetes",
  Git: "logos:git-icon",
  GitHub: "logos:github-icon",
  Postman: "logos:postman-icon",
  Vercel: "logos:vercel-icon",
  Figma: "logos:figma",
  "Hugging Face": "simple-icons:huggingface",
  Ollama: "simple-icons:ollama",
  Gradio: "simple-icons:gradio",
  JWT: "logos:jwt-icon",
  RAG: "lucide:database-zap",
  LoRA: "lucide:brain",
  Transformers: "lucide:network",
  MCP: "lucide:workflow",
  "AI Security": "lucide:shield-check",
  "Active Learning": "lucide:activity",
  "Vector Search": "lucide:search-code",
  "REST APIs": "lucide:waypoints",
  RBAC: "lucide:key-round",
  "CI/CD": "lucide:git-branch",
};

const skillCategories: Record<string, string[]> = {
  "AI & ML": [
    "Python",
    "RAG",
    "LoRA",
    "Transformers",
    "Vector Search",
    "Hugging Face",
    "Ollama",
    "Gradio",
    "MCP",
    "AI Security",
    "Active Learning",
  ],
  Languages: ["TypeScript", "JavaScript", "Python", "C++"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Shadcn UI", "Figma"],
  Backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "RBAC", "JWT"],
  Databases: [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Qdrant",
    "Drizzle ORM",
    "Prisma",
    "Supabase",
    "Firebase",
  ],
  "DevOps & Tools": ["Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "Postman", "Vercel"],
};

const categories = [
  "All",
  "AI & ML",
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "DevOps & Tools",
];

const allSkills = Array.from(new Set(Object.values(skillCategories).flat()));

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills =
    activeCategory === "All" ? allSkills : skillCategories[activeCategory] ?? [];

  return (
    <div id="skills">
      <SectionHeader
        title="Skills & Tech Stack"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            AI · product · infrastructure
          </span>
        }
      />

      <Shell className="px-6 py-6 sm:px-8">
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--line)] bg-[var(--card)] p-3.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--soft)]">Primary Focus</p>
            <p className="mt-1 text-[13px] font-medium text-[var(--fg)]">Full Stack AI Engineering</p>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-[var(--card)] p-3.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--soft)]">AI Systems</p>
            <p className="mt-1 text-[13px] font-medium text-[var(--fg)]">LLMs · RAG · Agents · Retrieval</p>
          </div>
          <div className="rounded-lg border border-[var(--line)] bg-[var(--card)] p-3.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--soft)]">Production</p>
            <p className="mt-1 text-[13px] font-medium text-[var(--fg)]">APIs · Data · DevOps · CI/CD</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
          {categories.map((cat) => {
            const iconName = CATEGORY_ICONS[cat] || "lucide:layers";
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                    : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"
                }`}
              >
                <Icon icon={iconName} width={14} height={14} className="size-3.5" />
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-6 flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const iconName = SKILL_ICONS[skill] || "lucide:code-2";
              const monochrome = [
                "simple-icons:shadcnui",
                "simple-icons:qdrant",
                "simple-icons:drizzle",
                "simple-icons:huggingface",
                "simple-icons:ollama",
                "simple-icons:gradio",
              ].includes(iconName);

              return (
                <motion.span
                  key={skill}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                  className="group flex cursor-default items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                >
                  <Icon
                    icon={iconName}
                    width={16}
                    height={16}
                    className={`size-4 shrink-0 transition-colors ${monochrome ? "text-current" : ""} group-hover:filter group-hover:brightness-110`}
                  />
                  {skill}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Shell>
    </div>
  );
}

export default TechStack;
