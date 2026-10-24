export const SITE = "https://rugcraft-studio.vercel.app";
export const EMAIL_ADDRESS = "rugcraftstudio8@gmail.com";
export const X_HANDLE = "@RugCraftStudio";
export const X_URL = "https://x.com/RugCraftStudio";
export const INSTAGRAM_URL = "https://x.com/RugCraftStudio";

export const IMAGES = {
  hero: "/rugs/hero-workshop.webp",
  heroLounge: "/rugs/hero-slide-lounge.webp",
  heroCarving: "/rugs/hero-slide-carving.webp",
  heroCollector: "/rugs/hero-slide-collector.webp",
  patriotsDesk: "/rugs/patriots-desk.webp",
  patriotsStudio: "/rugs/patriots-studio.webp",
  patriotsVacuum: "/rugs/patriots-vacuum.webp",
  patriotsFlat: "/rugs/patriots-flat.webp",
  bearsFull: "/rugs/bears-full.webp",
  bearsAngle: "/rugs/bears-angle.webp",
  bearsCloseup: "/rugs/bears-closeup.webp",
  bearsCarve: "/rugs/bears-carve.webp",
  brewersGlove: "/rugs/brewers-glove.webp",
  brewersSketch: "/rugs/brewers-sketch.webp",
  ravensStudio: "/rugs/ravens-studio.webp",
  ravensGameroom: "/rugs/ravens-gameroom.webp",
  ravensFloor: "/rugs/ravens-floor.webp",
  ravensMat: "/rugs/ravens-mat.webp",
  packersOval: "/rugs/packers-oval.webp",
  packersDoor: "/rugs/packers-door.webp",
  eaglesCarving: "/rugs/eagles-carving.webp",
  cowboysStar: "/rugs/cowboys-star.webp",
  cubsRound: "/rugs/cubs-round.webp",
  oriolesUnroll: "/rugs/orioles-unroll.webp",
  nyMashup: "/rugs/ny-mashup.webp",
  dolphinsTufting: "/rugs/dolphins-tufting.webp",
  ugaWallart: "/rugs/uga-wallart.webp",
  magicWallart: "/rugs/magic-wallart.webp",
  mavsWallart: "/rugs/mavs-wallart.webp",
  gamingController: "/rugs/gaming-controller.webp",
  macroCarved: "/rugs/macro-carved-pile.webp",
};

export const HERO_SLIDES = [
  {
    id: "workshop",
    image: "/rugs/hero-workshop.webp",
    eyebrow: "Georgia, USA · Ships Nationwide",
    line1: "Your Team.",
    line2: "Your",
    accentWord: "Rug.",
    tagline: "Walls Have Posters. Legends Walk On Art.",
    lede: "One-of-a-kind hand-tufted rugs for game-day superfans and collectors. Designed with you, made by hand in Georgia, ready in about two weeks.",
    captionTitle: "Georgia Tufting Workshop",
    captionSub: "16mm Cut-Pile · Hand-Sheared 3D Bevels",
  },
  {
    id: "lounge",
    image: "/rugs/hero-slide-lounge.webp",
    eyebrow: "Bespoke Collector Commissions",
    line1: "Custom Built.",
    line2: "Carved by",
    accentWord: "Hand.",
    tagline: "Heavyweight 4-Ply Yarn Locked in Commercial Latex.",
    lede: "From die-cut stadium silhouettes to architectural lounge centerpieces—every stitch is tufted at 2,000 RPM and backed with non-slip felt.",
    captionTitle: "Walnut & Leather Collector Lounge",
    captionSub: "Die-Cut Starburst Silhouette · 4.5ft Build",
  },
  {
    id: "carving",
    image: "/rugs/hero-slide-carving.webp",
    eyebrow: "Cut-Pile Precision · Zero Factory Fluff",
    line1: "Sculpted Pile.",
    line2: "Razor",
    accentWord: "Edges.",
    tagline: "Every Color Boundary Beveled With Electric Shears.",
    lede: "Machine-printed mats look flat from five feet away. We hand-carve deep V-grooves between every color block so letters and crests stand in 3D relief.",
    captionTitle: "Live Bench Carving in Georgia",
    captionSub: "Hand-Beveled V-Grooves · 4-Ply Wool & Acrylic",
  },
  {
    id: "collector",
    image: "/rugs/hero-slide-collector.webp",
    eyebrow: "Sports · Gaming · Streetwear · Mashups",
    line1: "Dream It Up.",
    line2: "We Tuft",
    accentWord: "It.",
    tagline: "From Your Sketch to 10,000 Loops of Yarn.",
    lede: "Send us any team crest, multi-team city mashup, sneaker icon, or custom sketch. Projected at 1:1 scale on our vertical frame and shipped to your door.",
    captionTitle: "Streetwear & Sneaker Studio",
    captionSub: "4ft Medallion Centerpiece · Non-Slip Felt",
  },
];

