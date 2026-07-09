"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
    >
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-signal shadow-[0_0_12px_theme(colors.signal)]" />
          <span className="font-display text-lg font-semibold tracking-tight text-paper">
            Cash<span className="text-signal">Score</span>
          </span>
        </Link>
        <span className="hidden text-sm text-mist sm:inline">— by Mentos, for IDBI Innovate</span>
      </div>
      <nav className="hidden items-center gap-8 text-sm text-mist md:flex">
        <a href="#idea" className="transition hover:text-paper">
          The idea
        </a>
        <a href="#features" className="transition hover:text-paper">
          Features
        </a>
        <a href="#usp" className="transition hover:text-paper">
          Why it's different
        </a>
      </nav>
      <Link
        href="/demo"
        className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-signal"
      >
        Check my score →
      </Link>
    </motion.header>
  );
}
