import { useMemo } from "react";
import { University, MAX_SCORES } from "@/lib/quiz/quiz-constants";
import { UniversityDetailedScore } from "@/lib/quiz/scoring";
import { universityFeedback } from "@/lib/quiz/result-data";

export function useResultsData({
  score,
  breakdown,
  name,
}: {
  score: { admu: number; dlsu: number; up: number; ust: number };
  breakdown?: Record<University, UniversityDetailedScore> | null;
  name: string;
}) {
  const percentages = useMemo(() => {
    // Use normalized percentages from breakdown if available
    if (breakdown) {
      return {
        admu: breakdown.admu.normalizedPercentage || 0,
        dlsu: breakdown.dlsu.normalizedPercentage || 0,
        up: breakdown.up.normalizedPercentage || 0,
        ust: breakdown.ust.normalizedPercentage || 0,
      };
    }

    // Fallback to old calculation (for backward compatibility)
    return {
      admu: Math.round((score.admu / MAX_SCORES.admu) * 100),
      dlsu: Math.round((score.dlsu / MAX_SCORES.dlsu) * 100),
      up: Math.round((score.up / MAX_SCORES.up) * 100),
      ust: Math.round((score.ust / MAX_SCORES.ust) * 100),
    };
  }, [score, breakdown]);

  const sortedScores = useMemo(() => {
    return [
      { uni: "admu", score: score.admu, percentage: percentages.admu },
      { uni: "dlsu", score: score.dlsu, percentage: percentages.dlsu },
      { uni: "up", score: score.up, percentage: percentages.up },
      { uni: "ust", score: score.ust, percentage: percentages.ust },
    ].sort((a, b) => b.percentage - a.percentage);
  }, [score, percentages]);

  const topMatch = sortedScores[0];

  const categoryChampions = useMemo(() => {
    if (!breakdown) return [];
    
    const categories = Object.keys(breakdown.admu.categories.reduce((acc, curr) => ({ ...acc, [curr.category]: true }), {}));
    
    return (categories as string[]).map(catName => {
      let bestUni = "admu" as University;
      let maxPercent = -1;
      
      // Use normalized percentages for comparison
      (["admu", "dlsu", "up", "ust"] as University[]).forEach(uni => {
        const cat = breakdown[uni]?.categories.find(c => c.category === catName);
        if (cat && cat.normalizedPercentage > maxPercent) {
          maxPercent = cat.normalizedPercentage;
          bestUni = uni;
        }
      });
      
      return {
        category: catName,
        university: bestUni,
        percentage: maxPercent,
        status: breakdown[bestUni]?.categories.find(c => c.category === catName)?.status || ""
      };
    });
  }, [breakdown]);

  const getFeedbackText = (
    uni: string,
    percentage: number,
    isWinner: boolean
  ) => {
    const data = universityFeedback[uni as keyof typeof universityFeedback];
    if (!data) return "";

    if (isWinner) {
      return data.winner;
    }

    const range = data.ranges.find(
      (r) => percentage >= r.min && percentage < r.max
    );

    if (!range) {
      if (percentage >= 65) return data.ranges[data.ranges.length - 1].text;
      return data.ranges[0].text;
    }

    return range.text;
  };

  return {
    percentages,
    sortedScores,
    topMatch,
    categoryChampions,
    getFeedbackText,
  };
}
