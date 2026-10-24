import { Hero, Manifesto, CarouselSection, HorizontalCollections, Editorial, Bestsellers, Story, CustomerLove, Gifting, InstagramStrip } from "@/components/studio/Sections";
import { Marquee } from "@/components/studio/Motion";
import { useSeo } from "@/lib/seo";

export default function Home({ ready }: { ready: boolean }) {
  useSeo({
    title: "RugCraft Studio — Your Team. Your Rug. Custom Handmade Tufted Rugs",
    description: "One-of-a-kind tufted rugs for game-day superfans. Hand-tufted in Georgia, USA with cut-pile precision and razor-carved 3D edges. Sports, Gaming, Logos & Custom Mashups.",
  });
  return (
    <>
      <Hero ready={ready} />
      <Marquee
        items={[
          "Sports · Gaming · Logos · Pets · Anything You Can Dream Up",
          "Hand-Tufted in Georgia, USA",
          "Cut-Pile Precision · Razor-Carved 3D Edges",
          "Ships Nationwide Across the USA",
          "Open for Custom Commissions",
        ]}
        className="border-b bg-background py-5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-primary"
        speed={38}
      />
      <Manifesto />
      <CarouselSection />
      <HorizontalCollections />
      <Editorial />
      <Bestsellers />
      <Gifting />
      <Story />
      <CustomerLove />
      <InstagramStrip />
    </>
  );
}
