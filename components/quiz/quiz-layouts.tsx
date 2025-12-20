"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, ChevronRight, ChevronLeft } from "lucide-react";

export interface QuizLayoutProps {
  currentQuestion: {
    section: string;
    question: string;
    choices: { text: string; [key: string]: any }[];
    rationale: string;
  };
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedChoice: string | null;
  setSelectedChoice: (choice: string | null) => void;
  handleNext: () => void;
  handleBack: () => void;
  selectionMessage: string;
  chartData: { label: string; value: number; color: string }[];
  maxScore: number;
}

// Variation 1: The Original Pop Tabloid (Harsh, Brutalist)
export function PopTabloidOriginal({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedChoice,
  setSelectedChoice,
  handleNext,
  handleBack,
  selectionMessage,
  chartData,
  maxScore,
}: QuizLayoutProps) {
  return (
    <div className="relative bg-white shadow-2xl border-2 md:border-4 border-black p-4 md:p-6 lg:p-8">
      <div className="space-y-4 md:space-y-6">
        {/* Progress Header */}
        <div className="pb-2 border-b-2 md:border-b-4 border-black">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">
              Q{currentQuestionIndex + 1}/{totalQuestions}
            </span>
            <div className="flex-1 mx-2 sm:mx-4 h-2 md:h-3 bg-pink-100 border border-black md:border-2">
              <div
                className="h-full bg-pink-500 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            </span>
            
             <div className="md:hidden">
                <InfoDialog currentQuestion={currentQuestion} chartData={chartData} maxScore={maxScore} triggerClass="p-1 bg-pink-500 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]" />
            </div>
          </div>
        </div>

        <div className="space-y-3 md:space-y-5 text-center relative">
          <div className="absolute right-0 top-0 hidden md:block">
             <InfoDialog currentQuestion={currentQuestion} chartData={chartData} maxScore={maxScore} triggerClass="p-1 md:p-2 bg-pink-500 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]" />
          </div>

          <div className="inline-block bg-pink-500 text-white px-2 py-1 md:px-4 md:py-1.5 text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wide md:tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {currentQuestion.section}
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-black font-black leading-tight px-1 sm:px-2 md:px-4 max-w-3xl mx-auto py-2 md:py-3">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid gap-2 md:gap-3 max-w-2xl mx-auto">
          {selectionMessage && (
            <p className="text-center text-xs md:text-sm font-bold text-pink-600 bg-pink-50 py-2 border-2 border-pink-600">
              {selectionMessage}
            </p>
          )}
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
            {currentQuestionIndex === totalQuestions - 1
              ? "Reveal Destiny"
              : "Next Question"}{" "}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Variation 2: Hybrid (Original Structure + Minimal Styling)
export function PopTabloidHybrid({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedChoice,
  setSelectedChoice,
  handleNext,
  handleBack,
  selectionMessage,
  chartData,
  maxScore,
}: QuizLayoutProps) {
  return (
    <div className="relative bg-white shadow-[8px_8px_0px_0px_rgba(251,113,133,0.3)] border border-black p-6 md:p-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-black pb-4">
           <div>
             <span className="text-xs font-bold uppercase tracking-widest text-pink-500 block mb-1">
                Question {currentQuestionIndex + 1} of {totalQuestions}
             </span>
             <div className="h-1.5 w-32 md:w-48 bg-pink-100">
                <div className="h-full bg-pink-500 transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
             </div>
           </div>
           
           <InfoDialog 
             currentQuestion={currentQuestion} 
             chartData={chartData} 
             maxScore={maxScore} 
             triggerClass="text-xs font-bold uppercase tracking-wider hover:text-pink-600 flex items-center gap-1 transition-colors" 
             triggerText="Why this matters"
             hideIcon
           />
        </div>

        <div className="space-y-6">
          <span className="inline-block px-3 py-1 border border-black text-xs font-bold uppercase tracking-wider bg-pink-50">
            {currentQuestion.section}
          </span>

          <h2 className="text-2xl md:text-3xl font-serif font-bold text-black leading-tight">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid gap-3">
          {selectionMessage && (
            <p className="text-sm font-bold text-pink-600 border-l-4 border-pink-500 pl-3">
              {selectionMessage}
            </p>
          )}
          {currentQuestion.choices.map((choice, idx) => {
            const isSelected = selectedChoice === choice.text;
            return (
              <button
                key={choice.text}
                className={`w-full text-left p-4 md:p-5 border transition-all flex items-center gap-4 group ${
                  isSelected
                    ? "bg-pink-500 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white border-slate-200 text-slate-800 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                }`}
                onClick={() => setSelectedChoice(choice.text)}
              >
                 <span className={`font-mono text-sm ${isSelected ? "text-pink-200" : "text-pink-500"}`}>
                    {String(idx + 1).padStart(2, '0')}
                 </span>
                <span className={`text-base md:text-lg font-medium ${isSelected ? "font-bold" : ""}`}>
                  {choice.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-slate-100 mt-8">
          <button
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
            onClick={handleBack}
          >
            Back
          </button>

          <button
            className="bg-white text-black border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-pink-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            onClick={handleNext}
          >
            {currentQuestionIndex === totalQuestions - 1
              ? "Reveal Result"
              : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Variation 3: Balanced (UPDATED to Hybrid Bold - Compact & Full Width)
export function PopTabloidBalanced({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedChoice,
  setSelectedChoice,
  handleNext,
  handleBack,
  selectionMessage,
  chartData,
  maxScore,
}: QuizLayoutProps) {
  return (
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
               maxScore={maxScore} 
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
  );
}

// Variation 4: Clean/Minimal Pop (Whitespace focus, cleaner lines)
export function PopTabloidMinimal({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedChoice,
  setSelectedChoice,
  handleNext,
  handleBack,
  selectionMessage,
  chartData,
  maxScore,
}: QuizLayoutProps) {
  return (
    <div className="relative bg-white border border-slate-200 p-6 md:p-12 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Minimal Header */}
        <div className="flex items-center justify-between border-b border-black pb-4">
             <span className="text-xs font-mono font-bold tracking-widest text-slate-400">
               Q.{String(currentQuestionIndex + 1).padStart(2, '0')}
            </span>
            <div className="md:hidden">
                 <InfoDialog currentQuestion={currentQuestion} chartData={chartData} maxScore={maxScore} triggerClass="text-xs font-bold underline" triggerText="Info" hideIcon/>
            </div>
             <div className="hidden md:block">
                 <InfoDialog currentQuestion={currentQuestion} chartData={chartData} maxScore={maxScore} triggerClass="text-xs font-bold underline hover:text-pink-500 transition-colors" triggerText="Why this matters" hideIcon/>
            </div>
        </div>

        <div className="space-y-6">
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
            {currentQuestion.section}
          </span>

          <h2 className="text-2xl md:text-4xl font-serif font-medium text-black leading-tight">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid gap-0 border-t border-slate-200">
          {selectionMessage && (
            <p className="text-sm text-pink-600 py-2 font-medium">
              * {selectionMessage}
            </p>
          )}
          {currentQuestion.choices.map((choice, idx) => {
            const isSelected = selectedChoice === choice.text;
            return (
              <button
                key={choice.text}
                className={`w-full text-left py-5 px-4 md:px-6 border-b border-slate-200 transition-all flex items-start gap-4 hover:bg-slate-50 ${
                  isSelected ? "bg-pink-50/30" : ""
                }`}
                onClick={() => setSelectedChoice(choice.text)}
              >
                <span className={`text-xs font-mono pt-1 ${isSelected ? "text-pink-600 font-bold" : "text-slate-300"}`}>
                    {String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-lg md:text-xl font-serif leading-snug ${
                    isSelected ? "text-pink-600" : "text-slate-600"
                  }`}
                >
                  {choice.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-8">
          <button
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
            onClick={handleBack}
          >
            Previous
          </button>

          <button
            className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-pink-600 transition-colors"
            onClick={handleNext}
          >
            {currentQuestionIndex === totalQuestions - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Variation 5: Clean Mix (Between Hybrid and Minimal)
export function PopTabloidCleanMix({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedChoice,
  setSelectedChoice,
  handleNext,
  handleBack,
  selectionMessage,
  chartData,
  maxScore,
}: QuizLayoutProps) {
  return (
    <div className="relative bg-white border border-slate-300 p-6 md:p-8 max-w-4xl mx-auto rounded-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
           <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">
             Q{currentQuestionIndex + 1}/{totalQuestions}
           </span>
           <div className="flex-1 mx-4 h-1 bg-slate-100 rounded-full">
              <div className="h-full bg-pink-400 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
           </div>
           <InfoDialog 
             currentQuestion={currentQuestion} 
             chartData={chartData} 
             maxScore={maxScore} 
             triggerClass="text-[10px] md:text-xs font-bold text-slate-400 hover:text-pink-500 transition-colors" 
             triggerText="Info" 
             hideIcon
           />
        </div>

        <div className="space-y-4">
          <span className="inline-block px-2 py-0.5 border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500 rounded-full">
            {currentQuestion.section}
          </span>

          <h2 className="text-xl md:text-2xl font-serif text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid gap-2">
          {selectionMessage && (
            <p className="text-xs text-pink-500 font-medium">
              {selectionMessage}
            </p>
          )}
          {currentQuestion.choices.map((choice, idx) => {
            const isSelected = selectedChoice === choice.text;
            return (
              <button
                key={choice.text}
                className={`w-full text-left p-4 border rounded-sm transition-all flex items-center gap-3 ${
                  isSelected
                    ? "bg-pink-50 border-pink-200 text-pink-900"
                    : "bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
                onClick={() => setSelectedChoice(choice.text)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${isSelected ? 'bg-pink-400 text-white border-pink-400' : 'bg-white text-slate-400 border-slate-200'}`}>
                    {String(idx + 1)}
                </div>
                <span className={`text-sm md:text-base font-medium ${isSelected ? "font-bold" : ""}`}>
                  {choice.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-6">
          <button
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-slate-500 transition-colors"
            onClick={handleBack}
          >
            Back
          </button>

          <button
            className="bg-slate-900 text-white px-6 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-pink-500 transition-colors rounded-sm"
            onClick={handleNext}
          >
            {currentQuestionIndex === totalQuestions - 1
              ? "Results"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Variation 6: Bold Mix (Between Original and Balanced)
export function PopTabloidBoldMix({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedChoice,
  setSelectedChoice,
  handleNext,
  handleBack,
  selectionMessage,
  chartData,
  maxScore,
}: QuizLayoutProps) {
  return (
    <div className="relative bg-pink-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black p-5 md:p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b-2 border-black">
           <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-sm border-2 border-white shadow-sm">
             {currentQuestionIndex + 1}
           </div>
           
           <div className="flex-1">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                  <span>Progress</span>
                  <span>{totalQuestions} Qs</span>
              </div>
              <div className="h-2 bg-white border border-black">
                 <div className="h-full bg-pink-500" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
              </div>
           </div>

           <InfoDialog 
             currentQuestion={currentQuestion} 
             chartData={chartData} 
             maxScore={maxScore} 
             triggerClass="w-8 h-8 bg-white border border-black flex items-center justify-center text-black hover:bg-pink-200 transition-colors" 
             triggerText="?" 
             hideIcon
           />
        </div>

        <div className="space-y-4 text-center">
          <div className="inline-block bg-black text-white px-3 py-1 text-xs font-black uppercase transform rotate-[-1deg]">
            {currentQuestion.section}
          </div>

          <h2 className="text-xl md:text-3xl font-black text-black leading-tight uppercase tracking-tight">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid gap-3">
          {selectionMessage && (
            <div className="text-center">
                <p className="inline-block bg-pink-500 text-white px-2 py-1 text-xs font-bold uppercase">
                ! {selectionMessage}
                </p>
            </div>
          )}
          {currentQuestion.choices.map((choice) => {
            const isSelected = selectedChoice === choice.text;
            return (
              <button
                key={choice.text}
                className={`w-full text-center p-4 border-2 border-black transition-all ${
                  isSelected
                    ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] transform translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white text-black hover:bg-pink-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                }`}
                onClick={() => setSelectedChoice(choice.text)}
              >
                <span className={`text-sm md:text-lg font-bold uppercase ${isSelected ? "text-pink-300" : ""}`}>
                  {choice.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-6 border-t-2 border-black border-dashed mt-4">
          <button
            className="font-bold uppercase text-xs hover:underline decoration-2"
            onClick={handleBack}
          >
            &lt; Prev
          </button>

          <button
            className="bg-pink-500 text-white border-2 border-black px-6 py-2 text-xs font-black uppercase tracking-widest hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            onClick={handleNext}
          >
            {currentQuestionIndex === totalQuestions - 1
              ? "Finish"
              : "Next >"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Shared Info Dialog
function InfoDialog({ 
    currentQuestion, 
    chartData, 
    maxScore, 
    triggerClass, 
    triggerText,
    icon,
    hideIcon = false,
    overrideContentClass = "",
    overrideTitleClass = "",
    overrideTextClass = ""
}: { 
    currentQuestion: any, 
    chartData: any[], 
    maxScore: number, 
    triggerClass: string,
    triggerText?: string,
    icon?: React.ReactNode,
    hideIcon?: boolean,
    overrideContentClass?: string,
    overrideTitleClass?: string,
    overrideTextClass?: string
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
                            width: `${(item.value / maxScore) * 100}%`,
                        }}
                        />
                    </div>
                    <span className="w-10 md:w-12 text-xs md:text-sm font-bold text-right text-black">
                        {Math.round((item.value / maxScore) * 100)}%
                    </span>
                    </div>
                ))}
                </div>
            </div>
            </DialogContent>
        </Dialog>
    )
}