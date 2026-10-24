import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, EMAIL_ADDRESS, WA_GENERAL, X_HANDLE, X_URL, catSlug } from "@/lib/studio";
import { WhatsAppIcon, XLogoIcon } from "./WhatsAppIcon";
import { Icon3DYarnCone } from "./Icons3D";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card pt-20 pb-12 text-foreground">
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/40 bg-background">
                <Icon3DYarnCone className="h-6 w-6" />
              </span>
              <span className="font-display text-2xl tracking-tight">RugCraft Studio</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Bespoke hand-tufted rugs crafted to order in Georgia, USA. Built with heavyweight 4-ply yarn, commercial latex lock, non-slip felt backing, and razor-carved 3D bevels.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/custom" className="btn-gold">
                Custom Commission Builder
              </Link>
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <XLogoIcon className="h-3.5 w-3.5" /> {X_HANDLE} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <nav aria-label="Navigation" className="md:col-span-2 md:col-start-7">
            <p className="eyebrow">Navigation</p>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
              <li><Link to="/" className="link-underline">Home</Link></li>
              <li><Link to="/works" className="link-underline">Works Gallery</Link></li>
              <li><Link to="/custom" className="link-underline">Custom Rug Builder</Link></li>
              <li><Link to="/process" className="link-underline">Craft & Process</Link></li>
              <li><Link to="/contact" className="link-underline">Contact Studio</Link></li>
            </ul>
          </nav>

          <nav aria-label="Collections" className="md:col-span-2">
            <p className="eyebrow">Categories</p>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <Link to={`/works?category=${catSlug(c)}`} className="link-underline">{c}</Link>
                </li>
              ))}
              <li><Link to="/wishlist" className="link-underline">Saved Builds</Link></li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow">Georgia Workshop</p>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li>
                <a href={WA_GENERAL} className="inline-flex items-center gap-2 break-all hover:text-primary">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-primary" /> {EMAIL_ADDRESS}
                </a>
              </li>
              <li>
                <a href={X_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                  <XLogoIcon className="h-4 w-4 shrink-0 text-primary" /> {X_HANDLE}
                </a>
              </li>
              <li className="pt-1 font-mono text-xs text-muted-foreground">
                Hand-tufted in Georgia, USA<br />Ships nationwide across the United States
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border/70 pt-8 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground md:flex-row">
          <span>Walls Have Posters. Legends Walk On Art.</span>
          <span>© {new Date().getFullYear()} RugCraft Studio · Georgia, USA</span>
        </div>
      </div>
    </footer>
  );
}
