import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Copy,
  Check,
  ChevronDown,
  Terminal,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
  Mail,
  MapPin,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  X,
  Menu,
  Sun,
  Moon,
  Bot,
  User,
  Share2,
  Send,
  MessageSquare,
  ShieldCheck,
  Database,
  Workflow,
  GraduationCap,
  BriefcaseBusiness,
  Layers3,
  Github,
  Linkedin,
  RotateCcw,
  Play,
  SlidersHorizontal,
  Shield,
  Zap,
  GitCompare,
  ChevronRight,
  Info,
  Eye
} from "lucide-react";
import { site, type Project } from "@/config/site";
import { projectKnowledge } from "@/config/projectKnowledge";
import { useVisitor } from "@/context/VisitorContext";
import { useTheme } from "@/components/theme-provider";
import {
  LinkedInIcon,
  GitHubIcon,
  MediumIcon,
  GoogleScholarIcon,
  MailIcon,
} from "@/components/icons";

// Helper function for conditional class names
function cx(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// Supermemory signature asterisk mark
export function SupermemoryMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}

// Partner / Stack Vector Logos for Aravindh's real stack
function OpenAILogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="OpenAI">
      <path d="M22.28 9.37a5.98 5.98 0 0 0-.5-4.48 6.09 6.09 0 0 0-5.74-3.15 6 6 0 0 0-4.28 1.83 5.98 5.98 0 0 0-7.87 2.76 6.09 6.09 0 0 0-.8 6.47 5.98 5.98 0 0 0 .5 4.48 6.09 6.09 0 0 0 5.74 3.15 6 6 0 0 0 4.28-1.83 5.98 5.98 0 0 0 7.87-2.76 6.09 6.09 0 0 0 .8-6.47zM12 14.5a2.5 2.5 0 1 1 2.5-2.5 2.5 2.5 0 0 1-2.5 2.5z" />
    </svg>
  );
}

function AnthropicLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Anthropic Claude">
      <path d="M13.82 2.5h-3.64L4 21.5h3.64l1.82-5.46h5.08l1.82 5.46H20L13.82 2.5zm-3.3 10.66l1.48-4.44 1.48 4.44h-2.96z" />
    </svg>
  );
}

function CursorLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Cursor">
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-8.5-4.25v7.5L12 21.5l8.5-7.25v-7.5L12 11z" />
    </svg>
  );
}

function NextjsLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Next.js">
      <path d="M12 2L2 20h20L12 2z" />
    </svg>
  );
}

function PythonLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Python">
      <path d="M11.9 2c-3.1 0-5 1.5-5 3.5v1.8h5v.7H4.4C2.5 8 1 9.8 1 12.3s1.5 4.3 3.4 4.3h1.7v-2.3c0-2 1.9-3.7 4.9-3.7h5.1V8.8c0-2-1.9-3.8-5-3.8h-4.2V2zm5.7 3.2c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm-5.5 6.5h-5.1v1.8c0 2 1.9 3.8 5 3.8h4.2v3c3.1 0 5-1.5 5-3.5v-1.8h-5v-.7h7.5c1.9 0 3.4-1.8 3.4-4.3s-1.5-4.3-3.4-4.3h-1.7v2.3c0 2-1.9 3.7-4.9 3.7zm-5.7 6.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
    </svg>
  );
}

function QdrantLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Qdrant">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      <polygon points="12,6 17,15 7,15" fill="currentColor" />
    </svg>
  );
}

// Lightweight rich text renderer for AI responses with bolding, links, and code
function FormattedAgentText({ text, dark }: { text: string; dark: boolean }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2 leading-relaxed text-xs sm:text-sm">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        const isBullet = line.trim().startsWith("• ") || line.trim().startsWith("- ");
        const content = isBullet ? line.trim().replace(/^[•\-]\s*/, "") : line;

        const parts: React.ReactNode[] = [];
        let remaining = content;
        let key = 0;

        while (remaining.length > 0) {
          const linkMatch = remaining.match(/^\[(.*?)\]\((.*?)\)/);
          if (linkMatch) {
            parts.push(
              <a
                key={key++}
                href={linkMatch[2]}
                target="_blank"
                rel="noreferrer"
                className="text-[#0066ff] underline underline-offset-2 hover:opacity-85 font-medium inline-flex items-center gap-0.5"
              >
                {linkMatch[1]}
                <ArrowUpRight size={11} className="inline shrink-0" />
              </a>
            );
            remaining = remaining.slice(linkMatch[0].length);
            continue;
          }

          const boldMatch = remaining.match(/^\*\*(.*?)\*\*/);
          if (boldMatch) {
            parts.push(
              <strong key={key++} className={dark ? "text-white font-semibold" : "text-neutral-950 font-semibold"}>
                {boldMatch[1]}
              </strong>
            );
            remaining = remaining.slice(boldMatch[0].length);
            continue;
          }

          const codeMatch = remaining.match(/^`([^`]+)`/);
          if (codeMatch) {
            parts.push(
              <code
                key={key++}
                className={cx(
                  "px-1.5 py-0.5 rounded text-[11px] font-mono",
                  dark ? "bg-neutral-800 text-neutral-200" : "bg-neutral-200 text-neutral-800"
                )}
              >
                {codeMatch[1]}
              </code>
            );
            remaining = remaining.slice(codeMatch[0].length);
            continue;
          }

          const nextSpecial = remaining.search(/(\*\*|`|\[)/);
          if (nextSpecial === -1) {
            parts.push(remaining);
            break;
          } else if (nextSpecial === 0) {
            parts.push(remaining[0]);
            remaining = remaining.slice(1);
          } else {
            parts.push(remaining.slice(0, nextSpecial));
            remaining = remaining.slice(nextSpecial);
          }
        }

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-1">
              <span className="text-[#0066ff] font-bold mt-1 text-xs">•</span>
              <div className="flex-1">{parts}</div>
            </div>
          );
        }

        return <p key={lineIdx}>{parts}</p>;
      })}
    </div>
  );
}

