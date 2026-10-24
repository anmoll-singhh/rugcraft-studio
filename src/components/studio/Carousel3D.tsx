import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/lib/studio";
import { prefersReduced } from "@/lib/store";

/**
 * Responsive 3D Rug Showcase:
 * - Desktop (>= 768px): Uncluttered 8-piece 3D cylindrical ring with smooth drag & inertia.
 * - Mobile (< 768px): Clean 3D Coverflow deck so cards NEVER overlap or clip on 390px viewports.
 */
export function Carousel3D() {
  const ring = useRef<HTMLDivElement>(null);
  const items = PRODUCTS.slice(0, 8);
  const n = items.length;
  const step = 360 / n;
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  const state = useRef({ rot: 0, vel: 0, drag: false, lastX: 0, moved: 0, hover: false });
  const radius = 560;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Desktop 3D ring animation loop
  useEffect(() => {
    if (isMobile) return;
    let raf = 0;
    const auto = prefersReduced() ? 0 : 0.055;
    const loop = () => {
      const s = state.current;
      if (!s.drag) {
        s.rot += s.vel + (s.hover || pausedRef.current ? 0 : auto);
        s.vel *= 0.94;
      }
      if (ring.current) {
        ring.current.style.transform = `translateZ(${-radius}px) rotateY(${s.rot}deg)`;
      }
      const f = ((Math.round(-s.rot / step) % n) + n) % n;
      setFront((p) => (p === f ? p : f));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, step, n]);

  // Mobile auto-advance when not paused
  useEffect(() => {
    if (!isMobile || paused || prefersReduced()) return;
    const id = setInterval(() => {
      setFront((f) => (f + 1) % n);
    }, 4200);
    return () => clearInterval(id);
  }, [isMobile, paused, n]);

  const down = (e: React.PointerEvent) => {
    const s = state.current;
    s.drag = true;
    s.lastX = e.clientX;
    s.moved = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.drag) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.moved += Math.abs(dx);
    if (!isMobile) {
      s.rot += dx * 0.22;
      s.vel = dx * 0.22;
    }
  };
  const up = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.drag) return;
    s.drag = false;
    if (isMobile && s.moved > 24) {
      // Determine swipe direction on mobile
      const endX = e.clientX;
      const diff = endX - s.lastX;
      if (diff < 0) setFront((f) => (f + 1) % n);
      else setFront((f) => (f - 1 + n) % n);
    }
  };

  const stepIndex = (dir: number) => {
    if (isMobile) {
      setFront((f) => (f - dir + n) % n);
    } else {
      state.current.vel = dir * 2.2;
    }
  };

  const p = items[front]!;

  return (
    <div className="relative">
      {isMobile ? (
        /* MOBILE (<768px): Crisp 3D Coverflow Stage — zero overlapping mess */
        <div
          className="relative mx-auto h-[370px] w-full max-w-[390px] overflow-hidden select-none px-4"
          style={{ perspective: "1100px" }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured tufted rugs"
        >
          <div className="relative flex h-full w-full items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {items.map((x, i) => {
              let offset = i - front;
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;
              const abs = Math.abs(offset);
              const visible = abs <= 1;
              const tx = offset * 68;
              const tz = abs === 0 ? 0 : -120;
              const ry = offset * -24;
              const scale = abs === 0 ? 1 : 0.82;
              return (
                <Link
                  key={x.slug}
                  to={`/rug/${x.slug}`}
                  onClick={(e) => {
                    if (offset !== 0) {
                      e.preventDefault();
                      setFront(i);
                    }
                  }}
                  style={{
                    transform: `translate3d(${tx}%, 0, ${tz}px) rotateY(${ry}deg) scale(${scale})`,
                    opacity: visible ? (abs === 0 ? 1 : 0.45) : 0,
                    zIndex: 10 - abs,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                  className="group absolute block h-[320px] w-[245px] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_48px_-12px_rgba(0,0,0,0.75)] transition-all duration-500 ease-out"
                >
                  <img src={x.images[0]} alt={x.name} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-4">
                    <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[#f08a3c]">{x.category}</span>
                    <p className="mt-0.5 font-display text-lg leading-tight text-[#f5ead8]">{x.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        /* DESKTOP (>=768px): Spacious 3D Cylindrical Ring */
        <div
          className="relative h-[500px] select-none"
          style={{ perspective: "2000px" }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onMouseEnter={() => (state.current.hover = true)}
          onMouseLeave={() => {
            state.current.hover = false;
            state.current.drag = false;
          }}
          data-cursor="Drag 360°"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured tufted rugs"
        >
          <div ref={ring} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
            {items.map((x, i) => (
              <Link
                key={x.slug}
                to={`/rug/${x.slug}`}
                draggable={false}
                onClick={(e) => {
                  if (state.current.moved > 6) e.preventDefault();
                }}
                className="group absolute -left-[140px] -top-[185px] block h-[370px] w-[280px]"
                style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)`, backfaceVisibility: "hidden" }}
                aria-label={`${x.name}, ${x.sizeSpec}`}
                data-cursor="Inspect"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_36px_72px_-24px_rgba(0,0,0,.75)]">
                  <img
                    src={x.images[0]}
                    alt={x.name}
                    draggable={false}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#f08a3c]">{x.category}</span>
                    <p className="mt-1 font-display text-xl leading-tight text-[#f5ead8]">{x.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Active Rug Info & Controls */}
      <div className="mt-8 flex flex-col items-center gap-5 px-6 text-center">
        <div aria-live="polite" className="max-w-xl">
          <p className="eyebrow">{p.category} · {p.sizeSpec}</p>
          <Link to={`/rug/${p.slug}`} className="mt-2 block font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight hover:text-primary">
            {p.name}
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
            <span className="font-mono uppercase tracking-[0.12em] text-primary">{p.priceLabel}</span>
            <Link to={`/rug/${p.slug}`} className="link-underline font-mono uppercase tracking-[0.12em]">
              Open Drop Page →
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => stepIndex(1)}
            aria-label="Previous rug"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 transition-colors hover:border-primary hover:text-primary"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            className="h-11 rounded-xl border border-border bg-background/60 px-5 font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
          >
            {paused ? "Resume Spin" : "Pause Spin"}
          </button>
          <button
            type="button"
            onClick={() => stepIndex(-1)}
            aria-label="Next rug"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 transition-colors hover:border-primary hover:text-primary"
          >
            →
          </button>
        </div>

        {/* Clean dot indicators */}
        <div className="flex items-center gap-1.5">
          {items.map((item, idx) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setFront(idx)}
              aria-label={`Select ${item.name}`}
              className={`h-1.5 rounded-full transition-all ${idx === front ? "w-7 bg-primary" : "w-1.5 bg-border hover:bg-primary/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
