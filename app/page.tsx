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

/* ------------------------------------------------ plain english */
const JARGON = [
  ["“Agent”", "a worker you hand one job to."],
  ["“Automation”", "things that happen in the background, without anyone asking."],
  ["“Integration” / “connector”", "a plug into a tool you already use."],
  ["“Context”", "everything your AI knows about how your business runs. (That's the Brain.)"],
  ["“Prompt”", "the instruction you give it — better thought of as the job you hand over."],
  ["“The model”", "the raw intelligence under the hood. We pick it; you never think about it."],
];

function PlainEnglish() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>NO JARGON</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
          The words people throw around, translated.
        </h2>
      </Reveal>
      <div className="krk-card divide-y divide-[color:var(--krk-line-default)]">
        {JARGON.map(([word, meaning], i) => (
          <Reveal key={word} delay={i * 50}>
            <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr] gap-1 sm:gap-6 px-6 py-4">
              <span className="text-text-muted">{word}</span>
              <span className="text-text-primary">
                <span className="text-accent-text mr-2">→</span>
                {meaning}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="text-text-secondary mt-6 text-center italic">
          If we ever use a word you&apos;d have to Google, we&apos;ve failed.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------ three questions */
const QUESTIONS = [
  ["Who needs to touch this?", "Just the operators, or the whole team?"],
  ["Doing problem or seeing problem?", "Drowning in the work, or can't see clearly across it?"],
  ["On-demand or always-on?", "Help when you ask, or things happening in the background?"],
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
          We don&apos;t arrive with a product to sell you. Your answers decide which parts we
          switch on, and in what order.
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

/* ------------------------------------------------ how you start */
const TIERS = [
  ["Tier 1 · Foundations", "Stand up the Brain and train your team to use it well."],
  ["Tier 2 · Connected", "Plug your tools together and switch on your first automations."],
  ["Tier 3 · Workforce", "Put the Workers to work, around the clock."],
  ["Retainer", "We keep it running and improving."],
];

function Start() {
  return (
    <Section id="start">
      <Reveal>
        <Eyebrow>HOW YOU START</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          It begins with the Blueprint.
        </h2>
        <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
          Every engagement opens with the <strong className="text-text-primary">AI Blueprint</strong>{" "}
          — a paid diagnostic that maps where AI genuinely helps your business, what to tackle
          first, and what to leave alone. Honest work, not a sales pitch.{" "}
          <strong className="text-text-primary">The fee is credited when you go ahead.</strong>
        </p>
      </Reveal>

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
          Two scoped add-ons sit outside the tiers when you need them:{" "}
          <strong className="text-text-primary">the Window</strong> (a built software layer) and{" "}
          <strong className="text-text-primary">the Brand System</strong> (a machine-readable
          design system).
        </p>
        <p className="text-xl font-bold mt-8">Nobody gets told no. They get a sequence.</p>
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
    <Section>
      <Reveal>
        <Eyebrow>THE RULES</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
          Three promises we don&apos;t break.
        </h2>
      </Reveal>
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
          In Japanese theatre, the <em>kuroko</em> move the scenery and hand the actors their
          props — dressed head to toe in black, in plain sight, invisible by agreement.
          That&apos;s the AI we build. It does the work. You take the applause.
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
          <Eyebrow>START HERE</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
            Five minutes. An honest answer.
          </h2>
          <p className="text-text-secondary max-w-[540px] mx-auto leading-relaxed mb-8">
            Tell us how your business runs today and we&apos;ll come back within two working
            days with where AI could genuinely help — which of the three tiers fits, and what
            we&apos;d tackle first. We reply personally. This doesn&apos;t go into a marketing
            funnel.
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
      <PlainEnglish />
      <Questions />
      <Start />
      <Promises />
      <Name />
      <ClosingCta />
    </main>
  );
}