// Grounded Conversational AI Agent reasoning engine for Aravindh's portfolio
function generateAgentResponse(query: string): string {
  const q = query.toLowerCase().trim();
  const clean = q.replace(/[?!.,;:']/g, "").trim();
  const words = clean.split(/\s+/);

  // 1. Natural Conversational Greetings: "hi", "hello", "hey", "yo", "sup", etc.
  const greetingWords = [
    "hi", "hello", "hey", "heyy", "heya", "hiya", "yo", "sup", "hola",
    "namaste", "howdy", "wassup", "greetings"
  ];
  const isGreeting =
    greetingWords.includes(clean) ||
    greetingWords.some((w) => clean.startsWith(w + " ")) ||
    clean === "good morning" ||
    clean === "good evening" ||
    clean === "good afternoon" ||
    clean.startsWith("hey there") ||
    clean.startsWith("hi there") ||
    clean.startsWith("hello there");

  if (isGreeting) {
    return (
      `Hey there! 👋 Great to meet you. I'm **Aravindh AI**, an autonomous agent trained directly on Aravindh's engineering portfolio and project knowledge graph.\n\n` +
      `I can tell you everything about his work:\n` +
      `• **Flagship Projects**: **CIEAV** (the commit layer for the internet), **openDev** (autonomous company operator), or **Looca** (real-time voice AI agent)\n` +
      `• **Tech Stack**: React, Next.js, TypeScript, Python, FastAPI, PyTorch, Qdrant, Docker\n` +
      `• **Career & Experience**: His engineering journey at Loam AI, Nuclei Tech Solutions, and Perspectiv Labs\n` +
      `• **Contact & Hiring**: How to book a call, discuss a role, or grab his resume\n\n` +
      `What would you like to explore? Feel free to ask anything!`
    );
  }

  // 2. Casual Pleasantries: "how are you", "how's it going", "what's up", etc.
  if (
    clean.includes("how are you") ||
    clean.includes("how r u") ||
    clean.includes("how do you do") ||
    clean.includes("hows it going") ||
    clean.includes("how is it going") ||
    clean.includes("whats up") ||
    clean.includes("what is up") ||
    clean.includes("how is your day")
  ) {
    return (
      `I'm running in top condition! ⚡ All systems operational, zero cloud credential leakage, and Aravindh's deterministic knowledge base is hot and ready.\n\n` +
      `How can I help you today? You can ask about Aravindh's software architectures, tech stack, or how to get in touch with him.`
    );
  }

  // 3. Gratitude & Affirmations: "thanks", "thank you", "cool", "awesome", "great"
  if (
    clean === "thanks" ||
    clean === "thank you" ||
    clean === "thx" ||
    clean.startsWith("thank you") ||
    clean.startsWith("thanks") ||
    clean === "appreciate it" ||
    clean === "awesome" ||
    clean === "cool" ||
    clean === "great" ||
    clean === "perfect" ||
    clean === "nice" ||
    clean === "good"
  ) {
    return (
      `You're very welcome! 😊 Glad I could help. If you have any more questions about Aravindh's codebases, systems, or availability, just ask away!`
    );
  }

  // 4. Goodbyes: "bye", "goodbye", "cya", "see you"
  if (
    clean === "bye" ||
    clean === "goodbye" ||
    clean === "cya" ||
    clean === "see you" ||
    clean.startsWith("bye") ||
    clean.startsWith("goodbye")
  ) {
    return (
      `Goodbye! Thanks for exploring Aravindh's portfolio. You can connect with him anytime via email at [aravindh1653@gmail.com](mailto:aravindh1653@gmail.com) or book a chat on [Cal.com](https://cal.com/aravindhan-b-n2l0be/aravindh-cal?user=aravindhan-b-n2l0be&overlayCalendar=true). Have a wonderful day!`
    );
  }

  // 5. Identity: "who are you", "what is this", "are you real", "who made you"
  if (
    clean.includes("who are you") ||
    clean.includes("what are you") ||
    clean.includes("who made you") ||
    clean.includes("who built you") ||
    clean.includes("who created you") ||
    clean.includes("are you an ai") ||
    clean.includes("are you real")
  ) {
    return (
      `I am **Aravindh AI**, an autonomous conversational agent engineered to represent **Aravindh B** and his engineering work.\n\n` +
      `• **My Architecture**: I'm grounded directly in Aravindh's real project specifications, system diagrams, and career documentation.\n` +
      `• **My Purpose**: To give developers, hiring managers, and collaborators instant, accurate answers about his code, design decisions, and engineering availability without generic AI hallucinations.\n\n` +
      `Would you like to know more about Aravindh or explore one of his flagship systems like **CIEAV** or **openDev**?`
    );
  }

  // 6. Help / Capabilities: "help", "what can you do"
  if (clean === "help" || clean.includes("what can you do") || clean.includes("what do you know") || clean === "menu" || clean === "features") {
    return (
      `Here is what you can ask me about:\n\n` +
      `1. **Projects**: "How does CIEAV work?", "What is openDev?", "Tell me about Looca Voice AI", "What is Octic?"\n` +
      `2. **Tech Stack**: "What is your stack?", "Does Aravindh know Python?", "How much React experience does he have?"\n` +
      `3. **Experience**: "Where has he worked?", "Tell me about Loam AI", "Tell me about Nuclei Tech Solutions"\n` +
      `4. **Hiring & Contact**: "How can I hire him?", "What is his email?", "Can I see his resume?"\n` +
      `5. **Philosophy**: "What is his engineering philosophy?"\n\n` +
      `Ask me anything in plain English!`
    );
  }

  // 7. Resume / CV
  if (clean.includes("resume") || clean.includes("cv") || clean.includes("curriculum vitae")) {
    return (
      `**Aravindh's Resume**:\n\n` +
      `• You can view and download his complete PDF resume here: [View Online Resume (Google Drive)](https://drive.google.com/file/d/1eJR2RSZysk11_ITz_iz11MnL-SmAE1kk/view)\n\n` +
      `It outlines his full career history, engineering leadership at Loam AI, freelance work at Nuclei Tech Solutions, and production project portfolio.`
    );
  }

  // 8. Location / Timezone
  if (clean.includes("where") && (clean.includes("live") || clean.includes("from") || clean.includes("located") || clean.includes("based") || clean.includes("aravindh"))) {
    return (
      `Aravindh is based in **Bengaluru, India** (Timezone: IST / UTC+5:30).\n\n` +
      `He works seamlessly across global time zones (US, Europe, APAC) and is available for remote or on-site engineering roles.`
    );
  }

  // 9. Specific Technology checks: Python, React, Next.js, TypeScript, etc.
  if (words.includes("python")) {
    return (
      `Yes! **Python** is one of Aravindh's core languages. He uses Python extensively for:\n\n` +
      `• **AI & Agent Runtimes**: openDev (Playwright + Qwen planning), Octic AI framework, and RAG pipelines.\n` +
      `• **Backend APIs**: High-performance asynchronous services using **FastAPI**.\n` +
      `• **ML & Neural Modeling**: PyTorch, MLP-Mixer architectures at Nuclei Tech Solutions, and embeddings processing with Qdrant.`
    );
  }

  if (words.includes("react") || words.includes("nextjs") || words.includes("next.js") || words.includes("frontend")) {
    return (
      `Yes! Aravindh has deep production expertise with **React & Next.js**:\n\n` +
      `• Architected and shipped an end-to-end B2B freight forwarding platform from scratch in Next.js, React, and TypeScript at Loam AI.\n` +
      `• Expert in modern React architecture, SSR/SSG, Tailwind CSS, component modularity, and real-time state management with zero UI junk.`
    );
  }

  // 10. CIEAV
  if (clean.includes("cieav") || clean.includes("commit layer") || (clean.includes("commit") && clean.includes("internet"))) {
    return (
      `**CIEAV (Commit Interface for Explicit Action Verification)** is the commit layer for the internet.\n\n` +
      `• **Core Purpose**: Acts as an always-on local control plane between digital intent and consequence. It keeps deterministic safety and ultimate authority local on your computer, while cloud AI models provide privacy-reduced semantic interpretation.\n` +
      `• **Architecture**: Human/AI intent -> local Gateway -> deterministic safety -> privacy reduction -> cloud semantic interpretation -> conservative local merge -> policy engine -> Preview/Commit/Cancel -> Ed25519 signed receipt -> local outcome observer -> verified Undo.\n` +
      `• **Engineering Depth**: Built with Node.js, Python, Chrome extension, IBM Granite, Ed25519 cryptographic signing, and TLS. Separates transaction commit from actual real-world success.\n` +
      `• **Live Application**: [cieav.vercel.app](https://cieav.vercel.app/)\n` +
      `• **GitHub Source**: [github.com/Aravindh-dev12/cieav](https://github.com/Aravindh-dev12/cieav)`
    );
  }

  // 10.5. NSJ ERP
  if (clean.includes("nsj") || clean.includes("niti shah") || clean.includes("nitishah") || clean.includes("jewelry erp") || (clean.includes("jewelry") && clean.includes("erp"))) {
    return (
      `**NSJ ERP System** is a production-ready, full-stack Enterprise Resource Planning platform tailored for jewelry manufacturing and retail (Niti Shah Jewels).\n\n` +
      `• **Core Capabilities**: End-to-end accounting vouchers & invoices, customer & sales workflows, gold & gemstone inventory tracking, manufacturing jobs, and multi-domain AI agents.\n` +
      `• **AI Agent Layer**: Intelligent agents assist employees in product management, accounting, vendor tracking, inventory, sales, production, and automated reporting via natural language.\n` +
      `• **Engineering Stack**: Django REST Framework, Next.js 14, TypeScript, PostgreSQL, Tailwind CSS, shadcn/ui, Docker, AI Agents.\n` +
      `• **Live Business Showcase**: [Instagram @nitishahjewels](https://www.instagram.com/nitishahjewels/)\n` +
      `• **GitHub Source**: [github.com/Aravindh-dev12/NSJ-ERP](https://github.com/Aravindh-dev12/NSJ-ERP)`
    );
  }

  // 10.6. Suspire (Sustainable Marketplace)
  if (clean.includes("suspire") || clean.includes("sustainable") || clean.includes("curated brand") || clean.includes("vegan") || clean.includes("cruelty-free") || clean.includes("eco-friendly")) {
    return (
      `**Suspire** is India's premier conscious e-commerce marketplace dedicated to sustainable, eco-friendly living.\n\n` +
      `• **Marketplace Scale**: The curated home of **400+ sustainable brands**, **800+ vendor partners**, and **2,000+ active customers**.\n` +
      `• **Product Categories**: Eco-friendly, vegan, and cruelty-free fashion, cosmetics, home decor, food & beverages, and conscious lifestyle essentials.\n` +
      `• **Engineering Depth**: Engineered full-stack merchant onboarding pipelines, dynamic catalog search, high-throughput checkout workflows, and resilient order fulfillment.\n` +
      `• **Live Application**: [suspire.in](https://suspire.in/)\n` +
      `• **Tech Stack**: Next.js, React, TypeScript, Node.js, PostgreSQL, Tailwind CSS.`
    );
  }

  // 10.7. SCADA & Enterprise Clients (Naga Ltd & Surya Batteries)
  if (clean.includes("scada") || clean.includes("naga") || clean.includes("surya") || clean.includes("case study") || clean.includes("solar dashboard")) {
    return (
      `**Industrial SCADA & Telemetry Services** (Nuclei Tech Solutions):\n\n` +
      `Aravindh architected industrial-grade SCADA telemetry, automated monitoring, and production web applications for major enterprises:\n\n` +
      `• **Naga Private Limited**: SCADA services and high-reliability operational telemetry for large-scale milling and food manufacturing industrial facilities.\n` +
      `• **Surya Batteries**: Battery performance telemetry, automated testing, and energy storage SCADA systems.\n` +
      `• **5+ Production Web Dashboards**: Built real-time monitoring systems for solar plants and windmills with high-frequency IoT streaming and instant anomaly alerts.\n` +
      `• **Live Case Study**: Explore the production [Solar SCADA Case Study](https://www.nucleitech.online/case-study-solar.html)\n` +
      `• **Renewable CRM**: Custom enterprise platform actively serving **100+ daily operational users**.`
    );
  }

  // 10.8. Propecare Energy Care
  if (clean.includes("propecare") || clean.includes("propercare") || clean.includes("energy care") || clean.includes("epc")) {
    return (
      `**Propecare Energy Care** is a renewable-energy EPC and power evacuation platform.\n\n` +
      `• **Live Production Website**: [propecare.com](https://propecare.com/)\n` +
      `• **Live Demo on Vercel**: [propcare-epc.vercel.app](https://propcare-epc.vercel.app/)\n` +
      `• **GitHub Source**: [github.com/Aravindh-dev12/Propecare](https://github.com/Aravindh-dev12/Propecare)\n` +
      `• **Engineering Stack**: React, TypeScript, Vite, React Router, Tailwind CSS.\n` +
      `• **Core Capabilities**: Turnkey renewable EPC services, power evacuation, grid connectivity, transmission line design, substation testing, commissioning, and O&M.`
    );
  }

  // 11. openDev
  if (clean.includes("opendev") || clean.includes("open dev") || clean.includes("company operator") || clean.includes("invoice") || (clean.includes("erp") && clean.includes("operator"))) {
    return (
      `**openDev** is a local autonomous company operator with deterministic guardrails.\n\n` +
      `• **Core Concept**: Handles complex enterprise operations (such as invoice intake, purchase orders, and accounting workflows) without blindly trusting LLM claims.\n` +
      `• **Architecture**: Company request -> SOP retrieval with BM25 -> local model planning (Qwen via Ollama) -> one tool action at a time -> deterministic YAML policy engine -> Playwright browser/file execution -> hash-chained audit logs -> independent ERP invariant verification -> repair feedback.\n` +
      `• **Safety Principle**: An independent verifier validates actual Flask ERP database state and invariants instead of trusting the agent's textual claims.\n` +
      `• **Engineering Stack**: Python, Qwen, Ollama, Playwright, Flask ERP, BM25, YAML policy, hash-chained audit logs.\n` +
      `• **GitHub Source**: [github.com/Aravindh-dev12/opendev](https://github.com/Aravindh-dev12/opendev)`
    );
  }

  // 12. Looca
  if (clean.includes("looca") || clean.includes("voice") || clean.includes("speech")) {
    return (
      `**Looca Voice AI Agent** is an end-to-end voice-first conversational AI platform with deep episodic memory.\n\n` +
      `• **Architecture**: Next.js frontend -> FastAPI backend -> PostgreSQL application state, Qdrant semantic memory, Redis predictive preloading, and VAPI voice orchestration.\n` +
      `• **Capabilities**: Real-time natural voice conversations, semantic memory retrieval, emotion analysis, causal reasoning, health trajectory workflows, and automated service ingestion.\n` +
      `• **Engineering**: Next.js, TypeScript, FastAPI, PostgreSQL, Qdrant, Redis, VAPI, Claude, Voyage embeddings, SQLAlchemy, asyncpg.`
    );
  }

  // 13. Octic AI
  if (clean.includes("octic") || clean.includes("workforce") || clean.includes("multi-agent") || clean.includes("multi agent")) {
    return (
      `**Octic AI Agent** is an autonomous AI workforce framework engineered for deterministic tool execution.\n\n` +
      `• **Architecture**: Context -> Harness -> Loop -> Graph -> Managed runtime, cleanly isolating planning, tool execution, and memory into inspectable layers.\n` +
      `• **Capabilities**: Research, coding, multi-agent swarms, Model Context Protocol (MCP) tool integration, and model routing.\n` +
      `• **Engineering**: Python, MCP, RAG, multi-agent orchestrator, persistent memory.`
    );
  }

  // 14. Oundnote
  if (clean.includes("oundnote") || clean.includes("diarization") || clean.includes("meeting assistant")) {
    return (
      `**Oundnote** is a private, local-first AI meeting assistant with offline RAG and speaker diarization.\n\n` +
      `• **Architecture**: Audio capture -> modular transcription -> diarization & voice matching -> analysis -> SQLite FTS5 -> local retrieval & MCP.\n` +
      `• **Sovereign Privacy**: 100% sovereign. Audio recordings, transcripts, and model files remain strictly local on user hardware.\n` +
      `• **Engineering**: Python, whisper.cpp, SQLite FTS5, modular workers, MCP.`
    );
  }

  // 15. Oli
  if (clean.includes("oli") || clean.includes("notch") || clean.includes("copilot")) {
    return (
      `**Oli** is a sovereign notch-resident ambient meeting copilot.\n\n` +
      `• **Architecture**: Electron shell -> native macOS audio capture -> persistent Rust whisper.cpp -> local Express API -> SQLite FTS5 -> local AI & MCP -> protected notch HUD.\n` +
      `• **Capabilities**: Ambient meeting HUD, real-time local transcription, commitments extraction, MEDDPICC battlecards, and local search.\n` +
      `• **Engineering**: Electron, Rust, whisper.cpp, ScreenCaptureKit, SQLite FTS5, SSE, MCP.`
    );
  }

  // 16. Tech Stack / Skills
  if (clean.includes("stack") || clean.includes("skill") || clean.includes("tech") || clean.includes("language") || clean.includes("framework") || clean.includes("tools")) {
    return (
      `**Aravindh's Core Engineering Stack**:\n\n` +
      `• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, WebSockets\n` +
      `• **Backend & APIs**: Node.js, Python, FastAPI, Express, Spring Boot, REST, GraphQL\n` +
      `• **AI & Agent Systems**: LangChain, Ollama, PyTorch, RAG Pipelines, Model Context Protocol (MCP), IBM Granite, Qwen, Transformers, VAPI\n` +
      `• **Databases & Vector Stores**: PostgreSQL, Qdrant (Vector DB), SQLite (FTS5), Redis, Supabase, Drizzle ORM, SQLAlchemy\n` +
      `• **DevOps & Cloud**: Docker, CI/CD pipelines, Git/GitHub, Linux, Vercel, Render, AWS`
    );
  }

  // 17. Experience / Career Timeline
  if (clean.includes("experience") || clean.includes("job") || clean.includes("work") || clean.includes("career") || clean.includes("company") || clean.includes("nuclei") || clean.includes("loam") || clean.includes("perspectiv") || clean.includes("client")) {
    return (
      `**Aravindh's Professional Engineering Experience**:\n\n` +
      `1. **Nuclei Tech Solutions** (Jun 2026 – Present) · *Software Developer (Freelance)*\n` +
      `   • Architected, built, and delivered **5+ full-stack production web applications** from scratch—explore the live [Solar SCADA Case Study](https://www.nucleitech.online/case-study-solar.html).\n` +
      `   • Engineered industrial **SCADA telemetry systems & automation** for top industrial clients including **Naga Private Limited** and **Surya Batteries**.\n` +
      `   • Deployed **live real-time monitoring dashboards** for solar power plants and windmill installations, streaming high-frequency IoT telemetry and instant fault alerts.\n` +
      `   • Designed an **enterprise CRM application** actively serving **100+ daily operational users** across renewable energy operations.\n` +
      `   • Embedded on-premise ERP telemetry acquisition with zero data loss, and implemented lightweight MLP-Mixer neural models for edge anomaly detection.\n\n` +
      `2. **Loam AI** (Feb 2026 – Jun 2026) · *AI Engineer*\n` +
      `   • Engineered core full-stack platform features and vendor infrastructure for **[Suspire](https://suspire.in/)**—India's home of **400+ sustainable curated brands**, **800+ vendors**, and **2,000+ customers** across eco-friendly fashion, cosmetics, and food.\n` +
      `   • Architected and shipped the **[NSJ ERP System](https://www.instagram.com/nitishahjewels/)** for Niti Shah Jewels, an enterprise jewelry ERP centralizing manufacturing, gold/gemstone inventory, accounting, and multi-domain AI agents.\n` +
      `   • Built and launched a full-stack B2B freight-forwarding product from scratch (MVP delivered in 5 months).\n` +
      `   • Architected modular stack: React, Next.js, TypeScript, PostgreSQL, Drizzle ORM, RBAC auth, CI/CD, and led a team of 5 developers.\n\n` +
      `3. **Perspectiv Labs** (Jul 2024 – Feb 2026) · *Software Developer*\n` +
      `   • Built modular full-stack systems, onboarding tours, currency conversions, PWA push notifications, and deployment pipelines.`
    );
  }

  // 18. Education
  if (clean.includes("education") || clean.includes("college") || clean.includes("degree") || clean.includes("university") || clean.includes("study") || clean.includes("school")) {
    return (
      `**Education**:\n\n` +
      `• **Degree**: Bachelor of Engineering (B.E.) in Computer Science & Engineering\n` +
      `• **Institution**: Chettinad College of Engineering and Technology, Karur, Tamil Nadu\n` +
      `• **Duration**: Aug 2020 – Jun 2024`
    );
  }

  // 19. Contact / Hire / Booking / Collaboration
  if (clean.includes("contact") || clean.includes("hire") || clean.includes("email") || clean.includes("reach") || clean.includes("call") || clean.includes("booking") || clean.includes("available") || clean.includes("collaborat") || clean.includes("work with")) {
    return (
      `**How to Connect with Aravindh**:\n\n` +
      `• **Email**: [aravindh1653@gmail.com](mailto:aravindh1653@gmail.com)\n` +
      `• **Schedule a Call**: [cal.com/aravindhan-b-n2l0be](https://cal.com/aravindhan-b-n2l0be/aravindh-cal?user=aravindhan-b-n2l0be&overlayCalendar=true)\n` +
      `• **GitHub**: [github.com/Aravindh-dev12](https://github.com/Aravindh-dev12)\n` +
      `• **LinkedIn**: [linkedin.com/in/aravindhanb](https://www.linkedin.com/in/aravindhanb/)\n` +
      `• **Resume**: [View Online Resume](https://drive.google.com/file/d/1eJR2RSZysk11_ITz_iz11MnL-SmAE1kk/view)\n` +
      `• **Status**: Actively available for full-time engineering roles, AI system architecture, and consulting.`
    );
  }

  // 20. Projects Overview
  if (clean.includes("project") || clean.includes("built") || clean.includes("portfolio") || clean.includes("products")) {
    return (
      `**Aravindh's Flagship Engineering Projects**:\n\n` +
      `1. **CIEAV**: The commit layer for the internet (Ed25519 signing + IBM Granite + local authority) ([cieav.vercel.app](https://cieav.vercel.app/)).\n` +
      `2. **openDev**: Local autonomous company operator with deterministic ERP verification.\n` +
      `3. **NSJ ERP System**: Jewelry enterprise ERP platform with multi-domain AI agents ([live on Instagram](https://www.instagram.com/nitishahjewels/)).\n` +
      `4. **Suspire**: Conscious e-commerce marketplace for 400+ sustainable brands, 800+ vendors, 2,000+ customers ([suspire.in](https://suspire.in/)).\n` +
      `5. **Looca Voice AI**: Real-time voice agent with Qdrant episodic memory.\n` +
      `6. **Octic AI Agent**: Autonomous AI workforce framework for inspectable tool execution.\n` +
      `7. **Oundnote**: Local-first private meeting assistant with offline RAG & speaker diarization.\n` +
      `8. **Oli**: Sovereign notch-resident meeting copilot with Rust whisper.cpp.\n` +
      `9. **CLI Smart Inbox Agent**: Enterprise email & OCR workflow with provenance tracking.\n\n` +
      `Which project would you like to explore deeper?`
    );
  }

  // 21. Bio / Who is Aravindh
  if (clean.includes("aravindh") || clean.includes("about") || clean.includes("bio") || clean.includes("background") || clean.includes("yourself")) {
    return (
      `**Aravindh B** is a **Full Stack & AI Engineer** based in Bengaluru, India.\n\n` +
      `• **Core Focus**: Building end-to-end products across modern web stacks and intelligent AI systems, with rigorous engineering, robust UX, and dependable delivery.\n` +
      `• **Engineering Tenet**: *\"Simplicity is prerequisite for reliability\"* — Edsger W. Dijkstra.\n` +
      `• **Key Strengths**: Full-stack application architecture (React, Next.js, Node, Python), agentic workflows, deterministic guardrails, and local-first sovereign AI.\n` +
      `• **Location**: Bengaluru, India (Asia/Kolkata).\n` +
      `• **Status**: Open to opportunities.`
    );
  }

  // 22. Conversational fallback (Warm, helpful, non-robotic)
  return (
    `I'd love to help with that! As Aravindh's portfolio AI, I'm specialized in his software systems, engineering architectures, and career.\n\n` +
    `Here are great topics you can ask me about:\n` +
    `• **"How does CIEAV work?"** (The commit layer for the internet)\n` +
    `• **"What is openDev?"** (Autonomous company operator with ERP verification)\n` +
    `• **"What is his tech stack?"** (React, Next.js, Python, FastAPI, AI/ML)\n` +
    `• **"Show work experience"** (Loam AI, Nuclei Tech Solutions, Perspectiv Labs)\n` +
    `• **"How can I hire him?"** (Email, Cal.com booking, LinkedIn)\n\n` +
    `What would you like to know?`
  );
}

// Asynchronous resolver that blends instant verified portfolio knowledge with live dynamic AI completions
async function resolveAgentResponse(query: string): Promise<string> {
  const localMatch = generateAgentResponse(query);

  // If local response is a specific matched intent (not the generic fallback), return it!
  const isFallback = localMatch.startsWith("I'd love to help with that! As Aravindh's portfolio AI");
  if (!isFallback) {
    await new Promise((r) => setTimeout(r, 280));
    return localMatch;
  }

  // For open-ended general queries, code generation, or creative questions, query live AI with portfolio system prompt!
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const systemPrompt = "You are Aravindh AI, personal autonomous assistant of Aravindh B (Full Stack & AI Engineer from Bengaluru). Answer helpfully, naturally, and concisely with markdown formatting.";
    const encodedPrompt = encodeURIComponent(`${query} (system: ${systemPrompt})`);
    const res = await fetch(`https://text.pollinations.ai/${encodedPrompt}`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 4 && text.trim() !== "{}") {
        return text.trim();
      }
    }
  } catch {
    // If network fails or times out, fallback gracefully
  }

  await new Promise((r) => setTimeout(r, 280));
  return localMatch;
}

