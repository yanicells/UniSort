"use client";

import { University } from "@/lib/quiz/quiz-constants";
import { ResultsDesignProps } from "./types";
import { useResultsData } from "./useResultsData";
import { IndividualScoresPieChart } from "@/components/charts";
import Image from "next/image";
import { ShareableResultCard } from "../ShareableResultCard";
import {
  ArrowRight,
  Star,
  Trophy,
  BarChart3,
  TrendingUp,
  Award,
} from "lucide-react";

const uniColors = {
  admu: "#001196",
  dlsu: "#00703c",
  up: "#7b1113",
  ust: "#fdb71a",
};

const uniLightColors = {
  admu: "#e6e9ff",
  dlsu: "#e6f4ed",
  up: "#ffebeb",
  ust: "#fff9e6",
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

export default function ResultDesign6({
  score,
  breakdown,
  name,
  onRetake,
}: ResultsDesignProps) {
  const {
    percentages,
    sortedScores,
    topMatch,
    categoryChampions,
    getFeedbackText,
  } = useResultsData({ score, breakdown, name });

  const isAnonymous = name === "Anonymous";
  const recommendedUniversity =
    uniFullNames[topMatch.uni as keyof typeof uniFullNames];
  const greeting = isAnonymous
    ? `Welcome to ${recommendedUniversity}!`
    : `${name}, welcome to ${recommendedUniversity}!`;

  return (
    <div className="space-y-8 md:space-y-16 max-w-6xl mx-auto py-6 md:py-12 px-4 sm:px-6 bg-white">
      {/* 1. Hero Section */}
      <section className="text-center space-y-4 md:space-y-6">
        <div className="inline-flex items-center gap-2 bg-black text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-widest">
          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
          Official Result
        </div>

        <div className="space-y-2">
          <h1 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-widest text-slate-500 mb-2">
            Congratulations! Welcome to
          </h1>
          <p
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none px-2"
            style={{ color: uniColors[topMatch.uni as keyof typeof uniColors] }}
          >
            {recommendedUniversity}
          </p>
        </div>
      </section>

      {/* 2. Main Result Card */}
      <section className="grid lg:grid-cols-12 gap-4 md:gap-8 items-start">
        {/* Main Visual */}
        <div
          className="lg:col-span-7 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border-2"
          style={{
            backgroundColor:
              uniLightColors[topMatch.uni as keyof typeof uniLightColors],
            borderColor:
              uniColors[topMatch.uni as keyof typeof uniColors] + "20", // 20% opacity border
          }}
        >
          <div className="relative aspect-[4/3] w-full mb-4">
            <Image
              src={uniImages[topMatch.uni as keyof typeof uniImages]}
              alt={recommendedUniversity}
              fill
              priority
              loading="eager"
              fetchPriority="high"
              className="object-contain drop-shadow-xl"
            />
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 md:gap-4 border-b-2 border-black/5 pb-4 md:pb-6 mb-4 md:mb-6">
              {/* Verdict Header - No Background */}
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-black uppercase">
                  The Verdict
                </h2>
                <div
                  className="h-1 w-8 sm:w-12 rounded-full mt-1"
                  style={{
                    backgroundColor:
                      uniColors[topMatch.uni as keyof typeof uniColors],
                  }}
                />
              </div>
              <div
                className="ml-auto text-2xl sm:text-3xl md:text-4xl font-black"
                style={{
                  color: uniColors[topMatch.uni as keyof typeof uniColors],
                }}
              >
                {topMatch.percentage}%
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-slate-900 leading-relaxed font-serif font-medium">
              {getFeedbackText(topMatch.uni, topMatch.percentage, true)}
            </p>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="lg:col-span-5 space-y-4 md:space-y-8">
          <div className="bg-white rounded-2xl md:rounded-3xl border-2 border-black p-3 sm:p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="flex items-center gap-2 font-black uppercase text-sm sm:text-base md:text-lg mb-3 md:mb-4">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              By The Numbers
            </h3>
            <div className="aspect-square w-3/4 sm:w-10/11 mx-auto mb-0 md:mb-4">
              <IndividualScoresPieChart percentages={percentages} />
            </div>
            <div className="space-y-1.5 md:space-y-2">
              {sortedScores.map((item, i) => (
                <div key={item.uni} className="space-y-1">
                  <div className="flex justify-between items-center p-1.5 sm:p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="font-bold text-slate-400 w-3 sm:w-4 text-xs sm:text-sm">
                        {i + 1}
                      </div>
                      <div className="font-bold uppercase text-xs sm:text-sm">
                        {item.uni}
                      </div>
                    </div>
                    <div
                      className="font-mono font-bold text-xs sm:text-sm"
                      style={{
                        color: uniColors[item.uni as keyof typeof uniColors],
                      }}
                    >
                      {item.percentage}%
                    </div>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden mx-1 sm:mx-2">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor:
                          uniColors[item.uni as keyof typeof uniColors],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ShareableResultCard
            topUniversity={topMatch.uni as "admu" | "dlsu" | "up" | "ust"}
            percentages={percentages}
            verdict={getFeedbackText(topMatch.uni, topMatch.percentage, true)}
            name={name}
          />
        </div>
      </section>

      {/* 3. IMPROVED: Best Fit Per Dimension */}
      {breakdown && categoryChampions.length > 0 && (
        <section className="py-8 md:py-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-6 md:mb-10">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2 md:gap-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                Best Fit Per Dimension
              </h2>
              <p className="text-sm md:text-base text-slate-500">
                Which university claimed the top spot in each category?
              </p>
            </div>
          </div>

          {/* OPTION 3: Vibrant Pop Art */}
          {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 md:mb-16">
              {categoryChampions.map((champ) => (
                 <div 
                    key={champ.category} 
                    className="relative overflow-hidden p-4 sm:p-6 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    style={{ backgroundColor: uniColors[champ.university as keyof typeof uniColors] }}
                 >
                    <div className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 text-white/20 rotate-12">
                       <Award className="w-16 h-16 sm:w-24 sm:h-24" />
                    </div>
                    
                    <div className="relative z-10 text-white">
                       <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-2 sm:mb-3 border-b border-white/20 pb-1 sm:pb-2 inline-block">
                          {champ.category}
                       </div>
                       
                       <div className="text-3xl sm:text-5xl font-black mb-1 sm:mb-2 tracking-tighter">
                          {champ.percentage}%
                       </div>
                       
                       <div className="font-bold uppercase text-xs sm:text-sm leading-tight opacity-90 mb-3 sm:mb-4 min-h-[2.5em] sm:h-10 flex items-start">
                          {uniFullNames[champ.university as keyof typeof uniFullNames]}
                       </div>
                       
                       <div className="bg-black/20 text-[9px] sm:text-[10px] uppercase tracking-wide inline-block px-1.5 py-1 sm:px-2 sm:py-1.5 rounded font-bold backdrop-blur-sm">
                          {champ.status}
                       </div>
                    </div>
                 </div>
              ))}
           </div> */}

          {/* OPTION 8: Swiss + Pop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12">
            {categoryChampions.map((champ) => (
              <div
                key={champ.category}
                className="bg-slate-50 border-2 border-black flex flex-col h-full relative overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1 shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] hover:shadow-[7px_7px_0px_0px_#000] sm:hover:shadow-[8px_8px_0px_0px_#000]"
              >
                <div
                  className="text-white px-2 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest flex justify-between items-center relative z-10"
                  style={{
                    backgroundColor:
                      uniColors[champ.university as keyof typeof uniColors],
                  }}
                >
                  <span>{champ.category}</span>
                </div>

                <div
                  className="absolute -right-4 bottom-16 rotate-12 opacity-10 pointer-events-none z-20"
                  style={{
                    color:
                      uniColors[champ.university as keyof typeof uniColors],
                  }}
                >
                  <Award className="w-24 h-24 sm:w-32 sm:h-32" />
                </div>

                <div className="p-3 sm:p-6 flex-grow flex flex-col items-start justify-center text-left bg-white border-b-2 border-black border-dashed relative z-10">
                  <div
                    className="text-3xl sm:text-5xl font-black mb-1 sm:mb-2 tracking-tighter"
                    style={{
                      color:
                        uniColors[champ.university as keyof typeof uniColors],
                    }}
                  >
                    {champ.percentage}%
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-tight text-slate-900 border-t-2 border-slate-100 pt-1.5 sm:pt-2 w-full mt-1.5 sm:mt-2 leading-tight">
                    {
                      uniFullNames[
                        champ.university as keyof typeof uniFullNames
                      ]
                    }
                  </div>
                </div>

                <div className="px-2 py-2 sm:px-4 sm:py-3 bg-slate-50 text-center flex items-center justify-center gap-1.5 sm:gap-2 relative z-10">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{
                      backgroundColor:
                        uniColors[champ.university as keyof typeof uniColors],
                    }}
                  />
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase text-slate-600">
                    {champ.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Magazine-style Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full">
            <a
              className="group relative overflow-hidden text-center py-3 px-6 sm:py-4 sm:px-8 font-bold uppercase tracking-wider text-xs sm:text-sm transition-all border-2 hover:opacity-90 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
              style={{
                backgroundColor:
                  uniColors[topMatch.uni as keyof typeof uniColors],
                borderColor: uniColors[topMatch.uni as keyof typeof uniColors],
                color: "white",
              }}
              href={`/${topMatch.uni}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                About {topMatch.uni.toUpperCase()}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
            </a>
            <a
              className="group text-center py-3 px-6 sm:py-4 sm:px-8 font-bold uppercase tracking-wider text-xs sm:text-sm bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
              href="/big4"
            >
              The Big 4
            </a>
            <button
              className="group text-center py-3 px-6 sm:py-4 sm:px-8 font-bold uppercase tracking-wider text-xs sm:text-sm text-slate-600 hover:text-black transition-colors underline decoration-2 underline-offset-4 w-full md:w-auto"
              onClick={onRetake}
            >
              Retake Quiz
            </button>
          </div>
        </section>
      )}

      {/* Detailed Alignment Analysis */}
      {breakdown && (
        <section className="py-8 md:py-12 border-t border-slate-200">
          <div className="mb-6 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2 md:gap-3 mb-2">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              Detailed Alignment Analysis
            </h2>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl">
              A comprehensive breakdown of your compatibility scores across all
              dimensions for every university.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
            {sortedScores.map((item) => {
              const uni = item.uni as University;
              const uniData = breakdown[uni];
              if (!uniData) return null;

              return (
                <div
                  key={uni}
                  className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-6 md:mb-8 pb-3 md:pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0">
                        <Image
                          src={uniImages[uni]}
                          alt={uni}
                          fill
                          unoptimized
                          loading="lazy"
                          fetchPriority="low"
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-sm sm:text-base md:text-lg lg:text-xl uppercase leading-tight mb-1">
                          {uniFullNames[uni]}
                        </h4>
                        <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Overall Match
                        </div>
                      </div>
                    </div>
                    <div
                      className="text-2xl sm:text-3xl font-black flex-shrink-0"
                      style={{ color: uniColors[uni] }}
                    >
                      {item.percentage}%
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8 p-3 sm:p-4 bg-slate-50 rounded-lg md:rounded-xl border border-slate-100">
                    <p className="text-xs sm:text-sm font-serif italic text-slate-600 leading-relaxed">
                      {getFeedbackText(uni, item.percentage, false)}
                    </p>
                  </div>

                  <div className="space-y-4 md:space-y-5">
                    {uniData.categories.map((cat) => (
                      <div
                        key={cat.category}
                        className="space-y-1.5 md:space-y-2"
                      >
                        <div className="flex justify-between items-end text-xs sm:text-sm gap-2">
                          <span className="font-bold text-slate-700 leading-tight">
                            {cat.category}
                          </span>
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-1 sm:px-1.5 py-0.5 rounded">
                              {cat.status}
                            </span>
                            <span className="font-mono font-bold text-xs sm:text-sm">
                              {cat.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${cat.percentage}%`,
                              backgroundColor: uniColors[uni],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Technical Note (Moved Here) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-slate-50 border-2 sm:border-4 border-slate-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] transform -rotate-1 rounded-xl sm:rounded-2xl mb-8 md:mb-12">
        <h4 className="font-black uppercase text-xs sm:text-sm md:text-base mb-2 sm:mb-3 text-slate-900 tracking-widest border-b-2 border-slate-200 pb-2 inline-block">
          Disclosure
        </h4>
        <p className="font-serif italic text-xs sm:text-sm md:text-base leading-relaxed text-slate-600">
          &quot;These breakdowns are calculated by analyzing your specific
          responses against the cultural markers, academic structures, and
          social values of each institution. UniSort is an independent project
          and is not officially affiliated with Ateneo de Manila University, De
          La Salle University, University of the Philippines, or University of
          Santo Tomas.&quot;
        </p>
      </div>
    </div>
  );
}
