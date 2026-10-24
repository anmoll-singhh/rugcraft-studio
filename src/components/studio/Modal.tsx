import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { lenis } from "./Motion";

export function Modal({ open, onClose, children, label, wide = false }: { open: boolean; onClose: () => void; children: ReactNode; label: string; wide?: boolean }) {
  const prev = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    prev.current = document.activeElement as HTMLElement;
    lenis?.stop(); document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { lenis?.start(); document.body.style.overflow = ""; window.removeEventListener("keydown", esc); prev.current?.focus(); };
  }, [open, onClose]);
  return createPortal(
    <>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-8">
          <div className="backdrop-in absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
          <div role="dialog" aria-modal="true" aria-label={label} data-lenis-prevent ref={(el) => el?.focus()} tabIndex={-1}
            className={`modal-in relative max-h-[92vh] w-full overflow-y-auto border border-border bg-background outline-none ${wide ? "md:max-w-5xl" : "md:max-w-lg"}`}>
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-border bg-background text-xl leading-none hover:border-primary hover:text-primary">×</button>
            {children}
          </div>
        </div>
      )}
    </>,
    document.body,
  );
}

export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  const rows = [
    ["Small · 2.5 x 2.5 ft", "Desk sidekick, doorway, or wall-hung emblem", "Quote on request"],
    ["Medium · 3.5 x 3.5 ft", "Fan cave chair mat, bedroom accent, or streamer backdrop", "Most Popular"],
    ["Large · 4.5 x 4.5 ft", "Game room centerpiece in front of your couch or TV", "Quote on request"],
    ["XL Trophy · 5 ft+", "Full-scale stadium logo or multi-team mashup build", "Custom Spec"],
  ];
  return (
    <Modal open={open} onClose={onClose} label="Rug size & backing guide">
      <div className="p-8 md:p-10">
        <p className="eyebrow">Rug Size & Placement Guide</p>
        <h2 className="mt-3 font-display text-5xl">Pick Your Footprint</h2>
        <p className="mt-4 text-sm text-muted-foreground">Every RugCraft Studio piece is projected at 1:1 scale on our vertical frame in Georgia, so we can tuft your design to the exact inch your room needs.</p>
        <table className="mt-7 w-full text-left text-sm">
          <thead className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
            <tr><th className="pb-3">Size Tier</th><th className="pb-3">Best For</th><th className="pb-3">Build Tier</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t">
                <td className="py-3 font-medium text-primary">{r[0]}</td>
                <td className="py-3 pr-2 text-muted-foreground">{r[1]}</td>
                <td className="py-3 font-mono text-xs">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 font-mono text-xs text-muted-foreground">Every rug ships with commercial latex lock, heavy non-slip grey felt backing, and razor-carved 3D bevels.</p>
      </div>
    </Modal>
  );
}