// ============================================================================
// SUPERMEMORY-STYLE ANIMATED IN-BETWEEN BOXES
// ============================================================================

// 1. Interactive Animated Memory Graph & Context Network
function MemoryGraphBox({ dark }: { dark: boolean }) {
  const [selectedNode, setSelectedNode] = useState<string>("cieav");
  const nodes = [
    { id: "cieav", label: "CIEAV Commit Layer", x: 60, y: 55, detail: "Local authority & Ed25519 cryptographic receipts", tag: "GATEWAY" },
    { id: "granite", label: "IBM Granite Gate", x: 200, y: 25, detail: "Privacy reduction & semantic interpretation", tag: "LLM" },
    { id: "ed25519", label: "Ed25519 Local Key", x: 340, y: 55, detail: "Zero cloud credential leakage, keys stay local", tag: "SECURITY" },
    { id: "opendev", label: "openDev ERP Engine", x: 340, y: 145, detail: "Independent system-of-record invariant verifier", tag: "OPERATOR" },
    { id: "qdrant", label: "Qdrant Vector DB", x: 200, y: 175, detail: "Episodic memory & semantic retrieval store", tag: "MEMORY" },
    { id: "observer", label: "Outcome Observer", x: 60, y: 145, detail: "Post-execution verification & verified undo", tag: "AUDIT" },
  ];

  const activeInfo = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className={cx(
      "relative rounded-xl border p-5 my-8 transition-all overflow-hidden",
      dark ? "bg-[#0b0c10] border-neutral-800 text-neutral-100" : "bg-neutral-50/80 border-neutral-200 text-neutral-900"
    )}>
      {/* 4 Corner Crosshairs (Supermemory signature design) */}
      <span className="absolute -top-2.5 -left-1 font-mono text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -top-2.5 -right-1 font-mono text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -bottom-2.5 -left-1 font-mono text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -bottom-2.5 -right-1 font-mono text-[11px] text-neutral-400 select-none">+</span>

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-ping" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Interactive Memory Graph // Autonomous Context Flow
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
            LIVE GRAPH
          </span>
          <span>LATENCY: 1.8MS</span>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[400/200] max-h-[220px]">
        <svg viewBox="0 0 400 200" className="w-full h-full select-none">
          <defs>
            <filter id="mgGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid Dots */}
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />

          {/* Connecting Lines */}
          <path d="M 60 55 L 200 25 L 340 55 L 340 145 L 200 175 L 60 145 Z" fill="none" stroke={dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 60 55 L 340 145" fill="none" stroke={dark ? "rgba(0,102,255,0.25)" : "rgba(0,102,255,0.2)"} strokeWidth="1" />
          <path d="M 60 145 L 340 55" fill="none" stroke={dark ? "rgba(0,102,255,0.25)" : "rgba(0,102,255,0.2)"} strokeWidth="1" />
          <path d="M 200 25 L 200 175" fill="none" stroke={dark ? "rgba(0,102,255,0.3)" : "rgba(0,102,255,0.25)"} strokeWidth="1" />

          {/* Moving Animated Data Packets along lines */}
          <circle r="3.5" fill="#0066ff" filter="url(#mgGlow)">
            <animateMotion path="M 60 55 L 200 25 L 340 55 L 340 145 L 200 175 L 60 145 Z" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle r="2.5" fill="#38bdf8">
            <animateMotion path="M 340 145 L 200 175 L 60 145 L 60 55 L 200 25 L 340 55 Z" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle r="3" fill="#0066ff">
            <animateMotion path="M 60 55 L 340 145 M 340 145 L 60 55" dur="4.5s" repeatCount="indefinite" />
          </circle>
          <circle r="2.5" fill="#10b981">
            <animateMotion path="M 200 25 L 200 175 M 200 175 L 200 25" dur="5s" repeatCount="indefinite" />
          </circle>

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode === node.id;
            return (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className="cursor-pointer transition-transform"
              >
                {/* Outer pulse when selected */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="16"
                    fill="none"
                    stroke="#0066ff"
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? "11" : "8"}
                  fill={isSelected ? "#0066ff" : (dark ? "#18181b" : "#ffffff")}
                  stroke={isSelected ? "#38bdf8" : (dark ? "#3f3f46" : "#cbd5e1")}
                  strokeWidth="2"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="3.5"
                  fill={isSelected ? "#ffffff" : "#0066ff"}
                />
                <text
                  x={node.x}
                  y={node.y + (node.y > 100 ? 19 : -12)}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight={isSelected ? "700" : "500"}
                  fontFamily="monospace"
                  fill={isSelected ? "#0066ff" : (dark ? "#a1a1aa" : "#475569")}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Node Telemetry Detail Footer */}
      <div className={cx(
        "mt-2 p-2.5 rounded-lg border flex flex-wrap items-center justify-between gap-2 text-xs font-mono",
        dark ? "bg-neutral-900/60 border-neutral-800" : "bg-white border-neutral-200"
      )}>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-[#0066ff]/10 text-[#0066ff] font-bold text-[10px]">
            {activeInfo.tag}
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {activeInfo.label}:
          </span>
          <span className="text-neutral-600 dark:text-neutral-400 text-[11px]">
            {activeInfo.detail}
          </span>
        </div>
        <span className="text-[10px] text-neutral-400">
          [Click any node to inspect]
        </span>
      </div>
    </div>
  );
}



// 3. Interactive Telemetry Terminal Box
function TelemetryTerminalBox({ dark }: { dark: boolean }) {
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    { time: "14:16:01", component: "cieav.core", msg: "Local Ed25519 signature generated: 38bf...49a1", status: "VALID" },
    { time: "14:16:02", component: "opendev.erp", msg: "BM25 retrieved SOP-104 (Invoice Processing)", status: "BM25: 0.94" },
    { time: "14:16:03", component: "opendev.audit", msg: "Hash-chain integrity confirmed (sha256 verified)", status: "PASS" },
    { time: "14:16:04", component: "looca.qdrant", msg: "Retrieved episodic voice memory (cosine: 0.994)", status: "MATCH" },
    { time: "14:16:05", component: "granite.privacy", msg: "Out-of-band PII stripped: 0 credentials leaked", status: "SECURE" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [logs.length]);

  return (
    <div className={cx(
      "relative rounded-xl border p-4 sm:p-5 my-8 transition-all overflow-hidden font-mono",
      dark ? "bg-[#09090c] border-neutral-800 text-neutral-200" : "bg-[#f8f9fa] border-neutral-200 text-neutral-800"
    )}>
      {/* 4 Corner Crosshairs */}
      <span className="absolute -top-2.5 -left-1 text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -top-2.5 -right-1 text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -bottom-2.5 -left-1 text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -bottom-2.5 -right-1 text-[11px] text-neutral-400 select-none">+</span>

      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5 mb-3 text-xs">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#0066ff]" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            SYSTEM TELEMETRY & AUDIT STREAM
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>STREAMING 60FPS</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="space-y-1.5 text-xs">
        {logs.slice(0, logIndex + 1).map((lg, i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-1 text-[11px] leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 text-[10px]">[{lg.time}]</span>
              <span className="text-[#0066ff] font-semibold">{lg.component}</span>
              <span className="text-neutral-700 dark:text-neutral-300">→ {lg.msg}</span>
            </div>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
              {lg.status}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1 text-[#0066ff] text-xs pt-1">
          <span>&gt; awaiting next intent cycle</span>
          <span className="w-1.5 h-3.5 bg-[#0066ff] inline-block animate-pulse ml-0.5" />
        </div>
      </div>

      {/* Key Metric Gauges */}
      <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px]">
        <div>
          <span className="text-[10px] text-neutral-400 block">P99 LATENCY</span>
          <span className="font-bold text-neutral-900 dark:text-white">18.4ms</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-400 block">VERIFICATION RATE</span>
          <span className="font-bold text-emerald-500">100.0%</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-400 block">CLOUD LEAKAGE</span>
          <span className="font-bold text-[#0066ff]">0.0 bytes</span>
        </div>
      </div>
    </div>
  );
}

// 4. Autonomous Agent Runtime Matrix Box
function AgentRadarBox({ dark }: { dark: boolean }) {
  const agents = [
    { name: "CIEAV", desc: "Commit Layer for Internet", ping: "4ms", load: 24 },
    { name: "openDev", desc: "Autonomous ERP Operator", ping: "11ms", load: 45 },
    { name: "Looca", desc: "Voice AI Agent Platform", ping: "160ms", load: 68 },
    { name: "Oundnote", desc: "Sovereign Meeting Core", ping: "0ms (Offline)", load: 12 }
  ];

  return (
    <div className={cx(
      "relative rounded-xl border p-4 sm:p-5 my-8 transition-all overflow-hidden font-mono",
      dark ? "bg-[#0b0c10] border-neutral-800 text-neutral-200" : "bg-neutral-50/80 border-neutral-200 text-neutral-800"
    )}>
      {/* 4 Corner Crosshairs */}
      <span className="absolute -top-2.5 -left-1 text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -top-2.5 -right-1 text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -bottom-2.5 -left-1 text-[11px] text-neutral-400 select-none">+</span>
      <span className="absolute -bottom-2.5 -right-1 text-[11px] text-neutral-400 select-none">+</span>

      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-[#0066ff]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            AUTONOMOUS AGENT RUNTIME MATRIX
          </span>
        </div>
        <span className="text-[10px] text-neutral-400">4 / 4 WORKERS SYNCED</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {agents.map((ag) => (
          <div
            key={ag.name}
            className={cx(
              "p-3 rounded-lg border transition flex items-center justify-between gap-3",
              dark ? "bg-neutral-900/40 border-neutral-800" : "bg-white border-neutral-200"
            )}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-neutral-900 dark:text-white">{ag.name}</span>
                <span className="text-[10px] text-neutral-400">({ag.ping})</span>
              </div>
              <p className="text-[10px] text-neutral-500 mt-0.5">{ag.desc}</p>
            </div>

            {/* Mini Animated Equalizer Bar */}
            <div className="flex items-end gap-1 h-5 w-8 shrink-0">
              <span className="w-1.5 bg-[#0066ff] rounded-xs animate-pulse" style={{ height: `${ag.load * 0.4}%`, animationDuration: "1.1s" }} />
              <span className="w-1.5 bg-[#0066ff] rounded-xs animate-pulse" style={{ height: `${ag.load * 0.7}%`, animationDuration: "0.8s" }} />
              <span className="w-1.5 bg-[#0066ff] rounded-xs animate-pulse" style={{ height: `${ag.load * 0.5}%`, animationDuration: "1.4s" }} />
              <span className="w-1.5 bg-[#0066ff] rounded-xs animate-pulse" style={{ height: `${ag.load}%`, animationDuration: "0.9s" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================================
// CATEGORY DEFINITIONS & HELPER FOR PROJECTS
// ========================================================

type ProjectCategoryId = "featured" | "agents" | "research" | "fullstack" | "client";

interface CategoryMeta {
  id: ProjectCategoryId;
  label: string;
}

const PROJECT_CATEGORIES: CategoryMeta[] = [
  { id: "featured", label: "Featured" },
  { id: "agents", label: "AI & Agents" },
  { id: "research", label: "Research & ML" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "client", label: "Client Work" },
];

function isProjectInCategory(project: Project, categoryId: ProjectCategoryId): boolean {
  switch (categoryId) {
    case "featured":
      return project.featured === true && project.year !== "Client";
    case "agents":
      return [
        "openDev",
        "NSJ ERP System",
        "Octic AI Agent",
        "Looca Voice AI Agent",
        "Oundnote",
        "Oli — Sovereign Notch Meeting Copilot",
        "CLI Smart Inbox Agent"
      ].includes(project.title);
    case "research":
      return [
        "Hallucination-Resistant LLM",
        "NeuroSymbolic Meta-Reasoning Agent",
        "LWM Fabricator",
        "Distributed Transformer Training Framework"
      ].includes(project.title);
    case "fullstack":
      return [
        "CIEAV",
        "NSJ ERP System",
        "Suspire",
        "Looca Voice AI Agent",
        "Oli — Sovereign Notch Meeting Copilot",
        "CLI Smart Inbox Agent",
        "Propecare Energy Care"
      ].includes(project.title);
    case "client":
      return project.year === "Client" || project.title === "Propecare Energy Care" || project.title === "Reperto AI";
    default:
      return false;
  }
}

function renderBulletWithLinks(text: string) {
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
          className="text-[#0066ff] underline underline-offset-2 hover:opacity-85 font-medium inline-flex items-center gap-0.5"
        >
          {match[1]}
          <ArrowUpRight className="size-2.5 inline shrink-0" />
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
          className="text-[#0066ff] underline underline-offset-2 hover:opacity-85 font-medium inline-flex items-center gap-0.5"
        >
          {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          <ArrowUpRight className="size-2.5 inline shrink-0" />
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

// Clean, Responsive Project Card
function ProjectCardItem({
  project,
  dark,
  onOpenSpecs
}: {
  project: Project;
  dark: boolean;
  onOpenSpecs: () => void;
}) {
  const [tab, setTab] = useState<"overview" | "arch">("overview");
  const knowledge = projectKnowledge[project.title];

  return (
    <article
      className={cx(
        "group rounded-xl border overflow-hidden flex flex-col transition-all relative font-mono text-xs hover:-translate-y-0.5",
        dark
          ? "border-neutral-800 bg-neutral-900/30 hover:border-[#0066ff]/60 hover:shadow-[0_0_20px_rgba(0,102,255,0.06)]"
          : "border-neutral-200 bg-white hover:border-[#0066ff]/60 hover:shadow-xs"
      )}
    >
      {/* 4 Corner Crosshairs */}
      <span className="absolute -top-2 -left-0.5 text-[9px] text-neutral-400 select-none">+</span>
      <span className="absolute -top-2 -right-0.5 text-[9px] text-neutral-400 select-none">+</span>
      <span className="absolute -bottom-2 -left-0.5 text-[9px] text-neutral-400 select-none">+</span>
      <span className="absolute -bottom-2 -right-0.5 text-[9px] text-neutral-400 select-none">+</span>

      {/* Card Header with Title and Year */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#0066ff] shrink-0" />
            <h3 className="text-sm sm:text-base font-semibold font-sans text-neutral-950 dark:text-white truncate">
              {project.title}
            </h3>
          </div>
          <span className={cx(
            "font-mono text-[10px] px-2 py-0.5 rounded shrink-0",
            project.year === "Client"
              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
              : dark
                ? "bg-neutral-800 text-neutral-400"
                : "bg-neutral-100 text-neutral-600"
          )}>
            {project.year === "Client" ? "CLIENT" : project.year}
          </span>
        </div>

        {/* 2-Way Segmented Tab Switcher on Card */}
        {knowledge?.architecture && (
          <div className={cx(
            "inline-flex p-0.5 rounded border text-[10px] w-full my-2",
            dark ? "bg-neutral-950/80 border-neutral-800" : "bg-neutral-100 border-neutral-200"
          )}>
            <button
              onClick={() => setTab("overview")}
              className={cx(
                "flex-1 py-1 rounded text-center transition font-semibold",
                tab === "overview"
                  ? "bg-[#0066ff] text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
              )}
            >
              Overview
            </button>
            <button
              onClick={() => setTab("arch")}
              className={cx(
                "flex-1 py-1 rounded text-center transition font-semibold",
                tab === "arch"
                  ? "bg-[#0066ff] text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
              )}
            >
              Architecture
            </button>
          </div>
        )}

        {/* Tab Body Content */}
        <div className="min-h-[64px] text-xs">
          {tab === "overview" || !knowledge?.architecture ? (
            <p className="font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
              {project.blurb}
            </p>
          ) : (
            <div className="space-y-1">
              <span className="text-[10px] text-[#0066ff] font-bold block uppercase tracking-wider">
                DATAFLOW PIPELINE:
              </span>
              <p className="text-[11px] text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
                {knowledge.architecture}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stack Tags */}
      <div className="px-4 sm:px-5 py-2 flex flex-wrap gap-1.5 mt-auto">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className={cx(
              "font-mono text-[10px] px-2 py-0.5 rounded",
              dark ? "bg-neutral-800 text-neutral-300" : "bg-neutral-100 text-neutral-600"
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Links Bar */}
      <div className={cx(
        "px-4 sm:px-5 py-3 border-t mt-2 flex items-center justify-between text-xs font-mono",
        dark ? "border-neutral-800 bg-neutral-950/40" : "border-neutral-100 bg-neutral-50/50"
      )}>
        <div className="flex flex-wrap items-center gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="text-[#0066ff] hover:underline flex items-center gap-1 font-medium"
            >
              {project.title === "CIEAV"
                ? "Live (CIEAV)"
                : project.title === "Suspire"
                  ? "Live (Suspire)"
                  : project.title === "Propecare Energy Care"
                    ? "Live (propecare.com)"
                    : project.links.live.includes("instagram.com")
                      ? "Live (NSJ)"
                      : "Live demo"} <ArrowUpRight size={12} />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="text-[#0066ff] hover:underline flex items-center gap-1 font-medium"
            >
              Live demo (Vercel) <ArrowUpRight size={12} />
            </a>
          )}
          {project.links.source && (
            <a
              href={project.links.source}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1"
            >
              Source <ArrowUpRight size={12} />
            </a>
          )}
        </div>

        <button
          onClick={onOpenSpecs}
          className="text-neutral-400 hover:text-[#0066ff] text-[11px] font-medium"
        >
          Specs [↗]
        </button>
      </div>
    </article>
  );
}

export function SupermemoryPortfolio() {
  // Mode: "human" | "agent"
  const [mode, setMode] = useState<"human" | "agent">("human");
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const setDark = (val: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof val === "function" ? val(dark) : val;
    setTheme(next ? "dark" : "light");
  };

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [dark]);
  const { count, liveCount } = useVisitor();
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [promptDrawerOpen, setPromptDrawerOpen] = useState<boolean>(false);
  const [projectCategory, setProjectCategory] = useState<ProjectCategoryId>("featured");
  const [projectSearch, setProjectSearch] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement>(null);

  // Interactive Live Memory Simulator state for Aravindh's Knowledge Base
  const [simQuery, setSimQuery] = useState<string>("Retrieve CIEAV architecture and verification layer");
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<{
    status: string;
    score: string;
    memoryNodes: string[];
    action: string;
  }>({
    status: "READY",
    score: "0.994 COSINE SIMILARITY",
    memoryNodes: [
      "cieav/deterministic-intent-plane",
      "auth/ed25519-local-authority",
      "model/ibm-granite-privacy-layer"
    ],
    action: "Grounded dispatch to local execution plane with 0ms cloud leakage"
  });

  // Contact form state
  const [contactMessage, setContactMessage] = useState("");
  const [contactSender, setContactSender] = useState("");
  const [contactSent, setContactSent] = useState(false);

  // Interactive Agent Mode Chat state
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: "user" | "agent";
    text: string;
    timestamp: string;
  }>>([
    {
      id: "init",
      sender: "agent",
      text: "Hey! I'm **Aravindh AI**, an autonomous agent grounded in Aravindh's verified portfolio and engineering architecture.\n\nYou can chat with me about anything: his flagship systems (**CIEAV**, **openDev**, **Looca**, **Octic**), engineering stack, career timeline, or how to contact him for hire.",
      timestamp: "Just now"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showRawSpec, setShowRawSpec] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Tell me about Aravindh",
    "How does CIEAV work?",
    "What is openDev?",
    "What is your tech stack?",
    "Show work experience",
    "How can I contact or hire you?",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? chatInput).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: "u-" + Date.now(),
      sender: "user" as const,
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput("");
    setIsTyping(true);

    try {
      const responseText = await resolveAgentResponse(query);
      const agentMsg = {
        id: "a-" + Date.now(),
        sender: "agent" as const,
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages((prev) => [...prev, agentMsg]);
    } catch {
      const fallbackText = generateAgentResponse(query);
      const agentMsg = {
        id: "a-" + Date.now(),
        sender: "agent" as const,
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages((prev) => [...prev, agentMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        id: "init-" + Date.now(),
        sender: "agent",
        text: "Conversation reset! What would you like to know about Aravindh?",
        timestamp: "Just now"
      }
    ]);
  };

  useEffect(() => {
    if (mode === "agent") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping, mode]);

  // Sync dark class on body / html
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      "hero",
      "overview",
      "what-i-build",
      "projects",
      "experience",
      "skills",
      "education",
      "writing",
      "contact",
    ];

    let ticking = false;
    const updateActiveSection = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        let current = "hero";
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 240) {
              current = id;
            }
          }
        }
        setActiveSection(current);
      });
    };

    const container = mainRef.current;
    if (container) {
      container.addEventListener("scroll", updateActiveSection, { passive: true });
    }
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    updateActiveSection();

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateActiveSection);
      }
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const setupPromptText = `// ARAVINDH B — SYSTEM PROMPT & KNOWLEDGE CONTEXT
You are interacting with the official engineering portfolio of ${site.name}.
Role: ${site.role}
Location: ${site.location} (${site.timezone})
Status: ${site.status.availableText}
Tagline: "${site.tagline}"

Core Philosophy:
"${site.quote.text}" — ${site.quote.author}

Key Production Projects:
1. CIEAV: The commit layer for the internet (Ed25519, IBM Granite, local authority) (https://cieav.vercel.app/).
2. openDev: Local autonomous company operator with deterministic guardrails.
3. NSJ ERP System: Production jewelry ERP with AI agents (https://www.instagram.com/nitishahjewels/).
4. Suspire: Curated conscious marketplace for 400+ sustainable brands, 800+ vendors, 2000+ customers (https://suspire.in/).
5. Propecare Energy Care: Renewable EPC & power evacuation client platform (https://propecare.com/ | Demo: https://propcare-epc.vercel.app/).
6. Octic AI Agent: Autonomous AI workforce platform for tool execution.
7. Looca Voice AI Agent: Voice-first AI platform with retrieval memory.
8. Oundnote: Private local-first AI meeting assistant with RAG & diarization.
9. Oli: Notch-resident ambient meeting copilot.

Experience:
- Nuclei Tech Solutions (Jun 2026 – Present): Freelance Software Developer. Delivered 5+ production web applications, live solar and windmill IoT monitoring dashboards (Case Study: https://www.nucleitech.online/case-study-solar.html), and SCADA services for enterprise clients including Naga Private Limited and Surya Batteries; 100+ user CRM in renewable energy.
- Loam AI (Feb 2026 – Jun 2026): AI Engineer (Engineered full-stack systems for Suspire with 400+ sustainable brands & 800+ vendors; built NSJ ERP System for Niti Shah Jewels; B2B freight forwarding product MVP from scratch, led team of 5).
- Perspectiv Labs (Jul 2024 – Feb 2026): Software Developer (modular Next.js, FastAPI, PostgreSQL).

Skills:
Frontend: React, Next.js, React Native, TypeScript, Tailwind CSS.
Backend: Python, FastAPI, Node.js, PostgreSQL, Redis, MongoDB, Qdrant.
AI Engineering: LLMs, RAG, MCP, Multi-Agent Systems, LoRA/PEFT, Transformers, PyTorch.

Contact: ${site.email}
GitHub: ${site.socials.github}
LinkedIn: ${site.socials.linkedin}`;

  const copySetupPrompt = () => {
    navigator.clipboard.writeText(setupPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSimulateQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setSimRunning(true);
    setTimeout(() => {
      setSimRunning(false);
      const q = simQuery.toLowerCase().trim();
      let node1 = "context/aravindh-fullstack-ai";
      let node2 = "runtime/deterministic-execution";
      let actionText = `Synthesized context for "${simQuery}". Zero hallucination verified.`;

      if (q.includes("cieav") || q.includes("commit")) {
        node1 = "cieav/deterministic-intent-plane";
        node2 = "auth/ed25519-local-authority";
        actionText = "Grounded dispatch to CIEAV local execution plane with 0ms cloud leakage.";
      } else if (q.includes("opendev") || q.includes("erp") || q.includes("invoice")) {
        node1 = "opendev/sop-retrieval-bm25";
        node2 = "verify/flask-erp-invariant";
        actionText = "Retrieved SOP-104 with independent ERP database verification.";
      } else if (q.includes("looca") || q.includes("voice")) {
        node1 = "looca/qdrant-vector-memory";
        node2 = "vapi/realtime-voice-transport";
        actionText = "Indexed episodic memory with sub-second speech synthesis.";
      } else if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
        node1 = "agent/conversational-init";
        node2 = "identity/aravindh-b-engineer";
        actionText = "Aravindh AI initialized and ready to answer any questions.";
      }

      setSimResult({
        status: "RESOLVED",
        score: "0.998 RETRIEVAL CONFIDENCE",
        memoryNodes: [
          node1,
          node2,
          "privacy/granite-guard-active"
        ],
        action: actionText
      });
    }, 500);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      if (mainRef.current && window.innerWidth >= 1024) {
        const container = mainRef.current;
        const containerTop = container.getBoundingClientRect().top;
        const elemTop = element.getBoundingClientRect().top;
        const targetScrollTop = container.scrollTop + (elemTop - containerTop) - 20;
        container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: "smooth" });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  // Filtered projects (Category-divided, never dumps all projects at once)
  const filteredProjects = site.projects.filter((p) => {
    const matchesCategory = isProjectInCategory(p, projectCategory);

    const q = projectSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.blurb.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={cx(
      "min-h-screen font-sans transition-colors duration-150 antialiased selection:bg-[#0066ff] selection:text-white",
      dark ? "dark bg-[#09090b] text-neutral-100" : "light bg-[#ffffff] text-neutral-900"
    )}>
      {/* Mobile Top Navigation Bar */}
      <header className={cx(
        "lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b backdrop-blur-md",
        dark ? "bg-[#09090b]/90 border-neutral-800" : "bg-[#ffffff]/90 border-neutral-200"
      )}>
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <img
              src="/profile.jpeg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/profile2.jpeg";
              }}
              alt={site.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-neutral-900" />
          </div>
          <div>
            <span className="font-semibold text-xs tracking-tight text-neutral-950 dark:text-white block leading-tight">{site.name}</span>
            <span className="text-[9px] text-neutral-400 font-mono block">{site.role}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Human / Agent Toggle */}
          <div className={cx(
            "flex items-center p-0.5 rounded border text-[11px] font-mono",
            dark ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-200"
          )}>
            <button
              onClick={() => setMode("human")}
              className={cx(
                "px-2 py-0.5 rounded",
                mode === "human"
                  ? (dark ? "bg-neutral-800 text-white font-medium" : "bg-white text-neutral-900 font-medium shadow-sm")
                  : "text-neutral-400"
              )}
            >
              Human
            </button>
            <button
              onClick={() => setMode("agent")}
              className={cx(
                "px-2 py-0.5 rounded",
                mode === "agent"
                  ? (dark ? "bg-neutral-800 text-white font-medium" : "bg-white text-neutral-900 font-medium shadow-sm")
                  : "text-neutral-400"
              )}
            >
              Agent
            </button>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className={cx(
              "p-1.5 rounded border transition",
              dark ? "border-neutral-800 text-neutral-300 hover:bg-neutral-800" : "border-neutral-200 text-neutral-700 hover:bg-neutral-100"
            )}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Mobile Live Visitors Seen Pill */}
          <div
            className={cx(
              "flex items-center gap-1.5 px-2 py-1 rounded border text-[10px] font-mono select-none",
              dark ? "bg-neutral-900 border-neutral-800 text-neutral-300" : "bg-neutral-100 border-neutral-200 text-neutral-700"
            )}
            title={`Live Portfolio Traffic: ${count ? count.toLocaleString() : "3,428"} views · ${liveCount} active visitors online`}
          >
            <Eye size={11} className="text-[#0066ff]" />
            <span className="font-semibold">{count ? count.toLocaleString() : "3,428"}</span>
            <span className="text-[9px] text-neutral-400">seen</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={cx(
          "lg:hidden fixed inset-x-0 top-[53px] bottom-0 z-30 p-5 overflow-y-auto border-b backdrop-blur-xl",
          dark ? "bg-[#09090b]/95 border-neutral-800" : "bg-white/95 border-neutral-200"
        )}>
          <div className="space-y-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Navigation</p>
            <div className="space-y-1">
              {[
                { label: "Home", id: "hero" },
                { label: "Overview", id: "overview" },
                { label: "What I Build", id: "what-i-build" },
                { label: "Projects", id: "projects" },
                { label: "Experience", id: "experience" },
                { label: "Skills", id: "skills" },
                { label: "Education", id: "education" },
                { label: "Writing", id: "writing" },
                { label: "Contact", id: "contact" },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cx(
                      "w-full text-left py-2 px-3 rounded text-sm font-medium flex items-center transition",
                      isActive
                        ? "bg-[#0066ff]/10 text-[#0066ff] font-semibold"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    )}
                  >
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#0066ff] inline-block mr-2.5 shrink-0 shadow-[0_0_6px_rgba(0,102,255,0.7)]" />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
              <a
                href={site.socials.resume}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-2 px-3 rounded text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <span>Resume / Docs</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="/chat"
                className="flex items-center justify-between py-2 px-3 rounded text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <span>Interactive Chat</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout Container: Centered Duo (Sidebar + Content squeezed in center like supermemory.ai) */}
      <div className="w-full min-h-screen lg:h-screen lg:overflow-hidden flex justify-center">
        <div className="w-full max-w-[940px] flex min-h-screen lg:h-full">
          {/* Left Sidebar: Compact, fixed on left, never scrolls away */}
          <aside
            onWheel={(e) => {
              if (mainRef.current) {
                mainRef.current.scrollTop += e.deltaY;
              }
            }}
            className={cx(
              "hidden lg:flex flex-col w-[210px] shrink-0 h-full overflow-y-auto pt-8 pb-6 pr-5 border-r select-none z-20",
              dark ? "border-neutral-800/80 bg-[#09090b]" : "border-neutral-200/80 bg-[#ffffff]"
            )}
          >
          {/* Logo Brand: Profile Avatar + Name */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative shrink-0">
              <img
                src="/profile.jpeg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/profile2.jpeg";
                }}
                alt={site.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0066ff]/20 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" title="Online & Available" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-sm tracking-tight text-neutral-950 dark:text-white block truncate leading-tight">
                {site.name}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono block truncate mt-0.5">
                {site.role}
              </span>
            </div>
          </div>

          {/* Segmented Capsule Toggle: Human | Agent */}
          <div className="mb-7">
            <div className={cx(
              "inline-flex p-1 rounded-lg border text-xs font-mono w-full justify-between",
              dark ? "bg-neutral-900 border-neutral-800" : "bg-[#f4f4f5] border-neutral-200/90"
            )}>
              <button
                onClick={() => setMode("human")}
                className={cx(
                  "flex-1 py-1.5 rounded-md text-center transition-all",
                  mode === "human"
                    ? (dark ? "bg-[#18181b] text-white font-medium shadow-sm border border-neutral-700/80" : "bg-white text-neutral-950 font-medium shadow-sm border border-neutral-200")
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                )}
              >
                Human
              </button>
              <button
                onClick={() => setMode("agent")}
                className={cx(
                  "flex-1 py-1.5 rounded-md text-center transition-all",
                  mode === "agent"
                    ? (dark ? "bg-[#18181b] text-white font-medium shadow-sm border border-neutral-700/80" : "bg-white text-neutral-950 font-medium shadow-sm border border-neutral-200")
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                )}
              >
                Agent
              </button>
            </div>
          </div>

          {/* Primary Navigation Menu */}
          <nav className="space-y-2 mb-6 text-sm" aria-label="Main Navigation">
            {[
              { id: "hero", label: "Home", match: ["hero", "overview"] },
              { id: "projects", label: "Product", match: ["projects"] },
              { id: "writing", label: "Blog", match: ["writing"] },
              { id: "experience", label: "Changelog", match: ["experience"] },
              { id: "skills", label: "Stack", match: ["skills", "education"] },
              { id: "what-i-build", label: "Research", match: ["what-i-build"] },
            ].map((item) => {
              const isActive = item.match.includes(activeSection);
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cx(
                    "group flex items-center w-full text-left transition font-normal",
                    isActive
                      ? "text-neutral-950 dark:text-white font-medium"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                  )}
                >
                  <span
                    className={cx(
                      "w-2 h-2 rounded-[2px] inline-block mr-2.5 shrink-0 transition-all duration-200",
                      isActive
                        ? "bg-[#0066ff] shadow-[0_0_8px_rgba(0,102,255,0.85)] scale-100 opacity-100"
                        : "bg-transparent group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700 scale-75 opacity-0 group-hover:opacity-100"
                    )}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <a
              href={site.socials.resume}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between w-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition"
            >
              <div className="flex items-center">
                <span className="w-2 mr-2.5" />
                <span>Docs</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200" />
            </a>

            <a
              href="/chat"
              className="group flex items-center justify-between w-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition"
            >
              <div className="flex items-center">
                <span className="w-2 mr-2.5" />
                <span>Console</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200" />
            </a>
          </nav>

          {/* Dotted Divider */}
          <div className="w-full border-b border-dashed border-neutral-200 dark:border-neutral-800 my-5" />

          {/* "ON THIS PAGE" Table of Contents Tree */}
          <div className="mb-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-3 font-semibold">
              ON THIS PAGE
            </p>

            <div className="relative pl-3 space-y-2.5 border-l border-dashed border-neutral-200 dark:border-neutral-800 text-[13px]">
              {[
                { id: "overview", label: "Mission" },
                { id: "what-i-build", label: "What we do" },
                { id: "projects", label: "In production" },
                { id: "experience", label: "Experience" },
                { id: "skills", label: "Skills & Stack" },
                { id: "education", label: "Education" },
                { id: "writing", label: "Writing" },
                { id: "contact", label: "Contact" },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cx(
                      "group flex items-center w-full text-left transition",
                      isActive
                        ? "text-neutral-950 dark:text-white font-medium"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                    )}
                  >
                    {isActive ? (
                      <span className="w-3.5 h-[2px] bg-[#0066ff] inline-block mr-2 -ml-[13px]" />
                    ) : (
                      <span className="w-1.5 h-[1px] bg-neutral-300 dark:bg-neutral-700 inline-block mr-2 -ml-[13px] opacity-0 group-hover:opacity-100 transition" />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Sidebar Footer: Theme Toggle & Live Seen Count only (no extra icons or social links) */}
          <div className="mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-1.5 hover:text-neutral-800 dark:hover:text-neutral-200 transition py-0.5"
              title="Toggle dark / light theme"
            >
              {dark ? <Sun size={13} /> : <Moon size={13} />}
              <span className="font-mono text-[10px]">{dark ? "LIGHT" : "DARK"}</span>
            </button>

            {/* Live Portfolio Seen Counter with Eye Icon */}
            <div
              className={cx(
                "flex items-center gap-1 px-2 py-0.5 rounded border font-mono text-[10px] select-none transition cursor-default",
                dark
                  ? "bg-neutral-900 border-neutral-800 text-neutral-300"
                  : "bg-neutral-100 border-neutral-200 text-neutral-700"
              )}
              title={`Live Portfolio Traffic: ${count ? count.toLocaleString() : "3,428"} total views · ${liveCount} active visitors online`}
            >
              <Eye size={11} className="text-[#0066ff]" />
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {count ? count.toLocaleString() : "3,428"}
              </span>
              <span className="text-[9px] text-neutral-400">seen</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </div>
          </div>
        </aside>

        {/* Main Content Area: Squeezed and centered right next to sidebar */}
        <main
          ref={mainRef}
          className="flex-1 min-w-0 lg:h-full lg:overflow-y-auto pl-6 sm:pl-9 pr-2 sm:pr-4 py-8 lg:py-12 flex justify-start"
        >
          <div className="w-full max-w-[650px]">
            {mode === "human" ? (
              /* ======================================================== */
              /* HUMAN MODE VIEW (Supermemory UI + Aravindh's Real Data)  */
              /* ======================================================== */
              <div className="space-y-16 lg:space-y-24">
                {/* Hero Section */}
                <section id="hero" className="space-y-7 pt-2">
                  {/* Top Badge: Introducing CIEAV / Status with Live Link */}
                  <div>
                    <a
                      href="https://cieav.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className={cx(
                        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs transition group cursor-pointer",
                        dark
                          ? "border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800/80 text-neutral-300"
                          : "border-neutral-200 bg-neutral-50/70 hover:bg-neutral-100 text-neutral-700"
                      )}
                      title="Open CIEAV Live Application (https://cieav.vercel.app/)"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-medium group-hover:text-neutral-950 dark:group-hover:text-white transition">
                        Introducing CIEAV & Local AI
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">|</span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#0066ff] group-hover:underline">
                        Live demo <ArrowUpRight size={13} />
                      </span>
                    </a>
                  </div>

                  {/* Main Hero Headline (Compact, Grotesque Lowercase Style like screenshot) */}
                  <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-[38px] font-normal tracking-[-0.03em] text-neutral-950 dark:text-neutral-50 leading-[1.16]">
                      {site.firstName.toLowerCase()} is building end-to-end products across modern web stacks and ai-powered systems.
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base font-normal leading-relaxed">
                      {site.tagline}
                    </p>
                  </div>

                {/* Primary CTA Buttons (Supermemory Segmented Style) */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {/* Vibrant Blue Primary Button */}
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="h-11 px-5 bg-[#0066ff] hover:bg-[#0052cc] text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2.5 transition active:scale-[0.98] border border-[#0066ff] rounded-[2px]"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>BUILD WITH {site.firstName.toUpperCase()}</span>
                  </button>

                  {/* Secondary Outline Button */}
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={cx(
                      "h-11 px-5 font-mono text-xs font-semibold tracking-wider flex items-center gap-2 transition active:scale-[0.98] rounded-[2px] border",
                      dark
                        ? "bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                        : "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50"
                    )}
                  >
                    <span>TALK TO {site.firstName.toUpperCase()}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* Command Bar: COPY SETUP PROMPT */}
                <div className="pt-1 max-w-md">
                  <div className={cx(
                    "border rounded-[2px] overflow-hidden transition",
                    dark ? "border-neutral-800 bg-neutral-900/40" : "border-neutral-200 bg-neutral-50/70"
                  )}>
                    <div
                      className="px-4 py-2.5 flex items-center justify-between font-mono text-xs tracking-wider cursor-pointer select-none"
                      style={{
                        backgroundImage: dark
                          ? "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 6px)"
                          : "repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 2px, transparent 2px, transparent 6px)",
                      }}
                      onClick={copySetupPrompt}
                    >
                      <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                        {copiedPrompt ? "✓ PROMPT COPIED TO CLIPBOARD" : "COPY AGENT PROMPT"}
                      </span>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <button
                          type="button"
                          className="p-1 hover:text-neutral-900 dark:hover:text-white"
                          title="Copy agent prompt"
                          onClick={(e) => {
                            e.stopPropagation();
                            copySetupPrompt();
                          }}
                        >
                          {copiedPrompt ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPromptDrawerOpen(!promptDrawerOpen);
                          }}
                          className="p-1 hover:text-neutral-900 dark:hover:text-white"
                          title="Toggle prompt drawer"
                        >
                          <ChevronDown size={14} className={cx("transition-transform", promptDrawerOpen && "rotate-180")} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Prompt Drawer */}
                    {promptDrawerOpen && (
                      <div className={cx(
                        "p-3.5 border-t font-mono text-[11px] leading-relaxed",
                        dark ? "border-neutral-800 bg-[#09090b] text-neutral-300" : "border-neutral-200 bg-neutral-900 text-neutral-200"
                      )}>
                        <div className="flex items-center justify-between text-neutral-400 pb-1.5 mb-2 border-b border-neutral-700/60">
                          <span>aravindh_system_prompt.md</span>
                          <span>system</span>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap">{setupPromptText}</pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Profiles & Channels (replacing previous static tech logos) */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-neutral-400 dark:text-neutral-500">
                  <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-neutral-500 dark:text-neutral-400">
                    PROFILES & SOCIALS
                  </span>
                  <div className="flex items-center gap-3.5 sm:gap-4 text-neutral-600 dark:text-neutral-400">
                    <a
                      href={site.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      title="LinkedIn"
                      aria-label="LinkedIn"
                      className="p-1 rounded text-neutral-500 hover:text-[#0a66c2] dark:hover:text-[#0a66c2] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center"
                    >
                      <LinkedInIcon className="w-4 h-4 fill-current" />
                    </a>
                    <a
                      href={site.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      title="GitHub"
                      aria-label="GitHub"
                      className="p-1 rounded text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center"
                    >
                      <GitHubIcon className="w-4 h-4 fill-current" />
                    </a>
                    <a
                      href={site.socials.medium}
                      target="_blank"
                      rel="noreferrer"
                      title="Medium"
                      aria-label="Medium"
                      className="p-1 rounded text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center"
                    >
                      <MediumIcon className="w-4 h-4 fill-current" />
                    </a>
                    <a
                      href={site.socials.email}
                      title={`Email (${site.email})`}
                      aria-label="Email"
                      className="p-1 rounded text-neutral-500 hover:text-[#0066ff] dark:hover:text-[#3385ff] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center"
                    >
                      <MailIcon className="w-4 h-4 text-current" />
                    </a>
                    <a
                      href={site.socials.googleScholar}
                      target="_blank"
                      rel="noreferrer"
                      title="Google Scholar"
                      aria-label="Google Scholar"
                      className="p-1 rounded text-neutral-500 hover:text-[#4285f4] dark:hover:text-[#4285f4] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center"
                    >
                      <GoogleScholarIcon className="w-4 h-4 text-current" />
                    </a>
                  </div>
                </div>

                {/* Deep Blue Visual Media Banner / Interactive Memory Engine */}
                <div className="pt-4">
                  <div className="relative overflow-hidden rounded-xl border border-blue-900/40 bg-gradient-to-br from-[#003cb3] via-[#002b80] to-[#00144d] p-6 sm:p-8 text-white shadow-xl">
                    {/* Background Grid Pattern */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "28px 28px",
                      }}
                    />

                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col justify-between gap-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-mono text-xs uppercase tracking-wider text-blue-200">
                            AGENT KNOWLEDGE ENGINE // {site.name.toUpperCase()}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-blue-300">
                          STATUS: {site.status.availableText.toUpperCase()}
                        </span>
                      </div>

                      {/* Interactive Live Query Simulation */}
                      <form onSubmit={handleSimulateQuery} className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3.5 top-3 w-4 h-4 text-blue-300" />
                          <input
                            type="text"
                            value={simQuery}
                            onChange={(e) => setSimQuery(e.target.value)}
                            placeholder="Query portfolio knowledge (e.g. 'Retrieve CIEAV architecture')"
                            className="w-full pl-10 pr-4 py-2.5 rounded bg-white/10 border border-white/20 text-white placeholder-blue-300 text-xs font-mono focus:outline-none focus:border-white"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={simRunning}
                          className="px-4 py-2.5 rounded bg-white text-blue-900 hover:bg-blue-50 font-mono text-xs font-semibold tracking-wider transition shrink-0"
                        >
                          {simRunning ? "QUERYING..." : "QUERY KNOWLEDGE"}
                        </button>
                      </form>

                      {/* Live Output Simulation Window */}
                      <div className="rounded bg-black/40 border border-white/10 p-4 font-mono text-xs space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-blue-300">
                          <span>RESULT_STATUS: {simResult.status}</span>
                          <span>{simResult.score}</span>
                        </div>
                        <div className="text-blue-100 flex flex-wrap gap-2 pt-1">
                          {simResult.memoryNodes.map((node) => (
                            <span key={node} className="px-2 py-0.5 rounded bg-blue-500/30 text-[10px] text-blue-200 border border-blue-400/20">
                              #{node}
                            </span>
                          ))}
                        </div>
                        <p className="text-white text-xs pt-1">
                          → {simResult.action}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Overview / Mission (Aravindh's Real Bio & Dijkstra Quote) */}
              <section id="overview" className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#0066ff] font-semibold">
                    01 // OVERVIEW & PHILOSOPHY
                  </span>
                </div>

                <div className="max-w-3xl space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
                    "{site.quote.text}"
                  </h2>
                  <p className="text-sm font-mono text-neutral-400">
                    — {site.quote.author}
                  </p>

                  <div className="space-y-3 pt-2 text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">
                    {site.about.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Status & Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className={cx(
                    "p-4 rounded-lg border",
                    dark ? "border-neutral-800 bg-neutral-900/50" : "border-neutral-200 bg-neutral-50/50"
                  )}>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Status</p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {site.status.availableText}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">{site.role}</p>
                  </div>

                  <div className={cx(
                    "p-4 rounded-lg border",
                    dark ? "border-neutral-800 bg-neutral-900/50" : "border-neutral-200 bg-neutral-50/50"
                  )}>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Location</p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#0066ff]" />
                      {site.location}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">{site.timezone} (UTC +5:30)</p>
                  </div>

                  <div className={cx(
                    "p-4 rounded-lg border",
                    dark ? "border-neutral-800 bg-neutral-900/50" : "border-neutral-200 bg-neutral-50/50"
                  )}>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Now Building</p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <Cpu size={14} className="text-[#0066ff]" />
                      {site.status.nowBuilding}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">{site.status.nowLearning.split("•")[0].trim()}</p>
                  </div>
                </div>

                {/* TL;DR Principles */}
                <div className="pt-2">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2">Core Principles</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {site.tldr.map((point) => (
                      <div
                        key={point}
                        className={cx(
                          "p-3 rounded border font-mono text-xs flex items-center gap-2",
                          dark ? "border-neutral-800 bg-neutral-900/30 text-neutral-300" : "border-neutral-200 bg-white text-neutral-800"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Animated Box: Interactive Memory Graph & Context Flow */}
              <MemoryGraphBox dark={dark} />

              {/* Section: What I Build (Technical Bento Boxes) */}
              <section id="what-i-build" className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#0066ff] font-semibold">
                    02 // WHAT I BUILD
                  </span>
                </div>

                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
                    Core Engineering Disciplines
                  </h2>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                    Engineering reliable, maintainable systems across AI workflows, full-stack architecture, and deterministic infrastructure.
                  </p>
                </div>

                {/* 4 Supermemory Bento Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className={cx(
                    "p-6 rounded-xl border transition hover:border-[#0066ff]/50",
                    dark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-white"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded bg-blue-500/10 text-[#0066ff]">
                        <Cpu size={20} />
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400">01 / AI SYSTEMS</span>
                    </div>
                    <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                      Agentic Workflows & Multi-Agent Architecture
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                      Autonomous agents that research, plan, execute tools, and coordinate tasks using MCP (Model Context Protocol), local LLMs, and multi-agent frameworks.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {["MCP", "LLMs", "RAG", "Multi-Agent", "Ollama"].map((tag) => (
                        <span key={tag} className={cx("px-2 py-0.5 rounded", dark ? "bg-neutral-800 text-neutral-300" : "bg-neutral-100 text-neutral-700")}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={cx(
                    "p-6 rounded-xl border transition hover:border-[#0066ff]/50",
                    dark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-white"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded bg-blue-500/10 text-[#0066ff]">
                        <Database size={20} />
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400">02 / MEMORY</span>
                    </div>
                    <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                      Vector Memory & Verifiable Retrieval
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                      Building grounded RAG pipelines with vector stores (Qdrant, SQLite), entailment verification, and search verifier ensembles to prevent hallucinations.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {["Qdrant", "SQLite", "Embeddings", "FastAPI", "Python"].map((tag) => (
                        <span key={tag} className={cx("px-2 py-0.5 rounded", dark ? "bg-neutral-800 text-neutral-300" : "bg-neutral-100 text-neutral-700")}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={cx(
                    "p-6 rounded-xl border transition hover:border-[#0066ff]/50",
                    dark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-white"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded bg-blue-500/10 text-[#0066ff]">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400">03 / SAFETY</span>
                    </div>
                    <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                      Deterministic Safety & Local Guardrails
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                      Designing commit planes between digital intent and consequence (e.g. CIEAV), keeping deterministic control local with Ed25519 cryptography and privacy layers.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {["Ed25519", "IBM Granite", "Local Control", "Audit Trails"].map((tag) => (
                        <span key={tag} className={cx("px-2 py-0.5 rounded", dark ? "bg-neutral-800 text-neutral-300" : "bg-neutral-100 text-neutral-700")}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={cx(
                    "p-6 rounded-xl border transition hover:border-[#0066ff]/50",
                    dark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-white"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded bg-blue-500/10 text-[#0066ff]">
                        <Layers size={20} />
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400">04 / FULL-STACK</span>
                    </div>
                    <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                      Full-Stack Products & Modular APIs
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                      End-to-end applications from database models to responsive UI. React, Next.js, TypeScript, PostgreSQL, Drizzle ORM, Docker, and CI/CD pipelines.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Docker"].map((tag) => (
                        <span key={tag} className={cx("px-2 py-0.5 rounded", dark ? "bg-neutral-800 text-neutral-300" : "bg-neutral-100 text-neutral-700")}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Projects (Category Divided, Focused, Fully Responsive) */}
              <section id="projects" className="space-y-5 pt-8 border-t border-neutral-100 dark:border-neutral-800/80">
                {/* Header & Controls */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-1">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#0066ff] font-semibold">
                        03 // IN PRODUCTION
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
                        Selected Projects & Systems
                      </h2>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Autonomous agent platforms, local-first control planes, and verified web systems.
                      </p>
                    </div>

                    {/* Search Bar - Responsive on mobile & desktop */}
                    <div className="relative w-full sm:w-60 shrink-0">
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" />
                      <input
                        type="text"
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                        placeholder="Search projects or stack..."
                        className={cx(
                          "w-full pl-9 pr-7 py-1.5 text-xs rounded border outline-none font-mono transition",
                          dark
                            ? "bg-neutral-900/60 border-neutral-800 text-white placeholder-neutral-500 focus:border-[#0066ff]"
                            : "bg-white border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-[#0066ff]"
                        )}
                      />
                      {projectSearch && (
                        <button
                          onClick={() => setProjectSearch("")}
                          className="absolute right-2.5 top-2 text-neutral-400 hover:text-neutral-600"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Clean Category Selector Tabs (Horizontally scrollable on mobile, wrap on tablet/desktop) */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                    {PROJECT_CATEGORIES.map((cat) => {
                      const isSelected = projectCategory === cat.id;
                      const count = site.projects.filter((p) => isProjectInCategory(p, cat.id)).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setProjectCategory(cat.id)}
                          className={cx(
                            "px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition shrink-0 flex items-center gap-1.5 border",
                            isSelected
                              ? "bg-[#0066ff] text-white border-[#0066ff] shadow-xs"
                              : dark
                                ? "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                                : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300"
                          )}
                        >
                          <span>{cat.label}</span>
                          <span
                            className={cx(
                              "text-[10px] px-1.5 py-0.2 rounded-full font-semibold",
                              isSelected
                                ? "bg-white/20 text-white"
                                : dark
                                  ? "bg-neutral-800 text-neutral-400"
                                  : "bg-neutral-200/70 text-neutral-600"
                            )}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Projects Grid (Only shows selected category's 2-7 projects, never endless scroll) */}
                {filteredProjects.length === 0 ? (
                  <div className={cx(
                    "p-8 rounded-xl border text-center font-mono space-y-3",
                    dark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-neutral-50"
                  )}>
                    <p className="text-xs text-neutral-500">
                      No projects found matching &ldquo;{projectSearch}&rdquo; in this category.
                    </p>
                    <button
                      onClick={() => {
                        setProjectSearch("");
                      }}
                      className="px-3 py-1.5 rounded text-xs bg-[#0066ff] text-white font-semibold hover:bg-[#0052cc] transition"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-1">
                    {filteredProjects.map((project) => (
                      <ProjectCardItem
                        key={project.title}
                        project={project}
                        dark={dark}
                        onOpenSpecs={() => setSelectedProject(project)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Animated Box: System Telemetry & Invariant Audit Stream */}
              <TelemetryTerminalBox dark={dark} />

              {/* Section: Experience & Changelog */}
              <section id="experience" className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#0066ff] font-semibold">
                    04 // CHANGELOG & EXPERIENCE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
                    Career Journey
                  </h2>
                </div>

                <div className="space-y-6 pt-2">
                  {site.experience.map((job) => (
                    <div
                      key={job.company}
                      className={cx(
                        "p-6 rounded-xl border relative",
                        dark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-white"
                      )}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                            {job.role}
                          </h3>
                          <p className="font-mono text-xs text-[#0066ff] mt-0.5">
                            {job.company}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-neutral-400">
                          {job.period}
                        </span>
                      </div>

                      <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 list-disc pl-4 leading-relaxed">
                        {job.bullets?.map((bullet, idx) => (
                          <li key={idx}>{renderBulletWithLinks(bullet)}</li>
                        ))}
                      </ul>

                      {job.liveLinks && job.liveLinks.length > 0 && (
                        <div className="mt-4 pt-3.5 border-t border-neutral-100 dark:border-neutral-800/80">
                          <div className="flex items-center gap-2 mb-2.5">
                            <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#0066ff] font-semibold flex items-center gap-1.5">
                              <span className="size-1.5 rounded-full bg-[#0066ff] animate-pulse" />
                              Live Production Links:
                            </span>
                            <span className="h-px flex-1 bg-neutral-100 dark:bg-neutral-800" />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {job.liveLinks.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className={cx(
                                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all group/livelink",
                                  dark
                                    ? "bg-neutral-900/90 border-neutral-700/80 hover:border-[#0066ff] text-neutral-200 hover:text-white"
                                    : "bg-neutral-50 border-neutral-200/90 hover:border-[#0066ff] text-neutral-800 hover:text-neutral-950 shadow-2xs"
                                )}
                              >
                                <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover/livelink:text-[#0066ff] transition-colors">
                                  {link.label}
                                </span>
                                {link.badge && (
                                  <span className={cx(
                                    "text-[9.5px] px-1.5 py-0.2 rounded font-sans font-medium",
                                    dark ? "bg-neutral-800 text-neutral-400" : "bg-neutral-200/70 text-neutral-600"
                                  )}>
                                    {link.badge}
                                  </span>
                                )}
                                <ArrowUpRight className="size-3 text-[#0066ff] group-hover/livelink:translate-x-0.5 group-hover/livelink:-translate-y-0.5 transition-transform" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {job.clients && job.clients.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold block mb-2.5">
                            {job.clientsLabel || "Enterprise Clients & Products"}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {job.clients.map((client) => (
                              <a
                                key={client.name}
                                href={client.url || "#"}
                                target={client.url ? "_blank" : undefined}
                                rel="noreferrer"
                                className={cx(
                                  "flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-200 group/client",
                                  dark
                                    ? "bg-neutral-800/40 hover:bg-neutral-800/80 border-neutral-800 hover:border-neutral-700"
                                    : "bg-neutral-50/80 hover:bg-neutral-100/90 border-neutral-200/80 hover:border-neutral-300"
                                )}
                              >
                                <div className="size-11 rounded-md overflow-hidden bg-white flex items-center justify-center p-1 border border-neutral-200 shrink-0 shadow-xs">
                                  <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1 group-hover/client:text-[#0066ff] transition-colors">
                                    <span className="truncate">{client.name}</span>
                                    <ArrowUpRight className="size-3 shrink-0 opacity-0 group-hover/client:opacity-100 transition-opacity" />
                                  </div>
                                  {client.role && (
                                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                                      {client.role}
                                    </div>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Animated Box: Autonomous Agent Runtime Matrix */}
              <AgentRadarBox dark={dark} />

              {/* Section: Skills & Technologies */}
              <section id="skills" className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#0066ff] font-semibold">
                    05 // STACK & TOOLS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
                    Skills & Technologies
                  </h2>
                  <p className="text-xs text-neutral-500">The stack is selected around the problem—not the other way around.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    {
                      title: "Frontend",
                      description: "Polished, responsive, and accessible interfaces.",
                      skills: ["TypeScript", "JavaScript", "React", "React Native", "Next.js", "Tailwind CSS"]
                    },
                    {
                      title: "Backend & Data",
                      description: "APIs, data models, integrations, and services.",
                      skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Qdrant"]
                    },
                    {
                      title: "AI Engineering",
                      description: "Grounded retrieval, agents, and model fine-tuning.",
                      skills: ["LLMs", "RAG", "LoRA / PEFT", "Transformers", "MCP", "Multi-Agent Systems", "PyTorch"]
                    },
                    {
                      title: "Cloud & Delivery",
                      description: "Shipping, operating, and automating modern apps.",
                      skills: ["Docker", "Kubernetes", "AWS", "GCP", "Git", "GitHub", "Vercel"]
                    },
                  ].map((group) => (
                    <div
                      key={group.title}
                      className={cx(
                        "p-5 rounded-xl border",
                        dark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-white"
                      )}
                    >
                      <h3 className="text-sm font-semibold text-neutral-950 dark:text-white">{group.title}</h3>
                      <p className="text-xs text-neutral-500 mt-1">{group.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className={cx(
                              "font-mono text-[10px] px-2.5 py-1 rounded border",
                              dark ? "border-neutral-800 bg-neutral-800/40 text-neutral-300" : "border-neutral-200 bg-neutral-50 text-neutral-700"
                            )}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Education & Academic Foundation */}
              <section id="education" className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#0066ff] font-semibold">
                    06 // LEARNING FOUNDATION
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
                    Education
                  </h2>
                </div>

                <div className="space-y-4 pt-2">
                  {site.education.map((edu) => (
                    <div
                      key={edu.institution}
                      className={cx(
                        "p-6 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                        dark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-200 bg-white"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-blue-500/10 text-[#0066ff]">
                          <GraduationCap size={22} />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                            {edu.degree} in {edu.field}
                          </h3>
                          <p className="text-xs text-neutral-500 mt-1">
                            {edu.institution} · {edu.location}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-neutral-400 sm:self-center">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Writing (Blog & Publications) */}
              <section id="writing" className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#0066ff] font-semibold">
                    07 // WRITING & RESEARCH
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
                    Technical Writing
                  </h2>
                </div>

                <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
                  {site.writing.map((post) => (
                    <a
                      key={post.title}
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/40 px-2 -mx-2 rounded transition"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-neutral-950 dark:text-white group-hover:text-[#0066ff] transition">
                            {post.title}
                          </h3>
                          <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-[#0066ff] transition" />
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                          {post.summary}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-3 font-mono text-xs text-neutral-400">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* Section: Contact / Talk to Sales */}
              <section id="contact" className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#0066ff] font-semibold">
                    08 // CONTACT & TALK TO ME
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 dark:text-white">
                    Start a Conversation
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Have a project, engineering opportunity, or challenging problem in mind? Feel free to reach out directly through any of these channels.
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={copyEmail}
                          className={cx(
                            "px-4 py-2.5 rounded border font-mono text-xs flex items-center gap-2 transition",
                            dark ? "border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800" : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                          )}
                        >
                          <Mail size={14} className="text-[#0066ff]" />
                          <span>{site.email}</span>
                          <span className="text-[10px] text-neutral-400 ml-1">
                            [{copiedEmail ? "COPIED!" : "COPY"}]
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <a
                          href={site.socials.booking}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded bg-[#0066ff] hover:bg-[#0052cc] text-white font-mono text-xs font-semibold flex items-center gap-2 transition"
                        >
                          <span>BOOK ON CAL.COM</span>
                          <ArrowUpRight size={14} />
                        </a>
                      </div>

                      <div className="pt-2 flex items-center gap-3 text-xs text-neutral-500 font-mono">
                        <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-1">
                          <Linkedin size={13} /> LinkedIn
                        </a>
                        <span>·</span>
                        <a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-1">
                          <Github size={13} /> GitHub
                        </a>
                        <span>·</span>
                        <a href={site.socials.googleScholar} target="_blank" rel="noreferrer" className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-1">
                          <GraduationCap size={13} /> Scholar
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Quick Note Form */}
                  <div className={cx(
                    "p-5 rounded-xl border space-y-3",
                    dark ? "border-neutral-800 bg-neutral-900/40" : "border-neutral-200 bg-white"
                  )}>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-1 border-b border-neutral-100 dark:border-neutral-800">
                      <span>DISPATCH MESSAGE</span>
                      <span>INBOX</span>
                    </div>

                    {contactSent ? (
                      <div className="py-8 text-center space-y-2">
                        <CheckCircle2 size={24} className="text-emerald-500 mx-auto" />
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">Message queued successfully</p>
                        <p className="text-xs text-neutral-500">I will reply to your email promptly.</p>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!contactSender || !contactMessage) return;
                          window.location.href = `mailto:${site.email}?subject=Message from ${encodeURIComponent(contactSender)}&body=${encodeURIComponent(contactMessage)}`;
                          setContactSent(true);
                        }}
                        className="space-y-3"
                      >
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Your email or name"
                            value={contactSender}
                            onChange={(e) => setContactSender(e.target.value)}
                            className={cx(
                              "w-full px-3 py-2 text-xs rounded border outline-none font-mono",
                              dark ? "border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500" : "border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400"
                            )}
                          />
                        </div>
                        <div>
                          <textarea
                            required
                            rows={3}
                            placeholder="Brief project details, questions, or ideas..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className={cx(
                              "w-full px-3 py-2 text-xs rounded border outline-none font-mono resize-none",
                              dark ? "border-neutral-800 bg-neutral-900 text-white placeholder-neutral-500" : "border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400"
                            )}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-mono text-xs font-semibold rounded flex items-center justify-center gap-2 transition"
                        >
                          <Send size={12} />
                          <span>SEND DISPATCH</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>

              {/* Footer Note */}
              <footer className="pt-10 pb-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-between text-xs text-neutral-400 font-mono gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/profile.jpeg"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/profile2.jpeg";
                    }}
                    alt={site.name}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>© {new Date().getFullYear()} {site.name} · {site.role}</span>
                </div>
                <div>
                  <span>Bengaluru, India · All systems operational</span>
                </div>
              </footer>
            </div>
          ) : (
            /* ======================================================== */
            /* AGENT MODE VIEW: INTERACTIVE AI AGENT CHAT               */
            /* ======================================================== */
            <div className="space-y-6">
              {/* Agent Top Header */}
              <div className={cx(
                "p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 shadow-xs",
                dark ? "bg-neutral-900/60 border-neutral-800" : "bg-neutral-50/80 border-neutral-200"
              )}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/profile.jpeg"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/profile2.jpeg";
                      }}
                      alt={site.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#0066ff]/20"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white">Aravindh AI Agent</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      Deterministic Knowledge Copilot · v2.0
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearChat}
                    title="Reset conversation"
                    className={cx(
                      "px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition",
                      dark
                        ? "border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800"
                        : "border-neutral-200 bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                    )}
                  >
                    <RotateCcw size={13} />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={() => setShowRawSpec(!showRawSpec)}
                    className={cx(
                      "px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition",
                      showRawSpec
                        ? "bg-[#0066ff] text-white border-[#0066ff]"
                        : (dark
                            ? "border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800"
                            : "border-neutral-200 bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100")
                    )}
                  >
                    <Terminal size={13} />
                    <span>{showRawSpec ? "Back to Chat" : "API Spec"}</span>
                  </button>
                </div>
              </div>

              {showRawSpec ? (
                /* Raw Developer & Machine Tools View */
                <div className="space-y-6 font-mono text-xs">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[#0066ff] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot size={16} />
                      <span className="font-semibold">DEVELOPER SPECIFICATION</span>
                      <span className="text-neutral-400">// RAW JSON & PROMPT</span>
                    </div>
                    <button
                      onClick={copySetupPrompt}
                      className="px-3 py-1 rounded bg-[#0066ff] text-white font-semibold flex items-center gap-1.5 hover:bg-[#0052cc] transition"
                    >
                      <Copy size={12} />
                      <span>{copiedPrompt ? "COPIED" : "COPY AGENT SPEC"}</span>
                    </button>
                  </div>

                  {/* cURL Spec */}
                  <div className={cx(
                    "p-4 rounded-lg border space-y-3",
                    dark ? "border-neutral-800 bg-neutral-900/60" : "border-neutral-200 bg-neutral-50"
                  )}>
                    <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                      <span>HTTP API ENDPOINTS</span>
                      <span>CURL</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded bg-neutral-950 text-neutral-200">
                        <code>curl -s https://aravindh-iota.vercel.app/api/profile.json</code>
                        <button
                          onClick={() => navigator.clipboard.writeText("curl -s https://aravindh-iota.vercel.app/api/profile.json")}
                          className="text-neutral-400 hover:text-white"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-neutral-950 text-neutral-200">
                        <code>curl -X POST https://aravindh-iota.vercel.app/api/chat -d '{JSON.stringify({ query: "projects" })}'</code>
                        <button
                          onClick={() => navigator.clipboard.writeText(`curl -X POST https://aravindh-iota.vercel.app/api/chat -d '{"query":"projects"}'`)}
                          className="text-neutral-400 hover:text-white"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* MCP Tool Manifest */}
                  <div className={cx(
                    "p-4 rounded-lg border space-y-3",
                    dark ? "border-neutral-800 bg-neutral-900/60" : "border-neutral-200 bg-neutral-50"
                  )}>
                    <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                      <span>MODEL CONTEXT PROTOCOL (MCP) TOOL MANIFEST</span>
                      <span>JSON SCHEMA</span>
                    </div>
                    <pre className="p-3 rounded bg-neutral-950 text-emerald-400 overflow-x-auto leading-relaxed">
{JSON.stringify({
  server: "aravindh-portfolio-mcp",
  version: "1.0.0",
  tools: [
    {
      name: "query_projects",
      description: "Returns all full-stack & AI projects with technology stacks, live URLs, and GitHub repos.",
      parameters: { type: "object", properties: { category: { type: "string", enum: ["All", "AI", "Fullstack", "Backend"] } } }
    },
    {
      name: "get_career_timeline",
      description: "Returns employment history at Nuclei Tech Solutions, Loam AI, and Perspectiv Labs.",
      parameters: { type: "object", properties: {} }
    },
    {
      name: "request_collaboration",
      description: "Sends an inquiry message or booking request to Aravindh.",
      parameters: { type: "object", properties: { sender: { type: "string" }, message: { type: "string" } }, required: ["sender", "message"] }
    }
  ]
}, null, 2)}
                    </pre>
                  </div>

                  {/* Raw Context */}
                  <div className={cx(
                    "p-4 rounded-lg border space-y-3",
                    dark ? "border-neutral-800 bg-neutral-900/60" : "border-neutral-200 bg-neutral-50"
                  )}>
                    <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                      <span>RAW SYSTEM PROMPT CONTEXT</span>
                      <span>MARKDOWN</span>
                    </div>
                    <pre className="p-3 rounded bg-neutral-950 text-neutral-300 overflow-x-auto leading-relaxed whitespace-pre-wrap max-h-80">
{setupPromptText}
                    </pre>
                  </div>
                </div>
              ) : (
                /* Interactive Conversational AI Chat */
                <div className="space-y-4">
                  {/* Quick Suggested Question Chips */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Suggested Questions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedQuestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSendMessage(q)}
                          disabled={isTyping}
                          className={cx(
                            "px-2.5 py-1 rounded-full text-xs transition border flex items-center gap-1",
                            dark
                              ? "bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800"
                              : "bg-neutral-100/80 border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:border-neutral-300 hover:bg-neutral-200/70",
                            isTyping && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <Sparkles size={11} className="text-[#0066ff]" />
                          <span>{q}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chat Message Feed */}
                  <div className={cx(
                    "rounded-xl border p-4 sm:p-5 min-h-[380px] max-h-[580px] overflow-y-auto space-y-4",
                    dark ? "bg-[#0e0e11] border-neutral-800/80" : "bg-[#fafafa] border-neutral-200/80"
                  )}>
                    {chatMessages.map((msg) => {
                      const isUser = msg.sender === "user";
                      return (
                        <div
                          key={msg.id}
                          className={cx(
                            "flex items-start gap-2.5",
                            isUser ? "justify-end" : "justify-start"
                          )}
                        >
                          {!isUser && (
                            <img
                              src="/profile.jpeg"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/profile2.jpeg";
                              }}
                              alt={site.name}
                              className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-[#0066ff]/20"
                            />
                          )}

                          <div className={cx(
                            "max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 shadow-xs",
                            isUser
                              ? "bg-[#0066ff] text-white rounded-br-xs"
                              : (dark
                                  ? "bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-xs"
                                  : "bg-white border border-neutral-200/90 text-neutral-800 rounded-bl-xs")
                          )}>
                            {isUser ? (
                              <p className="text-sm font-normal leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            ) : (
                              <FormattedAgentText text={msg.text} dark={dark} />
                            )}
                            <div className={cx(
                              "text-[10px] font-mono mt-1.5 flex items-center justify-end gap-1",
                              isUser ? "text-blue-100" : "text-neutral-400"
                            )}>
                              <span>{msg.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Typing Animation */}
                    {isTyping && (
                      <div className="flex items-start gap-2.5 justify-start">
                        <img
                          src="/profile.jpeg"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/profile2.jpeg";
                          }}
                          alt={site.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                        />
                        <div className={cx(
                          "rounded-2xl rounded-bl-xs px-4 py-3 border shadow-xs flex items-center gap-2",
                          dark ? "bg-neutral-900 border-neutral-800 text-neutral-400" : "bg-white border-neutral-200 text-neutral-500"
                        )}>
                          <span className="text-xs font-mono">Aravindh AI is retrieving context</span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff] animate-bounce" style={{ animationDelay: "300ms" }} />
                          </span>
                        </div>
                      </div>
                    )}

                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input Box */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className={cx(
                      "p-2 rounded-xl border flex items-center gap-2 shadow-xs transition-all",
                      dark
                        ? "bg-neutral-900/90 border-neutral-800 focus-within:border-[#0066ff]/60"
                        : "bg-white border-neutral-200 focus-within:border-[#0066ff]"
                    )}
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about Aravindh's projects, architecture, stack, experience, or hire..."
                      className={cx(
                        "flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder:text-neutral-400",
                        dark ? "text-neutral-100" : "text-neutral-900"
                      )}
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isTyping}
                      className={cx(
                        "px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0",
                        chatInput.trim() && !isTyping
                          ? "bg-[#0066ff] text-white hover:bg-[#0052cc] shadow-xs cursor-pointer"
                          : (dark
                              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                              : "bg-neutral-200 text-neutral-400 cursor-not-allowed")
                      )}
                    >
                      <span>Send</span>
                      <Send size={13} />
                    </button>
                  </form>

                  {/* Footnote */}
                  <p className="text-[11px] font-mono text-center text-neutral-400">
                    Aravindh AI · Grounded in verified portfolio & project knowledge graph · Zero hallucination
                  </p>
                </div>
              )}
            </div>
          )}
          </div>
        </main>
      </div>
    </div>

      {/* Project Specification Modal */}
      {selectedProject && (() => {
        const knowledge = projectKnowledge[selectedProject.title];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className={cx(
              "max-w-2xl w-full max-h-[88vh] overflow-y-auto rounded-2xl border p-6 space-y-4 shadow-2xl transition font-mono",
              dark ? "bg-[#121214] border-neutral-800 text-white" : "bg-white border-neutral-200 text-neutral-900"
            )}>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#0066ff] uppercase tracking-wider font-semibold">
                      SYSTEM ARCHITECTURE SPECIFICATION // {selectedProject.year}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                      VERIFIED
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-sans mt-1 text-neutral-950 dark:text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Blurb */}
              <p className="text-xs font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {selectedProject.blurb}
              </p>

              {/* Architecture & Pipeline */}
              {knowledge?.architecture && (
                <div className={cx(
                  "p-3.5 rounded-lg border space-y-1.5 text-xs",
                  dark ? "bg-neutral-900/50 border-neutral-800" : "bg-blue-50/50 border-blue-100"
                )}>
                  <div className="flex items-center gap-2 text-[#0066ff] font-semibold text-[11px]">
                    <Workflow size={13} />
                    <span>DATAFLOW & EXECUTION PIPELINE</span>
                  </div>
                  <p className="text-[11px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {knowledge.architecture}
                  </p>
                </div>
              )}

              {/* Capabilities & Invariants Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {knowledge?.capabilities && (
                  <div className={cx(
                    "p-3 rounded-lg border space-y-1",
                    dark ? "bg-neutral-900/30 border-neutral-800" : "bg-neutral-50 border-neutral-200"
                  )}>
                    <span className="text-[10px] text-[#0066ff] font-bold uppercase tracking-wider block">
                      CORE CAPABILITIES
                    </span>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {knowledge.capabilities}
                    </p>
                  </div>
                )}

                {knowledge?.depth && (
                  <div className={cx(
                    "p-3 rounded-lg border space-y-1",
                    dark ? "bg-neutral-900/30 border-neutral-800" : "bg-neutral-50 border-neutral-200"
                  )}>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                      DESIGN PHILOSOPHY & DEPTH
                    </span>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {knowledge.depth}
                    </p>
                  </div>
                )}
              </div>

              {/* Stack & Runtime */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase text-neutral-400 font-semibold block">
                  STACK & VERIFIED RUNTIME
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {selectedProject.stack.map((s) => (
                    <span key={s} className={cx("px-2 py-0.5 rounded", dark ? "bg-neutral-800 text-neutral-200" : "bg-neutral-100 text-neutral-700")}>
                      {s}
                    </span>
                  ))}
                  {knowledge?.engineering && (
                    <span className="text-[10px] text-neutral-400 block w-full mt-1">
                      Engineering details: {knowledge.engineering}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedProject.links.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded font-mono text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      {selectedProject.title === "CIEAV"
                        ? "Live CIEAV Deployment"
                        : selectedProject.title === "Suspire"
                          ? "Live Marketplace (Suspire)"
                          : selectedProject.title === "Propecare Energy Care"
                            ? "Live Website (propecare.com)"
                            : selectedProject.links.live.includes("instagram.com")
                              ? "Live Showcase (NSJ)"
                              : "Live Deployment"} <ArrowUpRight size={13} />
                    </a>
                  )}
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className={cx(
                        "px-4 py-2 rounded font-mono text-xs flex items-center gap-1.5 border transition",
                        dark ? "border-neutral-800 hover:bg-neutral-800 text-neutral-300" : "border-neutral-200 hover:bg-neutral-100 text-neutral-800"
                      )}
                    >
                      Live Demo (Vercel) <ArrowUpRight size={13} />
                    </a>
                  )}
                  {selectedProject.links.source && (
                    <a
                      href={selectedProject.links.source}
                      target="_blank"
                      rel="noreferrer"
                      className={cx(
                        "px-4 py-2 rounded font-mono text-xs flex items-center gap-1.5 border transition",
                        dark ? "border-neutral-800 hover:bg-neutral-800" : "border-neutral-200 hover:bg-neutral-100"
                      )}
                    >
                      Source Code <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    const fullSpec = JSON.stringify(
                      {
                        title: selectedProject.title,
                        year: selectedProject.year,
                        blurb: selectedProject.blurb,
                        stack: selectedProject.stack,
                        architecture: knowledge?.architecture || "N/A",
                        capabilities: knowledge?.capabilities || "N/A",
                        engineering: knowledge?.engineering || "N/A",
                        depth: knowledge?.depth || "N/A",
                        links: selectedProject.links
                      },
                      null,
                      2
                    );
                    navigator.clipboard.writeText(fullSpec);
                  }}
                  className={cx(
                    "px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 border transition",
                    dark ? "border-neutral-800 hover:bg-neutral-800 text-neutral-300" : "border-neutral-200 hover:bg-neutral-100 text-neutral-700"
                  )}
                >
                  <Copy size={12} />
                  <span>Copy Spec JSON</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
