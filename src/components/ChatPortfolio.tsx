import { useMemo, useState } from "react";
import { ArrowUp, ExternalLink, Github, Linkedin, Mail, Menu, PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";
import { site } from "@/config/site";

type ChatProject = (typeof site.projects)[number];
type Message = { id: number; role: "user" | "assistant"; text?: string; section?: string; project?: ChatProject; typing?: boolean };

const prompts = [
  ["about", "Tell me about Aravindh"],
  ["projects", "Show me your projects"],
  ["cieav", "What is CIEAV?"],
  ["experience", "Tell me about your experience"],
  ["skills", "What technologies do you use?"],
  ["contact", "How can I contact you?"],
];

function answerFor(input: string): Omit<Message, "id"> {
  const q = input.toLowerCase();
  if (q.includes("cieav")) {
    const project = site.projects.find((p) => p.title === "CIEAV");
    return { role: "assistant", text: project?.blurb, section: "project", project };
  }
  if (q.includes("project") || q.includes("work") || q.includes("built")) {
    return { role: "assistant", text: "Here are the projects I’m most excited about right now.", section: "projects" };
  }
  if (q.includes("experience") || q.includes("work history") || q.includes("career")) {
    return { role: "assistant", text: "I’ve worked across full-stack product engineering, AI systems, and production delivery.", section: "experience" };
  }
  if (q.includes("skill") || q.includes("stack") || q.includes("technology") || q.includes("tech")) {
    return { role: "assistant", text: "My stack spans product engineering, cloud infrastructure, and modern AI systems.", section: "skills" };
  }
  if (q.includes("contact") || q.includes("hire") || q.includes("email")) {
    return { role: "assistant", text: "I’m open to opportunities and collaborations. You can reach me directly by email or through LinkedIn.", section: "contact" };
  }
  return { role: "assistant", text: site.about[0], section: "about" };
}

function SectionContent({ section, project }: { section?: string; project?: ChatProject }) {
  if (project) {
    return (
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
        {project.image && <img src={project.image} alt="" className="h-44 w-full object-cover opacity-80" />}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold">{project.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{project.year}</p>
            </div>
            <div className="flex gap-2">
              {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs hover:bg-[var(--hover)]">Live <ExternalLink className="ml-1 inline h-3 w-3" /></a>}
              {project.links.source && <a href={project.links.source} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs hover:bg-[var(--hover)]">GitHub</a>}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">{project.stack.map((s) => <span key={s} className="rounded-full bg-[var(--chip)] px-2.5 py-1 text-xs text-[var(--muted)]">{s}</span>)}</div>
        </div>
      </div>
    );
  }

  if (section === "projects") {
    return <div className="mt-4 grid gap-3 sm:grid-cols-2">{site.projects.filter((p) => p.featured).map((p) => <div key={p.title} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4"><p className="font-semibold">{p.title}</p><p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">{p.blurb}</p><div className="mt-3 flex flex-wrap gap-1.5">{p.stack.slice(0, 4).map((s) => <span key={s} className="rounded-full bg-[var(--chip)] px-2 py-1 text-[11px] text-[var(--muted)]">{s}</span>)}</div></div>)}</div>;
  }
  if (section === "experience") {
    return <div className="mt-4 space-y-3">{site.experience.map((job) => <div key={job.company} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4"><div className="flex justify-between gap-4"><div><p className="font-semibold">{job.company}</p><p className="text-sm text-[var(--muted)]">{job.role}</p></div><span className="text-xs text-[var(--muted)]">{job.period}</span></div>{job.bullets?.[0] && <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{job.bullets[0]}</p>}</div>)}</div>;
  }
  if (section === "skills") return <div className="mt-4 flex flex-wrap gap-2">{site.skills.map((s) => <span key={s} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm">{s}</span>)}</div>;
  if (section === "contact") return <div className="mt-4 grid gap-2 sm:grid-cols-3"><a href={site.socials.email} className="rounded-2xl border border-[var(--line)] p-4 hover:bg-[var(--hover)]"><Mail className="mb-2 h-4 w-4" />Email</a><a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-2xl border border-[var(--line)] p-4 hover:bg-[var(--hover)]"><Linkedin className="mb-2 h-4 w-4" />LinkedIn</a><a href={site.socials.github} target="_blank" rel="noreferrer" className="rounded-2xl border border-[var(--line)] p-4 hover:bg-[var(--hover)]"><Github className="mb-2 h-4 w-4" />GitHub</a></div>;
  return <div className="mt-4 space-y-3 text-[15px] leading-7 text-[var(--muted)]">{site.about.map((p) => <p key={p}>{p}</p>)}</div>;
}

export function ChatPortfolio() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const started = messages.length > 0;

  const ask = (value: string) => {
    const text = value.trim();
    if (!text || isTyping) return;
    const answer = answerFor(text);
    const userId = nextId.current++;
    const assistantId = nextId.current++;
    setMessages((m) => [...m, { id: userId, role: "user", text }, { id: assistantId, role: "assistant", text: "", typing: true, section: answer.section, project: answer.project }]);
    setInput("");
    setIsTyping(true);
    const fullText = answer.text || "I can help with that.";
    let index = 0;
    const timer = window.setInterval(() => {
      index = Math.min(fullText.length, index + Math.max(1, Math.ceil(fullText.length / 70)));
      setMessages((m) => m.map((msg) => msg.id === assistantId ? { ...msg, text: fullText.slice(0, index), typing: index < fullText.length } : msg));
      if (index >= fullText.length) {
        window.clearInterval(timer);
        setIsTyping(false);
      }
    }, 22);
  };

  const sidebar = useMemo(() => (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-[var(--line)] bg-[var(--bg)]">
      <div className="flex items-center gap-3 border-b border-[var(--line)] p-4">
        <img src={site.profileImages[0]} alt={site.name} className="h-9 w-9 rounded-full object-cover" />
        <div><p className="text-sm font-semibold">{site.name}</p><p className="text-xs text-[var(--muted)]">{site.role}</p></div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--soft)]">Index</p>
        <div className="space-y-1">
          {prompts.map(([id, label]) => <button key={id} onClick={() => { ask(label); setMobileOpen(false); }} className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--fg)]">{label}</button>)}
        </div>
        <p className="mb-3 mt-8 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--soft)]">Elsewhere</p>
        <div className="space-y-1">
          <a href={site.socials.github} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]">GitHub</a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]">LinkedIn</a>
          <a href={site.socials.googleScholar} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]">Google Scholar</a>
        </div>
      </div>
      <div className="border-t border-[var(--line)] p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <img src={site.profileImages[0]} alt="" className="h-10 w-10 rounded-full object-cover" />
          <div className="min-w-0"><p className="truncate text-sm font-medium">{site.name}</p><p className="truncate text-xs text-[var(--muted)]">{site.location}</p></div>
        </div>
      </div>
    </aside>
  ), [isTyping]);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {sidebarOpen && <div className="hidden md:block">{sidebar}</div>}
      {mobileOpen && <div className="fixed inset-0 z-50 md:hidden"><button className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />{sidebar}</div>}
      <section className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center border-b border-[var(--line)] px-4 md:px-6">
          <button className="mr-2 rounded-lg p-2 hover:bg-[var(--hover)] md:hidden" onClick={() => setMobileOpen(true)}><Menu className="h-5 w-5" /></button><button aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"} className="mr-2 hidden rounded-lg p-2 hover:bg-[var(--hover)] md:block" onClick={() => setSidebarOpen((v) => !v)}>{sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}</button>
          <div className="text-sm font-medium"><> <Sparkles className="inline h-4 w-4 text-[var(--muted)]" /> Aravindh Portfolio </></div>
          <div className="ml-auto flex items-center gap-3 text-xs text-[var(--muted)]"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Open to opportunities</div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {!started ? (
            <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-5 pb-32 pt-10 text-center">
              <img src={site.profileImages[0]} alt={site.name} className="mb-6 h-16 w-16 rounded-full object-cover ring-1 ring-[var(--line)]" />
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Hey, I'm Aravindh.</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">Ask me anything about my work, projects, experience, skills, or how to get in touch.</p>
              <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">{prompts.slice(0, 4).map(([id, label]) => <button key={id} onClick={() => ask(label)} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 text-left text-sm transition hover:-translate-y-0.5 hover:bg-[var(--hover)]"><span className="text-[var(--muted)]">{label}</span><span className="mt-2 block text-xs text-[var(--soft)]">Ask Aravindh →</span></button>)}</div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl space-y-8 px-5 py-8 pb-36">
              {messages.map((m, i) => m.role === "user" ? (
                <div key={m.id} className="flex justify-end"><div className="max-w-[80%] rounded-3xl bg-[var(--chip)] px-4 py-3 text-sm leading-6">{m.text}</div></div>
              ) : (
                <div key={i} className="flex gap-3"><img src={site.profileImages[0]} alt="" className="mt-1 h-7 w-7 rounded-full object-cover" /><div className="min-w-0 flex-1"><p className="whitespace-pre-wrap text-[15px] leading-7">{m.text}{m.typing && <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-current align-middle" />}</p>{!m.typing && <SectionContent section={m.section} project={m.project} />}</div></div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)] to-transparent px-4 pb-5 pt-10">
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2 shadow-2xl">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message Aravindh Portfolio..." className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[var(--soft)]" />
            <button type="submit" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--fg)] text-[var(--bg)] disabled:opacity-40" disabled={!input.trim() || isTyping}><ArrowUp className="h-4 w-4" /></button>
          </form>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-[var(--soft)]">Aravindh Portfolio · Ask about projects, experience, skills, CIEAV, or contact</p>
        </div>
      </section>
    </div>
  );
}
