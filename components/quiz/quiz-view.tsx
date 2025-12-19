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

  return (
    <div className="relative bg-white shadow-2xl border-2 md:border-4 border-black p-4 md:p-6 lg:p-8">
      {!quizCompleted ? (
        <div className="space-y-4 md:space-y-6">
          {/* Progress Header */}
          <div className="pb-2 border-b-2 md:border-b-4 border-black">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">
                Q{currentQuestionIndex + 1}/{questions.questions.length}
              </span>
              <div className="flex-1 mx-2 sm:mx-4 h-2 md:h-3 bg-pink-100 border border-black md:border-2">
                <div
                  className="h-full bg-pink-500 transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) /
                        questions.questions.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">
                {Math.round(
                  ((currentQuestionIndex + 1) / questions.questions.length) *
                    100
                )}
                %
              </span>
              {/* Info button inline - mobile */}
              <div className="md:hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="transition-all p-1 bg-pink-500 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                      aria-label="Show rationale"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[75vw] w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-pink-50 max-h-[80vh] overflow-y-auto">
                    <DialogHeader className="space-y-2">
                      <DialogTitle className="font-black uppercase tracking-tight text-sm sm:text-base border-b-2 border-black pb-2">
                        Why This Matters
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <p className="leading-relaxed text-slate-700 text-[10px] sm:text-xs">
                        {currentQuestion.rationale}
                      </p>
                      <div className="pt-3 border-t-2 border-black">
                        <h4 className="font-black uppercase text-[10px] sm:text-xs tracking-widest mb-2">
                          Your Current Standing
                        </h4>
                        <div className="space-y-1.5">
                          {chartData.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center gap-2"
                            >
                              <span className="w-10 sm:w-12 font-black text-[10px] sm:text-xs">
                                {item.label}
                              </span>
                              <div className="flex-1 h-2.5 sm:h-3 bg-pink-100 border border-black overflow-hidden">
                                <div
                                  className={`h-full ${item.color} transition-all duration-500`}
                                  style={{
                                    width: `${(item.value / maxScore) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="w-8 sm:w-10 text-[10px] sm:text-xs font-bold text-right">
                                {Math.round((item.value / maxScore) * 100)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-5 text-center relative">
            <div className="absolute right-0 top-0 hidden md:block">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="transition-all p-1 md:p-2 bg-pink-500 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                    aria-label="Show rationale"
                  >
                    <Info className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-pink-50 hidden md:block">
                  <DialogHeader className="space-y-3">
                    <DialogTitle className="font-black uppercase tracking-tight text-xl md:text-2xl lg:text-3xl border-b-2 md:border-b-4 border-black pb-2 md:pb-3">
                      Why this matters
                    </DialogTitle>
                    <DialogDescription className="pt-1 md:pt-2 text-sm md:text-base lg:text-lg leading-relaxed font-serif text-slate-800">
                      {currentQuestion.rationale}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 md:mt-6 p-3 md:p-4 bg-white border-2 border-black">
                    <h4 className="text-xs md:text-sm font-black uppercase tracking-wider md:tracking-widest mb-3 md:mb-4 bg-pink-600 text-white px-2 md:px-3 py-1 md:py-1.5 inline-block border border-black">
                      Your Current Alignment
                    </h4>
                    <div className="space-y-2 md:space-y-3">
                      {chartData.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-2 md:gap-3 bg-pink-50 p-2 border border-black"
                        >
                          <span className="w-10 md:w-14 text-xs md:text-sm font-black">
                            {item.label}
                          </span>
                          <div className="flex-1 h-3 md:h-4 bg-pink-100 border border-black overflow-hidden">
                            <div
                              className={`h-full ${item.color} transition-all duration-500`}
                              style={{
                                width: `${(item.value / maxScore) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="w-10 md:w-12 text-xs md:text-sm font-bold text-right">
                            {Math.round((item.value / maxScore) * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Section Label */}
            <div className="inline-block bg-pink-500 text-white px-2 py-1 md:px-4 md:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wide md:tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              {currentQuestion.section}
            </div>

            {/* Question */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-black font-black leading-tight px-1 sm:px-2 md:px-4 max-w-3xl mx-auto py-2 md:py-3">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="grid gap-2 md:gap-3 max-w-2xl mx-auto">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedChoice === choice.text;
              return (
                <button
                  key={choice.text}
                  className={`w-full text-left p-3 md:p-4 border-2 md:border-3 border-black transition-all duration-200 group flex items-center gap-3 ${
                    isSelected
                      ? "bg-pink-400 text-white shadow-[5px_5px_0px_0px_rgba(251,113,133,0.6)] md:shadow-[7px_7px_0px_0px_rgba(251,113,133,0.6)] transform translate-x-[-2px] translate-y-[-2px] md:translate-x-[-3px] md:translate-y-[-3px]"
                      : "bg-white hover:bg-pink-50 text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]"
                  }`}
                  onClick={() => setSelectedChoice(choice.text)}
                >
                  <div
                    className={`w-4 h-4 md:w-5 md:h-5 border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? "border-white bg-white"
                        : "border-slate-400 group-hover:border-pink-600"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-pink-400"></div>
                    )}
                  </div>
                  <span
                    className={`font-serif text-xs sm:text-sm md:text-base ${
                      isSelected ? "font-bold" : ""
                    }`}
                  >
                    {choice.text}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-6 md:pt-8 border-t-2 md:border-t-4 border-black">
            <button
              className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider sm:tracking-widest hover:underline order-2 sm:order-1 text-pink-500"
              onClick={handleBack}
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Previous
            </button>

            <button
              className="bg-pink-500 text-white border-2 md:border-3 border-black px-5 sm:px-6 md:px-8 py-2.5 md:py-3 font-bold uppercase tracking-wider md:tracking-widest text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 order-1 sm:order-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              onClick={handleNext}
            >
              {currentQuestionIndex === questions.questions.length - 1
                ? "Reveal Destiny"
                : "Next Question"}{" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {selectionMessage && (
            <p className="text-center text-xs md:text-sm font-bold text-pink-600 bg-pink-50 py-2 border-2 border-pink-600">
              {selectionMessage}
            </p>
          )}
        </div>
      ) : (
        <Results score={score} name={username} />
      )}
    </div>
  );
}
