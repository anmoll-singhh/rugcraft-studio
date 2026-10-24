export const SITE = "https://rugcraft-studio.vercel.app";
export const EMAIL_ADDRESS = "rugcraftstudio8@gmail.com";
export const X_HANDLE = "@RugCraftStudio";
export const X_URL = "https://x.com/RugCraftStudio";
export const INSTAGRAM_URL = "https://x.com/RugCraftStudio";

export const IMAGES = {
  hero: "/rugs/hero-workshop.webp",
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
  // Legacy aliases for any component expecting them
  model: "/rugs/bears-full.webp",
  modelNeck: "/rugs/eagles-carving.webp",
  modelEar: "/rugs/patriots-desk.webp",
  modelHand: "/rugs/brewers-glove.webp",
  story: "/rugs/dolphins-tufting.webp",
  gift: "/rugs/patriots-studio.webp",
  macro: "/rugs/bears-carve.webp",
};

export const waLink = (text: string, subject = "Custom Rug Commission — RugCraft Studio") =>
  `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

export const xIntentLink = (text: string) =>
  `https://x.com/intent/tweet?text=${encodeURIComponent(`@RugCraftStudio ${text}`)}`;

export const WA_GENERAL = waLink(
  "Hi RugCraft Studio!\n\nI saw your custom tufted rugs and would love to start a commission.\n\n• Idea / Team / Logo: \n• Preferred Size (2.5ft / 3.5ft / 4.5ft / 5ft+): \n• Shape (Die-Cut Silhouette / Round / Runner): \n• Shipping State: \n\nLet me know the next steps!"
);

export type Category = "NFL & Football" | "MLB & Diamond" | "Custom Mashups" | "Gaming & Culture";
export const CATEGORIES: Category[] = ["NFL & Football", "MLB & Diamond", "Custom Mashups", "Gaming & Culture"];

export const catSlug = (c: Category) =>
  c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const catFromSlug = (s?: string) =>
  CATEGORIES.find((c) => catSlug(c) === s);

export const COLLECTIONS: Record<Category, { image: string; blurb: string; stepTitle?: string; stepSub?: string }> = {
  "NFL & Football": {
    image: "/rugs/patriots-desk.webp",
    blurb: "Game-day silhouettes, roaring mascots, and razor-carved endzone crests built for heavy stepping.",
  },
  "MLB & Diamond": {
    image: "/rugs/brewers-glove.webp",
    blurb: "Classic ball-in-glove die-cuts, Wrigley bullseyes, and 5ft clubhouse statement pieces.",
  },
  "Custom Mashups": {
    image: "/rugs/ny-mashup.webp",
    blurb: "Multi-team city tributes, collegiate legends, and one-of-one combinations nobody else owns.",
  },
  "Gaming & Culture": {
    image: "/rugs/gaming-controller.webp",
    blurb: "Controllers, streaming logos, sneaker silhouettes, and custom icons for setup floors.",
  },
};

export type Product = {
  slug: string;
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
  variants?: { label: string; options: string[] };
  tag?: string;
};

const RUG_SIZES = {
  label: "Rug Dimension Tier",
  options: ["2.5 ft (Desk / Entry)", "3.5 ft (Fan Cave Standard)", "4.5 ft (Game Room Anchor)", "5 ft+ (XL Trophy Build)"],
};

