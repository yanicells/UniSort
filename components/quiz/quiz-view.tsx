"use client";

import { questions } from "@/lib/quiz/quiz-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Question from "@/components/quiz/question";
import Choice from "@/components/quiz/choice";
import Results from "./results";
import { saveQuizResultAction } from "@/lib/actions/quiz-actions";

export default function QuizView({ name }: { name: string }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.questions.length).fill(null)
  );
  const [selectionMessage, setSelectionMessage] = useState("");
  const username = name;
  const [score, setScore] = useState<{
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  }>({ admu: 0, dlsu: 0, up: 0, ust: 0 });

  // Get the current selected choice from answers array
  const selectedChoice = answers[currentQuestionIndex];

  const setSelectedChoice = (choice: string | null) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = choice;
    setAnswers(newAnswers);
  };

  function handleNext() {
    if (selectedChoice !== null) {
      setSelectionMessage("");

      if (currentQuestionIndex < questions.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz completed - calculate final scores
        const finalScore = { admu: 0, dlsu: 0, up: 0, ust: 0 };

        answers.forEach((answer, index) => {
          if (answer) {
            const question = questions.questions[index];
            const choice = question.choices.find((c) => c.text === answer);
            if (choice) {
              finalScore.admu += choice.admu;
              finalScore.dlsu += choice.dlsu;
              finalScore.up += choice.up;
              finalScore.ust += choice.ust;
            }
          }
        });

        setScore(finalScore);

        // Determine top match
        const topMatch = Object.entries(finalScore).reduce((a, b) =>
          b[1] > a[1] ? b : a
        )[0] as "admu" | "dlsu" | "up" | "ust";

        // Save to database
        saveQuizResultAction({ name: username, topMatch, scores: finalScore });
        setQuizCompleted(true);
      }
    } else {
      setSelectionMessage("Please select an answer before proceeding.");
    }
  }

  function handleBack() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  return (
    <div>
      <p>Welcome, {username}!</p>
      {!quizCompleted ? (
        <div>
          <Question
            question={questions.questions[currentQuestionIndex].question}
          ></Question>
          <Choice
            selectedChoice={selectedChoice}
            setSelectedChoice={setSelectedChoice}
            choices={questions.questions[currentQuestionIndex].choices}
          ></Choice>
          <div className="flex gap-2">
            {currentQuestionIndex > 0 && (
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
            )}
            <Button onClick={handleNext}>
              {currentQuestionIndex === questions.questions.length - 1
                ? "Finish"
                : "Next"}
            </Button>
          </div>
          <p>{selectionMessage}</p>
          <p className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.questions.length}
          </p>
        </div>
      ) : (
        <div>
          <Results score={score} name={username}></Results>
        </div>
      )}
    </div>
  );
}
