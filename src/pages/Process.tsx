import { useState, type MouseEvent } from "react";
import { ZoomIn, ChevronDown } from "lucide-react";
import { IMAGES } from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { Btn } from "@/components/studio/Buttons";
import {
  Icon3DBoxStage,
  Icon3DRazorShears,
  Icon3DSketchFrame,
  Icon3DTuftGun,
  Icon3DShippingBox,
} from "@/components/studio/Icons3D";

const LAB_STAGES = [
  {
    stage: "Projector & Frame",
    title: "1:1 Scale Vector Projection",
    image: IMAGES.brewersSketch,
    caption: "Tracing the Milwaukee Brewers Ball-in-Glove silhouette onto stretched primary tufting cloth.",
    desc: "Every commission starts with your artwork projected at full scale onto drum-tight monk’s cloth in our Georgia studio. We hand-trace every contour and color boundary before threading the gun.",
    icon: Icon3DSketchFrame,
  },
  {
    stage: "High-RPM Tufting",
    title: "2,000 RPM Cut-Pile Tufting",
    image: IMAGES.dolphinsTufting,
    caption: "Feeding electric coral-orange yarn into the Miami Dolphins sunburst on our vertical frame.",
    desc: "Our electric tufting gun punches heavyweight 4-ply acrylic and wool-blend yarn into the stretched canvas, building a dense 16mm plush cushion engineered for heavy footsteps.",
    icon: Icon3DTuftGun,
  },
  {
    stage: "Latex & Backing",
    title: "Commercial Latex & Non-Slip Felt",
    image: IMAGES.oriolesUnroll,
    caption: "Unrolling our 5ft Birdland mascot rug, revealing the heavy grey non-slip felt backing.",
    desc: "Every loop is locked in commercial synthetic latex, wrapped with tight waterfall yarn edges, and finished with grippy non-slip grey felt or wall-mount D-rings.",
    icon: Icon3DShippingBox,
  },
  {
    stage: "3D Bevel Shearing",
    title: "Razor-Carved 3D Relief",
    image: IMAGES.eaglesCarving,
    caption: "Electric carving shears sculpting deep 3D channels between colors on the Philadelphia Eagles rug.",
    desc: "We hand-carve V-grooves between every color block with electric shears and vacuum-finish the pile so letters, stars, and mascots look sculpted out of velvet.",
    icon: Icon3DRazorShears,
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
    a: "We tuft 3ft, 4ft, 5ft, and custom oversized statement pieces. Because we project your design onto a large vertical frame, we can cut any die-cut silhouette, circle, oval, or multi-team mashup.",
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

export default function Process() {
  useSeo({
    title: "Craft & Process — Inside The Tufting Lab · RugCraft Studio",
    description:
      "See how RugCraft Studio hand-tufts, backs, and razor-carves custom rugs in Georgia, USA. Inspect our 16mm cut-pile and 3D bevel carving up close.",
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
      <section className="mx-auto max-w-[92rem] px-6 pb-16 pt-28 md:px-12 md:pt-36">
        <div className="max-w-3xl">
          <p className="eyebrow">Inside The Tufting Lab · Georgia, USA</p>
          <h1 className="display-lg mt-3">
            Cut-Pile Precision.{" "}
            <em className="text-primary">Razor-Carved Edges.</em>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Real photographs from inside our Georgia workshop. Every rug we ship goes through four meticulous stages—from 1:1 projector tracing to final electric shear beveling.
          </p>
        </div>

        {/* 4-Stage Architectural Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {LAB_STAGES.map((s) => (
            <div
              key={s.title}
              className="overflow-hidden rounded-3xl border border-border bg-card p-5 md:p-6"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border/70 bg-background">
                <img
                  src={s.image}
                  alt={s.caption}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-lg border border-primary/40 bg-background/90 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-primary backdrop-blur">
                  {s.stage}
                </span>
              </div>
              <div className="mt-6 flex items-start gap-4">
                <Icon3DBoxStage className="h-11 w-11">
                  <s.icon className="h-6 w-6" />
                </Icon3DBoxStage>
                <div>
                  <h2 className="font-display text-2xl leading-tight md:text-3xl">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 2.35x Carving Loupe */}
      <section className="border-y border-border bg-card/50 py-16 md:py-24">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Interactive Texture Loupe</p>
              <h2 className="display-lg mt-2">
                Inspect the <em className="text-primary">3D Carve.</em>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Machine-printed mats look flat from five feet away. Hover or tap any studio photograph to magnify our hand-beveled V-grooves at 2.35x zoom.
              </p>
              <div className="mt-6 space-y-2.5">
                {LOUPE_SLIDES.map((s, idx) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActive(idx)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all ${
                      active === idx
                        ? "border-primary bg-background shadow-sm"
                        : "border-border/70 bg-background/40 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl">{s.label}</span>
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary">
                        {s.badge}
                      </span>
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
                data-cursor="2.35x Loupe"
                className="relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
              >
                <img
                  key={cur.img}
                  src={cur.img}
                  alt={cur.sub}
                  className="fade-in h-full w-full object-cover transition-transform duration-200 ease-out"
                  style={
                    zoom
                      ? { transform: "scale(2.35)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                      : undefined
                  }
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5 text-[#f5ead8]">
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#f08a3c]">
                      {cur.badge}
                    </p>
                    <p className="mt-0.5 text-sm">{cur.sub}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-black/60 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em]">
                    <ZoomIn className="h-3.5 w-3.5 text-[#f08a3c]" />{" "}
                    {zoom ? "Inspecting Pile" : "Hover to Magnify"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio FAQ */}
      <section className="mx-auto max-w-[92rem] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Studio FAQ</p>
            <h2 className="display-lg mt-2">
              Common <em className="text-primary">Questions.</em>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Everything you need to know about commissioning a custom hand-tufted rug from our Georgia workshop.
            </p>
            <div className="mt-7">
              <Btn to="/custom">Start Custom Commission →</Btn>
            </div>
          </div>
          <div className="lg:col-span-7">
            {FAQS.map((f, idx) => (
              <details key={f.q} open={idx === 0} className="group border-t border-border py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl hover:text-primary md:text-2xl">
                  <span>{f.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
