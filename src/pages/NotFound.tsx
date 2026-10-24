import { useSeo } from "@/lib/seo";
import { Btn } from "@/components/studio/Buttons";

export default function NotFound() {
  useSeo({ title: "Page not found", description: "This page doesn't exist." });
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="font-display text-[10rem] leading-none text-primary md:text-[14rem]">404</p>
      <h1 className="mt-4 text-4xl md:text-5xl">This piece has slipped away</h1>
      <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3"><Btn to="/">Back home</Btn><Btn to="/shop" variant="outline">Visit the shop</Btn></div>
    </section>
  );
}
