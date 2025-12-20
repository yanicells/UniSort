import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-black text-slate-900 font-serif">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Top Section - Newspaper Style Header */}
        <div className="text-center mb-8 border-b-2 border-black pb-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">
            UniSort
          </h2>
          <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-slate-600">
            The Student&apos;s Guide to University Life
          </p>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 text-sm">
          {/* Universities Column */}
          <div>
            <h3 className="font-black uppercase text-xs mb-3 border-b-2 border-black inline-block pb-1">
              Universities
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admu"
                  className="text-[#001196] hover:underline font-bold transition"
                >
                  ADMU
                </Link>
              </li>
              <li>
                <Link
                  href="/dlsu"
                  className="text-[#00703c] hover:underline font-bold transition"
                >
                  DLSU
                </Link>
              </li>
              <li>
                <Link
                  href="/up"
                  className="text-[#7b1113] hover:underline font-bold transition"
                >
                  UP
                </Link>
              </li>
              <li>
                <Link
                  href="/ust"
                  className="text-[#fdb71a] hover:underline font-bold transition"
                >
                  UST
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="font-black uppercase text-xs mb-3 border-b-2 border-black inline-block pb-1">
              Features
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/quiz" className="hover:underline transition">
                  Take the Quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/freedom-wall"
                  className="hover:underline transition"
                >
                  Freedom Wall
                </Link>
              </li>
              <li>
                <Link href="/stats" className="hover:underline transition">
                  Statistics
                </Link>
              </li>
              <li>
                <Link href="/big4" className="hover:underline transition">
                  The Big Four
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-black uppercase text-xs mb-3 border-b-2 border-black inline-block pb-1">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yanicells/UniSort"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition"
                >
                  About UniSort
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/yanicells/UniSort"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t-2 border-black pt-6 text-center">
          <p className="mt-3 text-xs italic text-slate-500">
            &quot;Find Your Fit, Own Your Story&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
