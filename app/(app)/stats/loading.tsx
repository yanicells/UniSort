import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { BarChart3, Loader2, PieChart, TrendingUp, Users } from "lucide-react";

export default function Loading() {
  return (
    <>
      <NewspaperMasthead />

      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            LOADING ANALYTICS /// FETCHING LIVE DATA /// PREPARING STATS ///
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
          {/* Header */}
          <header className="p-4 md:p-8 lg:p-12 text-center border-b-4 border-black bg-white">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              UNISORT RESULTS
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif italic text-slate-700 max-w-2xl mx-auto mt-4">
              Real-Time Quiz Trends & University Match Analytics
            </p>
          </header>

          {/* Main Content */}
          <div className="p-4 md:p-6 lg:p-10 space-y-8 md:space-y-10">
            {/* Breaking News Banner Skeleton */}
            <div className="bg-slate-200 animate-pulse px-4 md:px-6 py-8 md:py-10 border-2 md:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1" />

            {/* Summary Cards Skeleton */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 md:gap-3 border-b-4 border-black pb-2">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight font-serif">
                  Match Distribution
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4"
                  >
                    <div className="text-center space-y-2">
                      <div className="h-12 bg-slate-200 animate-pulse rounded" />
                      <div className="h-4 bg-slate-200 animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Main Chart Skeleton */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-3">
                <BarChart3 className="w-5 md:w-7 h-5 md:h-7" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight font-serif">
                  Overall Match Distribution
                </h2>
              </div>
              <div className="h-[300px] sm:h-[350px] bg-slate-200 animate-pulse rounded flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
              </div>
            </div>

            {/* Average Scores Chart Skeleton */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-3">
                <BarChart3 className="w-5 md:w-7 h-5 md:h-7" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight font-serif">
                  Average Score Distribution
                </h2>
              </div>
              <div className="h-[250px] sm:h-[300px] md:h-[350px] bg-slate-200 animate-pulse rounded flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
              </div>
            </div>

            {/* Two Column Charts Skeleton */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 border-b-2 border-black pb-2 md:pb-3">
                  <PieChart className="w-6 h-6" />
                  <h3 className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight font-serif">
                    Match Breakdown
                  </h3>
                </div>
                <div className="h-[400px] bg-slate-200 animate-pulse rounded flex items-center justify-center">
                  <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
                </div>
              </div>

              <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 border-b-2 border-black pb-2 md:pb-3">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight font-serif">
                    30-Day Trend
                  </h3>
                </div>
                <div className="h-[400px] bg-slate-200 animate-pulse rounded flex items-center justify-center">
                  <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
