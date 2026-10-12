import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight, BookOpen, BriefcaseBusiness, CheckCircle2, Code2, FileText,
  Github, GraduationCap, House, Layers3, Linkedin, Mail, MapPin, Menu, Moon,
  Sparkles, Sun, Search, X
} from "lucide-react";
import { site } from "@/config/site";

type View = "Overview" | "Projects" | "Experience" | "Skills" | "Education" | "Writing" | "Contact";
type NavItem = { label: View; icon: LucideIcon };

const navigation: NavItem[] = [
  { label: "Overview", icon: House },
  { label: "Projects", icon: Layers3 },
  { label: "Experience", icon: BriefcaseBusiness },
  { label: "Skills", icon: Code2 },
  { label: "Education", icon: GraduationCap },
  { label: "Writing", icon: BookOpen },
  { label: "Contact", icon: Mail },
];

const profileImage = "/profile.jpeg";

function SectionHeading({ kicker, title, detail, dark }: { kicker: string; title: string; detail?: string; dark: boolean }) {
  return (
    <div className="mb-6">
      <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[.22em] ${dark ? "text-blue-300" : "text-blue-700"}`}>{kicker}</p>
      <h2 className={`text-2xl font-semibold tracking-[-.04em] sm:text-[30px] ${dark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {detail && <p className={`mt-2 max-w-2xl text-sm leading-6 ${dark ? "text-slate-400" : "text-slate-500"}`}>{detail}</p>}
    </div>
  );
}

function ProjectTile({ project, dark }: { project: (typeof site.projects)[number]; dark: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-2xl border transition duration-200 hover:-translate-y-1 ${dark ? "border-white/10 bg-white/[.035] hover:border-blue-300/30 hover:bg-white/[.06]" : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-[0_14px_45px_rgba(24,52,100,.08)]"}`}>
      {project.image && (
        <div className={`h-36 overflow-hidden border-b ${dark ? "border-white/10 bg-slate-900" : "border-slate-100 bg-slate-50"}`}>
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" onError={(e) => { e.currentTarget.style.display = "none"; }} />
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className={`text-[15px] font-semibold tracking-tight ${dark ? "text-slate-100" : "text-slate-900"}`}>{project.title}</h3>
            <p className={`mt-1 text-[10px] uppercase tracking-[.18em] ${dark ? "text-slate-500" : "text-slate-400"}`}>{project.year}</p>
          </div>
          {project.featured && <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${dark ? "bg-blue-400/10 text-blue-200" : "bg-blue-50 text-blue-700"}`}>Featured</span>}
        </div>
        <p className={`line-clamp-3 text-[12px] leading-5 ${dark ? "text-slate-400" : "text-slate-500"}`}>{project.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{project.stack.slice(0, 4).map((tech) => <span key={tech} className={`rounded-md px-2 py-1 text-[10px] ${dark ? "bg-white/[.06] text-slate-300" : "bg-slate-100 text-slate-600"}`}>{tech}</span>)}</div>
        <div className={`mt-4 flex items-center gap-4 border-t pt-3 ${dark ? "border-white/10" : "border-slate-100"}`}>
          {project.links.source && <a href={project.links.source} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 text-xs transition hover:text-blue-500 ${dark ? "text-slate-300" : "text-slate-600"}`}>Source <ArrowUpRight size={13} /></a>}
          {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 text-xs transition hover:text-blue-500 ${dark ? "text-slate-300" : "text-slate-600"}`}>Live project <ArrowUpRight size={13} /></a>}
        </div>
      </div>
    </article>
  );
}

export function ProfileDashboard() {
  const [view, setView] = useState<View>("Overview");
  const [dark, setDark] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [projectQuery, setProjectQuery] = useState("");
  const [projectCategory, setProjectCategory] = useState("All");
  const featured = site.projects.filter((project) => project.featured).slice(0, 4);
  const filteredProjects = site.projects.filter((project) => {
    const query = projectQuery.trim().toLowerCase();
    const matchesQuery = !query || [project.title, project.blurb, project.stack.join(" ")].join(" ").toLowerCase().includes(query);
    const matchesCategory =
      projectCategory === "All" ||
      project.categories?.includes(projectCategory as "AI" | "Frontend" | "Backend" | "Fullstack") ||
      (projectCategory === "Client work" && project.year === "Client");
    return matchesQuery && Boolean(matchesCategory);
  });
  const muted = dark ? "text-slate-400" : "text-slate-500";
  const panel = dark ? "border-white/10 bg-white/[.035]" : "border-slate-200 bg-white";
  const titleText = dark ? "text-white" : "text-slate-950";

  const chooseView = (next: View) => { setView(next); setMobileNav(false); };

  const sidebar = (
    <aside className={`flex h-full w-[258px] shrink-0 flex-col border-r ${dark ? "border-white/10 bg-[#10131a] text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}>
      <div className="flex items-center gap-3 px-5 pb-6 pt-7">
        <div className={`grid h-9 w-9 place-items-center rounded-xl ${dark ? "bg-blue-400 text-slate-950" : "bg-slate-950 text-white"}`}><Sparkles size={17} /></div>
        <div><p className="text-[15px] font-semibold tracking-tight">Aravindh<span className="text-blue-500">.</span></p><p className={`mt-0.5 text-[9px] font-medium uppercase tracking-[.2em] ${muted}`}>Personal workspace</p></div>
        <button onClick={() => setMobileNav(false)} aria-label="Close navigation" className="ml-auto rounded-lg p-1.5 md:hidden"><X size={17} /></button>
      </div>

      <div className={`mx-3 mb-6 rounded-2xl border p-3.5 ${dark ? "border-white/10 bg-white/[.035]" : "border-slate-200 bg-slate-50/80"}`}>
        <div className="flex items-center gap-3">
          <img src={profileImage} alt={site.name} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/profile2.jpeg"; }} className="h-11 w-11 rounded-xl object-cover" />
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{site.name}</p><p className={`mt-1 truncate text-[11px] ${muted}`}>{site.role}</p></div>
        </div>
        <div className={`mt-3 flex items-center gap-2 text-[10px] ${muted}`}><MapPin size={12} /> {site.location}</div>
        <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] ${dark ? "bg-emerald-300/10 text-emerald-200" : "bg-emerald-50 text-emerald-700"}`}><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {site.status.availableText}</div>
      </div>

      <div className="px-4">
        <p className={`mb-2 px-2 text-[9px] font-semibold uppercase tracking-[.22em] ${muted}`}>Workspace</p>
        <nav className="space-y-1" aria-label="Portfolio sections">
          {navigation.map(({ label, icon: Icon }) => {
            const active = view === label;
            return <button key={label} onClick={() => chooseView(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-medium transition ${active ? (dark ? "bg-blue-400/15 text-blue-200" : "bg-blue-50 text-blue-800") : (dark ? "text-slate-400 hover:bg-white/[.05] hover:text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}`}><Icon size={16} strokeWidth={active ? 2.2 : 1.8} /><span>{label}</span>{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />}</button>;
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <a href="/chat" className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-xs font-medium transition ${dark ? "border-white/10 text-slate-300 hover:bg-white/[.05]" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}><Sparkles size={15} className="text-blue-500" /><span>Ask my portfolio assistant</span><ArrowUpRight size={13} className="ml-auto" /></a>
        <div className={`mt-4 flex items-center justify-between border-t pt-4 ${dark ? "border-white/10" : "border-slate-100"}`}>
          <span className={`text-[10px] ${muted}`}>Designed & built by Aravindh</span>
          <div className="flex items-center gap-1">
            <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={`rounded-lg p-1.5 ${muted} hover:text-blue-500`}><Github size={14} /></a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`rounded-lg p-1.5 ${muted} hover:text-blue-500`}><Linkedin size={14} /></a>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className={`min-h-screen transition-colors md:flex ${dark ? "bg-[#0c0f15] text-slate-100" : "bg-[#f7f9fc] text-slate-900"}`}>
      <div className="sticky top-0 hidden h-screen md:block">{sidebar}</div>
      {mobileNav && <div className="fixed inset-0 z-50 md:hidden"><button aria-label="Close navigation overlay" className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setMobileNav(false)} /><div className="relative z-10 h-full w-[min(84vw,300px)] shadow-2xl">{sidebar}</div></div>}

      <div className="min-w-0 flex-1">
        <header className={`sticky top-0 z-20 flex h-[62px] items-center justify-between border-b px-4 backdrop-blur-xl sm:px-7 lg:px-10 ${dark ? "border-white/10 bg-[#0c0f15]/90" : "border-slate-200/80 bg-[#f7f9fc]/90"}`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileNav(true)} aria-label="Open navigation" className={`rounded-lg p-2 md:hidden ${muted}`}><Menu size={18} /></button>
            <div className={`flex items-center gap-2 text-[11px] ${muted}`}><span>Portfolio</span><span className={dark ? "text-slate-600" : "text-slate-300"}>/</span><span className={`font-semibold ${titleText}`}>{view}</span></div>
          </div>
          <div className="flex items-center gap-2">
            <a href={site.socials.resume} target="_blank" rel="noreferrer" className={`hidden items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-medium transition sm:inline-flex ${dark ? "border-white/10 text-slate-300 hover:bg-white/[.05]" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}><FileText size={14} /> Resume <ArrowUpRight size={12} /></a>
            <button onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className={`rounded-lg border p-2 transition ${dark ? "border-white/10 text-slate-300 hover:bg-white/[.05]" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1240px] px-4 pb-14 pt-7 sm:px-7 sm:pt-9 lg:px-10 lg:pt-11">
          {view === "Overview" && <>
            <section className={`relative overflow-hidden rounded-[26px] border p-6 sm:p-9 lg:p-11 ${dark ? "border-white/10 bg-[#111722]" : "border-slate-200 bg-white"}`}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: dark ? "radial-gradient(circle at 85% 15%, rgba(39,117,255,.2), transparent 28%), radial-gradient(circle at 12% 110%, rgba(39,117,255,.08), transparent 35%)" : "radial-gradient(circle at 90% 10%, rgba(59,130,246,.10), transparent 28%), radial-gradient(circle at 2% 100%, rgba(147,197,253,.14), transparent 30%)" }} />
              <div aria-hidden="true" className={`absolute inset-0 opacity-[.10] ${dark ? "" : ""}`} style={{ backgroundImage: "radial-gradient(currentColor 0.7px, transparent 0.7px)", backgroundSize: "18px 18px", maskImage: "linear-gradient(90deg, transparent, black)" }} />
              <div className="relative max-w-3xl">
                <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium ${dark ? "border-blue-300/20 bg-blue-300/10 text-blue-200" : "border-blue-200 bg-blue-50 text-blue-800"}`}><Sparkles size={12} /> FULL STACK & AI ENGINEER</div>
                <h1 className={`max-w-3xl text-[38px] font-semibold leading-[1.08] tracking-[-.055em] sm:text-5xl lg:text-[58px] ${titleText}`}>I build products that turn <span className={dark ? "text-blue-300" : "text-blue-700"}>complex ideas</span> into useful systems.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-7 sm:text-[15px] ${muted}`}>{site.tagline}</p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button onClick={() => chooseView("Projects")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition hover:-translate-y-0.5 ${dark ? "bg-blue-400 text-slate-950 hover:bg-blue-300" : "bg-blue-700 text-white hover:bg-blue-800"}`}>Explore projects <ArrowUpRight size={14} /></button>
                  <button onClick={() => chooseView("Contact")} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold transition ${dark ? "border-white/10 text-slate-200 hover:bg-white/[.05]" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}>Get in touch <Mail size={14} /></button>
                </div>
              </div>
              <div className={`relative mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t pt-5 text-[11px] ${dark ? "border-white/10 text-slate-400" : "border-slate-100 text-slate-500"}`}><span className="inline-flex items-center gap-1.5"><MapPin size={12} /> {site.location}</span><span className="inline-flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> {site.status.availableText}</span><span className="inline-flex items-center gap-1.5"><Code2 size={12} /> Full product lifecycle</span></div>
            </section>

            <section className="mt-10">
              <SectionHeading kicker="A quick introduction" title="What I work on" detail="A practical mix of product engineering, AI systems, and the infrastructure needed to ship them." dark={dark} />
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Layers3, label: "Full-stack products", copy: "From thoughtful UI to APIs, databases, and deployment." },
                  { icon: Sparkles, label: "AI & agent systems", copy: "LLM integrations, retrieval, tool use, and workflow automation." },
                  { icon: CheckCircle2, label: "Production-minded", copy: "Clear boundaries, maintainable code, and reliable delivery." },
                ].map(({ icon: Icon, label, copy }) => <div key={label} className={`rounded-2xl border p-5 ${panel}`}><div className={`mb-5 grid h-9 w-9 place-items-center rounded-xl ${dark ? "bg-blue-400/10 text-blue-200" : "bg-blue-50 text-blue-700"}`}><Icon size={17} /></div><h3 className={`text-sm font-semibold ${titleText}`}>{label}</h3><p className={`mt-2 text-xs leading-5 ${muted}`}>{copy}</p></div>)}
              </div>
            </section>

            <section className="mt-11">
              <div className="mb-5 flex items-end justify-between gap-3"><SectionHeading kicker="Selected work" title="Projects worth exploring" detail="A few projects that show how I approach real engineering problems." dark={dark} /><button onClick={() => chooseView("Projects")} className={`mb-7 inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold hover:text-blue-500 ${muted}`}>All projects <ArrowUpRight size={13} /></button></div>
              <div className="grid gap-4 md:grid-cols-2">{featured.map((project) => <ProjectTile key={project.title} project={project} dark={dark} />)}</div>
            </section>

            <section className="mt-11">
              <div className="mb-5 flex items-end justify-between gap-3"><SectionHeading kicker="Career" title="Experience" detail="Building and shipping software with cross-functional teams." dark={dark} /><button onClick={() => chooseView("Experience")} className={`mb-7 inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold hover:text-blue-500 ${muted}`}>Full history <ArrowUpRight size={13} /></button></div>
              <div className={`divide-y rounded-2xl border ${panel} ${dark ? "divide-white/10" : "divide-slate-100"}`}>{site.experience.slice(0, 2).map((job) => <div key={job.company} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:justify-between"><div><p className={`text-sm font-semibold ${titleText}`}>{job.role}</p><p className={`mt-1 text-xs ${muted}`}>{job.company}</p>{job.bullets?.[0] && <p className={`mt-3 max-w-2xl text-xs leading-5 ${muted}`}>{job.bullets[0]}</p>}</div><span className={`shrink-0 text-[10px] ${muted}`}>{job.period}</span></div>)}</div>
            </section>

            <section className={`mt-11 flex flex-col items-start justify-between gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center sm:p-7 ${dark ? "border-blue-300/15 bg-blue-300/[.05]" : "border-blue-100 bg-blue-50/60"}`}><div><p className={`text-[10px] font-semibold uppercase tracking-[.2em] ${dark ? "text-blue-200" : "text-blue-800"}`}>Have something in mind?</p><h2 className={`mt-2 text-xl font-semibold tracking-tight ${titleText}`}>Let’s build something useful.</h2><p className={`mt-1 text-xs ${muted}`}>Open to thoughtful teams, challenging problems, and collaborations.</p></div><button onClick={() => chooseView("Contact")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold ${dark ? "bg-white text-slate-950" : "bg-slate-950 text-white"}`}>Connect with me <ArrowUpRight size={14} /></button></section>
          </>}

          {view === "Projects" && <>
            <SectionHeading kicker="Selected and ongoing work" title="Projects" detail="Products, experiments, and systems across AI, full-stack engineering, and developer tooling." dark={dark} />
            <div className="mb-5 space-y-3">
              <label className={`flex max-w-xl items-center gap-2.5 rounded-xl border px-3.5 py-3 ${dark ? "border-white/10 bg-white/[.035] focus-within:border-blue-300/40" : "border-slate-200 bg-white focus-within:border-blue-300"}`}>
                <Search size={15} className={muted} />
                <input value={projectQuery} onChange={(event) => setProjectQuery(event.target.value)} placeholder="Search projects or technologies..." aria-label="Search projects or technologies" className={`w-full bg-transparent text-xs outline-none placeholder:opacity-60 ${titleText}`} />
                {projectQuery && <button type="button" onClick={() => setProjectQuery("")} aria-label="Clear project search" className={muted}><X size={14} /></button>}
              </label>
              <div className="flex flex-wrap gap-2">
                {["All", "AI", "Fullstack", "Backend", "Frontend", "Client work"].map((category) => <button key={category} type="button" onClick={() => setProjectCategory(category)} className={`rounded-lg border px-3 py-2 text-[10px] font-medium transition ${projectCategory === category ? (dark ? "border-blue-300/20 bg-blue-300/10 text-blue-200" : "border-blue-200 bg-blue-50 text-blue-800") : (dark ? "border-white/10 text-slate-400 hover:bg-white/[.05]" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50")}`}>{category}</button>)}
              </div>
              <p className={`pt-1 text-[10px] ${muted}`}>{filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} {projectQuery || projectCategory !== "All" ? "match your filters" : "in the portfolio"}</p>
            </div>
            {filteredProjects.length > 0 ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">{filteredProjects.map((project) => <ProjectTile key={project.title} project={project} dark={dark} />)}</div> : <div className={`rounded-2xl border border-dashed p-9 text-center ${panel}`}><Search size={20} className={`mx-auto mb-3 ${muted}`} /><p className={`text-sm font-semibold ${titleText}`}>No matching projects</p><p className={`mt-1 text-xs ${muted}`}>Try another keyword or clear the category filter.</p><button onClick={() => { setProjectQuery(""); setProjectCategory("All"); }} className={`mt-4 text-xs font-semibold ${dark ? "text-blue-200" : "text-blue-700"}`}>Clear filters</button></div>}
          </>}

          {view === "Experience" && <>
            <SectionHeading kicker="Where I've worked" title="Experience" detail="Roles, responsibilities, and the engineering work behind each chapter." dark={dark} />
            <div className={`relative rounded-2xl border p-2 sm:p-5 ${panel}`}><div className={`absolute bottom-8 left-[31px] top-8 w-px sm:left-[47px] ${dark ? "bg-white/10" : "bg-slate-200"}`} />{site.experience.map((job) => <article key={job.company} className="relative flex gap-4 p-4 sm:gap-6 sm:p-6"><div className={`z-10 mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${dark ? "border-blue-300/20 bg-[#151d2b] text-blue-200" : "border-blue-100 bg-blue-50 text-blue-700"}`}><BriefcaseBusiness size={14} /></div><div className="min-w-0 flex-1"><div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div><h3 className={`text-sm font-semibold ${titleText}`}>{job.role}</h3><p className={`mt-1 text-xs ${dark ? "text-blue-200" : "text-blue-700"}`}>{job.company}</p></div><span className={`text-[10px] ${muted}`}>{job.period}</span></div>{job.bullets && <ul className={`mt-4 space-y-2 text-xs leading-6 ${muted}`}>{job.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500" /><span>{bullet}</span></li>)}</ul>}</div></article>)}</div>
          </>}

          {view === "Skills" && <>
            <SectionHeading kicker="Tools I reach for" title="Skills & technologies" detail="The stack is selected around the problem—not the other way around." dark={dark} />
            <div className="grid gap-4 md:grid-cols-2">{[
              { title: "Frontend", description: "Building polished, accessible product interfaces.", skills: ["TypeScript", "JavaScript", "React", "React Native", "Next.js", "Tailwind CSS"] },
              { title: "Backend & data", description: "APIs, data models, integrations, and service boundaries.", skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Qdrant"] },
              { title: "AI engineering", description: "Grounded retrieval, agent workflows, and model integration.", skills: ["LLMs", "RAG", "LoRA / PEFT", "Transformers", "MCP", "Multi-Agent Systems", "PyTorch"] },
              { title: "Cloud & delivery", description: "Shipping, deploying, and operating modern applications.", skills: ["Docker", "Kubernetes", "AWS", "GCP", "Git", "GitHub", "Vercel"] },
            ].map((group) => <div key={group.title} className={`rounded-2xl border p-5 ${panel}`}><h3 className={`text-sm font-semibold ${titleText}`}>{group.title}</h3><p className={`mt-1 text-xs ${muted}`}>{group.description}</p><div className="mt-4 flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className={`rounded-lg border px-2.5 py-1.5 text-[11px] ${dark ? "border-white/10 bg-white/[.03] text-slate-300" : "border-slate-200 bg-slate-50 text-slate-600"}`}>{skill}</span>)}</div></div>)}</div>
          </>}

          {view === "Education" && <>
            <SectionHeading kicker="Learning foundation" title="Education" detail="Academic background and ongoing technical exploration." dark={dark} />
            <div className={`rounded-2xl border p-6 sm:p-8 ${panel}`}>{site.education.map((education) => <div key={education.institution} className="flex gap-4"><div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${dark ? "bg-blue-400/10 text-blue-200" : "bg-blue-50 text-blue-700"}`}><GraduationCap size={20} /></div><div><p className={`text-base font-semibold ${titleText}`}>{education.degree} · {education.field}</p><p className={`mt-2 text-sm ${muted}`}>{education.institution}</p><p className={`mt-1 text-xs ${muted}`}>{education.location}</p><span className={`mt-4 inline-flex rounded-full px-3 py-1 text-[10px] ${dark ? "bg-white/[.06] text-slate-300" : "bg-slate-100 text-slate-600"}`}>{education.period}</span></div></div>)}</div>
          </>}

          {view === "Writing" && <>
            <SectionHeading kicker="Notes & ideas" title="Writing" detail="Technical notes, architecture explorations, and lessons from building software." dark={dark} />
            {site.writing.length > 0 ? <div className="grid gap-4 md:grid-cols-2">{site.writing.map((post) => <a key={post.url} href={post.url} target="_blank" rel="noreferrer" className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 ${panel}`}><p className={`text-sm font-semibold ${titleText}`}>{post.title}</p><p className={`mt-2 text-xs leading-5 ${muted}`}>{post.summary}</p><span className={`mt-4 inline-flex items-center gap-1 text-xs ${dark ? "text-blue-200" : "text-blue-700"}`}>Read article <ArrowUpRight size={13} /></span></a>)}</div> : <div className={`rounded-2xl border p-7 sm:p-9 ${panel}`}><div className={`mb-4 grid h-10 w-10 place-items-center rounded-xl ${dark ? "bg-blue-400/10 text-blue-200" : "bg-blue-50 text-blue-700"}`}><BookOpen size={18} /></div><h3 className={`text-lg font-semibold ${titleText}`}>Follow my technical writing</h3><p className={`mt-2 max-w-xl text-sm leading-6 ${muted}`}>Explore articles and engineering notes on Medium. This section can be connected to a live writing feed later.</p><a href={site.socials.medium} target="_blank" rel="noreferrer" className={`mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold ${dark ? "bg-blue-400 text-slate-950" : "bg-blue-700 text-white"}`}>Open Medium <ArrowUpRight size={14} /></a></div>}
          </>}

          {view === "Contact" && <>
            <SectionHeading kicker="Start a conversation" title="Let's connect" detail="Have a project, opportunity, or interesting engineering problem in mind? Reach out." dark={dark} />
            <div className="grid gap-3 md:grid-cols-2">{[
              { label: "Email", detail: site.email, href: site.socials.email, icon: Mail },
              { label: "LinkedIn", detail: "Professional network", href: site.socials.linkedin, icon: Linkedin },
              { label: "GitHub", detail: "Projects and open source", href: site.socials.github, icon: Github },
              { label: "Google Scholar", detail: "Research and publications", href: site.socials.googleScholar, icon: GraduationCap },
            ].map(({ label, detail, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"} className={`flex items-center gap-4 rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-blue-300 ${panel}`}><div className={`grid h-10 w-10 place-items-center rounded-xl ${dark ? "bg-white/[.06] text-blue-200" : "bg-slate-100 text-slate-700"}`}><Icon size={18} /></div><div className="min-w-0 flex-1"><p className={`text-sm font-semibold ${titleText}`}>{label}</p><p className={`mt-1 truncate text-xs ${muted}`}>{detail}</p></div><ArrowUpRight size={15} className={muted} /></a>)}</div>
            <div className={`mt-5 rounded-2xl border p-5 ${panel}`}><p className={`text-sm font-semibold ${titleText}`}>Prefer to schedule a chat?</p><p className={`mt-1 text-xs ${muted}`}>Pick a convenient time on my calendar.</p><a href={site.socials.booking} target="_blank" rel="noreferrer" className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold ${dark ? "text-blue-200" : "text-blue-700"}`}>Book a call <ArrowUpRight size={14} /></a></div>
          </>}

          <footer className={`mt-12 flex flex-col gap-2 border-t pt-5 text-[10px] sm:flex-row sm:items-center sm:justify-between ${dark ? "border-white/10 text-slate-500" : "border-slate-200 text-slate-400"}`}><span>© {new Date().getFullYear()} {site.name}. Built with care.</span><span className="flex items-center gap-3"><a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:text-blue-500">GitHub</a><a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-500">LinkedIn</a><a href={site.socials.medium} target="_blank" rel="noreferrer" className="hover:text-blue-500">Writing</a></span></footer>
        </main>
      </div>
    </div>
  );
}
