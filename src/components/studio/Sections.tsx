import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, HERO_SLIDES, IMAGES, PRODUCTS } from "@/lib/studio";
import { prefersReduced } from "@/lib/store";
import { Btn } from "./Buttons";
import { Carousel3D } from "./Carousel3D";

/**
 * 1. HERO SLIDER — same poster lockup as the original preview.
 * Four full-bleed studio photos. Solid ink panel, no gradient.
 */
export function Hero() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[slideIdx]!;

  useEffect(() => {
    if (paused || prefersReduced()) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [paused]);

  const prevSlide = () => setSlideIdx((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () => setSlideIdx((s) => (s + 1) % HERO_SLIDES.length);

  return (
    <section
      id="top"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#16120E] text-[#F4EFE6]"
    >
      <div className="absolute inset-0">
        {HERO_SLIDES.map((s, idx) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.captionTitle}
            fetchPriority={idx === 0 ? "high" : "auto"}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              idx === slideIdx ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[#16120E]/40" />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[54%] bg-[#16120E]/90 lg:block" />

      <div className="relative z-10 mx-auto flex h-full max-w-[96rem] flex-col justify-between px-5 pb-5 pt-[4.5rem] md:px-10 md:pb-7 md:pt-24">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-[#F4EFE6]/85">{slide.eyebrow}</span>
          <span className="hidden border border-[#F4EFE6]/25 bg-[#16120E] px-3 py-1 text-sm text-[#F4EFE6] sm:inline">
            Commissions open
          </span>
        </div>

        <div className="my-auto grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="font-display text-[clamp(3.35rem,13.5vw,10.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-[#F4EFE6]">
              <span className="block">Your Team.</span>
              <span className="block pl-[0.28em] md:pl-[0.5em]">
                Your <em className="italic text-[#E24B42]">Rug.</em>
              </span>
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#E24B42] md:text-base">
              Walls have posters. Legends walk on art.
            </p>
          </div>

          <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
            <div className="w-80 border border-[#F4EFE6]/20 bg-[#16120E] p-4">
              <div className="flex items-center justify-between border-b border-[#F4EFE6]/15 pb-2.5">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#E24B42]">Fresh off the frame</span>
                <Link to="/works" className="text-xs text-[#F4EFE6]/75 hover:text-[#E24B42]">All 12 works</Link>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Link to="/rug/new-england-patriots-flying-elvis" className="block aspect-square overflow-hidden border border-[#F4EFE6]/15">
                  <img src={IMAGES.patriotsDesk} alt="Patriots custom rug" className="h-full w-full object-cover" />
                </Link>
                <Link to="/rug/chicago-bears-medallion" className="block aspect-square overflow-hidden border border-[#F4EFE6]/15">
                  <img src={IMAGES.bearsFull} alt="Chicago Bears custom rug" className="h-full w-full object-cover" />
                </Link>
                <Link to="/rug/milwaukee-brewers-ball-in-glove" className="block aspect-square overflow-hidden border border-[#F4EFE6]/15">
                  <img src={IMAGES.brewersGlove} alt="Milwaukee Brewers custom rug" className="h-full w-full object-cover" />
                </Link>
              </div>
              <p className="mt-3 text-sm leading-snug text-[#F4EFE6]/85">
                {slide.captionTitle}. {slide.captionSub}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <p className="max-w-sm text-base leading-snug text-[#F4EFE6]/90">
              One-of-a-kind tufted rugs for game-day superfans. Designed with you, made by hand in Georgia, ready in about two weeks.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/custom" className="inline-flex min-h-12 items-center bg-[#8E2420] px-5 text-base font-semibold text-[#F7F3EC] hover:bg-[#F4EFE6] hover:text-[#16120E]">
                Start a commission
              </Link>
              <a href="#works-showcase" className="inline-flex min-h-12 items-center border border-[#F4EFE6]/40 px-5 text-base font-semibold text-[#F4EFE6] hover:border-[#F4EFE6]">
                See recent builds
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-[#F4EFE6]/75">
            <span>Made to order in Georgia</span>
            <span className="h-px flex-1 bg-[#F4EFE6]/25" />
            <div className="flex items-center gap-1" role="tablist" aria-label="Hero slides">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={slideIdx === idx}
                  aria-label={`Slide ${idx + 1}: ${s.captionTitle}`}
                  onClick={() => setSlideIdx(idx)}
                  className={`h-8 min-w-8 px-2 text-sm ${slideIdx === idx ? "bg-[#E24B42] text-[#F7F3EC]" : "text-[#F4EFE6]/70 hover:text-[#F4EFE6]"}`}
                >
                  {idx + 1}
                </button>
              ))}
              <button type="button" onClick={prevSlide} aria-label="Previous slide" className="h-8 px-2 text-[#F4EFE6] hover:text-[#E24B42]">←</button>
              <button type="button" onClick={nextSlide} aria-label="Next slide" className="h-8 px-2 text-[#F4EFE6] hover:text-[#E24B42]">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. RECENT WORK — 3D Carousel Section
 */
export function CarouselSection() {
  return (
    <section className="border-b border-border bg-background py-8 md:py-10">
      <div className="mx-auto mb-4 flex max-w-[96rem] flex-col justify-between gap-2 px-5 md:flex-row md:items-end md:px-10">
        <div>
          <p className="eyebrow">Recent work</p>
          <h2 className="display-lg mt-1">Spin the studio builds</h2>
        </div>
        <p className="max-w-md text-base text-muted-foreground">
          Drag on desktop or swipe on your phone. Open any rug to see the carved pile up close.
        </p>
      </div>
      <Carousel3D />
    </section>
  );
}

/**
 * 3. CUSTOM REQUEST SECTION (Compact CTA Block redirecting to /custom)
 */
export function CustomRequestSection() {
  return (
    <section className="border-b border-border bg-card py-8 md:py-10">
      <div className="mx-auto grid max-w-[96rem] items-center gap-8 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Custom request</p>
          <h2 className="display-lg mt-1">Got a crest, mashup, or sketch?</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Every piece is tufted one at a time on our frame in Georgia. The commission form walks you through shape, size, backing, and colors, then writes the note we quote from.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Btn to="/custom">Start your custom request</Btn>
            <Link to="/contact" className="text-base text-muted-foreground underline underline-offset-4 hover:text-primary">
              Or email the studio
            </Link>
          </div>
        </div>
        <ol className="grid gap-3 sm:grid-cols-3 lg:col-span-5">
          {[
            ["1", "Pick a shape", "Die-cut, round, oval, or a mashup."],
            ["2", "Choose a size", "Desk piece up to a room centerpiece."],
            ["3", "We tuft it", "Carved by hand in about two weeks."],
          ].map(([n, t, d]) => (
            <li key={n} className="border border-border bg-background p-4">
              <p className="text-sm font-semibold text-primary">Step {n}</p>
              <p className="mt-1 font-display text-2xl">{t}</p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function wrapOffset(index: number, active: number, total: number) {
  let d = index - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

/**
 * Abstract proof-wall. All 12 rugs stay in the frame: a fanned carousel you drag,
 * plus a filmstrip so every piece is still one tap away. Fits in one screen.
 */
export function ShowcaseGallery100vh({ standalone = false }: { standalone?: boolean }) {
  const [cat, setCat] = useState("All");
  const list = !standalone || cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [wide, setWide] = useState(true);
  const drag = useRef({ x: 0, dx: 0, on: false });

  useEffect(() => setActive(0), [cat, list.length]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused || prefersReduced() || list.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % list.length), 4200);
    return () => clearInterval(id);
  }, [paused, list.length]);

  const go = (dir: number) => setActive((i) => (i + dir + list.length) % list.length);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, dx: 0, on: true };
    setPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (drag.current.on) drag.current.dx = e.clientX - drag.current.x;
  };
  const onUp = () => {
    if (!drag.current.on) return;
    if (drag.current.dx > 48) go(-1);
    else if (drag.current.dx < -48) go(1);
    drag.current.on = false;
  };

  const piece = list[Math.min(active, list.length - 1)];
  if (!piece) return null;

  return (
    <section
      id="works-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex h-[100svh] min-h-[620px] flex-col overflow-hidden border-b border-border bg-background pt-16 md:pt-[4.25rem]"
    >
      <div className="mx-auto flex w-full max-w-[96rem] items-end justify-between gap-3 px-5 pb-2 md:px-10">
        <div>
          <p className="eyebrow">
            {String(active + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")} · drag the wall
          </p>
          <h2 className="font-display text-3xl md:text-4xl">{standalone ? "All the work" : "The showcase"}</h2>
        </div>
        <div className="flex items-center gap-2">
          {standalone && (
            <div className="mr-2 hidden flex-wrap gap-1 lg:flex">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`border px-2.5 py-1 text-sm ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <button type="button" onClick={() => go(-1)} aria-label="Previous rug" className="h-10 w-10 border border-border bg-card text-lg">←</button>
          <button type="button" onClick={() => go(1)} aria-label="Next rug" className="h-10 w-10 border border-border bg-card text-lg">→</button>
          {!standalone && (
            <Link to="/works" className="hidden text-sm font-semibold text-primary underline underline-offset-4 sm:inline">
              Full gallery
            </Link>
          )}
        </div>
      </div>

      {standalone && (
        <div className="flex gap-1.5 overflow-x-auto px-5 pb-2 lg:hidden">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`shrink-0 border px-2.5 py-1 text-sm ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div
        className="relative min-h-0 flex-1 touch-pan-y"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {list.map((item, i) => {
          const offset = wrapOffset(i, active, list.length);
          const abs = Math.abs(offset);
          const hidden = wide ? abs > 4 : abs > 1;
          return (
            <div
              key={item.slug}
              className="absolute left-1/2 top-[48%] w-[min(70vw,340px)] origin-center border border-border bg-card shadow-xl transition-transform duration-500 ease-out md:w-[min(28vw,380px)]"
              style={{
                height: wide ? "88%" : "92%",
                transform: `translate(-50%, -50%) translateX(${offset * (wide ? 17 : 22)}%) translateY(${offset * offset * (wide ? 6 : 0)}px) rotate(${offset * (wide ? 8 : 5)}deg) scale(${offset === 0 ? 1 : 0.84 - abs * 0.03})`,
                zIndex: 30 - abs,
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              {offset === 0 ? (
                <Link to={`/rug/${item.slug}`} className="flex h-full flex-col">
                  <img src={item.images[0]} alt={item.name} className="min-h-0 flex-1 object-cover" draggable={false} />
                  <span className="block bg-[#16120E] px-3 py-2.5 text-left text-[#F4EFE6]">
                    <span className="block truncate font-display text-2xl leading-none">{item.name}</span>
                    <span className="mt-1 block text-sm text-[#F4EFE6]/70">{item.category}</span>
                  </span>
                </Link>
              ) : (
                <button type="button" aria-label={`Bring ${item.name} forward`} onClick={() => setActive(i)} className="h-full w-full">
                  <img src={item.images[0]} alt="" className="h-full w-full object-cover" draggable={false} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4 pt-1 md:px-10">
        {list.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${item.name}`}
            className={`h-14 w-12 shrink-0 overflow-hidden border bg-card ${i === active ? "border-primary" : "border-border opacity-70"}`}
            style={{ transform: `rotate(${(i % 2 === 0 ? -4 : 4)}deg)` }}
          >
            <img src={item.images[0]} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}

/**
 * 5. ABOUT US CTA SECTION (Redirects to /about)
 */
export function AboutUsCtaSection() {
  return (
    <section className="border-b border-border bg-card py-8 md:py-10">
      <div className="mx-auto grid max-w-[96rem] items-center gap-8 px-5 md:px-10 lg:grid-cols-12">
        <div className="grid grid-cols-2 gap-3 lg:col-span-5">
          <img src={IMAGES.dolphinsTufting} alt="Hand-tufting on the vertical frame in Georgia" loading="lazy" className="aspect-[4/5] w-full border border-border object-cover" />
          <img src={IMAGES.eaglesCarving} alt="Carving shears shaping the pile" loading="lazy" className="aspect-[4/5] w-full border border-border object-cover" />
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow">The studio</p>
          <h2 className="display-lg mt-1">Tufted one loop at a time in Georgia.</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            No factory prints. Each rug starts as a full-size sketch on monk’s cloth, gets tufted in 4-ply yarn, locked in latex, and carved so the crest stands up off the floor.
          </p>
          <div className="mt-5">
            <Btn to="/about">Read about the studio</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
