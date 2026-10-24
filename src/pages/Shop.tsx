import { ShowcaseGallery100vh } from "@/components/studio/Sections";
import { useSeo } from "@/lib/seo";

export default function Shop() {
  useSeo({
    title: "Works Gallery — All 12 Custom Hand-Tufted Rugs · RugCraft Studio",
    description:
      "Browse all 12 custom handmade tufted rugs by RugCraft Studio in Georgia, USA inside our interactive showcase gallery.",
  });
  return <ShowcaseGallery100vh standalone />;
}
