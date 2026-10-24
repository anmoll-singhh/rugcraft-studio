import type { SVGProps } from "react";

/**
 * 3D Moving Studio Icons — built with volumetric radial/linear specular lighting,
 * extruded depth shadows, and continuous CSS 3D floating/tilting motion.
 */

export function Icon3DBoxStage({
  children,
  className = "h-12 w-12",
  delay = "0s",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`icon-3d-stage relative inline-flex shrink-0 items-center justify-center rounded-2xl border border-primary/35 bg-gradient-to-br from-primary/25 via-card to-background shadow-[0_14px_28px_-8px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.2)] ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
      {children}
    </div>
  );
}

/** 3D Volumetric Yarn Spool with glowing fibers */
export function Icon3DYarnCone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]" {...props}>
      <defs>
        <linearGradient id="yarnBody" x1="10" y1="10" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffb370" />
          <stop offset="50%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="#8c3b08" />
        </linearGradient>
        <linearGradient id="coneTop" x1="18" y1="6" x2="30" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff6ea" />
          <stop offset="100%" stopColor="#cbb69d" />
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="41" rx="15" ry="4" fill="rgba(0,0,0,0.38)" />
      <path d="M20 7h8l2 6H18l2-6z" fill="url(#coneTop)" />
      <path d="M15 13h18l5 25c0 2.5-6.2 4.5-14 4.5S10 40.5 10 38l5-25z" fill="url(#yarnBody)" />
      <path d="M13.5 20c5 3 16 3 21 0M12 27c6 3.5 18 3.5 24 0M11 34c7 3.5 19 3.5 26 0" stroke="rgba(255,245,230,0.55)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M33 34c4 0 7 2.5 8 6" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** 3D Isometric Tufting Gun with reciprocating needle */
export function Icon3DTuftGun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]" {...props}>
      <defs>
        <linearGradient id="gunMetal" x1="6" y1="12" x2="42" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#d8cab8" />
          <stop offset="100%" stopColor="#6e5c4b" />
        </linearGradient>
        <linearGradient id="gunGrip" x1="16" y1="22" x2="30" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffb067" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
      <ellipse cx="24" cy="42" rx="14" ry="3.5" fill="rgba(0,0,0,0.35)" />
      {/* Barrel & Rail */}
      <rect x="7" y="16" width="26" height="8" rx="3" fill="url(#gunMetal)" />
      <path d="M33 18h9v4h-9z" fill="var(--primary)" />
      {/* Needle tip */}
      <path d="M42 20h4" stroke="#fff5e6" strokeWidth="2.4" strokeLinecap="round" />
      {/* Primary & Front Grips */}
      <rect x="20" y="24" width="7" height="14" rx="3" transform="rotate(-12 20 24)" fill="url(#gunGrip)" />
      <rect x="10" y="24" width="5.5" height="11" rx="2.5" fill="url(#gunGrip)" />
      {/* Gear wheel */}
      <circle cx="24" cy="14" r="5" fill="var(--primary)" stroke="#fff5e6" strokeWidth="1.5" />
      <circle cx="24" cy="14" r="1.8" fill="#120c08" />
    </svg>
  );
}

/** 3D Projected Frame & Artwork Blueprint */
export function Icon3DSketchFrame(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]" {...props}>
      <defs>
        <linearGradient id="frameGrad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffba7a" />
          <stop offset="55%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="#7a3205" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="32" height="32" rx="6" fill="url(#frameGrad)" />
      <rect x="12" y="12" width="24" height="24" rx="3.5" fill="#16100b" />
      <path d="M16 28l5-8 5 6 4-5 3 7H16z" fill="var(--primary)" opacity="0.85" />
      <circle cx="20" cy="18" r="2.5" fill="#fff3e0" />
      <path d="M12 20h24M20 12v24" stroke="rgba(255,245,230,0.18)" strokeWidth="1" />
    </svg>
  );
}

/** 3D Electric Carving Shears / Bevel Sculpt */
export function Icon3DRazorShears(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]" {...props}>
      <defs>
        <linearGradient id="bladeGrad" x1="8" y1="8" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#d7c7b6" />
          <stop offset="100%" stopColor="#6c5947" />
        </linearGradient>
      </defs>
      {/* 3D V-groove rug block */}
      <path d="M8 31l16-7 16 7-16 8-16-8z" fill="var(--primary)" />
      <path d="M8 31v5l16 8v-5L8 31z" fill="#8f3f0a" />
      <path d="M40 31v5l-16 8v-5l16-8z" fill="#bf5613" />
      {/* Floating 3D Shears */}
      <path d="M15 11l14 14M33 11L19 25" stroke="url(#bladeGrad)" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="14" cy="10" r="3.5" stroke="#fff5e6" strokeWidth="2.2" fill="var(--primary)" />
      <circle cx="34" cy="10" r="3.5" stroke="#fff5e6" strokeWidth="2.2" fill="var(--primary)" />
    </svg>
  );
}

/** 3D Shipping Roll / Studio Delivery */
export function Icon3DShippingBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]" {...props}>
      <defs>
        <linearGradient id="boxTop" x1="10" y1="8" x2="38" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffbe82" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
      <path d="M24 7L8 15l16 8 16-8L24 7z" fill="url(#boxTop)" />
      <path d="M8 15v17l16 8V23L8 15z" fill="#9c450c" />
      <path d="M40 15v17l-16 8V23l16-8z" fill="#c95d17" />
      <path d="M16 11l16 8v7" stroke="#fff5e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 3D Palette & Typography Sphere for Theme/Font Switcher */
export function Icon3DPaletteOrb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="icon-3d-orb h-6 w-6" {...props}>
      <defs>
        <radialGradient id="orbGlow" cx="32%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#fff7eb" />
          <stop offset="42%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="#5a2304" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="14" fill="url(#orbGlow)" />
      <ellipse cx="20" cy="20" rx="17" ry="6" transform="rotate(-24 20 20)" stroke="var(--foreground)" strokeWidth="1.5" strokeOpacity="0.65" />
      <circle cx="15" cy="15" r="2.2" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

/** 3D Rotating Cube for Custom Builder */
export function Icon3DSparkCube(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="icon-3d-orb h-5 w-5" {...props}>
      <path d="M20 4L6 11.5 20 19l14-7.5L20 4z" fill="#ffe8cf" />
      <path d="M6 11.5v15L20 34V19L6 11.5z" fill="currentColor" opacity="0.85" />
      <path d="M34 11.5v15L20 34V19l14-7.5z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
