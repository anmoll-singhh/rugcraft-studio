import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  EMAIL_ADDRESS,
  IMAGES,
  X_HANDLE,
  X_URL,
  getProduct,
  mailtoLink,
} from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { lenis } from "@/components/studio/Motion";
import { prefersReduced } from "@/lib/store";

const SHAPE_CARDS = [
  {
    id: "Die-Cut Silhouette",
    desc: "Cut to the exact jagged contour of your team logo, mascot, or character.",
    img: IMAGES.patriotsDesk,
    sample: "e.g., Patriots Flying Elvis, Brewers Mitt",
  },
  {
    id: "Classic Round Medallion",
    desc: "Circular stadium emblem framed by bold arched block typography.",
    img: IMAGES.bearsFull,
    sample: "e.g., Chicago Bears, Philly Eagles",
  },
  {
    id: "Pro Oval Crest",
    desc: "Balanced oval proportions built for entryways, desks, and fan caves.",
    img: IMAGES.packersOval,
    sample: "e.g., Green Bay 'G' Oval",
  },
  {
    id: "Custom Mashup / Runner",
    desc: "Fuse multiple teams, city icons, or 5ft+ oversized floor runners.",
    img: IMAGES.nyMashup,
    sample: "e.g., NY Giants × Yankees Mashup",
  },
];

const SIZE_CARDS = [
  {
    id: "Small · 2.5ft",
    title: "Desk & Doorway Sidekick",
    desc: "Ideal under a desk chair, in front of a doorway, or hung on the wall.",
    quote: "Custom Quote",
  },
  {
    id: "Medium · 3.5ft",
    title: "Fan Cave Standard",
    desc: "Our most popular size for bedrooms, gaming setups, and collector corners.",
    quote: "Most Popular",
  },
  {
    id: "Large · 4.5ft",
    title: "Game Room Centerpiece",
    desc: "Commanding footprint in front of a sofa, media console, or sneaker wall.",
    quote: "Custom Quote",
  },
  {
    id: "XL Trophy · 5.5ft+",
    title: "Full Room Statement",
    desc: "Oversized custom stadium crest or multi-team mashup built to anchor the room.",
    quote: "XL Custom Spec",
  },
];

const BACKING_CARDS = [
  {
    id: "Non-Slip Grey Felt Floor Backing",
    desc: "Commercial synthetic latex lock with thick non-slip felt for hardwood, tile, or carpet.",
  },
  {
    id: "Wall-Mount D-Rings + Felt Backing",
    desc: "Includes heavy-duty brass D-rings stitched into the backing so you can hang it like 3D art.",
  },
];

const PILE_OPTIONS = [
  "16mm Cut-Pile + 3D Razor Carve",
  "High-Low Sculpted Relief Pile",
];

const STEPS = [
  { num: 1, label: "Rug Shape" },
  { num: 2, label: "Size & Backing" },
  { num: 3, label: "Artwork & Colors" },
  { num: 4, label: "Review & Send" },
];

