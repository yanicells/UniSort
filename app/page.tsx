import Link from "next/link";
import { getQuizSummary, getRecentPosts } from "@/lib/dal/queries";
import { PostCardSimple } from "@/components/freedom-wall/post-card-simple";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import {
  ArrowRight,
  MessageCircle,
  Target,
  BarChart3,
  ThumbsUp,
  MessageSquare,
  Quote,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function Home() {
  const [quizSummary, recentPosts] = await Promise.all([
    getQuizSummary(),
    getRecentPosts(4),
  ]);

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
      <NewspaperMasthead />

      {/* Marquee */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
        <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
          EXTRA! EXTRA! READ ALL ABOUT IT! /// {quizSummary.total} STUDENTS
          FOUND THEIR MATCH THIS WEEK /// ADMISSIONS SEASON IS HERE /// CHOOSE
          YOUR FIGHTER
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
        {/* Newspaper Header */}
        <header className="p-4 md:p-8 lg:p-12 text-center border-b-4 border-black relative overflow-hidden bg-white">
          <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4 md:mb-6">
            <span className="font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase">
              The Daily Sorting Hat
            </span>
            <span className="font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase">
              PHP 25.00
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
            UNI SORT
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold border-y border-black py-2 mt-4 max-w-lg mx-auto font-sans">
            <span>PERSONALITY QUIZ</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>INSIGHTS</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>FREEDOM WALL</span>
          </div>
        </header>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-black">
          <div className="lg:col-span-8 p-4 md:p-6 lg:p-10 border-r border-slate-300">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-none mb-4 md:mb-6 italic">
              Discover Where You Truly Belong
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed font-serif text-slate-600 mb-6 md:mb-8 max-w-2xl">
              Find your perfect university match through our personality-based
              quiz, explore real student stories, and dive into campus culture
              across ADMU, DLSU, UP, and UST.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link
                href="/quiz"
                className="bg-black text-white px-6 md:px-8 py-3 md:py-4 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-orange-600 transition flex items-center justify-center gap-2"
              >
                Take the Quiz <ArrowRight size={18} />
              </Link>
              <Link
                href="/freedom-wall"
                className="border-2 border-black px-6 md:px-8 py-3 md:py-4 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-slate-100 transition flex items-center justify-center gap-2"
              >
                Explore Freedom Wall <MessageCircle size={18} />
              </Link>
            </div>
            <p className="mt-3 md:mt-4 text-[10px] md:text-xs font-mono text-slate-400">
              Takes about 2 minutes · No sign-up required
            </p>
          </div>

          {/* Stats Box */}
          <div className="lg:col-span-4 bg-slate-100 p-4 md:p-6 lg:p-8 flex flex-col justify-center text-center border-t lg:border-t-0 gap-4 md:gap-6">
            <div className="border-2 md:border-4 border-black p-4 md:p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-black text-orange-600 mb-2">
                {quizSummary.total}
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
                    <span className="font-black text-xs text-[#001196]">
                      ADMU
                    </span>
                    <span className="font-black text-xs text-[#001196]">
                      {quizSummary.admu}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 border border-slate-300">
                    <div
                      className="h-full bg-[#001196] transition-all duration-500"
                      style={{
                        width: `${
                          (quizSummary.admu / quizSummary.total) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* DLSU Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-xs text-[#00703c]">
                      DLSU
                    </span>
                    <span className="font-black text-xs text-[#00703c]">
                      {quizSummary.dlsu}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 border border-slate-300">
                    <div
                      className="h-full bg-[#00703c] transition-all duration-500"
                      style={{
                        width: `${
                          (quizSummary.dlsu / quizSummary.total) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* UP Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-xs text-[#7b1113]">
                      UP
                    </span>
                    <span className="font-black text-xs text-[#7b1113]">
                      {quizSummary.up}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 border border-slate-300">
                    <div
                      className="h-full bg-[#7b1113] transition-all duration-500"
                      style={{
                        width: `${(quizSummary.up / quizSummary.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* UST Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-xs text-[#fdb71a]">
                      UST
                    </span>
                    <span className="font-black text-xs text-[#fdb71a]">
                      {quizSummary.ust}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 border border-slate-300">
                    <div
                      className="h-full bg-[#fdb71a] transition-all duration-500"
                      style={{
                        width: `${
                          (quizSummary.ust / quizSummary.total) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why UniSort */}
        <div className="border-b-4 border-black p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-2 border-black pb-4 mb-6">
            <h3 className="font-serif font-bold text-4xl italic">
              The only guide you&apos;ll ever need!
            </h3>
            <span className="hidden md:inline-block flex-grow border-b border-black border-dotted h-2"></span>
            <span className="font-mono text-xs uppercase text-slate-500">
              Page A4 • Opinion
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-justify font-serif text-sm leading-relaxed">
            <div className="border-r border-slate-300 pr-0 md:pr-6">
              <p>
                <span className="float-left text-5xl font-black mr-2 mt-[-10px] font-sans">
                  A
                </span>
                lgorithms run our lives, so why not let them choose your future?
                UniSort employs a rigorous personality assessment designed to
                peer into your soul and match it with a campus culture.
              </p>
              <Link href="/quiz">
                <div className="mt-4 flex items-center gap-2 cursor-pointer hover:underline">
                  <Target size={16} />
                  <span className="font-bold text-xs uppercase sans-serif">
                    Take The Quiz
                  </span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
            <div className="border-r border-slate-300 pr-0 md:pr-6">
              <p>
                Beyond the brochures lies the truth. Explore detailed profiles
                of all Big Four universities—their cultures, quirks, and
                unfiltered realities. It is raw, it is real, and it is necessary
                reading for every student.
              </p>
              <Link href="/big4">
                <div className="mt-4 flex items-center gap-2 cursor-pointer hover:underline">
                  <MessageCircle size={16} />
                  <span className="font-bold text-xs uppercase sans-serif">
                    The Big 4
                  </span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
            <div>
              <p>
                In an era of misinformation, data is king. We aggregate
                personality distributions and compatibility scores from every
                test-taker into digestible visualizations. See where the crowd
                lands, backed by numbers.
              </p>
              <Link href="/stats">
                <div className="mt-4 flex items-center gap-2 cursor-pointer hover:underline">
                  <BarChart3 size={16} />
                  <span className="font-bold text-xs uppercase sans-serif">
                    View Results
                  </span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Freedom Wall */}
        <div className="p-4 md:p-6 lg:p-12 border-t-2 border-black bg-[#fffdf5] relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 md:mb-10 transform -rotate-1">
            <h3 className="bg-red-600 text-white font-black text-3xl md:text-5xl uppercase px-4 md:px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block border-4 border-black">
              FREEDOM WALL
            </h3>
            <span className="font-black text-xl md:text-2xl uppercase underline decoration-wavy decoration-2 md:pl-4">
              Spill the tea!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recentPosts.length === 0 ? (
              <p className="col-span-full text-center text-slate-500 font-serif italic py-8">
                No secrets on the wall yet...
              </p>
            ) : (
              recentPosts.map((post, index) => (
                <Link
                  href={`/freedom-wall/${post.id}`}
                  key={post.id}
                  className={`block transform hover:scale-105 transition-transform duration-300 ${
                    index % 2 === 0 ? "rotate-1" : "-rotate-1"
                  }`}
                >
                  <div className="bg-white border-4 border-black p-3 md:p-4 h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow flex flex-col">
                    <div className="bg-yellow-300 inline-block px-2 py-1 font-black text-[10px] md:text-xs uppercase mb-2 md:mb-3 border border-black transform -rotate-2 self-start">
                      {post.tags[0] || "HOT TAKE"}
                    </div>
                    <p className="font-sans font-bold text-base md:text-lg leading-tight mb-3 md:mb-4 uppercase break-words">
                      &quot;{stripHtml(post.content).slice(0, 60)}...&quot;
                    </p>
                    <div className="mt-auto flex justify-between items-center border-t-2 border-black pt-2">
                      <span className="font-mono text-[10px] md:text-xs font-bold text-red-600">
                        RATING: ???
                      </span>
                      <ThumbsUp size={14} className="md:w-4 md:h-4" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/freedom-wall"
              className="inline-block bg-black text-white font-black text-lg md:text-xl uppercase px-6 md:px-8 py-3 md:py-4 hover:bg-orange-600 transform hover:-rotate-2 transition shadow-[6px_6px_0px_0px_#94a3b8]"
            >
              VIEW ALL POSTS
            </Link>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="border-t border-slate-300 bg-slate-50 py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest mb-4 text-slate-400">
              Legal Notice
            </h4>
            <p className="font-serif text-sm text-slate-500 italic leading-relaxed">
              UniSort is a personal project created for entertainment and
              informational purposes only. This website is not affiliated with,
              endorsed by, sponsored by, or connected to Ateneo de Manila
              University, De La Salle University, University of the Philippines,
              University of Santo Tomas, or any other educational institution
              mentioned. All university names, logos, and trademarks are the
              property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}