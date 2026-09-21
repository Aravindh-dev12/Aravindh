import { useEffect, useRef } from "react";

const SYMBOLS = [
  "∑", "∫", "π", "∞", "√", "∂", "Δ", "λ", "Σ", "Ω", "θ", "φ",
  "∇", "μ", "α", "β", "γ", "eˣ", "x²", "∴", "≈", "≠", "∝", "lim",
];

function MathematicalVortex({ side }: { side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let target = 0;
    let current = 0;

    const onScroll = () => {
      target = window.scrollY;
    };

    const animate = () => {
      current += (target - current) * 0.045;
      const direction = side === "left" ? 1 : -1;
      const rotation = current * 0.045 * direction;
      const drift = Math.sin(current * 0.004) * 24;
      el.style.transform = `translate3d(0, ${drift}px, 0) rotate(${rotation}deg)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [side]);

  return (
    <div ref={ref} aria-hidden="true" className={`math-vortex math-vortex-${side}`}>
      <svg className="math-vortex-svg" viewBox="0 0 600 600" fill="none">
        <defs>
          <radialGradient id={`vortexGlow-${side}`}>
            <stop offset="0%" stopColor="currentColor" stopOpacity=".42" />
            <stop offset="42%" stopColor="currentColor" stopOpacity=".10" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <filter id={`vortexBlur-${side}`}>
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <circle cx="300" cy="300" r="235" fill={`url(#vortexGlow-${side})`} />

        <g className="math-vortex-orbit math-vortex-orbit-a">
          <ellipse cx="300" cy="300" rx="245" ry="105" />
          <ellipse cx="300" cy="300" rx="245" ry="105" transform="rotate(60 300 300)" />
          <ellipse cx="300" cy="300" rx="245" ry="105" transform="rotate(120 300 300)" />
        </g>

        <g className="math-vortex-orbit math-vortex-orbit-b">
          <ellipse cx="300" cy="300" rx="190" ry="72" transform="rotate(28 300 300)" />
          <ellipse cx="300" cy="300" rx="190" ry="72" transform="rotate(88 300 300)" />
          <ellipse cx="300" cy="300" rx="190" ry="72" transform="rotate(148 300 300)" />
        </g>

        <path className="math-vortex-spiral" d="M300 300 C300 245 370 242 394 285 C425 342 365 405 294 398 C203 389 166 306 209 226 C263 125 410 125 485 219" />
        <path className="math-vortex-spiral math-vortex-spiral-reverse" d="M300 300 C300 350 240 362 212 324 C178 278 218 218 278 203 C365 181 441 237 439 320 C436 426 337 481 239 447" />

        <circle className="math-vortex-core" cx="300" cy="300" r="48" />
        <circle className="math-vortex-core-dot" cx="300" cy="300" r="8" />
        <circle className="math-vortex-blur" cx="300" cy="300" r="18" filter={`url(#vortexBlur-${side})`} />
      </svg>

      <div className="math-vortex-symbols">
        {SYMBOLS.map((symbol, index) => (
          <span
            key={`${symbol}-${index}`}
            className="math-vortex-symbol"
            style={{
              ["--i" as string]: index,
              ["--total" as string]: SYMBOLS.length,
            }}
          >
            {symbol}
          </span>
        ))}
      </div>

      <div className="math-vortex-equation math-vortex-equation-top">f(x) = ∫ e⁻ˣ² dx</div>
      <div className="math-vortex-equation math-vortex-equation-bottom">∇ · E = ρ / ε₀</div>
    </div>
  );
}

export function AmbientMotion() {
  return (
    <>
      <MathematicalVortex side="left" />
      <MathematicalVortex side="right" />
    </>
  );
}
