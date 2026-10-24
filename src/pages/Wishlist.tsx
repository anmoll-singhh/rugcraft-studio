import { PRODUCTS, waLink } from "@/lib/studio";
import { useWishlist } from "@/lib/store";
import { useSeo } from "@/lib/seo";
import { Btn } from "@/components/studio/Buttons";
import { WhatsAppIcon } from "@/components/studio/WhatsAppIcon";
import { PageHero } from "./PageHero";
import { ProductGrid } from "./ProductGrid";

export default function Wishlist() {
  useSeo({ title: "Saved Rug Builds", description: "The RugCraft Studio custom builds you’ve bookmarked." });
  const items = PRODUCTS.filter((p) => useWishlist().includes(p.slug));
  const msg = `Hi RugCraft Studio! 🧶🔥\n\nI bookmarked these builds on your site and would love to inquire about commissioning one:\n${items.map((p) => `• ${p.name} (${p.sizeSpec})`).join("\n")}\n\nLet me know pricing and availability!`;
  return (
    <>
      <PageHero eyebrow="Saved Builds" title={items.length ? "Your Rug Shortlist" : "No Builds Saved Yet"}>
        {items.length ? `${items.length} build${items.length > 1 ? "s" : ""} saved on this device. Send your shortlist to our Georgia studio in one click.` : "Tap the heart icon on any rug build to save it here for reference."}
      </PageHero>
      <section className="mx-auto max-w-[96rem] px-6 pb-32 md:px-12">
        {items.length ? <><div className="mb-12"><Btn href={waLink(msg, "Saved Rug Builds Inquiry")}><WhatsAppIcon className="h-4 w-4" /> Email My Shortlist</Btn></div><ProductGrid items={items} /></> : <Btn to="/shop">Explore Recent Builds</Btn>}
      </section>
    </>
  );
}
