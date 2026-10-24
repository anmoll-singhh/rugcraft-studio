import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, HERO_SLIDES, IMAGES, PRODUCTS } from "@/lib/studio";
import { prefersReduced } from "@/lib/store";
import { Btn } from "./Buttons";
import { Carousel3D } from "./Carousel3D";

/**
 * 1. HERO SLIDER — Exact composition from original r15_rugcraft preview,
 * upgraded into a 4-slide full-bleed interactive slider with solid flat surfaces (zero gradients).
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
      className="relative h-[100svh] min-h-[680px] overflow-hidden border-b border-border bg-[#0E0D0C] text-[#F4EFE6]"
    >
      {/* Full-bleed photographic slide */}
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

      {/* Solid flat readability scrim (NO gradients) */}
      <div className="pointer-events-none absolute inset-0 bg-[#0E0D0C]/58" />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[56%] border-r border-white/10 bg-[#0E0D0C]/82 lg:block" />

      <div className="relative z-10 mx-auto flex h-full max-w-[92rem] flex-col justify-between px-6 pb-8 pt-24 md:px-12 md:pb-10 md:pt-28">
        {/* Top Row: Location & Slide Counter */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F4EFE6]/85">
            {slide.eyebrow}
          </span>
          <div className="flex items-center gap-2">
            <span className="border border-white/20 bg-[#0E0D0C] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#C85A32]">
              Slide {slideIdx + 1} / {HERO_SLIDES.length} · {slide.captionTitle}
            </span>
          </div>
        </div>

        {/* Center Row: Left Preview Headline + Right Fresh Off The Frame & Slider Controls */}
        <div className="my-auto grid items-end gap-8 py-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(3.2rem,7.2vw,6.8rem)] font-bold leading-[0.95] tracking-[-0.025em] text-[#F4EFE6]">
              <span className="block">{slide.line1}</span>
              <span className="mt-1 block pl-[0.18em] md:pl-[0.38em]">
                {slide.line2}{" "}
                <em className="italic text-[#C85A32]">{slide.accentWord}</em>
              </span>
            </h1>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-[#C85A32]">
              {slide.tagline}
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#F4EFE6]/90">
              {slide.lede}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/custom"
                className="inline-flex min-h-[48px] items-center justify-center border border-[#C85A32] bg-[#C85A32] px-6 text-xs font-semibold uppercase tracking-[0.08em] text-[#F6F2EA] transition-colors hover:bg-[#F4EFE6] hover:text-[#0E0D0C]"
              >
                Commission a Custom Rug →
              </Link>
              <Link
                to="/works"
                className="inline-flex min-h-[48px] items-center justify-center border border-white/30 bg-[#0E0D0C] px-6 text-xs font-semibold uppercase tracking-[0.08em] text-[#F4EFE6] transition-colors hover:border-[#C85A32] hover:text-[#C85A32]"
              >
                Explore Past Drops
              </Link>
            </div>
          </div>

          {/* Right Card: Fresh Off The Frame + Slider Controls */}
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <div className="w-full max-w-sm border border-white/20 bg-[#0E0D0C] p-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#C85A32]">
                  Fresh Off The Frame
                </span>
                <Link
                  to="/works"
                  className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[#F4EFE6]/80 hover:text-[#C85A32]"
                >
                  All 12 Works →
                </Link>
              </div>

              <div className="mt-3.5 grid grid-cols-3 gap-2.5">
                <Link
                  to="/rug/new-england-patriots-flying-elvis"
                  className="group block aspect-square overflow-hidden border border-white/15 bg-[#161412]"
                >
                  <img
                    src={IMAGES.patriotsDesk}
                    alt="Patriots custom rug"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <Link
                  to="/rug/chicago-bears-medallion"
                  className="group block aspect-square overflow-hidden border border-white/15 bg-[#161412]"
                >
                  <img
                    src={IMAGES.bearsFull}
                    alt="Chicago Bears custom rug"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <Link
                  to="/rug/milwaukee-brewers-ball-in-glove"
                  className="group block aspect-square overflow-hidden border border-white/15 bg-[#161412]"
                >
                  <img
                    src={IMAGES.brewersGlove}
                    alt="Milwaukee Brewers custom rug"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#F4EFE6]/80">
                {slide.captionSub}
              </p>

              {/* Slider Prev / Next & Pill Controls */}
              <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3.5">
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero slides">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={slideIdx === idx}
                      aria-label={`Hero slide ${idx + 1}: ${s.captionTitle}`}
                      onClick={() => setSlideIdx(idx)}
                      className={`h-7 px-2.5 font-mono text-[0.65rem] transition-colors ${
                        slideIdx === idx
                          ? "border border-[#C85A32] bg-[#C85A32] font-bold text-[#F6F2EA]"
                          : "border border-white/20 bg-[#161412] text-[#F4EFE6]/75 hover:border-white/50"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous hero slide"
                    className="flex h-7 w-8 items-center justify-center border border-white/20 bg-[#161412] text-xs text-[#F4EFE6] transition-colors hover:border-[#C85A32] hover:text-[#C85A32]"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next hero slide"
                    className="flex h-7 w-8 items-center justify-center border border-white/20 bg-[#161412] text-xs text-[#F4EFE6] transition-colors hover:border-[#C85A32] hover:text-[#C85A32]"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spec Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-4 font-mono text-xs text-[#F4EFE6]/85">
          <span>100% Hand-Tufted Acrylic & Wool</span>
          <span className="hidden h-3 w-px bg-white/25 sm:inline-block" />
          <span>Custom Sizes 2ft – 6ft+</span>
          <span className="hidden h-3 w-px bg-white/25 md:inline-block" />
          <span className="hidden md:inline">Ships Nationwide from Georgia, USA</span>
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
    <section className="border-b border-border bg-background py-14 md:py-20">
      <div className="mx-auto mb-8 flex max-w-[92rem] flex-col justify-between gap-4 px-6 md:flex-row md:items-end md:px-12">
        <div>
          <p className="eyebrow">360° Studio Archive</p>
          <h2 className="display-lg mt-2">Recent Studio Works</h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          Drag to spin our completed commissions on desktop or swipe through the deck on mobile. Select any rug to inspect every carved angle.
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
    <section className="border-b border-border bg-card py-14 md:py-20">
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Bespoke Commissions · Made to Order</p>
            <h2 className="display-lg mt-2">
              Have a Team Crest, Mashup, or Sketch in Mind?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Every RugCraft Studio piece is built one at a time on our vertical frame in Georgia. Use our interactive 4-step commission wizard to choose your silhouette shape, size tier, backing option, and color direction—then send your spec sheet straight to our studio.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Btn to="/custom">Start Your Custom Request →</Btn>
              <Link
                to="/contact"
                className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                Or email rugcraftstudio8@gmail.com directly
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-border pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="border border-border bg-background p-4">
              <p className="font-mono text-xs uppercase text-primary">Step 1</p>
              <p className="mt-1 font-display text-lg font-bold">Pick Shape</p>
              <p className="mt-1 text-xs text-muted-foreground">Die-cut contour, round, oval, or mashup.</p>
            </div>
            <div className="border border-border bg-background p-4">
              <p className="font-mono text-xs uppercase text-primary">Step 2</p>
              <p className="mt-1 font-display text-lg font-bold">Choose Size</p>
              <p className="mt-1 text-xs text-muted-foreground">2.5ft desk sidekick up to 6ft+ room centerpiece.</p>
            </div>
            <div className="border border-border bg-background p-4">
              <p className="font-mono text-xs uppercase text-primary">Step 3</p>
              <p className="mt-1 font-display text-lg font-bold">Approve & Tuft</p>
              <p className="mt-1 text-xs text-muted-foreground">Hand-tufted & razor-carved in ~2 weeks.</p>
            </div>
          </div>
        </div>
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
  const list = cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <section
      id="works-showcase"
      className={`border-b border-border bg-background ${
        standalone
          ? "min-h-[100svh] pt-24 pb-8 md:flex md:h-[100svh] md:flex-col md:justify-between md:pt-24 md:pb-6"
          : "py-10 md:flex md:h-[100svh] md:max-h-[960px] md:min-h-[720px] md:flex-col md:justify-between md:py-8"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[92rem] flex-col px-6 md:px-12">
        {/* Compact Header Bar */}
        <div className="mb-4 flex flex-col justify-between gap-3 border-b border-border pb-3.5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Complete Studio Archive · {list.length} Builds</p>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {standalone ? "All Hand-Tufted Works" : "12 Custom Studio Builds"}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] transition-colors ${
                  cat === c
                    ? "border-primary bg-primary font-semibold text-primary-foreground"
                    : "border-border bg-card text-foreground/80 hover:border-primary"
                }`}
              >
                {c}
              </button>
            ))}
            {!standalone && (
              <Link
                to="/works"
                className="ml-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary hover:underline"
              >
                Full Page →
              </Link>
            )}
          </div>
        </div>

        {/* 4x3 Desktop Grid filling remaining 100vh height / 2-col Mobile Grid */}
        <div className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 md:grid-rows-3 md:gap-3">
          {list.slice(0, 12).map((p) => (
            <Link
              key={p.slug}
              to={`/rug/${p.slug}`}
              className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden border border-border bg-card md:min-h-0"
            >
              <img
                src={p.images[0]}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 flex items-center justify-between p-2">
                <span className="border border-white/15 bg-[#0E0D0C]/90 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#F4EFE6]">
                  {p.sizeSpec.split(" ")[0]}
                </span>
                {p.images.length > 1 && (
                  <span className="border border-white/15 bg-[#0E0D0C]/90 px-2 py-0.5 font-mono text-[0.55rem] text-[#C85A32]">
                    {p.images.length} Views
                  </span>
                )}
              </div>

              <div className="relative z-10 border-t border-white/15 bg-[#0E0D0C]/92 px-3 py-2 text-[#F4EFE6] transition-colors group-hover:bg-[#0E0D0C]">
                <p className="truncate font-display text-sm font-bold leading-tight group-hover:text-[#C85A32] md:text-base">
                  {p.name}
                </p>
                <p className="truncate font-mono text-[0.58rem] uppercase tracking-[0.08em] text-[#A69E93]">
                  {p.category} · Inspect →
                </p>
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
    <section className="border-b border-border bg-card py-14 md:py-20">
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <div className="overflow-hidden border border-border bg-background">
              <img
                src={IMAGES.dolphinsTufting}
                alt="Hand-tufting on vertical frame in Georgia"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden border border-border bg-background">
              <img
                src={IMAGES.eaglesCarving}
                alt="Electric carving shears sculpting 3D rug pile"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <p className="eyebrow">Inside RugCraft Studio · Georgia, USA</p>
            <h2 className="display-lg mt-2">
              Hand-Tufted One Loop at a Time in Georgia.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We don’t mass-produce or drop-ship factory prints. Every RugCraft Studio piece begins with a 1:1 projector sketch on stretched monk’s cloth, gets tufted at 2,000 RPM with 4-ply yarn, locked in commercial latex, and razor-carved by hand.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 border-y border-border py-4">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">2,000 RPM</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                  Cut-Pile Tufting
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">16mm Loft</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                  4-Ply Wool & Acrylic
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary">100% US</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                  Made in Georgia
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn to="/about">Read Our Studio Story →</Btn>
              <Btn to="/custom" variant="outline">
                Commission a Rug
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
