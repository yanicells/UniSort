import { DailyResultsBarChart } from "@/components/charts/DailyResultsBarChart";
import { OverallResultsPieChart } from "@/components/charts/OverallResultsPieChart";
import { OverallResultsBarChart } from "@/components/charts/OverallResultsBarChart";
import { Suspense } from "react";
import { getQuizSummary } from "@/lib/dal/queries";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react";

export const metadata = {
  title: "Quiz Statistics - UniSort",
  description: "View trends and distributions of all quiz results.",
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
            📊 LIVE DATA UPDATES /// {summary.total} QUIZZES TAKEN /// REAL-TIME
            ANALYTICS /// UNIVERSITY MATCH TRENDS 📈
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
          {/* Header */}
          <header className="p-6 md:p-12 text-center border-b-4 border-black bg-white">
            <p className="font-sans font-bold text-xs tracking-[0.3em] uppercase mb-4 text-slate-500">
              Data Analytics Dashboard
            </p>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              STATISTICS
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-slate-700 max-w-2xl mx-auto mt-4">
              Real-Time Quiz Trends & University Match Analytics
            </p>

            <div className="flex flex-wrap justify-center items-center gap-3 text-sm md:text-base font-bold border-y border-slate-300 py-4 mt-8 max-w-4xl mx-auto">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {summary.total} Total Quizzes
              </span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <span className="text-[#001196] font-black">
                {summary.admu} ADMU
              </span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <span className="text-[#00703c] font-black">
                {summary.dlsu} DLSU
              </span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <span className="text-[#7b1113] font-black">{summary.up} UP</span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <span className="text-[#fdb71a] font-black">
                {summary.ust} UST
              </span>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6 md:p-10 space-y-10">
            {/* Breaking News Banner */}
            <div className="bg-red-600 text-white px-6 py-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <div className="flex items-center justify-center gap-3">
                <TrendingUp className="w-5 h-5 animate-pulse" />
                <p className="font-black uppercase text-sm md:text-base tracking-wide text-center">
                  Breaking: {summary.total} Students Discovered Their Perfect
                  University Match!
                </p>
                <TrendingUp className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Summary Cards */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b-4 border-black pb-2">
                <Users className="w-6 h-6" />
                <h2 className="text-3xl font-black uppercase tracking-tight font-serif">
                  Match Distribution
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard
                  label="ADMU Matches"
                  value={summary.admu}
                  color="#001196"
                  icon="🦅"
                />
                <SummaryCard
                  label="DLSU Matches"
                  value={summary.dlsu}
                  color="#00703c"
                  icon="🟢"
                />
                <SummaryCard
                  label="UP Matches"
                  value={summary.up}
                  color="#7b1113"
                  icon="⚡"
                />
                <SummaryCard
                  label="UST Matches"
                  value={summary.ust}
                  color="#fdb71a"
                  icon="👑"
                />
              </div>
            </section>

            {/* Main Chart Section */}
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
              <div className="transform -rotate-1">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-3">
                  <BarChart3 className="w-7 h-7" />
                  <h2 className="text-3xl font-black uppercase tracking-tight font-serif">
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
              <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1">
                <div className="transform rotate-1">
                  <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-3">
                    <TrendingUp className="w-7 h-7" />
                    <h2 className="text-3xl font-black uppercase tracking-tight font-serif">
                      Weekly Activity
                    </h2>
                  </div>
                  <DailyResultsBarChart days={7} />
                </div>
              </div>
            </Suspense>

            {/* Footer Banner */}
            <div className="bg-black text-white px-6 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
              <p className="font-black uppercase text-lg tracking-wide">
                🎓 Data refreshes in real-time as students take the quiz! 📈
              </p>
            </div>
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
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
      <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-3">
        {icon}
        <h3 className="text-2xl font-black uppercase tracking-tight font-serif">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
