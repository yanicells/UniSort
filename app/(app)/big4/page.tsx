import Link from "next/link";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

const universities = [
  {
    name: "Ateneo de Manila University",
    code: "ADMU",
    color: "#001196",
    description:
      "The Jesuit Philosopher-King: Liberal Arts Gauntlet, Conyo Hegemony & Radical Moderate",
    href: "/admu",
    stats: {
      tuition: "₱80k-90k",
      vibe: "Urban Sanctuary",
      survival: "Oral Exams",
    },
  },
  {
    name: "De La Salle University",
    code: "DLSU",
    color: "#00703c",
    description:
      "The Corporate Forge: 14 Weeks of Hell in the High-Velocity Trimestral Sprint",
    href: "/dlsu",
    stats: { tuition: "₱90k+", vibe: "Vertical City", survival: "No Sleep" },
  },
  {
    name: "University of the Philippines",
    code: "UP",
    color: "#7b1113",
    description:
      "Bastion of Critical Survival: Beautiful Decay, Systemic Abandonment & The Prerog Ritual",
    href: "/up",
    stats: { tuition: "FREE", vibe: "Open Park", survival: "Hunger Games" },
  },
  {
    name: "University of Santo Tomas",
    code: "UST",
    color: "#fdb71a",
    description:
      "The Tiger's Den: Survival of the Fittest in the Oldest University in Asia",
    href: "/ust",
    stats: { tuition: "~₱60k", vibe: "Flood & Faith", survival: "Resilience" },
  },
];

export default function Big4Page() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif">
      <NewspaperMasthead />

      {/* Marquee */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
        <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
          SPECIAL REPORT: THE BIG 4 UNIVERSITIES COMPARED /// FIND YOUR PERFECT
          MATCH /// TUITION, CULTURE & SURVIVAL STATS INSIDE
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300 pb-12">
        {/* Header */}
        <header className="p-8 md:p-12 text-center border-b-4 border-black bg-white">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
            THE BIG 4
          </h1>
          <p className="text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto">
            The "Big 4" refers to the four most prestigious universities in the
            Philippines. Each has its own unique culture, academic strengths,
            and survival strategies. Discover which one aligns with your future.
          </p>
        </header>

        {/* University Cards */}
        <div className="p-6 md:p-10 space-y-8">
          {universities.map((uni) => (
            <Link
              key={uni.code}
              href={uni.href}
              className="block border-4 border-black hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 bg-white"
            >
              <div
                className="h-4 w-full"
                style={{ backgroundColor: uni.color }}
              />
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h2
                      className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2"
                      style={{ color: uni.color }}
                    >
                      {uni.code}
                    </h2>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                      {uni.name}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 text-xs font-mono">
                    <div className="border border-slate-300 px-3 py-2">
                      <div className="text-slate-400 uppercase">Tuition</div>
                      <div className="font-bold">{uni.stats.tuition}</div>
                    </div>
                    <div className="border border-slate-300 px-3 py-2">
                      <div className="text-slate-400 uppercase">Vibe</div>
                      <div className="font-bold">{uni.stats.vibe}</div>
                    </div>
                    <div className="border border-slate-300 px-3 py-2">
                      <div className="text-slate-400 uppercase">Survival</div>
                      <div className="font-bold">{uni.stats.survival}</div>
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-slate-700 italic">
                  {uni.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-orange-600 transition">
                  Read Full Report →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="border-t-4 border-black p-8 md:p-12 bg-[#fffdf5] text-center">
          <h3 className="text-3xl font-black uppercase mb-4">
            Still Not Sure Which Fits You?
          </h3>
          <p className="text-lg text-slate-600 mb-6">
            Take our personality quiz to discover your perfect university match
            in just 2 minutes.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-orange-600 transition"
          >
            Take the Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
