import { BlueprintDiagram } from "@/components/BlueprintDiagram";
import { BrainDiagram } from "@/components/BrainDiagram";
import { Hero } from "@/components/Hero";
import { Layers } from "@/components/Layers";
import { Reveal } from "@/components/Reveal";
import { TwoWorlds } from "@/components/TwoWorlds";

const CHECK_URL = "/check";

function Eyebrow({ children }: { children: React.ReactNode }) {
  // Tertiary teal — the complementary counterpoint to the violet field.
  return <p className="krk-section-label mb-3 !text-accent-tertiary-text">{children}</p>;
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`max-w-[1100px] mx-auto px-5 py-24 ${className}`}>
      {children}
    </section>
  );
}

/* ------------------------------------------------ two worlds of AI
   The pinned scroll-scrub stage lives in components/TwoWorlds.tsx; the
   dabbler strip + closing line flow after it as a normal section. */
function TwoWorldsOutro() {
  return (
    <Section className="!pt-0">
      <Reveal>
        <p className="text-text-secondary text-center max-w-[680px] mx-auto leading-relaxed">
          Tried to automate things yourself? Bolted a few tools together, it broke, nobody
          had time to fix it? That&apos;s not a you problem — making this stick is a
          full-time job. <strong className="text-text-primary">It&apos;s ours.</strong>
        </p>
      </Reveal>

      <Reveal>
        <p className="text-center text-xl sm:text-2xl font-bold mt-10">
          Stop asking AI. <span className="grad">Start employing it.</span>
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------ the AI brain */
function Brain() {
  return (
    <Section id="how">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 items-center">
        <div>
          <Reveal>
            <Eyebrow>WHAT WE BUILD</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              One brain that runs your business.
            </h2>
            <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
              At the centre is a <strong className="text-text-primary">Brain</strong> — one place
              that brings together your systems, your knowledge and the data scattered across
              your tools. Your clients, your tone, your process, your numbers — consolidated
              into a single view the whole team works from. Your AI acts on it with real context
              instead of guessing, and you get the kind of{" "}
              <strong className="text-text-primary">business intelligence</strong> that used to
              need a data team.
            </p>
          </Reveal>

          <Reveal>
            <div className="krk-card p-7 mt-12 max-w-[680px]">
              <h3 className="text-lg font-bold mb-2">
                Your team, <span className="grad">one source of truth.</span>
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Everyone works from the same, always-current picture of the business — same
                clients, same process, same voice. No knowledge trapped in one person&apos;s
                head, nothing lost when someone leaves. One brain, growing with you.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <BrainDiagram />
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------ human first, AI fast */
function HumanFirst() {
  return (
    <Section className="text-center">
      <Reveal>
        <Eyebrow>THE PHILOSOPHY</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Human first, <span className="grad italic">AI fast.</span>
        </h2>
        <p className="text-lg text-text-secondary max-w-[640px] mx-auto leading-relaxed">
          You&apos;re not replacing your team — you&apos;re reinforcing it. Alongside your
          people, an AI team that drafts, chases, files and reports around the clock — and
          nothing goes out until a human signs it off. Your people do the deciding. It does
          the legwork.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------ the four layers */
function Modules() {
  return (
    <section>
      <div className="max-w-[1100px] mx-auto px-5 pt-24">
        <Reveal>
          <Eyebrow>THE PARTS</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            One architecture, built in layers.
          </h2>
          <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
            Every business runs the same shape, tuned to fit. Watch it build — layer by
            layer, as you scroll. You start with the core and grow into the rest, never
            paying for what you&apos;re not ready for.
          </p>
        </Reveal>
      </div>
      <Layers />
    </section>
  );
}

/* ------------------------------------------------ three questions */
const QUESTIONS = [
  ["Who needs to touch this?", "Just you and one or two others, or the whole team? That decides how we set up the Brain."],
  ["Doing problem or seeing problem?", "Drowning in the work, or can't see clearly across it? One points to the Workers, the other to the Window."],
  ["On-demand or always-on?", "Help when you ask for it, or jobs that run on their own, around the clock?"],
];

function Questions() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>HOW WE SCOPE IT</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Every setup comes down to three honest questions.
        </h2>
        <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed mb-12">
          We don&apos;t arrive with a product to sell you. Your answers decide which of the
          four layers we switch on — and in what order.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {QUESTIONS.map(([q, sub], i) => (
          <Reveal key={q} delay={i * 90}>
            <div className="krk-card p-6 h-full">
              <span
                className="inline-flex w-8 h-8 items-center justify-center rounded-pill bg-accent-tint text-accent-text font-bold mb-4"
              >
                {i + 1}
              </span>
              <h3 className="font-bold mb-1">{q}</h3>
              <p className="text-text-secondary text-sm">{sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------ getting started */
const TIERS = [
  ["Tier 1 · Foundations", "The Brain goes in, and your team learns to work with it."],
  ["Tier 2 · Connected", "Your tools plug in, and the first jobs start running on their own."],
  ["Tier 3 · Workforce", "The Workers take on the routine work, around the clock."],
  ["Retainer", "We stay on — keeping it running, making it better."],
];

function Start() {
  return (
    <Section id="start">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-center">
        <Reveal>
          <Eyebrow>THE BLUEPRINT</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Measure twice. Build once.
          </h2>
          <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
            Before anything gets built, we map your business and show you exactly where AI
            genuinely helps — what to tackle first, and what to leave alone. That&apos;s the{" "}
            <strong className="text-text-primary">Blueprint</strong>: paid work, honestly done —
            not a sales pitch in disguise.{" "}
            <strong className="text-text-primary">And the fee comes off your first build.</strong>
          </p>
        </Reveal>
        <Reveal delay={150}>
          <BlueprintDiagram />
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        {TIERS.map(([name, desc], i) => (
          <Reveal key={name} delay={i * 90}>
            <div className="krk-card p-6 h-full relative">
              <div className="text-xs text-text-muted mb-2">STEP {i + 1}</div>
              <h3 className="font-bold mb-2">{name}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="text-text-secondary mt-8 max-w-[680px]">
          And when you&apos;re ready for them, two add-ons:{" "}
          <strong className="text-text-primary">the Window</strong> — your live view of the
          whole business — and <strong className="text-text-primary">the Brand System</strong>,
          your look and voice packaged so AI gets them right every time.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------ promises */
const PROMISES = [
  ["You own everything.", "Every account, tool and key stays yours. We hold delegated access only — and we never hold your secrets, anywhere, ever."],
  ["We never rebuild what already works.", "If a tool does its job, we plug into it. You don't pay us to reinvent your stack."],
  ["We move at the pace that fits.", "A clear sequence, credited by the Blueprint, so every step earns the next."],
];

function Promises() {
  return (
    <Section className="!pt-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROMISES.map(([title, body], i) => (
          <Reveal key={title} delay={i * 90}>
            <div className="krk-card p-6 h-full">
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------ case study: blue juice */
const CASE_RESULTS = [
  ["≈ £1,000 a month back", "in subscriptions Mission Control replaced."],
  ["Creative time reclaimed", "the team works on what they're paid to do best — not repetitive admin."],
  ["One live view", "greater visibility, and proactive action, across the whole business."],
];

/* Illustrative recreations of the Mission Control interface —
   real layouts, fictional clients, people and figures. */
const CASE_SHOTS = [
  {
    src: "/case/mission-control-projects.svg",
    caption: "The pipeline, live — every project from pre-sales to delivery",
  },
  {
    src: "/case/mission-control-tasks.svg",
    caption: "Every task in one list — with AI agents handling the repetitive ones",
  },
  {
    src: "/case/mission-control-project.svg",
    caption: "A live project — deliverables, crew, kit and cut reviews in one place",
  },
];

function CaseStudy() {
  return (
    <section id="case-study" className="py-24">
      <div className="max-w-[1100px] mx-auto px-5">
        <Reveal>
          <Eyebrow>CASE STUDY · BLUE JUICE</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            From scattered tools to Mission Control.
          </h2>
          <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
            Blue Juice, a creative production company, ran on a pile of separate platforms —
            information scattered everywhere, a subscription for everything. Kuroko pulled it
            all into <strong className="text-text-primary">Mission Control</strong>: one
            consolidated view of the whole business, with AI agents quietly working through
            the repetitive admin in the background.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASE_RESULTS.map(([stat, detail], i) => (
            <Reveal key={stat} delay={i * 90}>
              <div className="krk-card p-6 h-full">
                <h3 className="font-bold text-accent-tertiary-text mb-1">{stat}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Sideways-scrolling interface gallery */}
      <div className="max-w-[1100px] mx-auto px-5 mt-12">
        <Reveal>
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5">
            {CASE_SHOTS.map(({ src, caption }) => (
              <figure
                key={src}
                className="krk-card shrink-0 snap-center w-[85%] sm:w-[520px] overflow-hidden"
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
          <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
            <p className="text-xs text-text-muted tracking-widest">SCROLL SIDEWAYS →</p>
            <p className="text-xs text-text-muted">
              Interface shown with illustrative data — real client details are confidential.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 mt-12">
        <Reveal>
          <blockquote className="krk-card p-7 sm:p-8 max-w-[760px] mx-auto text-center">
            <p className="text-xl leading-relaxed font-semibold">
              &ldquo;It&apos;s freed me up to do what I do best: look at Mission Control and
              decide what we build next.&rdquo;
            </p>
            <footer className="text-text-muted text-sm mt-4">
              Craig · Founder, Blue Juice
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ the name + CTA */
function Name() {
  return (
    <Section id="name" className="text-center">
      <Reveal>
        <Eyebrow>WHY “KUROKO”</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          The stagehands you&apos;re not meant to see.
        </h2>
        <p className="text-lg text-text-secondary max-w-[640px] mx-auto leading-relaxed">
          In Japanese theatre, the <em>kuroko</em>&nbsp;are the stagehands: dressed head to toe
          in black, they move the scenery and hand the actors their props — in plain sight,
          invisible by agreement. The show runs because of them. The applause never goes to
          them. That&apos;s the AI we build.{" "}
          <strong className="text-text-primary">It does the work. You take the applause.</strong>
        </p>
      </Reveal>
    </Section>
  );
}

function ClosingCta() {
  return (
    <Section className="text-center">
      <Reveal>
        <div
          className="krk-card px-8 py-14 max-w-[760px] mx-auto"
          style={{ boxShadow: "var(--krk-glow-accent-soft)" }}
        >
          <Eyebrow>THE READINESS CHECK</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
            Is your business ready?
          </h2>
          <p className="text-text-secondary max-w-[540px] mx-auto leading-relaxed mb-8">
            Answer a few plain questions about how your business runs — five minutes, no
            jargon. You&apos;ll get an honest read: where AI genuinely
            fits, which tier that points to, and what we&apos;d tackle first. Written by a
            person, sent to you directly. And if the answer is &ldquo;not yet&rdquo;,
            we&apos;ll say so.
          </p>
          <a href={CHECK_URL} className="krk-btn krk-btn--primary">
            Take the readiness check
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero checkUrl={CHECK_URL} />
      <TwoWorlds />
      <TwoWorldsOutro />
      <Brain />
      <HumanFirst />
      <Modules />
      <Questions />
      <Start />
      <Promises />
      <CaseStudy />
      <Name />
      <ClosingCta />
    </main>
  );
}
