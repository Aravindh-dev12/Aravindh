export const projectKnowledge: Record<string, { architecture: string; capabilities: string; engineering: string; depth: string }> = {
  CIEAV: {
    architecture: "Human, AI agent, or automation -> local Gateway -> deterministic safety -> privacy reduction -> cloud semantic interpretation -> conservative local merge -> policy -> Preview/Commit/Cancel -> signed receipt -> local outcome observer -> verified Undo.",
    capabilities: "Local authority, browser control, privacy reduction, deterministic policy enforcement, Ed25519 receipts, outcome verification, audit history, cognitive friction, and verified inverse actions.",
    engineering: "Node.js, Python, Chrome, IBM Granite, Ed25519 signing, TLS, local durable state, fail-closed controls, and a receipt model that separates commit from actual success.",
    depth: "Cloud is used for interpretation, not authority. Raw secrets and durable user state stay local, and an action is not treated as successful merely because a browser request completed."
  },
  openDev: {
    architecture: "Company request -> SOP retrieval with BM25 -> local model planning -> one tool action at a time -> deterministic policy engine -> browser/file execution -> evidence and hash-chained audit -> independent ERP verification -> repair or escalation.",
    capabilities: "Invoice processing, SOP retrieval, browser automation, policy guardrails, escalation, evidence capture, audit trails, independent verification, and repair feedback.",
    engineering: "Python, Qwen through Ollama or OpenAI-compatible servers, Playwright, Flask ERP, BM25, YAML policy, hash-chained audit logs, and system-of-record verification.",
    depth: "The prototype is intentionally narrow and testable. The verifier checks real ERP state and invariants instead of trusting the model's final claim."
  },
  "Octic AI Agent": {
    architecture: "Context -> Harness -> Loop -> Graph -> Managed runtime, with tools, memory, planning and execution separated into inspectable layers.",
    capabilities: "Research, coding, content, data pipelines, customer support, workflow automation, multi-agent teams, memory, tool use, and managed execution.",
    engineering: "Python agent framework with MCP-oriented tools, RAG, multi-agent orchestration, model routing, persistent context, and local or managed runtimes.",
    depth: "The project treats an AI workforce as an engineered runtime rather than a single prompt. Context, actions, stopping conditions, coordination and execution are explicit."
  },
  Oundnote: {
    architecture: "Audio capture -> modular transcription -> diarization and speaker matching -> analysis -> SQLite/FTS5 -> local retrieval and MCP clients.",
    capabilities: "Microphone and system audio capture, transcription, speaker diarization, searchable notes, local RAG, MCP, voice matching, retention controls, and desktop AI integration.",
    engineering: "Local speech processing, SQLite FTS5, modular workers, MCP, optional embeddings, platform-specific audio capture, and local AI providers.",
    depth: "Its core design is local-first: recordings, transcripts, model files and application data remain under user control, with external integrations explicitly opt in."
  },
  "Looca Voice AI Agent": {
    architecture: "Next.js frontend -> FastAPI backend -> PostgreSQL application state, Qdrant semantic memory, Redis preloading, and VAPI voice orchestration.",
    capabilities: "Voice agents, authentication, semantic memory, VAPI webhooks, RAG, predictive preloading, emotion analysis, causal reasoning, health trajectory workflows, and service auto-ingestion.",
    engineering: "Next.js, TypeScript, FastAPI, PostgreSQL, Qdrant, Redis, VAPI, Claude, Voyage embeddings, SQLAlchemy, asyncpg, and Render deployment.",
    depth: "Realtime voice transport is separated from durable application state and semantic memory, so the voice layer can evolve without rewriting the domain model."
  },
  "Oli — Sovereign Notch Meeting Copilot": {
    architecture: "Electron shell -> native or Chromium audio capture -> persistent Rust Whisper -> local Express API -> SQLite/FTS5 -> local AI and MCP -> protected notch HUD.",
    capabilities: "Ambient meeting HUD, local transcription, audio capture, meeting search, commitments, MEDDPICC, battlecards, local agents, approvals, schedules, MCP, Notion and Obsidian indexing.",
    engineering: "Electron, Rust, whisper.cpp, ScreenCaptureKit, SQLite FTS5, SSE, local chat endpoints, MCP, native macOS helpers, tests and release automation.",
    depth: "Oli is designed around sovereignty: capture, transcripts, memory, permissions and side effects can stay local while cloud providers remain optional adapters."
  },
  "CLI Smart Inbox Agent": {
    architecture: "Mailbox ingestion -> attachment staging, fingerprinting and malware scan -> extraction/OCR -> classification -> provenance -> Spring Boot persistence -> Angular human review.",
    capabilities: "Email classification, PDF extraction, OCR, table and image evidence, multilingual handling, confidence and provenance, human review, audit events, and batch performance measurement.",
    engineering: "Angular, Spring Boot, Python, Oracle, ClamAV, pdfplumber, Tesseract OCR, structured extraction, provenance tracking and Docker Compose.",
    depth: "The safety principle is no guessing. Missing fields remain Not stated with zero confidence and no source, while extracted facts carry evidence and review context."
  },
  "Hallucination-Resistant LLM": {
    architecture: "Searx search -> Scrapy crawl -> preprocessing -> vector index -> RAG generation -> entailment verification, with services containerized for deployment.",
    capabilities: "Web search, crawling, RAG, LoRA refinement, vector retrieval, entailment verification, voice input, chat, microservices and Kubernetes deployment.",
    engineering: "Python, Searx, Scrapy, RAG, LoRA, Docker and Kubernetes with separate retrieval, generation and verification stages.",
    depth: "Generation and verification are separate so factual support can be evaluated rather than assuming fluent text is correct."
  },
  "NeuroSymbolic Meta-Reasoning Agent": {
    architecture: "Meta-controller -> local/open-weight model routing -> neural task routing and symbolic solvers -> working/episodic/vector memory -> hierarchical planning -> recursive critique -> safety checks.",
    capabilities: "Local model routing, symbolic logic, SymPy math, embeddings, episodic memory, hierarchical planning, self-critique, constitutional safety, telemetry, Gradio and CLI operation.",
    engineering: "Python, Ollama, llama.cpp, Transformers, Z3-style logic, SymPy, Chroma/FAISS/SQLite, Gradio and Docker.",
    depth: "Language models propose and interpret while deterministic symbolic components solve or validate structured parts of a task."
  },
  "LWM Fabricator": {
    architecture: "Neural process kernel -> memory -> MCP agent layer -> capability fabrication -> latent world model -> safety gate -> action executor -> reinforcement learning -> telemetry.",
    capabilities: "MCP capability discovery, workflow DAGs, latent world-model planning, action uncertainty, adversarial safety debate, approval gates, workspace confinement, webhooks, retries, audit trails and HTTP APIs.",
    engineering: "Python, MCP JSON-RPC, JEPA, Transformer prediction, CEM planning, AUQ, MACI debate, GRPO/Agent-Ri, Graphiti and LinUCB telemetry.",
    depth: "It explores an AI operating architecture where planning, capability synthesis, safety and execution are explicit system layers rather than hidden in one agent prompt."
  },
};
