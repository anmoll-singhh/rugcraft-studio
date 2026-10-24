import type { ReactNode } from "react";
import { SplitText } from "@/components/studio/Motion";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-[96rem] px-6 pb-14 pt-36 md:px-12 md:pb-20 md:pt-48">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display-lg mt-5 max-w-[16ch]"><SplitText key={title} text={title} /></h1>
      {children && <div className="mt-8 max-w-xl text-muted-foreground">{children}</div>}
    </section>
  );
}
