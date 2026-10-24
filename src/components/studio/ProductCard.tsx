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
      className={`flex h-10 w-10 items-center justify-center rounded-full bg-background/85 backdrop-blur transition-transform hover:scale-110 ${className}`}>
      <Heart className={`h-4 w-4 transition-all ${on ? "scale-110 fill-primary text-primary" : ""}`} />
    </button>
  );
}

function QuickView({ p, open, onClose }: { p: Product; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label={`Quick view: ${p.name}`} wide>
      <div className="grid md:grid-cols-2">
        <img src={p.images[0]} alt={p.name} className="aspect-[4/5] w-full object-cover" />
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="eyebrow">{p.category} · {p.sizeSpec}</p>
          <h2 className="mt-3 font-display text-5xl leading-none">{p.name}</h2>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-primary">{p.priceLabel}</p>
          <p className="mt-5 text-sm text-muted-foreground">{p.description}</p>
          {p.postQuote && (
            <blockquote className="mt-5 border-l-2 border-primary pl-4 text-xs italic text-foreground/80">
              “{p.postQuote}”
              {p.postUrl && (
                <a href={p.postUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 flex items-center gap-1 font-mono text-[0.6rem] not-italic uppercase tracking-[0.12em] text-primary hover:underline">
                  <XLogoIcon className="h-3 w-3" /> View Original X Post <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </blockquote>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waProduct(p)} className="btn-gold"><WhatsAppIcon className="h-4 w-4" /> Commission Similar</a>
            <Link to={`/product/${p.slug}`} onClick={onClose} className="btn-outline">Full Spec Sheet →</Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function ProductCard({ p, index }: { p: Product; index?: number }) {
  const [qv, setQv] = useState(false);
  const secondImg = p.images[1] ?? p.images[0];
  return (
    <article className="group flex flex-col">
      <div className="relative">
        <Link to={`/product/${p.slug}`} data-cursor="Inspect" className="relative block aspect-[4/5] overflow-hidden border border-border/70 bg-card" aria-label={`${p.name}, ${p.sizeSpec}`}>
          <img src={p.images[0]} alt={`${p.name} custom handmade tufted rug by RugCraft Studio`} loading="lazy" decoding="async" width={900} height={1125}
            className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-108 group-hover:opacity-0" />
          <img src={secondImg} alt="" aria-hidden loading="lazy" decoding="async"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100 group-hover:opacity-100" />
          {p.tag && <span className="absolute left-3 top-3 border border-primary/50 bg-background/90 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary backdrop-blur">{p.tag}</span>}
        </Link>
        <WishButton slug={p.slug} className="absolute right-3 top-3" />
        <button onClick={() => setQv(true)} className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 border border-border bg-background/95 py-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] opacity-0 backdrop-blur transition-all duration-500 hover:border-primary hover:text-primary focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <Eye className="h-3.5 w-3.5" /> Quick Inspect
        </button>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] leading-none tracking-tight">
          {index !== undefined && <span className="mr-2 align-top font-mono text-[0.62rem] text-primary">{String(index + 1).padStart(2, "0")}</span>}
          <Link to={`/product/${p.slug}`} className="hover:text-primary">{p.name}</Link>
        </h3>
      </div>
      <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">{p.sizeSpec} · <span className="text-primary">Made to Order</span></p>
      <a href={waProduct(p)} className="mt-3 inline-flex items-center gap-2 self-start font-mono text-[0.62rem] uppercase tracking-[0.12em] text-foreground/80 transition-colors hover:text-primary">
        <WhatsAppIcon className="h-3.5 w-3.5 text-primary" /> Request This Build →
      </a>
      <QuickView p={p} open={qv} onClose={() => setQv(false)} />
    </article>
  );
}
