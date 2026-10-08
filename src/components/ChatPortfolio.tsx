import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp, Copy, ExternalLink, Github, Linkedin, Mail,
  Menu, Moon, PanelLeftClose, PanelLeftOpen, Plus, Share2, Sparkles,
  Sun, Settings, SlidersHorizontal, Type, X
} from "lucide-react";
import { site } from "@/config/site";

const PROFILE_IMAGE = "/profile.jpeg?v=2";

type ChatProject = (typeof site.projects)[number];
type Message = {
  id: number;
  role: "user" | "assistant";
  text?: string;
  section?: string;
  project?: ChatProject;
  decision?: { title: string; options: string[] };
  typing?: boolean;
};

const prompts = [
  ["about", "Tell me about Aravindh"],
  ["projects", "Show me your projects"],
  ["cieav", "What is CIEAV and how does it work?"],
  ["architecture", "Explain a project's architecture"],
  ["experience", "Tell me about your experience"],
  ["skills", "What technologies do you use?"],
  ["compare", "Which project should I explore first?"],
  ["contact", "How can I contact you?"],
];

function findProject(q: string) {
  const names = site.projects.map((p) => p.title.toLowerCase());
  const hit = names.find((name) => q.includes(name));
  return hit ? site.projects.find((p) => p.title.toLowerCase() === hit) : undefined;
}

function answerFor(input: string): Omit<Message, "id"> {
  const q = input.trim().toLowerCase();
  const project = site.projects.find((p) => q.includes(p.title.toLowerCase()));

  if (/^(hi|hello|hey|hii|helo|good morning|good afternoon|good evening)\\b/.test(q)) {
    return { role: "assistant", text: "Hey! 👋 I'm Aravindh's portfolio assistant. Ask me about projects, architecture, experience, skills, or anything else you'd like to explore." };
  }
  if (q.includes("how are you") || q.includes("how r u")) {
    return { role: "assistant", text: "I'm doing great and ready to help you explore the portfolio. What would you like to know?" };
  }
  if (q.includes("time") || q.includes("date") || q.includes("today")) {
    const now = new Date();
    const time = now.toLocaleTimeString("en-IN", { timeZone: site.timezone, hour: "numeric", minute: "2-digit", second: "2-digit" });
    const date = now.toLocaleDateString("en-IN", { timeZone: site.timezone, weekday: "long", year: "numeric", month: "long", day: "numeric" });
    return { role: "assistant", text: `In India (Asia/Kolkata), it is ${time} on ${date}.` };
  }
  if (q.includes("weather") || q.includes("climate")) {
    return { role: "assistant", text: "I can explain climate patterns and weather concepts, but this portfolio currently has no live weather service connected. For live conditions, I would need a weather data provider or browser weather integration." };
  }

  if (project) {
    if (q.includes("architect") || q.includes("how") || q.includes("work") || q.includes("intern")) {
      return {
        role: "assistant",
        text: `Here's how ${project.title} is structured: it combines ${project.stack.slice(0, 5).join(", ")} around a focused product workflow. The main boundary is the user/interface layer, followed by orchestration and AI/business logic, data or external tools, and verification where reliability matters.`,
        section: "architecture",
        project,
      };
    }
    return { role: "assistant", text: project.blurb, section: "project", project };
  }

  if (q.includes("cieav")) {
    const p = site.projects.find((x) => x.title === "CIEAV");
    return {
      role: "assistant",
      text: "CIEAV is designed as a local commit layer between digital intent and consequence. Cloud services can interpret intent, while deterministic safety checks, policy decisions, signing, and final authority remain local.",
      section: "architecture",
      project: p,
    };
  }
  if (q.includes("architect") || q.includes("system design") || q.includes("how does") || q.includes("how it works")) {
    const p = site.projects[0];
    return {
      role: "assistant",
      text: `For ${p.title}, the architecture can be understood as interface → orchestration → AI / business logic → persistence or external tools → verification. These boundaries keep the system observable, testable, and replaceable.`,
      section: "architecture",
      project: p,
    };
  }
  if (q.includes("compare") || q.includes("which project") || q.includes("recommend") || q.includes("explore first")) {
    return {
      role: "assistant",
      text: "If you want to understand the breadth of the portfolio, I'd start with one project from each systems layer rather than reading everything sequentially.",
      section: "decision",
      decision: { title: "What are you most interested in?", options: ["AI agents & automation", "Systems & infrastructure", "Product engineering", "Privacy & local-first AI"] },
    };
  }
  if (q.includes("project") || q.includes("work") || q.includes("built")) {
    return { role: "assistant", text: "Here are the projects I’d highlight first. Each card is a different window into the way I build systems.", section: "projects" };
  }
  if (q.includes("experience") || q.includes("career")) {
    return { role: "assistant", text: "My experience sits at the intersection of full-stack product engineering, AI systems, and production delivery.", section: "experience" };
  }
  if (q.includes("skill") || q.includes("stack") || q.includes("technology") || q.includes("tech")) {
    return { role: "assistant", text: "The stack changes by problem, but the recurring themes are product engineering, AI/LLM systems, automation, infrastructure, and developer tooling.", section: "skills" };
  }
  if (q.includes("contact") || q.includes("hire") || q.includes("email")) {
    return { role: "assistant", text: "I'm open to opportunities and collaborations. Email, LinkedIn, and GitHub are the best ways to reach me.", section: "contact" };
  }

  return {
    role: "assistant",
    text: "I can help you navigate Aravindh's work, projects, engineering decisions, experience, and contact details. Try asking naturally — for example, “what did you build with CIEAV?”, “which project shows the strongest systems work?”, or “how can I contact you?”",
    section: "about",
  };
}

