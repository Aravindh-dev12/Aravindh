import { Music2, Disc3, Radio, Sparkles } from "lucide-react";

function Rail({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-1/2 z-0 hidden -translate-y-1/2 lg:flex ${side === "left" ? "left-3" : "right-3"} h-[420px] w-10 flex-col items-center justify-between opacity-60`}
    >
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />
      <div className="ambient-orb ambient-orb-three" />

      <div className="ambient-note ambient-note-one">
        <Music2 size={14} />
      </div>
      <div className="ambient-note ambient-note-two">
        <Disc3 size={15} />
      </div>
      <div className="ambient-note ambient-note-three">
        <Radio size={14} />
      </div>

      <div className="flex h-20 items-end gap-[2px]">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="ambient-bar w-[2px] rounded-full bg-[var(--fg)]"
            style={{ animationDelay: `${index * 90}ms` }}
          />
        ))}
      </div>

      <Sparkles size={12} className="ambient-sparkle" />
    </div>
  );
}

export function AmbientMotion() {
  return (
    <>
      <Rail side="left" />
      <Rail side="right" />
    </>
  );
}
