import * as React from "react";

/*
 * The Blueprint — an architect's drawing of the four-layer system.
 * Gridded sheet, corner register marks, the stack drawn as dashed
 * "to-build" outlines with numbered leader lines, and a title block.
 * Token-coloured SVG in the same family as BrainDiagram and the Layers
 * stack. Stylised motion: the dashed outlines march (the plan being
 * drawn), the stack breathes a teal glow, the leader dots pulse.
 * All CSS-driven; disabled under prefers-reduced-motion.
 */

const CX = 175; // stack centre x
const W = 210; // diamond width
const H = 104; // diamond height
const YS = [122, 184, 246, 308]; // top → bottom layer centres

const PLAN = [
  { num: "04", label: "THE WINDOW" },
  { num: "03", label: "THE WORKERS" },
  { num: "02", label: "THE CONNECTIONS" },
  { num: "01", label: "THE BRAIN", core: true },
];

const diamond = (y: number) =>
  `M ${CX} ${y - H / 2} L ${CX + W / 2} ${y} L ${CX} ${y + H / 2} L ${CX - W / 2} ${y} Z`;

export function BlueprintDiagram() {
  return (
    <svg
      viewBox="0 0 440 430"
      className="w-full max-w-[440px] mx-auto"
      role="img"
      aria-label="The Blueprint: a technical drawing of the four layers — Brain, Connections, Workers, Window — mapped before anything is built."
    >
      <style>{`
        @keyframes bpDash { to { stroke-dashoffset: -18; } }
        @keyframes bpGlow {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(45, 212, 191, 0.15)); }
          50% { filter: drop-shadow(0 0 12px rgba(45, 212, 191, 0.5)); }
        }
        @keyframes bpDot {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        .bp-dash { animation: bpDash 2.8s linear infinite; }
        .bp-stack { animation: bpGlow 3.6s ease-in-out infinite; }
        .bp-dot { animation: bpDot 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bp-dash, .bp-stack, .bp-dot { animation: none; }
        }
      `}</style>
      <defs>
        <pattern id="bpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="var(--krk-line-default)"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </pattern>
      </defs>

      {/* The sheet */}
      <rect
        x="14"
        y="14"
        width="412"
        height="402"
        rx="12"
        fill="color-mix(in srgb, var(--krk-accent-tint) 40%, var(--krk-surface-raised))"
        stroke="var(--krk-line-strong)"
      />
      <rect x="14" y="14" width="412" height="402" rx="12" fill="url(#bpGrid)" />

      {/* Corner register marks */}
      {[
        [34, 34],
        [406, 34],
        [34, 396],
        [406, 396],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M ${x - 6} ${y} H ${x + 6} M ${x} ${y - 6} V ${y + 6}`}
          stroke="var(--krk-text-muted)"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}

      {/* Sheet heading */}
      <text
        x="34"
        y="58"
        fill="var(--krk-accent-tertiary-text)"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.14em"
      >
        THE BLUEPRINT
      </text>
      <text x="34" y="76" fill="var(--krk-text-muted)" fontSize="10" letterSpacing="0.06em">
        DRG № 001 · MAPPED BEFORE BUILT
      </text>

      {/* The stack, drawn bottom-up so upper layers overlap correctly */}
      <g className="bp-stack">
        {[...PLAN].reverse().map((layer, idx) => {
          const y = YS[PLAN.length - 1 - idx];
          return (
            <path
              key={layer.num}
              className={layer.core ? undefined : "bp-dash"}
              d={diamond(y)}
              fill={
                layer.core
                  ? "color-mix(in srgb, var(--krk-accent-tint) 70%, transparent)"
                  : "color-mix(in srgb, var(--krk-surface-raised) 55%, transparent)"
              }
              stroke={layer.core ? "var(--krk-accent-default)" : "var(--krk-accent-text)"}
              strokeWidth={layer.core ? 1.6 : 1.1}
              strokeDasharray={layer.core ? undefined : "5 4"}
            />
          );
        })}
      </g>

      {/* Leader lines + labels */}
      {PLAN.map((layer, i) => {
        const y = YS[i];
        const tipX = CX + W / 2;
        const elbowX = tipX + 18;
        return (
          <g key={layer.num}>
            <path
              d={`M ${tipX + 4} ${y} H ${elbowX}`}
              stroke="var(--krk-text-muted)"
              strokeWidth="1"
              opacity="0.7"
            />
            <circle
              className="bp-dot"
              cx={tipX + 4}
              cy={y}
              r="2"
              fill="var(--krk-accent-tertiary-text)"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
            <text
              x={elbowX + 6}
              y={y - 2}
              fill="var(--krk-accent-text)"
              fontSize="11"
              fontFamily="var(--krk-font-mono, monospace)"
            >
              {layer.num}
            </text>
            <text
              x={elbowX + 6}
              y={y + 11}
              fill="var(--krk-text-secondary)"
              fontSize="10.5"
              fontWeight="700"
              letterSpacing="0.08em"
            >
              {layer.label}
            </text>
            {layer.core && (
              <text
                x={elbowX + 6}
                y={y + 24}
                fill="var(--krk-accent-tertiary-text)"
                fontSize="9"
                fontWeight="700"
                letterSpacing="0.12em"
              >
                CORE
              </text>
            )}
          </g>
        );
      })}

      {/* Dimension line down the left of the stack */}
      <path
        d={`M ${CX - W / 2 - 22} ${YS[0] - H / 2} V ${YS[3] + H / 2}`}
        stroke="var(--krk-text-muted)"
        strokeWidth="1"
        opacity="0.55"
      />
      {[YS[0] - H / 2, YS[3] + H / 2].map((y) => (
        <path
          key={y}
          d={`M ${CX - W / 2 - 27} ${y} h 10`}
          stroke="var(--krk-text-muted)"
          strokeWidth="1"
          opacity="0.55"
        />
      ))}
      <text
        x={CX - W / 2 - 32}
        y={(YS[0] + YS[3]) / 2}
        fill="var(--krk-text-muted)"
        fontSize="9.5"
        letterSpacing="0.1em"
        textAnchor="middle"
        transform={`rotate(-90 ${CX - W / 2 - 32} ${(YS[0] + YS[3]) / 2})`}
      >
        SWITCHED ON IN ORDER
      </text>

      {/* Title block */}
      <g>
        <rect
          x="252"
          y="356"
          width="154"
          height="40"
          rx="6"
          fill="color-mix(in srgb, var(--krk-surface-raised) 80%, transparent)"
          stroke="var(--krk-line-strong)"
        />
        <text x="264" y="372" fill="var(--krk-text-secondary)" fontSize="10" fontWeight="700" letterSpacing="0.1em">
          KUROKO · AI BLUEPRINT
        </text>
        <text x="264" y="387" fill="var(--krk-accent-tertiary-text)" fontSize="9" letterSpacing="0.08em">
          FEE CREDITED ON BUILD
        </text>
      </g>
    </svg>
  );
}
