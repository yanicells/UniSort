"use client";

import { questions } from "@/lib/quiz/quiz-data";
import { useMemo, useState } from "react";
import Results from "./results";
import { saveQuizResultAction } from "@/lib/actions/quiz-actions";
import { ProgressBar } from "./ProgressBar";

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

  const currentQuestion = useMemo(
    () => questions.questions[currentQuestionIndex],
    [currentQuestionIndex]
  );

  return (
    <div className="relative min-h-screen bg-background-subtle">
      {!quizCompleted ? (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions.questions.length}
          />

          <div className="card space-y-3 text-center py-8">
            <p className="text-sm text-foreground/60">
              Question {currentQuestionIndex + 1} of {questions.questions.length}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="card p-4 md:p-6 space-y-3">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedChoice === choice.text;
              return (
                <button
                  key={choice.text}
                  className={`w-full text-left p-4 border-2 rounded-lg focus:outline-none ${
                    isSelected
                      ? "border-foreground bg-foreground/5"
                      : "border-border hover:border-foreground/60 transition-colors"
                  }`}
                  onClick={() => setSelectedChoice(choice.text)}
                >
                  {choice.text}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between max-w-2xl mx-auto w-full">
            <button
              className="secondary-button"
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
            >
              ← Back
            </button>
            <button className="primary-button" onClick={handleNext}>
              {currentQuestionIndex === questions.questions.length - 1
                ? "Finish →"
                : "Next →"}
            </button>
          </div>

          {selectionMessage && (
            <p className="text-center text-sm text-red-600">
              {selectionMessage}
            </p>
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Results score={score} name={username} />
        </div>
      )}
    </div>
  );
}
