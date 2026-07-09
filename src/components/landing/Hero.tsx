"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:px-12">
      <div className="glow-green absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full blur-3xl" />
      <div className="glow-blue absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] md:block">
        <HeroScene />
      </div>

      <div className="relative z-10 max-w-2xl">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-signal"
        >
          Team Mentos · IDBI Innovate
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="text-balance font-display text-5xl font-semibold leading-[1.02] text-paper sm:text-6xl md:text-7xl"
        >
          Your money moves.
          <br />
          <span className="text-signal">CIBIL doesn&apos;t see it.</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-7 max-w-lg text-lg leading-relaxed text-mist"
        >
          CashScore reads real behavior — UPI frequency, EMI regularity, salary
          consistency — and turns it into a live creditworthiness signal for the
          400M+ Indians a bureau score can&apos;t explain.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/demo"
            className="group relative overflow-hidden rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-ink transition"
          >
            <span className="relative z-10">Run a live scoring demo</span>
          </Link>
          <a
            href="#idea"
            className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-paper transition hover:border-white/40"
          >
            How it works
          </a>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={reveal}
          className="mt-14 flex items-center gap-8 text-xs text-mist"
        >
          <div>
            <div className="font-display text-2xl text-paper">160M+</div>
            <div>credit-invisible Indians</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="font-display text-2xl text-paper">3 signals</div>
            <div>UPI · EMI · Salary</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="font-display text-2xl text-paper">Zero</div>
            <div>bank data stored</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
