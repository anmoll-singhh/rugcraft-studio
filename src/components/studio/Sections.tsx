import { useEffect, useState } from "react";
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

/**
 * 4. 100VH SHOWCASE GALLERY OF ALL 12 WORKS
 * Fits all 12 real rugs cleanly inside a single 100vh desktop screen (4x3 grid) with zero dead space.
 */
export function ShowcaseGallery100vh({ standalone = false }: { standalone?: boolean }) {
  const [cat, setCat] = useState<string>("All");
  const list = !standalone || cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <section
      id="works-showcase"
      className={`border-b border-border bg-background ${
        standalone
          ? "px-0 pb-6 pt-20 md:flex md:min-h-[100svh] md:flex-col md:pt-24"
          : "md:flex md:h-[100svh] md:max-h-[920px] md:min-h-[640px] md:flex-col md:justify-between md:py-5"
      }`}
    >
      <div className={`mx-auto flex h-full w-full max-w-[96rem] flex-col px-5 md:px-10 ${standalone ? "" : "py-6 md:py-0"}`}>
        <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{list.length} hand-tufted builds</p>
            <h2 className="font-display text-3xl md:text-4xl">{standalone ? "All the work" : "The showcase"}</h2>
          </div>
          {standalone ? (
            <div className="flex flex-wrap gap-1.5">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`border px-3 py-1.5 text-sm ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          ) : (
            <Link to="/works" className="text-base font-semibold text-primary underline underline-offset-4">
              Open the full gallery
            </Link>
          )}
        </div>

        <div className={`grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-2.5 ${list.length >= 12 ? "md:grid-rows-3" : ""}`}>
          {list.slice(0, 12).map((p) => (
            <Link
              key={p.slug}
              to={`/rug/${p.slug}`}
              className="group relative flex min-h-[148px] flex-col justify-end overflow-hidden border border-border bg-card md:min-h-0"
            >
              <img src={p.images[0]} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="relative z-10 bg-[#16120E]/92 px-2.5 py-2 text-[#F4EFE6]">
                <p className="truncate font-display text-lg leading-none normal-case group-hover:text-[#E24B42] md:text-xl">{p.name}</p>
                <p className="truncate text-xs text-[#F4EFE6]/70">{p.category}</p>
              </div>
            </Link>
          ))}
        </div>
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
