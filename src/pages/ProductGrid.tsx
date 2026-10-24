import { ProductCard } from "@/components/studio/ProductCard";
import type { Product } from "@/lib/studio";

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
      {items.map((p, i) => (
        <div key={p.slug} className="fade-in" style={{ animationDelay: `${Math.min(i, 7) * 60}ms`, animationFillMode: "both" }}>
          <ProductCard p={p} index={i} />
        </div>
      ))}
    </div>
  );
}