export const mailtoLink = (text: string, subject = "Custom Rug Commission — RugCraft Studio") =>
  `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

export const waLink = mailtoLink;

export const WA_GENERAL = mailtoLink(
  "Hi RugCraft Studio,\n\nI saw your custom hand-tufted rugs and would like to start a commission.\n\n- Design / Team / Concept: \n- Preferred Size (3ft / 4ft / 5ft / Custom Size): \n- Backing Option (Non-Slip Felt / Wall Hang D-Rings): \n- Shipping State: \n\nPlease let me know pricing and next steps."
);

export type Category = "NFL & Football" | "MLB & Diamond" | "Custom Mashups" | "Gaming & Culture";
export const CATEGORIES: Category[] = ["NFL & Football", "MLB & Diamond", "Custom Mashups", "Gaming & Culture"];

export const catSlug = (c: Category) =>
  c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const catFromSlug = (s?: string) =>
  CATEGORIES.find((c) => catSlug(c) === s);

export const COLLECTIONS: Record<Category, { image: string; blurb: string }> = {
  "NFL & Football": {
    image: "/rugs/patriots-desk.webp",
    blurb: "Game-day silhouettes, roaring mascots, and razor-carved endzone crests built for heavy stepping.",
  },
  "MLB & Diamond": {
    image: "/rugs/brewers-glove.webp",
    blurb: "Classic ball-in-glove die-cuts, Wrigley bullseyes, and five-foot clubhouse statement pieces.",
  },
  "Custom Mashups": {
    image: "/rugs/ny-mashup.webp",
    blurb: "Multi-team city tributes, collegiate legends, and one-of-one combinations built from your sketch.",
  },
  "Gaming & Culture": {
    image: "/rugs/gaming-controller.webp",
    blurb: "Controllers, streaming emblems, and custom icons crafted for studio and desk floors.",
  },
};

export type Product = {
  slug: string;
  aliases?: string[];
  name: string;
  price: number;
  priceLabel: string;
  sizeSpec: string;
  category: Category;
  images: string[];
  short: string;
  description: string;
  postQuote?: string;
  postUrl?: string;
  postDate?: string;
  specs: {
    yarnWeight: string;
    pileHeight: string;
    carvingFinish: string;
    origin: string;
  };
  tag?: string;
};

export const RUG_SIZE_OPTIONS = ["3ft", "4ft", "5ft", "Custom Size"] as const;
export const RUG_BACKING_OPTIONS = ["Non-Slip Felt", "Wall Hang D-Rings"] as const;

export const PRODUCTS: Product[] = [
  {
    slug: "chicago-bears-medallion",
    aliases: ["chicago-bears-roaring-round"],
    name: "Chicago Bears Roaring Medallion",
    price: 240,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "4ft Circular Medallion",
    category: "NFL & Football",
    images: ["/rugs/bears-full.webp", "/rugs/bears-angle.webp", "/rugs/bears-closeup.webp", "/rugs/bears-carve.webp"],
    tag: "4 Studio Angles",
    short: "High-relief roaring Grizzly crest framed by deeply sculpted slab-serif CHICAGO BEARS lettering.",
    description:
      "Built in burnt sienna orange, midnight navy, and warm wool cream. Look closely at the lettering: each block character is hand-beveled into the surrounding navy pile so it casts crisp architectural shadows across your floor.",
    postQuote: "Chicago Bears custom handmade tufted medallion — sculpted with deep-channel lettering for the ultimate fan cave.",
    postUrl: "https://x.com/RugCraftStudio/status/2113408075311001885",
    postDate: "Oct 22, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm Plush Cut-Pile Loft",
      carvingFinish: "Deep V-Groove 3D Letter Beveling",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "new-england-patriots-flying-elvis",
    aliases: ["patriots-flying-elvis-rug"],
    name: "New England Flying Elvis Die-Cut",
    price: 220,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "3.5ft – 5ft Die-Cut Silhouette",
    category: "NFL & Football",
    images: ["/rugs/patriots-desk.webp", "/rugs/patriots-studio.webp", "/rugs/patriots-vacuum.webp", "/rugs/patriots-flat.webp"],
    tag: "Signature Drop",
    short: "Die-cut Flying Elvis silhouette with crisp white waterfall edge and deep-carved navy, crimson, and silver pile.",
    description:
      "Hand-tufted in Georgia for die-hard New England fans. Every contour—from the silver face profile to the crimson tricorne streaks and bright white star—is razor-carved with electric shears so the crest pops in 3D relief.",
    postQuote: "Rep your team with a custom handmade Patriots rug. Bring your team pride to your game room, man cave, or office.",
    postUrl: "https://x.com/RugCraftStudio/status/2112956019810959819",
    postDate: "Oct 21, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "15mm Dense Cut-Pile",
      carvingFinish: "Contour Die-Cut + Waterfall Edge",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "milwaukee-brewers-ball-in-glove",
    aliases: ["brewers-ball-in-glove-rug"],
    name: "Milwaukee Ball-in-Glove Die-Cut",
    price: 210,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "3.5ft Contour Die-Cut",
    category: "MLB & Diamond",
    images: ["/rugs/brewers-glove.webp", "/rugs/brewers-sketch.webp"],
    tag: "Newest Build",
    short: "The iconic 'mb' mitt silhouette in royal navy and harvest gold with a raised white baseball palm.",
    description:
      "Projected onto stretched monk's cloth, hand-traced in our Georgia workshop, and tufted with dense cut-pile yarn. The golden webbing channels are deeply carved to separate each finger of the mitt.",
    postQuote: "Milwaukee Brewers fans, this one is for you. Handmade with love for the Crew — built for your game room or fan cave.",
    postUrl: "https://x.com/RugCraftStudio/status/2113857134945317292",
    postDate: "Oct 24, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm Plush Cut-Pile",
      carvingFinish: "Hand-Sheared Gold Webbing Channels",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "baltimore-ravens-flock-silhouette",
    name: "Baltimore Ravens Flock Silhouette",
    price: 230,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "4ft Jagged Feather Die-Cut",
    category: "NFL & Football",
    images: ["/rugs/ravens-studio.webp", "/rugs/ravens-gameroom.webp", "/rugs/ravens-mat.webp", "/rugs/ravens-floor.webp"],
    tag: "4 Studio Angles",
    short: "Royal purple and metallic-gold border die-cut following every jagged feather of the Ravens profile.",
    description:
      "A centerpiece built for dark-mode gaming rooms and purple-and-black fan caves. Features a sculpted gold 'B' emblem, piercing crimson eye detail, and a heavy-duty golden waterfall border.",
    postQuote: "Ravens Flock — custom handmade rugs designed to bring your team pride to life in your game room, man cave, or sports collection.",
    postUrl: "https://x.com/RugCraftStudio/status/2112643886078202158",
    postDate: "Oct 20, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm High-Density Cut-Pile",
      carvingFinish: "Jagged Feather Contour Beveling",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "philadelphia-eagles-carved-medallion",
    name: "Philly Eagles Midnight Green Round",
    price: 240,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "4ft Carved Round Rug",
    category: "NFL & Football",
    images: ["/rugs/eagles-carving.webp", "/rugs/macro-carved-pile.webp"],
    tag: "Razor-Carved",
    short: "Midnight green medallion with arched PHILADELPHIA lettering and silver-feathered eagle neck.",
    description:
      "Showcased mid-carve on our studio floor: thick midnight green cut-pile surrounded by a jet-black ring and crisp white divider line, sheared by hand for razor-sharp letter definition.",
    postQuote: "Handmade this Philadelphia Eagles rug for the die-hard fans. Built for a game room, man cave, or any Eagles fan space.",
    postUrl: "https://x.com/RugCraftStudio/status/2113850924770980124",
    postDate: "Oct 24, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm Plush Cut-Pile",
      carvingFinish: "Electric Shear Sculpted Typography",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "green-bay-packers-g-oval",
    name: "Green Bay Gold-Rimmed 'G' Oval",
    price: 200,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "3.5ft Classic Oval",
    category: "NFL & Football",
    images: ["/rugs/packers-oval.webp", "/rugs/packers-door.webp"],
    tag: "2 Studio Angles",
    short: "Deep forest green and Lambeau gold oval with a raised, carved white 'G' center and woven studio tag.",
    description:
      "Clean, bold, and built for high-traffic doorways or fan caves. The central white 'G' sits slightly proud of the forest-green field thanks to angled bevel shearing along every curve.",
    postQuote: "Green and gold pride, handcrafted to perfection. Custom Packers rugs made by hand for your game room or fan cave.",
    postUrl: "https://x.com/RugCraftStudio/status/2113832349079351649",
    postDate: "Oct 24, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "15mm Dense Cut-Pile",
      carvingFinish: "Raised Emblem Relief Carve",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "ny-giants-yankees-liberty-mashup",
    name: "NY Empire Triple-Crown Mashup",
    price: 290,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "4.5ft Custom Die-Cut Mashup",
    category: "Custom Mashups",
    images: ["/rugs/ny-mashup.webp", "/rugs/patriots-desk.webp"],
    tag: "1-of-1 Mashup",
    short: "Giants 'ny' + Yankees Uncle Sam Top Hat & Bat + Lady Liberty fused into one contour floor piece.",
    description:
      "Why pick one franchise when you rep the whole city? Commissioned as a custom piece, this multi-layered die-cut merges navy-and-red Giants typography, the iconic pinstripe top hat, and Statue of Liberty shading.",
    postQuote: "Made this New York Giants mashup rug — 100% custom hand-tufted and carved to order.",
    postUrl: "https://x.com/RugCraftStudio/status/2112951206440304670",
    postDate: "Oct 21, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm Multi-Contour Pile",
      carvingFinish: "Multi-Logo Precision Separation",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "orioles-cartoon-bird-5ft-runner",
    name: "5ft Birdland Mascot Statement Rug",
    price: 280,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "5ft XL Statement Build",
    category: "MLB & Diamond",
    images: ["/rugs/orioles-unroll.webp", "/rugs/brewers-glove.webp"],
    tag: "5ft XL Build",
    short: "Five feet of vibrant orange-and-black mascot energy with commercial-grade grey non-slip felt backing.",
    description:
      "Captured unrolling in the morning sun: five full feet of high-density cut-pile yarn with our signature grey non-slip felt backing and reinforced waterfall edges that stay flat on hardwood.",
    postQuote: "5ft Custom Rug — built for heavy stepping with full non-slip felt backing.",
    postUrl: "https://x.com/RugCraftStudio/status/2112954946123669756",
    postDate: "Oct 21, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm XL Plush Loft",
      carvingFinish: "Full-Scale Contour & Felt Lock",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "chicago-cubs-bullseye-round",
    name: "Chicago Cubs Wrigley Bullseye",
    price: 215,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "3.5ft Circular Rug",
    category: "MLB & Diamond",
    images: ["/rugs/cubs-round.webp", "/rugs/brewers-glove.webp"],
    short: "Royal blue, crimson red, and warm cream bullseye with deep-channel carved lettering.",
    description:
      "Every concentric ring on this Cubs medallion is separated by a hand-sheared V-groove so the crimson 'C' and inner lettering stay razor-crisp year after year.",
    postQuote: "Handmade Cubs rugs for fans who want something special for their collection or game room.",
    postUrl: "https://x.com/RugCraftStudio/status/2113735598347620474",
    postDate: "Oct 23, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "15mm Cut-Pile",
      carvingFinish: "Concentric Ring V-Groove Carve",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "dallas-cowboys-lone-star-cutout",
    name: "Cowboys Nation Five-Point Star",
    price: 225,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "4ft Point-to-Point Star Cutout",
    category: "NFL & Football",
    images: ["/rugs/cowboys-star.webp", "/rugs/patriots-desk.webp"],
    short: "Geometric 5-point star die-cut in navy, crisp white, black pin-striping, and silver-grey border.",
    description:
      "Sharp geometric points require serious backing discipline. We reinforce all five star tips with folded canvas and high-grip felt so the points never curl.",
    postQuote: "Handmade this Dallas Cowboys rug for the fans. Built for a game room, man cave, or any Cowboys fan space.",
    postUrl: "https://x.com/RugCraftStudio/status/2113851729200746878",
    postDate: "Oct 24, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm Cut-Pile",
      carvingFinish: "Reinforced 5-Point Star Bevel",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "miami-dolphins-sunburst-edition",
    name: "Miami Aqua & Coral Sunburst Rug",
    price: 235,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "4ft Sunburst Silhouette",
    category: "NFL & Football",
    images: ["/rugs/dolphins-tufting.webp", "/rugs/hero-workshop.webp"],
    short: "Electric coral-orange sunburst spikes and leaping dolphin silhouette, tufted at 2,000 RPM.",
    description:
      "Photographed live on our vertical tufting frame in Georgia as coral-orange yarn fills the sunburst rays. Lush, high-contrast, and built to brighten any setup.",
    postQuote: "Bring your team pride to life with a custom handmade Miami Dolphins rug for your game room or fan setup.",
    postUrl: "https://x.com/RugCraftStudio/status/2112646925824455147",
    postDate: "Oct 20, 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm Cut-Pile",
      carvingFinish: "Sunburst Ray Contour Shearing",
      origin: "Georgia, USA",
    },
  },
  {
    slug: "arcade-pro-controller-diecut",
    name: "Player-One Pro Controller Die-Cut",
    price: 210,
    priceLabel: "Made to Order · Custom Quote",
    sizeSpec: "3.5ft Gaming Setup Rug",
    category: "Gaming & Culture",
    images: ["/rugs/gaming-controller.webp", "/rugs/macro-carved-pile.webp"],
    tag: "Gaming Setup",
    short: "Contoured controller silhouette in deep navy, terracotta sienna, and wool cream with raised 3D buttons.",
    description:
      "Designed to sit right under your gaming chair or streaming desk. Raised cut-pile action buttons and D-pad give your feet tactile comfort during marathon sessions.",
    postQuote: "Sports, Gaming, and Unique Designs — Made to Order in Georgia, USA.",
    postUrl: "https://x.com/RugCraftStudio",
    postDate: "Oct 2026",
    specs: {
      yarnWeight: "Heavyweight 4-Ply Acrylic & Wool Blend",
      pileHeight: "16mm Dual-Level Relief Pile",
      carvingFinish: "3D Sculpted Button & D-Pad Bevels",
      origin: "Georgia, USA",
    },
  },
];

export const getProduct = (slug?: string) =>
  PRODUCTS.find((p) => p.slug === slug || p.aliases?.includes(slug || ""));

export const formatINR = (n: number) => `Est. $${n}+`;

export function waProduct(
  p: Product,
  opts: { size?: string; backing?: string; note?: string; variant?: string; gift?: string } = {}
) {
  const chosenSize = opts.size || opts.variant || "4ft";
  const chosenBacking = opts.backing || "Non-Slip Felt";
  const extraNote = opts.note || opts.gift;
  let t = `Hi RugCraft Studio,\n\nI would like to order the "${p.name}".\n\nOrder Specifications:\n- Rug Design: ${p.name}\n- Selected Size: ${chosenSize}\n- Selected Backing: ${chosenBacking}\n- Reference URL: ${SITE}/rug/${p.slug}`;
  if (extraNote?.trim()) {
    t += `\n- Custom Notes: "${extraNote.trim()}"`;
  }
  t += `\n\nPlease let me know the quote and current turnaround time for this build.`;
  return mailtoLink(t, `Rug Order Inquiry: ${p.name} (${chosenSize} · ${chosenBacking})`);
}

export const MATERIAL_DETAILS = [
  ["Yarn Weight", "Heavyweight 4-ply acrylic & wool-blend rug yarn — dense, colorfast, and plush underfoot"],
  ["Pile Height", "15–16mm high-density cut-pile tufted at 2,000 RPM"],
  ["Carving Finish", "Hand-beveled 3D V-groove razor carving between every color boundary"],
  ["Origin", "Handmade to order in Georgia, USA · Ships nationwide across the US"],
];

export const CARE = [
  "Vacuum gently using suction only (keep rotating beater bars off) to preserve carved 3D channels.",
  "Spot-clean spills immediately by blotting with a clean damp cloth and mild soap.",
  "Built for indoor floors in game rooms, offices, and bedrooms, or hang on the wall with D-rings.",
];

export type Theme = { id: string; name: string; bg: string; surface: string; text: string; muted: string; accent: string; border: string };
export const THEMES: Theme[] = [
  { id: "obsidian", name: "Atelier Obsidian", bg: "#0E0D0C", surface: "#161412", text: "#F4EFE6", muted: "#A69E93", accent: "#C85A32", border: "#282420" },
  { id: "monkscloth", name: "Raw Monk's Cloth", bg: "#F6F2EA", surface: "#EDE6D8", text: "#141210", muted: "#635B52", accent: "#B84A24", border: "#D6CBB8" },
  { id: "forest", name: "Forest Wool", bg: "#0F1713", surface: "#16221C", text: "#EFECE6", muted: "#98A89E", accent: "#D49B4B", border: "#24362D" },
  { id: "navy", name: "Navy Locker", bg: "#0C1118", surface: "#131B26", text: "#F2F4F7", muted: "#94A0B2", accent: "#D95338", border: "#222E40" },
  { id: "espresso", name: "Espresso Studio", bg: "#140E0B", surface: "#1E1612", text: "#F5EAD8", muted: "#B0A08E", accent: "#D87A32", border: "#30241D" },
];
export const THEME_KEY = "rugcraft-theme-v3";

export function applyTheme(t: Theme) {
  const r = document.documentElement.style;
  const set = (k: string, v: string) => r.setProperty(k, v);
  set("--background", t.bg);
  set("--card", t.surface);
  set("--secondary", t.surface);
  set("--muted", t.surface);
  set("--foreground", t.text);
  set("--card-foreground", t.text);
  set("--muted-foreground", t.muted);
  set("--primary", t.accent);
  set("--primary-foreground", "#F6F2EA");
  set("--border", t.border);
  set("--ring", t.accent);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t.bg);
}

export type FontPairing = {
  id: string;
  name: string;
  tag: string;
  display: string;
  sans: string;
  weight?: string;
  tracking?: string;
};

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: "cabinet",
    name: "Cabinet Grotesk + Plus Jakarta Sans",
    tag: "Architectural Craft (Default)",
    display: '"Cabinet Grotesk", system-ui, sans-serif',
    sans: '"Plus Jakarta Sans", system-ui, sans-serif',
    weight: "700",
    tracking: "-0.02em",
  },
  {
    id: "fraunces",
    name: "Fraunces + Plus Jakarta Sans",
    tag: "Editorial Textile Serif",
    display: '"Fraunces", Georgia, serif',
    sans: '"Plus Jakarta Sans", system-ui, sans-serif',
    weight: "600",
    tracking: "-0.02em",
  },
  {
    id: "general",
    name: "General Sans + Inter",
    tag: "Swiss Gallery Clean",
    display: '"General Sans", system-ui, sans-serif',
    sans: '"Inter", system-ui, sans-serif',
    weight: "600",
    tracking: "-0.02em",
  },
  {
    id: "instrument",
    name: "Instrument Serif + DM Sans",
    tag: "Warm Luxury Atelier",
    display: '"Instrument Serif", Georgia, serif',
    sans: '"DM Sans", system-ui, sans-serif',
    weight: "400",
    tracking: "-0.015em",
  },
  {
    id: "syne",
    name: "Syne + Inter",
    tag: "Vanguard Collector",
    display: '"Syne", system-ui, sans-serif',
    sans: '"Inter", system-ui, sans-serif',
    weight: "700",
    tracking: "-0.025em",
  },
];

export const FONT_KEY = "rugcraft-font-v3";

export function applyFontPairing(f: FontPairing) {
  const r = document.documentElement.style;
  r.setProperty("--font-display", f.display);
  r.setProperty("--font-sans", f.sans);
  r.setProperty("--font-display-weight", f.weight || "700");
  r.setProperty("--font-display-tracking", f.tracking || "-0.02em");
}
