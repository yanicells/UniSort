"use client";

import { questions } from "@/lib/quiz/quiz-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Question from "@/components/quiz/question";
import Choice from "@/components/quiz/choice";

export default function QuizView() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <div>
      <Question
        question={questions.questions[currentQuestionIndex].question}
      ></Question>
      <Choice
        choices={questions.questions[currentQuestionIndex].choices}
      ></Choice>
      <Button
        onClick={() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }}
      >
        Next
      </Button>
    </div>
  );
}
