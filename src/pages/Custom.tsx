import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Check, Copy } from "lucide-react";
import {
  EMAIL_ADDRESS,
  PRODUCTS,
  RUG_BACKING_OPTIONS,
  RUG_SIZE_OPTIONS,
  X_HANDLE,
  X_URL,
  getProduct,
  mailtoLink,
} from "@/lib/studio";
import { useSeo } from "@/lib/seo";
import { WhatsAppIcon, XLogoIcon } from "@/components/studio/WhatsAppIcon";
import {
  Icon3DBoxStage,
  Icon3DSparkCube,
  Icon3DTuftGun,
  Icon3DYarnCone,
} from "@/components/studio/Icons3D";

const SHAPES = [
  { id: "Die-Cut Logo Silhouette", desc: "Cut to the exact contour of your team crest, mascot, or icon" },
  { id: "Classic Round Medallion", desc: "Circular stadium medallion framed by arched block typography" },
  { id: "Oval / Entryway Runner", desc: "Balanced proportions ideal for doorways, desks, or setups" },
  { id: "1-of-1 Multi-Team Mashup", desc: "Combine multiple teams, symbols, or city icons into one piece" },
];

const PILES = [
  "16mm Cut-Pile + 3D Razor Carve",
  "High-Low Sculpted Relief Pile",
];

