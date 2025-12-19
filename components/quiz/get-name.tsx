"use client";

import { useState } from "react";
import { User, ArrowRight } from "lucide-react";

type GetNameProps = {
  onContinue: (name: string) => void;
};

export default function GetName({ onContinue }: GetNameProps) {
  const [name, setName] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto py-6 md:py-12 px-4">
      {/* Press Pass Design */}
      <div className="relative bg-pink-50 border-2 md:border-4 border-black shadow-[8px_8px_0px_0px_rgba(219,39,119,1)] md:shadow-[16px_16px_0px_0px_rgba(219,39,119,1)] overflow-hidden transform rotate-0 md:rotate-1 hover:rotate-0 transition-transform duration-300">
        {/* Lanyard Hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-pink-200 rounded-full border-2 border-black"></div>

        {/* Header */}
        <div className="bg-pink-600 text-white p-4 pt-10 md:p-6 md:pt-12 text-center border-b-2 md:border-b-4 border-black">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
            Official Press Pass
          </h2>
          <p className="font-mono text-xs mt-2 tracking-[0.3em] text-pink-100">
            UNISORT CHRONICLE • ACCESS GRANTED
          </p>
        </div>

        <div className="p-4 md:p-8 lg:p-12 flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          {/* Photo Placeholder */}
          <div className="w-24 h-32 md:w-32 md:h-40 border-2 border-black bg-pink-100 flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <User className="w-12 h-12 md:w-16 md:h-16 text-pink-300" />
          </div>

          {/* Form Fields */}
          <div className="flex-1 w-full space-y-4 md:space-y-6">
            <div className="space-y-2">
              <label className="font-bold uppercase text-[10px] md:text-xs tracking-widest text-slate-500">
                Authorized Personnel Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="TYPE NAME HERE..."
                className="w-full border-b-2 md:border-b-4 border-black bg-transparent px-1 md:px-2 py-1 md:py-2 font-serif text-lg md:text-2xl lg:text-3xl font-bold focus:outline-none focus:border-pink-600 placeholder:text-pink-200 placeholder:font-sans uppercase"
                maxLength={20}
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between pt-3 md:pt-4">
              <div className="text-[8px] md:text-[10px] font-mono text-slate-400 leading-tight max-w-[100px] md:max-w-[150px]">
                VALID FOR ONE (1) ASSESSMENT SESSION. NON-TRANSFERABLE.
              </div>

              <button
                onClick={() => onContinue(name.trim() || "Anonymous")}
                className="group flex items-center gap-1 md:gap-2 bg-pink-600 text-white px-4 py-2 md:px-6 md:py-3 font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-pink-700 transition-colors border-2 border-black"
              >
                {name.trim() ? "Enter" : "Skip"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Barcode Decoration */}
        <div className="h-12 bg-pink-100 border-t-4 border-black flex items-center justify-center overflow-hidden">
          <div className="font-libre-barcode text-4xl opacity-50 tracking-widest select-none">
            ||| || ||| || |||| ||| || || |||||
          </div>
        </div>
      </div>
    </div>
  );
}
