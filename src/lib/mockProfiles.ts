import type { EmiRecord, Persona, SalaryCredit, UpiTxn } from "./scoring";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

function genUpi(rand: () => number, regularity: number, volume: number): UpiTxn[] {
  const txns: UpiTxn[] = [];
  const count = Math.round(volume * (0.85 + rand() * 0.3));
  let day = 1;
  for (let i = 0; i < count; i++) {
    const gap = Math.max(0.5, regularity + (rand() - 0.5) * regularity * 1.6);
    day += gap;
    if (day > 90) break;
    txns.push({ day: Math.round(day * 10) / 10, amount: Math.round(150 + rand() * 2200) });
  }
  return txns;
}

function genEmi(rand: () => number, reliability: number): EmiRecord[] {
  return MONTHS.map((month) => {
    const roll = rand();
    const onTime = roll < reliability;
    return {
      month,
      onTime,
      daysLate: onTime ? 0 : Math.round(1 + rand() * 6),
    };
  });
}

function genSalary(rand: () => number, baseDay: number, jitter: number, baseAmount: number): SalaryCredit[] {
  return MONTHS.map((month) => ({
    month,
    day: clampDay(Math.round(baseDay + (rand() - 0.5) * jitter * 2)),
    amount: Math.round(baseAmount * (0.97 + rand() * 0.06)),
  }));
}

function clampDay(d: number) {
  return Math.max(1, Math.min(28, d));
}

const ARCHETYPES = [
  {
    id: "rohan",
    name: "Rohan Verma",
    age: 27,
    occupation: "Freelance UI Designer, Pune",
    cibilAvailable: false,
    cibilScore: null,
    regularity: 2.4,
    volume: 42,
    reliability: 0.95,
    salaryDay: 1,
    salaryJitter: 0.6,
    salaryAmount: 58000,
  },
  {
    id: "simran",
    name: "Simran Kaur",
    age: 31,
    occupation: "Boutique Owner, Ludhiana",
    cibilAvailable: true,
    cibilScore: 612,
    regularity: 1.8,
    volume: 61,
    reliability: 0.98,
    salaryDay: 3,
    salaryJitter: 1.1,
    salaryAmount: 74000,
  },
  {
    id: "arjun",
    name: "Arjun Mehta",
    age: 24,
    occupation: "Gig Delivery Partner, Bengaluru",
    cibilAvailable: false,
    cibilScore: null,
    regularity: 1.2,
    volume: 88,
    reliability: 0.88,
    salaryDay: 5,
    salaryJitter: 3.2,
    salaryAmount: 31000,
  },
] as const;

export function getPersona(archetypeId: string, seed = Date.now()): Persona {
  const archetype = ARCHETYPES.find((a) => a.id === archetypeId) ?? ARCHETYPES[0];
  const rand = mulberry32(seed);
  return {
    id: archetype.id,
    name: archetype.name,
    age: archetype.age,
    occupation: archetype.occupation,
    cibilAvailable: archetype.cibilAvailable,
    cibilScore: archetype.cibilScore,
    upi: genUpi(rand, archetype.regularity, archetype.volume),
    emi: genEmi(rand, archetype.reliability),
    salary: genSalary(rand, archetype.salaryDay, archetype.salaryJitter, archetype.salaryAmount),
  };
}

export function listArchetypes() {
  return ARCHETYPES.map(({ id, name, occupation }) => ({ id, name, occupation }));
}
