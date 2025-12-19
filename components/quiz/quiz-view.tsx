"use client";

import { questions } from "@/lib/quiz/quiz-data";
import { useMemo, useState } from "react";
import Results from "./results";
import { saveQuizResultAction } from "@/lib/actions/quiz-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, ChevronRight, ChevronLeft } from "lucide-react";

export default function QuizView({
  name,
  onBack,
}: {
  name: string;
  onBack: () => void;
}) {
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
      onBack();
    }
  }

  const currentQuestion = useMemo(
    () => questions.questions[currentQuestionIndex],
    [currentQuestionIndex]
  );

  return (
    <div className="relative bg-white shadow-2xl border border-slate-300 p-6 md:p-8">
      {!quizCompleted ? (
        <div className="space-y-8">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest">
              Question {currentQuestionIndex + 1} of{" "}
              {questions.questions.length}
            </span>
            <div className="flex-1 mx-4 h-2 bg-slate-200">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / questions.questions.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest">
              {Math.round(
                ((currentQuestionIndex + 1) / questions.questions.length) * 100
              )}
              %
            </span>
          </div>

          <div className="space-y-6 text-center relative">
            <div className="absolute right-0 top-0">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="text-slate-400 hover:text-black transition-colors p-2"
                    aria-label="Show rationale"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </DialogTrigger>
                <DialogContent className="font-serif border-2 border-black">
                  <DialogHeader>
                    <DialogTitle className="font-black uppercase tracking-tight">
                      Why this matters
                    </DialogTitle>
                    <DialogDescription className="pt-4 text-base leading-relaxed font-serif text-slate-800">
                      {currentQuestion.rationale}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 space-y-3">
                    <h4 className="text-xs font-bold font-sans uppercase tracking-widest border-b border-black pb-1">
                      Current Alignment
                    </h4>
                    <div className="space-y-2">
                      {chartData.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-3"
                        >
                          <span className="w-10 text-xs font-bold font-mono">
                            {item.label}
                          </span>
                          <div className="flex-1 h-2 bg-slate-100 border border-slate-200 overflow-hidden">
                            <div
                              className={`h-full ${item.color} transition-all duration-500`}
                              style={{
                                width: `${(item.value / maxScore) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <h1 className="text-xs font-bold font-sans uppercase tracking-[0.2em] text-slate-500 border-b border-slate-200 inline-block pb-1">
              {currentQuestion.section}
            </h1>

            <h2 className="text-3xl md:text-4xl font-black font-serif leading-tight px-4 max-w-3xl mx-auto py-4">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="grid gap-3 max-w-2xl mx-auto">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedChoice === choice.text;
              return (
                <button
                  key={choice.text}
                  className={`w-full text-left p-4 border-2 transition-all duration-200 group flex items-center gap-4 ${
                    isSelected
                      ? "border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                      : "border-slate-300 hover:border-black hover:bg-slate-50 text-slate-800"
                  }`}
                  onClick={() => setSelectedChoice(choice.text)}
                >
                  <div
                    className={`w-6 h-6 border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? "border-white bg-white"
                        : "border-slate-400 group-hover:border-black"
                    }`}
                  >
                    {isSelected && <div className="w-3 h-3 bg-black"></div>}
                  </div>
                  <span
                    className={`font-serif text-lg ${
                      isSelected ? "font-bold" : ""
                    }`}
                  >
                    {choice.text}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-8 border-t-2 border-slate-100">
            <button
              className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:underline order-2 sm:order-1"
              onClick={handleBack}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              className="bg-black text-white px-6 sm:px-8 py-3 font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
              onClick={handleNext}
            >
              {currentQuestionIndex === questions.questions.length - 1
                ? "Reveal Destiny"
                : "Next Question"}{" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {selectionMessage && (
            <p className="text-center text-sm font-bold text-red-600 bg-red-50 py-2 border border-red-200">
              ⚠ {selectionMessage}
            </p>
          )}
        </div>
      ) : (
        <Results score={score} name={username} />
      )}
    </div>
  );
}
