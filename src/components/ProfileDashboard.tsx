import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight, BookOpen, BriefcaseBusiness, CheckCircle2, Code2, FileText,
  Github, GraduationCap, House, Layers3, Linkedin, Mail, MapPin, Menu,
  Moon, Sparkles, Sun, Search, X
} from "lucide-react";
import { site } from "@/config/site";

type View = "Overview" | "Projects" | "Experience" | "Research" | "Skills" | "Education" | "Writing" | "Contact";
type NavItem = { label: View; icon: LucideIcon };

const navigation: NavItem[] = [
  { label: "Overview", icon: House },
  { label: "Projects", icon: Layers3 },
  { label: "Experience", icon: BriefcaseBusiness },
  { label: "Research", icon: BookOpen },
  { label: "Skills", icon: Code2 },
  { label: "Education", icon: GraduationCap },
  { label: "Writing", icon: BookOpen },
  { label: "Contact", icon: Mail },
];

const categories = ["All", "AI", "Fullstack", "Backend", "Frontend", "Client work"];
const profileImage = "/profile.jpeg";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function SectionHeading({
  kicker,
  title,
  detail,
  dark,
}: {
  kicker: string;
  title: string;
  detail?: string;
  dark: boolean;
}) {
  return (
    <div className="mb-5">
      <p className={cx("mb-2 text-[10px] font-semibold uppercase tracking-[.2em]", dark ? "text-cyan-300" : "text-cyan-800")}>{kicker}</p>
      <h2 className={cx("text-2xl font-semibold tracking-[-.04em] sm:text-[29px]", dark ? "text-white" : "text-slate-950")}>{title}</h2>
      {detail && <p className={cx("mt-2 max-w-2xl text-sm leading-6", dark ? "text-slate-400" : "text-slate-500")}>{detail}</p>}
    </div>
  );
}

