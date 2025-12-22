import { University } from "@/lib/quiz/quiz-constants";
import { UniversityDetailedScore } from "@/lib/quiz/scoring";

export interface ResultsDesignProps {
  score: { admu: number; dlsu: number; up: number; ust: number };
  breakdown?: Record<University, UniversityDetailedScore> | null;
  name: string;
  onRetake: () => void;
}
