
export const MAX_SCORES = {
  admu: 502,
  dlsu: 531,
  up: 576,
  ust: 497,
} as const;

export type University = keyof typeof MAX_SCORES;