function ProjectTile({ project, dark }: { project: (typeof site.projects)[number]; dark: boolean }) {
  return (
    <article className={cx(
      "group overflow-hidden rounded-2xl border transition duration-200 hover:-translate-y-0.5",
      dark ? "border-white/10 bg-white/[.035] hover:border-cyan-300/30 hover:bg-white/[.055]" : "border-slate-200/90 bg-white hover:border-cyan-200 hover:shadow-[0_12px_36px_rgba(70,86,214,.08)]"
    )}>
      {project.image && (
        <div className={cx("h-36 overflow-hidden border-b", dark ? "border-white/10 bg-slate-900" : "border-slate-100 bg-slate-50")}>
          <img
            src={project.image}
            alt={project.title + " preview"}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            onError={(event) => { event.currentTarget.style.display = "none"; }}
          />
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className={cx("text-[15px] font-semibold tracking-tight", dark ? "text-slate-100" : "text-slate-900")}>{project.title}</h3>
            <p className={cx("mt-1 text-[10px] uppercase tracking-[.16em]", dark ? "text-slate-500" : "text-slate-400")}>{project.year}</p>
          </div>
          {project.featured && <span className={cx("shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-cyan-50 text-cyan-800")}>Featured</span>}
        </div>
        <p className={cx("line-clamp-3 text-[12px] leading-5", dark ? "text-slate-400" : "text-slate-500")}>{project.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => <span key={tech} className={cx("rounded-md px-2 py-1 text-[10px]", dark ? "bg-white/[.06] text-slate-300" : "bg-slate-100 text-slate-600")}>{tech}</span>)}
        </div>
        {(project.links.source || project.links.live) && (
          <div className={cx("mt-4 flex items-center gap-4 border-t pt-3", dark ? "border-white/10" : "border-slate-100")}>
            {project.links.source && <a href={project.links.source} target="_blank" rel="noreferrer" className={cx("inline-flex items-center gap-1.5 text-xs transition hover:text-cyan-600", dark ? "text-slate-300" : "text-slate-600")}>Source <ArrowUpRight size={13} /></a>}
            {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className={cx("inline-flex items-center gap-1.5 text-xs transition hover:text-cyan-600", dark ? "text-slate-300" : "text-slate-600")}>Live project <ArrowUpRight size={13} /></a>}
          </div>
        )}
      </div>
    </article>
  );
}

function WritingTile({ post, index, dark }: { post: (typeof site.writing)[number]; index: number; dark: boolean }) {
  return (
    <a key={post.url} href={post.url} target="_blank" rel="noreferrer" className={cx(
      "group rounded-2xl border p-5 transition hover:-translate-y-0.5",
      dark ? "border-white/10 bg-white/[.035] hover:border-cyan-300/30" : "border-slate-200/90 bg-white hover:border-cyan-200 hover:shadow-[0_10px_30px_rgba(70,86,214,.06)]"
    )}>
      <div className={cx("mb-3 flex items-center gap-2 text-[10px]", dark ? "text-slate-500" : "text-slate-400")}><BookOpen size={13} /><span>{post.date}</span><span>·</span><span>{post.readingTime ?? "Article"}</span><span className="ml-auto">{String(index + 1).padStart(2, "0")}</span></div>
      <h3 className={cx("text-sm font-semibold leading-6", dark ? "text-slate-100" : "text-slate-900")}>{post.title}</h3>
      <p className={cx("mt-2 line-clamp-2 text-xs leading-5", dark ? "text-slate-400" : "text-slate-500")}>{post.summary}</p>
      <span className={cx("mt-4 inline-flex items-center gap-1 text-xs font-medium", dark ? "text-cyan-200" : "text-cyan-800")}>Read article <ArrowUpRight size={12} /></span>
    </a>
  );
}

export function ProfileDashboard() {
  const [view, setView] = useState<View>("Overview");
  const [dark, setDark] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [projectQuery, setProjectQuery] = useState("");
  const [projectCategory, setProjectCategory] = useState("All");
  const [quickFindOpen, setQuickFindOpen] = useState(false);
  const [quickFindQuery, setQuickFindQuery] = useState("");
  const quickFindInputRef = useRef<HTMLInputElement>(null);
  const featured = site.projects.filter((project) => project.featured).slice(0, 4);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuickFindOpen((open) => !open);
      }
      if (event.key === "Escape") setQuickFindOpen(false);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (quickFindOpen) quickFindInputRef.current?.focus();
    else setQuickFindQuery("");
  }, [quickFindOpen]);

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
  const titleText = dark ? "text-white" : "text-slate-950";
  const panel = dark ? "border-white/10 bg-white/[.035]" : "border-slate-200/90 bg-white";
  const divider = dark ? "border-white/10" : "border-slate-200/80";

  const chooseView = (next: View) => {
    setView(next);
    setMobileNav(false);
    setQuickFindOpen(false);
  };

  const quickFindTerm = quickFindQuery.trim().toLowerCase();
  const quickFindSections = navigation.filter((item) => item.label.toLowerCase().includes(quickFindTerm));
  const quickFindProjects = (quickFindTerm
    ? site.projects.filter((project) => [project.title, project.blurb, project.stack.join(" ")].join(" ").toLowerCase().includes(quickFindTerm))
    : site.projects.filter((project) => project.featured)
  ).slice(0, 5);

  const openProjectFromQuickFind = (projectTitle: string) => {
    setProjectQuery(projectTitle);
    setProjectCategory("All");
    setView("Projects");
    setMobileNav(false);
    setQuickFindOpen(false);
  };

  const sidebar = (
    <aside className={cx(
      "flex h-full w-[248px] shrink-0 flex-col border-r",
      dark ? "border-[#27272a] bg-[#101014] text-slate-100" : "border-[#e8e8eb] bg-[#ffffff] text-slate-900"
    )}>
      <div className="flex items-center justify-end px-3 pt-3 md:hidden">
        <button onClick={() => setMobileNav(false)} aria-label="Close navigation" className="rounded-lg p-1.5 text-slate-500"><X size={17} /></button>
      </div>

      <div className="px-4 pb-5">
        <div className={cx("rounded-xl border p-3", dark ? "border-white/10 bg-white/[.025]" : "border-[#e8e8eb] bg-white")}>
          <div className="flex items-center gap-3">
            <img
              src={profileImage}
              alt={site.name}
              onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/profile2.jpeg"; }}
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-black/5"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">{site.name}</p>
              <p className={cx("mt-1 text-[10px] leading-4", muted)}>{site.role}</p>
              <p className={cx("mt-1 line-clamp-1 text-[10px] leading-4", muted)}>{site.tagline}</p>
            </div>
          </div>
          <div className={cx("mt-2 flex items-center gap-1.5 text-[10px]", muted)}><MapPin size={12} /> {site.location}</div>
          <div className={cx("mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px]", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-cyan-50 text-cyan-800")}>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> {site.status.availableText}
          </div>
        </div>
      </div>

      <div className="px-3 pt-1">
        <p className={cx("mb-2 px-3 text-[9px] font-semibold uppercase tracking-[.2em]", muted)}>Workspace</p>
        <nav className="space-y-1" aria-label="Portfolio sections">
          {navigation.map(({ label, icon: Icon }) => {
            const active = view === label;
            return (
              <button
                key={label}
                onClick={() => chooseView(label)}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-medium transition",
                  active
                    ? (dark ? "bg-white/[.07] text-white" : "bg-[#f2f2f5] text-[#24242a]")
                    : (dark ? "text-slate-400 hover:bg-white/[.05] hover:text-white" : "text-slate-500 hover:bg-[#f6f6f8] hover:text-slate-900")
                )}
              >
                <Icon size={16} strokeWidth={active ? 2.1 : 1.8} />
                <span>{label}</span>
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-600" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <a href="/chat" className={cx(
          "flex items-center gap-2 rounded-xl border px-3 py-3 text-[11px] font-medium transition",
          dark ? "border-white/10 bg-white/[.025] text-slate-300 hover:bg-white/[.06]" : "border-[#dce2ef] bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50/50"
        )}>
          <Sparkles size={15} className="text-cyan-600" /><span>Chat with my portfolio</span><ArrowUpRight size={13} className="ml-auto" />
        </a>
        <div className={cx("mt-4 flex items-center justify-between border-t pt-4", dark ? "border-white/10" : "border-[#e2e7f0]")}>
          <span className={cx("text-[9px]", muted)}>Built by Aravindh</span>
          <div className="flex items-center gap-1">
            <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={cx("rounded-lg p-1.5 transition hover:text-cyan-600", muted)}><Github size={14} /></a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={cx("rounded-lg p-1.5 transition hover:text-cyan-600", muted)}><Linkedin size={14} /></a>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className={cx("min-h-screen transition-colors md:flex", dark ? "bg-[#0b0b0e] text-slate-100" : "bg-[#fafafa] text-slate-900")}>
      <div className="sticky top-0 hidden h-screen md:block">{sidebar}</div>
      {mobileNav && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button aria-label="Close navigation overlay" className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setMobileNav(false)} />
          <div className="relative z-10 h-full w-[min(84vw,300px)] shadow-2xl">{sidebar}</div>
        </div>
      )}

      {quickFindOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-slate-950/40 px-4 pt-[12vh] backdrop-blur-[3px]"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setQuickFindOpen(false); }}
        >
          <section role="dialog" aria-modal="true" aria-label="Quick find" className={cx("w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl", dark ? "border-white/10 bg-[#111115] text-slate-100" : "border-slate-200 bg-white text-slate-900")}>
            <div className={cx("flex items-center gap-3 border-b px-4", divider)}>
              <Search size={17} className={muted} />
              <input
                ref={quickFindInputRef}
                value={quickFindQuery}
                onChange={(event) => setQuickFindQuery(event.target.value)}
                placeholder="Jump to a section or search projects..."
                aria-label="Search portfolio"
                className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
              />
              <button onClick={() => setQuickFindOpen(false)} className={cx("rounded-md border px-2 py-1 text-[10px]", divider, muted)} aria-label="Close quick find">ESC</button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              <p className={cx("px-2 pb-2 pt-1 text-[9px] font-semibold uppercase tracking-[.2em]", muted)}>Sections</p>
              {quickFindSections.length > 0 ? quickFindSections.map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => chooseView(label)} className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition", dark ? "text-slate-300 hover:bg-white/[.06]" : "text-slate-700 hover:bg-slate-50")}>
                  <Icon size={15} className={muted} /><span>{label}</span><ArrowUpRight size={12} className={cx("ml-auto", muted)} />
                </button>
              )) : <p className={cx("px-3 py-2 text-xs", muted)}>No matching sections</p>}
              <div className={cx("my-3 border-t", divider)} />
              <p className={cx("px-2 pb-2 text-[9px] font-semibold uppercase tracking-[.2em]", muted)}>{quickFindTerm ? "Matching projects" : "Featured projects"}</p>
              {quickFindProjects.length > 0 ? quickFindProjects.map((project) => (
                <button key={project.title} onClick={() => openProjectFromQuickFind(project.title)} className={cx("flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition", dark ? "hover:bg-white/[.06]" : "hover:bg-slate-50")}>
                  <span className={cx("mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-cyan-50 text-cyan-800")}><Code2 size={15} /></span>
                  <span className="min-w-0 flex-1"><span className={cx("block text-xs font-semibold", titleText)}>{project.title}</span><span className={cx("mt-1 line-clamp-2 block text-[10px] leading-4", muted)}>{project.blurb}</span></span>
                  <ArrowUpRight size={13} className={cx("mt-1 shrink-0", muted)} />
                </button>
              )) : <p className={cx("px-3 py-2 text-xs", muted)}>No projects found. Try React, Python, or RAG.</p>}
            </div>
            <div className={cx("flex items-center justify-between border-t px-4 py-3 text-[10px]", divider, dark ? "text-slate-500" : "text-slate-400")}><span>Quick navigation across the portfolio</span><span>Ctrl/⌘ K</span></div>
          </section>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className={cx(
          "sticky top-0 z-20 flex h-[62px] items-center justify-between border-b px-4 backdrop-blur-xl sm:px-7 lg:px-10",
          dark ? "border-white/10 bg-[#0b0f19]/90" : "border-slate-200/80 bg-white/90"
        )}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileNav(true)} aria-label="Open navigation" className={cx("rounded-lg p-2 md:hidden", muted)}><Menu size={18} /></button>
            <div className={cx("flex items-center gap-2 text-[11px]", muted)}><span>Portfolio</span><span className={dark ? "text-slate-600" : "text-slate-300"}>/</span><span className={cx("font-semibold", titleText)}>{view}</span></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setQuickFindOpen(true)} className={cx(
              "inline-flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] transition",
              dark ? "border-white/10 text-slate-300 hover:bg-white/[.05]" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )} aria-label="Open quick find">
              <Search size={14} /><span className="hidden sm:inline">Quick find</span><kbd className={cx("ml-1 hidden rounded border px-1.5 py-0.5 text-[9px] sm:inline", divider, muted)}>⌘ K</kbd>
            </button>
            <a href={site.socials.resume} target="_blank" rel="noreferrer" className={cx(
              "hidden items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-medium transition sm:inline-flex",
              dark ? "border-white/10 text-slate-300 hover:bg-white/[.05]" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            )}><FileText size={14} /> Resume <ArrowUpRight size={12} /></a>
            <button onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className={cx(
              "rounded-lg border p-2 transition",
              dark ? "border-white/10 text-slate-300 hover:bg-white/[.05]" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1120px] px-4 pb-14 pt-7 sm:px-8 sm:pt-9 lg:px-10 lg:pt-10">
          {view === "Overview" && <>
            <section className={cx(
              "relative overflow-hidden rounded-[26px] border p-6 sm:p-8 lg:p-10",
              dark ? "border-white/10 bg-[linear-gradient(130deg,rgba(48,66,150,.32),rgba(23,32,65,.68),rgba(11,15,25,.98))]" : "border-[#dfe6f4] bg-[linear-gradient(135deg,#eef2ff_0%,#ffffff_58%,#f8faff_100%)]"
            )}>
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-cyan-800/10" />
              <div aria-hidden="true" className="pointer-events-none absolute -right-2 -top-10 h-52 w-52 rounded-full border border-cyan-800/10" />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_250px] lg:items-center">
                <div className="max-w-3xl">
                  <div className={cx("mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium", dark ? "border-white/15 bg-white/[.04] text-slate-200" : "border-slate-200 bg-white text-slate-700")}><Sparkles size={12} /> FULL STACK & AI ENGINEER</div>
                  <h1 className={cx("max-w-3xl text-[38px] font-semibold leading-[1.08] tracking-[-.055em] sm:text-5xl lg:text-[54px]", titleText)}>I turn complex ideas into <span className={dark ? "text-cyan-200" : "text-[#4656d6]"}>useful systems.</span></h1>
                  <p className={cx("mt-5 max-w-2xl text-sm leading-7 sm:text-[15px]", dark ? "text-slate-300" : "text-slate-600")}>{site.tagline}</p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button onClick={() => chooseView("Projects")} className={cx("inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition hover:-translate-y-0.5", dark ? "bg-cyan-200 text-[#10241a] hover:bg-cyan-100" : "bg-[#3949ab] text-white hover:bg-[#29368a]")}>Explore projects <ArrowUpRight size={14} /></button>
                    <button onClick={() => chooseView("Contact")} className={cx("inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold transition", dark ? "border-white/15 text-slate-100 hover:bg-white/[.05]" : "border-[#d9def4] bg-white/65 text-slate-700 hover:bg-white")}>Get in touch <Mail size={14} /></button>
                  </div>
                </div>
                <div className={cx("relative rounded-2xl border p-5 backdrop-blur-sm", dark ? "border-white/10 bg-black/10" : "border-white/80 bg-white/65")}>
                  <div className="flex items-center gap-3">
                    <div className={cx("grid h-10 w-10 place-items-center rounded-xl", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-[#e3e9ff] text-[#4656d6]")}><Code2 size={18} /></div>
                    <div><p className={cx("text-[10px] uppercase tracking-[.16em]", muted)}>Currently building</p><p className={cx("mt-1 text-sm font-semibold", titleText)}>{site.status.nowBuilding}</p></div>
                  </div>
                  <div className={cx("my-4 border-t", divider)} />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3"><span className={cx("text-xs", muted)}>Featured projects</span><span className={cx("text-sm font-semibold tabular-nums", titleText)}>{featured.length}</span></div>
                    <div className="flex items-center justify-between gap-3"><span className={cx("text-xs", muted)}>Career chapters</span><span className={cx("text-sm font-semibold tabular-nums", titleText)}>{site.experience.length}</span></div>
                    <div className="flex items-center justify-between gap-3"><span className={cx("text-xs", muted)}>Location</span><span className={cx("text-xs font-medium", titleText)}>{site.location}</span></div>
                  </div>
                  <div className={cx("mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-[10px]", dark ? "bg-cyan-300/10 text-cyan-100" : "bg-cyan-50 text-cyan-900")}><CheckCircle2 size={13} className="text-cyan-600" /> {site.status.availableText}</div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <SectionHeading kicker="A quick introduction" title="What I work on" detail="A practical mix of product engineering, AI systems, and the infrastructure needed to ship them." dark={dark} />
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Layers3, label: "Full-stack products", copy: "From thoughtful UI to APIs, databases, and deployment." },
                  { icon: Sparkles, label: "AI & agent systems", copy: "LLM integrations, retrieval, tool use, and workflow automation." },
                  { icon: CheckCircle2, label: "Production-minded", copy: "Clear boundaries, maintainable code, and reliable delivery." },
                ].map(({ icon: Icon, label, copy }) => (
                  <div key={label} className={cx("rounded-2xl border p-5", panel)}>
                    <div className={cx("mb-4 grid h-9 w-9 place-items-center rounded-xl", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-cyan-50 text-cyan-800")}><Icon size={17} /></div>
                    <h3 className={cx("text-sm font-semibold", titleText)}>{label}</h3>
                    <p className={cx("mt-2 text-xs leading-5", muted)}>{copy}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-11">
              <div className="mb-5 flex items-end justify-between gap-3">
                <SectionHeading kicker="Selected work" title="Projects worth exploring" detail="A few projects that show how I approach real engineering problems." dark={dark} />
                <button onClick={() => chooseView("Projects")} className={cx("mb-7 inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold hover:text-cyan-600", muted)}>All projects <ArrowUpRight size={13} /></button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">{featured.map((project) => <ProjectTile key={project.title} project={project} dark={dark} />)}</div>
            </section>

            <section className={cx("mt-11 flex flex-col gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between", panel)}>
              <div className="flex items-start gap-4">
                <div className={cx("grid h-10 w-10 shrink-0 place-items-center rounded-xl", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-cyan-50 text-cyan-800")}><GraduationCap size={18} /></div>
                <div><p className={cx("text-[10px] font-semibold uppercase tracking-[.18em]", dark ? "text-cyan-200" : "text-cyan-800")}>Research & publications</p><h2 className={cx("mt-1 text-lg font-semibold tracking-tight", titleText)}>Published work and academic profile</h2><p className={cx("mt-1 max-w-2xl text-xs leading-5", muted)}>Find publication records, co-authors, and citation information on Google Scholar.</p></div>
              </div>
              <button onClick={() => chooseView("Research")} className={cx("inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-xs font-semibold transition", dark ? "border-white/10 hover:bg-white/[.05]" : "border-slate-200 bg-white hover:border-cyan-200")}>Explore research <ArrowUpRight size={14} /></button>
            </section>

            <section className="mt-11">
              <div className="mb-5 flex items-end justify-between gap-3">
                <SectionHeading kicker="Ideas & notes" title="Latest writing" detail="Notes from exploring AI agents, language models, and AI security." dark={dark} />
                <button onClick={() => chooseView("Writing")} className={cx("mb-7 inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold hover:text-cyan-600", muted)}>All writing <ArrowUpRight size={13} /></button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">{site.writing.slice(0, 2).map((post, index) => <WritingTile key={post.url} post={post} index={index} dark={dark} />)}</div>
            </section>

            <section className="mt-11">
              <div className="mb-5 flex items-end justify-between gap-3">
                <SectionHeading kicker="Career" title="Experience" detail="Building and shipping software with cross-functional teams." dark={dark} />
                <button onClick={() => chooseView("Experience")} className={cx("mb-7 inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold hover:text-cyan-600", muted)}>Full history <ArrowUpRight size={13} /></button>
              </div>
              <div className={cx("divide-y rounded-2xl border", panel, dark ? "divide-white/10" : "divide-slate-100")}>
                {site.experience.slice(0, 2).map((job) => (
                  <div key={job.company} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:justify-between">
                    <div><p className={cx("text-sm font-semibold", titleText)}>{job.role}</p><p className={cx("mt-1 text-xs", muted)}>{job.company}</p>{job.bullets?.[0] && <p className={cx("mt-3 max-w-2xl text-xs leading-5", muted)}>{job.bullets[0]}</p>}</div>
                    <span className={cx("shrink-0 text-[10px]", muted)}>{job.period}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={cx("mt-11 flex flex-col items-start justify-between gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center sm:p-7", dark ? "border-cyan-300/15 bg-cyan-300/[.05]" : "border-[#e1e5f5] bg-[#f5f6ff]")}>
              <div><p className={cx("text-[10px] font-semibold uppercase tracking-[.2em]", dark ? "text-cyan-200" : "text-cyan-900")}>Have something in mind?</p><h2 className={cx("mt-2 text-xl font-semibold tracking-tight", titleText)}>Let’s build something useful.</h2><p className={cx("mt-1 text-xs", muted)}>Open to thoughtful teams, challenging problems, and collaborations.</p></div>
              <button onClick={() => chooseView("Contact")} className={cx("inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold", dark ? "bg-cyan-200 text-[#10241a]" : "bg-[#111a30] text-white")}>Connect with me <ArrowUpRight size={14} /></button>
            </section>
          </>}

          {view === "Projects" && <>
            <SectionHeading kicker="Selected and ongoing work" title="Projects" detail="Products, experiments, and systems across AI, full-stack engineering, and developer tooling." dark={dark} />
            <div className="mb-5 space-y-3">
              <label className={cx("flex max-w-xl items-center gap-2.5 rounded-xl border px-3.5 py-3", dark ? "border-white/10 bg-white/[.035] focus-within:border-cyan-300/40" : "border-slate-200 bg-white focus-within:border-cyan-300")}>
                <Search size={15} className={muted} />
                <input value={projectQuery} onChange={(event) => setProjectQuery(event.target.value)} placeholder="Search projects or technologies..." aria-label="Search projects or technologies" className={cx("w-full bg-transparent text-xs outline-none placeholder:opacity-60", titleText)} />
                {projectQuery && <button type="button" onClick={() => setProjectQuery("")} aria-label="Clear project search" className={muted}><X size={14} /></button>}
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => <button key={category} type="button" onClick={() => setProjectCategory(category)} className={cx(
                  "rounded-lg border px-3 py-2 text-[10px] font-medium transition",
                  projectCategory === category
                    ? (dark ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100" : "border-cyan-200 bg-cyan-50 text-cyan-900")
                    : (dark ? "border-white/10 text-slate-400 hover:bg-white/[.05]" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50")
                )}>{category}</button>)}
              </div>
              <p className={cx("pt-1 text-[10px]", muted)}>{filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} {projectQuery || projectCategory !== "All" ? "match your filters" : "in the portfolio"}</p>
            </div>
            {filteredProjects.length > 0
              ? <div className="grid gap-4 md:grid-cols-2">{filteredProjects.map((project) => <ProjectTile key={project.title} project={project} dark={dark} />)}</div>
              : <div className={cx("rounded-2xl border border-dashed p-9 text-center", panel)}><Search size={20} className={cx("mx-auto mb-3", muted)} /><p className={cx("text-sm font-semibold", titleText)}>No matching projects</p><p className={cx("mt-1 text-xs", muted)}>Try another keyword or clear the category filter.</p><button onClick={() => { setProjectQuery(""); setProjectCategory("All"); }} className={cx("mt-4 text-xs font-semibold", dark ? "text-cyan-200" : "text-cyan-800")}>Clear filters</button></div>}
          </>}

          {view === "Experience" && <>
            <SectionHeading kicker="Where I've worked" title="Experience" detail="Roles, responsibilities, and the engineering work behind each chapter." dark={dark} />
            <div className={cx("relative rounded-2xl border p-2 sm:p-5", panel)}>
              <div className={cx("absolute bottom-8 left-[31px] top-8 w-px sm:left-[47px]", dark ? "bg-white/10" : "bg-slate-200")} />
              {site.experience.map((job) => (
                <article key={job.company} className="relative flex gap-4 p-4 sm:gap-6 sm:p-6">
                  <div className={cx("z-10 mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border", dark ? "border-cyan-300/20 bg-[#1a241d] text-cyan-200" : "border-cyan-100 bg-cyan-50 text-cyan-800")}><BriefcaseBusiness size={14} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div><h3 className={cx("text-sm font-semibold", titleText)}>{job.role}</h3><p className={cx("mt-1 text-xs", dark ? "text-cyan-200" : "text-cyan-800")}>{job.company}</p></div><span className={cx("text-[10px]", muted)}>{job.period}</span></div>
                    {job.bullets && <ul className={cx("mt-4 space-y-2 text-xs leading-6", muted)}>{job.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-600" /><span>{bullet}</span></li>)}</ul>}
                  </div>
                </article>
              ))}
            </div>
          </>}

          {view === "Research" && <>
            <SectionHeading kicker="Research & publications" title="Research profile" detail="A dedicated home for published work, co-authors, citation history, and academic indexing." dark={dark} />
            <section className={cx("overflow-hidden rounded-2xl border", panel)}>
              <div className={cx("flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8", dark ? "bg-[linear-gradient(120deg,rgba(47,65,160,.28),transparent)]" : "bg-[linear-gradient(120deg,#edf8f0,white)]")}>
                <div className="flex items-start gap-4">
                  <div className={cx("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-white text-cyan-800 shadow-sm")}><GraduationCap size={23} /></div>
                  <div>
                    <p className={cx("text-[10px] font-semibold uppercase tracking-[.18em]", dark ? "text-cyan-200" : "text-cyan-800")}>Google Scholar</p>
                    <h3 className={cx("mt-2 text-xl font-semibold tracking-tight", titleText)}>{site.name}</h3>
                    <p className={cx("mt-2 max-w-xl text-sm leading-6", muted)}>Explore the indexed publication list, author details, citation counts, related versions, and co-author information on my live academic profile.</p>
                  </div>
                </div>
                <a href={site.socials.googleScholar} target="_blank" rel="noreferrer" className={cx("inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition", dark ? "bg-cyan-200 text-[#10241a] hover:bg-cyan-100" : "bg-[#3949ab] text-white hover:bg-[#29368a]")}>View Google Scholar <ArrowUpRight size={14} /></a>
              </div>
              <div className={cx("grid gap-px border-t sm:grid-cols-3", dark ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-200")}>
                <div className={cx("p-5", dark ? "bg-[#101521]" : "bg-white")}><p className={cx("text-xs font-semibold", titleText)}>Publications</p><p className={cx("mt-1 text-xs leading-5", muted)}>Browse the complete, current list on Scholar.</p></div>
                <div className={cx("p-5", dark ? "bg-[#101521]" : "bg-white")}><p className={cx("text-xs font-semibold", titleText)}>Citations & impact</p><p className={cx("mt-1 text-xs leading-5", muted)}>Use the live profile for citation and h-index data rather than stale copied figures.</p></div>
                <div className={cx("p-5", dark ? "bg-[#101521]" : "bg-white")}><p className={cx("text-xs font-semibold", titleText)}>Author details</p><p className={cx("mt-1 text-xs leading-5", muted)}>Check co-authors, publication years, and indexed versions at the source.</p></div>
              </div>
            </section>
            <div className={cx("mt-4 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between", panel)}>
              <div><p className={cx("text-sm font-semibold", titleText)}>Keep publication metadata accurate</p><p className={cx("mt-1 text-xs leading-5", muted)}>Google Scholar restricts embedding and its public profile could not be reliably read here, so this portfolio links directly to the authoritative live publication list instead of guessing paper titles or citation counts.</p></div>
              <a href={site.socials.googleScholar} target="_blank" rel="noreferrer" className={cx("inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold", dark ? "text-cyan-200" : "text-cyan-800")}>Open publication list <ArrowUpRight size={13} /></a>
            </div>
          </>}

          {view === "Skills" && <>
            <SectionHeading kicker="Tools I reach for" title="Skills & technologies" detail="The stack is selected around the problem—not the other way around." dark={dark} />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Frontend", description: "Building polished, accessible product interfaces.", skills: ["TypeScript", "JavaScript", "React", "React Native", "Next.js", "Tailwind CSS"] },
                { title: "Backend & data", description: "APIs, data models, integrations, and service boundaries.", skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Qdrant"] },
                { title: "AI engineering", description: "Grounded retrieval, agent workflows, and model integration.", skills: ["LLMs", "RAG", "LoRA / PEFT", "Transformers", "MCP", "Multi-Agent Systems", "PyTorch"] },
                { title: "Cloud & delivery", description: "Shipping, deploying, and operating modern applications.", skills: ["Docker", "Kubernetes", "AWS", "GCP", "Git", "GitHub", "Vercel"] },
              ].map((group) => (
                <div key={group.title} className={cx("rounded-2xl border p-5", panel)}>
                  <h3 className={cx("text-sm font-semibold", titleText)}>{group.title}</h3><p className={cx("mt-1 text-xs", muted)}>{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className={cx("rounded-lg border px-2.5 py-1.5 text-[11px]", dark ? "border-white/10 bg-white/[.03] text-slate-300" : "border-slate-200 bg-slate-50 text-slate-600")}>{skill}</span>)}</div>
                </div>
              ))}
            </div>
          </>}

          {view === "Education" && <>
            <SectionHeading kicker="Learning foundation" title="Education" detail="Academic background and ongoing technical exploration." dark={dark} />
            <div className={cx("rounded-2xl border p-6 sm:p-8", panel)}>
              {site.education.map((education) => (
                <div key={education.institution} className="flex gap-4">
                  <div className={cx("grid h-11 w-11 shrink-0 place-items-center rounded-xl", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-cyan-50 text-cyan-800")}><GraduationCap size={20} /></div>
                  <div><p className={cx("text-base font-semibold", titleText)}>{education.degree} · {education.field}</p><p className={cx("mt-2 text-sm", muted)}>{education.institution}</p><p className={cx("mt-1 text-xs", muted)}>{education.location}</p><span className={cx("mt-4 inline-flex rounded-full px-3 py-1 text-[10px]", dark ? "bg-white/[.06] text-slate-300" : "bg-slate-100 text-slate-600")}>{education.period}</span></div>
                </div>
              ))}
            </div>
          </>}

          {view === "Writing" && <>
            <SectionHeading kicker="Notes & ideas" title="Writing" detail="Technical notes, architecture explorations, and lessons from building software." dark={dark} />
            {site.writing.length > 0
              ? <div className="grid gap-4 md:grid-cols-2">{site.writing.map((post, index) => <WritingTile key={post.url} post={post} index={index} dark={dark} />)}</div>
              : <div className={cx("rounded-2xl border p-7 sm:p-9", panel)}><div className={cx("mb-4 grid h-10 w-10 place-items-center rounded-xl", dark ? "bg-cyan-300/10 text-cyan-200" : "bg-cyan-50 text-cyan-800")}><BookOpen size={18} /></div><h3 className={cx("text-lg font-semibold", titleText)}>Follow my technical writing</h3><p className={cx("mt-2 max-w-xl text-sm leading-6", muted)}>Explore articles and engineering notes on Medium. This section can be connected to a live writing feed later.</p><a href={site.socials.medium} target="_blank" rel="noreferrer" className={cx("mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold", dark ? "bg-cyan-200 text-[#10241a]" : "bg-[#3949ab] text-white")}>Open Medium <ArrowUpRight size={14} /></a></div>}
          </>}

          {view === "Contact" && <>
            <SectionHeading kicker="Start a conversation" title="Let's connect" detail="Have a project, opportunity, or interesting engineering problem in mind? Reach out." dark={dark} />
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { label: "Email", detail: site.email, href: site.socials.email, icon: Mail },
                { label: "LinkedIn", detail: "Professional network", href: site.socials.linkedin, icon: Linkedin },
                { label: "GitHub", detail: "Projects and open source", href: site.socials.github, icon: Github },
                { label: "Google Scholar", detail: "Research and publications", href: site.socials.googleScholar, icon: GraduationCap },
              ].map(({ label, detail, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"} className={cx("flex items-center gap-4 rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-cyan-300", panel)}>
                  <div className={cx("grid h-10 w-10 place-items-center rounded-xl", dark ? "bg-white/[.06] text-cyan-200" : "bg-cyan-50 text-cyan-800")}><Icon size={18} /></div>
                  <div className="min-w-0 flex-1"><p className={cx("text-sm font-semibold", titleText)}>{label}</p><p className={cx("mt-1 truncate text-xs", muted)}>{detail}</p></div><ArrowUpRight size={15} className={muted} />
                </a>
              ))}
            </div>
            <div className={cx("mt-5 rounded-2xl border p-5", panel)}><p className={cx("text-sm font-semibold", titleText)}>Prefer to schedule a chat?</p><p className={cx("mt-1 text-xs", muted)}>Pick a convenient time on my calendar.</p><a href={site.socials.booking} target="_blank" rel="noreferrer" className={cx("mt-4 inline-flex items-center gap-1 text-xs font-semibold", dark ? "text-cyan-200" : "text-cyan-800")}>Book a call <ArrowUpRight size={14} /></a></div>
          </>}

          <footer className={cx("mt-12 flex flex-col gap-2 border-t pt-5 text-[10px] sm:flex-row sm:items-center sm:justify-between", divider, dark ? "text-slate-500" : "text-slate-400")}>
            <span>© {new Date().getFullYear()} {site.name}. Built with care.</span>
            <span className="flex items-center gap-3"><a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan-600">GitHub</a><a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-600">LinkedIn</a><a href={site.socials.medium} target="_blank" rel="noreferrer" className="hover:text-cyan-600">Writing</a></span>
          </footer>
        </main>
      </div>
    </div>
  );
}
