import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-foreground/70">Page not found.</p>
      <Link href="/" className="primary-button">
        Go home
      </Link>
    </Container>
  );
}


