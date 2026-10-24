import { useEffect, useRef, useState } from "react";
import { gsap } from "./Motion";
import { prefersReduced } from "@/lib/store";
import { IMAGES } from "@/lib/studio";

/** Honest loader: progress tracks the hero image + fonts, capped at ~1.2s, skippable, once per session. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [show] = useState(() => !(prefersReduced() || sessionStorage.getItem("rugcraft-loaded")));
  const done = useRef(false);

  useEffect(() => {
    if (!show) { onDone(); return; }
    const finish = () => {
      if (done.current) return; done.current = true;
      sessionStorage.setItem("rugcraft-loaded", "1");
      const o = { v: 0 };
      gsap.timeline()
        .to(o, { v: 100, duration: 0.22, onUpdate: () => setN((x) => Math.max(x, Math.round(o.v))) })
        .to(".pl-inner", { y: -30, opacity: 0, duration: 0.3, ease: "power2.in" })
        .call(onDone)
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.75, ease: "power4.inOut" }, "<")
        .set(root.current, { display: "none" });
    };
    let p = 0;
    const bump = (v: number) => { p = Math.max(p, v); setN(p); };
    const img = new Image(); img.src = IMAGES.hero;
    const tasks = [img.decode().catch(() => {}).then(() => bump(72)), document.fonts.ready.then(() => bump(45))];
    const tick = setInterval(() => bump(Math.min(p + 9, 92)), 80);
    Promise.all(tasks).then(() => setTimeout(finish, 200));
    const cap = setTimeout(finish, 1200);
    const skip = () => finish();
    window.addEventListener("keydown", skip); window.addEventListener("pointerdown", skip);
    return () => { clearInterval(tick); clearTimeout(cap); window.removeEventListener("keydown", skip); window.removeEventListener("pointerdown", skip); };
  }, [show, onDone]);

  if (!show) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[90] flex items-center justify-center bg-[#120c08] text-[#f5ead8]" style={{ clipPath: "inset(0 0 0 0)" }} role="status" aria-label={`Tufting your floor ${n}%`}>
      <div className="pl-inner flex flex-col items-center px-6 text-center">
        <svg className="h-24 w-48" viewBox="0 0 200 80" aria-hidden>
          <path
            d="M 10 40 Q 32 10, 55 40 T 100 40 T 145 40 T 190 40"
            fill="none"
            stroke="rgba(245,234,216,0.16)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 10 40 Q 32 10, 55 40 T 100 40 T 145 40 T 190 40"
            fill="none"
            stroke="#f08a3c"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="240"
            strokeDashoffset={240 - (240 * n) / 100}
          />
        </svg>
        <p className="eyebrow mt-4">Tufting Your Floor · 2,000 RPM</p>
        <p className="mt-2 font-display text-3xl tracking-wide text-[#f5ead8]">RugCraft Studio · Georgia, USA</p>
      </div>
      <span className="absolute bottom-6 right-8 font-display text-[clamp(4.5rem,14vw,11rem)] leading-none tabular-nums text-[#f08a3c]">{n}%</span>
      <span className="absolute bottom-8 left-8 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[#f5ead8]/60">Tap anywhere to skip</span>
    </div>
  );
}
