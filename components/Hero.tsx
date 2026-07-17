"use client";
import * as React from "react";

/*
 * Cinematic scroll-scrubbed hero.
 * Thousands of glowing particles swirl in a dark void and, as the visitor
 * scrolls, assemble into a floating dashboard wireframe with a rising graph
 * that pulses like a heartbeat. Real-time canvas (no video): crisp at any
 * size, tiny payload, perfectly scrubbable, coloured live from the design
 * tokens. Respects prefers-reduced-motion (renders the assembled state).
 */

type Particle = {
  sx: number; // scatter position (normalised -1..1 space, will swirl)
  sy: number;
  angle: number; // swirl phase
  radius: number; // swirl radius
  speed: number; // swirl speed
  tx: number; // target position (0..1 dashboard space)
  ty: number;
  delay: number; // assembly stagger 0..0.35
  size: number;
  color: number; // 0 = violet, 1 = blue, 2 = fog
  pulse: boolean; // particle belongs to the graph line (heartbeat)
};

/* Sample points along the dashboard wireframe (0..1 space, 16:10-ish). */
function dashboardPoints(): { x: number; y: number; pulse: boolean }[] {
  const pts: { x: number; y: number; pulse: boolean }[] = [];
  const push = (x: number, y: number, pulse = false) => pts.push({ x, y, pulse });

  // Frame (rounded rect outline)
  const N = 320;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const p = t * 4;
    if (p < 1) push(p, 0);
    else if (p < 2) push(1, p - 1);
    else if (p < 3) push(3 - p, 1);
    else push(0, 4 - p);
  }
  // Header divider + fake traffic dots
  for (let i = 0; i < 60; i++) push(0.03 + (i / 60) * 0.94, 0.12);
  push(0.05, 0.06); push(0.08, 0.06); push(0.11, 0.06);
  // Sidebar
  for (let i = 0; i < 50; i++) push(0.22, 0.12 + (i / 50) * 0.88);
  for (let r = 0; r < 4; r++)
    for (let i = 0; i < 22; i++) push(0.04 + (i / 22) * 0.14, 0.22 + r * 0.16);
  // Bar chart (left panel)
  const bars = [0.28, 0.45, 0.38, 0.62, 0.55];
  bars.forEach((h, b) => {
    const x0 = 0.28 + b * 0.075;
    for (let i = 0; i < 26; i++) {
      const t = i / 26;
      push(x0 + 0.018, 0.92 - t * h * 0.42);
      push(x0 + 0.052, 0.92 - t * h * 0.42);
    }
    for (let i = 0; i < 8; i++) push(x0 + 0.018 + (i / 8) * 0.034, 0.92 - h * 0.42);
  });
  // Rising line graph (right panel) — the heartbeat
  const gx0 = 0.30, gx1 = 0.95, gy0 = 0.5, gy1 = 0.2;
  const wave = (t: number) =>
    gy0 - (gy0 - gy1) * t + 0.06 * Math.sin(t * Math.PI * 3) * (1 - t);
  for (let i = 0; i < 170; i++) {
    const t = i / 170;
    push(gx0 + (gx1 - gx0) * t, wave(t), true);
  }
  // Graph end dot cluster
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    push(gx1 + Math.cos(a) * 0.012, wave(1) + Math.sin(a) * 0.012, true);
  }
  // Stat tiles row
  for (let s = 0; s < 3; s++) {
    const x0 = 0.28 + s * 0.23;
    for (let i = 0; i < 30; i++) {
      const t = i / 30;
      const p = t * 4;
      const w = 0.19, h = 0.1, y0 = 0.58;
      if (p < 1) push(x0 + p * w, y0);
      else if (p < 2) push(x0 + w, y0 + (p - 1) * h);
      else if (p < 3) push(x0 + (3 - p) * w, y0 + h);
      else push(x0, y0 + (4 - p) * h);
    }
  }
  return pts;
}

