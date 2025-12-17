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
  { label: "The Big 4", href: "/big4" },
  { label: "ADMU", href: "/admu" },
  { label: "DLSU", href: "/dlsu" },
  { label: "UP", href: "/up" },
  { label: "UST", href: "/ust" },
];

export function Navbar() {
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "text-xl font-bold text-foreground transition-opacity",
            mobileOpen && "lg:opacity-100 opacity-0"
          )}
        >
          UniSort
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-gray-100 text-foreground"
                  : "text-foreground/80 hover:bg-gray-50 hover:text-foreground"
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
                "px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1",
                desktopUniOpen || universities.some((u) => pathname === u.href)
                  ? "bg-gray-100 text-foreground"
                  : "text-foreground/80 hover:bg-gray-50 hover:text-foreground"
              )}
            >
              Universities
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  desktopUniOpen && "rotate-180"
                )}
              />
            </button>

            {desktopUniOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-border py-1">
                {universities.map((uni) => (
                  <Link
                    key={uni.href}
                    href={uni.href}
                    onClick={() => setDesktopUniOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm transition-colors",
                      pathname === uni.href
                        ? "bg-gray-100 text-foreground"
                        : "text-foreground/80 hover:bg-gray-50 hover:text-foreground"
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
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:bg-gray-100 lg:hidden"
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
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl overflow-y-auto z-50 lg:hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <Link
                href="/"
                className="text-xl font-bold"
                onClick={() => setMobileOpen(false)}
              >
                UniSort
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium",
                    isActive(item.href)
                      ? "bg-gray-100 text-foreground"
                      : "text-foreground/80 hover:bg-gray-50"
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
                  className="w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-gray-50"
                >
                  <span>Universities</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileUniOpen && "rotate-180"
                    )}
                  />
                </button>

                {mobileUniOpen && (
                  <div className="mt-1 ml-3 space-y-1">
                    {universities.map((uni) => (
                      <Link
                        key={uni.href}
                        href={uni.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm",
                          pathname === uni.href
                            ? "bg-gray-100 text-foreground"
                            : "text-foreground/70 hover:bg-gray-50 hover:text-foreground"
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