export default function Custom() {
  useSeo({
    title: "Custom Rug Commission Builder — RugCraft Studio",
    description:
      "Design your custom hand-tufted rug in 30 seconds. Choose your silhouette, size tier, backing, and concept—hand-tufted to order in Georgia, USA.",
  });

  const [params] = useSearchParams();
  const baseProduct = getProduct(params.get("from") ?? undefined);

  const [shape, setShape] = useState(SHAPES[0]!.id);
  const [size, setSize] = useState<string>(params.get("size") || "4ft");
  const [backing, setBacking] = useState<string>(params.get("backing") || "Non-Slip Felt");
  const [pile, setPile] = useState(PILES[0]!);
  const [idea, setIdea] = useState(baseProduct ? `Custom version of ${baseProduct.name}` : "");
  const [colors, setColors] = useState("");
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (baseProduct) {
      setIdea(`Custom version of ${baseProduct.name}`);
    }
  }, [baseProduct]);

  const specLines = [
    `Hi RugCraft Studio,`,
    ``,
    `I configured a custom rug commission on your website and would like a quote:`,
    ``,
    `- Concept / Design: ${idea.trim() || "Custom Team / Logo / Gaming Build"}`,
    baseProduct ? `- Inspired By: ${baseProduct.name} (${baseProduct.slug})` : null,
    `- Silhouette Shape: ${shape}`,
    `- Selected Size: ${size}`,
    `- Backing Option: ${backing}`,
    `- Pile & Carving: ${pile}`,
    `- Preferred Yarn Colors: ${colors.trim() || "Authentic team / studio recommendation"}`,
    name.trim() ? `- Name & Timeline: ${name.trim()}` : null,
    ``,
    `Please let me know pricing and next steps for the mockup.`,
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
    <section className="mx-auto max-w-[92rem] px-6 pb-24 pt-28 md:px-12 md:pt-36">
      {/* Header */}
      <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border pb-10 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-3">
            <Icon3DBoxStage className="h-10 w-10">
              <Icon3DTuftGun className="h-5 w-5" />
            </Icon3DBoxStage>
            <span className="eyebrow">Interactive Commission Studio</span>
          </div>
          <h1 className="display-lg mt-4">
            Design Your <em className="text-primary">Custom Rug.</em>
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Configure your silhouette, size tier, backing, and design concept below. Your live studio blueprint updates automatically so you can send it straight to our Georgia workshop via Email or X DM.
          </p>
        </div>

        {baseProduct && (
          <div className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-card p-3">
            <img
              src={baseProduct.images[0]}
              alt={baseProduct.name}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary">
                Customizing Template
              </p>
              <p className="font-display text-lg leading-tight">{baseProduct.name}</p>
              <Link
                to={`/rug/${baseProduct.slug}`}
                className="font-mono text-[0.6rem] text-muted-foreground underline hover:text-primary"
              >
                Back to original drop
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Builder Controls */}
        <div className="space-y-8 lg:col-span-7">
          {/* Quick Inspiration Selector */}
          <div>
            <label className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
              Optional · Start From a Studio Build or Scratch
            </label>
            <div className="mt-3 flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
              <button
                type="button"
                onClick={() => setIdea("")}
                className={`shrink-0 rounded-xl border px-3.5 py-2 font-mono text-xs transition-all ${
                  idea === ""
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                Blank Custom Concept
              </button>
              {PRODUCTS.slice(0, 5).map((prod) => (
                <button
                  key={prod.slug}
                  type="button"
                  onClick={() => setIdea(`Custom version of ${prod.name}`)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-1.5 text-xs transition-all ${
                    idea.includes(prod.name)
                      ? "border-primary bg-card text-primary"
                      : "border-border bg-card/50 hover:border-primary/50"
                  }`}
                >
                  <img src={prod.images[0]} alt="" className="h-6 w-6 rounded object-cover" />
                  <span>{prod.name.split(" ").slice(0, 2).join(" ")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Silhouette Shape */}
          <div>
            <label className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
              Choose Silhouette Shape
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setShape(s.id)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    shape === s.id
                      ? "border-primary bg-card shadow-sm"
                      : "border-border bg-card/40 hover:border-primary/50"
                  }`}
                >
                  <p className="font-display text-xl leading-snug">{s.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Size Tier & Backing */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                Select Size Tier
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {RUG_SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`rounded-xl border py-3 text-center font-mono text-xs transition-all ${
                      size === s
                        ? "border-primary bg-primary font-semibold text-primary-foreground"
                        : "border-border bg-card/50 hover:border-primary/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                Select Backing Option
              </label>
              <div className="mt-3 grid grid-cols-1 gap-2.5">
                {RUG_BACKING_OPTIONS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBacking(b)}
                    className={`rounded-xl border px-4 py-2.5 text-left font-mono text-xs transition-all ${
                      backing === b
                        ? "border-primary bg-primary font-semibold text-primary-foreground"
                        : "border-border bg-card/50 hover:border-primary/50"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pile & Carving */}
          <div>
            <label className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
              Pile & Carving Finish
            </label>
            <div className="mt-3 flex flex-wrap gap-3">
              {PILES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPile(p)}
                  className={`rounded-xl border px-4 py-2.5 font-mono text-xs transition-all ${
                    pile === p
                      ? "border-primary bg-primary font-semibold text-primary-foreground"
                      : "border-border bg-card/50 hover:border-primary/50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Concept Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="custom-idea" className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                Your Rug Concept (Team, Gaming Logo, Pet, or Mashup)
              </label>
              <input
                id="custom-idea"
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your logo, team crest, jersey number, or custom artwork..."
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="custom-colors" className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                Preferred Yarn Colors
              </label>
              <input
                id="custom-colors"
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                placeholder="e.g., Navy, Tufting Orange & Cream"
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="custom-name" className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                Your Name & Target Date (Optional)
              </label>
              <input
                id="custom-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Marcus · Before Game Day"
                className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Right Sticky Blueprint Ticket */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-3xl border border-primary/50 bg-card p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] md:p-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="eyebrow">Live Studio Blueprint</p>
                <h2 className="mt-1 font-display text-3xl">Commission Spec Sheet</h2>
              </div>
              <Icon3DBoxStage className="h-11 w-11">
                <Icon3DYarnCone className="h-6 w-6" />
              </Icon3DBoxStage>
            </div>

            <dl className="mt-6 space-y-3.5 text-sm">
              <div className="flex justify-between gap-4 border-b border-border/60 pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Concept</dt>
                <dd className="text-right font-medium text-foreground">
                  {idea.trim() || "Custom Fan / Logo Build"}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border/60 pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Silhouette</dt>
                <dd className="text-right font-medium text-primary">{shape}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border/60 pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Size Tier</dt>
                <dd className="text-right font-mono text-xs font-semibold">{size} · Custom Quote</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border/60 pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Backing</dt>
                <dd className="text-right font-medium">{backing}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border/60 pb-2.5">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Pile & Edge</dt>
                <dd className="text-right text-xs">{pile}</dd>
              </div>
              <div className="flex justify-between gap-4 pb-1">
                <dt className="font-mono text-xs uppercase text-muted-foreground">Studio Origin</dt>
                <dd className="font-mono text-xs text-primary">Georgia, USA · ~2 Weeks</dd>
              </div>
            </dl>

            <div className="mt-8 space-y-3">
              <a href={mailHref} className="btn-gold w-full !min-h-[52px]">
                <WhatsAppIcon className="h-4 w-4" /> Email Spec to {EMAIL_ADDRESS}
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCopy}
                  className="btn-outline w-full !px-3 text-center"
                >
                  <XLogoIcon className="h-3.5 w-3.5" /> DM {X_HANDLE}
                </a>
                <button type="button" onClick={handleCopy} className="btn-outline w-full !px-3">
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy Spec"}
                </button>
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[0.62rem] text-muted-foreground">
              Have a reference photo or sketch? Attach it directly in your email or X DM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
