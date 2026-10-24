import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Copy, Sparkles, ZoomIn, ChevronDown } from "lucide-react";
import { IMAGES, PRODUCTS, EMAIL_ADDRESS, X_HANDLE, X_URL, waLink } from "@/lib/studio";
import { prefersReduced } from "@/lib/store";
import { gsap, SplitText, ScrubText, Marquee, Counter } from "./Motion";
import { Reveal } from "./Reveal";
import { Btn } from "./Buttons";
import { WhatsAppIcon, XLogoIcon } from "./WhatsAppIcon";
import { Carousel3D } from "./Carousel3D";
import { ProductCard } from "./ProductCard";

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = root.current; if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-img", { scale: 1.25, filter: "brightness(0.55)" }, { scale: 1.04, filter: "brightness(0.95)", duration: 2.2, ease: "expo.out" });
      gsap.to(".hero-img-wrap", { yPercent: 15, scale: 1.1, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.from(".hero-fade", { y: 26, opacity: 0, duration: 1.05, ease: "power3.out", stagger: 0.1, delay: 0.55 });
    }, el);
    const move = (e: MouseEvent) => { if (glow.current) gsap.to(glow.current, { x: e.clientX, y: e.clientY, duration: 1.1, ease: "power3.out" }); };
    window.addEventListener("mousemove", move as unknown as EventListener);
    return () => { ctx.revert(); window.removeEventListener("mousemove", move as unknown as EventListener); };
  }, [ready]);
  if (!ready) return <section className="h-[100svh] bg-[#120c08]" />;
  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[#120c08] text-[#f5ead8]">
      <div className="hero-img-wrap absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Sunlit RugCraft Studio workshop with a hand-tufted navy and orange rug unrolled beside a tufting gun and yarn cones"
          fetchPriority="high"
          className="hero-img h-full w-full object-cover object-center"
        />
      </div>
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(18,12,8,0.92) 0%, rgba(18,12,8,0.52) 42%, rgba(18,12,8,0.18) 72%, rgba(18,12,8,0.55) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#120c08] via-[#120c08]/75 to-transparent" />
      <div
        ref={glow}
        className="pointer-events-none absolute left-0 top-0 hidden h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,138,60,.28),transparent_62%)] mix-blend-screen md:block"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[96rem] flex-col justify-between px-6 pb-8 pt-24 md:px-12 md:pb-10 md:pt-28">
        {/* Top meta matching r15_rugcraft preview */}
        <div className="hero-fade flex items-center justify-between">
          <span className="font-mono text-[0.7rem] tracking-[0.04em] text-[#f5ead8]/80">Georgia, USA · Ships nationwide</span>
          <span className="hidden items-center gap-2 border border-[#f08a3c]/40 bg-[#120c08]/75 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#f08a3c] backdrop-blur sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-[#f08a3c] animate-pulse" /> Commissions Open · Custom Builds
          </span>
        </div>

        {/* Center headline matching r15_rugcraft preview + floating real builds card */}
        <div className="my-auto grid items-center gap-8 py-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="font-display text-[clamp(4.4rem,11.5vw,11.2rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-[#f5ead8]">
              <span className="block">
                <SplitText text="YOUR TEAM." delay={0.1} />
              </span>
              <span className="block pl-[0.32em] md:pl-[0.58em]">
                <SplitText text="YOUR " delay={0.28} />
                <em className="italic text-[#f08a3c]">
                  <SplitText text="RUG." delay={0.42} />
                </em>
              </span>
            </h1>
            <p className="hero-fade mt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[#f08a3c]">
              Walls Have Posters. Legends Walk On Art.
            </p>
          </div>

          <div className="hero-fade hidden lg:col-span-4 lg:flex lg:justify-end">
            <div className="w-80 border border-[#f5ead8]/20 bg-[#120c08]/85 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#f5ead8]/15 pb-2.5">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#f08a3c]">Fresh Off The Frame</span>
                <Link to="/shop" className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#f5ead8]/70 hover:text-[#f08a3c]">All 12 Builds →</Link>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <Link to="/product/patriots-flying-elvis-rug" className="group relative aspect-square overflow-hidden border border-[#f5ead8]/15">
                  <img src={IMAGES.patriotsDesk} alt="Patriots custom rug" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </Link>
                <Link to="/product/chicago-bears-roaring-round" className="group relative aspect-square overflow-hidden border border-[#f5ead8]/15">
                  <img src={IMAGES.bearsFull} alt="Chicago Bears custom rug" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </Link>
                <Link to="/product/brewers-ball-in-glove-rug" className="group relative aspect-square overflow-hidden border border-[#f5ead8]/15">
                  <img src={IMAGES.brewersGlove} alt="Milwaukee Brewers custom rug" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </Link>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#f5ead8]/80">
                100% hand-tufted & razor-carved in Georgia from your team logo, mashup, or DM sketch.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom lede + rule matching r15_rugcraft preview */}
        <div>
          <div className="hero-fade mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-[360px] text-[0.96rem] leading-[1.5] text-[#f5ead8]/90">
              One-of-a-kind tufted rugs for game-day superfans. Designed with you, made by hand, ready in about two weeks.
            </p>
            <div className="flex flex-wrap gap-3">
              <Btn to="/#commission">Start a commission →</Btn>
              <Btn to="/shop" variant="outline">Browse recent builds</Btn>
            </div>
          </div>
          <div className="hero-fade flex items-center gap-5 pt-2">
            <span className="font-mono text-[0.68rem] tracking-[0.02em] text-[#f5ead8]/75">Made to order · Open for commissions</span>
            <span className="h-px flex-1 bg-[#f5ead8]/28" />
            <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#f5ead8] sm:inline">Sports · Gaming · Custom</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="relative mx-auto max-w-[96rem] px-6 py-[clamp(5rem,11vw,10rem)] md:px-12">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="eyebrow">(01) The Studio Creed</p>
          <p className="mt-4 text-xs text-muted-foreground">
            From your DM sketch to 10,000 loops of dense cut-pile yarn. Zero factory fluff.
          </p>
        </div>
        <div className="md:col-span-9">
          <ScrubText
            className="font-display text-[clamp(2.3rem,5vw,5.2rem)] leading-[0.96] tracking-[-0.02em]"
            text="WALLS HAVE POSTERS. LEGENDS WALK ON ART. WE HAND-TUFT HEAVYWEIGHT FLOOR CENTERPIECES IN GEORGIA — RAZOR-CARVED SO EVERY LETTER, CREST & SILHOUETTE POPS IN 3D RELIEF."
          />
          <div className="mt-14 grid grid-cols-2 gap-6 border-t pt-8 md:grid-cols-4">
            {[
              { n: 60, s: "+", l: "Custom Builds & Drops" },
              { n: 2000, s: "", l: "RPM Cut-Pile Tufting" },
              { n: 14, s: "d", l: "Avg. Studio Turnaround" },
              { n: 100, s: "%", l: "Hand-Carved in Georgia" },
            ].map((c) => (
              <div key={c.l}>
                <Counter to={c.n} suffix={c.s} className="font-display text-[clamp(2.6rem,5.5vw,5.4rem)] leading-none text-primary" />
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">{c.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CarouselSection() {
  return (
    <section className="relative overflow-hidden border-y bg-card py-[clamp(5rem,9vw,8.5rem)]">
      <div className="mx-auto mb-6 flex max-w-[96rem] flex-col justify-between gap-4 px-6 md:flex-row md:items-end md:px-12">
        <div>
          <p className="eyebrow">(02) Recent Builds · 360° Trophy Orbit</p>
          <h2 className="display-lg mt-3">
            <SplitText text="Don’t buy a rug." trigger="scroll" className="block" />
            <SplitText text="Commission a centerpiece." trigger="scroll" className="block italic text-primary" />
          </h2>
        </div>
        <p className="max-w-xs font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
          Drag to spin our real fan builds from X (@RugCraftStudio). Click any rug to inspect its carved pile.
        </p>
      </div>
      <Carousel3D />
    </section>
  );
}

const LAB_STEPS = [
  {
    num: "01",
    stage: "Frame & Projection",
    title: "1:1 Projector Sketch",
    image: IMAGES.brewersSketch,
    caption: "Tracing the Milwaukee Brewers Ball-in-Glove silhouette onto stretched primary tufting cloth.",
    desc: "You send the logo, mashup, or sketch. We project it at full scale onto drum-tight monk’s cloth in our Georgia studio and hand-trace every vector contour.",
  },
  {
    num: "02",
    stage: "High-RPM Tufting",
    title: "2,000 RPM Cut-Pile",
    image: IMAGES.dolphinsTufting,
    caption: "Feeding electric coral-orange yarn into the Miami Dolphins sunburst on our vertical frame.",
    desc: "Our pneumatic-style electric tufting gun punches dense 4-ply acrylic & wool yarn into the canvas, building a thick 16mm plush cushion built for heavy stepping.",
  },
  {
    num: "03",
    stage: "Latex & Backing",
    title: "Waterfall Edge & Grip",
    image: IMAGES.oriolesUnroll,
    caption: "Unrolling our 5Ft Birdland mascot rug, revealing the heavy grey non-slip felt backing.",
    desc: "Every stitch is locked in commercial synthetic latex, wrapped with tight waterfall yarn edges, and finished with grippy non-slip felt that stays flat on hardwood.",
  },
  {
    num: "04",
    stage: "3D Bevel Shearing",
    title: "Razor-Carved Relief",
    image: IMAGES.eaglesCarving,
    caption: "Electric carving shears sculpting deep 3D channels between colors on the Philadelphia Eagles rug.",
    desc: "This is where the magic happens: we hand-carve V-grooves between every color block and vacuum-finish the pile so letters and mascots look sculpted out of velvet.",
  },
];

export function HorizontalCollections() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = root.current, tr = track.current; if (!el || !tr || prefersReduced()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const dist = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: el, pin: true, scrub: 1, start: "top top", end: () => `+=${dist()}`, invalidateOnRefresh: true } });
      gsap.utils.toArray<HTMLElement>(".hc-img").forEach((img) => gsap.fromTo(img, { xPercent: -10 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }));
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={root} id="lab" className="relative overflow-hidden border-b">
      <div ref={track} className="no-scrollbar flex h-auto items-center gap-8 overflow-x-auto px-6 py-24 md:h-screen md:overflow-visible md:px-12 md:pb-0 md:pt-20">
        <div className="w-[82vw] shrink-0 md:w-[32vw]">
          <p className="eyebrow">(03) The Tufting Lab · How It’s Made</p>
          <h2 className="display-lg mt-4">
            From DM Sketch<br /><em className="text-primary">to 3D Pile.</em>
          </h2>
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">
            Real photos from inside our Georgia workshop. Scroll horizontally through the four stages every custom commission goes through before it hits your floor.
          </p>
          <div className="mt-8">
            <Btn to="/#commission">Start Your Build →</Btn>
          </div>
        </div>
        {LAB_STEPS.map((s, i) => (
          <div key={s.num} className={`group relative shrink-0 ${i % 2 ? "w-[78vw] md:mt-16 md:w-[26vw]" : "w-[80vw] md:-mt-8 md:w-[28vw]"}`}>
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card md:h-[54vh] md:aspect-auto">
              <img src={s.image} alt={s.caption} loading="lazy" className="hc-img h-full w-[120%] max-w-none -translate-x-[10%] object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-3 top-3 border border-primary/50 bg-background/90 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary backdrop-blur">
                STEP {s.num} · {s.stage}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-display text-[clamp(2rem,3vw,3.1rem)] leading-none">
                <span className="mr-2.5 align-top font-mono text-xs text-primary">{s.num}</span>
                {s.title}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
        <div className="w-[8vw] shrink-0" />
      </div>
    </section>
  );
}

const LOUPE_SLIDES = [
  {
    label: "3D Carved Typography",
    sub: "Chicago Bears Medallion — Deep-beveled block serif letters cast real shadows into the navy pile.",
    img: IMAGES.bearsCarve,
    badge: "Razor-Carved V-Grooves",
  },
  {
    label: "Electric Shear Sculpting",
    sub: "Philadelphia Eagles Build — Hand-shearing between white outlines and midnight green cut-pile.",
    img: IMAGES.eaglesCarving,
    badge: "Live Studio Carving",
  },
  {
    label: "Vacuum & Waterfall Edge",
    sub: "New England Patriots Die-Cut — Vacuuming loose yarn fluff to reveal crisp multi-color contours.",
    img: IMAGES.patriotsVacuum,
    badge: "Zero Factory Fluff",
  },
];

export function Editorial() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const cur = LOUPE_SLIDES[active]!;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <section className="relative mx-auto max-w-[96rem] px-6 py-[clamp(5.5rem,11vw,10rem)] md:px-12">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">(04) Interactive Texture Loupe</p>
          <h2 className="display-lg mt-4">
            Cut-Pile Precision.<br />
            <em className="text-primary">Razor-Carved Edges.</em>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Machine-printed mats look flat from five feet away. Every RugCraft Studio build is sculpted with electric shears so each letter and logo outline sits in crisp 3D relief.
          </p>
          <div className="mt-8 space-y-2.5">
            {LOUPE_SLIDES.map((s, idx) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(idx)}
                className={`w-full border p-4 text-left transition-all ${
                  active === idx ? "border-primary bg-card" : "border-border/70 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl tracking-wide">{s.label}</span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary">{s.badge}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            onMouseMove={onMove}
            onMouseLeave={() => setZoom(null)}
            data-cursor="2.4x Loupe"
            className="relative aspect-[4/3] cursor-zoom-in overflow-hidden border border-border bg-card"
          >
            <img
              key={cur.img}
              src={cur.img}
              alt={cur.sub}
              className="fade-in h-full w-full object-cover transition-transform duration-200 ease-out"
              style={zoom ? { transform: "scale(2.35)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 text-[#f5ead8]">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#f08a3c]">{cur.badge}</p>
                <p className="mt-0.5 text-sm">{cur.sub}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 border border-[#f5ead8]/30 bg-black/60 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em]">
                <ZoomIn className="h-3.5 w-3.5 text-[#f08a3c]" /> {zoom ? "Inspecting Pile" : "Hover to Magnify"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Bestsellers() {
  const [filter, setFilter] = useState<string>("All");
  const cats = ["All", "NFL & Football", "MLB & Diamond", "Custom Mashups", "Gaming & Culture"];
  const list = filter === "All" ? PRODUCTS.slice(0, 8) : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section id="shop" className="mx-auto max-w-[96rem] px-6 pb-[clamp(5.5rem,10vw,9rem)] md:px-12">
      <div className="mb-10 flex flex-col justify-between gap-6 border-t pt-10 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">(05) Past Drops & Fan Commissions</p>
          <h2 className="display-lg mt-3">
            Built For <em className="text-primary">Superfans.</em>
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`border px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors ${
                filter === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
              }`}
            >
              {c}
            </button>
          ))}
          <Btn to="/shop" variant="outline">View All {PRODUCTS.length} →</Btn>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60} className={i % 2 ? "lg:mt-12" : ""}>
            <ProductCard p={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const SHAPES = [
  { id: "Die-Cut Logo Silhouette", desc: "Cut to the exact jagged contour of your team or icon" },
  { id: "Classic Round Medallion", desc: "Bold stadium crest framed by arched typography" },
  { id: "Oval / Runner Build", desc: "Ideal for doorways, desks, or hallway turf" },
  { id: "1-of-1 Multi-Team Mashup", desc: "Combine 2–3 teams, players, or symbols into one piece" },
];

const SIZES = [
  { id: "Small · 2x2 ft", use: "Desk Sidekick / Wall Art", tag: "Price on request" },
  { id: "Medium · 3x3 ft", use: "Fan Cave Chair / Entryway", tag: "Most Popular" },
  { id: "Large · 4x5 ft", use: "Game Room Centerpiece", tag: "Price on request" },
  { id: "XL Trophy · 5 ft+", use: "Full Man-Cave Statement", tag: "Custom Quote" },
];

const PILES = [
  "Plush Cut-Pile + 3D Razor Carve",
  "High-Low Sculpted Relief",
  "Floor Rug + Wall-Hang D-Rings",
];

export function Gifting() {
  const [shape, setShape] = useState(SHAPES[0]!.id);
  const [size, setSize] = useState(SIZES[1]!.id);
  const [pile, setPile] = useState(PILES[0]!);
  const [idea, setIdea] = useState("");
  const [colors, setColors] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [copied, setCopied] = useState(false);

  const specText = [
    `Hi RugCraft Studio! 🧶🔥`,
    `I designed a custom rug spec on your website and would love a quote:`,
    ``,
    `• Concept / Team / Logo: ${idea.trim() || "(Tell us your team, gaming icon, pet, or logo)"}`,
    `• Silhouette Shape: ${shape}`,
    `• Size Tier: ${size}`,
    `• Pile & Finish: ${pile}`,
    `• Yarn Colors: ${colors.trim() || "Team authentic / studio recommendation"}`,
    deadline.trim() ? `• Target Date / Gift Deadline: ${deadline.trim()}` : null,
    name.trim() ? `• Fan Name: ${name.trim()}` : null,
    ``,
    `Let me know how we can lock in the mockup!`,
  ]
    .filter(Boolean)
    .join("\n");

  const mailHref = waLink(specText, `Custom Rug Commission: ${idea.trim() || shape} (${size})`);

  const copyAndOpenX = () => {
    navigator.clipboard?.writeText(specText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);
  };

  return (
    <section id="commission" className="relative overflow-hidden border-y bg-card py-[clamp(5.5rem,10vw,9rem)]">
      <div className="mx-auto max-w-[96rem] px-6 md:px-12">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">(06) Interactive Commission Studio</p>
          <h2 className="display-lg mt-3">
            Design Your <em className="text-primary">Custom Rug.</em>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Build your spec sheet in 30 seconds. Pick your silhouette, size tier, and concept—then send it straight to our Georgia workshop via Email or X DM.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Builder Controls */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <label className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Step 01 · Choose Silhouette</label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {SHAPES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShape(s.id)}
                    className={`border p-4 text-left transition-all ${
                      shape === s.id ? "border-primary bg-background" : "border-border bg-background/40 hover:border-primary/50"
                    }`}
                  >
                    <p className="font-display text-2xl leading-none">{s.id}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Step 02 · Select Size Tier (Price on Request)</label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSize(s.id)}
                    className={`border p-4 text-left transition-all ${
                      size === s.id ? "border-primary bg-background" : "border-border bg-background/40 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl leading-none">{s.id}</span>
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary">{s.tag}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">{s.use}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Step 03 · Pile & Carving Finish</label>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {PILES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPile(p)}
                    className={`border px-4 py-2.5 font-mono text-xs uppercase tracking-[0.1em] transition-all ${
                      pile === p ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background/40 hover:border-primary"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="rug-idea" className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  Step 04 · Your Rug Idea (Team, Gaming Logo, Pet, or Mashup)
                </label>
                <input
                  id="rug-idea"
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., Custom Patriots Flying Elvis, Bears Round Crest, Anime / Controller..."
                  className="mt-2 w-full border border-border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="rug-colors" className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                  Preferred Yarn Colors
                </label>
                <input
                  id="rug-colors"
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  placeholder="e.g., Navy, Tufting Orange & Cream"
                  className="mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="rug-deadline" className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                  Your Name & Target Date (Optional)
                </label>
                <input
                  id="rug-deadline"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Marcus · Need before Game Day"
                  className="mt-1.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Live Blueprint Spec Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 border border-primary/60 bg-background p-6 shadow-2xl md:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="eyebrow">Live Studio Blueprint</p>
                  <h3 className="mt-1 font-display text-3xl">Commission Ticket</h3>
                </div>
                <Sparkles className="h-6 w-6 text-primary" />
              </div>

              <dl className="mt-6 space-y-3.5 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2.5">
                  <dt className="font-mono text-xs uppercase text-muted-foreground">Concept</dt>
                  <dd className="max-w-[60%] text-right font-medium text-foreground">{idea.trim() || "Custom Fan / Logo Build"}</dd>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2.5">
                  <dt className="font-mono text-xs uppercase text-muted-foreground">Silhouette</dt>
                  <dd className="text-right font-medium text-primary">{shape}</dd>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2.5">
                  <dt className="font-mono text-xs uppercase text-muted-foreground">Size Tier</dt>
                  <dd className="text-right font-medium">{size}</dd>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2.5">
                  <dt className="font-mono text-xs uppercase text-muted-foreground">Pile & Edge</dt>
                  <dd className="text-right font-medium">{pile}</dd>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2.5">
                  <dt className="font-mono text-xs uppercase text-muted-foreground">Backing</dt>
                  <dd className="text-right text-xs text-muted-foreground">Latex Lock + Non-Slip Grey Felt</dd>
                </div>
                <div className="flex justify-between pb-1">
                  <dt className="font-mono text-xs uppercase text-muted-foreground">Est. Turnaround</dt>
                  <dd className="font-mono text-xs text-primary">~2 Weeks · Ships from Georgia</dd>
                </div>
              </dl>

              <div className="mt-8 space-y-3">
                <a href={mailHref} className="btn-gold w-full">
                  <WhatsAppIcon className="h-4 w-4" /> Email Spec to {EMAIL_ADDRESS}
                </a>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={copyAndOpenX}
                    className="btn-outline w-full !px-3 text-center"
                  >
                    <XLogoIcon className="h-3.5 w-3.5" /> DM {X_HANDLE}
                  </a>
                  <button
                    type="button"
                    onClick={copyAndOpenX}
                    className="btn-outline w-full !px-3"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Spec Copied!" : "Copy Spec"}
                  </button>
                </div>
              </div>
              <p className="mt-4 text-center font-mono text-[0.62rem] text-muted-foreground">
                Have a reference photo or screenshot? Attach it directly in your email or X DM!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="relative overflow-hidden bg-foreground py-[clamp(5.5rem,11vw,10rem)] text-background">
      <div className="mx-auto grid max-w-[96rem] items-center gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-6">
          <p className="eyebrow">(07) Inside RugCraft Studio · Georgia, USA</p>
          <p className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4.6rem)] leading-[0.95]">
            “Hand-tufted in Georgia. <em className="text-primary">Built for heavy stepping.</em>”
          </p>
          <p className="mt-6 max-w-lg text-background/80">
            Every RugCraft Studio piece starts on our wooden frame in Georgia surrounded by cones of vibrant navy, crimson, gold, and tufting-orange yarn. We don’t mass-produce or drop-ship—each rug is projected, tufted, backed, and razor-carved by hand for one fan at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn to="/about" variant="outline" className="!border-background/40 !bg-transparent !text-background hover:!text-foreground">
              Inside The Workshop →
            </Btn>
            <Btn to="/#commission">Commission Yours</Btn>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-6">
          <img src={IMAGES.patriotsDesk} alt="New England Patriots rug on studio desk with colorful yarn spools" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          <img src={IMAGES.ravensStudio} alt="Baltimore Ravens tufted rug on workshop mat with scissors and vacuum" loading="lazy" className="mt-8 aspect-[3/4] w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "How long does a custom rug commission take?",
    a: "Most custom rugs take about two weeks from mockup approval to final razor-carving and latex curing, depending on size and current commission queue. Have a birthday or game-day deadline? Let us know in your inquiry.",
  },
  {
    q: "What sizes and shapes can you tuft?",
    a: "We tuft Small (2x2 ft), Medium (3x3 ft), Large (4x5 ft), and XL 5ft+ statement pieces. Because we project your design onto a large vertical frame, we can cut any die-cut silhouette, circle, oval, or multi-team mashup.",
  },
  {
    q: "Can I walk on it every day or hang it on the wall?",
    a: "Both! We use dense 4-ply acrylic & wool-blend yarn locked in commercial latex with heavy-duty non-slip grey felt backing. It’s built for fan caves, bedrooms, and offices, or we can add D-rings for wall mounting.",
  },
  {
    q: "How do I clean and care for a hand-tufted rug?",
    a: "Vacuum gently with suction only (keep rotary beater bars turned off) to keep the razor-carved 3D bevels crisp. Spot-clean any spills with a damp cloth and mild soap.",
  },
  {
    q: "How do pricing and shipping work?",
    a: "Every piece is quoted individually based on size, detail complexity, and yarn colors. We ship rolled and protected nationwide across the USA right from Georgia.",
  },
];

export function CustomerLove() {
  return (
    <section className="mx-auto max-w-[96rem] px-6 py-[clamp(5.5rem,10vw,9rem)] md:px-12">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">(08) Studio FAQ & Specs</p>
          <h2 className="display-lg mt-3">
            Before We <em className="text-primary">Thread The Gun.</em>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Everything you need to know about ordering a custom hand-tufted piece from RugCraft Studio.
          </p>
        </div>
        <div className="lg:col-span-7">
          {FAQS.map((f, idx) => (
            <details key={f.q} open={idx === 0} className="group border-t border-border py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-2xl tracking-wide hover:text-primary md:text-3xl">
                <span><span className="mr-3 font-mono text-xs text-primary">0{idx + 1}</span>{f.q}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 pl-7 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const X_POSTS = [
  { src: IMAGES.patriotsDesk, label: "Patriots Die-Cut Build", url: "https://x.com/RugCraftStudio/status/2112956019810959819" },
  { src: IMAGES.bearsFull, label: "Chicago Bears Round Rug", url: "https://x.com/RugCraftStudio/status/2113408075311001885" },
  { src: IMAGES.brewersGlove, label: "Milwaukee Brewers Mitt", url: "https://x.com/RugCraftStudio/status/2113857134945317292" },
  { src: IMAGES.ravensGameroom, label: "Ravens Game Room Setup", url: "https://x.com/RugCraftStudio/status/2112643886078202158" },
  { src: IMAGES.eaglesCarving, label: "Philly Eagles Shear Carve", url: "https://x.com/RugCraftStudio/status/2113850924770980124" },
  { src: IMAGES.nyMashup, label: "NY Giants × Yankees Mashup", url: "https://x.com/RugCraftStudio/status/2112951206440304670" },
];

export function InstagramStrip() {
  return (
    <section className="py-[clamp(4rem,8vw,7rem)]">
      <Marquee
        items={[X_HANDLE, "DAILY STUDIO DROPS", "OPEN FOR COMMISSIONS", "HAND-TUFTED IN GEORGIA", X_HANDLE]}
        className="mb-10 font-display text-[clamp(2.6rem,6vw,5.8rem)] leading-none"
        speed={35}
      />
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-6">
        {X_POSTS.map((post, i) => (
          <a
            key={i}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View on X"
            aria-label={`RugCraft Studio on X: ${post.label}`}
            className="group relative aspect-square overflow-hidden bg-card"
          >
            <img
              src={post.src}
              alt={post.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
            />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/65 p-3 text-center opacity-0 transition-all duration-400 group-hover:opacity-100">
              <XLogoIcon className="h-6 w-6 text-[#f08a3c]" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[#f5ead8]">{post.label}</span>
              <ArrowUpRight className="h-4 w-4 text-[#f08a3c]" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function WhySilver() {
  const rows = [
    ["Cut-Pile Precision", "Dense 4-ply acrylic and wool-blend yarn tufted at 2,000 RPM for a springy, heavyweight 16mm loft."],
    ["Razor-Carved 3D Relief", "Every color border is hand-beveled with electric carving shears so letters and mascots pop off the floor."],
    ["Commercial Latex & Felt Lock", "Backed with synthetic latex adhesive, wrapped waterfall edges, and thick non-slip grey felt."],
  ];
  return (
    <section className="mx-auto max-w-[96rem] px-6 py-[clamp(5rem,10vw,9rem)] md:px-12">
      <div className="grid gap-10 md:grid-cols-12">
        <h2 className="display-lg md:col-span-5">
          Why <em className="text-primary">Hand-Tufted</em>
        </h2>
        <div className="md:col-span-6 md:col-start-7">
          {rows.map(([t, d], i) => (
            <Reveal key={t} delay={i * 100} className="grid grid-cols-[3rem_1fr] border-t py-7">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <div>
                <h3 className="font-display text-3xl">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
