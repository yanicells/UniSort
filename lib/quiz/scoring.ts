
import { questions } from "./quiz-data";
import { CATEGORY_MAPPING, getCategoryForSection, CategoryName } from "./categories";
import { University } from "./quiz-constants";

export interface CategoryScore {
  category: CategoryName;
  score: number;
  maxScore: number;
  percentage: number;
  status: string;
}

export interface UniversityDetailedScore {
  university: University;
  totalScore: number;
  totalMaxScore: number;
  categories: CategoryScore[];
}

export function calculateDetailedScores(answers: (string | null)[]): Record<University, UniversityDetailedScore> {
  const unis: University[] = ["admu", "dlsu", "up", "ust"];
  
  const results: Partial<Record<University, UniversityDetailedScore>> = {};
  unis.forEach(uni => {
    results[uni] = {
      university: uni,
      totalScore: 0,
      totalMaxScore: 0,
      categories: Object.keys(CATEGORY_MAPPING).map(cat => ({
        category: cat as CategoryName,
        score: 0,
        maxScore: 0,
        percentage: 0,
        status: ""
      }))
    };
  });

  const finalResults = results as Record<University, UniversityDetailedScore>;

  questions.questions.forEach((q, index) => {
    const answer = answers[index];
    if (!answer) return;

    const categoryName = getCategoryForSection(q.section);
    if (!categoryName) return;

    const choice = q.choices.find(c => c.text === answer);
    
    // Calculate max possible points for this question per university
    const maxPossiblePoints: Record<University, number> = {
      admu: Math.max(...q.choices.map(c => c.admu)),
      dlsu: Math.max(...q.choices.map(c => c.dlsu)),
      up: Math.max(...q.choices.map(c => c.up)),
      ust: Math.max(...q.choices.map(c => c.ust))
    };

    unis.forEach(uni => {
      const uniResult = finalResults[uni];
      const catResult = uniResult.categories.find((c) => (c.category as string) === (categoryName as string));
      
      if (catResult && choice) {
        catResult.score += choice[uni];
        catResult.maxScore += maxPossiblePoints[uni];
        uniResult.totalScore += choice[uni];
        uniResult.totalMaxScore += maxPossiblePoints[uni];
      }
    });
  });

  // Finalize percentages and status
  const helper = (percentage: number) => {
    if (percentage >= 85) return "Perfect Match";
    if (percentage >= 70) return "Strong Alignment";
    if (percentage >= 50) return "Good Fit";
    if (percentage >= 30) return "Moderate Interest";
    return "Low Compatibility";
  };

  unis.forEach(uni => {
    finalResults[uni].categories.forEach((cat) => {
      cat.percentage = cat.maxScore > 0 ? Math.round((cat.score / cat.maxScore) * 100) : 0;
      cat.status = helper(cat.percentage);
    });
  });

  return finalResults;
}
