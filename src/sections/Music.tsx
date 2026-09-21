import { motion } from "framer-motion";
import { Disc3, ExternalLink, Headphones } from "lucide-react";
import { SectionHeader, Shell } from "@/components/Layout";

const albums = [
  {
    title: "The Batman",
    artist: "Michael Giacchino",
    year: "2022",
    label: "GOTHAM / MAIN THEME",
    tone: "from-zinc-950 via-zinc-800 to-black",
    search: "The Batman Michael Giacchino soundtrack",
  },
  {
    title: "The Dark Knight",
    artist: "Hans Zimmer · James Newton Howard",
    year: "2008",
    label: "GOTHAM / CHAOS",
    tone: "from-neutral-900 via-zinc-700 to-neutral-950",
    search: "The Dark Knight soundtrack Hans Zimmer James Newton Howard",
  },
  {
    title: "Batman Begins",
    artist: "Hans Zimmer · James Newton Howard",
    year: "2005",
    label: "GOTHAM / ORIGIN",
    tone: "from-stone-950 via-neutral-800 to-black",
    search: "Batman Begins soundtrack Hans Zimmer James Newton Howard",
  },
];

export function Music() {
  return (
    <section id="music" className="relative overflow-hidden">
      <SectionHeader
        title="Music"
        aside={
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--soft)]">
            <Headphones size={12} />
            soundtrack mode
          </span>
        }
      />

      <Shell className="px-6 py-10 sm:px-8">
        <div className="mb-7 max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--soft)]">
            // albums in rotation
          </p>
          <p className="mt-3 font-serif text-2xl leading-tight text-[var(--fg)] sm:text-3xl">
            Dark scores, cinematic energy, and music for building.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {albums.map((album, index) => (
            <motion.a
              key={album.title}
              href={`https://open.spotify.com/search/${encodeURIComponent(album.search)}`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1, scale: 1.02 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-3 shadow-sm"
            >
              <div className={`relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br ${album.tone}`}>
                <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_8px)]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative grid size-24 place-items-center rounded-full border border-white/20 bg-black/30 shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:rotate-180">
                    <div className="size-16 rounded-full border border-white/10 bg-neutral-900" />
                    <div className="absolute size-3 rounded-full bg-white/70" />
                  </div>
                </div>
                <span className="absolute left-3 top-3 font-mono text-[8px] tracking-[0.2em] text-white/50">
                  {album.label}
                </span>
                <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/30 p-2 text-white/70 backdrop-blur">
                  <ExternalLink size={12} />
                </span>
              </div>

              <div className="px-1 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-xl text-[var(--fg)]">{album.title}</h3>
                  <Disc3 size={14} className="shrink-0 text-[var(--soft)] transition-transform duration-500 group-hover:rotate-180" />
                </div>
                <p className="mt-1 text-[11px] text-[var(--muted)]">{album.artist}</p>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-[var(--soft)]">{album.year} · open in Spotify</p>
              </div>
            </motion.a>
          ))}
        </div>
      </Shell>
    </section>
  );
}
