import { useEffect, useRef, useState } from "react";
import { Palette, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { THEMES, THEME_KEY, applyTheme } from "@/lib/studio";

export function FloatingWhatsApp() {
  return (
    <Link
      to="/#commission"
      aria-label="Design your custom rug commission"
      className="fab-wa fixed bottom-5 right-5 z-50 flex items-center gap-2.5 border border-primary bg-primary px-4 py-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-2xl transition-transform hover:scale-105 md:px-5 md:py-3.5"
    >
      <Sparkles className="h-4 w-4" />
      <span className="hidden sm:inline">Custom Rug Builder</span>
      <span className="sm:hidden">Commission</span>
    </Link>
  );
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("espresso");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const t = THEMES.find((x) => x.id === saved);
    if (t) {
      applyTheme(t);
      setActive(t.id);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="theme-dock fixed bottom-5 left-5 z-50">
      {open && (
        <div role="dialog" aria-label="Choose a studio colour palette" className="theme-fade absolute bottom-14 left-0 w-60 border bg-card p-4 shadow-2xl md:bottom-16">
          <p className="eyebrow mb-3">Yarn Palette</p>
          <ul className="space-y-1">
            {THEMES.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => {
                    applyTheme(t);
                    setActive(t.id);
                    localStorage.setItem(THEME_KEY, t.id);
                  }}
                  aria-pressed={active === t.id}
                  className={`flex w-full items-center gap-3 px-2 py-2 text-left text-sm transition-colors hover:bg-background ${active === t.id ? "bg-background font-medium text-primary" : ""}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${active === t.id ? "border-primary" : "border-border"}`}
                    style={{ background: `linear-gradient(135deg, ${t.bg} 50%, ${t.accent} 50%)` }}
                  >
                    {active === t.id && <Check className="h-3 w-3" style={{ color: t.text }} />}
                  </span>
                  {t.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change studio colour theme"
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 bg-card text-primary shadow-lg transition-transform hover:scale-105 md:h-12 md:w-12"
      >
        <Palette className="h-5 w-5" />
      </button>
    </div>
  );
}
