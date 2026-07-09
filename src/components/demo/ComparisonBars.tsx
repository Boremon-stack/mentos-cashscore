"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts";

export default function ComparisonBars({
  cashScore,
  cibilAvailable,
  cibilScore,
  active,
}: {
  cashScore: number;
  cibilAvailable: boolean;
  cibilScore: number | null;
  active: boolean;
}) {
  const data = [
    {
      name: "CIBIL-only view",
      value: active ? (cibilAvailable ? cibilScore ?? 0 : 0) : 0,
      label: cibilAvailable ? String(cibilScore) : "No file",
      fill: "#3d4048",
    },
    {
      name: "CashScore",
      value: active ? cashScore : 0,
      label: active ? String(cashScore) : "",
      fill: "#2bff9e",
    },
  ];

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 32, top: 8, bottom: 8 }}>
          <XAxis type="number" domain={[0, 900]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fill: "#9fb0a5", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="value" radius={[0, 10, 10, 0]} isAnimationActive animationDuration={1200} barSize={28}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.fill} />
            ))}
            <LabelList dataKey="label" position="right" fill="#f5f1e6" fontSize={13} fontWeight={600} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
