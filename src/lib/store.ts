import { useSyncExternalStore } from "react";

function makeList(key: string, max = 50) {
  const subs = new Set<() => void>();
  let cache: string[] | null = null;
  const read = (): string[] => {
    if (cache) return cache;
    try { cache = JSON.parse(localStorage.getItem(key) || "[]"); } catch { cache = []; }
    return cache!;
  };
  const write = (v: string[]) => { cache = v.slice(0, max); localStorage.setItem(key, JSON.stringify(cache)); subs.forEach((f) => f()); };
  const subscribe = (f: () => void) => { subs.add(f); return () => subs.delete(f); };
  return { read, write, use: () => useSyncExternalStore(subscribe, read, () => []) };
}

const wish = makeList("rugcraft-wishlist");
export const useWishlist = wish.use;
export const toggleWish = (slug: string) => { const l = wish.read(); wish.write(l.includes(slug) ? l.filter((s) => s !== slug) : [slug, ...l]); };

const recent = makeList("rugcraft-recent", 8);
export const useRecent = recent.use;
export const pushRecent = (slug: string) => recent.write([slug, ...recent.read().filter((s) => s !== slug)]);

export const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
