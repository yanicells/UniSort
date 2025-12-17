"use client";

import QuizView from "./quiz-view";
import GetName from "./get-name";
import { useState } from "react";

export default function QuizHandler() {
  const [nameEntered, setNameEntered] = useState("");

  return (
    <div>
      {nameEntered !== "" ? (
        <QuizView name={nameEntered} onBack={() => setNameEntered("")} />
      ) : (
        <div>
          <GetName onContinue={setNameEntered} />
        </div>
      )}
    </div>
  );
}
