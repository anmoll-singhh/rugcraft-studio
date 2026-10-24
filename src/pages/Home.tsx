import {
  Hero,
  CarouselSection,
  CustomRequestSection,
  ShowcaseGallery100vh,
  AboutUsCtaSection,
} from "@/components/studio/Sections";
import { useSeo } from "@/lib/seo";

export default function Home() {
  useSeo({
    title: "RugCraft Studio — Bespoke Hand-Tufted Rugs · Georgia, USA",
    description:
      "One-of-a-kind hand-tufted rugs for game-day superfans and collectors. Made to order in Georgia, USA with cut-pile precision and razor-carved 3D edges.",
  });
  return (
    <>
      <Hero />
      <CarouselSection />
      <CustomRequestSection />
      <ShowcaseGallery100vh />
      <AboutUsCtaSection />
    </>
  );
}
