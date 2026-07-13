import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Section, PageHeader, CtaBlock } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "About — Kuroko",
  description:
    "Kuroko is named for the stagehands of Japanese theatre — the workers who make the show happen without being seen. That's the AI we build.",
};

const PROMISES = [
  [
    "You own everything.",
    "Every account, tool and key stays yours. We hold delegated access only — enough to build and maintain, never more. And we never hold your secrets: no passwords, no API keys, nothing, anywhere, ever. If we walked away tomorrow, everything would still be yours and still be running.",
  ],
  [
    "We never rebuild what already works.",
    "If a tool does its job, we plug into it. Your email stays your email; your accounts stay your accounts. You don't pay us to reinvent a stack you've already paid for — you pay us to make it work together.",
  ],
  [
    "We move at the pace that fits.",
    "Every engagement opens with the Blueprint — a paid, honest diagnostic with the fee credited when you go ahead. From there it's a sequence, not a leap: each step small enough to trust, each one earning the next. Nobody gets told no. They get a sequence.",
  ],
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader eyebrow={'WHY "KUROKO"'} title="The stagehands you're not meant to see.">
        <p>
          In Japanese theatre there are workers called{" "}
          <em>kuroko</em> — 黒子, &ldquo;the people in black.&rdquo; They move the scenery,
          hand the actors their props, make the whole show happen. They work in plain sight,
          dressed head to toe in black — and by agreement, the audience doesn&apos;t see them.
          The play belongs to the actors.
        </p>
      </PageHeader>

      <Section className="!pt-8">
        <Reveal>
          <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
            That&apos;s the role we build AI to play in your business. Not a gadget on stage
            demanding attention — a quiet worker behind the scenes: drafting, chasing, filing,
            reporting, keeping the whole production moving.{" "}
            <strong className="text-text-primary">
              It does the work. You take the applause.
            </strong>
          </p>
        </Reveal>
      </Section>

      <Section className="text-center">
        <Reveal>
          <Eyebrow>THE PHILOSOPHY</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Human first, <span className="grad italic">AI fast.</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-[640px] mx-auto leading-relaxed">
            We don&apos;t build AI to replace people. We build it to give your people a second
            team — one that works around the clock and hands everything back for a human yes.
            Your people make the calls. The AI makes them faster.
          </p>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>THE RULES</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
            Three promises we don&apos;t break.
          </h2>
        </Reveal>
        <div className="flex flex-col gap-5 max-w-[760px]">
          {PROMISES.map(([title, body], i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="krk-card p-7">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-text-secondary leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>WHO WE ARE</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            A small studio, on purpose.
          </h2>
          <p className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
            Kuroko is a UK studio that builds quiet AI systems for real businesses — the
            trades, the practices, the agencies, the firms that keep things running. We
            stay small so every reply is personal, every system is built by the people you
            actually talk to, and nothing gets handed to an account manager. If we ever use
            a word you&apos;d have to Google, we&apos;ve failed.
          </p>
        </Reveal>
      </Section>

      <CtaBlock />
    </main>
  );
}
