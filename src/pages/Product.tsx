import { useEffect, useState, type MouseEvent } from "react";
import { Link, useParams } from "react-router-dom";
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
import { ProductCard } from "@/components/studio/ProductCard";
import { SizeGuide } from "@/components/studio/Modal";
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
    <div className="space-y-3">
      <div
        className={`relative aspect-[4/4.2] w-full overflow-hidden border border-border bg-card ${
          loupeEnabled ? "cursor-zoom-in" : "cursor-default"
        }`}
        onMouseMove={move}
        onMouseLeave={() => setZoom(null)}
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

        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="border border-border bg-background px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground">
            Angle {i + 1} of {images.length}
          </span>
          <button
            type="button"
            onClick={() => {
              setLoupeEnabled(!loupeEnabled);
              setZoom(null);
            }}
            aria-pressed={loupeEnabled}
            className={`border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors ${
              loupeEnabled
                ? "border-primary bg-primary font-semibold text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary"
            }`}
          >
            {loupeEnabled ? "Loupe Active (2.2x)" : "Enable Loupe"}
          </button>
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5" role="tablist" aria-label="Rug studio angles">
          {images.map((src, k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={i === k}
              aria-label={`Show studio angle ${k + 1}`}
              onClick={() => setI(k)}
              className={`relative aspect-[4/3.4] overflow-hidden border transition-opacity ${
                i === k
                  ? "border-primary opacity-100"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute bottom-1 right-1 bg-[#0E0D0C] px-1.5 py-0.5 font-mono text-[0.55rem] text-[#F4EFE6]">
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
      <summary className="flex min-h-[38px] cursor-pointer list-none items-center justify-between font-mono text-xs font-medium uppercase tracking-[0.1em] hover:text-primary">
        {title}
        <span className="text-base group-open:rotate-180" aria-hidden>▾</span>
      </summary>
      <div className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{children}</div>
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
      <section className="mx-auto max-w-[92rem] px-6 pb-20 pt-28 md:px-12 md:pt-32">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/works" className="hover:text-primary">Works</Link>
          <span>/</span>
          <Link to={`/works?category=${catSlug(p.category)}`} className="hover:text-primary">{p.category}</Link>
          <span>/</span>
          <span className="text-foreground">{p.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
            <Gallery images={p.images} name={p.name} />
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow">{p.category} · {p.sizeSpec}</p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">
              {p.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="border border-primary bg-card px-3 py-1 font-mono text-xs font-semibold text-primary">
                {p.priceLabel}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Made to Order in Georgia, USA
              </span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {p.description}
            </p>

            {p.postQuote && (
              <div className="mt-6 border border-border bg-card p-4">
                <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.1em] text-primary">
                  <span>@RugCraftStudio Archive</span>
                  {p.postDate && <span className="text-muted-foreground">{p.postDate}</span>}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground/90">
                  “{p.postQuote}”
                </p>
                {p.postUrl && (
                  <a
                    href={p.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-mono text-[0.6rem] uppercase tracking-[0.1em] text-primary underline"
                  >
                    View Original Post on X →
                  </a>
                )}
              </div>
            )}

            <fieldset className="mt-6">
              <div className="flex items-center justify-between">
                <legend className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-foreground">
                  Select Size — <span className="text-primary">{size}</span>
                </legend>
                <button
                  type="button"
                  onClick={() => setGuide(true)}
                  className="font-mono text-xs text-muted-foreground underline hover:text-primary"
                >
                  Size Guide
                </button>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {RUG_SIZE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={size === opt}
                    onClick={() => setSize(opt)}
                    className={`border py-2.5 text-center font-mono text-xs transition-colors ${
                      size === opt
                        ? "border-primary bg-primary font-semibold text-primary-foreground"
                        : "border-border bg-card hover:border-primary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-foreground">
                Backing Option — <span className="text-primary">{backing}</span>
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {RUG_BACKING_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={backing === opt}
                    onClick={() => setBacking(opt)}
                    className={`border px-3 py-2.5 text-left font-mono text-xs transition-colors ${
                      backing === opt
                        ? "border-primary bg-primary font-semibold text-primary-foreground"
                        : "border-border bg-card hover:border-primary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 flex flex-col gap-2.5">
              <a href={orderHref} className="btn-gold w-full !min-h-[50px]">
                Order This Exact Rug ({size} · {backing}) →
              </a>
              <Link to={customizeHref} className="btn-outline w-full !min-h-[46px]">
                Customize This Design in Wizard
              </Link>
            </div>

            <div className="mt-7 border border-border bg-card p-5">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
                Studio Specifications
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-4 border-t border-border pt-3 text-xs">
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

      <section className="border-t border-border bg-card py-14 md:py-20">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="eyebrow">More From The Workshop</p>
              <h2 className="display-lg mt-1">Related Studio Builds</h2>
            </div>
            <Link to="/works" className="link-underline font-mono text-xs uppercase tracking-[0.1em]">
              All Works →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </div>
      </section>

      {recentItems.length > 0 && (
        <section className="mx-auto max-w-[92rem] px-6 py-14 md:px-12">
          <p className="eyebrow mb-6">Recently Inspected</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentItems.map((r) => (
              <ProductCard key={r.slug} p={r} />
            ))}
          </div>
        </section>
      )}

      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background px-4 py-3 md:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-bold leading-tight">{p.name}</p>
          <p className="font-mono text-[0.62rem] text-primary">
            {size} · {backing}
          </p>
        </div>
        <a href={orderHref} className="btn-gold !min-h-[40px] !px-4 !text-xs">
          Order Rug
        </a>
      </div>

      <SizeGuide open={guide} onClose={() => setGuide(false)} />
    </>
  );
}
