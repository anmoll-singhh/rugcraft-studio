import { Link, useParams } from "react-router-dom";
import { CATEGORIES, COLLECTIONS, PRODUCTS, catFromSlug, catSlug } from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { PageHero } from "./PageHero";
import { ProductGrid } from "./ProductGrid";
import NotFound from "./NotFound";

export default function Collection() {
  const cat = catFromSlug(useParams().category);
  useSeo({
    title: cat ? `${cat} — Custom Handmade Tufted Rugs` : "Collection not found",
    description: cat ? COLLECTIONS[cat].blurb : "",
    image: cat ? COLLECTIONS[cat].image : undefined,
  });
  if (!cat) return <NotFound />;
  return (
    <>
      <PageHero eyebrow="Collection" title={cat}>{COLLECTIONS[cat].blurb}</PageHero>
      <nav aria-label="Collections" className="mx-auto mb-12 flex max-w-[96rem] flex-wrap gap-6 px-6 md:px-12">
        {CATEGORIES.map((c) => <Link key={c} to={`/collections/${catSlug(c)}`} className={`link-underline font-mono text-[0.65rem] uppercase tracking-[0.12em] ${c === cat ? "text-primary" : "text-muted-foreground"}`}>{c}</Link>)}
        <Link to="/shop" className="link-underline font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">All Builds</Link>
      </nav>
      <section className="mx-auto max-w-[96rem] px-6 pb-32 md:px-12"><ProductGrid items={PRODUCTS.filter((p) => p.category === cat)} /></section>
    </>
  );
}
