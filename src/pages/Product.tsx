import { Fragment, useEffect, useState, type MouseEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, Ruler, Sparkles, ExternalLink } from "lucide-react";
import { CARE, MATERIAL_DETAILS, PRODUCTS, X_URL, catSlug, getProduct, waProduct } from "@/lib/studio";
import { pushRecent, useRecent } from "@/lib/store";
import { useSeo } from "@/lib/seo";
import { Btn } from "@/components/studio/Buttons";
import { WhatsAppIcon, XLogoIcon } from "@/components/studio/WhatsAppIcon";
import { ProductCard, WishButton } from "@/components/studio/ProductCard";
import { SizeGuide } from "@/components/studio/Modal";
import { SplitText } from "@/components/studio/Motion";
import NotFound from "./NotFound";

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };
  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      <div className="flex gap-3 md:flex-col" role="tablist" aria-label="Rug views">
        {images.map((src, k) => (
          <button key={k} role="tab" aria-selected={i === k} aria-label={`Show photo ${k + 1}`} onClick={() => setI(k)}
            className={`aspect-[4/5] w-20 overflow-hidden border transition-opacity duration-200 md:w-24 ${i === k ? "border-primary opacity-100" : "border-border opacity-55 hover:opacity-100"}`}>
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden border border-border bg-card" onMouseMove={move} onMouseLeave={() => setZoom(null)} data-cursor="Zoom Pile">
        <img key={i} src={images[i]} alt={`${name}, studio angle ${i + 1}`} fetchPriority="high"
          className="fade-in absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out"
          style={zoom ? { transform: "scale(2.25)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
        <span className="pointer-events-none absolute bottom-3 left-3 hidden border border-border bg-background/90 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] md:block">{zoom ? "Move to inspect carving" : "Hover to inspect yarn pile"}</span>
      </div>
    </div>
  );
}

function Details({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-t py-5">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] hover:text-primary">
        {title}<ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}

export default function ProductPage() {
  const p = getProduct(useParams().slug);
  const [variant, setVariant] = useState<string | undefined>();
  const [customize, setCustomize] = useState(false);
  const [note, setNote] = useState("");
  const [guide, setGuide] = useState(false);
  const recent = useRecent();
  useEffect(() => { document.documentElement.classList.add("has-sticky-bar"); return () => document.documentElement.classList.remove("has-sticky-bar"); }, []);
  useEffect(() => { if (p) { pushRecent(p.slug); setVariant(undefined); setCustomize(false); setNote(""); } }, [p?.slug]);
  useSeo({
    title: p ? `${p.name} — Custom Handmade Tufted Rug` : "Build not found",
    description: p ? `${p.short} Hand-tufted to order in Georgia, USA by RugCraft Studio.` : "",
    image: p?.images[0],
  });
  if (!p) return <NotFound />;
  const related = [...PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug), ...PRODUCTS.filter((x) => x.category !== p.category)].slice(0, 4);
  const recentItems = recent.filter((s) => s !== p.slug).map((s) => getProduct(s)).filter(Boolean).slice(0, 4) as typeof PRODUCTS;
  const href = waProduct(p, { variant, gift: customize ? note || "Custom color / text adjustment requested" : undefined });

  return (
    <>
      <section className="mx-auto max-w-[96rem] px-6 pb-24 pt-28 md:px-12 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to={`/collections/${catSlug(p.category)}`} className="hover:text-primary">{p.category}</Link> / <span className="text-foreground">{p.name}</span>
        </nav>
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7"><Gallery images={p.images} name={p.name} /></div>
          <div className="md:sticky md:top-28 md:col-span-5 md:self-start">
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow">{p.tag ?? p.category} · Georgia Studio Build</p>
              <WishButton slug={p.slug} className="border" />
            </div>
            <h1 className="mt-3 text-[clamp(2.8rem,5vw,5rem)] leading-[0.9]"><SplitText key={p.slug} text={p.name} /></h1>
            <p className="mt-4 font-mono text-sm uppercase tracking-[0.14em] text-primary">{p.priceLabel} · {p.sizeSpec}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">Hand-tufted in Georgia, USA · Ready in ~2 weeks · Ships nationwide</p>
            <p className="mt-6 max-w-md text-muted-foreground">{p.description}</p>

            {p.postQuote && (
              <blockquote className="mt-6 border-l-2 border-primary bg-card/70 p-4 text-xs italic text-foreground/85">
                “{p.postQuote}”
                {p.postUrl && (
                  <a href={p.postUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1.5 font-mono text-[0.6rem] not-italic uppercase tracking-[0.12em] text-primary hover:underline">
                    <XLogoIcon className="h-3 w-3" /> Seen on @RugCraftStudio <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </blockquote>
            )}

            {p.variants && (
              <fieldset className="mt-7">
                <div className="flex items-center justify-between">
                  <legend className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em]">{p.variants.label}{variant && <span className="text-primary"> — {variant}</span>}</legend>
                  <button type="button" onClick={() => setGuide(true)} className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs text-muted-foreground underline underline-offset-4 hover:text-primary"><Ruler className="h-3.5 w-3.5" /> Size & Backing Guide</button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {p.variants.options.map((o) => (
                    <button key={o} type="button" aria-pressed={variant === o} onClick={() => setVariant(o)}
                      className={`border px-3 py-2.5 text-left font-mono text-xs transition-colors duration-200 ${variant === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{o}</button>
                  ))}
                </div>
              </fieldset>
            )}
            <div className="mt-6 border-t pt-5">
              <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm">
                <input type="checkbox" checked={customize} onChange={(e) => setCustomize(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
                <Sparkles className="h-4 w-4 text-primary" /> Customize colors, player number, or mashup details
              </label>
              {customize && <textarea value={note} onChange={(e) => setNote(e.target.value.slice(0, 240))} rows={3} placeholder="e.g., Swap background to midnight black, add #12 on the border, or make it wall-hang ready..." aria-label="Custom instructions"
                className="fade-in mt-3 w-full resize-none border bg-card p-4 text-sm outline-none focus:border-primary" />}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Btn href={href} className="flex-1 !min-h-[54px]"><WhatsAppIcon className="h-4 w-4" /> Commission via Email</Btn>
              <Btn href={X_URL} variant="outline" className="!min-h-[54px]"><XLogoIcon className="h-4 w-4" /> DM on X</Btn>
            </div>
            <p className="mt-3 text-center font-mono text-[0.65rem] text-muted-foreground">Direct to the maker in Georgia · No middleman markups</p>
            <div className="mt-10">
              <Details title="Materials & Tufting Specs" open>
                <dl className="grid grid-cols-[7.5rem_1fr] gap-y-2.5">{MATERIAL_DETAILS.map(([k, v]) => <Fragment key={k}><dt className="font-mono text-xs uppercase text-primary">{k}</dt><dd>{v}</dd></Fragment>)}</dl>
              </Details>
              <Details title="Care & Floor Maintenance"><ul className="list-disc space-y-1.5 pl-4">{CARE.map((c) => <li key={c}>{c}</li>)}</ul></Details>
              <Details title="Turnaround & Nationwide Shipping">Each rug is made to order in about two weeks. Shipped rolled in heavy-duty protective wrap anywhere in the United States.</Details>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t bg-card py-24 md:py-32">
        <div className="mx-auto max-w-[96rem] px-6 md:px-12">
          <h2 className="display-lg mb-14">More <em className="text-primary">Studio Builds</em></h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{related.map((r, i) => <ProductCard key={r.slug} p={r} index={i} />)}</div>
        </div>
      </section>
      {recentItems.length > 0 && (
        <section className="mx-auto max-w-[96rem] px-6 py-20 md:px-12">
          <p className="eyebrow mb-8">Recently Inspected</p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{recentItems.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      )}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <div className="min-w-0 flex-1"><p className="truncate font-display text-xl leading-tight">{p.name}</p><p className="font-mono text-[0.65rem] text-primary">{variant || p.sizeSpec}</p></div>
        <a href={href} className="btn-gold !px-5"><span className="relative z-10 inline-flex items-center gap-2"><WhatsAppIcon className="h-4 w-4" /> Commission</span></a>
      </div>
      <SizeGuide open={guide} onClose={() => setGuide(false)} />
    </>
  );
}
