import { IMAGES } from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { Reveal } from "@/components/studio/Reveal";
import { Btn } from "@/components/studio/Buttons";
import { WhySilver } from "@/components/studio/Sections";
import { PageHero } from "./PageHero";

export default function About() {
  useSeo({
    title: "Inside The Studio · Georgia, USA",
    description: "RugCraft Studio crafts one-of-a-kind hand-tufted sports, gaming, and custom logo rugs in Georgia, USA.",
  });
  return (
    <>
      <PageHero eyebrow="About RugCraft Studio · Georgia, USA" title="Hand-Tufted For Die-Hard Fans">
        We started RugCraft Studio with one obsession: turning the teams, crests, and icons you live for into heavyweight 3D floor art that outclasses any poster on the wall.
      </PageHero>
      <section className="mx-auto grid max-w-[92rem] gap-10 px-6 md:grid-cols-12 md:px-12">
        <Reveal className="md:col-span-7">
          <img src={IMAGES.patriotsDesk} alt="New England Patriots custom tufted rug on studio workbench with yarn cones" loading="lazy" width={1200} height={900} className="aspect-[16/11] w-full rounded-3xl border border-border object-cover" />
        </Reveal>
        <Reveal delay={120} className="space-y-5 text-muted-foreground md:col-span-4 md:col-start-9 md:self-end">
          <p className="font-display text-3xl leading-snug text-foreground">From 1:1 projector sketch to razor-carved velvet relief.</p>
          <p className="text-sm leading-relaxed">Every rug we ship is stretched, tufted at 2,000 RPM, latex-locked, backed with heavy non-slip grey felt, and hand-sheared in our Georgia workshop.</p>
          <p className="text-sm leading-relaxed">Because you order directly from the maker via email or X DM, we can customize every inch—from multi-team mashups to exact yarn color matches.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Btn to="/custom">Start Custom Commission</Btn>
            <Btn to="/works" variant="outline">Browse Works</Btn>
          </div>
        </Reveal>
      </section>
      <WhySilver />
    </>
  );
}
