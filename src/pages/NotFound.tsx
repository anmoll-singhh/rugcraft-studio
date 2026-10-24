import { useSeo } from "@/lib/seo";
import { Btn } from "@/components/studio/Buttons";

export default function NotFound() {
  useSeo({ title: "Page not found", description: "This page doesn't exist." });
  return (
    <section className="mx-auto flex min-h-[75vh] max-w-3xl flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="font-display text-[8rem] leading-none text-primary md:text-[11rem]">404</p>
      <h1 className="mt-4 font-display text-3xl md:text-5xl">This build could not be found</h1>
      <p className="mt-3 text-muted-foreground">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Btn to="/">Back Home</Btn>
        <Btn to="/works" variant="outline">Browse Works</Btn>
      </div>
    </section>
  );
}
