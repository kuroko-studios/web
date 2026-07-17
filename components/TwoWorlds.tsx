"use client";
import * as React from "react";

/*
 * Scroll-scrubbed "two worlds" section.
 * The Level 1 card (ask) fills the stage first. As the visitor scrolls,
 * THE JUMP badge pivots the scene and the Level 2 card (do) sweeps over
 * it, its four ✓ jobs landing one by one — the visitor scrolls the work
 * into existence. Respects prefers-reduced-motion (renders the finished
 * state). The dabbler strip + closing line flow after the pinned stage.
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const seg = (p: number, a: number, b: number) => smoothstep(clamp((p - a) / (b - a)));

const TICKS = [
  "Drafted the quote for the Harrison job",
  "Chased two unpaid invoices",
  "Replied to yesterday's enquiry, in your voice",
  "Put the site visit in your calendar",
];

export function TwoWorlds() {
  const ref = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [p, setP] = React.useState(0);
  const [tailGap, setTailGap] = React.useState(0);

  // The sticky stage centres its content, which leaves half the viewport
  // leftover trailing under the card when the section releases. Measure it
  // and pull the following section up, keeping a 40px breather.
  React.useEffect(() => {
    const measure = () => {
      const c = contentRef.current;
      if (c) setTailGap(Math.max(0, (window.innerHeight - c.offsetHeight) / 2 - 40));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  React.useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const runway = el.offsetHeight - window.innerHeight;
      setP(runway > 0 ? clamp(-rect.top / runway) : 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const level1Out = seg(p, 0.3, 0.44); // ask-card recedes
  const jump = seg(p, 0.22, 0.32) * (1 - seg(p, 0.46, 0.56)); // badge in, then out
  const level2In = seg(p, 0.4, 0.54); // do-card sweeps over
  const footer = seg(p, 0.86, 0.94);
  const tick = (i: number) => seg(p, 0.56 + i * 0.08, 0.63 + i * 0.08);

  return (
    <section
      id="two-worlds"
      ref={ref}
      className="relative h-[280vh]"
      style={{ marginBottom: tailGap ? -tailGap : undefined }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div ref={contentRef} className="max-w-[1100px] w-full mx-auto px-5">
          <p className="krk-section-label mb-3 !text-accent-tertiary-text">SOUND FAMILIAR?</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            You&apos;re using AI like a search engine.
          </h2>
          <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
            You ask, it answers, you still do the work. That&apos;s Level 1 — and it&apos;s
            where almost everyone is stuck.
          </p>

          {/* The stage: both cards share one slot; Level 2 replaces Level 1. */}
          <div className="relative max-w-[640px] mx-auto mt-10 grid">
            {/* Level 1 — you ask */}
            <div
              className="col-start-1 row-start-1 krk-card p-7 !bg-surface-base"
              style={{
                opacity: 1 - level1Out * 0.9,
                transform: `scale(${1 - level1Out * 0.06})`,
              }}
            >
              <p className="krk-section-label mb-4">LEVEL 1 · YOU ASK</p>
              <h3 className="text-2xl font-bold mb-5">You ask.</h3>
              <div className="rounded-lg border border-line bg-surface-page p-4 text-sm space-y-3">
                <p className="text-text-secondary">
                  <span className="text-text-muted">You:</span> “How do I get more leads?”
                </p>
                <p className="text-text-primary bg-surface-raised rounded-md px-3 py-2">
                  Here are 10 ideas to try…
                </p>
              </div>
              <p className="text-text-secondary mt-5">
                Helpful. But every bit of the work is still yours.
              </p>
            </div>

            {/* Level 2 — AI does; sweeps over the ask-card */}
            <div
              className="col-start-1 row-start-1 relative z-10 krk-card p-7 border-[color:var(--krk-accent-default)]"
              style={{
                opacity: level2In,
                transform: `translateY(${(1 - level2In) * 56}px)`,
                boxShadow: level2In > 0.5 ? "var(--krk-glow-accent-soft)" : "none",
                pointerEvents: level2In > 0.5 ? "auto" : "none",
              }}
            >
              <p className="krk-section-label !text-accent-text mb-4">LEVEL 2 · AI DOES</p>
              <h3 className="text-2xl font-bold mb-5">AI does.</h3>
              <div className="rounded-lg border border-line bg-surface-page p-4 text-sm font-mono space-y-2">
                <p className="text-accent-text">you: start my week</p>
                {TICKS.map((t, i) => (
                  <p
                    key={t}
                    className="text-text-primary"
                    style={{
                      opacity: tick(i),
                      transform: `translateX(${(1 - tick(i)) * 14}px)`,
                    }}
                  >
                    ✓ {t}
                  </p>
                ))}
              </div>
              <p className="text-text-secondary mt-5" style={{ opacity: footer }}>
                One instruction. Four jobs done — waiting for your sign-off.
              </p>
            </div>

            {/* THE JUMP — pivots the scene between the two cards */}
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-center pointer-events-none"
              style={{ opacity: jump }}
            >
              <span
                className="krk-badge krk-badge--accent !text-sm !px-5 !py-3 font-bold tracking-widest"
                style={{ boxShadow: "var(--krk-glow-accent)" }}
              >
                THE JUMP →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
