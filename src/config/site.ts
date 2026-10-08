export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  categories?: ("Frontend" | "Backend" | "Fullstack" | "AI")[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb?: string;
  bullets?: string[];
  url?: string;
};

export type Education = {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export const site = {
  name: "Aravindh B",
  firstName: "Aravindh",
  url: "https://aravindh-iota.vercel.app",
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  profileImages: ["/profile.jpeg", "/profile2.jpeg"],
  bannerImage: "/images/cover.jpg",
  socialBannerImage: "/social-banner.png",
  initials: "AB",
  role: "Full Stack & AI Engineer",
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  email: "aravindh1653@gmail.com",
  greeting: "Hey, I'm Aravindh",
  tagline:
    "I build end-to-end products across modern web stacks and AI-powered systems, with a focus on clean engineering, strong UX, and reliable delivery.",
  about: [
    "Hey, I'm Aravindh, a Full Stack & AI Engineer who enjoys building complete products, from polished interfaces and scalable APIs to intelligent features powered by modern AI.",
    "I work across frontend, backend, databases, cloud infrastructure, and AI integrations, with a focus on systems that are useful, maintainable, and thoughtfully designed.",
    "I don't ship junk. Maintainability isn't optional. And I build best when I'm curious.",
  ],
  tldr: [
    "Building end-to-end products.",
    "Exploring AI engineering.",
    "Shipping consistently.",
    "Obsessed with clean code.",
  ],
  status: {
    available: true,
    availableText: "open to opportunities",
    nowLearning: "AI Engineering • System Design • Full Stack Architecture • DevOps",
    nowBuilding: "Agentic AI systems",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/Aravindh-dev12",
    linkedin: "https://www.linkedin.com/in/aravindhanb/",
    googleScholar: "https://scholar.google.com/citations?hl=en&user=o-qnHb4AAAAJ",
    email: "mailto:aravindh1653@gmail.com",
    resume: "https://drive.google.com/file/d/1eJR2RSZysk11_ITz_iz11MnL-SmAE1kk/view",
    medium: "https://medium.com/@aravindh1653",
  },
  education: [
    {
      degree: "BE",
      field: "Computer Science Engineering",
      institution: "Chettinad College of Engineering and Technology",
      location: "Karur, Tamil Nadu",
      period: "Aug 2020 – Jun 2024",
    },
  ] as Education[],
  experience: [
    {
      company: "Nuclei Tech Solutions",
      role: "Software Developer · Freelance",
      period: "Jun 2026 – Present",
      bullets: [
        "Engineer data acquisition and processing workflows for embedded-device data used in local, on-premise ERP systems.",
        "Developed a lightweight MLP-Mixer-based architecture designed for extensibility across multiple data modalities.",
      ],
    },
    {
      company: "Loam AI",
      role: "AI Engineer",
      period: "Feb 2026 – Jun 2026",
      bullets: [
        "Built and launched a full-stack B2B freight-forwarding product from scratch, delivering the MVP in five months while owning ideation, architecture, production readiness, and Agile execution.",
        "Architected a modular application across frontend, backend, database, and integrations using React, Next.js, TypeScript, PostgreSQL, and Drizzle ORM.",
        "Implemented RBAC authentication, transactional email workflows, guided onboarding, currency-conversion markups, PWA push notifications, and CI/CD pipelines.",
        "Led a team of five, assigned engineering work, reviewed implementation direction, and mentored developers on clean code and Git workflows.",
      ],
    },
    {
      company: "Perspectiv Labs",
      role: "Software Developer",
      period: "Jul 2024 – Feb 2026",
      bullets: [
        "Architected modular full-stack systems using React, Next.js, TypeScript, PostgreSQL, and Drizzle ORM with maintainable service boundaries.",
        "Built production features including RBAC authentication, email workflows, onboarding tours, currency-conversion markups, PWA push notifications, and deployment pipelines.",
        "Delivered reusable frontend components, backend services, database models, APIs, and third-party integrations across the software-development lifecycle.",
      ],
    },
  ] as Job[],
  projects: [
    {
      title: "CIEAV",
      blurb:
        "The commit layer for the internet: an always-on local control plane between digital intent and consequence, keeping deterministic safety and final authority local while cloud services provide privacy-reduced interpretation.",
      stack: ["Node.js", "Python", "Chrome", "Ed25519", "IBM Granite", "AI"],
      year: "2026",
      links: {
        live: "https://cieav.vercel.app/",
        source: "https://github.com/Aravindh-dev12/cieav",
      },
      featured: true,
      image: "https://opengraph.githubassets.com/1/Aravindh-dev12/cieav",
      categories: ["AI", "Fullstack", "Backend"],
    },
    {
      title: "openDev",
      blurb:
        "Local autonomous company operator for trustworthy back-office automation, combining local LLMs, browser control, company procedures, deterministic policy guardrails, audit trails, and independent verification.",
      stack: ["Python", "Qwen", "Ollama", "Playwright", "BM25", "Flask", "AI"],
      year: "2026",
      links: { source: "https://github.com/Aravindh-dev12/Opendev" },
      featured: true,
      image: "https://raw.githubusercontent.com/Aravindh-dev12/Opendev/main/docs/media/approved.png",
      categories: ["AI", "Backend"],
    },
    {
      title: "Octic AI Agent",
      blurb:
        "Autonomous AI workforce platform for building agents that research, plan, use tools, orchestrate workflows, manage memory, and execute tasks across local or managed runtimes.",
      stack: ["Python", "LLMs", "MCP", "RAG", "Multi-Agent", "AI"],
      year: "2026",
      links: { source: "https://github.com/Aravindh-dev12/octic-Agent" },
      featured: true,
      image: "https://opengraph.githubassets.com/1/Aravindh-dev12/octic-Agent",
      categories: ["AI", "Backend"],
    },
    {
      title: "Oundnote",
      blurb:
        "Private, local-first AI meeting assistant for recording, transcription, speaker diarization, searchable meeting notes, and grounded AI workflows.",
      stack: ["Python", "FastAPI", "SQLite", "RAG", "MCP", "AI"],
      year: "2026",
      links: { source: "https://github.com/Aravindh-dev12/oundnote" },
      featured: true,
      image: "https://opengraph.githubassets.com/1/Aravindh-dev12/oundnote",
      categories: ["AI", "Backend"],
    },
    {
      title: "Looca Voice AI Agent",
      blurb:
        "Full-stack voice-first AI platform with retrieval memory, tool execution, authentication, and intelligent service workflows.",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "Qdrant", "VAPI"],
      year: "2026",
      links: {
        live: "https://looca-voice-ai-agent.onrender.com",
        source: "https://github.com/Aravindh-dev12/Looca-Voice-AI-Agent",
      },
      featured: true,
      image: "/projects/looca.png",
      categories: ["AI", "Fullstack"],
    },
    {
      title: "Oli — Sovereign Notch Meeting Copilot",
      blurb:
        "Tray-resident desktop meeting copilot designed around a black notch-style HUD: ambient when quiet, a short whisper flare for important live cues, and a command shelf for live transcript, battlecards, MEDDPICC intelligence, and commitments.",
      stack: ["Electron", "Rust", "Whisper", "SQLite", "MCP", "AI"],
      year: "2026",
      links: { source: "https://github.com/Aravindh-dev12/Oli-Note-Take-Agent" },
      featured: true,
      image: "https://opengraph.githubassets.com/1/Aravindh-dev12/Oli-Note-Take-Agent",
      categories: ["AI", "Fullstack"],
    },
    {
      title: "CLI Smart Inbox Agent",
      blurb:
        "Production-oriented Smart Inbox Assistant that reads an isolated test mailbox, processes PDF attachments, classifies messages into ICSR / Safety Report, PQC / Quality Complaint, MI / Medical Information Request, or Not Relevant, extracts structured facts with field-level confidence and source provenance, and presents results for human review.",
      stack: ["Angular", "Spring Boot", "Python", "Oracle", "ClamAV", "AI"],
      year: "2026",
      links: { source: "https://github.com/Aravindh-dev12/cli-ai" },
      featured: true,
      image: "https://opengraph.githubassets.com/1/Aravindh-dev12/cli-ai",
      categories: ["AI", "Fullstack", "Backend"],
    },
    {
      title: "Propecare Energy Care",
      blurb:
        "Client renewable-energy EPC website covering EPC services, power evacuation, grid connectivity, transmission infrastructure, testing, commissioning, safety, quality, and O&M.",
      stack: ["React", "TypeScript", "Vite", "React Router"],
      year: "Client",
      links: { live: "https://propcare-epc.vercel.app/", source: "https://github.com/Aravindh-dev12/Propecare" },
      featured: false,
      image: "https://raw.githubusercontent.com/Aravindh-dev12/Propecare/main/public/images/propecare-site-1.jpg",
      categories: ["Frontend"],
    },
    {
      title: "Reperto AI",
      blurb:
        "Client medical assistant built with Expo React Native and FastAPI for English/Hinglish complaint capture, rubric suggestions, and guided clinical follow-up.",
      stack: ["React Native", "Expo", "FastAPI", "NLP", "OpenAI"],
      year: "Client",
      links: { source: "https://github.com/Aravindh-dev12/Reperto-AI-App" },
      featured: false,
      image: "https://images.unsplash.com/photo-1758691463606-1493d79cc577?auto=format&fit=crop&w=1200&q=80",
      categories: ["AI", "Fullstack"],
    },
    {
      title: "Hallucination-Resistant LLM",
      blurb:
        "Retrieval-and-verification LLM pipeline combining open-web search, RAG, LoRA refinement, vector retrieval, and entailment-based claim verification.",
      stack: ["Python", "RAG", "Searx", "Scrapy", "LoRA"],
      year: "2026",
      links: {
        live: "https://huggingface.co/spaces/Aravindhan11/hallucination_resistant_llm_with_searx_scrapy_retrieval_and_verifier_ensemble",
        source: "https://github.com/Aravindh-dev12/hallucination_resistant_llm_with_searx_scrapy_retrieval_and_verifier",
      },
      featured: false,
      image: "/projects/hallucination.png",
      categories: ["AI", "Backend"],
    },
    {
      title: "NeuroSymbolic Meta-Reasoning Agent",
      blurb:
        "Reasoning agent combining local LLM routing, symbolic solvers, memory, hierarchical planning, recursive critique, and safety checks.",
      stack: ["Python", "Ollama", "Z3", "SymPy", "Gradio"],
      year: "2026",
      links: {
        live: "https://huggingface.co/spaces/Aravindhan11/NeuroSymbolic-Meta-Reasoner",
        source: "https://github.com/Aravindh-dev12/NeuroSymbolic-meta-reasoning-agent",
      },
      featured: false,
      image: "/projects/neurosymbolic.png",
      categories: ["AI", "Backend"],
    },
    {
      title: "LWM Fabricator",
      blurb:
        "MCP and multi-agent operating architecture built around world-model planning, dynamic DAGs, tool execution, and safety controls.",
      stack: ["Python", "MCP", "PyTorch", "JEPA", "Multi-Agent"],
      year: "2026",
      links: {
        source: "https://github.com/Aravindh-dev12/lwm-fabricator-modelNeural-Execution-and-Unified-Systems-Fabrication-Operating-Architecture",
      },
      status: "In Progress",
      featured: false,
      categories: ["AI", "Backend"],
    },
    {
      title: "Distributed Transformer Training Framework",
      blurb:
        "Transformer training framework work covering distributed execution patterns including tensor and pipeline parallelism.",
      stack: ["Python", "PyTorch", "Transformers", "Distributed Training"],
      year: "2024",
      links: { source: "https://github.com/Aravindh-dev12/Distributed-Transformer-Training-Framework" },
      featured: false,
      categories: ["AI", "Backend"],
    },
    {
      title: "NucleiTech CRM",
      blurb:
        "Client CRM product focused on practical customer-management workflows and an operational business interface.",
      stack: ["React", "CRM", "TypeScript", "Product UI"],
      year: "Client",
      links: { source: "https://github.com/Aravindh-dev12/Nucleitech-CRM-App" },
      featured: false,
      image: "https://images.unsplash.com/photo-1763038311036-6d18805537e5?auto=format&fit=crop&w=1200&q=80",
      categories: ["Fullstack"],
    },
  ] as Project[],
  skills: [
    "TypeScript", "JavaScript", "React", "React Native", "Next.js", "Node.js", "FastAPI",
    "Tailwind CSS", "PostgreSQL", "MongoDB", "Redis", "Qdrant", "RAG", "LLMs", "LoRA/PEFT",
    "Transformers", "MCP", "Multi-Agent Systems", "PyTorch", "Docker", "Kubernetes", "AWS",
    "GCP", "Git", "GitHub", "Vercel", "Python",
  ],
  writing: [] as Post[],
  github: { username: "Aravindh-dev12", contributionsLastYear: "500+" },
  footerNote: "Built with ❤️ and hard work",
} as const;

export type Site = typeof site;
