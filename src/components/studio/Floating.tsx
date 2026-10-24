import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import {
  THEMES,
  THEME_KEY,
  applyTheme,
  FONT_PAIRINGS,
  FONT_KEY,
  applyFontPairing,
} from "@/lib/studio";

export function FloatingWhatsApp() {
  return (
    <Link
      to="/custom"
      aria-label="Open Custom Rug Commission Wizard"
      className="fab-wa fixed bottom-5 right-5 z-50 flex items-center gap-2 border border-primary bg-primary px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-primary-foreground shadow-lg transition-colors hover:bg-foreground hover:text-background md:px-5"
    >
      <span>Custom Rug</span>
      <span>→</span>
    </Link>
  );
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("obsidian");
  const [activeFont, setActiveFont] = useState("cabinet");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const t = THEMES.find((x) => x.id === savedTheme);
    if (t) {
      applyTheme(t);
      setActiveTheme(t.id);
    }
    const savedFont = localStorage.getItem(FONT_KEY);
    const f = FONT_PAIRINGS.find((x) => x.id === savedFont);
    if (f) {
      applyFontPairing(f);
      setActiveFont(f.id);
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
        <div
          role="dialog"
          aria-label="Studio Theme and Typography Customizer"
          className="theme-fade absolute bottom-14 left-0 w-[20rem] border border-border bg-card p-5 shadow-2xl sm:w-[22rem]"
        >
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="eyebrow">Studio Customizer</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
              Solid Matte UI
            </span>
          </div>

          {/* Color Themes */}
          <div className="mt-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
              Color Palette
            </p>
            <div className="mt-2 grid grid-cols-1 gap-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    applyTheme(t);
                    setActiveTheme(t.id);
                    localStorage.setItem(THEME_KEY, t.id);
                  }}
                  aria-pressed={activeTheme === t.id}
                  className={`flex w-full items-center justify-between border px-3 py-2 text-left text-xs transition-colors ${
                    activeTheme === t.id
                      ? "border-primary bg-background font-semibold text-primary"
                      : "border-transparent text-foreground/85 hover:bg-background"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="inline-block h-4 w-4 shrink-0 border border-border"
                      style={{ backgroundColor: t.bg, boxShadow: `inset -8px 0 0 ${t.accent}` }}
                    />
                    <span>{t.name}</span>
                  </span>
                  {activeTheme === t.id && <Check className="h-3.5 w-3.5 text-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Font Pairings */}
          <div className="mt-4 border-t border-border pt-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
              Typography Pairing
            </p>
            <div className="mt-2 grid grid-cols-1 gap-1">
              {FONT_PAIRINGS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    applyFontPairing(f);
                    setActiveFont(f.id);
                    localStorage.setItem(FONT_KEY, f.id);
                  }}
                  aria-pressed={activeFont === f.id}
                  className={`flex w-full items-center justify-between border px-3 py-2 text-left transition-colors ${
                    activeFont === f.id
                      ? "border-primary bg-background text-primary"
                      : "border-transparent text-foreground/85 hover:bg-background"
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold leading-tight" style={{ fontFamily: f.display }}>
                      {f.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-muted-foreground">
                      {f.tag}
                    </p>
                  </div>
                  {activeFont === f.id && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Customize studio theme and typography"
        aria-expanded={open}
        className="flex h-11 items-center gap-2 border border-border bg-card px-4 font-mono text-xs font-medium uppercase tracking-[0.1em] text-foreground shadow-lg transition-colors hover:border-primary hover:text-primary"
      >
        <span className="inline-block h-2.5 w-2.5 bg-primary" />
        <span>Theme & Fonts</span>
      </button>
    </div>
  );
}
