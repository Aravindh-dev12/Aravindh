import { useState } from "react";
import {
  ArrowUpRight, BriefcaseBusiness, Code2, Github, GraduationCap, House,
  Layers3, Linkedin, Mail, Menu, Moon, Sun, X, BookOpen, Sparkles, MapPin
} from "lucide-react";
import { site } from "@/config/site";

type Section = "Overview" | "Projects" | "Experience" | "Skills" | "Education" | "Writing" | "Contact";
const nav: { label: Section; icon: typeof House }[] = [
  { label: "Overview", icon: House }, { label: "Projects", icon: Layers3 },
  { label: "Experience", icon: BriefcaseBusiness }, { label: "Skills", icon: Code2 },
  { label: "Education", icon: GraduationCap }, { label: "Writing", icon: BookOpen },
  { label: "Contact", icon: Mail },
];
const cx = (...v: (string | false | undefined)[]) => v.filter(Boolean).join(" ");

export function PortfolioWorkspace() {
  const [section, setSection] = useState<Section>("Overview");
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const bg = dark ? "bg-[#171717] text-zinc-100" : "bg-[#f7f7f8] text-zinc-900";
  const panel = dark ? "border-white/10 bg-[#202020]" : "border-zinc-200 bg-white";
  const muted = dark ? "text-zinc-400" : "text-zinc-500";
  const heading = "text-2xl font-semibold tracking-tight sm:text-3xl";
  const button = (label: Section) => { setSection(label); setMobileOpen(false); };
  const projects = site.projects.filter(p => {
    const q = query.trim().toLowerCase();
    return !q || [p.title, p.blurb, ...p.stack].join(" ").toLowerCase().includes(q);
  });
  const sidebar = <aside className={cx("flex h-full w-[260px] shrink-0 flex-col border-r", dark ? "border-white/10 bg-[#202020]" : "border-zinc-200 bg-[#f0f0f0]")}>
    <div className="flex items-center gap-3 px-5 py-5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-white"><Sparkles size={17}/></div>
      <div><p className="text-sm font-semibold">Aravindh<span className="text-emerald-600">.</span></p><p className={cx("text-[11px]", muted)}>Personal workspace</p></div>
      <button onClick={() => setMobileOpen(false)} className="ml-auto md:hidden" aria-label="Close menu"><X size={18}/></button>
    </div>
    <div className="px-4 pb-4">
      <div className={cx("rounded-2xl border p-4", panel)}>
        <img src="/profile.jpeg" onError={e => {e.currentTarget.onerror=null;e.currentTarget.src="/profile2.jpeg";}} alt={site.name} className="h-[68px] w-[68px] rounded-full object-cover"/>
        <h2 className="mt-3 text-base font-semibold">{site.name}</h2>
        <p className={cx("mt-1 text-xs leading-5", muted)}>{site.role}</p>
        <p className={cx("mt-3 flex items-center gap-1.5 text-xs", muted)}><MapPin size={13}/>{site.location}</p>
        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>{site.status.availableText}</span>
      </div>
    </div>
    <p className={cx("px-6 pb-2 text-[10px] font-semibold uppercase tracking-[.18em]", muted)}>Navigate</p>
    <nav className="space-y-1 px-3" aria-label="Portfolio navigation">{nav.map(({label,icon:Icon}) => <button key={label} onClick={() => button(label)} className={cx("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition", section===label ? (dark ? "bg-white/10 text-white" : "bg-white font-medium shadow-sm") : (dark ? "text-zinc-400 hover:bg-white/5 hover:text-white" : "text-zinc-600 hover:bg-white/70"))}><Icon size={17}/>{label}{section===label && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500"/>}</button>)}</nav>
    <div className="mt-auto p-4">
      <a href="/chat" className={cx("flex items-center gap-2 rounded-xl border px-3 py-3 text-xs font-medium", panel)}><Sparkles size={15}/> Chat with my portfolio <ArrowUpRight size={14} className="ml-auto"/></a>
      <div className={cx("mt-4 flex items-center justify-between border-t pt-4", dark ? "border-white/10" : "border-zinc-200")}><span className={cx("text-[11px]", muted)}>Find me online</span><div className="flex gap-3"><a href={site.socials.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={16}/></a><a href={site.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={16}/></a><a href={site.socials.email} aria-label="Email"><Mail size={16}/></a></div></div>
    </div>
  </aside>;

  return <div className={cx("min-h-screen md:flex", bg)}>
    <div className="sticky top-0 hidden h-screen md:block">{sidebar}</div>
    {mobileOpen && <div className="fixed inset-0 z-50 md:hidden"><button className="absolute inset-0 bg-black/50" aria-label="Close menu overlay" onClick={() => setMobileOpen(false)}/><div className="relative h-full w-[min(86vw,300px)] shadow-2xl">{sidebar}</div></div>}
    <div className="min-w-0 flex-1">
      <header className={cx("sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl sm:px-8", dark ? "border-white/10 bg-[#171717]/90" : "border-zinc-200 bg-[#f7f7f8]/90")}>
        <div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Open menu"><Menu size={19}/></button><span className={cx("text-xs", muted)}>Workspace</span><span className={muted}>/</span><span className="text-sm font-medium">{section}</span></div>
        <div className="flex items-center gap-2"><a href={site.socials.resume} target="_blank" rel="noreferrer" className={cx("rounded-xl border px-3 py-2 text-xs font-medium", panel)}>Resume <ArrowUpRight className="ml-1 inline" size={12}/></a><button onClick={() => setDark(!dark)} aria-label="Toggle theme" className={cx("rounded-xl border p-2.5", panel)}>{dark?<Sun size={15}/>:<Moon size={15}/>}</button></div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-9 sm:py-10 lg:px-12">
        {section==="Overview" && <div className="space-y-8">
          <section className={cx("rounded-3xl border p-6 sm:p-10", panel)}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300"><Sparkles size={13}/> FULL STACK & AI ENGINEER</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-.045em] sm:text-5xl">I build useful products, thoughtful interfaces, and AI-powered systems.</h1>
            <p className={cx("mt-5 max-w-2xl text-sm leading-7 sm:text-base", muted)}>{site.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3"><button onClick={() => button("Projects")} className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-700">Explore projects <ArrowUpRight className="ml-1 inline" size={15}/></button><button onClick={() => button("Contact")} className={cx("rounded-xl border px-4 py-3 text-sm font-medium", panel)}>Get in touch</button></div>
          </section>
          <section><div className="mb-4 flex items-end justify-between"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-600">Selected work</p><h2 className={heading}>Projects to explore</h2></div><button onClick={() => button("Projects")} className={cx("text-sm", muted)}>View all →</button></div><div className="grid gap-4 sm:grid-cols-2">{site.projects.filter(p=>p.featured).slice(0,4).map(p=><article key={p.title} className={cx("overflow-hidden rounded-2xl border transition hover:-translate-y-0.5",panel)}>{p.image&&<img src={p.image} alt={p.title} loading="lazy" className="h-36 w-full object-cover"/>}<div className="p-5"><div className="flex items-center justify-between gap-2"><h3 className="font-semibold">{p.title}</h3><ArrowUpRight size={15}/></div><p className={cx("mt-2 text-xs leading-5",muted)}>{p.blurb}</p><div className="mt-4 flex flex-wrap gap-1.5">{p.stack.slice(0,4).map(t=><span key={t} className={cx("rounded-md px-2 py-1 text-[10px]",dark?"bg-white/10":"bg-zinc-100")}>{t}</span>)}</div><div className="mt-4 flex gap-4 text-xs">{p.links.source&&<a href={p.links.source} target="_blank" rel="noreferrer" className="hover:text-emerald-600">Source ↗</a>}{p.links.live&&<a href={p.links.live} target="_blank" rel="noreferrer" className="hover:text-emerald-600">Live demo ↗</a>}</div></div></article>)}</div></section>
          <section className={cx("rounded-2xl border p-6",panel)}><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-600">Currently focused on</p><h2 className="mt-2 text-xl font-semibold">{site.status.nowBuilding}</h2><p className={cx("mt-2 text-sm",muted)}>AI engineering · Full-stack architecture · Production-ready software</p></section>
        </div>}
        {section==="Projects" && <section><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-600">Building & experimenting</p><h1 className={heading}>Projects</h1><p className={cx("mt-2 text-sm",muted)}>Products, experiments, and systems across AI and full-stack engineering.</p><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects or technologies..." className={cx("my-6 w-full max-w-xl rounded-xl border px-4 py-3 text-sm outline-none focus:border-emerald-500",panel)}/><div className="grid gap-4 sm:grid-cols-2">{projects.map(p=><article key={p.title} className={cx("rounded-2xl border p-5",panel)}><div className="flex items-start justify-between gap-3"><h2 className="font-semibold">{p.title}</h2><span className={cx("text-xs",muted)}>{p.year}</span></div><p className={cx("mt-3 text-sm leading-6",muted)}>{p.blurb}</p><div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map(t=><span key={t} className={cx("rounded-md px-2 py-1 text-[10px]",dark?"bg-white/10":"bg-zinc-100")}>{t}</span>)}</div><div className="mt-4 flex gap-4 text-xs">{p.links.source&&<a href={p.links.source} target="_blank" rel="noreferrer">GitHub ↗</a>}{p.links.live&&<a href={p.links.live} target="_blank" rel="noreferrer">Live ↗</a>}</div></article>)}</div></section>}
        {section==="Experience" && <section><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-600">Career journey</p><h1 className={heading}>Experience</h1><div className="mt-6 space-y-4">{site.experience.map(j=><article key={j.company} className={cx("rounded-2xl border p-6",panel)}><div className="flex flex-wrap justify-between gap-2"><div><h2 className="font-semibold">{j.role}</h2><p className={cx("mt-1 text-sm",muted)}>{j.company}</p></div><span className={cx("text-xs",muted)}>{j.period}</span></div><ul className={cx("mt-4 list-disc space-y-2 pl-5 text-sm leading-6",muted)}>{j.bullets?.map(b=><li key={b}>{b}</li>)}</ul></article>)}</div></section>}
        {section==="Skills" && <section><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-600">Tools of the trade</p><h1 className={heading}>Skills & technologies</h1><p className={cx("mt-2 text-sm",muted)}>The tools I use to design, build, and ship products.</p><div className="mt-6 flex flex-wrap gap-2">{site.skills.map(s=><span key={s} className={cx("rounded-xl border px-3 py-2 text-sm",panel)}>{s}</span>)}</div></section>}
        {section==="Education" && <section><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-600">Learning foundation</p><h1 className={heading}>Education</h1><div className="mt-6 space-y-4">{site.education.map(e=><article key={e.institution} className={cx("rounded-2xl border p-6",panel)}><h2 className="font-semibold">{e.degree} · {e.field}</h2><p className={cx("mt-2 text-sm",muted)}>{e.institution}</p><p className={cx("mt-1 text-xs",muted)}>{e.location} · {e.period}</p></article>)}</div></section>}
        {section==="Writing" && <section><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-600">Ideas & notes</p><h1 className={heading}>Writing</h1><div className="mt-6 grid gap-4 sm:grid-cols-2">{site.writing.map(p=><a key={p.url} href={p.url} target="_blank" rel="noreferrer" className={cx("rounded-2xl border p-5 transition hover:-translate-y-0.5",panel)}><p className={cx("text-xs",muted)}>{p.date} · {p.readingTime}</p><h2 className="mt-3 font-semibold leading-6">{p.title}</h2><p className={cx("mt-2 text-sm leading-6",muted)}>{p.summary}</p><span className="mt-4 inline-flex items-center gap-1 text-sm text-emerald-600">Read article <ArrowUpRight size={14}/></span></a>)}</div></section>}
        {section==="Contact" && <section className={cx("rounded-3xl border p-7 sm:p-10",panel)}><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-emerald-600">Let's connect</p><h1 className={heading}>Have a good problem to solve?</h1><p className={cx("mt-3 max-w-xl text-sm leading-6",muted)}>I’m open to thoughtful teams, challenging engineering work, and collaborations. Reach out through any of these channels.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{[[ "Email",site.socials.email,Mail ],["GitHub",site.socials.github,Github],["LinkedIn",site.socials.linkedin,Linkedin]].map(([label,url,Icon])=>{const I=Icon as typeof Mail;return <a key={label as string} href={url as string} target={(label==="Email")?undefined:"_blank"} rel="noreferrer" className={cx("flex items-center gap-3 rounded-xl border p-4",panel)}><I size={18}/><span className="text-sm font-medium">{label as string}</span><ArrowUpRight size={14} className="ml-auto"/></a>})}</div></section>}
        <footer className={cx("mt-12 border-t pt-5 text-xs",dark?"border-white/10 text-zinc-500":"border-zinc-200 text-zinc-500")}>Designed as a simple workspace for {site.name} · <a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a></footer>
      </main>
    </div>
  </div>;
}
