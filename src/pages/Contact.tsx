import { EMAIL_ADDRESS, WA_GENERAL, X_HANDLE, X_URL } from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { Btn } from "@/components/studio/Buttons";
import { PageHero } from "./PageHero";

const CARDS = [
  {
    t: "Email Your Commission Idea",
    d: "Send us your team logo, sketch, or room photo and we will reply with size options and a quote.",
    href: WA_GENERAL,
    label: EMAIL_ADDRESS,
  },
  {
    t: "Message Us on X",
    d: "Direct line to the studio—check out daily work-in-progress reels and claim open commission slots.",
    href: X_URL,
    label: X_HANDLE,
  },
  {
    t: "Nationwide US Shipping",
    d: "Every rug is hand-tufted in Georgia in ~2 weeks and shipped rolled in heavy-duty protective wrap.",
    href: "/custom",
    label: "Open 4-Step Commission Wizard",
  },
];

export default function Contact() {
  useSeo({
    title: "Contact Studio — RugCraft Studio · Georgia, USA",
    description:
      "Start a custom rug commission with RugCraft Studio in Georgia, USA via email at rugcraftstudio8@gmail.com or on X @RugCraftStudio.",
  });
  return (
    <>
      <PageHero eyebrow="Direct to the Workshop · Georgia, USA" title="Contact RugCraft Studio">
        Open for custom commissions. Reach out directly by email or X DM, or configure your exact rug spec sheet in our 4-Step Commission Wizard.
      </PageHero>
      <section className="mx-auto max-w-[92rem] px-6 pb-20 md:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <a
              key={c.t}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-border bg-card p-8 transition-colors hover:border-primary"
            >
              <div>
                <h2 className="font-display text-2xl font-bold leading-snug">{c.t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
              <p className="link-underline mt-8 inline-block font-mono text-xs uppercase tracking-[0.1em] text-primary">
                {c.label} →
              </p>
            </a>
          ))}
        </div>

        <div className="mt-10 border border-border bg-card p-8 md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="eyebrow">Ready to Build Yours?</p>
              <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                Launch the 4-Step Commission Wizard
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Pick your silhouette, size tier, backing, and color direction in under a minute.
              </p>
            </div>
            <Btn to="/custom">Start Custom Request →</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
