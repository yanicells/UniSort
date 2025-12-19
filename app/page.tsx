import Link from "next/link";
import { getQuizSummary, getRecentPosts } from "@/lib/dal/queries";
import { PostCardSimple } from "@/components/freedom-wall/post-card-simple";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { ArrowRight, MessageCircle, Target, BarChart3 } from "lucide-react";

export default async function Home() {
  const [quizSummary, recentPosts] = await Promise.all([
    getQuizSummary(),
    getRecentPosts(4),
  ]);

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
        <header className="p-8 md:p-12 text-center border-b-4 border-black relative overflow-hidden bg-white">
          <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-6">
            <span className="font-sans font-bold text-xs tracking-widest uppercase">
              The Daily Sorting Hat
            </span>
            <span className="font-sans font-bold text-xs tracking-widest uppercase">
              PHP 25.00
            </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
            UNI SORT
          </h1>
          <div className="flex justify-center items-center gap-4 text-xs font-bold border-y border-black py-2 mt-4 max-w-lg mx-auto font-sans">
            <span>PERSONALITY QUIZ</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>INSIGHTS</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>FREEDOM WALL</span>
          </div>
        </header>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-black">
          <div className="lg:col-span-8 p-6 md:p-10 border-r border-slate-300">
            <h2 className="text-5xl md:text-7xl font-bold leading-none mb-6 italic">
              Discover Where You Truly Belong
            </h2>
            <p className="text-xl leading-relaxed font-serif text-slate-600 mb-8 max-w-2xl">
              Find your perfect university match through our personality-based
              quiz, explore real student stories, and dive into campus culture
              across ADMU, DLSU, UP, and UST.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quiz"
                className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-orange-600 transition flex items-center justify-center gap-2"
              >
                Take the Quiz <ArrowRight size={18} />
              </Link>
              <Link
                href="/freedom-wall"
                className="border-2 border-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-slate-100 transition flex items-center justify-center gap-2"
              >
                Explore Freedom Wall <MessageCircle size={18} />
              </Link>
            </div>
            <p className="mt-4 text-xs font-mono text-slate-400">
              Takes about 2 minutes · No sign-up required
            </p>
          </div>

          {/* Stats Box */}
          <div className="lg:col-span-4 bg-slate-100 p-8 flex flex-col justify-center text-center border-t lg:border-t-0">
            <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-6xl font-black text-orange-600 mb-2">
                {quizSummary.total}
              </span>
              <span className="block font-bold uppercase text-sm tracking-widest">
                Students Matched
              </span>
              <div className="w-full h-1 bg-slate-200 mt-4 overflow-hidden">
                <div className="w-3/4 h-full bg-black animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Why UniSort */}
        <div className="p-6 md:p-10 border-b-4 border-black">
          <h3 className="font-sans font-bold text-sm uppercase tracking-[0.2em] mb-8 text-center text-slate-400">
            Why UniSort?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-r border-slate-200 pr-4 last:border-0">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 rounded-full">
                <Target size={24} />
              </div>
              <h4 className="font-bold text-xl mb-2">Personality Quiz</h4>
              <p className="text-sm leading-relaxed font-serif text-slate-600 mb-4">
                Answer 10 quick questions to see which university culture fits
                you best, with instant insights.
              </p>
              <Link
                href="/quiz"
                className="text-orange-600 font-bold text-xs uppercase hover:underline"
              >
                Start the quiz →
              </Link>
            </div>

            <div className="border-r border-slate-200 pr-4 last:border-0">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 rounded-full">
                <MessageCircle size={24} />
              </div>
              <h4 className="font-bold text-xl mb-2">Freedom Wall</h4>
              <p className="text-sm leading-relaxed font-serif text-slate-600 mb-4">
                Read and share anonymous stories about student life across
                campuses. React, comment, and join the conversation.
              </p>
              <Link
                href="/freedom-wall"
                className="text-orange-600 font-bold text-xs uppercase hover:underline"
              >
                Browse posts →
              </Link>
            </div>

            <div className="last:border-0">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4 rounded-full">
                <BarChart3 size={24} />
              </div>
              <h4 className="font-bold text-xl mb-2">University Insights</h4>
              <p className="text-sm leading-relaxed font-serif text-slate-600 mb-4">
                Explore curated overviews, campus culture highlights, and stats
                to help you decide where you fit.
              </p>
              <Link
                href="/big4"
                className="text-orange-600 font-bold text-xs uppercase hover:underline"
              >
                View stats →
              </Link>
            </div>
          </div>
        </div>

        {/* Freedom Wall Posts */}
        <div className="bg-[#fffdf5] p-6 md:p-12">
          <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
            <h3 className="font-black text-3xl uppercase italic">
              Classifieds & Confessions
            </h3>
            <Link
              href="/freedom-wall"
              className="text-xs font-bold bg-black text-white px-3 py-1 uppercase hover:bg-slate-800"
            >
              Post Anonymously
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recentPosts.length === 0 ? (
              <p className="col-span-4 text-center text-slate-500 py-8">
                No posts yet. Be the first to share!
              </p>
            ) : (
              recentPosts.map((post) => (
                <PostCardSimple
                  key={post.id}
                  id={post.id}
                  content={post.content}
                  tags={post.tags}
                  reactions={post.reactions}
                  createdAt={new Date(post.createdAt)}
                />
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/freedom-wall"
              className="font-bold uppercase text-sm border-b-2 border-black hover:text-orange-600 transition"
            >
              View All Posts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
