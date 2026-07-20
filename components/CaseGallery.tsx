"use client";
import * as React from "react";

/*
 * Sideways-scrolling gallery for the case-study interface shots.
 * Snap-scrolls natively; round arrow buttons nudge one card at a time
 * and appear only when there's more to see in that direction. A soft
 * edge fade hints at the off-screen card; frames carry a subtle teal
 * glow (the brand's "finished system" colour).
 */

type Shot = { src: string; caption: string };

const FRAME_GLOW = {
  boxShadow: "0 0 30px rgba(45, 212, 191, 0.16), 0 0 8px rgba(45, 212, 191, 0.10)",
  borderColor: "color-mix(in srgb, var(--krk-accent-tertiary) 35%, var(--krk-line-strong))",
};

export function CaseGallery({ shots }: { shots: Shot[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current!;
    const update = () => {
      setCanLeft(el.scrollLeft > 8);
      setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current!;
    const start = el.scrollLeft;
    const target = start + dir * 540;
    el.scrollTo({ left: target, behavior: "smooth" });
    // Environments without smooth programmatic scrolling (incl. reduced
    // motion) get an instant jump instead of a dead button.
    window.setTimeout(() => {
      if (Math.abs(el.scrollLeft - start) < 8) el.scrollLeft = target;
    }, 220);
  };

  const arrowClass =
    "absolute top-[42%] -translate-y-1/2 z-10 w-11 h-11 rounded-pill flex items-center justify-center transition-opacity";
  const arrowStyle = (visible: boolean): React.CSSProperties => ({
    background: "var(--krk-accent-tertiary)",
    boxShadow: "0 0 22px rgba(45, 212, 191, 0.45)",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
  });
  const ArrowGlyph = ({ flip }: { flip?: boolean }) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M3 9h11M9.5 4.5 14 9l-4.5 4.5"
        stroke="#071310"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5"
      >
        {shots.map(({ src, caption }) => (
          <figure
            key={src}
            className="krk-card shrink-0 snap-center w-[85%] sm:w-[520px] overflow-hidden"
            style={FRAME_GLOW}
          >
            {/* Fake browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line bg-surface-base">
              <span className="w-2 h-2 rounded-pill bg-accent-default opacity-70" />
              <span className="w-2 h-2 rounded-pill bg-accent-default opacity-40" />
              <span className="w-2 h-2 rounded-pill bg-accent-default opacity-20" />
              <span className="krk-section-label !text-[10px] ml-2 !text-text-muted">
                MISSION CONTROL
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={caption} loading="lazy" className="aspect-video w-full" />
            <figcaption className="px-4 py-3 text-sm text-text-secondary border-t border-line">
              {caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Edge fade hinting at the off-screen card */}
      <div
        className="absolute inset-y-0 right-[-20px] w-24 pointer-events-none"
        style={{
          background: "linear-gradient(to left, var(--krk-surface-page), transparent)",
          opacity: canRight ? 1 : 0,
          transition: "opacity 300ms",
        }}
      />

      <button
        type="button"
        aria-label="Scroll the gallery right"
        onClick={() => nudge(1)}
        className={`${arrowClass} right-[-8px] sm:right-2`}
        style={arrowStyle(canRight)}
      >
        <ArrowGlyph />
      </button>
      <button
        type="button"
        aria-label="Scroll the gallery left"
        onClick={() => nudge(-1)}
        className={`${arrowClass} left-[-8px] sm:left-2`}
        style={arrowStyle(canLeft)}
      >
        <ArrowGlyph flip />
      </button>
    </div>
  );
}