function makeParticles(): Particle[] {
  const targets = dashboardPoints();
  return targets.map((t) => ({
    sx: (Math.random() - 0.5) * 2,
    sy: (Math.random() - 0.5) * 2,
    angle: Math.random() * Math.PI * 2,
    radius: 0.25 + Math.random() * 0.9,
    speed: (0.1 + Math.random() * 0.35) * (Math.random() > 0.5 ? 1 : -1),
    tx: t.x,
    ty: t.y,
    delay: Math.random() * 0.35,
    size: 0.8 + Math.random() * 1.6,
    color: Math.random() < 0.62 ? 0 : Math.random() < 0.75 ? 1 : 2,
    pulse: t.pulse,
  }));
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/* Captions cross-faded across the scrub. */
const CAPTIONS = [
  { from: 0.0, to: 0.3, eyebrow: "AI THAT DOES THE WORK", line: "hero" },
  { from: 0.34, to: 0.62, eyebrow: "WHILE YOU SCROLL", line: "It builds itself around your business." },
  // Fades out before the dashboard settles into focus (teal crossfade runs 0.72–0.96).
  { from: 0.68, to: 0.84, eyebrow: "THE RESULT", line: "Your whole business, in one quiet view." },
] as const;

export function Hero({ checkUrl }: { checkUrl: string }) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const progressRef = React.useRef(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const section = sectionRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = makeParticles();

    // Token colours, read live from CSS.
    const cs = getComputedStyle(document.documentElement);
    const violet = cs.getPropertyValue("--krk-accent-default").trim() || "#8B5CF6";
    const blue = cs.getPropertyValue("--krk-accent-secondary").trim() || "#6366F1";
    const fog = cs.getPropertyValue("--krk-text-secondary").trim() || "#A7A2C0";
    const teal = cs.getPropertyValue("--krk-accent-tertiary-text").trim() || "#2DD4BF";
    const palette = [violet, blue, fog];

    // Pre-rendered glow sprites (fast: drawImage instead of shadowBlur).
    const makeSprite = (c: string) => {
      const s = document.createElement("canvas");
      s.width = s.height = 32;
      const g = s.getContext("2d")!;
      const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, c);
      grad.addColorStop(0.35, c + "AA");
      grad.addColorStop(1, c + "00");
      g.fillStyle = grad;
      g.fillRect(0, 0, 32, 32);
      return s;
    };
    const sprites = palette.map(makeSprite);
    const tealSprite = makeSprite(teal);

    let raf = 0;
    let w = 0, h = 0, dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const runway = section.offsetHeight - window.innerHeight;
      const p = runway > 0 ? Math.min(1, Math.max(0, -rect.top / runway)) : 1;
      progressRef.current = reduced ? 1 : p;
      setProgress(progressRef.current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = (now: number) => {
      const time = now / 1000;
      const p = progressRef.current;
      ctx.clearRect(0, 0, w, h);

      // Dashboard bounds: centred, 72% width, 16:10.
      const dw = Math.min(w * 0.72, 900);
      const dh = dw * 0.55;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2 + h * 0.03;

      // Once the dashboard has formed, its glow shifts violet -> teal
      // (the brand's completion colour — same rule as the layers finale).
      const fin = smooth(Math.min(1, Math.max(0, (p - 0.72) / 0.24)));
      const mixc = (a: number, b: number) => Math.round(a + (b - a) * fin);
      const bloomRgb = `${mixc(139, 45)},${mixc(92, 212)},${mixc(246, 191)}`;

      // Ambient bloom behind the assembling dashboard.
      const bloom = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.5);
      bloom.addColorStop(0, `rgba(${bloomRgb},${0.05 + p * 0.09})`);
      bloom.addColorStop(1, `rgba(${bloomRgb},0)`);
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      const heartbeat = 0.6 + 0.4 * Math.sin(time * 2.4);

      for (const pt of particles) {
        const t = smooth(Math.min(1, Math.max(0, (p - pt.delay) / (1 - pt.delay))));
        // Swirling void position (animated), damped as assembly completes.
        const swirl = 1 - t;
        const a = pt.angle + time * pt.speed;
        const vx = w / 2 + (pt.sx + Math.cos(a) * pt.radius * 0.35) * w * 0.55;
        const vy = h / 2 + (pt.sy + Math.sin(a) * pt.radius * 0.35) * h * 0.55;
        const gx = dx + pt.tx * dw;
        const gy = dy + pt.ty * dh;
        const x = vx * swirl + gx * t;
        const y = vy * swirl + gy * t;

        let alpha = 0.35 + t * 0.5;
        let size = pt.size * (1 + swirl * 0.6);
        if (pt.pulse && p > 0.85) {
          alpha = 0.5 + heartbeat * 0.5;
          size = pt.size * (1.1 + heartbeat * 0.4);
        }
        const sprite = sprites[pt.color];
        // Glow tightens as particles assemble: soft bloom in the void,
        // crisp points once the dashboard has formed.
        const glowScale = 6 - 3.9 * t;
        const d = size * glowScale;
        // Crossfade to teal as the finished UI settles.
        ctx.globalAlpha = alpha * (1 - fin * 0.9);
        ctx.drawImage(sprite, x - d / 2, y - d / 2, d, d);
        if (fin > 0) {
          ctx.globalAlpha = alpha * fin;
          ctx.drawImage(tealSprite, x - d / 2, y - d / 2, d, d);
        }
        if (t > 0.55) {
          // Solid core for a sharp finished line.
          const coreA = Math.min(1, alpha + 0.25) * ((t - 0.55) / 0.45);
          ctx.globalAlpha = coreA * (1 - fin);
          ctx.fillStyle = palette[pt.color];
          ctx.beginPath();
          ctx.arc(x, y, size * 0.75, 0, Math.PI * 2);
          ctx.fill();
          if (fin > 0) {
            ctx.globalAlpha = coreA * fin;
            ctx.fillStyle = teal;
            ctx.beginPath();
            ctx.arc(x, y, size * 0.75, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const captionOpacity = (from: number, to: number) => {
    const fade = 0.06;
    if (progress < from - fade || progress > to + fade) return 0;
    if (progress < from) return (progress - (from - fade)) / fade;
    if (progress > to) return 1 - (progress - to) / fade;
    return 1;
  };

  return (
    <div ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Caption layer */}
        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          {/* Phase 1 — the hero proper */}
          <div
            className="absolute inset-x-0 px-5 text-center transition-opacity duration-300"
            style={{ opacity: captionOpacity(CAPTIONS[0].from, CAPTIONS[0].to) }}
          >
            <p className="krk-section-label mb-4 !text-accent-tertiary-text">AI THAT DOES THE WORK</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-[820px] mx-auto leading-[1.08]">
              Give AI <span className="grad italic">a job</span>,<br />
              not a question.
            </h1>
            <p className="text-lg text-text-secondary max-w-[560px] mx-auto mt-6 leading-relaxed">
              Most businesses are still asking AI for answers — then doing the
              work themselves. Kuroko builds the quiet system that does the work
              for you. You give it a job. It hands the result back for your yes.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8 pointer-events-auto">
              <a href={checkUrl} className="krk-btn krk-btn--primary">
                Take the 5-minute readiness check
              </a>
              <a href="#two-worlds" className="krk-btn krk-btn--ghost">
                See how it works ↓
              </a>
            </div>
            <p className="text-xs text-text-muted mt-5">
              No jargon, no obligation. An honest read on where AI fits your business — and where it doesn&apos;t.
            </p>
          </div>

          {/* Phases 2–3 — big captions centred over the swirl. The final one
              fades out as the dashboard settles into focus. */}
          {CAPTIONS.slice(1).map((c) => (
            <div
              key={c.eyebrow}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 text-center transition-opacity duration-300"
              style={{ opacity: captionOpacity(c.from, c.to) }}
            >
              <p className="krk-section-label !text-sm sm:!text-base mb-4 !text-accent-tertiary-text">{c.eyebrow}</p>
              <p className="text-3xl sm:text-5xl font-bold tracking-tight max-w-[820px] mx-auto leading-[1.12]">
                {c.line}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-6 inset-x-0 text-center text-text-muted text-xs tracking-widest transition-opacity duration-300"
          style={{ opacity: progress < 0.05 ? 1 : 0 }}
        >
          SCROLL
        </div>
      </div>
    </div>
  );
}
