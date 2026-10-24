import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/lib/studio";
import { prefersReduced } from "@/lib/store";

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
  const radius = 540;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let raf = 0;
    const auto = prefersReduced() ? 0 : 0.05;
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
  const up = () => {
    state.current.drag = false;
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
        <div
          className="relative mx-auto h-[350px] w-full max-w-[390px] overflow-hidden select-none px-4"
          style={{ perspective: "1000px" }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Recent studio works"
        >
          <div className="relative flex h-full w-full items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {items.map((x, i) => {
              let offset = i - front;
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;
              const abs = Math.abs(offset);
              const visible = abs <= 1;
              const tx = offset * 66;
              const tz = abs === 0 ? 0 : -110;
              const ry = offset * -22;
              const scale = abs === 0 ? 1 : 0.84;
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
                    opacity: visible ? (abs === 0 ? 1 : 0.4) : 0,
                    zIndex: 10 - abs,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                  className="group absolute block h-[310px] w-[240px] overflow-hidden border border-border bg-card shadow-xl transition-all duration-500 ease-out"
                >
                  <img src={x.images[0]} alt={x.name} loading="lazy" className="h-[235px] w-full object-cover" />
                  <div className="border-t border-border bg-card p-3">
                    <span className="block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary">
                      {x.category}
                    </span>
                    <p className="mt-0.5 truncate font-display text-base font-bold text-foreground">
                      {x.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="relative h-[460px] select-none"
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
          data-cursor="Drag"
          role="region"
          aria-roledescription="carousel"
          aria-label="Recent studio works"
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
                className="group absolute -left-[135px] -top-[175px] block h-[350px] w-[270px]"
                style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)`, backfaceVisibility: "hidden" }}
                aria-label={`${x.name}, ${x.sizeSpec}`}
                data-cursor="Inspect"
              >
                <div className="flex h-full w-full flex-col overflow-hidden border border-border bg-card shadow-2xl">
                  <div className="relative flex-1 overflow-hidden bg-background">
                    <img
                      src={x.images[0]}
                      alt={x.name}
                      draggable={false}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-t border-border bg-card p-3.5">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary">
                      {x.category}
                    </span>
                    <p className="mt-0.5 truncate font-display text-lg font-bold text-foreground">
                      {x.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Active Rug Info & Controls */}
      <div className="mt-6 flex flex-col items-center gap-4 px-6 text-center">
        <div aria-live="polite" className="max-w-xl">
          <p className="eyebrow">
            {p.category} · {p.sizeSpec}
          </p>
          <Link to={`/rug/${p.slug}`} className="mt-1.5 block font-display text-2xl font-bold hover:text-primary md:text-3xl">
            {p.name}
          </Link>
          <p className="mt-1.5 text-sm text-muted-foreground">{p.short}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => stepIndex(1)}
            aria-label="Previous rug"
            className="flex h-10 w-10 items-center justify-center border border-border bg-card text-sm transition-colors hover:border-primary hover:text-primary"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            className="h-10 border border-border bg-card px-4 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-primary hover:text-primary"
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            onClick={() => stepIndex(-1)}
            aria-label="Next rug"
            className="flex h-10 w-10 items-center justify-center border border-border bg-card text-sm transition-colors hover:border-primary hover:text-primary"
          >
            →
          </button>
          <Link to={`/rug/${p.slug}`} className="btn-gold !min-h-[40px] !px-4 !text-xs">
            View Rug →
          </Link>
        </div>
      </div>
    </div>
  );
}
