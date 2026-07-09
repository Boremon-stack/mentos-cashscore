"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import type { FactorScore } from "@/lib/scoring";

export default function FactorRadar({ factors, active }: { factors: FactorScore[]; active: boolean }) {
  const data = factors.map((f) => ({ label: f.label, score: active ? f.score : 0 }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="rgba(255,255,255,0.12)" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: "#9fb0a5", fontSize: 12 }}
          />
          <Radar
            dataKey="score"
            stroke="#2bff9e"
            fill="#2bff9e"
            fillOpacity={0.28}
            strokeWidth={2}
            isAnimationActive
            animationDuration={1200}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
