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
  blurb: string;
  url?: string;
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
  url: "https://anuragdotdev.vercel.app",
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  profileImages: [
    "/profile.jpg",
    "/profile2.png",
  ],
  bannerImage: "/images/cover.jpg",
  socialBannerImage: "/social-banner.png",
  initials: "AB",
  role: "Full Stack & AI Engineer",
  location: "Bengaluru, India",
  timezone: "Asia/Kolkata",
  email: "aravindh1653@gmail.com",
  greeting: "Hey, I'm Aravindh",
  tagline: "I build end-to-end products across modern web stacks and AI-powered systems, with a focus on clean engineering, strong UX, and reliable delivery.",
  about: [
    "Hey, I'm Aravindh, a Full Stack & AI Engineer who enjoys building complete products, from polished interfaces and scalable APIs to intelligent features powered by modern AI.",
    "I like working across the entire stack: frontend, backend, databases, cloud infrastructure, and AI integrations. I care about making systems that are useful, maintainable, and thoughtfully designed.",
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
    nowBuilding: "CIEAV",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/Aravindh-dev12",
    twitter: "https://x.com/aravindh213",
    linkedin: "https://www.linkedin.com/in/aravindhanb/",
    email: "mailto:aravindh1653@gmail.com",
    resume: "https://medium.com/@aravindh1653",
    discord: "https://discord.gg/ra4kyKdTk",
    medium: "https://medium.com/@aravindh1653",
  },
  experience: [
    {
      company: "Independent Developer",
      role: "Full Stack & AI Engineer",
      period: "2025 – Present",
      blurb:
        "Building and deploying end-to-end web products, SaaS platforms, AI-powered features, APIs, databases, real-time systems, and modern cloud infrastructure.",
      url: "",
    },
  ] as Job[],
  projects: [
    {
      title: "CIEAV",
      blurb:
        "An always-on commit layer for consequential digital actions, combining a local control plane, deterministic safety policy, privacy reduction, outcome verification, signed Action Receipts, and verified Undo.",
      story:
        "CIEAV keeps execution authority and durable user state local while using cloud intelligence only for semantic interpretation. The gateway mediates protected browser surfaces, minimizes semantic evidence before inference, tracks cognitive debt, verifies observable outcomes, and signs receipts with per-install Ed25519 identities. Cloud interpretation never receives local replay or commit authority.",
      stack: ["Node.js", "Python", "Chrome", "Ed25519", "IBM Granite"],
      year: "2026",
      links: {
        live: "https://cieav-web.vercel.app/",
        source: "https://github.com/Aravindh-dev12/Cieav-the-Commit-Layer-for-the-Internet",
      },
      featured: true,
      categories: ["AI", "Fullstack", "Backend"],
    },
    {
      title: "Hallucination-Resistant LLM",
      blurb:
        "A retrieval and verification LLM pipeline designed to reduce hallucinations using open web search, crawling, evidence grounding, and entailment-based verification.",
      story:
        "The system combines Retrieval-Augmented Generation with Searx and Scrapy for large-scale web retrieval, LoRA-refined instruction models, vector search, and an entailment verifier that checks generated claims against retrieved evidence. The architecture is containerized for Docker and Kubernetes deployment and supports modular retrieval, generation, and verification services.",
      stack: ["Python", "RAG", "Searx", "Scrapy", "LoRA"],
      year: "2026",
      links: {
        live: "https://huggingface.co/spaces/Aravindhan11/hallucination_resistant_llm_with_searx_scrapy_retrieval_and_verifier_ensemble",
        source: "https://github.com/Aravindh-dev12/hallucination_resistant_llm_with_searx_scrapy_retrieval_and_verifier",
      },
      featured: true,
      categories: ["AI", "Backend"],
    },
    {
      title: "Advanced Adversarial Model Extraction Lab",
      blurb:
        "An authorized AI security research lab for studying model extraction attacks, active querying strategies, surrogate model fidelity, and defensive leakage analysis.",
      story:
        "The lab combines knockoff-style stealing, DisGUIDE-style active querying, logit reconstruction, and an active extraction simulator. It evaluates entropy, margin, disagreement, k-center, random, and hybrid query strategies with fidelity, KL divergence, calibration error, and task accuracy metrics, plus an interactive Gradio research interface.",
      stack: ["Python", "Gradio", "Scikit-learn", "Active Learning", "AI Security"],
      year: "2026",
      links: {
        live: "https://huggingface.co/spaces/Aravindhan11/advanced-adversarial-model-extraction-lab?logs=container",
        source: "https://github.com/Aravindh-dev12/Adversarial-Model-Extraction",
      },
      featured: true,
      categories: ["AI", "Backend"],
    },
    {
      title: "NEXUS-LWM OS",
      blurb:
        "An MCP-native agentic AI operating architecture for latent-world planning, capability fabrication, governed automation, workflow orchestration, and safe cross-system execution.",
      story:
        "The system uses a nine-layer architecture with JEPA latent-state encoding, Transformer prediction, CEM planning, capability DAG fabrication, an AUQ and MACI safety gate, step-level RL credit assignment, and a LinUCB telemetry router. It also supports MCP JSON-RPC capabilities, approval-gated workflow execution, audit trails, triggers, and a resumable control plane.",
      stack: ["Python", "MCP", "JEPA", "Transformers", "Reinforcement Learning"],
      year: "2026",
      links: {
        source: "https://github.com/Aravindh-dev12/lwm-fabricator-modelNeural-Execution-and-Unified-Systems-Fabrication-Operating-Architecture",
      },
      status: "In Progress",
      categories: ["AI", "Backend"],
    },
    {
      title: "NeuroSymbolic Meta-Reasoning Agent",
      blurb:
        "A CLI-first reasoning agent that combines local LLM routing, symbolic solvers, neural inference, memory, hierarchical planning, recursive critique, and safety checks.",
      story:
        "The agent routes across Ollama, llama.cpp, and Hugging Face model backends while combining symbolic reasoning through Z3 and SymPy with neural embeddings and task classification. It includes working and episodic memory, vector stores, recursive self-improvement, hierarchical planning, telemetry, constitutional guardrails, and a Gradio dashboard.",
      stack: ["Python", "Ollama", "Z3", "SymPy", "Gradio"],
      year: "2026",
      links: {
        live: "https://huggingface.co/spaces/Aravindhan11/NeuroSymbolic-Meta-Reasoner",
        source: "https://github.com/Aravindh-dev12/NeuroSymbolic-meta-reasoning-agent",
      },
      featured: true,
      categories: ["AI", "Backend"],
    },
    {
      title: "Looca Voice AI Agent",
      blurb:
        "A full-stack voice-first AI platform with real-time voice orchestration, retrieval memory, tool execution, authentication, and intelligent service workflows.",
      story:
        "Looca combines a Next.js and TypeScript frontend with a FastAPI backend, PostgreSQL, Qdrant, Redis, VAPI, and Claude. The architecture includes episodic memory, predictive intent preloading, psychoacoustic emotion analysis, semantic retrieval, tool-use execution, causal reasoning, and service auto-ingestion.",
      stack: ["Next.js", "FastAPI", "PostgreSQL", "Qdrant", "VAPI"],
      year: "2026",
      links: {
        live: "https://looca-voice-ai-agent.onrender.com",
        source: "https://github.com/Aravindh-dev12/Looca-Voice-AI-Agent",
      },
      categories: ["AI", "Fullstack"],
    },
    {
      title: "Seelay App",
      blurb:
        "An application project currently in active development. The source repository is linked and the public live deployment is being prepared.",
      stack: [],
      year: "2026",
      links: {
        source: "https://github.com/Aravindh-dev12/Seelay-App",
      },
      status: "In Progress",
      categories: ["Fullstack"],
    },
  ] as Project[],
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Shadcn UI",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Supabase",
    "Firebase",
    "REST APIs",
    "JWT",
    "Git",
    "GitHub",
    "Postman",
    "Vercel",
    "Figma",
    "C++",
    "Python",
  ],
  writing: [
    {
      title: "Understanding HTTP: The Backbone of the Web",
      summary: "A deep dive into the Hypertext Transfer Protocol, exploring header lifecycle, request methods, statelessness, and connection optimization from HTTP/1.1 to HTTP/3.",
      date: "Aug 22, 2026",
      readingTime: "15 min read",
      url: "https://medium.com/@anuragdotdev/understanding-http-the-backbone-of-the-web-3d2109d0facd",
    },
    {
      title: "API Rate Limiting: I thought it was just counting requests...",
      summary: "An analysis of rate limiting algorithms from Token Bucket to Sliding Window logs, detailing how distributed systems protect API infrastructure under load.",
      date: "Jul 12, 2026",
      readingTime: "14 min read",
      url: "https://medium.com/@anuragdotdev/api-rate-limiting-i-thought-it-was-just-counting-requests-682cefa2f56c",
    },
    {
      title: "The JWT Storage Debate is Over: Here's the Production-Grade Architecture Your App Actually Needs",
      summary: "A definitive guide to JWT storage in frontend applications, detailing why standard localStorage fails and how to implement secure memory-session architecture with HTTP-only cookies.",
      date: "Jun 24, 2026",
      readingTime: "8 min read",
      url: "https://medium.com/@anuragdotdev/the-jwt-storage-debate-is-over-heres-the-production-grade-architecture-your-app-actually-needs-9ab284da065f",
    }
  ] as Post[],
  github: {
    username: "Aravindh-dev12",
    contributionsLastYear: "500+",
  },
  footerNote: "Built with ❤️ and hardwork"
} as const;

export type Site = typeof site;
