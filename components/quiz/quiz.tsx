"use client";

import QuizView from "./quiz-view";
import GetName from "./get-name";
import { useState } from "react";

export default function QuizHandler() {
  const [nameEntered, setNameEntered] = useState("");

  useState(() => {
    if (typeof window !== "undefined") {
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
    }
  });

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
