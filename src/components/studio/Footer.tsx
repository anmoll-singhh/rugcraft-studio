import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, EMAIL_ADDRESS, WA_GENERAL, X_HANDLE, X_URL, catSlug } from "@/lib/studio";
import { WhatsAppIcon, XLogoIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card pt-24 text-foreground">
      <div className="mx-auto max-w-[96rem] px-6 md:px-12">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow">Ready When You Are · Georgia, USA</p>
            <h2 className="mt-4 font-display text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.88]">
              LET’S TUFT <em className="text-primary">SOMETHING.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">
              Every RugCraft Studio piece starts with a conversation. Send us your team logo, gaming emblem, pet portrait, or wild mashup idea—we’ll sketch the mockup and hand-tuft it to order.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={WA_GENERAL} className="btn-gold">
                <WhatsAppIcon className="h-4 w-4" /> Email {EMAIL_ADDRESS}
              </a>
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <XLogoIcon className="h-4 w-4" /> DM {X_HANDLE} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <nav aria-label="Collections" className="md:col-span-2 md:col-start-8">
            <p className="eyebrow">Collections</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li><Link to="/shop" className="link-underline">All Custom Builds</Link></li>
              {CATEGORIES.map((c) => <li key={c}><Link to={`/collections/${catSlug(c)}`} className="link-underline">{c}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Studio" className="md:col-span-2">
            <p className="eyebrow">Studio</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li><Link to="/#commission" className="link-underline">Custom Rug Builder</Link></li>
              <li><Link to="/#lab" className="link-underline">The Tufting Lab</Link></li>
              <li><Link to="/about" className="link-underline">Studio Story</Link></li>
              <li><Link to="/contact" className="link-underline">Contact & FAQ</Link></li>
              <li><Link to="/wishlist" className="link-underline">Saved Builds</Link></li>
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="eyebrow">Direct Line</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li>
                <a href={`mailto:${EMAIL_ADDRESS}`} className="inline-flex items-center gap-2 break-all hover:text-primary">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-primary" /> {EMAIL_ADDRESS}
                </a>
              </li>
              <li>
                <a href={X_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                  <XLogoIcon className="h-4 w-4 shrink-0 text-primary" /> {X_HANDLE}
                </a>
              </li>
              <li className="pt-2 font-mono text-xs text-muted-foreground">
                📍 Hand-tufted in Georgia, USA<br />📦 Ships nationwide across the US
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-[96rem] flex-col justify-between gap-2 border-t border-border/60 px-6 pt-8 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground md:flex-row md:px-12">
        <span>Walls Have Posters. Legends Walk On Art.</span>
        <span>© {new Date().getFullYear()} RugCraft Studio · Custom Handmade Rugs · Georgia, USA</span>
      </div>
      <p aria-hidden className="-mb-[0.14em] mt-6 select-none text-center font-display text-[21vw] font-black leading-[0.8] tracking-[-0.04em] text-primary/20">
        RUGCRAFT
      </p>
    </footer>
  );
}
