"use client";

import { useEffect, useRef, useState } from "react";

export type LogLine = { atMs: number; text: string; emphasis?: boolean };

function formatClock(ms: number) {
  const totalSec = ms / 1000;
  const m = Math.floor(totalSec / 60);
  const s = (totalSec % 60).toFixed(1).padStart(4, "0");
  return `${String(m).padStart(2, "0")}:${s}`;
}

export default function ProcessLog({
  lines,
  active,
  resetKey,
}: {
  lines: LogLine[];
  active: boolean;
  resetKey: number | string;
}) {
  const [shown, setShown] = useState<LogLine[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShown([]);
    if (!active) return;
    const timers = lines.map((line) => setTimeout(() => setShown((prev) => [...prev, line]), line.atMs));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, resetKey]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [shown]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-mist">Process log</p>
      <div
        ref={boxRef}
        className="mt-2 max-h-52 overflow-y-auto rounded-2xl border border-white/8 bg-black/40 p-4 font-mono text-[11px] leading-relaxed"
      >
        {shown.length === 0 && <p className="text-mist">Waiting for first response…</p>}
        {shown.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="shrink-0 text-paper-dim/70">[{formatClock(line.atMs)}]</span>
            <span className={line.emphasis ? "font-semibold text-signal" : "text-mist"}>{line.text}</span>
          </div>
        ))}
        {active && <span className="mt-1 inline-block h-3 w-1.5 animate-ticker bg-signal align-middle" />}
      </div>
    </div>
  );
}
