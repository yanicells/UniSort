"use client";

import { University } from "@/lib/quiz/quiz-constants";
import { UniversityDetailedScore } from "@/lib/quiz/scoring";
import ResultDesign6 from "./results/ResultDesign6";

export default function Results({
  score,
  breakdown,
  name,
  onRetake,
}: {
  score: { admu: number; dlsu: number; up: number; ust: number };
  breakdown?: Record<University, UniversityDetailedScore> | null;
  name: string;
  onRetake: () => void;
}) {
  return (
    <div className="w-full">
      <ResultDesign6 
        score={score} 
        breakdown={breakdown} 
        name={name} 
        onRetake={onRetake} 
      />
    </div>
  );
}
