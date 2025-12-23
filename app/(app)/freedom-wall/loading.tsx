import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <>
      <NewspaperMasthead />
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            LOADING CONFESSIONS /// PREPARING FREEDOM WALL /// FETCHING POSTS ///
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

          {/* Loading State */}
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-pink-600 mb-4" />
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
              Loading confessions...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
