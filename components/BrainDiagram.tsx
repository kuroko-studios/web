"use client";
import * as React from "react";

/*
 * The Brain — animated consolidation diagram.
 * Your tools orbit a glowing Brain core; data pulses travel down the
 * connecting lines into it. SVG + rAF, token-coloured, pauses off-screen,
 * static for prefers-reduced-motion. Tool glyphs are deliberately generic
 * (labels carry the names); official brand SVGs can be swapped in later.
 */

const CX = 220;
const CY = 210;
const R = 158; // orbit radius

type Node = { label: string; angle: number; glyph: React.ReactNode };

const glyphProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const NODES: Node[] = [
  {
    label: "Gmail",
    angle: -90,
    glyph: (
      <g {...glyphProps}>
        <rect x="-9" y="-6.5" width="18" height="13" rx="2" />
        <path d="M-9 -4.5 L0 2 L9 -4.5" />
      </g>
    ),
  },
  {
    label: "Calendar",
    angle: -30,
    glyph: (
      <g {...glyphProps}>
        <rect x="-8" y="-7" width="16" height="15" rx="2" />
        <path d="M-8 -2.5 H8 M-4 -9.5 V-5 M4 -9.5 V-5" />
        <path d="M-4 2 H0 M-4 5 H4" />
      </g>
    ),
  },
  {
    label: "Granola",
    angle: 30,
    glyph: (
      <g {...glyphProps}>
        <rect x="-3" y="-9" width="6" height="11" rx="3" />
        <path d="M-7 -1 a7 7 0 0 0 14 0 M0 6 V9" />
      </g>
    ),
  },
  {
    label: "Mem",
    angle: 90,
    glyph: (
      <g {...glyphProps}>
        <path d="M-7 -9 H4 L7 -6 V9 H-7 Z" />
        <path d="M4 -9 V-6 H7 M-3.5 -2 H3.5 M-3.5 2 H3.5 M-3.5 6 H1" />
      </g>
    ),
  },
  {
    label: "Xero",
    angle: 150,
    glyph: (
      <g {...glyphProps}>
        <circle cx="0" cy="0" r="8.5" />
        <path d="M1.5 -4.5 a3 3 0 0 0 -4 3 V1 a3 3 0 0 1 -1.5 3 M-3.5 0.5 H2" />
      </g>
    ),
  },
  {
    label: "Slack",
    angle: 210,
    glyph: (
      <g {...glyphProps}>
        <path d="M-8 -5 a3 3 0 0 1 3 -3 H5 a3 3 0 0 1 3 3 V1 a3 3 0 0 1 -3 3 H-1 L-6 8 V4 H-5 a3 3 0 0 1 -3 -3 Z" />
      </g>
    ),
  },
];

const rad = (deg: number) => (deg * Math.PI) / 180;
// Round to 2dp so server- and client-rendered SVG strings match exactly
// (raw float maths differs in last-digit precision and breaks hydration).
const r2 = (n: number) => Math.round(n * 100) / 100;
const nodePos = (angle: number) => ({
  x: r2(CX + Math.cos(rad(angle)) * R),
  y: r2(CY + Math.sin(rad(angle)) * R),
});

/* Quadratic bezier from node to brain, bowed slightly sideways. */
function linkPath(angle: number) {
  const p = nodePos(angle);
  const perp = rad(angle + 90);
  const bow = 16;
  const c = {
    x: r2((p.x + CX) / 2 + Math.cos(perp) * bow),
    y: r2((p.y + CY) / 2 + Math.sin(perp) * bow),
  };
  return { d: `M ${p.x} ${p.y} Q ${c.x} ${c.y} ${CX} ${CY}`, p, c };
}

