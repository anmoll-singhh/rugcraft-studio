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

export function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-3 leading-none" aria-label="RugCraft Studio home">
      <span className="font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
        RugCraft Studio
      </span>
      <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground sm:inline-block">
        Custom Handmade Rugs
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200 ${
        scrolled || open || loc.pathname !== "/"
          ? "border-border bg-background"
          : "border-white/15 bg-[#0E0D0C]/85"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[92rem] items-center justify-between px-6 py-4 md:px-12"
        aria-label="Main"
      >
        <Logo />

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/85"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA ONLY — hidden on mobile so mobile header is strictly Brand + Hamburger */}
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/custom" className="btn-gold !min-h-[40px] !px-4 !text-xs">
            Start a Commission →
          </Link>
        </div>

        {/* Mobile Hamburger Toggle ONLY */}
        <button
          type="button"
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-border bg-card md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-px w-5 bg-foreground transition-transform duration-200 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-transform duration-200 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="menu-in h-[100dvh] overflow-y-auto border-t border-border bg-background md:hidden">
          <ul className="flex flex-col px-6 pt-6">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="flex items-center justify-between border-b border-border py-4 font-display text-2xl tracking-tight text-foreground hover:text-primary"
                >
                  <span>{l.label}</span>
                  <span className="font-mono text-xs text-primary">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pt-8">
            <Link to="/custom" className="btn-gold w-full">
              Start a Commission →
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Georgia, USA · Hand-Tufted to Order ·{" "}
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                @RugCraftStudio
              </a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
