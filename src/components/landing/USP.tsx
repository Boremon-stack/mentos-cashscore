"use client";

import { motion } from "framer-motion";

const OLD_FLOW = ["Bank", "requests", "Bureau", "pulls", "CIBIL file", "→", "Score you never saw coming"];
const NEW_FLOW = ["You", "tap check", "CashScore engine", "reads cashflow", "Instant score", "→", "You choose who sees it"];

function FlowRow({ steps, accent }: { steps: string[]; accent: "mist" | "signal" }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((s, i) => (
        <span
          key={i}
          className={
            s === "→"
              ? "text-lg text-mist"
              : `rounded-full border px-4 py-2 text-sm font-medium ${
                  accent === "signal"
                    ? "border-signal/30 bg-signal/10 text-signal"
                    : "border-white/10 bg-white/5 text-mist"
                }`
          }
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export default function USP() {
  return (
    <section id="usp" className="relative bg-ink px-6 py-28 md:px-12">
      <div className="glow-blue pointer-events-none absolute right-0 top-0 h-[26rem] w-[26rem] rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-signal"
        >
          Why it's different
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl font-display text-4xl font-semibold leading-tight text-paper md:text-5xl"
        >
          We flip the pull. You check yourself, first.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-mist"
        >
          Every bureau model starts with a lender pulling your file without asking.
          CashScore starts with <span className="text-paper">you</span> — a
          privacy-forward self-check that builds trust and produces higher-quality,
          consent-driven leads for lenders.
        </motion.p>

        <div className="mt-14 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-white/8 bg-white/[0.03] p-8"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-mist">
              Traditional bureau pull
            </p>
            <FlowRow steps={OLD_FLOW} accent="mist" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-[28px] border border-signal/25 bg-signal/[0.06] p-8"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-signal">
              CashScore reverse pull
            </p>
            <FlowRow steps={NEW_FLOW} accent="signal" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {[
            ["Privacy-forward", "Nothing leaves your device until you choose to share it with a lender."],
            ["Higher opt-in", "Users self-select into sharing, producing warmer, higher-intent leads."],
            ["Instant, not iterative", "No 7-day bureau lag — a live composite score in seconds."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <h4 className="font-display text-lg font-semibold text-paper">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-mist">{body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
