"use client";

import { useState } from "react";
import { Button } from "../ui/button";

type GetNameProps = {
  onContinue: (name: string) => void;
};

export default function GetName({ onContinue }: GetNameProps) {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="text-gray-600">Enter your name to get started</p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => onContinue(name.trim() || "Anonymous")}
            className="w-full"
          >
            {name.trim() ? "Continue" : "Continue Anonymously"}
          </Button>
        </div>
      </div>
    </div>
  );
}
