import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { prefersReduced } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
export let lenis: Lenis | null = null;

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = null; };
  }, []);
  return null;
}

/** Letter-by-letter masked reveal. */
export function SplitText({ text, className = "", delay = 0, as: Tag = "span", trigger = "load" }: { text: string; className?: string; delay?: number; as?: ElementType; trigger?: "load" | "scroll" }) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll(".ch");
      const play = () => gsap.from(chars, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: Math.min(0.025, 0.6 / chars.length), delay });
      if (trigger === "scroll") ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: play }); else play();
    }, el);
    return () => ctx.revert();
  }, [delay, trigger]);
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          {[...w].map((c, j) => <span key={j} className="ch inline-block">{c}</span>)}
          {"\u00A0"}
        </span>
      ))}
    </Tag>
  );
}

/** Scroll-scrubbed word highlight. */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll(".w"), { opacity: 0.12 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);
  return <p ref={ref} className={className}>{text.split(" ").map((w, i) => <span key={i} className="w">{w} </span>)}</p>;
}

/** Image with clip-path reveal + inner parallax. */
export function RevealImage({ src, alt, className = "", imgClass = "", parallax = 12, eager = false }: { src: string; alt: string; className?: string; imgClass?: string; parallax?: number; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out", clearProps: "clipPath" }) });
      gsap.fromTo(el.querySelector("img"), { yPercent: -parallax, scale: 1.25 }, { yPercent: parallax, scale: 1.1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, [parallax]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" className={`h-full w-full object-cover ${imgClass}`} />
    </div>
  );
}

export function Magnetic({ children, strength = 0.2 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || prefersReduced() || !matchMedia("(pointer:fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const move = (e: MouseEvent) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * strength); yTo((e.clientY - r.top - r.height / 2) * strength); };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
  return <span ref={ref} className="inline-block">{children}</span>;
}

export function Marquee({ items, className = "", speed = 40 }: { items: string[]; className?: string; speed?: number }) {
  const row = items.map((t, i) => <span key={i} className="mx-8 inline-flex items-center gap-8">{t}<span className="text-primary">✦</span></span>);
  return (
    <div className={`marquee-wrap overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <div className="marquee inline-flex" style={{ animationDuration: `${speed}s` }}>{row}{row}</div>
    </div>
  );
}

export function Counter({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(prefersReduced() ? to : 0);
  useEffect(() => {
    const el = ref.current; if (!el || prefersReduced()) return;
    const o = { n: 0 };
    const st = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { n: to, duration: 2.2, ease: "power3.out", onUpdate: () => setV(Math.round(o.n)) }) });
    return () => st.kill();
  }, [to]);
  return <span ref={ref} className={className}>{v.toLocaleString("en-IN")}{suffix}</span>;
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches || prefersReduced()) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 }), dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" }), ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const move = (e: MouseEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      setLabel(t?.dataset["cursor"] ?? "");
      ring.current?.classList.toggle("is-hover", !!t);
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <>
      <div ref={dot} className="cursor-dot pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      <div ref={ring} className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 text-[0.55rem] uppercase tracking-[0.12em] text-primary-foreground">
        <span className={`transition-opacity ${label ? "opacity-100" : "opacity-0"}`}>{label}</span>
      </div>
    </>
  );
}
