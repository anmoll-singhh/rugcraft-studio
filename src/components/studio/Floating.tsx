import { useEffect, useRef, useState } from "react";
import {
  FONT_KEY,
  FONT_PAIRINGS,
  THEME_KEY,
  THEMES,
  applyFontPairing,
  applyTheme,
} from "@/lib/studio";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("cloth");
  const [activeFont, setActiveFont] = useState("shoulders");
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
    <div ref={ref} className="fixed bottom-4 left-4 z-50">
      {open && (
        <div
          role="dialog"
          aria-label="Theme and type"
          className="absolute bottom-14 left-0 w-[19rem] border border-border bg-card p-4 shadow-xl"
        >
          <p className="text-sm font-semibold">Theme and type</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Color</p>
          <div className="mt-2 grid gap-1">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={activeTheme === t.id}
                onClick={() => {
                  applyTheme(t);
                  setActiveTheme(t.id);
                  localStorage.setItem(THEME_KEY, t.id);
                }}
                className={`flex items-center justify-between px-2 py-2 text-left text-sm ${
                  activeTheme === t.id ? "bg-background text-primary" : "hover:bg-background"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 border border-border" style={{ background: t.bg, boxShadow: `inset -7px 0 0 ${t.accent}` }} />
                  {t.name}
                </span>
                {activeTheme === t.id && <span>On</span>}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Type</p>
          <div className="mt-2 grid gap-1">
            {FONT_PAIRINGS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={activeFont === f.id}
                onClick={() => {
                  applyFontPairing(f);
                  setActiveFont(f.id);
                  localStorage.setItem(FONT_KEY, f.id);
                }}
                className={`px-2 py-2 text-left ${activeFont === f.id ? "bg-background text-primary" : "hover:bg-background"}`}
              >
                <span className="block text-sm font-semibold" style={{ fontFamily: f.display }}>{f.name}</span>
                <span className="text-xs text-muted-foreground">{f.tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Change theme and font"
        className="border border-border bg-card px-4 py-3 text-sm font-semibold shadow-lg hover:border-primary hover:text-primary"
      >
        Theme & type
      </button>
    </div>
  );
}
