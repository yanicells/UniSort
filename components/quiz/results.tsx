"use client";

import { IndividualScoresPieChart } from "@/components/charts";
import { useMemo } from "react";
import Image from "next/image";
import { universityFeedback } from "@/lib/quiz/result-data";

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

const uniImages = {
  admu: "/ADMU.png",
  dlsu: "/DLSU.png",
  up: "/UP.png",
  ust: "/UST.PNG", // Note the PNG extension case from prompt
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

    // Fallback for edge cases (like exactly 100 or slightly out of bounds due to rounding)
    if (!range) {
      // If percentage is high but not winner (unlikely but possible), use highest range
      if (percentage >= 65) return data.ranges[data.ranges.length - 1].text;
      return data.ranges[0].text;
    }

    return range.text;
  };

  const isAnonymous = name === "Anonymous";
  const greeting = isAnonymous
    ? `Welcome to ${recommendedUniversity}!`
    : `${name}, welcome to ${recommendedUniversity}!`;

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-8 px-4">
      {/* Hero Section */}
      <section className="text-center space-y-4 md:space-y-6 border-b-4 md:border-b-8 border-black pb-8 md:pb-12">
        <div className="inline-block bg-black text-white px-4 md:px-6 py-2 font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-xs md:text-sm lg:text-base transform -rotate-2">
          Breaking News
        </div>
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4 px-2"
          style={{ color: uniColors[topMatch.uni as keyof typeof uniColors] }}
        >
          CONGRATULATIONS!
        </h1>
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-serif italic text-slate-700 px-4">
          {greeting}
        </h2>
      </section>

      {/* Main Story - Winner */}
      <section className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="md:col-span-7 space-y-4 md:space-y-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={uniImages[topMatch.uni as keyof typeof uniImages]}
              alt={recommendedUniversity}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 bg-black text-white px-2 md:px-4 py-1 md:py-2 font-bold font-mono text-sm md:text-base lg:text-xl">
              MATCH: {topMatch.percentage}%
            </div>
          </div>
          <div className="prose prose-sm md:prose-lg max-w-none font-serif text-slate-800 leading-relaxed">
            <h3 className="font-sans font-black text-base md:text-xl lg:text-2xl xl:text-3xl uppercase mb-3 md:mb-4 border-b-2 border-black pb-2">
              The Verdict
            </h3>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl">
              {getFeedbackText(topMatch.uni, topMatch.percentage, true)}
            </p>
          </div>
        </div>

        {/* Sidebar - Stats & Quick Facts */}
        <div className="md:col-span-5 space-y-6 md:space-y-8">
          <div className="bg-slate-50 border-2 border-black p-3 md:p-4 overflow-hidden">
            <h4 className="font-black uppercase text-sm md:text-base lg:text-lg mb-3 md:mb-4 border-b-2 border-black pb-2">
              By The Numbers
            </h4>
            <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full mb-4 md:mb-6">
              <IndividualScoresPieChart scores={score} />
            </div>
            <div className="space-y-2 md:space-y-3">
              {sortedScores.map((item) => {
                const uniKey = item.uni as keyof typeof uniColors;
                return (
                  <div
                    key={item.uni}
                    className="flex items-center justify-between border-b border-slate-200 pb-1 last:border-0"
                  >
                    <span className="font-bold uppercase text-xs md:text-sm">
                      {item.uni}
                    </span>
                    <span
                      className="font-mono font-bold"
                      style={{ color: uniColors[uniKey] }}
                    >
                      {item.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-black p-4 md:p-6 transform rotate-0 md:rotate-1 shadow-md">
            <h4 className="font-black uppercase text-sm md:text-base lg:text-lg mb-2 text-red-600">
              Editor's Note
            </h4>
            <p className="font-serif italic text-xs md:text-sm leading-relaxed">
              "This result is based on a comprehensive analysis of your
              personality traits, study habits, and social preferences. Welcome
              to your new home."
            </p>
          </div>
        </div>
      </section>

      {/* Other Headlines - Non-Winners */}
      <section className="border-t-2 md:border-t-4 border-black pt-8 md:pt-12">
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-6 md:mb-8">
          <h3 className="font-black uppercase text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight">
            In Other News
          </h3>
          <div className="h-1 flex-1 bg-black"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {sortedScores.slice(1).map((item) => (
            <div
              key={item.uni}
              className="flex flex-col h-full border-l-2 border-slate-200 pl-3 md:pl-4 lg:pl-6 hover:border-black transition-colors duration-300"
            >
              <div className="mb-3 md:mb-4">
                <span
                  className="text-3xl md:text-4xl lg:text-5xl font-black block mb-1"
                  style={{
                    color: uniColors[item.uni as keyof typeof uniColors],
                  }}
                >
                  {item.percentage}%
                </span>
                <span className="font-bold uppercase text-xs md:text-sm tracking-widest text-slate-500">
                  {uniFullNames[item.uni as keyof typeof uniFullNames]}
                </span>
              </div>
              <p className="text-xs md:text-sm font-serif text-slate-700 leading-relaxed flex-grow">
                {getFeedbackText(item.uni, item.percentage, false)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Action Bar */}
      <section className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center pt-8 md:pt-12 pb-6 md:pb-8 border-t border-slate-200 mt-8 md:mt-12">
        <a
          className="text-center text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-black uppercase tracking-widest text-[10px] sm:text-xs md:text-sm hover:opacity-90 transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
          style={{
            backgroundColor: uniColors[topMatch.uni as keyof typeof uniColors],
          }}
          href={`/${topMatch.uni}`}
        >
          Explore {topMatch.uni.toUpperCase()} →
        </a>
        <a
          className="text-center bg-white text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-black uppercase tracking-widest text-[10px] sm:text-xs md:text-sm border-2 border-black hover:bg-slate-50 transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
          href="/big4"
        >
          All Universities
        </a>
        <a
          className="text-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm text-slate-500 hover:text-black transition-colors underline decoration-2 underline-offset-4"
          href="/quiz"
        >
          Retake Quiz
        </a>
      </section>

      <div className="text-center text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        UniSort Intelligence Unit • Vol. 1 • Issue 1 •{" "}
        {new Date().getFullYear()}
      </div>
    </div>
  );
}
