import QuizHandler from "@/components/quiz/quiz";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

export const metadata = {
  title: "Big 4 University Fit Quiz – Ateneo, La Salle, UP, UST | Free Quiz",
  description:
    "Take a free 5-minute personality quiz to see which Big 4 university in the Philippines fits you best: Ateneo de Manila University (ADMU), De La Salle University (DLSU), University of the Philippines (UP), or University of Santo Tomas (UST). Find your perfect university match based on culture fit.",
  keywords: [
    "big 4 university quiz",
    "which university fits me best",
    "university personality quiz philippines",
    "ADMU DLSU UP UST quiz",
    "college match quiz philippines",
    "best university for me quiz",
    "ph university quiz based on personality",
    "university culture fit philippines",
    "Ateneo vs La Salle vs UP vs UST quiz",
  ],
  openGraph: {
    title: "Which Big 4 University Fits You? Take the Free Quiz",
    description:
      "Free personality quiz to find your perfect Big 4 university match in the Philippines. Compare ADMU, DLSU, UP, and UST.",
    type: "website",
    url: "https://unisort.ycells.com/quiz",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/quiz",
  },
};

export default function Quiz() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
      <NewspaperMasthead />

      {/* Marquee - similar to TabloidLayout */}
      <div className="bg-[#f4f4f4] py-2 overflow-hidden"></div>

      <div className="max-w-6xl mx-auto mt-2 md:mt-8 min-h-[600px] px-4">
        <div className="">
          <QuizHandler />
        </div>
      </div>
    </div>
  );
}