export default function Custom() {
  useSeo({
    title: "Custom Rug Commission Wizard — RugCraft Studio",
    description:
      "Configure your custom hand-tufted rug in 4 simple steps. Pick your shape, size tier, backing, and artwork—made to order in Georgia, USA.",
  });

  const [params] = useSearchParams();
  const baseProduct = getProduct(params.get("from") ?? undefined);

  const [step, setStep] = useState<number>(1);
  const [shape, setShape] = useState(SHAPE_CARDS[0]!.id);
  const [size, setSize] = useState<string>(params.get("size") || SIZE_CARDS[1]!.id);
  const [backing, setBacking] = useState<string>(params.get("backing") || BACKING_CARDS[0]!.id);
  const [pile, setPile] = useState(PILE_OPTIONS[0]!);
  const [idea, setIdea] = useState(baseProduct ? `Custom version of ${baseProduct.name}` : "");
  const [colors, setColors] = useState("");
  const [refUrl, setRefUrl] = useState("");
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);
  const formTop = useRef<HTMLElement>(null);
  const skipFirstScroll = useRef(true);

  useEffect(() => {
    if (baseProduct) {
      setIdea(`Custom version of ${baseProduct.name}`);
    }
  }, [baseProduct]);

  useEffect(() => {
    if (skipFirstScroll.current) {
      skipFirstScroll.current = false;
      return;
    }
    const el = formTop.current;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, immediate: prefersReduced(), duration: 0.7 });
    else el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
  }, [step]);

  const specLines = [
    `Hi RugCraft Studio,`,
    ``,
    `I completed the 4-Step Commission Wizard on your website and would like a quote:`,
    ``,
    `1. Shape: ${shape}`,
    `2. Size Tier: ${size}`,
    `3. Backing: ${backing}`,
    `4. Pile & Carving: ${pile}`,
    `5. Design / Concept: ${idea.trim() || "Custom Team / Logo / Gaming Build"}`,
    baseProduct ? `6. Reference Drop: ${baseProduct.name}` : null,
    `7. Preferred Yarn Colors: ${colors.trim() || "Authentic team / studio recommendation"}`,
    refUrl.trim() ? `8. Reference Image Link: ${refUrl.trim()}` : null,
    name.trim() ? `9. Name & Target Date: ${name.trim()}` : null,
    ``,
    `Please let me know pricing and next steps for the 1:1 projector mockup.`,
  ].filter(Boolean);

  const specText = specLines.join("\n");
  const mailHref = mailtoLink(
    specText,
    `Custom Rug Commission: ${idea.trim() || shape} (${size})`
  );

  const handleCopy = () => {
    navigator.clipboard?.writeText(specText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section ref={formTop} id="commission-top" className="mx-auto max-w-[92rem] px-6 pb-20 pt-28 md:px-12 md:pt-32">
      {/* Top Header & Step Progress Bar */}
      <div className="border-b border-border pb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Step {step} of 4 · Commission Wizard</p>
            <h1 className="display-lg mt-2">Build Your Custom Rug</h1>
          </div>
          {baseProduct && (
            <div className="flex items-center gap-3 border border-border bg-card p-2.5">
              <img src={baseProduct.images[0]} alt={baseProduct.name} className="h-12 w-12 object-cover" />
              <div>
                <p className="font-mono text-[0.58rem] uppercase text-primary">Inspired By</p>
                <p className="font-display text-sm font-bold">{baseProduct.name}</p>
                <Link to={`/rug/${baseProduct.slug}`} className="font-mono text-[0.58rem] text-muted-foreground underline">
                  View original drop
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* 4-Step Interactive Bar */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="Commission steps">
          {STEPS.map((s) => {
            const active = step === s.num;
            const done = step > s.num;
            return (
              <button
                key={s.num}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStep(s.num)}
                className={`flex items-center justify-between border px-4 py-3 text-left transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : done
                    ? "border-primary/50 bg-card text-foreground"
                    : "border-border bg-card/50 text-muted-foreground hover:border-border"
                }`}
              >
                <div>
                  <span className="block text-sm font-semibold">{s.label}</span>
                </div>
                {done && <span className="text-sm">Done</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Body + Live Blueprint Sidebar */}
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {/* STEP 1: SHAPE */}
          {step === 1 && (
            <div className="fade-in">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Step 1: Choose Your Rug Shape
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Every rug is projected at 1:1 scale onto stretched monk’s cloth in Georgia, so we can cut any contour.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {SHAPE_CARDS.map((c) => {
                  const selected = shape === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setShape(c.id)}
                      className={`group flex flex-col overflow-hidden border text-left transition-colors ${
                        selected
                          ? "border-primary bg-card"
                          : "border-border bg-card/50 hover:border-primary/60"
                      }`}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-background">
                        <img
                          src={c.img}
                          alt={c.id}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {selected && (
                          <span className="absolute right-3 top-3 border border-primary bg-primary px-2.5 py-1 font-mono text-[0.6rem] font-bold uppercase text-primary-foreground">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <p className="font-display text-xl font-bold">{c.id}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
                        <p className="mt-2 font-mono text-[0.62rem] text-primary">{c.sample}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button type="button" onClick={() => setStep(2)} className="btn-gold">
                  Next: Size & Backing →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SIZE & BACKING */}
          {step === 2 && (
            <div className="fade-in">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Step 2: Select Size Tier & Backing
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Pick the footprint that fits your room and choose how you want the back finished.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {SIZE_CARDS.map((s) => {
                  const selected = size === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.id)}
                      className={`border p-5 text-left transition-colors ${
                        selected
                          ? "border-primary bg-card"
                          : "border-border bg-card/50 hover:border-primary/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xl font-bold">{s.id}</span>
                        <span className="border border-border bg-background px-2.5 py-0.5 font-mono text-[0.6rem] uppercase text-primary">
                          {s.quote}
                        </span>
                      </div>
                      <p className="mt-1 font-medium text-foreground">{s.title}</p>
                      <p className="mt-1.5 text-xs text-muted-foreground">{s.desc}</p>
                    </button>
                  );
                })}
              </div>

              <h3 className="mt-8 font-display text-xl font-bold">Choose Backing Finish</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {BACKING_CARDS.map((b) => {
                  const selected = backing === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBacking(b.id)}
                      className={`border p-4 text-left transition-colors ${
                        selected
                          ? "border-primary bg-card"
                          : "border-border bg-card/50 hover:border-primary/60"
                      }`}
                    >
                      <p className="font-display text-base font-bold">{b.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{b.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button type="button" onClick={() => setStep(1)} className="btn-outline">
                  ← Back to Shape
                </button>
                <button type="button" onClick={() => setStep(3)} className="btn-gold">
                  Next: Artwork & Colors →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ARTWORK & COLORS */}
          {step === 3 && (
            <div className="fade-in">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Step 3: Artwork & Yarn Direction
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us what team, logo, gaming icon, or custom concept you want us to project and tuft.
              </p>

              <div className="mt-6 space-y-5 border border-border bg-card p-6">
                <div>
                  <label htmlFor="wiz-idea" className="block font-mono text-xs uppercase tracking-[0.1em] text-primary">
                    Your Rug Concept (Team, Mascot, Gaming Logo, Pet, or Mashup)
                  </label>
                  <textarea
                    id="wiz-idea"
                    rows={3}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g., Custom Chicago Bears roaring logo, New England Patriots die-cut, or a 2-team mashup..."
                    className="mt-2 w-full border border-border bg-background p-3.5 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="wiz-colors" className="block font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                      Preferred Yarn Colors
                    </label>
                    <input
                      id="wiz-colors"
                      type="text"
                      value={colors}
                      onChange={(e) => setColors(e.target.value)}
                      placeholder="e.g., Authentic team colors or custom palette"
                      className="mt-1.5 w-full border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="wiz-name" className="block font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                      Your Name & Target Date (Optional)
                    </label>
                    <input
                      id="wiz-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Marcus · Need before Game Day"
                      className="mt-1.5 w-full border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="wiz-ref" className="block font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    Reference Image Link (Optional — or attach image in email/DM)
                  </label>
                  <input
                    id="wiz-ref"
                    type="text"
                    value={refUrl}
                    onChange={(e) => setRefUrl(e.target.value)}
                    placeholder="Paste a link to your logo/artwork or attach it when you email us"
                    className="mt-1.5 w-full border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <span className="block font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    Pile & Carving Style
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    {PILE_OPTIONS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPile(p)}
                        className={`border px-4 py-2 font-mono text-xs transition-colors ${
                          pile === p
                            ? "border-primary bg-primary font-semibold text-primary-foreground"
                            : "border-border bg-background hover:border-primary"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button type="button" onClick={() => setStep(2)} className="btn-outline">
                  ← Back to Size
                </button>
                <button type="button" onClick={() => setStep(4)} className="btn-gold">
                  Next: Review & Send →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & SEND */}
          {step === 4 && (
            <div className="fade-in">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Step 4: Review Your Commission Spec & Send
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your custom rug specification is ready. Send it directly to our Georgia workshop via Email or X DM—we’ll reply with a quote and 1:1 mockup details.
              </p>

              <div className="mt-6 border border-border bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
                  Generated Commission Message
                </p>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground">
                  {specText}
                </pre>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={mailHref} className="btn-gold">
                    Send Inquiry via Email ({EMAIL_ADDRESS}) →
                  </a>
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCopy}
                    className="btn-outline"
                  >
                    Copy Spec & DM {X_HANDLE} on X
                  </a>
                  <button type="button" onClick={handleCopy} className="btn-outline">
                    {copied ? "Copied" : "Copy spec text"}
                  </button>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button type="button" onClick={() => setStep(3)} className="btn-outline">
                  ← Edit Artwork Details
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 border border-border bg-card p-6">
            <div className="border-b border-border pb-3.5">
              <p className="eyebrow">Live Commission Summary</p>
              <h3 className="mt-1 font-display text-2xl font-bold">Studio Ticket</h3>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3 border-b border-border pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Shape</dt>
                <dd className="text-right font-semibold text-primary">{shape}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-border pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Size</dt>
                <dd className="text-right font-medium">{size}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-border pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Backing</dt>
                <dd className="text-right text-xs font-medium">{backing}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-border pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Finish</dt>
                <dd className="text-right text-xs">{pile}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-border pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Concept</dt>
                <dd className="text-right text-xs text-foreground">
                  {idea.trim() || "Custom Team / Logo Build"}
                </dd>
              </div>
              <div className="flex justify-between gap-3 pb-1">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Workshop</dt>
                <dd className="font-mono text-xs text-primary">Georgia, USA · ~2 Weeks</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-2.5">
              <a href={mailHref} className="btn-gold w-full">
                Email Spec to Studio →
              </a>
              <button type="button" onClick={handleCopy} className="btn-outline w-full">
                {copied ? "Spec Copied!" : "Copy Spec for X DM"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
