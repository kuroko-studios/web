import type { Metadata } from "next";
import ReadinessCheck from "./ReadinessCheck";

export const metadata: Metadata = {
  title: "AI readiness check — Kuroko",
  description:
    "Five minutes, no jargon. An honest read on where AI could genuinely help your business — and where it can't.",
  robots: { index: true, follow: true },
};

export default function CheckPage() {
  return <ReadinessCheck />;
}
