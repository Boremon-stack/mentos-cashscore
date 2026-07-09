import type { FactorScore, Persona, ScoreResult } from "./scoring";

export type Recommendation = {
  label: string;
  tone: "signal" | "blue" | "danger";
  detail: string;
};

export function getRecommendation(result: ScoreResult): Recommendation {
  switch (result.band) {
    case "Prime":
      return {
        label: "Approve — prime tier",
        tone: "signal",
        detail: "Behavioral signals support standard terms with no additional conditions.",
      };
    case "Near-Prime":
      return {
        label: "Approve — standard terms",
        tone: "signal",
        detail: "Consistent repayment and income signals; eligible for standard pricing.",
      };
    case "Building":
      return {
        label: "Manual review recommended",
        tone: "blue",
        detail: "Mixed signals — a short manual review can confirm eligibility and terms.",
      };
    default:
      return {
        label: "Additional verification required",
        tone: "danger",
        detail: "Behavioral signals are too thin or inconsistent to score confidently yet.",
      };
  }
}

export function getConfidence(persona: Persona): { label: "High" | "Medium" | "Low"; detail: string } {
  const points = persona.upi.length + persona.emi.length * 4 + persona.salary.length * 4;
  if (points >= 90) return { label: "High", detail: "90-day window, all three signals well populated" };
  if (points >= 55) return { label: "Medium", detail: "90-day window, partial signal coverage" };
  return { label: "Low", detail: "Limited transaction history in the 90-day window" };
}

function strongestWeakest(factors: FactorScore[]) {
  const sorted = [...factors].sort((a, b) => b.score - a.score);
  return { strongest: sorted[0], weakest: sorted[sorted.length - 1] };
}

export function buildNarrative(persona: Persona, result: ScoreResult): string {
  const { strongest, weakest } = strongestWeakest(result.factors);
  const cibilClause = persona.cibilAvailable
    ? `a CIBIL score of ${persona.cibilScore}, which understates the picture cashflow behavior shows`
    : "no CIBIL file at all — invisible to a bureau-only view";

  return `${persona.name} has ${cibilClause}. Over the last 90 days, ${strongest.label.toLowerCase()} is the strongest signal (${strongest.score}/100) — ${strongest.detail.toLowerCase()}. ${weakest.label} trails at ${weakest.score}/100, ${weakest.detail.toLowerCase()}. Weighted together, the composite lands in the ${result.band} band at ${result.cashScore}.`;
}
