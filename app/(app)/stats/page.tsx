import { DailyResultsBarChart } from "@/components/charts/DailyResultsBarChart";
import { OverallResultsPieChart } from "@/components/charts/OverallResultsPieChart";
import { OverallResultsBarChart } from "@/components/charts/OverallResultsBarChart";
import { Suspense } from "react";
import { getQuizSummary } from "@/lib/dal/queries";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react";

export const metadata = {
  title:
    "Big 4 University Quiz Results & Statistics | Real-Time Match Data Philippines",
  description:
    "Live statistics showing which Big 4 universities students match with most. See real-time trends and match distributions for Ateneo de Manila University (ADMU), De La Salle University (DLSU), University of the Philippines (UP), and University of Santo Tomas (UST) personality quiz results.",
  keywords: [
    "big 4 university stats",
    "university match statistics",
    "ADMU DLSU UP UST trends",
    "quiz results philippines",
    "university comparison data",
  ],
  openGraph: {
    title: "Big 4 University Quiz Statistics – Live Match Data",
    description:
      "Real-time statistics showing quiz results and match trends for ADMU, DLSU, UP, and UST.",
    type: "website",
    url: "https://unisort.ycells.com/stats",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/stats",
  },
};

export default async function StatsPage() {
  const summary = await getQuizSummary();

  return (
    <>
      <NewspaperMasthead />

      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            LIVE DATA UPDATES /// {summary.total} QUIZZES TAKEN /// REAL-TIME
            ANALYTICS /// UNIVERSITY MATCH TRENDS /// DATA NEVER LIES: SEE
            WHERE YOU BELONG /// TOP TRENDING CAMPUS: SEE CHART BELOW ///
            UPDATED EVERY SECOND /// STUDY: 9 OUT OF 10 STUDENTS AGREE UNISORT IS
            ACCURATE /// TRENDING: #UPFIGHT #ONEBIGFIGHT #ANIMOLASALLE #GOUSTE /// WEATHER
            REPORT: SUNNY WITH A CHANCE OF EXAMS ///
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
            {/* Breaking News Banner */}
            <div className="bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 border-2 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                <p className="font-black uppercase text-xs md:text-sm lg:text-base tracking-wide text-center">
                  Breaking: {summary.total} Students Discovered Their Perfect
                  University Match!
                </p>
                <TrendingUp className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Summary Cards */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 md:gap-3 border-b-4 border-black pb-2">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight font-serif">
                  Match Distribution
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard
                  label="ADMU Matches"
                  value={summary.admu}
                  color="#001196"
                />
                <SummaryCard
                  label="DLSU Matches"
                  value={summary.dlsu}
                  color="#00703c"
                />
                <SummaryCard
                  label="UP Matches"
                  value={summary.up}
                  color="#7b1113"
                />
                <SummaryCard
                  label="UST Matches"
                  value={summary.ust}
                  color="#fdb71a"
                />
              </div>
            </section>

            {/* Main Chart Section */}
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8 md:transform md:rotate-1 overflow-hidden">
              <div className="md:transform md:-rotate-1">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-3">
                  <BarChart3 className="w-5 md:w-7 h-5 md:h-7" />
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight font-serif">
                    Overall Match Distribution
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <OverallResultsBarChart />
                </div>
              </div>
            </div>

            {/* Two Column Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Suspense
                fallback={
                  <div className="bg-white border-4 border-black p-6 animate-pulse">
                    <div className="h-[400px] bg-slate-200" />
                  </div>
                }
              >
                <ChartCard
                  title="Match Breakdown"
                  icon={<PieChart className="w-6 h-6" />}
                >
                  <OverallResultsPieChart />
                </ChartCard>
              </Suspense>

              <Suspense
                fallback={
                  <div className="bg-white border-4 border-black p-6 animate-pulse">
                    <div className="h-[400px] bg-slate-200" />
                  </div>
                }
              >
                <ChartCard
                  title="30-Day Trend"
                  icon={<TrendingUp className="w-6 h-6" />}
                >
                  <DailyResultsBarChart days={30} />
                </ChartCard>
              </Suspense>
            </div>

            {/* Weekly Trend */}
            <Suspense
              fallback={
                <div className="bg-white border-4 border-black p-6 animate-pulse">
                  <div className="h-[400px] bg-slate-200" />
                </div>
              }
            >
              <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8 md:transform md:-rotate-1 overflow-hidden">
                <div className="md:transform md:rotate-1">
                  <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-3">
                    <TrendingUp className="w-5 md:w-7 h-5 md:h-7" />
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight font-serif">
                      Weekly Activity
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <DailyResultsBarChart days={7} />
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

function SummaryCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color?: string;
  icon?: string;
}) {
  return (
    <div className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
      <div className="text-center space-y-2">
        {icon && <div className="text-3xl">{icon}</div>}
        <p
          className="text-4xl font-black font-mono"
          style={{ color: color ?? "#000" }}
        >
          {value}
        </p>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 border-t-2 border-black pt-2">
          {label}
        </p>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 overflow-hidden">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 border-b-2 border-black pb-2 md:pb-3">
        <div className="shrink-0">{icon}</div>
        <h3 className="text-lg md:text-xl lg:text-2xl font-black uppercase tracking-tight font-serif break-words">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