function MessageActions({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {}
  };
  return (
    <div className="mt-2 flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
      <button onClick={copy} className="rounded-md p-1.5 text-[var(--soft)] hover:bg-[var(--hover)] hover:text-[var(--fg)]" title="Copy response"><Copy className="h-3.5 w-3.5" /></button>
      {copied && <span className="text-[11px] text-[var(--muted)]">Copied</span>}
    </div>
  );
}
function SectionContent({ section, project, decision, onDecision }: {
  section?: string; project?: ChatProject; decision?: Message["decision"]; onDecision: (value: string) => void;
}) {
  if (decision) {
    return (
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium"><SlidersHorizontal className="h-4 w-4 text-[var(--muted)]" />{decision.title}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {decision.options.map((option) => <button key={option} onClick={() => onDecision(option)} className="group flex items-center justify-between rounded-xl border border-[var(--line)] px-3 py-3 text-left text-sm transition hover:border-[var(--fg)]/30 hover:bg-[var(--hover)]"><span>{option}</span><span className="text-[var(--soft)] group-hover:text-[var(--fg)]">→</span></button>)}
        </div>
      </div>
    );
  }
  if (project) {
    return (
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
        {project.image && <img src={project.image} alt="" className="h-44 w-full object-cover opacity-80" />}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-lg font-semibold">{project.title}</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{project.year}</p></div>
            <div className="flex gap-2">
              {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs hover:bg-[var(--hover)]">Live <ExternalLink className="ml-1 inline h-3 w-3" /></a>}
              {project.links.source && <a href={project.links.source} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs hover:bg-[var(--hover)]">GitHub</a>}
            </div>
          </div>
          {section === "architecture" && <div className="mt-5 grid gap-2 sm:grid-cols-4">{["Interface", "Orchestration", "AI / Logic", "Verification"].map((x, i) => <div key={x} className="rounded-xl border border-[var(--line)] p-3"><p className="text-[10px] uppercase tracking-wider text-[var(--soft)]">0{i + 1}</p><p className="mt-2 text-sm font-medium">{x}</p></div>)}</div>}
          <div className="mt-4 flex flex-wrap gap-2">{project.stack.map((s) => <span key={s} className="rounded-full bg-[var(--chip)] px-2.5 py-1 text-xs text-[var(--muted)]">{s}</span>)}</div>
        </div>
      </div>
    );
  }
  if (section === "projects") return <div className="mt-4 grid gap-3 sm:grid-cols-2">{site.projects.filter((p) => p.featured).map((p) => <button key={p.title} onClick={() => onDecision(p.title)} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 text-left transition hover:bg-[var(--hover)]"><p className="font-semibold">{p.title}</p><p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">{p.blurb}</p><div className="mt-3 flex flex-wrap gap-1.5">{p.stack.slice(0, 4).map((s) => <span key={s} className="rounded-full bg-[var(--chip)] px-2 py-1 text-[11px] text-[var(--muted)]">{s}</span>)}</div></button>)}</div>;
  if (section === "experience") return <div className="mt-4 space-y-3">{site.experience.map((job) => <div key={job.company} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4"><div className="flex justify-between gap-4"><div><p className="font-semibold">{job.company}</p><p className="text-sm text-[var(--muted)]">{job.role}</p></div><span className="text-xs text-[var(--muted)]">{job.period}</span></div>{job.bullets?.[0] && <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{job.bullets[0]}</p>}</div>)}</div>;
  if (section === "skills") return <div className="mt-4 flex flex-wrap gap-2">{site.skills.map((s) => <span key={s} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm">{s}</span>)}</div>;
  if (section === "contact") return <div className="mt-4 grid gap-2 sm:grid-cols-3"><a href={site.socials.email} className="rounded-2xl border border-[var(--line)] p-4 hover:bg-[var(--hover)]"><Mail className="mb-2 h-4 w-4" />Email</a><a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="rounded-2xl border border-[var(--line)] p-4 hover:bg-[var(--hover)]"><Linkedin className="mb-2 h-4 w-4" />LinkedIn</a><a href={site.socials.github} target="_blank" rel="noreferrer" className="rounded-2xl border border-[var(--line)] p-4 hover:bg-[var(--hover)]"><Github className="mb-2 h-4 w-4" />GitHub</a></div>;
  return <div className="mt-4 space-y-3 text-[15px] leading-7 text-[var(--muted)]">{site.about.map((p) => <p key={p}>{p}</p>)}</div>;
}

export function ChatPortfolio() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [dark, setDark] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const started = messages.length > 0;

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}rem`;
    document.documentElement.classList.toggle("light", !dark);
  }, [fontScale, dark]);

  const ask = (value: string) => {
    const text = value.trim();
    if (!text || isTyping) return;
    const answer = answerFor(text);
    const userId = nextId.current++;
    const assistantId = nextId.current++;
    setMessages((m) => [...m, { id: userId, role: "user", text }, { id: assistantId, role: "assistant", text: "", typing: true, section: answer.section, project: answer.project, decision: answer.decision }]);
    setInput("");
    setIsTyping(true);
    setMessages((m) => m.map((msg) => msg.id === assistantId ? { ...msg, section: answer.section, project: answer.project, decision: answer.decision } : msg));
    const fullText = answer.text || "I can help with that.";
    let index = 0;
    const timer = window.setInterval(() => {
      index = Math.min(fullText.length, index + Math.max(1, Math.ceil(fullText.length / 70)));
      setMessages((m) => m.map((msg) => msg.id === assistantId ? { ...msg, text: fullText.slice(0, index), typing: index < fullText.length } : msg));
      if (index >= fullText.length) { window.clearInterval(timer); setIsTyping(false); }
    }, 22);
  };

  const sidebar = useMemo(() => (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-[var(--line)] bg-[var(--bg)]">
      <div className="flex items-center justify-between p-3">
        <button onClick={() => { setMessages([]); setMobileOpen(false); }} className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium hover:bg-[var(--hover)]"><Sparkles className="h-4 w-4" /> New chat</button>
        <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 hover:bg-[var(--hover)] md:hidden"><X className="h-4 w-4" /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--soft)]">Index</p>
        <div className="space-y-0.5">{prompts.map(([id, label]) => <button key={id} onClick={() => { ask(label); setMobileOpen(false); }} className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-[var(--muted)] transition hover:bg-[var(--hover)] hover:text-[var(--fg)]">{label}</button>)}</div>
        <p className="mb-2 mt-7 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--soft)]">Elsewhere</p>
        <div className="space-y-0.5">{[["GitHub", site.socials.github], ["LinkedIn", site.socials.linkedin], ["Google Scholar", site.socials.googleScholar]].map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2.5 text-sm text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]">{label}</a>)}</div>
      </div>
      <div className="relative border-t border-[var(--line)] p-3">
        {settingsOpen && <div className="absolute bottom-16 left-3 right-3 z-30 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-3 shadow-2xl">
          <p className="mb-3 px-2 text-xs font-semibold">Settings</p>
          <button onClick={() => setDark((v) => !v)} className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm hover:bg-[var(--hover)]"><span className="flex items-center gap-2">{dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} Theme</span><span className="text-xs text-[var(--muted)]">{dark ? "Dark" : "Light"}</span></button>
          <div className="mt-1 rounded-xl px-2 py-2"><div className="mb-2 flex items-center gap-2 text-sm"><Type className="h-4 w-4" /> Font size</div><div className="flex gap-1">{[0.9, 1, 1.1, 1.2].map((size) => <button key={size} onClick={() => setFontScale(size)} className={`flex-1 rounded-lg px-2 py-1 text-xs ${fontScale === size ? "bg-[var(--fg)] text-[var(--bg)]" : "bg-[var(--chip)]"}`}>{Math.round(size * 100)}%</button>)}</div></div>
        </div>}
        <div className="flex items-center gap-2">
          <img src={PROFILE_IMAGE} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/profile2.jpeg?v=2"; }} alt="" className="h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{site.name}</p><p className="truncate text-xs text-[var(--muted)]">{site.location}</p></div>
          <button onClick={() => setSettingsOpen((v) => !v)} aria-label="Settings" className="rounded-lg p-2 hover:bg-[var(--hover)]"><Settings className="h-4 w-4" /></button>
        </div>
      </div>
    </aside>
  ), [isTyping, settingsOpen, dark, fontScale]);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {sidebarOpen && <div className="hidden md:block">{sidebar}</div>}
      {mobileOpen && <div className="fixed inset-0 z-50 md:hidden"><button aria-label="Close sidebar" className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />{sidebar}</div>}
      <section className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center border-b border-[var(--line)] px-3 md:px-5">
          <button className="mr-2 rounded-lg p-2 hover:bg-[var(--hover)] md:hidden" onClick={() => setMobileOpen(true)}><Menu className="h-5 w-5" /></button>
          <button aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"} className="mr-2 hidden rounded-lg p-2 hover:bg-[var(--hover)] md:block" onClick={() => setSidebarOpen((v) => !v)}>{sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}</button>
          <div className="flex items-center gap-2 text-sm font-medium"><Sparkles className="h-4 w-4 text-[var(--muted)]" /> Aravindh Portfolio</div>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} title="Copy link" className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"><Copy className="h-4 w-4" /></button>
            <button onClick={() => navigator.share?.({ title: "Aravindh Portfolio", url: window.location.href })} title="Share" className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"><Share2 className="h-4 w-4" /></button>
            <span className="ml-2 hidden items-center gap-2 text-xs text-[var(--muted)] sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Open to opportunities</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {!started ? (
            <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-5 pb-32 pt-10 text-center">
              <img src={PROFILE_IMAGE} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/profile2.jpeg?v=2"; }} alt={site.name} className="mb-6 h-16 w-16 rounded-full object-cover ring-1 ring-[var(--line)]" />
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">How can I help you explore Aravindh?</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">Ask about a project, architecture, engineering decisions, experience, technologies, or choose a conversation below.</p>
              <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">{prompts.slice(0, 6).map(([id, label]) => <button key={id} onClick={() => ask(label)} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 text-left text-sm transition hover:-translate-y-0.5 hover:bg-[var(--hover)]"><span>{label}</span><span className="mt-2 block text-xs text-[var(--soft)]">Open conversation →</span></button>)}</div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl space-y-8 px-5 py-8 pb-36">
              {messages.map((m) => m.role === "user" ? (
                <div key={m.id} className="flex justify-end"><div className="max-w-[80%] rounded-3xl bg-[var(--chip)] px-4 py-3 text-sm leading-6">{m.text}</div></div>
              ) : (
                <div key={m.id} className="group flex gap-3"><img src={PROFILE_IMAGE} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/profile2.jpeg?v=2"; }} alt="" className="mt-1 h-7 w-7 rounded-full object-cover" /><div className="min-w-0 flex-1"><p className="whitespace-pre-wrap text-[15px] leading-7">{m.text}{m.typing && <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-current align-middle" />}</p>{!m.typing && <><SectionContent section={m.section} project={m.project} decision={m.decision} onDecision={ask} />{m.text && <MessageActions text={m.text} />}</>}</div></div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)] to-transparent px-4 pb-5 pt-10">
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2 shadow-2xl">
            <button type="button" title="Add" className="hidden rounded-xl p-2 text-[var(--muted)] hover:bg-[var(--hover)] sm:block"><Plus className="h-4 w-4" /></button>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message Aravindh Portfolio..." className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-[var(--soft)]" />
            <button type="submit" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--fg)] text-[var(--bg)] disabled:opacity-40" disabled={!input.trim() || isTyping}><ArrowUp className="h-4 w-4" /></button>
          </form>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-[var(--soft)]">Portfolio chat · Explore projects, decisions, experience, and engineering work</p>
        </div>
      </section>
    </div>
  );
}
