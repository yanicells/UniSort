"use client";

import { IndividualScoresPieChart } from "@/components/charts";
import { useMemo } from "react";
import Image from "next/image";
import { universityFeedback } from "@/lib/quiz/result-data";
import { ShareableResultCard } from "./ShareableResultCard";
import { MAX_SCORES, University } from "@/lib/quiz/quiz-constants";
import { UniversityDetailedScore } from "@/lib/quiz/scoring";

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
  admu: "/ADMU-pic.png",
  dlsu: "/DLSU-pic.png",
  up: "/UP-pic.png",
  ust: "/UST-pic.png",
};

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


  const percentages = useMemo(() => {
    if (breakdown) {
      return {
        admu: breakdown.admu.totalMaxScore > 0 ? Math.round((breakdown.admu.totalScore / breakdown.admu.totalMaxScore) * 100) : 0,
        dlsu: breakdown.dlsu.totalMaxScore > 0 ? Math.round((breakdown.dlsu.totalScore / breakdown.dlsu.totalMaxScore) * 100) : 0,
        up: breakdown.up.totalMaxScore > 0 ? Math.round((breakdown.up.totalScore / breakdown.up.totalMaxScore) * 100) : 0,
        ust: breakdown.ust.totalMaxScore > 0 ? Math.round((breakdown.ust.totalScore / breakdown.ust.totalMaxScore) * 100) : 0,
      };
    }

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
  const topUni = topMatch.uni.toUpperCase();
  const recommendedUniversity =
    uniFullNames[topMatch.uni as keyof typeof uniFullNames];

  // Logic for Category Champions
  const categoryChampions = useMemo(() => {
    if (!breakdown) return [];
    
    const categories = Object.keys(breakdown.admu.categories.reduce((acc, curr) => ({ ...acc, [curr.category]: true }), {}));
    
    return (categories as any[]).map(catName => {
      let bestUni = "admu" as University;
      let maxPercent = -1;
      
      (["admu", "dlsu", "up", "ust"] as University[]).forEach(uni => {
        const cat = breakdown[uni]?.categories.find(c => c.category === catName);
        if (cat && cat.percentage > maxPercent) {
          maxPercent = cat.percentage;
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
      <section className="text-center space-y-4 md:space-y-6 border-b-4 md:border-b-8 border-black pb-8 md:pb-12 mb-4 md:mb-6">
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
            <div className="absolute bottom-0 left-0 bg-black text-white px-2 md:px-4 py-1 md:py-2 font-bold font-mono text-sm md:text-base lg:text-xl hidden md:block">
              MATCH: {topMatch.percentage}%
            </div>
          </div>
          <div className="prose prose-sm md:prose-lg max-w-none font-serif text-slate-800 leading-relaxed">
            <h3 className="font-sans font-black text-base md:text-xl lg:text-2xl xl:text-3xl uppercase mb-3 md:mb-4 border-b-2 border-black pb-2 flex items-center justify-between">
              <span>The Verdict</span>
              <span
                className="md:hidden"
                style={{
                  color: uniColors[topMatch.uni as keyof typeof uniColors],
                }}
              >
                Match {topMatch.percentage}%
              </span>
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

          {/* <div className="bg-yellow-50 border-2 border-black p-4 md:p-6 transform rotate-0 md:rotate-1 shadow-md">
            <h4 className="font-black uppercase text-sm md:text-base lg:text-lg mb-2 text-red-600">
              Editor&apos;s Note
            </h4>
            <p className="font-serif italic text-xs md:text-sm leading-relaxed">
              &quot;This result is based on a comprehensive analysis of your
              personality traits, study habits, and social preferences. Welcome
              to your new home.&quot;
            </p>
          </div> */}

          {/* Share Button */}
          <ShareableResultCard
            topUniversity={topMatch.uni as "admu" | "dlsu" | "up" | "ust"}
            percentages={percentages}
            verdict={getFeedbackText(topMatch.uni, topMatch.percentage, true)}
            name={name}
          />
        </div>
      </section>

      {/* Category Champions Summary */}
      {breakdown && categoryChampions.length > 0 && (
        <section className="border-t-2 md:border-t-4 border-black pt-8 md:pt-12 bg-slate-50/50 p-4 md:p-8">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-6 md:mb-8">
            <h3 className="font-black uppercase text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight">
              Best Fit Per Dimension
            </h3>
            <div className="h-1 flex-1 bg-black"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {categoryChampions.map((champ) => (
              <div
                key={champ.category}
                className="bg-white border-2 border-black p-3 md:p-4 flex flex-col items-center text-center space-y-2 md:space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform"
              >
                <div className="text-[10px] md:text-xs font-black uppercase text-slate-500 min-h-[2.5em] flex items-center">
                  {champ.category}
                </div>
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-black flex items-center justify-center font-black text-xs md:text-sm text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  style={{ backgroundColor: uniColors[champ.university as keyof typeof uniColors] }}
                >
                  {champ.university.toUpperCase()}
                </div>
                <div className="space-y-0.5">
                  <div className="font-black text-sm md:text-base">
                    {champ.percentage}%
                  </div>
                  <div className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase leading-tight">
                    {champ.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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

      {/* Category Breakdown Analysis */}
      {breakdown && (
        <section className="border-t-2 md:border-t-4 border-black pt-8 md:pt-12">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-6 md:mb-8">
            <h3 className="font-black uppercase text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tight">
              Detailed Alignment Analysis
            </h3>
            <div className="h-1 flex-1 bg-black"></div>
          </div>

          <div className="space-y-12 md:space-y-16">
            {sortedScores.map((item) => {
              const uniKey = item.uni as University;
              const uniBreakdown = breakdown[uniKey];
              if (!uniBreakdown) return null;

              return (
                <div key={uniKey} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h4 className="font-black uppercase text-lg md:text-xl lg:text-2xl" style={{ color: uniColors[uniKey] }}>
                      {uniFullNames[uniKey]}
                    </h4>
                    <div className="flex-1 h-[2px] bg-slate-200"></div>
                    <div className="bg-black text-white px-3 py-1 font-mono font-bold text-sm">
                      TOTAL MATCH: {item.percentage}%
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    {uniBreakdown.categories.map((cat) => (
                      <div
                        key={cat.category}
                        className="bg-white border-2 border-black p-4 md:p-5 space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-black uppercase text-xs md:text-sm">
                              {cat.category}
                            </h5>
                            <span className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase">
                              {cat.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <span
                              className="text-lg md:text-xl font-black"
                              style={{ color: uniColors[uniKey] }}
                            >
                              {cat.percentage}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="h-2.5 md:h-3 bg-slate-100 border border-black/10 overflow-hidden relative">
                            <div
                              className="h-full transition-all duration-1000"
                              style={{
                                width: `${cat.percentage}%`,
                                backgroundColor: uniColors[uniKey],
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-[8px] md:text-[9px] font-bold uppercase tracking-tighter text-slate-400">
                            <span>Compatibility</span>
                            <span>{cat.score} / {cat.maxScore} pts</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 p-6 bg-slate-900 text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <h4 className="font-black uppercase text-sm md:text-base mb-2 text-rose-500">
              Technical Note: Precision Matching
            </h4>
            <p className="font-serif italic text-xs md:text-sm leading-relaxed opacity-90">
              &quot;These breakdowns are calculated by analyzing your specific responses against the cultural markers, academic structures, and social values of each institution. Your alignment is measured relative to the maximum possible points available in each category based on your unique quiz path.&quot;
            </p>
          </div>
        </section>
      )}

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
        <button
          className="text-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm text-slate-500 hover:text-black transition-colors underline decoration-2 underline-offset-4"
          onClick={onRetake}
        >
          Retake Quiz
        </button>
      </section>

      <div className="text-center text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        UniSort Intelligence Unit • Vol. 1 • Issue 1 •{" "}
        {new Date().getFullYear()}
      </div>
    </div>
  );
}
