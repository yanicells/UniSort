"use client";

import { useState } from "react";
import { Container } from "../layout/Container";

type GetNameProps = {
  onContinue: (name: string) => void;
};

export default function GetName({ onContinue }: GetNameProps) {
  const [name, setName] = useState("");

  return (
    <Container className="flex items-center justify-center">
      <div className="max-w-2xl w-full px-4 py-12 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to UniSort</h1>
        <p className="text-lg text-foreground/70">
          Find your perfect university match. Takes about 2 minutes.
        </p>
        <p className="text-sm text-foreground/50">Optional: add your name for a personal greeting.</p>

        <div className="max-w-md mx-auto space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (optional)"
            className="w-full border border-border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-foreground/20"
            maxLength={50}
          />
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onContinue(name.trim() || "Anonymous")}
              className="primary-button w-full"
            >
              {name.trim() ? "Continue" : "Continue Anonymously"}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
