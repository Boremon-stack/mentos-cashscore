"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const FeatureOrb = dynamic(() => import("@/components/three/FeatureOrb"), { ssr: false });

const FEATURES = [
  {
    variant: "upi" as const,
    title: "UPI Frequency",
    body: "How often, how steadily you transact — spend rhythm reveals financial engagement far better than a one-time snapshot.",
  },
  {
    variant: "emi" as const,
    title: "EMI Regularity",
    body: "On-time repayment cadence across every recurring obligation, tracked cycle over cycle instead of a single missed-payment flag.",
  },
  {
    variant: "salary" as const,
    title: "Salary Consistency",
    body: "Date and amount stability of recurring credits — the clearest proxy for income reliability a bureau file will never show.",
  },
];

export default function Features() {
  return (
    <section id="idea" className="relative bg-paper px-6 py-28 text-ink md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-signal-dim">
            The idea
          </p>
          <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
            Three signals CIBIL was never built to read.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/60">
            CashScore composes a single behavioral score from cashflow patterns
            already sitting in your bank statement — no loan history required.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.variant}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group rounded-[28px] border border-ink/8 bg-white/70 p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:shadow-xl"
            >
              <div className="mb-6 h-40 w-full">
                <FeatureOrb variant={f.variant} />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
