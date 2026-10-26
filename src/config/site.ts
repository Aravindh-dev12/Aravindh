export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; demo?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  categories?: ("Frontend" | "Backend" | "Fullstack" | "AI")[];
};

export type JobClient = {
  name: string;
  logo: string;
  role?: string;
  url?: string;
};

export type JobLiveLink = {
  label: string;
  url: string;
  badge?: string;
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb?: string;
  bullets?: string[];
  url?: string;
  clientsLabel?: string;
  clients?: JobClient[];
  liveLinks?: JobLiveLink[];
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
    booking: "https://cal.com/aravindhan-b-n2l0be/aravindh-cal?user=aravindhan-b-n2l0be&overlayCalendar=true",
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
      liveLinks: [
        {
          label: "Solar SCADA Case Study",
          url: "https://www.nucleitech.online/case-study-solar.html",
          badge: "Live Telemetry",
        },
      ],
      clientsLabel: "SCADA Services & Enterprise Clients",
      clients: [
        {
          name: "Naga Private Limited",
          logo: "/clients/naga.jpg",
          role: "Industrial SCADA & Telemetry Systems",
          url: "https://www.nagamills.com/",
        },
        {
          name: "Surya Batteries",
          logo: "/clients/surya.png",
          role: "Battery Monitoring & SCADA Automation",
          url: "https://suryaabatteries.com/",
        },
      ],
      bullets: [
        "Architected, built, and delivered 5+ full-stack production web applications and live dashboards—explore the live [Solar SCADA Case Study](https://www.nucleitech.online/case-study-solar.html)—translating complex industrial requirements into scalable architectures used by real operational teams.",
        "Engineered industrial SCADA services, real-time telemetry monitoring, and automated control pipelines for premier industrial clients including Naga Private Limited (large-scale mills & manufacturing) and Surya Batteries (energy storage & battery testing).",
        "Built live real-time monitoring dashboards for solar power plants and windmill installations across the renewable energy industry, streaming high-frequency IoT telemetry, power generation metrics, turbine health, and instant fault alert workflows.",
        "Designed and deployed a full-featured enterprise CRM platform actively serving 100+ daily operational users in the renewable energy sector to manage client pipelines, site commissioning, maintenance ticketing, and stakeholder communication.",
        "Developed resilient data acquisition and processing pipelines for embedded devices and local on-premise ERP systems, ensuring continuous offline telemetry capture with zero data loss.",
        "Implemented a lightweight MLP-Mixer neural architecture for multi-sensor signal processing, enabling predictive maintenance and anomaly detection on edge devices.",
      ],
    },
    {
      company: "Loam AI",
      role: "AI Engineer",
      period: "Feb 2026 – Jun 2026",
      clientsLabel: "Live Products & Enterprise Platforms",
      clients: [
        {
          name: "Suspire Marketplace",
          logo: "/clients/suspire.jpg",
          role: "Live (400+ Sustainable Brands, 800+ Vendors)",
          url: "https://suspire.in/",
        },
        {
          name: "NSJ ERP System",
          logo: "/clients/nsj.png",
          role: "Live Enterprise ERP (Niti Shah Jewels)",
          url: "https://www.instagram.com/nitishahjewels/",
        },
      ],
      bullets: [
        "Engineered core full-stack platform features and vendor infrastructure for [Suspire](https://suspire.in/)—India's home of 400+ sustainable, eco-friendly, vegan, and cruelty-free curated brands—supporting 800+ vendors and 2,000+ active customers across fashion, cosmetics, home decor, and food & beverages.",
        "Architected and deployed the [NSJ ERP System](https://www.instagram.com/nitishahjewels/) for Niti Shah Jewels, an enterprise-grade ERP centralizing jewelry manufacturing, gemstone & gold inventory, accounting vouchers, sales pipelines, and multi-domain AI agent workflows.",
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
      title: "NSJ ERP System",
      blurb:
        "Production-ready jewelry ERP platform centralizing accounting, sales, inventory, jewelry manufacturing, CRM, reporting, and AI-assisted business operations for Niti Shah Jewels.",
      story:
        "NSJ ERP centralizes finance, vouchers, invoices, customer and sales workflows, jewelry manufacturing, gold and gemstone inventory, task management, reporting, and operational analytics. Its AI agent layer supports product, accounting, vendor, inventory, sales, production, and reporting workflows through natural-language interaction.",
      stack: ["Django", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Docker", "AI Agents"],
      year: "2026",
      links: {
        live: "https://www.instagram.com/nitishahjewels/",
        source: "https://github.com/Aravindh-dev12/NSJ-ERP",
      },
      featured: true,
      image: "/projects/nsj-erp.png",
      categories: ["Fullstack", "Backend", "AI"],
    },
    {
      title: "Suspire",
      blurb:
        "Home of 400+ sustainable and curated brands across eco-friendly, vegan, and cruelty-free fashion, cosmetics, home decor, and food & beverages, serving 800+ vendors and 2,000+ active customers.",
      story:
        "Suspire is India's premier conscious e-commerce marketplace bringing together over 400+ sustainable brands. Engineered scalable vendor onboarding pipelines supporting 800+ merchant integrations, multi-category catalog search, fast checkout pipelines, and reliable order fulfillment serving 2,000+ customers.",
      stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      year: "2026",
      links: {
        live: "https://suspire.in/",
      },
      featured: true,
      image: "/projects/suspire.jpg",
      categories: ["Fullstack", "Frontend", "Backend"],
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
      links: {
        live: "https://propecare.com/",
        demo: "https://propcare-epc.vercel.app/",
        source: "https://github.com/Aravindh-dev12/Propecare",
      },
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
        "Enterprise CRM application actively serving 100+ daily operational users in the renewable energy sector, streamlining client management, solar/windmill project pipelines, commissioning, and maintenance workflows.",
      stack: ["React", "CRM", "TypeScript", "Node.js", "PostgreSQL"],
      year: "Client",
      links: { source: "https://github.com/Aravindh-dev12/Nucleitech-CRM-App" },
      featured: true,
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
  writing: [
    {
      title: "AI Security in 2026: When the Defender Becomes the Threat",
      summary: "A field guide to the evolving AI security landscape, including prompt injection, multi-agent attack surfaces, vulnerability discovery, governance, and practical controls for engineering teams.",
      date: "May 30, 2026",
      url: "https://medium.com/@aravindh1653/ai-security-in-2026-when-the-defender-becomes-the-threat-0ecb4b83253e",
      readingTime: "12 min read",
    },
    {
      title: "ReACT AI Agents: Smarter AI Through Reasoning and Action",
      summary: "An introduction to agent architecture, tool use, planning, feedback loops, and the differences between single-agent and multi-agent systems.",
      date: "Dec 27, 2025",
      url: "https://medium.com/@aravindh1653/react-ai-agents-smarter-ai-through-reasoning-and-action-1b4f59744ce8",
      readingTime: "11 min read",
    },
    {
      title: "Introduction to Large Language Models and Their Future Scope",
      summary: "A practical overview of language-model evolution, from recurrent networks to transformers, and how pre-training and fine-tuning shape model behavior.",
      date: "Dec 25, 2025",
      url: "https://medium.com/@aravindh1653/introduction-to-large-language-models-and-their-future-scope-35269fbdd076",
      readingTime: "7 min read",
    },
  ] as Post[],
  github: { username: "Aravindh-dev12", contributionsLastYear: "500+" },
  footerNote: "Built with ❤️ and hard work",
} as const;

export type Site = typeof site;
