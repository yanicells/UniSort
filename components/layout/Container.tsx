import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <main
      id="main-content"
      className={`max-w-6xl mx-auto px-4 md:px-8 min-h-screen pt-20 ${className}`}
    >
      {children}
    </main>
  );
}


