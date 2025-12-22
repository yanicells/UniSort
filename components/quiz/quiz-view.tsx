"use client";

import { questions } from "@/lib/quiz/quiz-data";
import { MAX_SCORES } from "@/lib/quiz/quiz-constants";
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
import { Info } from "lucide-react";

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

  useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("uniSortQuizResult");
      if (saved) {
         try {
           const parsed = JSON.parse(saved);
           // Only restore if the names match
           if (parsed && parsed.scores && parsed.name === name) {
             setScore(parsed.scores);
             setQuizCompleted(true);
           }
         } catch (e) {
           console.error("Failed to parse saved quiz result", e);
         }
      }
    }
  });

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
    {
      label: "ADMU",
      value: currentScore.admu,
      max: MAX_SCORES.admu,
      color: "bg-[#001196]",
    },
    {
      label: "DLSU",
      value: currentScore.dlsu,
      max: MAX_SCORES.dlsu,
      color: "bg-[#00703c]",
    },
    { label: "UP", value: currentScore.up, max: MAX_SCORES.up, color: "bg-[#7b1113]" },
    {
      label: "UST",
      value: currentScore.ust,
      max: MAX_SCORES.ust,
      color: "bg-[#fdb71a]",
    },
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

        // Determine top match based on PERCENTAGE relative to MAX SCORE
        const percentages = {
          admu: finalScore.admu / MAX_SCORES.admu,
          dlsu: finalScore.dlsu / MAX_SCORES.dlsu,
          up: finalScore.up / MAX_SCORES.up,
          ust: finalScore.ust / MAX_SCORES.ust,
        };

        const topMatch = Object.entries(percentages).reduce((a, b) =>
          b[1] > a[1] ? b : a
        )[0] as "admu" | "dlsu" | "up" | "ust";

        // Save to database
        saveQuizResultAction({ name: username, topMatch, scores: finalScore });
        
        // Save to local storage for persistence
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "uniSortQuizResult",
            JSON.stringify({
              name: username,
              scores: finalScore,
              completedAt: new Date().toISOString(),
            })
          );
        }

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

  const totalQuestions = questions.questions.length;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {!quizCompleted ? (
        <div className="relative bg-white shadow-[8px_8px_0px_0px_rgba(251,113,133,0.3)] border border-black p-4 md:p-8 max-w-4xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            
            {/* Full Width Progress Header - Hybrid Refined Style */}
            <div className="pb-4 border-b border-black flex items-center gap-3">
               <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-pink-500 whitespace-nowrap min-w-fit">
                 Q{currentQuestionIndex + 1}/{totalQuestions}
               </span>
               
               <div className="h-1.5 md:h-2 bg-pink-100 flex-1 border border-transparent md:border-black/10">
                  <div className="h-full bg-pink-500 transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
               </div>

               <div className="flex items-center">
                   <InfoDialog 
                   currentQuestion={currentQuestion} 
                   chartData={chartData} 
                   triggerClass={`transition-all duration-300 flex items-center justify-center ${
                     selectedChoice 
                       ? "w-6 h-6 md:w-8 md:h-8 bg-pink-500 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                       : "w-6 h-6 md:w-8 md:h-8 text-slate-700 bg-white border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-50" 
                   }`} 
                   hideIcon={false}
                   icon={<Info className="w-3.5 h-3.5 md:w-5 md:h-5" />}
                 />
               </div>
            </div>

            <div className="space-y-3 md:space-y-4">
                 <div className="flex justify-between items-center">
                    <div className="inline-block bg-pink-50 border border-black px-2 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-pink-600">
                        {currentQuestion.section}
                    </div>
                </div>

                <h2 className="text-lg sm:text-xl md:text-3xl font-serif font-bold text-black leading-tight max-w-[100%]">
                    {currentQuestion.question}
                </h2>
            </div>

            <div className="grid gap-2 md:gap-3">
              {selectionMessage && (
                <p className="text-xs font-bold text-pink-600 border-l-4 border-pink-500 pl-2">
                  {selectionMessage}
                </p>
              )}
              {currentQuestion.choices.map((choice, idx) => {
                const isSelected = selectedChoice === choice.text;
                return (
                  <button
                    key={choice.text}
                    className={`w-full text-left p-3 md:p-4 border transition-all flex items-start gap-3 md:gap-4 group ${
                      isSelected
                        ? "bg-pink-500 text-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                        : "bg-white border-slate-200 text-slate-800 hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]"
                    }`}
                    onClick={() => setSelectedChoice(choice.text)}
                  >
                     <span className={`font-mono text-xs md:text-sm pt-0.5 md:pt-1 ${isSelected ? "text-pink-200" : "text-pink-500"}`}>
                        {String(idx + 1).padStart(2, '0')}
                     </span>
                    <span className={`text-sm md:text-lg font-medium leading-snug ${isSelected ? "font-bold" : ""}`}>
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-slate-100 mt-4">
              <button
                className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
                onClick={handleBack}
              >
                Back
              </button>

              <button
                className={`border border-black px-6 py-2.5 md:px-8 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
                  selectedChoice
                    ? "bg-pink-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-black hover:bg-pink-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                }`}
                onClick={handleNext}
              >
                {currentQuestionIndex === totalQuestions - 1
                  ? "Reveal Result"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-white shadow-2xl border-2 md:border-4 border-black p-4 md:p-6 lg:p-8">
            <Results 
              score={score} 
              name={username} 
              onRetake={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("uniSortQuizResult");
                }
                setQuizCompleted(false);
                setCurrentQuestionIndex(0);
                setAnswers(Array(questions.questions.length).fill(null));
                setScore({ admu: 0, dlsu: 0, up: 0, ust: 0 });
                onBackAction();
              }}
            />
        </div>
      )}
    </div>
  );
}

// Shared Info Dialog
type QuestionChoice = {
  text: string;
  admu: number;
  dlsu: number;
  up: number;
  ust: number;
};

type QuizQuestion = {
  section: string;
  question: string;
  choices: QuestionChoice[];
  rationale: string;
};

type ChartDataItem = {
  label: string;
  value: number;
  max: number;
  color: string;
};

function InfoDialog({ 
    currentQuestion, 
    chartData, 
    triggerClass, 
    triggerText,
    icon,
    hideIcon = false,
    overrideContentClass = "",
    overrideTitleClass = "",
    overrideTextClass = ""
}: { 
    currentQuestion: QuizQuestion;
    chartData: ChartDataItem[];
    triggerClass: string;
    triggerText?: string;
    icon?: React.ReactNode;
    hideIcon?: boolean;
    overrideContentClass?: string;
    overrideTitleClass?: string;
    overrideTextClass?: string;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
            <button
                className={`transition-all ${triggerClass}`}
                aria-label="Show rationale"
            >
                {!hideIcon && (icon || <Info className="w-4 h-4 md:w-5 md:h-5" />)}
                {triggerText && <span>{triggerText}</span>}
            </button>
            </DialogTrigger>
            <DialogContent className={`w-[80vw] max-w-2xl border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-pink-50 ${overrideContentClass}`}>
            <DialogHeader className="space-y-3">
                <DialogTitle className={`font-black uppercase tracking-tight text-xl md:text-2xl lg:text-3xl border-b-2 md:border-b-4 border-black pb-2 md:pb-3 ${overrideTitleClass}`}>
                Why this matters
                </DialogTitle>
                <DialogDescription className={`pt-1 md:pt-2 text-sm md:text-base lg:text-lg leading-relaxed font-serif ${overrideTextClass || 'text-slate-800'}`}>
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
                    <span className="w-10 md:w-14 text-xs md:text-sm font-black text-black">
                        {item.label}
                    </span>
                    <div className="flex-1 h-3 md:h-4 bg-pink-100 border border-black overflow-hidden">
                        <div
                        className={`h-full ${item.color} transition-all duration-500`}
                        style={{
                            width: `${Math.min((item.value / item.max) * 100, 100)}%`,
                        }}
                        />
                    </div>
                    <span className="w-10 md:w-12 text-xs md:text-sm font-bold text-right text-black">
                        {Math.round((item.value / item.max) * 100)}%
                    </span>
                    </div>
                ))}
                </div>
            </div>
            </DialogContent>
        </Dialog>
    )
}
