import { useState, type MouseEvent } from "react";
import { IMAGES } from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { Btn } from "@/components/studio/Buttons";

const LAB_STAGES = [
  {
    stage: "Stage 1 · Projection",
    title: "1:1 Vector Projection & Sketch",
    image: IMAGES.brewersSketch,
    desc: "Every commission starts with your artwork projected at full scale onto drum-tight monk’s cloth in our Georgia studio. We hand-trace every contour and color boundary before threading the gun.",
  },
  {
    stage: "Stage 2 · Tufting",
    title: "2,000 RPM Cut-Pile Tufting",
    image: IMAGES.dolphinsTufting,
    desc: "Our electric tufting gun punches heavyweight 4-ply acrylic and wool-blend yarn into the stretched canvas, building a dense 16mm plush cushion engineered for heavy footsteps.",
  },
  {
    stage: "Stage 3 · Backing",
    title: "Commercial Latex & Non-Slip Felt",
    image: IMAGES.oriolesUnroll,
    desc: "Every loop is locked in commercial synthetic latex, wrapped with tight waterfall yarn edges, and finished with grippy non-slip grey felt or wall-mount D-rings.",
  },
  {
    stage: "Stage 4 · Carving",
    title: "Razor-Carved 3D Relief",
    image: IMAGES.eaglesCarving,
    desc: "We hand-carve V-grooves between every color block with electric shears and vacuum-finish the pile so letters, stars, and mascots look sculpted out of velvet.",
  },
];

const LOUPE_SLIDES = [
  {
    label: "3D Carved Typography",
    sub: "Chicago Bears Medallion — Deep-beveled block serif letters cast crisp shadows into the navy pile.",
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
    sub: "New England Patriots Die-Cut — Vacuuming loose yarn fibers to reveal crisp multi-color contours.",
    img: IMAGES.patriotsVacuum,
    badge: "Zero Factory Fluff",
  },
];

const FAQS = [
  {
    q: "How long does a custom rug commission take?",
    a: "Most custom rugs take about two weeks from mockup approval to final razor-carving and latex curing. Have a birthday or game-day deadline? Let us know in your inquiry.",
  },
  {
    q: "What sizes and shapes can you tuft?",
    a: "We tuft 2.5ft, 3.5ft, 4.5ft, and 5.5ft+ oversized statement pieces. Because we project your design onto a large vertical frame, we can cut any die-cut silhouette, circle, oval, or multi-team mashup.",
  },
  {
    q: "Can I walk on it every day or hang it on the wall?",
    a: "Both. We use dense 4-ply acrylic and wool-blend yarn locked in commercial latex with heavy-duty non-slip grey felt backing. Choose 'Non-Slip Felt' for floors or 'Wall Hang D-Rings' for wall display.",
  },
  {
    q: "How do I clean and care for a hand-tufted rug?",
    a: "Vacuum gently with suction only (keep rotary beater bars turned off) to keep the razor-carved 3D bevels crisp. Spot-clean spills with a damp cloth and mild soap.",
  },
];

export default function About() {
  useSeo({
    title: "About RugCraft Studio · Georgia, USA",
    description:
      "Learn how RugCraft Studio hand-tufts, backs, and razor-carves custom sports, gaming, and collector rugs in Georgia, USA.",
  });

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
    <>
      {/* Studio Story Hero */}
      <section className="mx-auto max-w-[92rem] px-6 pb-16 pt-28 md:px-12 md:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">About RugCraft Studio · Georgia, USA</p>
            <h1 className="display-lg mt-2">
              Hand-Tufted For Superfans and Collectors.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We started RugCraft Studio with one obsession: turning the teams, crests, and icons you live for into heavyweight 3D floor art that outclasses any poster on the wall.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every piece is stretched, tufted at 2,000 RPM, latex-locked, backed with heavy non-slip grey felt, and hand-sheared in our Georgia workshop. Because you order directly from the maker, we can customize every inch.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn to="/custom">Start a Custom Commission →</Btn>
              <Btn to="/works" variant="outline">
                Browse All 12 Works
              </Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <img
              src={IMAGES.patriotsDesk}
              alt="New England Patriots rug on studio workbench with yarn spools"
              className="aspect-[4/5] w-full border border-border object-cover"
            />
            <img
              src={IMAGES.ravensStudio}
              alt="Baltimore Ravens custom rug on studio floor mat"
              className="aspect-[4/5] w-full border border-border object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4-Stage Craft Process */}
      <section className="border-t border-border bg-card py-16 md:py-20">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="max-w-2xl">
            <p className="eyebrow">The Tufting Process</p>
            <h2 className="display-lg mt-2">How Every Rug Is Built</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Real photographs from inside our Georgia workshop showing the four stages every commission goes through.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {LAB_STAGES.map((s) => (
              <div key={s.title} className="border border-border bg-background p-5">
                <div className="relative aspect-[16/10] overflow-hidden border border-border bg-card">
                  <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 border border-border bg-background px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary">
                    {s.stage}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive 2.35x Loupe */}
      <section className="border-t border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Interactive Texture Loupe</p>
              <h2 className="display-lg mt-2">Inspect the 3D Carve</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Hover over the studio photograph to magnify our hand-beveled V-grooves at 2.35x zoom.
              </p>
              <div className="mt-6 space-y-2">
                {LOUPE_SLIDES.map((s, idx) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActive(idx)}
                    className={`w-full border p-4 text-left transition-colors ${
                      active === idx
                        ? "border-primary bg-card"
                        : "border-border bg-card/40 hover:border-primary/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold">{s.label}</span>
                      <span className="font-mono text-[0.6rem] uppercase text-primary">{s.badge}</span>
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
                className="relative aspect-[4/3] cursor-zoom-in overflow-hidden border border-border bg-card"
              >
                <img
                  key={cur.img}
                  src={cur.img}
                  alt={cur.sub}
                  className="h-full w-full object-cover transition-transform duration-200 ease-out"
                  style={
                    zoom
                      ? { transform: "scale(2.35)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                      : undefined
                  }
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/15 bg-[#0E0D0C]/90 px-4 py-3 text-xs text-[#F4EFE6]">
                  <span>{cur.sub}</span>
                  <span className="font-mono text-[0.62rem] uppercase text-[#C85A32]">
                    {zoom ? "2.35x Active" : "Hover to Zoom"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio FAQ */}
      <section className="border-t border-border bg-card py-16 md:py-20">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Studio FAQ</p>
              <h2 className="display-lg mt-2">Common Questions</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Everything you need to know about ordering a custom hand-tufted rug.
              </p>
            </div>
            <div className="lg:col-span-7">
              {FAQS.map((f, idx) => (
                <details key={f.q} open={idx === 0} className="group border-t border-border py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-bold hover:text-primary md:text-xl">
                    <span>{f.q}</span>
                    <span className="text-primary group-open:rotate-180" aria-hidden>▾</span>
                  </summary>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
