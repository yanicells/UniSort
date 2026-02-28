import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UniSort",
  description:
    "Discover where you truly belong with UniSort — personality quiz, insights, and freedom wall.",
  openGraph: {
    title: "UniSort",
    description:
      "Discover where you truly belong with UniSort — personality quiz, insights, and freedom wall.",
    type: "website",
    url: "https://unisort.ycells.com/unisort",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "UniSort",
    description:
      "Discover where you truly belong with UniSort — personality quiz, insights, and freedom wall.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://unisort.ycells.com/unisort",
  },
};

export default function UniSortPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f4f4f4] px-4 py-8 md:py-12 flex items-center justify-center font-serif text-slate-900">
      <div className="w-full max-w-4xl bg-white shadow-2xl border border-slate-300">
        <header className="p-4 md:p-8 lg:p-12 text-center border-b-4 border-black relative overflow-hidden bg-white">
          <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4 md:mb-6">
            <span className="font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase">
              The University Sorting Hat
            </span>
            <span className="font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase">
              PHP 25.00
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
            UNI <span className="text-[#001196]">S</span>
            <span className="text-[#00703c]">O</span>
            <span className="text-[#7b1113]">R</span>
            <span className="text-[#fdb71a]">T</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-none italic mb-4 md:mb-6">
            Discover Where You Truly Belong
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold border-y border-black py-2 mt-4 max-w-lg mx-auto font-sans">
            <span>PERSONALITY QUIZ</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>INSIGHTS</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
            <span>FREEDOM WALL</span>
          </div>
        </header>
      </div>
    </main>
  );
}
