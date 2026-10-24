import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-[92rem] px-6 pb-12 pt-32 md:px-12 md:pb-16 md:pt-40">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display-lg mt-3 max-w-[20ch]">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-muted-foreground">{children}</div>}
    </section>
  );
}
