import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Magnetic } from "./Motion";

export function Btn({ to, href, children, variant = "gold", className = "", onClick }: { to?: string; href?: string; children: ReactNode; variant?: "gold" | "outline"; className?: string; onClick?: () => void }) {
  const cls = `${variant === "gold" ? "btn-gold" : "btn-outline"} ${className}`;
  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;
  const el = to ? <Link to={to} className={cls}>{inner}</Link>
    : href ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <button onClick={onClick} className={cls}>{inner}</button>;
  return className.includes("w-full") ? el : <Magnetic>{el}</Magnetic>;
}
