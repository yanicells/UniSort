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
  const [score, setScore] = useState<{
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  }>({ admu: 0, dlsu: 0, up: 0, ust: 0 });

  function handleNext() {
    if (selectedChoice !== null) {
      setScore((prevScore) => {
        const currentQuestion = questions.questions[currentQuestionIndex];
        const selectedChoiceData = currentQuestion.choices.find(
          (choice) => choice.text == selectedChoice
        );

        if (selectedChoiceData) {
          return {
            admu: prevScore.admu + selectedChoiceData.admu,
            dlsu: prevScore.dlsu + selectedChoiceData.dlsu,
            up: prevScore.up + selectedChoiceData.up,
            ust: prevScore.ust + selectedChoiceData.ust,
          };
        }
      });
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(null);
      setSelectionMessage("");
    } else {
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
      <Button onClick={handleNext}>Next</Button>
      <p>{selectionMessage}</p>
      <p>Score: ADMU {score.admu}, DLSU {score.dlsu}, UP {score.up}, UST {score.ust}</p>
    </div>
  );
}
