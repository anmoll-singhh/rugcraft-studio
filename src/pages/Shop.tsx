import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CATEGORIES, PRODUCTS, catFromSlug, catSlug } from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { PageHero } from "./PageHero";
import { ProductGrid } from "./ProductGrid";

const SORTS = {
  featured: "Featured Drops",
  "price-asc": "Size Tier: Small to XL",
  "price-desc": "Size Tier: XL to Small",
  name: "Name A–Z",
} as const;
type SortKey = keyof typeof SORTS;

export default function Shop() {
  useSeo({
    title: "Works Gallery — Custom Hand-Tufted Rugs · RugCraft Studio",
    description:
      "Browse all 12 custom handmade tufted rugs by RugCraft Studio in Georgia, USA: NFL & MLB team builds, multi-team mashups, and gaming controller rugs.",
  });
  const [params, setParams] = useSearchParams();
  const cat = catFromSlug(params.get("category") ?? undefined);
  const sort = (params.get("sort") as SortKey) in SORTS ? (params.get("sort") as SortKey) : "featured";
  const items = useMemo(() => {
    const list = cat ? PRODUCTS.filter((p) => p.category === cat) : [...PRODUCTS];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [cat, sort]);

  const update = (k: string, v?: string) => {
    const n = new URLSearchParams(params);
    if (v) n.set(k, v);
    else n.delete(k);
    setParams(n, { replace: true });
  };

  return (
    <>
      <PageHero eyebrow="Studio Archive & Works" title="Custom Tufted Builds">
        Every piece below was hand-tufted, latex-backed, and razor-carved in our Georgia workshop. Click any rug to inspect its multi-angle photos, order the exact build, or customize it in your size.
      </PageHero>
      <section className="mx-auto max-w-[92rem] px-6 pb-28 md:px-12">
        <div className="sticky top-[68px] z-20 -mx-6 mb-10 flex flex-col gap-4 border-y border-border bg-background/92 px-6 py-4 backdrop-blur md:-mx-12 md:flex-row md:items-center md:justify-between md:px-12">
          <div role="group" aria-label="Filter by category" className="no-scrollbar flex gap-2 overflow-x-auto">
            {[undefined, ...CATEGORIES].map((c) => (
              <button
                key={c ?? "all"}
                type="button"
                onClick={() => update("category", c && catSlug(c))}
                aria-pressed={cat === c}
                className={`shrink-0 rounded-lg border px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors ${
                  cat === c
                    ? "border-primary bg-primary font-semibold text-primary-foreground"
                    : "border-border bg-card/60 hover:border-primary hover:text-primary"
                }`}
              >
                {c ?? "All Works"}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
              Sort
              <select
                value={sort}
                onChange={(e) => update("sort", e.target.value === "featured" ? undefined : e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 font-sans text-xs normal-case tracking-normal text-foreground"
              >
                {Object.entries(SORTS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <Link to="/custom" className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-primary hover:underline">
              + Custom Idea
            </Link>
          </div>
        </div>
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground" aria-live="polite">
          Showing {items.length} {items.length === 1 ? "studio build" : "studio builds"}
        </p>
        <ProductGrid items={items} />
      </section>
    </>
  );
}
