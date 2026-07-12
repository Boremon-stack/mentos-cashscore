"use client";

import { motion } from "framer-motion";
import type { Persona, ScoreResult } from "@/lib/scoring";
import { getConfidence, getRecommendation } from "@/lib/narrative";
import ContributionChart from "./ContributionChart";

// Solid swatch blocks (Tan / Slate Gray / Caput Mortuum) with contrast-matched
// text, instead of low-opacity tints that wash out against the navy card.
const TONE_CLASSES: Record<string, string> = {
  signal: "border-signal bg-signal text-ink",
  blue: "border-blue bg-blue text-paper",
  danger: "border-danger-deep bg-danger-deep text-paper",
};

export default function AnalysisPanel({ persona, result }: { persona: Persona; result: ScoreResult }) {
  const rec = getRecommendation(result);
  const confidence = getConfidence(persona);

  const onTime = persona.emi.filter((e) => e.onTime).length;
  const onTimePct = persona.emi.length ? Math.round((onTime / persona.emi.length) * 100) : 0;
  const days = persona.salary.map((s) => s.day);
  const spread = days.length ? Math.max(...days) - Math.min(...days) : 0;

  const stats = [
    { label: "CashScore", value: String(result.cashScore), sub: result.band },
    { label: "UPI activity", value: String(persona.upi.length), sub: "txns / 90d" },
    { label: "EMI regularity", value: `${onTimePct}%`, sub: `${onTime}/${persona.emi.length} on-time` },
    { label: "Salary spread", value: `±${spread}d`, sub: `${persona.salary.length} months tracked` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold text-paper">Underwriting summary</p>
        <span className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${TONE_CLASSES[rec.tone]}`}>
          {rec.label}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/8 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-widest text-mist">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-paper">{s.value}</p>
            <p className="text-xs text-mist">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 border-t border-white/8 pt-6 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-mist">
            Points contributed to score (base 300 + factors)
          </p>
          <ContributionChart factors={result.factors} />
        </div>
        <div className="flex flex-col justify-center gap-4 lg:w-56">
          <div>
            <p className="text-xs uppercase tracking-widest text-mist">Confidence — {confidence.label}</p>
            <p className="mt-1 text-sm text-paper">{confidence.detail}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-mist">Recommendation</p>
            <p className="mt-1 text-sm text-paper">{rec.detail}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
