"use client";

import QuizView from "./quiz-view";
import GetName from "./get-name";
import { useState, useEffect } from "react";

export default function QuizHandler() {
  const [nameEntered, setNameEntered] = useState("");

  const [isMounted, setIsMounted] = useState(false);

  // Hydrate from localStorage on mount - this pattern is acceptable for client-side hydration
  useEffect(() => {
    const saved = localStorage.getItem("uniSortQuizResult");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          setNameEntered(parsed.name);
        }
      } catch (e) {
        console.error("Failed to parse saved quiz result", e);
      }
    }
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid rendering anything until mounted to prevent mismatch

  return (
    <div>
      {nameEntered !== "" ? (
        <QuizView name={nameEntered} onBackAction={() => setNameEntered("")} />
      ) : (
        <div>
          <GetName onContinue={setNameEntered} />
        </div>
      )}
    </div>
  );
}
