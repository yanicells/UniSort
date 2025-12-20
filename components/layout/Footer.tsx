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
            The Student's Guide to University Life
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

          {/* Connect Column */}
          <div>
            <h3 className="font-black uppercase text-xs mb-3 border-b-2 border-black inline-block pb-1">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="https://github.com/yanicells/UniSort"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:translate-x-1 transition-transform group"
                aria-label="GitHub"
              >
                <svg
                  className="h-5 w-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.923.35-1.544.637-1.9-2.22-.253-4.555-1.112-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.194 20 14.44 20 10.017 20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-bold">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t-2 border-black pt-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs md:text-sm font-mono font-bold uppercase tracking-wide text-slate-600">
            <span>© {currentYear} UniSort</span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
            <span>All Rights Reserved</span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
            <span>Made with ❤️ for Students</span>
          </div>
          <p className="mt-3 text-xs italic text-slate-500">
            "Find Your Fit, Own Your Story"
          </p>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-[#001196] via-[#00703c] via-[#7b1113] to-[#fdb71a]"></div>
    </footer>
  );
}
