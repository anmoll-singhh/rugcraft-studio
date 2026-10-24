import { useState } from "react";
import { Link } from "react-router-dom";
import { waProduct, type Product } from "@/lib/studio";
import { toggleWish, useWishlist } from "@/lib/store";
import { Modal } from "./Modal";

export function WishButton({ slug, className = "" }: { slug: string; className?: string }) {
  const on = useWishlist().includes(slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggleWish(slug);
      }}
      aria-pressed={on}
      aria-label={on ? "Remove from saved builds" : "Save build"}
      className={`border border-border bg-background px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] transition-colors hover:border-primary ${
        on ? "text-primary" : "text-foreground/80"
      } ${className}`}
    >
      {on ? "Saved" : "Save"}
    </button>
  );
}

function QuickView({ p, open, onClose }: { p: Product; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label={`Quick view: ${p.name}`} wide>
      <div className="grid md:grid-cols-2">
        <img src={p.images[0]} alt={p.name} className="aspect-[4/5] w-full object-cover" />
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="eyebrow">
            {p.category} · {p.sizeSpec}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight">{p.name}</h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-primary">{p.priceLabel}</p>
          <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={`/rug/${p.slug}`} onClick={onClose} className="btn-gold">
              Open Drop Page →
            </Link>
            <a href={waProduct(p)} className="btn-outline">
              Order Exact Build
            </a>
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
    <article className="group flex flex-col border border-border bg-card">
      <div className="relative">
        <Link
          to={`/rug/${p.slug}`}
          className="relative block aspect-[4/4.4] overflow-hidden border-b border-border bg-background"
          aria-label={`${p.name}, ${p.sizeSpec}`}
        >
          <img
            src={p.images[0]}
            alt={`${p.name} custom handmade tufted rug by RugCraft Studio`}
            loading="lazy"
            decoding="async"
            width={900}
            height={1125}
            className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-105 group-hover:opacity-0"
          />
          <img
            src={secondImg}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-[transform,opacity] duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
          {p.tag && (
            <span className="absolute left-3 top-3 border border-border bg-background px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-primary">
              {p.tag}
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={() => setQv(true)}
          className="absolute inset-x-3 bottom-3 border border-border bg-background py-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] opacity-0 transition-opacity duration-200 hover:border-primary hover:text-primary focus:opacity-100 group-hover:opacity-100"
        >
          Quick Preview
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-primary">{p.category}</p>
          <h3 className="mt-1 font-display text-lg font-bold leading-snug">
            <Link to={`/rug/${p.slug}`} className="hover:text-primary">
              {p.name}
            </Link>
          </h3>
          <p className="mt-1 font-mono text-[0.62rem] text-muted-foreground">
            {p.sizeSpec} · {p.images.length} {p.images.length === 1 ? "Angle" : "Angles"}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <Link
            to={`/rug/${p.slug}`}
            className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] text-foreground hover:text-primary"
          >
            Inspect Rug →
          </Link>
          <Link
            to={`/custom?from=${p.slug}`}
            className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-muted-foreground hover:text-primary"
          >
            Customize
          </Link>
        </div>
      </div>
      <QuickView p={p} open={qv} onClose={() => setQv(false)} />
    </article>
  );
}
