"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Quiz", href: "/quiz" },
  { label: "Freedom Wall", href: "/freedom-wall" },
  { label: "Stats", href: "/stats" },
];

const universities = [
  { label: "Big 4", href: "/big4" },
  { label: "ADMU", href: "/admu" },
  { label: "DLSU", href: "/dlsu" },
  { label: "UP", href: "/up" },
  { label: "UST", href: "/ust" },
];

export function NewspaperMasthead() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileUniOpen, setMobileUniOpen] = useState(false);
  const [desktopUniOpen, setDesktopUniOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Body scroll lock for mobile
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopUniOpen(false);
      }
    }

    if (desktopUniOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [desktopUniOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-slate-900 text-white shadow-xl border-b-4 border-slate-700">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo/Title */}
        <Link
          href="/"
          prefetch={false}
          className={cn(
            "font-serif font-black italic tracking-tighter text-xl transition-opacity",
            mobileOpen && "lg:opacity-100 opacity-0",
          )}
        >
          UNISORT
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={cn(
                "px-4 py-1.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all border",
                isActive(item.href)
                  ? "bg-orange-600 text-white border-orange-600 transform -skew-x-6"
                  : "bg-transparent text-slate-400 border-transparent hover:text-white hover:border-slate-600",
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Universities Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDesktopUniOpen(!desktopUniOpen)}
              className={cn(
                "px-4 py-1.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all border inline-flex items-center gap-1",
                desktopUniOpen || universities.some((u) => pathname === u.href)
                  ? "bg-orange-600 text-white border-orange-600 transform -skew-x-6"
                  : "bg-transparent text-slate-400 border-transparent hover:text-white hover:border-slate-600",
              )}
            >
              Universities
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  desktopUniOpen && "rotate-180",
                )}
              />
            </button>

            {desktopUniOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg border border-slate-700 py-1">
                {universities.map((uni) => (
                  <Link
                    key={uni.href}
                    href={uni.href}
                    prefetch={false}
                    onClick={() => setDesktopUniOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm uppercase font-bold tracking-wider transition-colors",
                      pathname === uni.href
                        ? "bg-slate-700 text-white"
                        : "text-slate-400 hover:bg-slate-700 hover:text-white",
                    )}
                  >
                    {uni.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-900 shadow-xl overflow-y-auto z-50 lg:hidden border-l-4 border-slate-700">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <Link
                href="/"
                prefetch={false}
                className="font-serif font-black italic tracking-tighter text-xl"
                onClick={() => setMobileOpen(false)}
              >
                UNISORT
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-slate-800 text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider",
                    isActive(item.href)
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Universities Expandable */}
              <div className="pt-2">
                <button
                  onClick={() => setMobileUniOpen(!mobileUniOpen)}
                  className="w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <span>Universities</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileUniOpen && "rotate-180",
                    )}
                  />
                </button>

                {mobileUniOpen && (
                  <div className="mt-1 ml-3 space-y-1">
                    {universities.map((uni) => (
                      <Link
                        key={uni.href}
                        href={uni.href}
                        prefetch={false}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm uppercase font-bold tracking-wider",
                          pathname === uni.href
                            ? "bg-slate-800 text-white"
                            : "text-slate-500 hover:bg-slate-800 hover:text-white",
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {uni.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
