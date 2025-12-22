
import { questions } from "@/lib/quiz/quiz-data";

type University = "admu" | "dlsu" | "up" | "ust";

function calculateMaxScores() {
  const maxScores: Record<University, number> = {
    admu: 0,
    dlsu: 0,
    up: 0,
    ust: 0,
  };

  questions.questions.forEach((q, index) => {
    // console.log(`Question ${index + 1}: ${q.question}`);
    
    let maxAdmu = 0;
    let maxDlsu = 0;
    let maxUp = 0;
    let maxUst = 0;

    q.choices.forEach((c) => {
      if (c.admu > maxAdmu) maxAdmu = c.admu;
      if (c.dlsu > maxDlsu) maxDlsu = c.dlsu;
      if (c.up > maxUp) maxUp = c.up;
      if (c.ust > maxUst) maxUst = c.ust;
    });

    maxScores.admu += maxAdmu;
    maxScores.dlsu += maxDlsu;
    maxScores.up += maxUp;
    maxScores.ust += maxUst;
  });

  return maxScores;
}

const scores = calculateMaxScores();
console.log("Max Scores per University:");
console.log(JSON.stringify(scores, null, 2));