export const PRODUCTS: Product[] = [
  {
    slug: "patriots-flying-elvis-rug",
    name: "New England Flying Elvis Die-Cut",
    price: 220,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "3.5 ft – 5 ft Die-Cut Silhouette",
    category: "NFL & Football",
    images: ["/rugs/patriots-desk.webp", "/rugs/patriots-studio.webp", "/rugs/patriots-vacuum.webp", "/rugs/patriots-flat.webp"],
    tag: "Signature Drop",
    short: "Die-cut Flying Elvis silhouette with crisp white waterfall edge and deep-carved navy, crimson & silver pile.",
    description:
      "Hand-tufted in Georgia for die-hard New England fans. Every contour—from the silver face profile to the crimson tricorne streaks and bright white star—is razor-carved with electric shears so the logo pops in 3D relief.",
    postQuote: "Patriots fans! 🏈🔵🔴 Rep your team with a custom handmade Patriots rug. Bring your team pride to your game room, man cave, or office!",
    postUrl: "https://x.com/RugCraftStudio/status/2112956019810959819",
    variants: RUG_SIZES,
  },
  {
    slug: "chicago-bears-roaring-round",
    name: "Chicago Bears Roaring Medallion",
    price: 240,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "4 ft Circular Medallion",
    category: "NFL & Football",
    images: ["/rugs/bears-full.webp", "/rugs/bears-angle.webp", "/rugs/bears-closeup.webp", "/rugs/bears-carve.webp"],
    tag: "Fan Favorite",
    short: "High-relief roaring Grizzly crest framed by deeply sculpted slab-serif CHICAGO BEARS lettering.",
    description:
      "Built in electric tufting-orange, midnight navy, and warm wool white. Look closely at the lettering: each block character is hand-beveled into the surrounding navy pile to cast real architectural shadows across your floor.",
    postQuote: "Chicago Bears 🐻 🧡 Any Bears fans here !? 💨 #ChicagoBears #BearDown #DaBears #NFL #CustomRugs",
    postUrl: "https://x.com/RugCraftStudio/status/2113408075311001885",
    variants: RUG_SIZES,
  },
  {
    slug: "brewers-ball-in-glove-rug",
    name: "Milwaukee Ball-in-Glove Die-Cut",
    price: 210,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "3.5 ft Contour Die-Cut",
    category: "MLB & Diamond",
    images: ["/rugs/brewers-glove.webp", "/rugs/brewers-sketch.webp"],
    tag: "Newest Build",
    short: "The iconic 'mb' mitt silhouette in royal navy and harvest gold with a raised white baseball palm.",
    description:
      "Projected onto stretched monk's cloth, hand-traced in our Georgia workshop, and tufted with dense cut-pile yarn. The golden webbing channels are deeply carved to separate each finger of the mitt.",
    postQuote: "⚾️ Milwaukee Brewers fans, this one’s for you! 💙💛 Handmade with love for the Crew! Would you put this in your game room or fan cave?",
    postUrl: "https://x.com/RugCraftStudio/status/2113857134945317292",
    variants: RUG_SIZES,
  },
  {
    slug: "baltimore-ravens-flock-silhouette",
    name: "Baltimore Ravens Flock Silhouette",
    price: 230,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "4 ft Jagged Feather Die-Cut",
    category: "NFL & Football",
    images: ["/rugs/ravens-studio.webp", "/rugs/ravens-gameroom.webp", "/rugs/ravens-mat.webp", "/rugs/ravens-floor.webp"],
    tag: "Bestseller",
    short: "Royal purple and metallic-gold border die-cut following every jagged feather of the Ravens profile.",
    description:
      "A centerpiece built for dark-mode gaming rooms and purple-and-black fan caves. Features a sculpted gold 'B' emblem, piercing crimson eye detail, and a heavy-duty golden waterfall border.",
    postQuote: "Ravens Flock, this one’s for you! 💜🖤🏈 Custom handmade rugs designed to bring your team pride to life. Perfect for your game room or man cave!",
    postUrl: "https://x.com/RugCraftStudio/status/2112643886078202158",
    variants: RUG_SIZES,
  },
  {
    slug: "philadelphia-eagles-carved-medallion",
    name: "Philly Eagles Midnight Green Round",
    price: 240,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "4 ft Carved Round Rug",
    category: "NFL & Football",
    images: ["/rugs/eagles-carving.webp", "/rugs/macro-carved-pile.webp"],
    tag: "Razor-Carved",
    short: "Midnight green medallion with arched PHILADELPHIA lettering and silver-feathered eagle neck.",
    description:
      "Showcased mid-carve on our studio floor: thick midnight green cut-pile surrounded by a jet-black ring and crisp white divider line, sheared by hand for razor-sharp letter definition.",
    postQuote: "🦅 Fly, Eagles, Fly! 💚🖤 Handmade this Philadelphia Eagles rug for the die-hard fans. Perfect for a game room, man cave, or any Eagles fan’s space.",
    postUrl: "https://x.com/RugCraftStudio/status/2113850924770980124",
    variants: RUG_SIZES,
  },
  {
    slug: "green-bay-packers-g-oval",
    name: "Green Bay Gold-Rimmed 'G' Oval",
    price: 200,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "3.5 ft Classic Oval",
    category: "NFL & Football",
    images: ["/rugs/packers-oval.webp", "/rugs/packers-door.webp"],
    short: "Deep forest green and Lambeau gold oval with a raised, carved white 'G' center and woven studio tag.",
    description:
      "Clean, bold, and built for high-traffic doorways or fan caves. The central white 'G' sits slightly proud of the forest-green field thanks to angled bevel shearing along every curve.",
    postQuote: "💚💛 Green and gold pride, handcrafted to perfection! Packers fans, what are we rating this one from 1-10? Go Pack Go!",
    postUrl: "https://x.com/RugCraftStudio/status/2113832349079351649",
    variants: RUG_SIZES,
  },
  {
    slug: "ny-giants-yankees-liberty-mashup",
    name: "NY Empire Triple-Crown Mashup",
    price: 290,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "4.5 ft Custom Die-Cut Mashup",
    category: "Custom Mashups",
    images: ["/rugs/ny-mashup.webp", "/rugs/patriots-desk.webp"],
    tag: "1-of-1 Mashup",
    short: "Giants 'ny' + Yankees Uncle Sam Top Hat & Bat + Lady Liberty fused into one contour floor piece.",
    description:
      "Why pick one franchise when you rep the whole city? Commissioned as a custom gift, this multi-layered die-cut merges navy-and-red Giants typography, the iconic pinstripe top hat, and Statue of Liberty shading.",
    postQuote: "Made this New York Giants mashup rug for my guy — 100% custom hand-tufted and carved to order.",
    postUrl: "https://x.com/RugCraftStudio/status/2112951206440304670",
    variants: RUG_SIZES,
  },
  {
    slug: "orioles-cartoon-bird-5ft-runner",
    name: "5Ft Birdland Mascot Statement Rug",
    price: 280,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "5 ft XL Statement Build",
    category: "MLB & Diamond",
    images: ["/rugs/orioles-unroll.webp", "/rugs/brewers-glove.webp"],
    tag: "5Ft XL Build",
    short: "Five feet of vibrant orange-and-black mascot energy with commercial-grade grey non-slip felt backing.",
    description:
      "Captured unrolling in the morning sun: five full feet of high-density cut-pile yarn with our signature grey non-slip felt backing and reinforced waterfall edges that stay flat on hardwood.",
    postQuote: "5Ft ATL Custom Rug 🧶 Built for heavy stepping with full non-slip backing.",
    postUrl: "https://x.com/RugCraftStudio/status/2112954946123669756",
    variants: RUG_SIZES,
  },
  {
    slug: "chicago-cubs-bullseye-round",
    name: "Chicago Cubs Wrigley Bullseye",
    price: 215,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "3.5 ft Circular Rug",
    category: "MLB & Diamond",
    images: ["/rugs/cubs-round.webp", "/rugs/brewers-glove.webp"],
    short: "Royal blue, crimson red, and warm cream bullseye with deep-channel carved lettering.",
    description:
      "Every concentric ring on this Cubs medallion is separated by a hand-sheared V-groove so the crimson 'C' and inner lettering stay razor-crisp year after year.",
    postQuote: "Love seeing Cubs fans show their team pride! ⚾🔵🔴 I make handmade Cubs rugs for fans who want something special for their collection or game room.",
    postUrl: "https://x.com/RugCraftStudio/status/2113735598347620474",
    variants: RUG_SIZES,
  },
  {
    slug: "dallas-cowboys-lone-star-cutout",
    name: "Cowboys Nation Five-Point Star",
    price: 225,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "4 ft Point-to-Point Star Cutout",
    category: "NFL & Football",
    images: ["/rugs/cowboys-star.webp", "/rugs/patriots-desk.webp"],
    short: "Geometric 5-point star die-cut in navy, crisp white, black pin-striping, and silver-grey border.",
    description:
      "Sharp geometric points require serious backing discipline. We reinforce all five star tips with folded canvas and high-grip felt so the points never curl.",
    postQuote: "⭐️ How about this for Cowboys Nation? 💙🤍 Handmade this Dallas Cowboys rug for the fans! Perfect for a game room, man cave, or any Cowboys fan’s space.",
    postUrl: "https://x.com/RugCraftStudio/status/2113851729200746878",
    variants: RUG_SIZES,
  },
  {
    slug: "miami-dolphins-sunburst-edition",
    name: "Miami Aqua & Coral Sunburst Rug",
    price: 235,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "4 ft Sunburst Silhouette",
    category: "NFL & Football",
    images: ["/rugs/dolphins-tufting.webp", "/rugs/hero-workshop.webp"],
    short: "Electric coral-orange sunburst spikes and leaping dolphin silhouette, tufted at 2,000 RPM.",
    description:
      "Photographed live on our vertical tufting frame in Georgia as electric orange yarn fills the sunburst rays. Lush, high-contrast, and built to brighten any setup.",
    postQuote: "Dolphins fans, this one’s for you! 🐬🩵🧡 Bring your team pride to life with a custom handmade Miami Dolphins rug!",
    postUrl: "https://x.com/RugCraftStudio/status/2112646925824455147",
    variants: RUG_SIZES,
  },
  {
    slug: "arcade-pro-controller-diecut",
    name: "Player-One Pro Controller Die-Cut",
    price: 210,
    priceLabel: "Custom Quote · Made to Order",
    sizeSpec: "3.5 ft Gaming Setup Rug",
    category: "Gaming & Culture",
    images: ["/rugs/gaming-controller.webp", "/rugs/macro-carved-pile.webp"],
    tag: "Gaming Setup",
    short: "Contoured controller silhouette in espresso navy, tufting orange, and wool cream with raised 3D buttons.",
    description:
      "Designed to sit right under your gaming chair or streaming desk. Raised cut-pile action buttons and D-pad give your feet tactile comfort during marathon sessions.",
    postQuote: "Sports • Gaming • Unique Designs — Made to Order | Open for Commissions",
    postUrl: "https://x.com/RugCraftStudio",
    variants: RUG_SIZES,
  },
];

