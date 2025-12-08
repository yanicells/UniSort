"use client";

import { questions } from "@/lib/quiz/quiz-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Question from "@/components/quiz/question";
import Choice from "@/components/quiz/choice";

export default function QuizView() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [selectionMessage, setSelectionMessage] = useState("");

  function handleNext() {
    if (selectedChoice !== null) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(null);
      setSelectionMessage("");
    } else{
        setSelectionMessage("Please select an answer before proceeding.");
    }
  }

  return (
    <div>
      <Question
        question={questions.questions[currentQuestionIndex].question}
      ></Question>
      <Choice
        selectedChoice={selectedChoice}
        setSelectedChoice={setSelectedChoice}
        choices={questions.questions[currentQuestionIndex].choices}
      ></Choice>
      <Button
        onClick={handleNext}
      >
        Next
      </Button>
      <p>{selectionMessage}</p>
    </div>
  );
}

