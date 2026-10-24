import { useEffect } from "react";

const SITE = "https://rugcraft-studio.vercel.app";
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
export function useSeo({ title, description, image }: { title: string; description: string; image?: string }) {
  useEffect(() => {
    const full = title.includes("RugCraft") ? title : `${title} — RugCraft Studio`;
    document.title = full;
    const url = SITE + window.location.pathname;
    const img = image ? new URL(image, SITE).href : `${SITE}/og.jpg`;
    setMeta("name", "description", description);
    setMeta("property", "og:title", full); setMeta("property", "og:description", description);
    setMeta("property", "og:url", url); setMeta("property", "og:image", img);
    setMeta("name", "twitter:title", full); setMeta("name", "twitter:description", description); setMeta("name", "twitter:image", img);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = url;
  }, [title, description, image]);
}
