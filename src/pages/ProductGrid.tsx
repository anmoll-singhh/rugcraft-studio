import { ProductCard } from "@/components/studio/ProductCard";
import { Reveal } from "@/components/studio/Reveal";
import type { Product } from "@/lib/studio";

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={i * 40}>
          <ProductCard p={p} />
        </Reveal>
      ))}
    </div>
  );
}
