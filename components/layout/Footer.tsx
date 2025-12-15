import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:px-8 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-foreground/70">
          © {new Date().getFullYear()} UniSort. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/80">
          <Link href="/quiz" className="hover:text-foreground">
            Take the Quiz
          </Link>
          <Link href="/freedom-wall" className="hover:text-foreground">
            Freedom Wall
          </Link>
          <Link href="/stats" className="hover:text-foreground">
            Stats
          </Link>
        </div>
      </div>
    </footer>
  );
}

