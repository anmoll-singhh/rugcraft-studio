import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { X_URL } from "@/lib/studio";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Works", to: "/works" },
  { label: "Custom Rug", to: "/custom" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-baseline gap-3 leading-none" aria-label="RugCraft Studio home">
      <span className={`font-display text-2xl tracking-tight md:text-3xl ${light ? "text-[#F4EFE6]" : "text-foreground"}`}>
        RugCraft Studio
      </span>
      <span className={`hidden text-sm sm:inline ${light ? "text-[#F4EFE6]/70" : "text-muted-foreground"}`}>
        Custom handmade rugs
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const overHero = loc.pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b ${
        overHero ? "border-[#F4EFE6]/15 bg-[#16120E]/80" : "border-border bg-background"
      }`}
    >
      <nav className="mx-auto flex max-w-[96rem] items-center justify-between px-5 py-3 md:px-10" aria-label="Main">
        <Logo light={overHero} />

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-base hover:text-primary ${isActive ? "text-primary" : overHero ? "text-[#F4EFE6]" : "text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link to="/custom" className="btn-gold !min-h-10 !px-4">
            Start a commission
          </Link>
        </div>

        <button
          type="button"
          className={`flex h-11 w-11 flex-col items-center justify-center gap-1.5 border md:hidden ${
            overHero ? "border-[#F4EFE6]/30" : "border-border bg-card"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-px w-5 ${open ? "translate-y-[3.5px] rotate-45" : ""} ${overHero ? "bg-[#F4EFE6]" : "bg-foreground"}`} />
          <span className={`block h-px w-5 ${open ? "-translate-y-[3.5px] -rotate-45" : ""} ${overHero ? "bg-[#F4EFE6]" : "bg-foreground"}`} />
        </button>
      </nav>

      {open && (
        <div className="menu-in h-[100dvh] overflow-y-auto border-t border-border bg-background md:hidden">
          <ul className="flex flex-col px-5 pt-4">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="block border-b border-border py-4 font-display text-4xl text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="px-5 pt-6 text-sm text-muted-foreground">
            Georgia, USA · Hand-tufted to order ·{" "}
            <a href={X_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
              @RugCraftStudio
            </a>
          </p>
        </div>
      )}
    </header>
  );
}
