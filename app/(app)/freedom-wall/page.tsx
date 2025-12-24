import { Suspense } from "react";
import { WallClient } from "@/components/freedom-wall/wall-client";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { Loader2 } from "lucide-react";

// Force dynamic to ensure fresh data - the client will handle all data fetching
export const dynamic = "force-dynamic";

export const metadata = {
  title:
    "Freedom Wall – Anonymous University Confessions Philippines | ADMU DLSU UP UST",
  description:
    "Read and share anonymous posts about Big 4 university life in the Philippines. Real student experiences, confessions, and stories from Ateneo (ADMU), La Salle (DLSU), UP Diliman, and UST freedom walls. Join the conversation anonymously.",
  keywords: [
    "freedom wall philippines",
    "university confessions",
    "ADMU freedom wall",
    "ADMU confessions",
    "DLSU freedom wall",
    "La Salle confessions",
    "UP freedom wall",
    "UP Diliman confessions",
    "UST freedom wall",
    "UST confessions",
    "college anonymous confession site",
    "university freedom wall",
    "student stories philippines",
  ],
  openGraph: {
    title: "Freedom Wall – Anonymous Big 4 University Confessions",
    description:
      "Real anonymous posts about student life at Ateneo, La Salle, UP, and UST. Share your story or read others.",
    type: "website",
    url: "https://unisort.ycells.com/freedom-wall",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/freedom-wall",
  },
};

// Loading fallback for Suspense
function WallLoading() {
  return (
    <>
      <NewspaperMasthead />
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            LOADING /// PLEASE WAIT ///
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
          <header className="p-4 md:p-6 lg:p-8 text-center border-b-4 border-black bg-pink-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
              The Freedom Wall
            </h1>
          </header>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-pink-600" />
          </div>
        </div>
      </div>
    </>
  );
}

export default function FreedomWall() {
  // Wrap in Suspense because WallClient uses useSearchParams
  return (
    <Suspense fallback={<WallLoading />}>
      <WallClient />
    </Suspense>
  );
}
