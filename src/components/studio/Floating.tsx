import { useEffect, useRef, useState } from "react";
import { Check, Type } from "lucide-react";
import { Link } from "react-router-dom";
import {
  THEMES,
  THEME_KEY,
  applyTheme,
  FONT_PAIRINGS,
  FONT_KEY,
  applyFontPairing,
} from "@/lib/studio";
import { Icon3DPaletteOrb, Icon3DSparkCube } from "./Icons3D";

export function FloatingWhatsApp() {
  return (
    <Link
      to="/custom"
      aria-label="Open Custom Rug Commission Builder"
      className="fab-wa fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-primary bg-primary px-4 py-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary-foreground shadow-[0_16px_36px_-8px_rgba(0,0,0,0.65)] transition-transform hover:scale-105 md:px-5 md:py-3.5"
    >
      <Icon3DSparkCube />
      <span className="hidden sm:inline">Custom Rug Studio</span>
      <span className="sm:hidden">Custom Rug</span>
    </Link>
  );
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("espresso");
  const [activeFont, setActiveFont] = useState("clash");
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
          className="theme-fade absolute bottom-14 left-0 w-[20rem] rounded-2xl border border-border bg-card/98 p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:w-[22rem] md:bottom-16"
        >
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="eyebrow">Studio Customizer</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">Live Preview</span>
          </div>

          {/* Color Themes */}
          <div className="mt-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">Color Palette</p>
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
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-background/70 ${
                    activeTheme === t.id ? "bg-background font-semibold text-primary" : "text-foreground/85"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        activeTheme === t.id ? "border-primary" : "border-border"
                      }`}
                      style={{ background: `linear-gradient(135deg, ${t.bg} 50%, ${t.accent} 50%)` }}
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
            <p className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
              <Type className="h-3.5 w-3.5 text-primary" /> Typography Pairing
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
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-background/70 ${
                    activeFont === f.id ? "bg-background text-primary" : "text-foreground/85"
                  }`}
                >
                  <div>
                    <p className="text-xs font-medium leading-tight" style={{ fontFamily: f.display }}>
                      {f.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground">
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
        className="flex h-12 items-center gap-2.5 rounded-xl border border-primary/45 bg-card px-3.5 text-foreground shadow-[0_12px_30px_-6px_rgba(0,0,0,0.65)] transition-transform hover:scale-105"
      >
        <Icon3DPaletteOrb />
        <span className="hidden font-mono text-[0.64rem] font-medium uppercase tracking-[0.1em] sm:inline">Theme & Fonts</span>
      </button>
    </div>
  );
}
