"use client";

import { useState } from "react";
import { QuizContainer } from "./quiz-container";

type GetNameProps = {
  onContinue: (name: string) => void;
};

export default function GetName({ onContinue }: GetNameProps) {
  const [name, setName] = useState("");

  return (
    <QuizContainer>
      <div className="w-full max-w-xl mx-auto">
        <div className="card-static space-y-6 text-center py-8">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome to UniSort
            </h1>
            <p className="text-base text-foreground/70">
              Find your perfect university match. Takes about 2 minutes.
            </p>
            <p className="text-sm text-foreground/50">
              Optional: add your name for a personal greeting.
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name (optional)"
              className="w-full border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-foreground/20"
              maxLength={50}
            />
            <button
              onClick={() => onContinue(name.trim() || "Anonymous")}
              className="primary-button w-full"
            >
              {name.trim() ? "Continue" : "Continue Anonymously"}
            </button>
          </div>
        </div>
      </div>
    </QuizContainer>
  );
}
