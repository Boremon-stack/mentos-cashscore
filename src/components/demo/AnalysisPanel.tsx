"use client";

import { motion } from "framer-motion";
import type { Persona, ScoreResult } from "@/lib/scoring";
import { buildNarrative, getConfidence, getRecommendation } from "@/lib/narrative";

const TONE_CLASSES: Record<string, string> = {
  signal: "border-signal/30 bg-signal/10 text-signal",
  blue: "border-blue/30 bg-blue/10 text-blue",
  danger: "border-danger/30 bg-danger/10 text-danger",
};

export default function AnalysisPanel({ persona, result }: { persona: Persona; result: ScoreResult }) {
  const rec = getRecommendation(result);
  const confidence = getConfidence(persona);
  const narrative = buildNarrative(persona, result);

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

      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-mist">{narrative}</p>

      <div className="mt-6 grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-mist">Recommendation</p>
          <p className="mt-1 text-sm text-paper">{rec.detail}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-mist">Confidence — {confidence.label}</p>
          <p className="mt-1 text-sm text-paper">{confidence.detail}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-mist">Data window</p>
          <p className="mt-1 text-sm text-paper">90 days · 3 behavioral signals · consent-based read</p>
        </div>
      </div>
    </motion.div>
  );
}
