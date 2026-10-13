import React, { createContext, useContext, useState, useEffect } from "react";

interface VisitorContextType {
  count: number | null;
  liveCount: number;
  isLoading: boolean;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number | null>(null);
  const [liveCount, setLiveCount] = useState<number>(14);
  const [isLoading, setIsLoading] = useState(true);

  // Total visitor count fetching
  useEffect(() => {
    const fetchCount = async () => {
      const BASELINE = 3428;
      const KEY = "aravindh_portfolio_views";
      const hasVisited = sessionStorage.getItem("aravindh_visited_session");
      
      const endpoint = hasVisited ? "get" : "hit";
      const url = `https://countapi.mileshilliard.com/api/v1/${endpoint}/${KEY}`;

      try {
        if (!hasVisited) {
          sessionStorage.setItem("aravindh_visited_session", "true");
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch count: ${res.statusText}`);
        }
        
        const data = await res.json();
        if (typeof data.value === "number") {
          setCount(data.value + BASELINE);
        } else {
          setCount(BASELINE);
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error);
        // Fallback gracefully so we never show an error or 0
        setCount(BASELINE);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();

    // Periodically sync views every 30s
    const pollInterval = setInterval(() => {
      fetch(`https://countapi.mileshilliard.com/api/v1/get/aravindh_portfolio_views`)
        .then((res) => res.json())
        .then((data) => {
          if (typeof data?.value === "number") {
            setCount(data.value + 3428);
          }
        })
        .catch(() => {});
    }, 30000);

    return () => clearInterval(pollInterval);
  }, []);

  // Live concurrent visitors heartbeat simulation
  useEffect(() => {
    // Generate initial realistic base count based on time of day (e.g. 12-18 during day)
    const hour = new Date().getHours();
    const baseVisitors = hour >= 9 && hour <= 23 ? 14 : 9;
    setLiveCount(baseVisitors);

    const interval = setInterval(() => {
      setLiveCount((prev) => {
        // Natural random fluctuation between (baseVisitors - 3) and (baseVisitors + 4)
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const minVal = Math.max(5, baseVisitors - 4);
        const maxVal = baseVisitors + 5;
        const next = prev + delta;
        return Math.min(Math.max(next, minVal), maxVal);
      });
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  return (
    <VisitorContext.Provider value={{ count, liveCount, isLoading }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error("useVisitor must be used within a VisitorProvider");
  }
  return context;
}
