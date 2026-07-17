"use client";
import * as React from "react";

/*
 * Scroll-scrubbed layer build.
 * The four-layer architecture assembles as an isometric stack while the
 * visitor scrolls: the Brain lands first (the foundation), then each layer
 * floats in and settles on top. The module list alongside lights up as its
 * layer lands, and in the finale the top layer reveals a dashboard face —
 * the built platform. Pure CSS transforms driven by scroll — no video, no
 * canvas. Respects prefers-reduced-motion (renders the finished stack).
 */

const LAYERS = [
  { name: "The Brain", core: true, desc: "The single place that holds how your business works — knowledge, tone, process, numbers — so AI acts with real context." },
  { name: "The Connections", core: true, desc: "Plugs into the tools you already use, so the data scattered across them flows into one place." },
  { name: "The Workers", core: false, desc: "AI given specific jobs — drafting the quote, chasing the invoice, answering the enquiry — running on their own, around the clock." },
  { name: "The Window", core: false, desc: "One clear view of the whole business, on the screens your team already works in." },
];

const STEP = 0.17; // scrub window per layer
const DUR = 0.2;
const FINALE_FROM = 0.78; // last stretch: the layers become one glowing system
const smooth = (t: number) => t * t * (3 - 2 * t);
const layerT = (p: number, i: number) =>
  smooth(Math.min(1, Math.max(0, (p - i * STEP) / DUR)));
const finaleT = (p: number) =>
  smooth(Math.min(1, Math.max(0, (p - FINALE_FROM) / 0.16)));

