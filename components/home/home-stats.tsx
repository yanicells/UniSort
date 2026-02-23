"use client";

import { useState, useEffect, useCallback } from "react";

type QuizSummary = {
  total: number;
  admu: number;
  dlsu: number;
  up: number;
  ust: number;
};

export function HomeStats() {
  const [summary, setSummary] = useState<QuizSummary>({
    total: 0,
    admu: 0,
    dlsu: 0,
    up: 0,
    ust: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");

      if (!res.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchStats().finally(() => setIsLoading(false));
  }, [fetchStats]);

  // Calculate percentages safely
  const getPercentage = (value: number) => {
    if (summary.total === 0) return 0;
    return (value / summary.total) * 100;
  };

  return (
    <div className="lg:col-span-4 bg-slate-100 p-4 md:p-6 lg:p-8 flex flex-col justify-center text-center border-t lg:border-t-0 gap-4 md:gap-6">
      <div className="border-2 md:border-4 border-black p-4 md:p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <span className="block text-4xl md:text-5xl lg:text-6xl font-black text-orange-600 mb-2">
          {isLoading ? "..." : summary.total}
        </span>
        <span className="block font-bold uppercase text-xs md:text-sm tracking-widest">
          Students Matched
        </span>
        <div className="w-full h-1 bg-slate-200 mt-3 md:mt-4 overflow-hidden">
          <div className="w-3/4 h-full bg-black animate-pulse"></div>
        </div>
      </div>

      {/* University Breakdown */}
      <div className="border-2 md:border-4 border-black p-4 md:p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h4 className="font-black uppercase text-xs md:text-sm tracking-widest mb-3 md:mb-4 text-center border-b-2 border-black pb-2">
          Match Distribution
        </h4>
        <div className="space-y-2 md:space-y-3">
          {/* ADMU Bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-black text-xs text-[#001196]">ADMU</span>
              <span className="font-black text-xs text-[#001196]">
                {isLoading ? "..." : summary.admu}
              </span>
            </div>
            <div className="h-3 bg-slate-200 border border-slate-300">
              <div
                className="h-full bg-[#001196] transition-all duration-500"
                style={{
                  width: `${getPercentage(summary.admu)}%`,
                }}
              />
            </div>
          </div>

          {/* DLSU Bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-black text-xs text-[#00703c]">DLSU</span>
              <span className="font-black text-xs text-[#00703c]">
                {isLoading ? "..." : summary.dlsu}
              </span>
            </div>
            <div className="h-3 bg-slate-200 border border-slate-300">
              <div
                className="h-full bg-[#00703c] transition-all duration-500"
                style={{
                  width: `${getPercentage(summary.dlsu)}%`,
                }}
              />
            </div>
          </div>

          {/* UP Bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-black text-xs text-[#7b1113]">UP</span>
              <span className="font-black text-xs text-[#7b1113]">
                {isLoading ? "..." : summary.up}
              </span>
            </div>
            <div className="h-3 bg-slate-200 border border-slate-300">
              <div
                className="h-full bg-[#7b1113] transition-all duration-500"
                style={{
                  width: `${getPercentage(summary.up)}%`,
                }}
              />
            </div>
          </div>

          {/* UST Bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-black text-xs text-[#fdb71a]">UST</span>
              <span className="font-black text-xs text-[#fdb71a]">
                {isLoading ? "..." : summary.ust}
              </span>
            </div>
            <div className="h-3 bg-slate-200 border border-slate-300">
              <div
                className="h-full bg-[#fdb71a] transition-all duration-500"
                style={{
                  width: `${getPercentage(summary.ust)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
