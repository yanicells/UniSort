import { CategoryName } from "./categories";

export const MAX_SCORES = {
  admu: 502,
  dlsu: 531,
  up: 576,
  ust: 497,
} as const;

export const MIN_SCORES = {
  admu: 93,
  dlsu: 88,
  up: 59,
  ust: 92,
} as const;

export const CATEGORY_MAX_SCORES = {
  admu: {
    "Academic Experience": 113,
    "Social & Cultural Fit": 120,
    "Campus Life": 140,
    "Values & Identity": 129
  },
  dlsu: {
    "Academic Experience": 124,
    "Social & Cultural Fit": 122,
    "Campus Life": 169,
    "Values & Identity": 116
  },
  up: {
    "Academic Experience": 140,
    "Social & Cultural Fit": 136,
    "Campus Life": 164,
    "Values & Identity": 136
  },
  ust: {
    "Academic Experience": 102,
    "Social & Cultural Fit": 121,
    "Campus Life": 149,
    "Values & Identity": 125
  }
} as const;

export const CATEGORY_MIN_SCORES = {
  admu: {
    "Academic Experience": 15,
    "Social & Cultural Fit": 21,
    "Campus Life": 32,
    "Values & Identity": 25
  },
  dlsu: {
    "Academic Experience": 11,
    "Social & Cultural Fit": 19,
    "Campus Life": 27,
    "Values & Identity": 31
  },
  up: {
    "Academic Experience": 2,
    "Social & Cultural Fit": 14,
    "Campus Life": 29,
    "Values & Identity": 14
  },
  ust: {
    "Academic Experience": 13,
    "Social & Cultural Fit": 33,
    "Campus Life": 30,
    "Values & Identity": 16
  }
} as const;

export type University = keyof typeof MAX_SCORES;