export const getProduct = (slug?: string) => PRODUCTS.find((p) => p.slug === slug);
export const formatINR = (n: number) => `Custom Quote (Est. $${n}+)`;

export function waProduct(p: Product, opts: { variant?: string; gift?: string } = {}) {
  const v = opts.variant ? ` (${opts.variant})` : ` (${p.sizeSpec})`;
  let t = `Hi RugCraft Studio! 🧶🔥\n\nI'd love to commission / order the "${p.name}"${v}.\nReference link: ${SITE}/product/${p.slug}`;
  if (opts.gift?.trim()) t += `\n\nCustom notes / colors / gift note: "${opts.gift.trim()}"`;
  t += `\n\nCould you let me know pricing and current turnaround time for this build?`;
  return waLink(t, `Commission Inquiry: ${p.name}`);
}

export const MATERIAL_DETAILS = [
  ["Yarn", "Heavyweight 4-ply acrylic & wool-blend rug yarn — dense, colorfast, and ultra-plush underfoot"],
  ["Pile Technique", "High-RPM cut-pile tufting (14–16mm loft) with hand-beveled 3D razor carving between colors"],
  ["Backing", "Commercial-grade synthetic latex lock + thick non-slip felt backing & waterfall yarn edges"],
  ["Origin", "100% handmade to order in Georgia, USA · Ships nationwide across the USA"],
];

