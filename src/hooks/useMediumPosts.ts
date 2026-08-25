import { useEffect, useState } from "react";
import { site, type Post } from "@/config/site";

const MEDIUM_RSS_URL = "https://medium.com/feed/@aravindh1653";
const MEDIUM_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`;
const CACHE_KEY = "aravindh-medium-posts";
const CACHE_TTL = 30 * 60 * 1000;

type MediumItem = {
  title?: string;
  pubDate?: string;
  link?: string;
  description?: string;
  content?: string;
};

type MediumResponse = {
  status?: string;
  items?: MediumItem[];
};

type CachedPosts = {
  timestamp: number;
  posts: Post[];
};

function stripHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function toPost(item: MediumItem): Post | null {
  if (!item.title || !item.link) return null;

  const rawContent = item.content || item.description || "";
  const plainText = stripHtml(rawContent);
  const words = plainText ? plainText.split(/\s+/).length : 0;
  const readingTime = words ? `${Math.max(1, Math.ceil(words / 200))} min read` : undefined;
  const summary = plainText.length > 240 ? `${plainText.slice(0, 237).trim()}...` : plainText;

  return {
    title: item.title,
    summary: summary || "Read this article on Medium.",
    date: formatDate(item.pubDate),
    url: item.link,
    readingTime,
  };
}

export function useMediumPosts() {
  const [posts, setPosts] = useState<Post[]>(site.writing as Post[]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as CachedPosts;
          if (Date.now() - parsed.timestamp < CACHE_TTL && parsed.posts.length) {
            if (!cancelled) {
              setPosts(parsed.posts);
              setIsLoading(false);
            }
            return;
          }
        }

        const response = await fetch(MEDIUM_API_URL);
        if (!response.ok) throw new Error(`Medium feed request failed with ${response.status}`);

        const data = (await response.json()) as MediumResponse;
        if (data.status !== "ok" || !Array.isArray(data.items)) {
          throw new Error("Medium feed returned an invalid response");
        }

        const nextPosts = data.items
          .map(toPost)
          .filter((post): post is Post => Boolean(post));

        if (!nextPosts.length) throw new Error("No Medium posts were returned");

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), posts: nextPosts } satisfies CachedPosts),
        );

        if (!cancelled) {
          setPosts(nextPosts);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load Medium posts");
          setPosts(site.writing as Post[]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, isLoading, error };
}
