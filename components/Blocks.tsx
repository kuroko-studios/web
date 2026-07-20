import { Reveal } from "@/components/Reveal";

/* Shared page building blocks (server-safe). */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="krk-section-label mb-3 !text-accent-tertiary-text">{children}</p>;
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`max-w-[1100px] mx-auto px-5 py-20 ${className}`}>
      {children}
    </section>
  );
}

/* Page header for secondary pages (clears the fixed nav). */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-[1100px] mx-auto px-5 pt-36 pb-4">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 max-w-[760px]">
          {title}
        </h1>
        {children && (
          <div className="text-lg text-text-secondary max-w-[680px] leading-relaxed">
            {children}
          </div>
        )}
      </Reveal>
    </div>
  );
}

/* Closing call-to-action card. */
export function CtaBlock() {
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
            jargon. You&apos;ll get an honest read: where AI genuinely fits, and what
            we&apos;d tackle first. Written by a person, sent to you directly. And if the
            answer is &ldquo;not yet&rdquo;, we&apos;ll say so.
          </p>
          <a href="/check" className="krk-btn krk-btn--primary">
            Take the readiness check
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
