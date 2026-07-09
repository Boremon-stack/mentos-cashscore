"use client";

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { FactorScore } from "@/lib/scoring";
import { WEIGHTS } from "@/lib/scoring";

export default function ContributionChart({ factors }: { factors: FactorScore[] }) {
  const data = factors.map((f) => ({
    name: f.label,
    points: Math.round((f.score * WEIGHTS[f.key]) / 100 * 600),
    label: `+${Math.round((f.score * WEIGHTS[f.key]) / 100 * 600)} pts`,
  }));

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 48, top: 4, bottom: 4 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={130}
            tick={{ fill: "#aebfb9", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="points" radius={[0, 6, 6, 0]} barSize={20} isAnimationActive animationDuration={900}>
            {data.map((_, i) => (
              <Cell key={i} fill="#3968c9" />
            ))}
            <LabelList dataKey="label" position="right" fill="#ffffff" fontSize={12} fontWeight={600} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
