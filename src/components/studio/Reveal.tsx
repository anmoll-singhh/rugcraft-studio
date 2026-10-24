import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "./Motion";

/** Visible by default. The y-settle start state is set by JS in the same frame its tween starts. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({ trigger: el, start: "top 92%", once: true,
        onEnter: () => gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: delay / 1000, ease: "power3.out", clearProps: "transform,opacity" }) });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
