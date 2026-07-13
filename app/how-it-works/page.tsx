import type { Metadata } from "next";
import { BrainDiagram } from "@/components/BrainDiagram";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section, PageHeader, CtaBlock } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "How it works — Kuroko",
  description:
    "One quiet system, built in layers: the Brain, the Connections, the Workers, the Engine, the Window, the Interfaces. Switched on only as you need them.",
};

const LAYERS = [
  {
    num: "01",
    name: "The Brain",
    core: true,
    body: "One place that holds how your business actually works: your clients, your prices, your tone of voice, your processes, what good looks like. Written down once, kept current, owned by you. Your AI reads it before it acts — so everything it does starts from your reality, not a guess.",
    practice:
      "Ask for a reply to an enquiry and it sounds like you, quotes your prices, and follows your process.",
  },
  {
    num: "02",
    name: "The Connections",
    core: true,
    body: "Plugs into the tools you already run — email, calendar, meeting notes, documents, accounts, chat. Information flows into one place; finished work flows back out. We never rebuild a tool that works; we plug into it.",
    practice:
      "The morning brief reads your inbox and calendar. The quote uses the numbers that are actually in your accounts.",
  },
  {
    num: "03",
    name: "The Workers",
    core: false,
    body: "Jobs handed over and done properly: draft the quote, chase the invoice, answer the enquiry, prep the meeting. Each worker does one job, does it your way, and hands the result back for your yes. Nothing goes out without a human decision.",
    practice:
      "“Chase the unpaid invoices” — polite reminders drafted for everyone overdue, waiting for your approval.",
  },
  {
    num: "04",
    name: "The Engine",
    core: false,
    body: "The always-on layer. Schedules and triggers that run the workers without being asked: the Monday brief, the Friday report, the watcher that flags the thing nobody spotted. It runs whether you're at your desk or not.",
    practice:
      "Every morning at 7:30, the day's brief is waiting. Nobody pressed anything.",
  },
  {
    num: "05",
    name: "The Window",
    core: false,
    body: "When you need to see the whole business in one place: a built software layer over the Brain. Pipeline, jobs, numbers — live, in one view, shaped around how you actually run things.",
    practice:
      "One screen: which quotes are out, what's unpaid, what's booked this week.",
  },
  {
    num: "06",
    name: "The Interfaces",
    core: false,
    body: "No new habits. The work lands where your team already lives — email, chat, shared documents. The system fits your team; your team doesn't bend around the system.",
    practice:
      "The report arrives in the same inbox and chat your team checks every day.",
  },
];

const QUESTIONS = [
  ["Who needs to touch this?", "Just the operators, or the whole team?"],
  ["Doing problem or seeing problem?", "Drowning in the work, or can't see clearly across it?"],
  ["On-demand or always-on?", "Help when you ask, or things happening in the background?"],
];

export default function HowItWorksPage() {
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8 items-center max-w-[1100px] mx-auto lg:pr-5">
        <PageHeader eyebrow="HOW IT WORKS" title="One quiet system, built in layers.">
          <p>
            Everything starts with a <strong className="text-text-primary">Brain</strong> that
            holds how your business works, and{" "}
            <strong className="text-text-primary">Connections</strong> into the tools you
            already use. On top of that core, four more layers switch on as you need them —
            never before, never for the sake of it.
          </p>
        </PageHeader>
        <Reveal delay={150}>
          <div className="px-5 lg:px-0 lg:pt-24">
            <BrainDiagram />
          </div>
        </Reveal>
      </div>

      <Section>
        <div className="flex flex-col gap-5">
          {LAYERS.map((l, i) => (
            <Reveal key={l.num} delay={Math.min(i * 60, 180)}>
              <div className="krk-card p-7 sm:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-accent-text font-mono text-sm">{l.num}</span>
                  <h2 className="text-xl sm:text-2xl font-bold">{l.name}</h2>
                  {l.core && <span className="krk-badge krk-badge--accent">CORE</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <p className="text-text-secondary leading-relaxed">{l.body}</p>
                  <div className="rounded-lg border border-line bg-surface-page p-4">
                    <p className="krk-section-label !text-accent-tertiary-text mb-2">
                      IN PRACTICE
                    </p>
                    <p className="text-text-primary text-sm leading-relaxed">{l.practice}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-center text-xl font-bold mt-12">
            You start with the core.{" "}
            <span className="text-accent-tertiary-text">The rest switches on when you&apos;re ready.</span>
          </p>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>HOW WE SCOPE IT</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Which layers do you need? Three honest questions.
          </h2>
          <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed mb-10">
            We don&apos;t arrive with a product to sell you. Your answers decide which parts we
            switch on, and in what order.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUESTIONS.map(([q, sub], i) => (
            <Reveal key={q} delay={i * 90}>
              <div className="krk-card p-6 h-full">
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-pill bg-accent-tint text-accent-text font-bold mb-4">
                  {i + 1}
                </span>
                <h3 className="font-bold mb-1">{q}</h3>
                <p className="text-text-secondary text-sm">{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBlock />
    </main>
  );
}
