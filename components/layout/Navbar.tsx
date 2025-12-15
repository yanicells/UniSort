"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Quiz", href: "/quiz" },
  { label: "Freedom Wall", href: "/freedom-wall" },
  { label: "Stats", href: "/stats" },
];

const isActive = (path: string, href: string) =>
  path === href || (href !== "/" && path.startsWith(href));

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [uniOpen, setUniOpen] = useState(false);
  const [mobileUniOpen, setMobileUniOpen] = useState(false);

  const universities = [
    { label: "ADMU", href: "/admu" },
    { label: "DLSU", href: "/dlsu" },
    { label: "UP", href: "/up" },
    { label: "UST", href: "/ust" },
  ];

  const desktopNav = useMemo(
    () =>
      navItems.map((item) =>
        (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
              isActive(pathname, item.href)
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/80 hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        )
      ),
    [pathname]
  );

  const mobileNav = (
    <div className="fixed inset-0 z-40 bg-white px-6 py-6 shadow-lg transition-transform duration-200">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-xl font-bold">
          UniSort
        </Link>
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="p-2 rounded-md hover:bg-background-subtle"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4">
        {navItems.map((item) =>
          (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-base ${
                isActive(pathname, item.href)
                  ? "bg-foreground text-white"
                  : "text-foreground/80 hover:bg-background-subtle"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
        ))}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-foreground/70">
            Universities
          </div>
          <Command>
            <CommandInput placeholder="Search university..." />
            <CommandList>
              <CommandEmpty>No university found.</CommandEmpty>
              <CommandGroup>
                {universities.map((u) => (
                  <CommandItem
                    key={u.href}
                    value={u.label}
                    onSelect={() => {
                      router.push(u.href);
                      setMobileOpen(false);
                    }}
                  >
                    {u.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-foreground">
            UniSort
          </Link>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {desktopNav}
          <Popover open={uniOpen} onOpenChange={setUniOpen}>
            <PopoverTrigger asChild>
              <button className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors inline-flex items-center gap-1 border-b-2 border-transparent">
                Universities
                <ChevronsUpDown className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              <Command>
                <CommandInput placeholder="Search university..." />
                <CommandList>
                  <CommandEmpty>No university found.</CommandEmpty>
                  <CommandGroup>
                    {universities.map((u) => (
                      <CommandItem
                        key={u.href}
                        value={u.label}
                        onSelect={() => {
                          router.push(u.href);
                          setUniOpen(false);
                        }}
                      >
                        {u.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:bg-background-subtle lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && mobileNav}
    </header>
  );
}

