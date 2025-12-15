"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Container } from "@/components/layout/Container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <Container className="flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-5xl font-bold">Something went wrong</h1>
          <p className="text-foreground/70">
            We hit an error. Try again or go back home.
          </p>
          <div className="flex gap-3">
            <button onClick={reset} className="primary-button">
              Retry
            </button>
            <Link href="/" className="secondary-button">
              Home
            </Link>
          </div>
        </Container>
      </body>
    </html>
  );
}