export const CARE = [
  "Vacuum gently using suction only (turn off the rotating beater bar) to keep carved channels crisp.",
  "Spot-clean spills immediately by blotting with a damp cloth and mild soap — never machine wash.",
  "Use indoors in game rooms, fan caves, bedrooms, offices, or hang on the wall as 3D textile art.",
];

export type Theme = { id: string; name: string; bg: string; surface: string; text: string; muted: string; accent: string; border: string };
export const THEMES: Theme[] = [
  { id: "espresso", name: "Tufting Espresso", bg: "#120c08", surface: "#1c140e", text: "#f5ead8", muted: "#b5a48e", accent: "#f08a3c", border: "#2e2219" },
  { id: "stadium", name: "Stadium Navy", bg: "#0c1424", surface: "#142038", text: "#f5ead8", muted: "#94a3b8", accent: "#f08a3c", border: "#233554" },
  { id: "canvas", name: "Monk's Cloth Cream", bg: "#f5ead8", surface: "#ebe0cd", text: "#18100a", muted: "#6b5a4c", accent: "#d96318", border: "#d8c8b0" },
  { id: "gridiron", name: "Lambeau Turf", bg: "#0b1d15", surface: "#122b20", text: "#f4efe4", muted: "#9bb3a6", accent: "#f59e0b", border: "#1f4233" },
  { id: "flock", name: "Ravens Midnight", bg: "#130d1e", surface: "#1d152e", text: "#f3eef8", muted: "#a69bb8", accent: "#f59e0b", border: "#31244c" },
];
export const THEME_KEY = "rugcraft-theme";
export function applyTheme(t: Theme) {
  const r = document.documentElement.style;
  const set = (k: string, v: string) => r.setProperty(k, v);
  set("--background", t.bg); set("--card", t.surface); set("--secondary", t.surface); set("--muted", t.surface);
  set("--foreground", t.text); set("--card-foreground", t.text); set("--muted-foreground", t.muted);
  set("--primary", t.accent); set("--primary-foreground", t.bg); set("--border", t.border); set("--ring", t.accent);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t.bg);
}
