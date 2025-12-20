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
      <div className="bg-[#f4f4f4] py-2 overflow-hidden"></div>

      <div className="max-w-6xl mx-auto mt-8 min-h-[600px] px-4">
        <div className="">
          <QuizHandler />
        </div>
      </div>
    </div>
  );
}
