import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ExternalLink } from "lucide-react";
import { waProduct, type Product } from "@/lib/studio";
import { toggleWish, useWishlist } from "@/lib/store";
import { WhatsAppIcon, XLogoIcon } from "./WhatsAppIcon";
import { Modal } from "./Modal";

export function WishButton({ slug, className = "" }: { slug: string; className?: string }) {
  const on = useWishlist().includes(slug);
  return (
    <button onClick={(e) => { e.preventDefault(); toggleWish(slug); }} aria-pressed={on} aria-label={on ? "Remove from saved builds" : "Save build"}
      className={`flex h-9 w-9 items-center justify-center rounded-lg bg-background/85 backdrop-blur transition-transform hover:scale-105 ${className}`}>
      <Heart className={`h-4 w-4 transition-all ${on ? "scale-110 fill-primary text-primary" : ""}`} />
    </button>
  );
}

function QuickView({ p, open, onClose }: { p: Product; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label={`Quick view: ${p.name}`} wide>
      <div className="grid md:grid-cols-2">
        <img src={p.images[0]} alt={p.name} className="aspect-[4/5] w-full object-cover" />
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="eyebrow">{p.category} · {p.sizeSpec}</p>
          <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl">{p.name}</h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-primary">{p.priceLabel}</p>
          <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>
          {p.postQuote && (
            <blockquote className="mt-5 rounded-xl border border-border bg-card/70 p-4 text-xs text-foreground/85">
              “{p.postQuote}”
              {p.postUrl && (
                <a href={p.postUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary hover:underline">
                  <XLogoIcon className="h-3 w-3" /> Original Post on X <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </blockquote>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={`/rug/${p.slug}`} onClick={onClose} className="btn-gold">Open Drop Page →</Link>
            <a href={waProduct(p)} className="btn-outline"><WhatsAppIcon className="h-4 w-4" /> Order Exact Build</a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ProductCard({ p }: { p: Product; index?: number }) {
  const [qv, setQv] = useState(false);
  const secondImg = p.images[1] ?? p.images[0];
  return (
    <article className="group flex flex-col">
      <div className="relative">
        <Link to={`/rug/${p.slug}`} data-cursor="Inspect" className="relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border/80 bg-card" aria-label={`${p.name}, ${p.sizeSpec}`}>
          <img src={p.images[0]} alt={`${p.name} custom handmade tufted rug by RugCraft Studio`} loading="lazy" decoding="async" width={900} height={1125}
            className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 group-hover:opacity-0" />
          <img src={secondImg} alt="" aria-hidden loading="lazy" decoding="async"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100 group-hover:opacity-100" />
          {p.tag && (
            <span className="absolute left-3 top-3 rounded-md border border-primary/40 bg-background/90 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary backdrop-blur">
              {p.tag}
            </span>
          )}
        </Link>
        <WishButton slug={p.slug} className="absolute right-3 top-3" />
        <button
          type="button"
          onClick={() => setQv(true)}
          className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-lg border border-border bg-background/95 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] opacity-0 backdrop-blur transition-all duration-300 hover:border-primary hover:text-primary focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" /> Quick Preview
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-primary">{p.category}</p>
          <h3 className="mt-1 font-display text-xl leading-snug tracking-tight">
            <Link to={`/rug/${p.slug}`} className="hover:text-primary">{p.name}</Link>
          </h3>
        </div>
      </div>
      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">
        {p.sizeSpec} · {p.images.length} {p.images.length === 1 ? "Photo" : "Angles"}
      </p>
      <div className="mt-3 flex items-center gap-4">
        <Link to={`/rug/${p.slug}`} className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.12em] text-foreground/90 transition-colors hover:text-primary">
          Inspect & Order →
        </Link>
        <Link to={`/custom?from=${p.slug}`} className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary">
          Customize
        </Link>
      </div>
      <QuickView p={p} open={qv} onClose={() => setQv(false)} />
    </article>
  );
}
