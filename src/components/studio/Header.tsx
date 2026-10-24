import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import { X_URL } from "@/lib/studio";
import { XLogoIcon } from "./WhatsAppIcon";
import { Icon3DYarnCone } from "./Icons3D";
import { useWishlist } from "@/lib/store";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Works", to: "/works" },
  { label: "Custom Rug", to: "/custom" },
  { label: "Craft & Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3 leading-none" aria-label="RugCraft Studio home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/40 bg-card shadow-inner transition-transform duration-300 group-hover:scale-105">
        <Icon3DYarnCone className="h-6 w-6" />
      </span>
      <div className="flex flex-col">
        <span className="font-display text-xl tracking-tight text-foreground md:text-2xl">RugCraft Studio</span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground">Georgia, USA · Bespoke Tufting</span>
      </div>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const wish = useWishlist().length;
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${scrolled || open ? "border-border bg-background/92 backdrop-blur-md" : "border-border/50 bg-background/80 backdrop-blur-sm"}`}>
      <nav className={`mx-auto flex max-w-[92rem] items-center justify-between px-6 transition-all duration-300 md:px-12 ${scrolled ? "py-3.5" : "py-4.5"}`} aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-[0.76rem] font-medium uppercase tracking-[0.11em] transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2.5">
          <Link to="/wishlist" aria-label={`Saved rugs, ${wish} items`} className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-card/60 transition-colors hover:border-primary hover:text-primary">
            <Heart className="h-[17px] w-[17px]" />
            {wish > 0 && <span key={wish} className="pop absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.55rem] font-bold text-primary-foreground">{wish}</span>}
          </Link>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="RugCraft Studio on X"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-card/60 text-foreground/80 transition-colors hover:border-primary hover:text-primary sm:flex">
            <XLogoIcon className="h-4 w-4" />
          </a>
          <Link
            to="/custom"
            className="btn-gold !min-h-[40px] !px-4 !text-[0.68rem]"
          >
            Start Commission
          </Link>
          <button className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-border/80 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className={`block h-px w-5 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>
      {open && (
        <div className="menu-in h-[100dvh] overflow-y-auto bg-background lg:hidden">
          <ul className="flex flex-col px-6 pt-6">
            {[...LINKS, { label: "Saved Builds", to: "/wishlist" }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="flex items-center justify-between border-b border-border/70 py-4 font-display text-3xl tracking-tight hover:text-primary">
                  <span>{l.label}</span>
                  <span className="font-mono text-xs text-primary">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Hand-Tufted in Georgia, USA · Ships Nationwide</p>
          </div>
        </div>
      )}
    </header>
  );
}
