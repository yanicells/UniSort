"use client";

import { IndividualScoresPieChart } from "@/components/charts";
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
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <section className="text-center space-y-4 border-b-4 border-black pb-8">
        <div className="inline-block bg-black text-white px-4 py-1 font-bold uppercase tracking-widest text-sm mb-2">
          Breaking News
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
          It's {topUni}!
        </h1>
        <p className="text-xl md:text-2xl font-serif italic text-slate-600 max-w-2xl mx-auto">
          Analysis confirms a{" "}
          <span
            className="font-bold not-italic"
            style={{ color: uniColors[topMatch.uni as keyof typeof uniColors] }}
          >
            {topMatch.percentage}% match
          </span>{" "}
          with {recommendedUniversity}.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-black uppercase text-xl mb-4 border-b-2 border-black pb-2">
            Editorial: The Verdict
          </h3>
          <div className="prose font-serif text-slate-800 leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
              {greeting} {getResultMessage()}
            </p>
            <p className="mt-4">
              Based on your answers, your values and preferences align closely
              with {recommendedUniversity}&apos;s community and campus vibe.
            </p>
          </div>
        </section>

        <section className="border-2 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-black uppercase text-xl mb-4 border-b-2 border-black pb-2">
            By The Numbers
          </h3>
          <div className="max-w-xs mx-auto mb-6">
            <IndividualScoresPieChart scores={score} />
          </div>
          <div className="space-y-3">
            {sortedScores.map((item) => {
              const uniKey = item.uni as keyof typeof uniColors;
              const maxScore = sortedScores[0].score;
              const widthPercentage = (item.score / maxScore) * 100;

              return (
                <div key={item.uni} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span>{item.uni}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 border border-black overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 ease-out border-r border-black"
                      style={{
                        width: `${widthPercentage}%`,
                        backgroundColor: uniColors[uniKey],
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="border-t-2 border-black pt-8">
        <h3 className="font-black uppercase text-2xl mb-6 text-center">
          Other Headlines
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {sortedScores.slice(1).map((item) => (
            <div
              key={item.uni}
              className="border border-slate-300 p-4 hover:border-black transition-colors bg-white"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className="text-3xl font-black"
                  style={{
                    color: uniColors[item.uni as keyof typeof uniColors],
                  }}
                >
                  {item.percentage}%
                </span>
                <span className="font-bold uppercase text-sm text-slate-500">
                  {item.uni}
                </span>
              </div>
              <p className="text-sm font-serif text-slate-600 leading-snug">
                {getUniDescription(item.uni, item.percentage, 1)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-4 justify-center pt-8 pb-4">
        <a
          className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-colors border-2 border-transparent"
          href={`/${topMatch.uni}`}
        >
          Read More About {topMatch.uni.toUpperCase()} →
        </a>
        <a
          className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-slate-50 transition-colors border-2 border-black"
          href="/big4"
        >
          See All Universities
        </a>
        <a
          className="text-slate-500 px-6 py-3 font-bold uppercase tracking-widest text-sm hover:text-black transition-colors underline decoration-2 underline-offset-4"
          href="/quiz"
        >
          Retake Quiz
        </a>
      </section>

      <div className="text-center text-xs font-mono text-slate-400 uppercase tracking-widest border-t border-slate-200 pt-4">
        UniSort Intelligence Unit • Vol. 1 • Issue 1
      </div>
    </div>
  );
}
