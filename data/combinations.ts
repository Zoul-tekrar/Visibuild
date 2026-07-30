// Boxing combination types and curated combinations will live here.
export type Punch =
  | "jab"
  | "cross"
  | "lead hook"
  | "rear hook"
  | "lead-uppercut"
  | "rear-uppercut";

export type Combination = {
  id: string;
  name: string;
  punches: Punch[];
};

export const combinations: Combination[] = [
  { id: "0", name: "jab", punches: ["jab"] },
  { id: "1", name: "Jc", punches: ["jab", "cross"] },
  { id: "2", name: "Jas", punches: ["jab", "cross", "lead hook"] },
];
