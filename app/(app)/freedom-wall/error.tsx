"use client";

import { useEffect } from "react";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import Link from "next/link";

export default function FreedomWallError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Freedom Wall Error:", error);
  }, [error]);

  return (
    <>
      <NewspaperMasthead />
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            ERROR /// SOMETHING WENT WRONG /// PLEASE TRY AGAIN ///
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
          <header className="p-4 md:p-6 lg:p-8 text-center border-b-4 border-black bg-pink-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
              The Freedom Wall
            </h1>
            <p className="font-mono text-[10px] md:text-xs text-pink-600 font-bold uppercase tracking-widest">
              Oops! Something went wrong
            </p>
          </header>

          <div className="p-8 text-center space-y-6">
            <div className="bg-red-50 border-2 border-red-500 p-6 max-w-md mx-auto">
              <h2 className="text-xl font-black uppercase mb-4 text-red-600">
                Error Loading Posts
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                We couldn&apos;t load the freedom wall. This might be a
                temporary issue.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-black text-white font-bold uppercase text-xs tracking-widest hover:bg-pink-600 transition"
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  className="px-6 py-2 border-2 border-black font-bold uppercase text-xs tracking-widest hover:bg-slate-100 transition"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
