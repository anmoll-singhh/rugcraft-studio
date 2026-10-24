import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/lib/studio";
import { prefersReduced } from "@/lib/store";

/** CSS-3D rotating ring of RugCraft Studio's real builds. Draggable, auto-rotating, click-through. */
export function Carousel3D() {
  const ring = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(560);
  const state = useRef({ rot: 0, vel: 0, drag: false, lastX: 0, moved: 0, hover: false });
  const items = PRODUCTS.slice(0, 10);
  const n = items.length;
  const step = 360 / n;
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    const r = () => setRadius(window.innerWidth < 768 ? 310 : 620);
    r(); window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  useEffect(() => {
    let raf = 0;
    const auto = prefersReduced() ? 0 : 0.065;
    const loop = () => {
      const s = state.current;
      if (!s.drag) { s.rot += s.vel + (s.hover || pausedRef.current ? 0 : auto); s.vel *= 0.94; }
      if (ring.current) ring.current.style.transform = `translateZ(${-radius}px) rotateY(${s.rot}deg)`;
      const f = ((Math.round(-s.rot / step) % n) + n) % n;
      setFront((p) => (p === f ? p : f));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [radius, step, n]);

  const down = (e: React.PointerEvent) => { const s = state.current; s.drag = true; s.lastX = e.clientX; s.moved = 0; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); };
  const move = (e: React.PointerEvent) => { const s = state.current; if (!s.drag) return; const dx = e.clientX - s.lastX; s.lastX = e.clientX; s.moved += Math.abs(dx); s.rot += dx * 0.25; s.vel = dx * 0.25; };
  const up = () => { state.current.drag = false; };
  const nudge = (d: number) => { state.current.vel = d * 2.4; };
  const p = items[front]!;

  return (
    <div className="relative">
      <div className="relative h-[440px] select-none md:h-[620px]" style={{ perspective: "1800px" }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        onMouseEnter={() => (state.current.hover = true)} onMouseLeave={() => { state.current.hover = false; up(); }}
        data-cursor="Drag 360°" role="region" aria-roledescription="carousel" aria-label="Featured tufted rugs">
        <div ref={ring} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {items.map((x, i) => (
            <Link key={x.slug} to={`/product/${x.slug}`} draggable={false}
              onClick={(e) => { if (state.current.moved > 6) e.preventDefault(); }}
              className="group absolute -left-[115px] -top-[150px] block h-[300px] w-[230px] md:-left-[155px] md:-top-[205px] md:h-[410px] md:w-[310px]"
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)`, backfaceVisibility: "hidden" }}
              aria-label={`${x.name}, ${x.sizeSpec}`} data-cursor="Inspect">
              <div className="relative h-full w-full overflow-hidden border border-border/80 bg-background shadow-[0_40px_80px_-25px_rgba(0,0,0,.75)]">
                <img src={x.images[0]} alt={x.name} draggable={false} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-4">
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#f08a3c]">{x.category}</span>
                  <p className="mt-0.5 font-display text-xl leading-none text-[#f5ead8]">{x.name}</p>
                </div>
              </div>
              <span className="absolute inset-x-0 -bottom-8 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">BUILD #{String(i + 1).padStart(2, "0")}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center gap-5 px-6 text-center">
        <div aria-live="polite" className="max-w-xl">
          <p className="eyebrow">{p.category} · {p.sizeSpec}</p>
          <Link to={`/product/${p.slug}`} className="mt-2 block font-display text-[clamp(2.2rem,4.5vw,4rem)] leading-none hover:text-primary">{p.name}</Link>
          {p.postQuote && <p className="mt-3 text-sm italic text-muted-foreground">“{p.postQuote}”</p>}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="font-mono uppercase tracking-[0.12em] text-primary">{p.priceLabel}</span>
            <Link to={`/product/${p.slug}`} className="link-underline font-mono uppercase tracking-[0.12em]">Inspect Pile & Specs →</Link>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => nudge(1)} aria-label="Previous rug" className="h-12 w-12 border transition-colors hover:border-primary hover:text-primary">←</button>
          <button onClick={() => setPaused(!paused)} aria-pressed={paused} className="h-12 border px-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary">{paused ? "Auto-Spin" : "Pause Orbit"}</button>
          <button onClick={() => nudge(-1)} aria-label="Next rug" className="h-12 w-12 border transition-colors hover:border-primary hover:text-primary">→</button>
        </div>
      </div>
    </div>
  );
}
