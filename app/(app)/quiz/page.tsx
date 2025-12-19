import QuizHandler from "@/components/quiz/quiz";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

export const metadata = {
  title: "Take the Quiz - UniSort",
  description:
    "Take our 2-minute personality quiz to find your perfect university match among ADMU, DLSU, UP, and UST.",
};

export default function Quiz() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
      <NewspaperMasthead />

      {/* Marquee - similar to TabloidLayout */}
      <div className="bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-slate-800">
        <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
          BREAKING NEWS: WHICH UNIVERSITY IS YOUR DESTINY? &nbsp; /// &nbsp;
          TAKE THE QUIZ NOW &nbsp; /// &nbsp; DISCOVER YOUR FUTURE &nbsp; ///
          &nbsp; UNISORT EXCLUSIVE
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-2xl border border-slate-300 min-h-[600px]">
        {/* Paper Header */}
        <header className="p-6 md:p-8 text-center border-b-4 border-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-800"></div>
          <p className="font-sans font-bold text-xs tracking-[0.3em] uppercase mb-2 text-slate-500">
            LIFESTYLE & CULTURE
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
            The Sorting Hat
          </h1>
          <p className="font-serif italic text-lg text-slate-600">
            "Where do you truly belong?"
          </p>
        </header>

        <div className="p-6 md:p-8">
          <QuizHandler />
        </div>
      </div>
    </div>
  );
}
