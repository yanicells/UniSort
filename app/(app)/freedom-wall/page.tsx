import { Suspense } from "react";
import { WallClient } from "@/components/freedom-wall/wall-client";
import { PostSkeletonList } from "@/components/freedom-wall/post-skeleton";
import { FREEDOM_WALL_KEYWORDS } from "@/lib/seo/metadata";
import type { Metadata } from "next";

// Force dynamic to ensure fresh data - the client will handle all data fetching
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Freedom Wall – Anonymous University Confessions Philippines | ADMU DLSU UP UST",
  description:
    "Read and share anonymous posts about Big 4 university life in the Philippines. Real student experiences, confessions, and stories from Ateneo (ADMU), La Salle (DLSU), UP Diliman, and UST freedom walls. Join the conversation anonymously.",
  keywords: [
    ...FREEDOM_WALL_KEYWORDS,
    "freedom wall philippines",
    "university confessions",
    "college anonymous confession site",
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
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            LOADING THE WALL /// HOLD TIGHT /// FETCHING CONFESSIONS /// TEA INCOMING /// LOADING THE WALL /// HOLD TIGHT /// FETCHING CONFESSIONS /// TEA INCOMING ///
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
          {/* Header */}
          <header className="p-4 md:p-6 lg:p-8 text-center border-b-4 border-black bg-pink-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
              The Freedom Wall
            </h1>
            <p className="font-mono text-[10px] md:text-xs text-pink-600 font-bold uppercase tracking-widest">
              Voice of the Students • Anonymous • Unfiltered
            </p>
          </header>

          {/* Controls placeholder */}
          <div className="p-4 md:p-6 border-b-2 border-black bg-slate-100">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center animate-pulse">
              <div className="flex flex-wrap gap-2 flex-1">
                <div className="h-8 w-20 bg-white border-2 border-black" />
                <div className="h-8 w-24 bg-white border-2 border-black" />
                <div className="h-8 w-20 bg-white border-2 border-black" />
              </div>
              <div className="h-9 w-full md:w-24 bg-black/80 shadow-[4px_4px_0px_0px_rgba(255,0,255,1)]" />
            </div>
          </div>

          {/* Skeleton feed */}
          <div className="p-6 bg-slate-50">
            <PostSkeletonList count={4} />
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
