export type UpiTxn = { day: number; amount: number };
export type EmiRecord = { month: string; onTime: boolean; daysLate: number };
export type SalaryCredit = { month: string; day: number; amount: number };

export type Persona = {
  id: string;
  name: string;
  age: number;
  occupation: string;
  cibilAvailable: boolean;
  cibilScore: number | null;
  upi: UpiTxn[];
  emi: EmiRecord[];
  salary: SalaryCredit[];
};

export type FactorScore = {
  key: "upi" | "emi" | "salary";
  label: string;
  score: number;
  detail: string;
};

export type ScoreResult = {
  cashScore: number;
  band: "Prime" | "Near-Prime" | "Building" | "Watch";
  factors: FactorScore[];
};

function mean(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function stdev(nums: number[]) {
  const m = mean(nums);
  return Math.sqrt(mean(nums.map((n) => (n - m) ** 2)));
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export function scoreUpiFrequency(upi: UpiTxn[]): FactorScore {
  const txnCount = upi.length;
  const days = upi.map((t) => t.day).sort((a, b) => a - b);
  const gaps = days.slice(1).map((d, i) => d - days[i]);
  const regularity = gaps.length ? 100 - clamp(stdev(gaps) * 8) : 40;
  const volumeScore = clamp((txnCount / 60) * 100);
  const score = clamp(volumeScore * 0.55 + regularity * 0.45);
  return {
    key: "upi",
    label: "UPI Frequency",
    score: Math.round(score),
    detail: `${txnCount} txns / 90 days · steady spend rhythm`,
  };
}

export function scoreEmiRegularity(emi: EmiRecord[]): FactorScore {
  if (!emi.length) {
    return { key: "emi", label: "EMI Regularity", score: 50, detail: "No active EMIs on record" };
  }
  const onTimeRatio = emi.filter((e) => e.onTime).length / emi.length;
  const avgLate = mean(emi.map((e) => e.daysLate));
  const score = clamp(onTimeRatio * 100 - avgLate * 3);
  return {
    key: "emi",
    label: "EMI Regularity",
    score: Math.round(score),
    detail: `${Math.round(onTimeRatio * 100)}% on-time across ${emi.length} cycles`,
  };
}

export function scoreSalaryConsistency(salary: SalaryCredit[]): FactorScore {
  if (!salary.length) {
    return { key: "salary", label: "Salary Consistency", score: 30, detail: "No recurring credit detected" };
  }
  const dayStd = stdev(salary.map((s) => s.day));
  const amounts = salary.map((s) => s.amount);
  const amountVariance = stdev(amounts) / mean(amounts);
  const dateScore = clamp(100 - dayStd * 18);
  const amountScore = clamp(100 - amountVariance * 220);
  const score = clamp(dateScore * 0.6 + amountScore * 0.4);
  return {
    key: "salary",
    label: "Salary Consistency",
    score: Math.round(score),
    detail: `Credited within ±${dayStd.toFixed(1)} days, ${salary.length} months tracked`,
  };
}

const WEIGHTS = { upi: 0.28, emi: 0.4, salary: 0.32 };

export function computeCashScore(persona: Persona): ScoreResult {
  const upi = scoreUpiFrequency(persona.upi);
  const emi = scoreEmiRegularity(persona.emi);
  const salary = scoreSalaryConsistency(persona.salary);
  const factors = [upi, emi, salary];

  const weighted =
    upi.score * WEIGHTS.upi + emi.score * WEIGHTS.emi + salary.score * WEIGHTS.salary;

  const cashScore = Math.round(300 + (weighted / 100) * 600);

  let band: ScoreResult["band"] = "Watch";
  if (cashScore >= 750) band = "Prime";
  else if (cashScore >= 650) band = "Near-Prime";
  else if (cashScore >= 550) band = "Building";

  return { cashScore, band, factors };
}
