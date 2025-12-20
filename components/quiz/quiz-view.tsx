"use client";

import { questions } from "@/lib/quiz/quiz-data";
import { useMemo, useState } from "react";
import Results from "./results";
import { saveQuizResultAction } from "@/lib/actions/quiz-actions";
import {
  PopTabloidOriginal,
  PopTabloidMinimal,
  PopTabloidHybrid,
  PopTabloidBalanced,
  QuizLayoutProps,
} from "./quiz-layouts";

export default function QuizView({
  name,
  onBackAction,
}: {
  name: string;
  onBackAction: () => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.questions.length).fill(null)
  );
  const [selectionMessage, setSelectionMessage] = useState("");
  // 0: Original, 1: Minimal, 2: Hybrid, 3: Balanced
  const [currentDesign, setCurrentDesign] = useState(0);
  const username = name;
  const [score, setScore] = useState<{
    admu: number;
    dlsu: number;
    up: number;
    ust: number;
  }>({ admu: 0, dlsu: 0, up: 0, ust: 0 });

  // Calculate current running score for the chart
  const currentScore = useMemo(() => {
    const tempScore = { admu: 0, dlsu: 0, up: 0, ust: 0 };
    answers.forEach((answer, index) => {
      if (answer) {
        const question = questions.questions[index];
        const choice = question.choices.find((c) => c.text === answer);
        if (choice) {
          tempScore.admu += choice.admu;
          tempScore.dlsu += choice.dlsu;
          tempScore.up += choice.up;
          tempScore.ust += choice.ust;
        }
      }
    });
    return tempScore;
  }, [answers]);

  const maxScore = Math.max(
    currentScore.admu,
    currentScore.dlsu,
    currentScore.up,
    currentScore.ust,
    1
  );

  const chartData = [
    { label: "ADMU", value: currentScore.admu, color: "bg-[#001196]" },
    { label: "DLSU", value: currentScore.dlsu, color: "bg-[#00703c]" },
    { label: "UP", value: currentScore.up, color: "bg-[#7b1113]" },
    { label: "UST", value: currentScore.ust, color: "bg-[#fdb71a]" },
  ];

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
    } else {
      onBackAction();
    }
  }

  const currentQuestion = useMemo(
    () => questions.questions[currentQuestionIndex],
    [currentQuestionIndex]
  );

  const layoutProps: QuizLayoutProps = {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: questions.questions.length,
    selectedChoice,
    setSelectedChoice,
    handleNext,
    handleBack,
    selectionMessage,
    chartData,
    maxScore,
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {!quizCompleted ? (
        <>
          {/* Design Switcher */}
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            {["Original (Brutalist)", "Minimal Clean", "Hybrid (Refined)", "Balanced (Bold)"].map(
              (label, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentDesign(idx)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 transition-all rounded-full ${
                    currentDesign === idx
                      ? "bg-pink-500 text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-gray-500 border-gray-200 hover:border-pink-300 hover:text-pink-500"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>

          {/* Render Active Design */}
          {currentDesign === 0 && <PopTabloidOriginal {...layoutProps} />}
          {currentDesign === 1 && <PopTabloidMinimal {...layoutProps} />}
          {currentDesign === 2 && <PopTabloidHybrid {...layoutProps} />}
          {currentDesign === 3 && <PopTabloidBalanced {...layoutProps} />}
        </>
      ) : (
        <div className="relative bg-white shadow-2xl border-2 md:border-4 border-black p-4 md:p-6 lg:p-8">
            <Results score={score} name={username} />
        </div>
      )}
    </div>
  );
}