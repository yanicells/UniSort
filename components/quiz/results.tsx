import { IndividualScoresPieChart } from "@/components/charts";

export default function Results({
  score,
  name,
}: {
  score: { admu: number; dlsu: number; up: number; ust: number };
  name: string;
}) {
  const maxScore = Math.max(score.admu, score.dlsu, score.up, score.ust);
  let recommendedUniversity = "";
  let topUni = "";

  if (maxScore === score.admu) {
    recommendedUniversity = "Ateneo de Manila University (ADMU)";
    topUni = "ADMU";
  } else if (maxScore === score.dlsu) {
    recommendedUniversity = "De La Salle University (DLSU)";
    topUni = "DLSU";
  } else if (maxScore === score.up) {
    recommendedUniversity = "University of the Philippines (UP)";
    topUni = "UP";
  } else if (maxScore === score.ust) {
    recommendedUniversity = "University of Santo Tomas (UST)";
    topUni = "UST";
  }

  const isAnonymous = name === "Anonymous";
  const greeting = isAnonymous
    ? `Congrats! Welcome to ${recommendedUniversity}!`
    : `Congrats, ${name}! Welcome to ${recommendedUniversity}!`;

  return (
    <div className="space-y-8">
      {/* Top Match Announcement */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{greeting}</h2>
        <p className="text-xl text-muted-foreground">
          Your top match is <span className="font-semibold">{topUni}</span>
        </p>
      </div>

      {/* Score Breakdown Chart */}
      <div className="max-w-2xl mx-auto">
        <IndividualScoresPieChart scores={score} />
      </div>

      {/* Detailed Scores */}
      <div className="max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Detailed Scores</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
            <span className="font-medium">ADMU:</span>
            <span className="text-lg font-bold">{score.admu}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
            <span className="font-medium">DLSU:</span>
            <span className="text-lg font-bold">{score.dlsu}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
            <span className="font-medium">UP:</span>
            <span className="text-lg font-bold">{score.up}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
            <span className="font-medium">UST:</span>
            <span className="text-lg font-bold">{score.ust}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
