import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/studio";
import { Reveal } from "./Reveal";
import { Btn } from "./Buttons";
import { Carousel3D } from "./Carousel3D";
import {
  Icon3DBoxStage,
  Icon3DYarnCone,
  Icon3DSketchFrame,
  Icon3DTuftGun,
  Icon3DShippingBox,
  Icon3DRazorShears,
} from "./Icons3D";

const HERO_SHOWCASE = [
  PRODUCTS[0]!, // Chicago Bears Medallion
  PRODUCTS[1]!, // New England Patriots Flying Elvis
  PRODUCTS[2]!, // Milwaukee Brewers Ball-in-Glove
  PRODUCTS[3]!, // Baltimore Ravens Flock Silhouette
];

export function Hero() {
  const [active, setActive] = useState(0);
  const current = HERO_SHOWCASE[active]!;

  return (
    <section id="top" className="relative overflow-hidden border-b border-border pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_60%)]" />
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card/80 py-1.5 pl-2 pr-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15">
                <Icon3DYarnCone className="h-4 w-4" />
              </span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-foreground/90">
                Hand-Tufted in Georgia, USA · Ships Nationwide
              </span>
            </div>

            <h1 className="display-xl mt-6">
              Bespoke Tufted Rugs,{" "}
              <em className="text-primary">Carved in 3D Relief.</em>
            </h1>

            <p className="mt-6 max-w-xl text-[clamp(1rem,1.15vw,1.15rem)] leading-relaxed text-muted-foreground">
              Walls have posters. Legends walk on art. We hand-tuft custom sports crests, multi-team mashups, and gaming icons on our vertical frames in Georgia—finished with razor-carved bevels and commercial non-slip felt.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Btn to="/works">Explore Works →</Btn>
              <Btn to="/custom" variant="outline">Custom Commission</Btn>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/80 pt-7">
              <div>
                <p className="font-display text-2xl text-foreground md:text-3xl">16mm Loft</p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                  4-Ply Acrylic & Wool
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-foreground md:text-3xl">3D Carved</p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                  Hand-Sheared V-Grooves
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-primary md:text-3xl">~2 Weeks</p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                  Made to Order in GA
                </p>
              </div>
            </div>
          </div>

          {/* Right Interactive Studio Switcher */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-[0_32px_70px_-20px_rgba(0,0,0,0.65)] md:p-5">
              <Link
                to={`/rug/${current.slug}`}
                className="group relative block aspect-[4/4.4] overflow-hidden rounded-2xl border border-border/70 bg-background"
              >
                <img
                  key={current.slug}
                  src={current.images[0]}
                  alt={current.name}
                  fetchPriority="high"
                  className="fade-in h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5 text-[#f5ead8]">
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#f08a3c]">
                      {current.category} · {current.sizeSpec}
                    </p>
                    <p className="mt-1 font-display text-2xl leading-tight">{current.name}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4 text-[#f08a3c]" />
                  </span>
                </div>
              </Link>

              {/* 4-Rug Interactive Switcher Pills */}
              <div className="mt-4 grid grid-cols-4 gap-2" role="tablist" aria-label="Switch featured hero rug">
                {HERO_SHOWCASE.map((item, idx) => (
                  <button
                    key={item.slug}
                    type="button"
                    role="tab"
                    aria-selected={active === idx}
                    onClick={() => setActive(idx)}
                    className={`group relative overflow-hidden rounded-xl border p-1.5 text-left transition-all ${
                      active === idx
                        ? "border-primary bg-background shadow-sm"
                        : "border-border/60 bg-background/40 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                    <p className="mt-1.5 truncate font-mono text-[0.55rem] uppercase tracking-[0.08em] text-foreground/90">
                      {item.name.split(" ")[0]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CarouselSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card/60 py-16 md:py-24">
      <div className="mx-auto mb-10 flex max-w-[92rem] flex-col justify-between gap-4 px-6 md:flex-row md:items-end md:px-12">
        <div>
          <p className="eyebrow">Interactive 3D Ring</p>
          <h2 className="display-lg mt-2">
            Featured <em className="text-primary">Studio Rugs.</em>
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Drag to rotate our custom builds on desktop or swipe through the 3D deck on mobile. Click any piece to inspect all studio angles.
        </p>
      </div>
      <Carousel3D />
    </section>
  );
}

export function CuratedBento() {
  const featured = [
    PRODUCTS[0]!, // Bears
    PRODUCTS[1]!, // Patriots
    PRODUCTS[6]!, // NY Mashup
    PRODUCTS[4]!, // Eagles
    PRODUCTS[7]!, // 5ft Orioles
    PRODUCTS[3]!, // Ravens
  ];

  return (
    <section className="mx-auto max-w-[92rem] px-6 py-16 md:px-12 md:py-24">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Selected Studio Drops</p>
          <h2 className="display-lg mt-2">
            Built for <em className="text-primary">Collectors.</em>
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Btn to="/works" variant="outline">View All {PRODUCTS.length} Works →</Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {featured.map((p, i) => {
          const wide = i === 0 || i === 3;
          const secondImg = p.images[1] ?? p.images[0];
          return (
            <Reveal
              key={p.slug}
              delay={i * 50}
              className={wide ? "md:col-span-7" : "md:col-span-5"}
            >
              <Link
                to={`/rug/${p.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-4 transition-colors hover:border-primary/60 md:p-5"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-background">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-0"
                  />
                  <img
                    src={secondImg}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-[transform,opacity] duration-700 group-hover:scale-100 group-hover:opacity-100"
                  />
                  <span className="absolute left-3 top-3 rounded-lg border border-border/80 bg-background/90 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary backdrop-blur">
                    {p.category}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-4 px-1">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                      {p.sizeSpec} · {p.images.length} Studio {p.images.length === 1 ? "Angle" : "Angles"}
                    </p>
                    <h3 className="mt-1 font-display text-2xl leading-tight group-hover:text-primary md:text-3xl">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 max-w-xl text-sm text-muted-foreground">
                      {p.short}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background transition-colors group-hover:border-primary group-hover:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function HowCommissionsWork() {
  const steps = [
    {
      title: "Send Your Artwork or Concept",
      desc: "Pick any team crest, multi-team mashup, gaming controller, or custom logo. Choose your exact size (3ft to 5ft+) and backing style.",
      meta: "1:1 Projector Mockup Approval",
      icon: Icon3DSketchFrame,
      delay: "0s",
    },
    {
      title: "Tufted & Razor-Carved in Georgia",
      desc: "We punch heavyweight 4-ply yarn at 2,000 RPM onto stretched monk's cloth, then hand-carve deep V-grooves between every color block.",
      meta: "16mm Cut-Pile + 3D Bevel Shearing",
      icon: Icon3DTuftGun,
      delay: "0.6s",
    },
    {
      title: "Backed & Shipped Ready to Unroll",
      desc: "Locked with commercial synthetic latex, finished with non-slip grey felt or wall-hang D-rings, and shipped nationwide to your door.",
      meta: "Ready in ~2 Weeks · Ships Nationwide",
      icon: Icon3DShippingBox,
      delay: "1.2s",
    },
  ];

  return (
    <section className="border-y border-border bg-card/50 py-16 md:py-24">
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">How Commissions Work</p>
            <h2 className="display-lg mt-2">
              From Your Sketch <em className="text-primary">to 10,000 Loops.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn to="/process" variant="outline">Inside The Tufting Lab →</Btn>
            <Btn to="/custom">Start Custom Rug</Btn>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="flex flex-col justify-between rounded-3xl border border-border bg-background p-7 shadow-sm transition-colors hover:border-primary/50 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Icon3DBoxStage delay={s.delay}>
                    <s.icon />
                  </Icon3DBoxStage>
                  <span className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary">
                    {s.meta}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-2xl leading-snug md:text-3xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CleanCtaBanner() {
  return (
    <section className="mx-auto max-w-[92rem] px-6 py-16 md:px-12 md:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-background to-card p-8 md:p-14">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3">
              <Icon3DBoxStage className="h-10 w-10">
                <Icon3DRazorShears className="h-5 w-5" />
              </Icon3DBoxStage>
              <span className="eyebrow">Open For Custom Commissions</span>
            </div>
            <h2 className="display-lg mt-4">
              Don’t Buy a Factory Mat.{" "}
              <em className="text-primary">Commission a Centerpiece.</em>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Configure your silhouette, size tier, and backing in our interactive Custom Rug Studio, or browse our completed builds for inspiration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Btn to="/custom">Open Custom Rug Builder →</Btn>
            <Btn to="/contact" variant="outline">Contact Studio</Btn>
          </div>
        </div>
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
    <section className="mx-auto max-w-[92rem] px-6 py-16 md:px-12 md:py-24">
      <div className="grid gap-10 md:grid-cols-12">
        <h2 className="display-lg md:col-span-5">
          Why <em className="text-primary">Hand-Tufted</em>
        </h2>
        <div className="md:col-span-6 md:col-start-7">
          {rows.map(([t, d]) => (
            <div key={t} className="border-t border-border py-7">
              <h3 className="font-display text-2xl md:text-3xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
