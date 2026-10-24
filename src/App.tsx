import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "@/components/studio/Header";
import { Footer } from "@/components/studio/Footer";
import { Preloader } from "@/components/studio/Preloader";
import { Cursor, SmoothScroll, ScrollTrigger, gsap, lenis } from "@/components/studio/Motion";
import { prefersReduced } from "@/lib/store";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductPage from "@/pages/Product";
import Collection from "@/pages/Collection";
import Custom from "@/pages/Custom";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Wishlist from "@/pages/Wishlist";
import NotFound from "@/pages/NotFound";

function useCurtain() {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const curtain = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (location.pathname === shown.pathname) { setShown(location); return; }
    if (prefersReduced() || first.current) { first.current = false; setShown(location); return; }
    const el = curtain.current!;
    const tl = gsap.timeline();
    tl.set(el, { display: "flex", clipPath: "inset(100% 0% 0% 0%)" })
      .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power4.inOut" })
      .call(() => setShown(location))
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.45, ease: "power4.inOut", delay: 0.04 })
      .set(el, { display: "none" });
    return () => { tl.progress(1); };
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { first.current = false; }, []);
  return { shown, curtain };
}

function ScrollManager({ pathname, hash }: { pathname: string; hash: string }) {
  useLayoutEffect(() => {
    if (hash) {
      const t = setTimeout(() => { const el = document.getElementById(hash.slice(1)); if (el) lenis ? lenis.scrollTo(el, { offset: -20 }) : el.scrollIntoView(); }, 150);
      return () => clearTimeout(t);
    }
    lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    const r = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(r);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  const { shown, curtain } = useCurtain();
  useEffect(() => { const imgs = document.images; const f = () => ScrollTrigger.refresh(); for (const i of imgs) if (!i.complete) i.addEventListener("load", f, { once: true }); }, [shown.pathname]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground">Skip to content</a>
      <Preloader onDone={onDone} />
      <SmoothScroll />
      <Cursor />
      <Header />
      <ScrollManager pathname={shown.pathname} hash={shown.hash} />
      <main id="main" key={shown.pathname}>
        <Routes location={shown}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/gallery" element={<Shop />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/about" element={<About />} />
          <Route path="/process" element={<About />} />
          <Route path="/rug/:slug" element={<ProductPage />} />
          <Route path="/works/:slug" element={<ProductPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/collections/:category" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <div ref={curtain} aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden items-center justify-center bg-primary">
        <span className="font-display text-4xl font-bold tracking-tight text-primary-foreground">RugCraft Studio</span>
      </div>
    </>
  );
}
