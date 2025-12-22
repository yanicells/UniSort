import {
  AlertTriangle,
  Heart,
  MapPin,
  Users,
  Quote,
  Lightbulb,
  Target,
  UserCheck,
  UserX,
  ChevronRight,
} from "lucide-react";

interface UniversityData {
  id: string;
  name: string;
  publication: string;
  color: string;
  secondary: string;
  headline: string;
  subhead: string;
  intro: string;
  stats: {
    tuition: string;
    vibe: string;
    survival: string;
  };
  marquee: string;
  mainStory: {
    title: string;
    body: string;
    highlight: string;
    extraSections: Array<{
      title: string;
      text: string;
    }>;
  };
  campus: {
    title: string;
    text: string;
    spots: string[];
  };
  culture: {
    title: string;
    text: string;
    politics: string;
  };
  redFlags: string[];
  greenFlags: string[];
  testimonials: Array<{
    text: string;
    source: string;
  }>;
  survivalTips: Array<{
    title: string;
    desc: string;
  }>;
  whoThrives: string;
  whoStruggles: string;
}

interface TabloidLayoutProps {
  data: UniversityData;
}

export function TabloidLayout({ data }: TabloidLayoutProps) {
  return (
    <div className="min-h-screen bg-white md:bg-[#f4f4f4] text-slate-900 font-serif pb-12">
      {/* Marquee */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
        <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
          {data.marquee} &nbsp; /// &nbsp; {data.marquee} &nbsp; /// &nbsp;{" "}
          {data.marquee}
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
        {/* Paper Header */}
        <header className="p-4 md:p-8 lg:p-12 text-center border-b-4 border-black relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-2"
            style={{ backgroundColor: data.color }}
          ></div>
          <p className="font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4 text-slate-500">
            {data.stats.vibe}
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-4 break-words"
            style={{ color: data.color }}
          >
            {data.publication}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-xs md:text-sm font-bold border-y border-black py-2 mt-4 md:mt-6 max-w-2xl mx-auto">
            <span>TUITION: {data.stats.tuition}</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>SURVIVAL: {data.stats.survival}</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>
              LOC:{" "}
              {data.id === "admu" || data.id === "up"
                ? "KYUSI"
                : data.id == "dlsu"
                ? "TAFT"
                : "ESPAÑA"}
            </span>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (Main Story & Details) */}
          <div className="lg:col-span-8 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Intro */}
            {data.intro && (
              <div className="mb-6 pb-6 border-b border-slate-200">
                <p className="font-sans text-sm font-bold uppercase text-slate-400 mb-2 tracking-wider">
                  About The University
                </p>
                <p className="text-lg leading-relaxed">{data.intro}</p>
              </div>
            )}

            <div className="mb-8">
              <span className="bg-black text-white px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold uppercase inline-block mb-2 md:mb-3 transform -rotate-1">
                Cover Story
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6 italic font-serif">
                {data.headline}
              </h2>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 font-sans font-light mb-6 md:mb-8 leading-snug">
                {data.subhead}
              </h3>
            </div>

            <div className="prose prose-sm md:prose-lg prose-slate font-serif max-w-none">
              <p
                className="first-letter:text-4xl md:first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-2 md:first-letter:mr-3 first-letter:leading-[0.8]"
                style={{ color: data.color }}
              >
                {data.mainStory.body.charAt(0)}
              </p>
              <p>{data.mainStory.body.substring(1)}</p>

              <div
                className="my-6 md:my-8 p-4 md:p-6 bg-slate-50 border-l-4"
                style={{ borderColor: data.color }}
              >
                <p className="font-bold text-base md:text-lg italic text-slate-800">
                  &ldquo;{data.mainStory.highlight}&rdquo;
                </p>
              </div>

              {/* Extra Sections */}
              {data.mainStory.extraSections &&
                data.mainStory.extraSections.map((section, idx) => (
                  <div key={idx} className="mt-8">
                    <h4
                      className="font-sans font-bold uppercase text-sm tracking-widest mb-2"
                      style={{ color: data.color }}
                    >
                      {section.title}
                    </h4>
                    <p>{section.text}</p>
                  </div>
                ))}

              <h4
                className="font-sans font-bold uppercase text-sm tracking-widest mt-8 mb-4"
                style={{ color: data.color }}
              >
                Campus Reality
              </h4>
              <p>{data.campus.text}</p>
            </div>

            {/* Who Thrives Here Section */}
            {(data.whoThrives || data.whoStruggles) && (
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t-2 border-black">
                <h3 className="font-black text-lg md:text-xl lg:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
                  <Target
                    size={20}
                    className="md:w-6 md:h-6"
                    style={{ color: data.color }}
                  />{" "}
                  Final Verdict
                </h3>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {data.whoThrives && (
                    <div>
                      <h4 className="font-bold text-emerald-600 flex items-center gap-2 mb-2 uppercase text-sm">
                        <UserCheck size={18} /> Who Thrives?
                      </h4>
                      <p className="text-sm leading-relaxed">
                        {data.whoThrives}
                      </p>
                    </div>
                  )}
                  {data.whoStruggles && (
                    <div>
                      <h4 className="font-bold text-red-600 flex items-center gap-2 mb-2 uppercase text-sm">
                        <UserX size={18} /> Who Struggles?
                      </h4>
                      <p className="text-sm leading-relaxed">
                        {data.whoStruggles}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 bg-[#fafafa]">
            {/* Culture */}
            <div className="p-8 border-b border-slate-200">
              <h3 className="font-black text-2xl uppercase mb-4 flex items-center gap-2">
                <Users size={24} style={{ color: data.color }} />
                Social Fabric
              </h3>
              <p className="text-sm leading-relaxed mb-4 font-serif">
                {data.culture.text}
              </p>
              <div className="bg-slate-200 p-3 text-xs font-mono border border-slate-300">
                POLITICS: {data.culture.politics}
              </div>
            </div>

            {/* Student Testimonials */}
            {data.testimonials && (
              <div className="p-8 border-b border-slate-200">
                <h3
                  className="font-black text-xl uppercase mb-4 flex items-center gap-2"
                  style={{ color: data.color }}
                >
                  <Quote size={24} /> Student Voices
                </h3>
                <div className="space-y-6">
                  {data.testimonials.map((t, i) => (
                    <blockquote
                      key={i}
                      className="bg-slate-50 p-4 border-l-4 border-slate-300 italic text-slate-700 text-xs"
                    >
                      &ldquo;{t.text}&rdquo;
                      <footer className="text-[10px] font-bold text-slate-400 mt-2 not-italic">
                        — {t.source}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* Survival Guide */}
            {data.survivalTips && (
              <div className="p-8 border-b border-slate-200 bg-slate-100">
                <h3
                  className="font-black text-xl uppercase mb-4 flex items-center gap-2"
                  style={{ color: data.color }}
                >
                  <Lightbulb size={24} /> Survival Guide
                </h3>
                <ul className="space-y-4">
                  {data.survivalTips.map((tip, i) => (
                    <li key={i}>
                      <strong className="block text-sm font-bold text-slate-900 mb-1">
                        {tip.title}
                      </strong>
                      <p className="text-xs text-slate-600 leading-snug">
                        {tip.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Red/Green Flags */}
            <div className="p-8 border-b border-slate-200">
              <div className="mb-6">
                <h4 className="font-bold uppercase text-red-600 flex items-center gap-2 mb-2 text-sm">
                  <AlertTriangle size={16} /> Red Flags
                </h4>
                <ul className="space-y-2">
                  {data.redFlags.map((flag, i) => (
                    <li
                      key={i}
                      className="text-sm font-medium border-b border-dashed border-slate-300 pb-1"
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase text-emerald-600 flex items-center gap-2 mb-2 text-sm">
                  <Heart size={16} /> Green Flags
                </h4>
                <ul className="space-y-2">
                  {data.greenFlags.map((flag, i) => (
                    <li
                      key={i}
                      className="text-sm font-medium border-b border-dashed border-slate-300 pb-1"
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hotspots */}
            <div className="p-8" style={{ backgroundColor: data.secondary }}>
              <h3
                className="font-black text-xl uppercase mb-4 flex items-center gap-2"
                style={{ color: data.color }}
              >
                <MapPin size={20} /> Territory
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {data.campus.spots.map((spot, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] flex justify-between items-center"
                  >
                    <span className="font-bold text-xs uppercase">{spot}</span>
                    <ChevronRight size={14} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-black text-white p-4 md:p-8 text-center">
          <p className="font-mono text-xs uppercase opacity-70 mb-2">
            ADMISSIONS OPEN FOR SY 2025-2026
          </p>
          <h2 className="text-2xl md:text-3xl font-black italic">
            DO YOU HAVE WHAT IT TAKES?
          </h2>
        </div>
      </div>
    </div>
  );
}
