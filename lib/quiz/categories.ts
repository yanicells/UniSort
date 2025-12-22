
export const CATEGORY_MAPPING = {
  "Academic Experience": [
    "Academic Structure & Admin Support",
    "Schedule, Pace & Structure",
  ],
  "Social & Cultural Fit": [
    "Social Environment, Class & Language",
    "Student Organizations & Networking",
  ],
  "Campus Life": [
    "Campus Environment, Aesthetics & Safety",
    "Lifestyle, Food & Financials",
    "Social Life & Traditions",
  ],
  "Values & Identity": [
    "Values, Religion & Personal Growth",
    "Political Climate & Activism",
    "Inclusivity, Expression & Mental Health",
  ],
} as const;

export type CategoryName = keyof typeof CATEGORY_MAPPING;

export function getCategoryForSection(section: string): CategoryName | null {
  for (const [category, sections] of Object.entries(CATEGORY_MAPPING)) {
    if ((sections as readonly string[]).includes(section)) {
      return category as CategoryName;
    }
  }
  return null;
}

export function getStatusFromPercentage(percentage: number): string {
  if (percentage >= 85) return "Perfect Match";
  if (percentage >= 70) return "Strong Alignment";
  if (percentage >= 50) return "Good Fit";
  if (percentage >= 30) return "Moderate Interest";
  return "Low Compatibility";
}