const quad = (a: number, c: number, b: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;

export function BrainDiagram() {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const pulseRefs = React.useRef<(SVGCircleElement | null)[]>([]);
  const haloRef = React.useRef<SVGCircleElement>(null);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0.1,
    });
    if (svgRef.current) io.observe(svgRef.current);

    const links = NODES.map((n) => linkPath(n.angle));
    const PERIOD = 2.8; // seconds per pulse journey

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const time = now / 1000;

      links.forEach((l, i) => {
        const el = pulseRefs.current[i];
        if (!el) return;
        const t = ((time / PERIOD + i / NODES.length) % 1 + 1) % 1;
        const x = quad(l.p.x, l.c.x, CX, t);
        const y = quad(l.p.y, l.c.y, CY, t);
        el.setAttribute("cx", String(x));
        el.setAttribute("cy", String(y));
        // Fade in leaving the node, brighten arriving at the brain.
        const fade = t < 0.12 ? t / 0.12 : t > 0.85 ? 0.9 + Math.sin(((t - 0.85) / 0.15) * Math.PI) * 0.4 : 0.9;
        el.setAttribute("opacity", String(Math.min(1.2, fade) * 0.9));
      });

      // Brain breathing.
      if (haloRef.current) {
        const breathe = 1 + 0.06 * Math.sin(time * 1.6);
        haloRef.current.setAttribute("r", String(46 * breathe));
        haloRef.current.setAttribute("opacity", String(0.5 + 0.22 * Math.sin(time * 1.6)));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 440 430"
      className="w-full max-w-[440px] mx-auto"
      role="img"
      aria-label="Your tools — email, calendar, meeting notes, documents, accounts, chat — all feeding one Brain."
    >
      <defs>
        <radialGradient id="brainCore" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="var(--krk-accent-hover)" />
          <stop offset="55%" stopColor="var(--krk-accent-default)" />
          <stop offset="100%" stopColor="var(--krk-accent-pressed)" />
        </radialGradient>
        <radialGradient id="brainHalo">
          <stop offset="0%" stopColor="var(--krk-accent-default)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--krk-accent-default)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Links */}
      {NODES.map((n) => (
        <path
          key={n.label}
          d={linkPath(n.angle).d}
          fill="none"
          stroke="var(--krk-line-strong)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
      ))}

      {/* Travelling pulses */}
      {NODES.map((n, i) => (
        <circle
          key={n.label}
          ref={(el) => {
            pulseRefs.current[i] = el;
          }}
          r="3"
          fill="var(--krk-accent-text)"
          opacity="0"
        />
      ))}

      {/* Brain */}
      <circle ref={haloRef} cx={CX} cy={CY} r="46" fill="url(#brainHalo)" opacity="0.5" />
      <circle cx={CX} cy={CY} r="34" fill="url(#brainCore)" />
      <circle cx={CX} cy={CY} r="34" fill="none" stroke="var(--krk-accent-hover)" strokeOpacity="0.6" />
      {/* simple brain glyph: two hemispheres */}
      <g stroke="var(--krk-text-on-accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.95">
        <path d={`M ${CX - 3} ${CY - 12} a8 8 0 0 0 -8 8 a7 7 0 0 0 1 10 a6 6 0 0 0 7 5 l0 -23`} />
        <path d={`M ${CX + 3} ${CY - 12} a8 8 0 0 1 8 8 a7 7 0 0 1 -1 10 a6 6 0 0 1 -7 5 l0 -23`} />
        <path d={`M ${CX} ${CY - 12} V ${CY + 11}`} strokeOpacity="0.7" />
      </g>
      <text
        x={CX}
        y={CY + 62}
        textAnchor="middle"
        fill="var(--krk-text-primary)"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.12em"
      >
        THE BRAIN
      </text>

      {/* Tool nodes */}
      {NODES.map((n) => {
        const p = nodePos(n.angle);
        const labelBelow = p.y >= CY;
        return (
          <g key={n.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r="26"
              fill="var(--krk-surface-raised)"
              stroke="var(--krk-line-strong)"
            />
            <g transform={`translate(${p.x} ${p.y})`} color="var(--krk-text-secondary)">
              {n.glyph}
            </g>
            <text
              x={p.x}
              y={labelBelow ? p.y + 44 : p.y - 36}
              textAnchor="middle"
              fill="var(--krk-text-muted)"
              fontSize="12"
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
