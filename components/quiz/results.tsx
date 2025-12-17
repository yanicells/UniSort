"use client";

import { IndividualScoresPieChart } from "@/components/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";

const uniColors = {
  admu: "#0033A0",
  dlsu: "#006747",
  up: "#8B0000",
  ust: "#FDB71A",
};

const uniFullNames = {
  admu: "Ateneo de Manila University",
  dlsu: "De La Salle University",
  up: "University of the Philippines",
  ust: "University of Santo Tomas",
};

export default function Results({
  score,
  name,
}: {
  score: { admu: number; dlsu: number; up: number; ust: number };
  name: string;
}) {
  const totalScore = score.admu + score.dlsu + score.up + score.ust;

  const percentages = useMemo(
    () => ({
      admu: Math.round((score.admu / totalScore) * 100),
      dlsu: Math.round((score.dlsu / totalScore) * 100),
      up: Math.round((score.up / totalScore) * 100),
      ust: Math.round((score.ust / totalScore) * 100),
    }),
    [score, totalScore]
  );

  const sortedScores = useMemo(() => {
    return [
      { uni: "admu", score: score.admu, percentage: percentages.admu },
      { uni: "dlsu", score: score.dlsu, percentage: percentages.dlsu },
      { uni: "up", score: score.up, percentage: percentages.up },
      { uni: "ust", score: score.ust, percentage: percentages.ust },
    ].sort((a, b) => b.score - a.score);
  }, [score, percentages]);

  const topMatch = sortedScores[0];
  const topUni = topMatch.uni.toUpperCase();
  const recommendedUniversity =
    uniFullNames[topMatch.uni as keyof typeof uniFullNames];

  const getResultMessage = () => {
    const topPercentage = topMatch.percentage;
    const secondPercentage = sortedScores[1].percentage;
    const difference = topPercentage - secondPercentage;

    if (topPercentage >= 40) {
      return `You have a strong alignment with ${topUni} at ${topPercentage}%! Your personality and values strongly resonate with this university's culture.`;
    } else if (difference >= 15) {
      return `You're ${topPercentage}% ${topUni}, with a clear lead over other universities. This suggests a good fit with ${topUni}'s values and environment.`;
    } else if (difference < 10) {
      return `You're ${topPercentage}% ${topUni}, but it's a close match with ${sortedScores[1].uni.toUpperCase()} at ${secondPercentage}%. You'd likely thrive at multiple universities!`;
    } else {
      return `You're ${topPercentage}% ${topUni}. Your profile shows you'd be a great fit for this university's community and culture.`;
    }
  };

  const getUniDescription = (uni: string, percentage: number, rank: number) => {
    if (rank === 0) return null; // Top match already has description above

    if (percentage >= 30) {
      return `With ${percentage}%, ${uni.toUpperCase()} is also a strong match for you. You share many values with this university.`;
    } else if (percentage >= 20) {
      return `At ${percentage}%, ${uni.toUpperCase()} shows moderate compatibility. You have some alignment with this university's culture.`;
    } else if (percentage >= 10) {
      return `${uni.toUpperCase()} represents ${percentage}% of your profile, showing some shared characteristics.`;
    } else {
      return `While ${uni.toUpperCase()} is your lowest match at ${percentage}%, every university has unique strengths.`;
    }
  };

  const isAnonymous = name === "Anonymous";
  const greeting = isAnonymous
    ? `Welcome to ${recommendedUniversity}!`
    : `${name}, welcome to ${recommendedUniversity}!`;

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      <section className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold">Congratulations! 🎉</h1>
        <p className="text-xl md:text-2xl text-foreground/80">
          You&apos;re a{" "}
          <span
            className="font-bold"
            style={{ color: uniColors[topMatch.uni as keyof typeof uniColors] }}
          >
            {topMatch.percentage}%
          </span>{" "}
          match with
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: uniColors[topMatch.uni as keyof typeof uniColors] }}
        >
          {recommendedUniversity}
        </h2>
        <p className="text-base text-foreground/70 max-w-2xl mx-auto">
          {getResultMessage()}
        </p>
      </section>

      <section className="card">
        <h3 className="text-xl font-semibold mb-3">Your Personality Fit</h3>
        <p className="text-foreground/80 leading-relaxed">
          {greeting} Based on your answers, your values and preferences align
          closely with {recommendedUniversity}&apos;s community and campus vibe.
        </p>
      </section>

      <section className="card">
        <h3 className="text-xl font-semibold mb-4">Your Full Results</h3>
        <div className="max-w-2xl mx-auto">
          <IndividualScoresPieChart scores={score} />
        </div>
        <div className="mt-4 space-y-3">
          {sortedScores.map((item) => {
            const uniKey = item.uni as keyof typeof uniColors;
            const maxScore = sortedScores[0].score;
            const widthPercentage = (item.score / maxScore) * 100;

            return (
              <div key={item.uni} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">
                    {item.uni.toUpperCase()}
                  </span>
                  <span className="text-foreground/60">
                    {item.score} points ({item.percentage}%)
                  </span>
                </div>
                <div className="h-7 w-full bg-muted rounded-md overflow-hidden">
                  <div
                    className="h-full flex items-center justify-end px-3 text-white text-sm font-medium transition-all duration-500 ease-out"
                    style={{
                      width: `${widthPercentage}%`,
                      backgroundColor: uniColors[uniKey],
                    }}
                  >
                    {widthPercentage > 15 && `${item.percentage}%`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold">Other Matches</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {sortedScores.slice(1).map((item) => (
            <div
              key={item.uni}
              className="card text-center p-3 border border-border shadow-sm hover:shadow-md transition"
            >
              <p
                className="text-2xl font-bold"
                style={{ color: uniColors[item.uni as keyof typeof uniColors] }}
              >
                {item.percentage}%
              </p>
              <p className="text-foreground/70 mt-1 text-sm">
                {uniFullNames[item.uni as keyof typeof uniFullNames]}
              </p>
              <p className="text-xs text-foreground/60 mt-1">
                {getUniDescription(item.uni, item.percentage, 1)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-2 justify-center pb-2">
        <a
          className="primary-button text-xs md:text-sm py-2"
          href={`/${topMatch.uni}`}
          style={{
            backgroundColor: uniColors[topMatch.uni as keyof typeof uniColors],
          }}
        >
          Explore {recommendedUniversity} →
        </a>
        <a className="secondary-button text-xs md:text-sm py-2" href="/big4">
          View All Universities
        </a>
        <button className="secondary-button text-xs md:text-sm py-2">
          Share Results 🔗
        </button>
        <a className="secondary-button text-xs md:text-sm py-2" href="/quiz">
          Retake Quiz ↻
        </a>
      </section>

      <div className="text-center text-xs md:text-sm text-foreground/60 pb-2">
        These results are based on your responses to the personality and
        preference quiz.
      </div>
    </div>
  );
}
