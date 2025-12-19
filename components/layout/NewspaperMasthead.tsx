"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "Ateneo de Manila", href: "/admu" },
  { label: "De La Salle", href: "/dlsu" },
  { label: "U.P. Diliman", href: "/up" },
  { label: "U.S.T.", href: "/ust" },
  { label: "Big 4", href: "/big4" },
];

export function NewspaperMasthead() {
  const pathname = usePathname();

  return (
    <div className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl border-b-4 border-slate-700">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between py-3 overflow-x-auto no-scrollbar">
          <div className="flex space-x-1 md:space-x-4 min-w-max">
            <span className="font-serif font-black italic tracking-tighter text-xl mr-4 hidden md:block">
              THE CHRONICLE
            </span>

            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isHome = item.href === "/";
              const isBig4 = item.href === "/big4";

              let activeClass = "bg-orange-600 text-white border-orange-600";
              if (!isHome && !isBig4 && isActive) {
                activeClass = "bg-white text-black border-white";
              } else if (isBig4 && isActive) {
                activeClass = "bg-purple-600 text-white border-purple-600";
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-1.5 rounded-sm font-bold text-xs md:text-sm uppercase tracking-wider transition-all border",
                    isActive
                      ? `${activeClass} transform -skew-x-6`
                      : "bg-transparent text-slate-400 border-transparent hover:text-white hover:border-slate-600"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono hidden md:block">
            VOL. 2025 • METRO MANILA
          </div>
        </div>
      </div>
    </div>
  );
}
