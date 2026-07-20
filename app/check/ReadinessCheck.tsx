"use client";
import * as React from "react";
import {
  TEAM_SIZE,
  AI_MATURITY,
  TOOLS,
  PAINS,
  WHO_USES,
  PAIN_TYPE,
  RHYTHM,
  BUDGET_BAND,
  TIMELINE,
  SENSITIVE_DATA,
} from "@/lib/domain";
import { INTAKE_URL } from "@/lib/config";
import {
  Card,
  SectionLabel,
  Label,
  TextInput,
  Textarea,
  Button,
  ChipMulti,
  ChipSingle,
  OptionGroup,
} from "@kuroko-studios/design/components";

/*
 * The Readiness Check — migrated here from Kuroko HQ (this is now the
 * canonical funnel page). Posts cross-origin to HQ's /api/intake, which
 * allowlists this site. Built entirely from the design-system components.
 */
export default function ReadinessCheck() {
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Text fields
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [role, setRole] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [toolNames, setToolNames] = React.useState("");
  const [magicWand, setMagicWand] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [companyWebsite, setCompanyWebsite] = React.useState(""); // honeypot

  // Selectors
  const [teamSize, setTeamSize] = React.useState<string | null>(null);
  const [tools, setTools] = React.useState<string[]>([]);
  const [aiMaturity, setAiMaturity] = React.useState<string | null>(null);
  const [pains, setPains] = React.useState<string[]>([]);
  const [whoUses, setWhoUses] = React.useState<string | null>(null);
  const [painType, setPainType] = React.useState<string | null>(null);
  const [rhythm, setRhythm] = React.useState<string[]>([]);
  const [budget, setBudget] = React.useState<string | null>(null);
  const [timeline, setTimeline] = React.useState<string | null>(null);
  const [sensitive, setSensitive] = React.useState<string[]>([]);

  async function submit() {
    setError(null);
    if (!email.trim()) {
      setError("Please add your work email so we can reply.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(INTAKE_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          company_website: companyWebsite, // honeypot
          name,
          email,
          company,
          role,
          website,
          team_size: teamSize,
          tools,
          tool_names: toolNames,
          ai_maturity: aiMaturity,
          pains,
          magic_wand: magicWand,
          who_uses: whoUses,
          pain_type: painType,
          rhythm,
          budget_band: budget,
          timeline,
          sensitive_data: sensitive,
          notes,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setDone(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <main className="px-4 pt-32 pb-24">
        <Card className="max-w-[640px] mx-auto p-10 text-center">
          <h2 className="text-xl font-bold mb-2.5">Thanks — we&apos;re on it.</h2>
          <p className="text-md text-text-secondary leading-relaxed">
            You&apos;ll hear from us with an honest read on where AI fits your
            business, which of our three tiers matches, and what we&apos;d
            tackle first.
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="px-4 pt-28 pb-24">
      <Card className="max-w-[640px] mx-auto p-7 sm:p-9">
        <h1 className="text-2xl font-bold mb-1.5">AI readiness check</h1>
        <p className="text-md text-text-secondary leading-normal mb-7">
          Five minutes, no jargon. We&apos;ll come back with an honest read on
          where AI could genuinely help your business — and where it
          can&apos;t.
        </p>

        {/* 1 — About you */}
        <SectionLabel className="!text-accent-tertiary-text">1 — About you</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 mb-3">
          <div>
            <Label htmlFor="name">Your name</Label>
            <TextInput id="name" placeholder="Sam Taylor" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Work email</Label>
            <TextInput id="email" type="email" placeholder="sam@company.co.uk" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <TextInput id="company" placeholder="Taylor Joinery" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="role">Your role</Label>
            <TextInput id="role" placeholder="Owner" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="website">Website (optional)</Label>
          <TextInput id="website" placeholder="taylorjoinery.co.uk" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <Label>Team size</Label>
        <ChipSingle options={TEAM_SIZE} value={teamSize} onChange={setTeamSize} />

        {/* 2 — What you run today */}
        <SectionLabel className="mt-7 !text-accent-tertiary-text">2 — What you run today</SectionLabel>
        <Label className="mt-3">Which of these does the business use? Tap all that apply.</Label>
        <ChipMulti options={TOOLS} value={tools} onChange={setTools} />
        <div className="mt-3">
          <Label htmlFor="toolnames">Name the main ones (optional)</Label>
          <TextInput id="toolnames" placeholder="Gmail, Xero, Trello…" value={toolNames} onChange={(e) => setToolNames(e.target.value)} />
        </div>

        {/* 3 — AI today */}
        <SectionLabel className="mt-7 !text-accent-tertiary-text">3 — AI today</SectionLabel>
        <Label className="mt-3">Which is closest to where you are now?</Label>
        <OptionGroup options={AI_MATURITY} value={aiMaturity} onChange={setAiMaturity} />

        {/* 4 — Where the time goes */}
        <SectionLabel className="mt-7 !text-accent-tertiary-text">4 — Where the time goes</SectionLabel>
        <Label className="mt-3">Where does your team lose the most hours each week?</Label>
        <ChipMulti options={PAINS} value={pains} onChange={setPains} />
        <div className="mt-3">
          <Label htmlFor="wand">If AI could take one job off your plate tomorrow, what would it be?</Label>
          <Textarea id="wand" rows={2} placeholder="Chasing quotes that never get replied to…" value={magicWand} onChange={(e) => setMagicWand(e.target.value)} />
        </div>

        {/* 5 — How it should work */}
        <SectionLabel className="mt-7 !text-accent-tertiary-text">5 — How it should work</SectionLabel>
        <Label className="mt-3">Who needs to use AI day to day?</Label>
        <ChipSingle options={WHO_USES} value={whoUses} onChange={setWhoUses} />
        <Label className="mt-3">Which sounds more like your business?</Label>
        <OptionGroup options={PAIN_TYPE} value={painType} onChange={setPainType} />
        <Label className="mt-3">What kind of help matters most? Tap all that apply.</Label>
        <ChipMulti options={RHYTHM} value={rhythm} onChange={setRhythm} />

        {/* 6 — Practicals */}
        <SectionLabel className="mt-7 !text-accent-tertiary-text">6 — Practicals</SectionLabel>
        <Label className="mt-3">Budget you&apos;d consider</Label>
        <ChipSingle options={BUDGET_BAND} value={budget} onChange={setBudget} />
        <Label className="mt-3">Timeline</Label>
        <ChipSingle options={TIMELINE} value={timeline} onChange={setTimeline} />
        <Label className="mt-3">Do you handle sensitive data? Tap any that apply.</Label>
        <ChipMulti options={SENSITIVE_DATA} value={sensitive} onChange={setSensitive} />

        <div className="mt-3">
          <Label htmlFor="notes">Anything else we should know? (optional)</Label>
          <Textarea id="notes" rows={2} placeholder="Context, worries, questions — anything." value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        {/* Honeypot: hidden from users, tempting to bots. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-danger mt-4" role="alert">
            {error}
          </p>
        )}

        <Button className="w-full mt-6" onClick={submit} disabled={submitting}>
          {submitting ? "Sending…" : "Get my readiness review"}
        </Button>
        <p className="text-xs text-text-muted text-center mt-3 leading-normal">
          No obligation. We reply personally — this doesn&apos;t go into a marketing funnel.
        </p>
      </Card>
    </main>
  );
}
