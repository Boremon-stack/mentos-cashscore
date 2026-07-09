"use client";

import { useEffect, useState } from "react";
import type { EmiRecord, FactorScore, SalaryCredit, UpiTxn } from "@/lib/scoring";
import { WEIGHTS } from "@/lib/scoring";

function useReveal(total: number, durationMs: number, deps: unknown[]) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    if (total <= 0) return;
    const stepTime = Math.max(16, durationMs / total);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCount(Math.min(i, total));
      if (i >= total) clearInterval(id);
    }, stepTime);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return count;
}

export function LiveUpiPanel({ upi, durationMs }: { upi: UpiTxn[]; durationMs: number }) {
  const count = useReveal(upi.length, durationMs, [upi, durationMs]);
  const visible = upi.slice(0, count);
  const runningTotal = visible.reduce((s, t) => s + t.amount, 0);
  const recent = visible.slice(-28);

  return (
    <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-2xl font-semibold text-signal">
          {count}
          <span className="ml-1 text-sm font-normal text-mist">/ {upi.length} UPI txns</span>
        </span>
        <span className="font-mono text-xs text-mist">₹{runningTotal.toLocaleString("en-IN")} tracked</span>
      </div>
      <div className="mt-3 flex h-10 items-end gap-[3px]">
        {recent.map((t, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-signal/70 transition-all duration-200"
            style={{ height: `${Math.min(40, 6 + t.amount / 60)}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export function LiveEmiPanel({ emi, durationMs }: { emi: EmiRecord[]; durationMs: number }) {
  const count = useReveal(emi.length, durationMs, [emi, durationMs]);
  const visible = emi.slice(0, count);
  const onTime = visible.filter((e) => e.onTime).length;

  return (
    <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="flex gap-2">
        {emi.map((e, i) => {
          const shown = i < count;
          return (
            <div
              key={e.month}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-[11px] font-semibold transition-all duration-300 ${
                !shown
                  ? "border-white/8 text-transparent"
                  : e.onTime
                  ? "border-signal bg-signal/15 text-signal"
                  : "border-danger bg-danger/15 text-danger"
              }`}
            >
              {shown ? e.month : "•"}
            </div>
          );
        })}
      </div>
      <p className="mt-3 font-mono text-sm text-paper">
        <span className="text-signal">{onTime}</span>
        <span className="text-mist">/{count || 0} cycles on-time so far</span>
      </p>
    </div>
  );
}

export function LiveSalaryPanel({ salary, durationMs }: { salary: SalaryCredit[]; durationMs: number }) {
  const count = useReveal(salary.length, durationMs, [salary, durationMs]);
  const visible = salary.slice(0, count);
  const days = visible.map((s) => s.day);
  const spread = days.length ? Math.max(...days) - Math.min(...days) : 0;

  return (
    <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="space-y-1.5">
        {salary.map((s, i) => {
          const shown = i < count;
          return (
            <div
              key={s.month}
              className={`flex items-center justify-between font-mono text-xs transition-opacity duration-300 ${
                shown ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-mist">{s.month} credit</span>
              <span className="text-paper">day {s.day} · ₹{s.amount.toLocaleString("en-IN")}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-2 font-mono text-sm text-signal">±{spread.toFixed(0)}d date spread so far</p>
    </div>
  );
}

export function LiveComposePanel({
  factors,
  cashScore,
  durationMs,
}: {
  factors: FactorScore[];
  cashScore: number;
  durationMs: number;
}) {
  const totalStages = factors.length + 2;
  const stage = useReveal(totalStages, durationMs, [factors, durationMs]);

  const weighted = factors.map((f) => ({
    ...f,
    weight: WEIGHTS[f.key],
    contribution: f.score * WEIGHTS[f.key],
  }));
  const runningSum = weighted
    .slice(0, Math.min(stage, factors.length))
    .reduce((s, f) => s + f.contribution, 0);

  return (
    <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-4 font-mono text-sm">
      <div className="space-y-1.5">
        {weighted.map(
          (f, i) =>
            i < stage && (
              <div key={f.key} className="flex justify-between text-mist">
                <span>
                  {f.label} — {f.score} × {Math.round(f.weight * 100)}%
                </span>
                <span className="text-paper">{f.contribution.toFixed(1)}</span>
              </div>
            )
        )}
      </div>
      {stage > factors.length && (
        <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-semibold text-paper">
          <span>Weighted composite</span>
          <span>{runningSum.toFixed(1)} / 100</span>
        </div>
      )}
      {stage > factors.length + 1 && (
        <div className="mt-1 flex justify-between text-base font-bold text-signal">
          <span>→ mapped to 300–900</span>
          <span>{cashScore}</span>
        </div>
      )}
    </div>
  );
}
