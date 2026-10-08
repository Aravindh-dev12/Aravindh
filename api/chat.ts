type ChatRequest = {
  message?: string;
  context?: {
    name?: string;
    role?: string;
    location?: string;
    timezone?: string;
    about?: string[];
    experience?: unknown[];
    skills?: string[];
    projects?: unknown[];
  };
};

function json(res: any, status: number, body: unknown) {
  res.status(status).setHeader("Content-Type", "application/json").send(JSON.stringify(body));
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return json(res, 500, { error: "OPENAI_API_KEY is not configured" });

  const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as ChatRequest;
  const message = body?.message?.trim();
  if (!message) return json(res, 400, { error: "Message is required" });

  const timezone = body.context?.timezone || "Asia/Kolkata";
  const now = new Intl.DateTimeFormat("en-IN", {
    timeZone: timezone,
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date());

  const system = [
    "You are the AI assistant inside Aravindh B's portfolio website.",
    "Answer naturally and helpfully, not like a fixed FAQ.",
    "You can answer greetings, casual conversation, general knowledge, coding questions, project questions, architecture questions, recommendations, and questions about Aravindh.",
    "For current or changing information such as today's date, current time, weather, climate conditions, news, prices, releases, or live facts, use web search when needed and clearly distinguish current facts from general knowledge.",
    "For time/date questions about the visitor, use the supplied browser time context when it is relevant.",
    "When asked about Aravindh, use the portfolio context below and do not invent experience, projects, links, employers, or skills.",
    "Keep answers concise but substantive. Use bullets, numbered steps, comparisons, or structured explanations when that improves clarity.",
    "If a question is unrelated to the portfolio, answer it normally instead of forcing it back to the portfolio.",
    "",
    `Visitor/browser local date and time context: ${now} (${timezone}).`,
    `Portfolio context: ${JSON.stringify(body.context || {})}`,
  ].join("\n");

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        instructions: system,
        input: message,
        tools: [{ type: "web_search" }],
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return json(res, upstream.status, { error: data?.error?.message || "OpenAI request failed" });
    }

    const text = data?.output_text || data?.output
      ?.flatMap((item: any) => item?.content || [])
      ?.filter((item: any) => item?.type === "output_text")
      ?.map((item: any) => item.text)
      ?.join("\n") || "I couldn't generate a response.";

    return json(res, 200, { text });
  } catch (error) {
    return json(res, 500, { error: error instanceof Error ? error.message : "Unexpected server error" });
  }
}
