import { useEffect, useRef } from "react";

const MATH_SYMBOLS = [
  "∑", "∫", "π", "∞", "√", "∂", "Δ", "λ",
  "Σ", "Ω", "θ", "φ", "≈", "≠", "≤", "≥",
  "∇", "μ", "α", "β", "γ", "eˣ", "x²", "∴",
];

function Spiral({ side }: { side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const animate = () => {
      const scroll = window.scrollY;
      const drift = Math.sin(scroll * 0.004) * 18;
      el.style.transform = `translate3d(0, ${drift}px, 0) rotate(${scroll * (side === "left" ? 0.035 : -0.035)}deg)`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [side]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`math-spiral math-spiral-${side}`}
    >
      <div className="math-spiral-ring math-spiral-ring-1" />
      <div className="math-spiral-ring math-spiral-ring-2" />
      <div className="math-spiral-ring math-spiral-ring-3" />
      <div className="math-spiral-core" />
      {MATH_SYMBOLS.map((symbol, index) => (
        <span
          key={symbol}
          className="math-symbol"
          style={{
            ["--i" as string]: index,
            ["--angle" as string]: `${(index / MATH_SYMBOLS.length) * 360}deg`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}

export function AmbientMotion() {
  return (
    <>
      <Spiral side="left" />
      <Spiral side="right" />
    </>
  );
}
