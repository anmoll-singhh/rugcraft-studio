import { Link } from "react-router-dom";
import { CATEGORIES, EMAIL_ADDRESS, WA_GENERAL, X_HANDLE, X_URL, catSlug } from "@/lib/studio";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-12 text-foreground">
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-display text-2xl font-bold tracking-tight">RugCraft Studio</span>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Bespoke hand-tufted rugs crafted to order in Georgia, USA. Built with heavyweight 4-ply yarn, commercial latex lock, non-slip felt backing, and razor-carved 3D bevels.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/custom" className="btn-gold">
                Start a Commission →
              </Link>
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
                {X_HANDLE} on X
              </a>
            </div>
          </div>

          <nav aria-label="Navigation" className="md:col-span-2 md:col-start-7">
            <p className="eyebrow">Pages</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              <li><Link to="/" className="link-underline">Home</Link></li>
              <li><Link to="/works" className="link-underline">Works</Link></li>
              <li><Link to="/custom" className="link-underline">Custom Rug</Link></li>
              <li><Link to="/about" className="link-underline">About</Link></li>
              <li><Link to="/contact" className="link-underline">Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="Collections" className="md:col-span-2">
            <p className="eyebrow">Categories</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <Link to={`/works?category=${catSlug(c)}`} className="link-underline">{c}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow">Georgia Workshop</p>
            <ul className="mt-3 space-y-2.5 text-sm text-foreground/85">
              <li>
                <a href={WA_GENERAL} className="break-all hover:text-primary underline underline-offset-4">
                  {EMAIL_ADDRESS}
                </a>
              </li>
              <li>
                <a href={X_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary underline underline-offset-4">
                  {X_HANDLE}
                </a>
              </li>
              <li className="pt-1 font-mono text-xs text-muted-foreground">
                Hand-tufted in Georgia, USA<br />Ships nationwide across the US
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground md:flex-row">
          <span>Walls Have Posters. Legends Walk On Art.</span>
          <span>© {new Date().getFullYear()} RugCraft Studio · Georgia, USA</span>
        </div>
      </div>
    </footer>
  );
}