export function Layers() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const section = sectionRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      if (reduced) return setProgress(1);
      const rect = section.getBoundingClientRect();
      const runway = section.offsetHeight - window.innerHeight;
      setProgress(runway > 0 ? Math.min(1, Math.max(0, -rect.top / runway)) : 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const settled = progress > (LAYERS.length - 1) * STEP + DUR;
  const activeIdx = Math.min(
    LAYERS.length - 1,
    Math.floor(progress / STEP)
  );
  const ft = finaleT(progress); // 0 → 1 as the stack fuses into one system
  // Finale glow shifts from brand violet to the teal counterpoint.
  const mix = (a: number, b: number) => Math.round(a + (b - a) * ft);
  const glowRgb = `${mix(139, 45)},${mix(92, 212)},${mix(246, 191)}`; // violet → teal

  return (
    <div ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="max-w-[1100px] mx-auto px-5 w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-center">
          {/* The stack */}
          <div className="relative h-[420px] sm:h-[480px] flex items-center justify-center" aria-hidden="true">
            {/* Glow pool under the stack — blooms as the layers fuse */}
            <div
              className="absolute left-1/2 top-[68%] -translate-x-1/2 w-[420px] h-[130px] rounded-[50%]"
              style={{
                background: `radial-gradient(ellipse, rgba(${glowRgb},${0.22 + ft * 0.38}), transparent 70%)`,
                opacity: settled ? 1 : 0.15 + progress * 0.4,
                filter: "blur(6px)",
                transform: `translateX(-50%) scale(${1 + ft * 0.25})`,
              }}
            />
            {LAYERS.map((layer, i) => {
              const t = layerT(progress, i);
              const landed = t > 0.95;
              const isActive = i === activeIdx && !settled;
              // Finale: the stack compresses into one tight, glowing unit.
              const spacing = 44 - 30 * ft;
              const y = (1 - t) * 150 + 90 - i * spacing - ft * 60;
              const fusedBorder = `color-mix(in srgb, var(--krk-accent-tertiary) ${Math.round(
                ft * 100
              )}%, ${layer.core ? "color-mix(in srgb, var(--krk-accent-default) 55%, var(--krk-line-strong))" : "var(--krk-line-strong)"})`;
              return (
                <div
                  key={layer.name}
                  className="absolute left-1/2 top-1/2 w-[290px] h-[290px] sm:w-[330px] sm:h-[330px] rounded-xl border"
                  style={{
                    opacity: t * (settled || isActive || landed ? 1 : 0.9),
                    transform: `translate(-50%, -50%) translateY(${y}px) rotateX(58deg) rotateZ(-45deg)`,
                    background:
                      i === 0
                        ? "linear-gradient(135deg, var(--krk-accent-tint), var(--krk-surface-raised))"
                        : "color-mix(in srgb, var(--krk-surface-raised) 88%, transparent)",
                    borderColor: isActive
                      ? "var(--krk-accent-default)"
                      : fusedBorder,
                    boxShadow: isActive
                      ? "var(--krk-glow-accent-soft)"
                      : ft > 0
                        ? `0 0 ${10 + ft * 34}px rgba(${glowRgb},${ft * 0.4}), 0 18px 40px rgba(0,0,0,${0.35 - ft * 0.15})`
                        : "0 18px 40px rgba(0,0,0,0.35)",
                    backgroundImage:
                      i === 0
                        ? undefined
                        : "repeating-linear-gradient(90deg, transparent 0 46px, color-mix(in srgb, var(--krk-line-default) 55%, transparent) 46px 47px)",
                    transition: "border-color 200ms",
                  }}
                >
                  {/* Finale: the top layer reveals a dashboard face — the built platform */}
                  {i === LAYERS.length - 1 && (
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 w-full h-full p-3"
                      style={{ opacity: ft }}
                    >
                      {/* header bar + traffic dots */}
                      <rect x="4" y="4" width="92" height="10" rx="2" fill="rgba(45,212,191,0.10)" stroke="rgba(45,212,191,0.55)" strokeWidth="0.6" />
                      <circle cx="9" cy="9" r="1.6" fill="rgba(45,212,191,0.9)" />
                      <circle cx="14" cy="9" r="1.6" fill="rgba(45,212,191,0.55)" />
                      <circle cx="19" cy="9" r="1.6" fill="rgba(45,212,191,0.35)" />
                      {/* sidebar */}
                      <rect x="4" y="18" width="20" height="78" rx="2" fill="rgba(45,212,191,0.07)" stroke="rgba(45,212,191,0.35)" strokeWidth="0.5" />
                      <rect x="7" y="23" width="14" height="2.5" rx="1" fill="rgba(45,212,191,0.5)" />
                      <rect x="7" y="30" width="14" height="2.5" rx="1" fill="rgba(45,212,191,0.35)" />
                      <rect x="7" y="37" width="14" height="2.5" rx="1" fill="rgba(45,212,191,0.35)" />
                      {/* rising graph */}
                      <rect x="28" y="18" width="68" height="46" rx="2" fill="rgba(45,212,191,0.05)" stroke="rgba(45,212,191,0.35)" strokeWidth="0.5" />
                      <polyline
                        points="32,56 42,50 52,52 62,42 72,36 82,30 92,24"
                        fill="none"
                        stroke="rgba(45,212,191,0.9)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="92" cy="24" r="2" fill="rgba(45,212,191,1)" />
                      {/* stat tiles */}
                      <rect x="28" y="68" width="20" height="28" rx="2" fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.35)" strokeWidth="0.5" />
                      <rect x="52" y="68" width="20" height="28" rx="2" fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.35)" strokeWidth="0.5" />
                      <rect x="76" y="68" width="20" height="28" rx="2" fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.35)" strokeWidth="0.5" />
                    </svg>
                  )}
                </div>
              );
            })}
            {/* Finale caption: the layers read as one system */}
            <p
              className="absolute left-1/2 -translate-x-1/2 bottom-2 text-center font-bold text-lg whitespace-nowrap"
              style={{ opacity: ft }}
            >
              Four layers. <span className="text-accent-tertiary-text">One system.</span>
            </p>
          </div>

          {/* The list */}
          <div>
            <ol className="space-y-3">
              {LAYERS.map((layer, i) => {
                const lit = layerT(progress, i) > 0.9;
                return (
                  <li
                    key={layer.name}
                    className="transition-all duration-300"
                    style={{ opacity: lit ? 1 : 0.32, transform: lit ? "none" : "translateX(8px)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-accent-text font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-bold">{layer.name}</span>
                      {layer.core && <span className="krk-badge krk-badge--accent">CORE</span>}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mt-1 pl-7">
                      {layer.desc}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p
              className="mt-6 pl-7 font-semibold transition-opacity duration-500"
              style={{ opacity: settled ? 1 : 0 }}
            >
              You start with the core. The rest switches on when you&apos;re ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
