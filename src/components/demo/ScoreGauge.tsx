"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

const MIN = 300;
const MAX = 900;

// Arc stroke uses a lightened tint of each swatch so it reads clearly against
// the near-black cherry track; the badge is a solid block of the true swatch
// (Matcha, mid-rose, deep olive, Cherry) with contrast-matched text.
const BAND_STYLE: Record<string, { stroke: string; badgeBg: string; badgeText: string }> = {
  Prime: { stroke: "#bad797", badgeBg: "#bad797", badgeText: "#2b0210" },
  "Near-Prime": { stroke: "#b494a0", badgeBg: "#96536c", badgeText: "#ffffff" },
  Building: { stroke: "#a3c17e", badgeBg: "#5c7a4a", badgeText: "#ffffff" },
  Watch: { stroke: "#e0546f", badgeBg: "#670626", badgeText: "#ffffff" },
};

export default function ScoreGauge({
  score,
  band,
  active,
}: {
  score: number;
  band: string;
  active: boolean;
}) {
  const animated = useCountUp(score, 1600, active);
  const pct = Math.min(1, Math.max(0, (animated - MIN) / (MAX - MIN)));

  const radius = 120;
  const circumference = Math.PI * radius;
  const dash = active ? circumference * pct : 0;

  const style = BAND_STYLE[band] ?? BAND_STYLE.Watch;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="280" height="160" viewBox="0 0 280 160">
        <path
          d="M 20 150 A 120 120 0 0 1 260 150"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <motion.path
          d="M 20 150 A 120 120 0 0 1 260 150"
          fill="none"
          stroke={style.stroke}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 10px ${style.stroke}80)` }}
        />
      </svg>
      <div className="absolute top-16 flex flex-col items-center">
        <span className="font-display text-5xl font-bold text-paper">{animated}</span>
        <span className="mt-1 text-xs uppercase tracking-[0.2em] text-mist">CashScore · 300–900</span>
      </div>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        transition={{ delay: 1.4 }}
        className="mt-2 rounded-full px-4 py-1 text-xs font-semibold"
        style={{ color: style.badgeText, backgroundColor: style.badgeBg }}
      >
        {band} band
      </motion.span>
    </div>
  );
}
