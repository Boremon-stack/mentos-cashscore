"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getPersona, listArchetypes } from "@/lib/mockProfiles";
import { computeCashScore } from "@/lib/scoring";
import ScoreGauge from "./ScoreGauge";
import FactorRadar from "./FactorRadar";
import ComparisonBars from "./ComparisonBars";
import { LiveComposePanel, LiveEmiPanel, LiveSalaryPanel, LiveUpiPanel } from "./LiveCalcPanels";
import AnalysisPanel from "./AnalysisPanel";

type Stage = "select" | "analyzing" | "results";

const STEPS = [
  { key: "connect", label: "Securely reading transaction history", ms: 1400 },
  { key: "upi", label: "Scanning UPI frequency pattern", ms: 3800 },
  { key: "emi", label: "Verifying EMI repayment cycles", ms: 3600 },
  { key: "salary", label: "Checking salary credit consistency", ms: 3200 },
  { key: "compose", label: "Composing your CashScore", ms: 4400 },
];

const archetypes = listArchetypes();

export default function LiveDemo() {
  const [stage, setStage] = useState<Stage>("select");
  const [personaId, setPersonaId] = useState<string>(archetypes[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const [seed, setSeed] = useState(1);

  const persona = useMemo(() => getPersona(personaId, seed), [personaId, seed]);
  const result = useMemo(() => computeCashScore(persona), [persona]);

  useEffect(() => {
    if (stage !== "analyzing") return;
    if (stepIndex >= STEPS.length) {
      const t = setTimeout(() => setStage("results"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStepIndex((i) => i + 1), STEPS[stepIndex].ms);
    return () => clearTimeout(t);
  }, [stage, stepIndex]);

  function startCheck() {
    setSeed((s) => s + 1);
    setStepIndex(0);
    setStage("analyzing");
  }

  function reset() {
    setStage("select");
    setStepIndex(0);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AnimatePresence mode="wait">
        {stage === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-semibold text-paper md:text-4xl">
              Pick a profile to run the reverse-pull check
            </h2>
            <p className="mt-3 max-w-[68ch] text-mist">
              Mock cashflow data, generated live — no real bank connection needed for this prototype.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {archetypes.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setPersonaId(a.id)}
                  className={`rounded-3xl border p-6 text-left transition ${
                    personaId === a.id
                      ? "border-signal bg-signal/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  <div className="font-display text-lg font-semibold text-paper">{a.name}</div>
                  <div className="mt-1 text-sm text-mist">{a.occupation}</div>
                </button>
              ))}
            </div>
            <button
              onClick={startCheck}
              className="mt-10 rounded-full bg-signal px-8 py-4 font-semibold text-ink transition hover:brightness-95"
            >
              Run live scoring check →
            </button>
          </motion.div>
        )}

        {stage === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-[32px] border border-white/10 bg-white/[0.03] p-10"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-signal">Live analysis · {persona.name}</p>
            <div className="mt-8 space-y-3">
              {STEPS.map((step, i) => {
                const done = i < stepIndex;
                const current = i === stepIndex;
                return (
                  <div key={step.key}>
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${
                          done
                            ? "border-signal bg-signal text-ink"
                            : current
                            ? "border-signal text-signal"
                            : "border-white/15 text-mist"
                        }`}
                      >
                        {done ? "✓" : i + 1}
                      </div>
                      <span
                        className={`text-sm ${
                          done ? "text-paper" : current ? "animate-ticker text-paper" : "text-mist"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {current && (
                      <div className="ml-12">
                        {step.key === "upi" && <LiveUpiPanel upi={persona.upi} durationMs={step.ms} />}
                        {step.key === "emi" && <LiveEmiPanel emi={persona.emi} durationMs={step.ms} />}
                        {step.key === "salary" && (
                          <LiveSalaryPanel salary={persona.salary} durationMs={step.ms} />
                        )}
                        {step.key === "compose" && (
                          <LiveComposePanel
                            factors={result.factors}
                            cashScore={result.cashScore}
                            durationMs={step.ms}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {stage === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-signal">Result for {persona.name}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-paper">
                  {persona.cibilAvailable
                    ? "A fuller picture beyond the bureau file"
                    : "Invisible to CIBIL. Fully visible here."}
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={startCheck}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-paper hover:border-signal hover:text-signal"
                >
                  Re-run
                </button>
                <button
                  onClick={reset}
                  className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink hover:bg-signal"
                >
                  New profile
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
                <ScoreGauge score={result.cashScore} band={result.band} active={stage === "results"} />
                <div className="mt-6 space-y-2 text-sm text-mist">
                  {result.factors.map((f) => (
                    <div key={f.key} className="flex justify-between border-t border-white/8 py-2">
                      <span>{f.label}</span>
                      <span className="text-paper">{f.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
                <p className="mb-2 text-sm font-semibold text-paper">Factor breakdown</p>
                <FactorRadar factors={result.factors} active={stage === "results"} />
                <p className="mb-2 mt-4 text-sm font-semibold text-paper">CIBIL vs CashScore</p>
                <ComparisonBars
                  cashScore={result.cashScore}
                  cibilAvailable={persona.cibilAvailable}
                  cibilScore={persona.cibilScore}
                  active={stage === "results"}
                />
              </div>
            </div>

            <AnalysisPanel persona={persona} result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
