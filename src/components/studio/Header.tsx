import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import { X_URL } from "@/lib/studio";
import { XLogoIcon } from "./WhatsAppIcon";
import { useWishlist } from "@/lib/store";

const LINKS = [
  { label: "Recent Drops", to: "/shop" },
  { label: "The Tufting Lab", to: "/#lab" },
  { label: "Custom Builder", to: "/#commission" },
  { label: "Studio Story", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Logo() {
  return (
    <Link to="/" className="flex flex-wrap items-baseline gap-3 leading-none" aria-label="RugCraft Studio home">
      <span className="font-display text-[1.75rem] font-extrabold tracking-[0.02em] text-foreground md:text-[2rem]">RugCraft Studio</span>
      <span className="hidden font-sans text-[0.66rem] font-medium uppercase tracking-[0.14em] text-foreground/75 sm:inline-block">Custom handmade rugs</span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const wish = useWishlist().length;
  useEffect(() => setOpen(false), [loc.pathname, loc.hash]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const solid = scrolled || open || loc.pathname !== "/";
  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-500 ${solid ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent"}`}>
      <nav className={`mx-auto flex max-w-[96rem] items-center justify-between px-6 transition-all duration-500 md:px-12 ${scrolled ? "py-3.5" : "py-6"}`} aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => `text-[0.7rem] font-medium uppercase tracking-[0.13em] transition-colors hover:text-primary ${isActive && !l.to.includes("#") ? "text-primary" : "text-foreground/85"}`}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2.5">
          <Link to="/wishlist" aria-label={`Saved rugs, ${wish} items`} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/60 transition-colors hover:border-primary hover:text-primary">
            <Heart className="h-[17px] w-[17px]" />
            {wish > 0 && <span key={wish} className="pop absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[0.55rem] font-bold text-primary-foreground">{wish}</span>}
          </Link>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="RugCraft Studio on X"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground/80 transition-colors hover:border-primary hover:text-primary sm:flex">
            <XLogoIcon className="h-4 w-4" />
          </a>
          <Link
            to="/#commission"
            className="border border-primary bg-background/90 px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-foreground transition-all hover:bg-primary hover:text-primary-foreground md:px-5 md:py-3"
          >
            Start a commission <span className="ml-1.5 inline-block">→</span>
          </Link>
          <button className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className={`block h-px w-6 bg-foreground transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>
      {open && (
        <div className="menu-in h-[100dvh] overflow-hidden bg-background lg:hidden">
          <ul className="flex flex-col px-6 pt-8">
            {[{ label: "Home", to: "/" }, ...LINKS, { label: "Saved Builds", to: "/wishlist" }].map((l, i) => (
              <li key={l.to} className="fade-in" style={{ animationDelay: `${100 + i * 45}ms`, animationFillMode: "both" }}>
                <Link to={l.to} className="flex items-baseline gap-4 border-b py-4 font-display text-[2.6rem] leading-none active:text-primary">
                  <span className="font-mono text-xs text-primary">0{i + 1}</span>{l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="px-6 pt-8 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Georgia, USA · Hand-Tufted to Order · Ships Nationwide</p>
        </div>
      )}
    </header>
  );
}
