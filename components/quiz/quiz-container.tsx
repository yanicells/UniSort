import { ReactNode } from "react";

interface QuizContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Centered container specifically for quiz components
 * Ensures content fits on screen with footer visible
 * Accounts for navbar (4rem) and uses available viewport height
 */
export function QuizContainer({ children, className = "" }: QuizContainerProps) {
  return (
    <div className={`flex items-center justify-center min-h-[calc(100vh-12rem)] py-4 ${className}`}>
      <div className="w-full max-w-4xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
}
