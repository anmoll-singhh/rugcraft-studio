import { EMAIL_ADDRESS, WA_GENERAL, X_HANDLE, X_URL } from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { Reveal } from "@/components/studio/Reveal";
import { WhatsAppIcon, XLogoIcon } from "@/components/studio/WhatsAppIcon";
import { Gifting, CustomerLove } from "@/components/studio/Sections";
import { PageHero } from "./PageHero";

const CARDS = [
  {
    t: "Email Your Commission Idea",
    d: "Send us your team logo, sketch, or room photo and we’ll reply with size options and a quote.",
    href: WA_GENERAL,
    label: EMAIL_ADDRESS,
    icon: WhatsAppIcon,
  },
  {
    t: "DM Us on X (Twitter)",
    d: "Fastest way to chat directly with the studio, see daily WIP reels, and claim open commission slots.",
    href: X_URL,
    label: X_HANDLE,
    icon: XLogoIcon,
  },
  {
    t: "Custom Multi-Team Mashups",
    d: "Combining two franchises, adding a jersey number, or building a 5ft+ centerpiece? Tell us what you’re dreaming up.",
    href: `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent("Custom Mashup Rug Inquiry")}`,
    label: "Start a 1-of-1 Mashup",
    icon: WhatsAppIcon,
  },
];

export default function Contact() {
  useSeo({
    title: "Contact & Custom Commissions",
    description: "Start a custom rug commission with RugCraft Studio in Georgia, USA via email at rugcraftstudio8@gmail.com or on X @RugCraftStudio.",
  });
  return (
    <>
      <PageHero eyebrow="Direct to the Workshop · Georgia, USA" title="Let's Tuft Your Floor">
        Open for commissions. Reach out by email or X DM, or use the interactive custom rug builder below.
      </PageHero>
      <section className="mx-auto grid max-w-[96rem] gap-px border-y bg-border px-0 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.t} delay={i * 100} className="bg-background">
            <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group block h-full p-8 transition-colors hover:bg-card md:p-12">
              <c.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-8 font-display text-4xl">{c.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
              <p className="link-underline mt-8 inline-block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-primary">{c.label} →</p>
            </a>
          </Reveal>
        ))}
      </section>
      <Gifting />
      <CustomerLove />
    </>
  );
}
