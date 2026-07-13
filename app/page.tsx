import { BrainDiagram } from "@/components/BrainDiagram";
import { Hero } from "@/components/Hero";
import { Layers } from "@/components/Layers";
import { Reveal } from "@/components/Reveal";

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

/* ------------------------------------------------ two worlds of AI */
function TwoWorlds() {
  return (
    <Section id="two-worlds">
      <Reveal>
        <Eyebrow>THE WHOLE THING, ONE IDEA</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
          There are two worlds of AI.
        </h2>
      </Reveal>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-stretch">
        {/* You ask */}
        <Reveal>
          <div className="krk-card p-7 h-full !bg-surface-base">
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
              You ask, it answers. Then you still do the work.
            </p>
            <p className="text-text-muted text-sm mt-2">Where almost everyone is stuck.</p>
          </div>
        </Reveal>

        {/* THE JUMP — appears between the two worlds */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Reveal delay={350}>
            <span
              className="krk-badge krk-badge--accent !text-sm !px-5 !py-3 font-bold tracking-widest"
              style={{ boxShadow: "var(--krk-glow-accent)" }}
            >
              THE JUMP →
            </span>
          </Reveal>
        </div>

        {/* AI does — fades in after "You ask", glow ramping up last */}
        <Reveal delay={600}>
          <div className="krk-card p-7 h-full border-[color:var(--krk-accent-default)] glow-in">
            <p className="krk-section-label !text-accent-text mb-4">LEVEL 2 · AI DOES</p>
            <h3 className="text-2xl font-bold mb-5">AI does.</h3>
            <div className="rounded-lg border border-line bg-surface-page p-4 text-sm font-mono space-y-2">
              <p className="text-accent-text">you: start my week</p>
              <p className="text-text-primary">✓ Drafted the quote for the Harrison job</p>
              <p className="text-text-primary">✓ Chased two unpaid invoices</p>
              <p className="text-text-primary">✓ Replied to yesterday&apos;s enquiry, in your voice</p>
              <p className="text-text-primary">✓ Put the site visit in your calendar</p>
            </div>
            <p className="text-text-secondary mt-5">
              One instruction. Four jobs done, handed back for your yes.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <p className="text-center text-xl sm:text-2xl font-bold mt-14">
          Ask <span className="grad">→</span> Do. That&apos;s the only jump that matters today.
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
                Put the Brain in a shared space and the whole team works from the same place.
                One person owns it; the rest read and contribute. One brain scales with you.
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
          people, an AI team that drafts, chases, files and reports around the clock, handing
          every piece of work back for a human yes. Your people make the calls. The AI makes
          them faster.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------ the six layers */
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
  ["Tier 3 · Workforce", "Put the Workers and the Engine to work."],
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
