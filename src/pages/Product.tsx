import { useEffect, useState, type MouseEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, Ruler, ZoomIn, ExternalLink } from "lucide-react";
import {
  CARE,
  PRODUCTS,
  RUG_BACKING_OPTIONS,
  RUG_SIZE_OPTIONS,
  catSlug,
  getProduct,
  waProduct,
} from "@/lib/studio";
import { pushRecent, useRecent } from "@/lib/store";
import { useSeo } from "@/lib/seo";
import { WhatsAppIcon, XLogoIcon } from "@/components/studio/WhatsAppIcon";
import { ProductCard, WishButton } from "@/components/studio/ProductCard";
import { SizeGuide } from "@/components/studio/Modal";
import { Icon3DSparkCube, Icon3DYarnCone } from "@/components/studio/Icons3D";
import NotFound from "./NotFound";

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const [loupeEnabled, setLoupeEnabled] = useState(true);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setI(0);
    setZoom(null);
  }, [name]);

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (!loupeEnabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative aspect-[4/4.3] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] ${
          loupeEnabled ? "cursor-zoom-in" : "cursor-default"
        }`}
        onMouseMove={move}
        onMouseLeave={() => setZoom(null)}
        data-cursor={loupeEnabled ? "2.2x Loupe" : undefined}
      >
        <img
          key={i}
          src={images[i]}
          alt={`${name}, studio angle ${i + 1}`}
          fetchPriority="high"
          className="fade-in absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-out"
          style={
            loupeEnabled && zoom
              ? { transform: "scale(2.2)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
              : undefined
          }
        />

        {/* Top Bar Inside Gallery */}
        <div className=" absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="rounded-lg border border-border/80 bg-background/90 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground backdrop-blur">
            Angle {i + 1} of {images.length}
          </span>
          <button
            type="button"
            onClick={() => {
              setLoupeEnabled(!loupeEnabled);
              setZoom(null);
            }}
            aria-pressed={loupeEnabled}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] backdrop-blur transition-colors ${
              loupeEnabled
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background/90 text-foreground hover:border-primary"
            }`}
          >
            <ZoomIn className="h-3.5 w-3.5" />
            {loupeEnabled ? "Loupe Active (2.2x)" : "Enable Loupe"}
          </button>
        </div>

        <span className="pointer-events-none absolute bottom-4 left-4 hidden rounded-lg border border-border/80 bg-background/90 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground backdrop-blur md:block">
          {loupeEnabled
            ? zoom
              ? "Inspecting carved yarn pile"
              : "Hover image to magnify 3D pile"
            : "Click 'Enable Loupe' to magnify pile"}
        </span>
      </div>

      {/* Multi-angle selector strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3" role="tablist" aria-label="Rug studio angles">
          {images.map((src, k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={i === k}
              aria-label={`Show studio angle ${k + 1}`}
              onClick={() => setI(k)}
              className={`group relative aspect-[4/3.6] overflow-hidden rounded-2xl border transition-all ${
                i === k
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border opacity-65 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute bottom-1.5 right-1.5 rounded bg-black/75 px-1.5 py-0.5 font-mono text-[0.55rem] text-[#f5ead8]">
                View {k + 1}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Accordion({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-t border-border py-4">
      <summary className="flex min-h-[40px] cursor-pointer list-none items-center justify-between font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] hover:text-primary">
        {title}
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </details>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const p = getProduct(slug);
  const [size, setSize] = useState<string>("4ft");
  const [backing, setBacking] = useState<string>("Non-Slip Felt");
  const [guide, setGuide] = useState(false);
  const recent = useRecent();

  useEffect(() => {
    document.documentElement.classList.add("has-sticky-bar");
    return () => document.documentElement.classList.remove("has-sticky-bar");
  }, []);

  useEffect(() => {
    if (p) {
      pushRecent(p.slug);
      setSize("4ft");
      setBacking("Non-Slip Felt");
    }
  }, [p?.slug]);

  useSeo({
    title: p ? `${p.name} — Custom Hand-Tufted Rug` : "Build not found",
    description: p ? `${p.short} Hand-tufted to order in Georgia, USA by RugCraft Studio.` : "",
    image: p?.images[0],
  });

  if (!p) return <NotFound />;

  const related = [
    ...PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug),
    ...PRODUCTS.filter((x) => x.category !== p.category),
  ].slice(0, 4);

  const recentItems = recent
    .filter((s) => s !== p.slug)
    .map((s) => getProduct(s))
    .filter(Boolean)
    .slice(0, 4) as typeof PRODUCTS;

  const orderHref = waProduct(p, { size, backing });
  const customizeHref = `/custom?from=${encodeURIComponent(p.slug)}&size=${encodeURIComponent(size)}&backing=${encodeURIComponent(backing)}`;

  return (
    <>
      <section className="mx-auto max-w-[92rem] px-6 pb-20 pt-28 md:px-12 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/works" className="hover:text-primary">Works</Link>
          <span>/</span>
          <Link to={`/works?category=${catSlug(p.category)}`} className="hover:text-primary">{p.category}</Link>
          <span>/</span>
          <span className="text-foreground">{p.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Sticky Multi-Angle Gallery */}
          <div className="lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
            <Gallery images={p.images} name={p.name} />
          </div>

          {/* Right Collectible Spec & Order Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-3.5 py-1">
                <Icon3DYarnCone className="h-4 w-4" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-primary">
                  {p.category}
                </span>
              </div>
              <WishButton slug={p.slug} className="border border-border" />
            </div>

            <h1 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">
              {p.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
                {p.priceLabel}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Original Studio Build: {p.sizeSpec}
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>

            {/* Real X Post Quote Card */}
            {p.postQuote && (
              <div className="mt-6 rounded-2xl border border-border bg-card/80 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-primary">
                    <XLogoIcon className="h-3 w-3" /> @RugCraftStudio Archive
                  </span>
                  {p.postDate && (
                    <span className="font-mono text-[0.6rem] text-muted-foreground">{p.postDate}</span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground/90">
                  “{p.postQuote}”
                </p>
                {p.postUrl && (
                  <a
                    href={p.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary hover:underline"
                  >
                    View Original Post on X <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            )}

            {/* Size Selector */}
            <fieldset className="mt-7">
              <div className="flex items-center justify-between">
                <legend className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground">
                  Select Size — <span className="text-primary">{size}</span>
                </legend>
                <button
                  type="button"
                  onClick={() => setGuide(true)}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.64rem] text-muted-foreground underline underline-offset-4 hover:text-primary"
                >
                  <Ruler className="h-3.5 w-3.5" /> Size Guide
                </button>
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-2">
                {RUG_SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={size === opt}
                    onClick={() => setSize(opt)}
                    className={`rounded-xl border py-2.5 text-center font-mono text-xs transition-all ${
                      size === opt
                        ? "border-primary bg-primary font-semibold text-primary-foreground"
                        : "border-border bg-card/60 hover:border-primary/60"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Backing Selector */}
            <fieldset className="mt-5">
              <legend className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground">
                Backing Option — <span className="text-primary">{backing}</span>
              </legend>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                {RUG_BACKING_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={backing === opt}
                    onClick={() => setBacking(opt)}
                    className={`rounded-xl border px-3.5 py-3 text-left font-mono text-xs transition-all ${
                      backing === opt
                        ? "border-primary bg-primary font-semibold text-primary-foreground"
                        : "border-border bg-card/60 hover:border-primary/60"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Primary & Secondary Action CTAs */}
            <div className="mt-7 flex flex-col gap-3">
              <a href={orderHref} className="btn-gold w-full !min-h-[54px] !text-xs">
                <WhatsAppIcon className="h-4 w-4" /> Order This Exact Rug ({size} · {backing})
              </a>
              <Link to={customizeHref} className="btn-outline w-full !min-h-[50px] !text-xs">
                <Icon3DSparkCube className="h-4 w-4 text-primary" /> Customize This Design
              </Link>
            </div>

            {/* Tactile Specs Table */}
            <div className="mt-8 rounded-2xl border border-border bg-card/60 p-5">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-primary">
                Tactile Studio Specifications
              </p>
              <dl className="mt-3.5 grid grid-cols-2 gap-4 border-t border-border/70 pt-3.5 text-xs">
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase text-muted-foreground">Yarn Weight</dt>
                  <dd className="mt-1 font-medium text-foreground">{p.specs.yarnWeight}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase text-muted-foreground">Pile Height</dt>
                  <dd className="mt-1 font-medium text-foreground">{p.specs.pileHeight}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase text-muted-foreground">Carving Finish</dt>
                  <dd className="mt-1 font-medium text-foreground">{p.specs.carvingFinish}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase text-muted-foreground">Origin</dt>
                  <dd className="mt-1 font-medium text-foreground">{p.specs.origin}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6">
              <Accordion title="Care & Floor Maintenance" open>
                <ul className="list-disc space-y-1.5 pl-4">
                  {CARE.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Turnaround & Nationwide Shipping">
                Each rug is hand-tufted to order in about two weeks in our Georgia workshop and shipped rolled in heavy-duty protective wrap anywhere in the United States.
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rugs */}
      <section className="border-t border-border bg-card/50 py-16 md:py-24">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">More From The Workshop</p>
              <h2 className="display-lg mt-2">
                Related <em className="text-primary">Studio Builds</em>
              </h2>
            </div>
            <Link to="/works" className="link-underline font-mono text-xs uppercase tracking-[0.12em]">
              All Works →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </div>
      </section>

      {recentItems.length > 0 && (
        <section className="mx-auto max-w-[92rem] px-6 py-16 md:px-12">
          <p className="eyebrow mb-6">Recently Inspected</p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {recentItems.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Order Bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base leading-tight">{p.name}</p>
          <p className="font-mono text-[0.62rem] text-primary">
            {size} · {backing}
          </p>
        </div>
        <a href={orderHref} className="btn-gold !min-h-[42px] !px-4 !text-[0.68rem]">
          Order Rug
        </a>
      </div>

      <SizeGuide open={guide} onClose={() => setGuide(false)} />
    </>
  );
}
