"use client";

import { useState } from "react";
import { User, ArrowRight } from "lucide-react";

type GetNameProps = {
  onContinue: (name: string) => void;
};

export default function GetName({ onContinue }: GetNameProps) {
  const [name, setName] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4">
      {/* Press Pass Design */}
      <div className="relative bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300">
        {/* Lanyard Hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-200 rounded-full border-2 border-black"></div>

        {/* Header */}
        <div className="bg-black text-white p-6 pt-12 text-center border-b-4 border-black">
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
            Official Press Pass
          </h2>
          <p className="font-mono text-xs mt-2 tracking-[0.3em] text-slate-400">
            UNISORT CHRONICLE • ACCESS GRANTED
          </p>
        </div>

        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          {/* Photo Placeholder */}
          <div className="w-32 h-40 border-2 border-black bg-slate-100 flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <User className="w-16 h-16 text-slate-300" />
          </div>

          {/* Form Fields */}
          <div className="flex-1 w-full space-y-6">
            <div className="space-y-2">
              <label className="font-bold uppercase text-xs tracking-widest text-slate-500">
                Authorized Personnel Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="TYPE NAME HERE..."
                className="w-full border-b-4 border-black bg-transparent px-2 py-2 font-serif text-2xl md:text-3xl font-bold focus:outline-none focus:border-blue-600 placeholder:text-slate-200 placeholder:font-sans uppercase"
                maxLength={20}
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="text-[10px] font-mono text-slate-400 leading-tight max-w-[150px]">
                VALID FOR ONE (1) ASSESSMENT SESSION. NON-TRANSFERABLE.
              </div>

              <button
                onClick={() => onContinue(name.trim() || "Anonymous")}
                className="group flex items-center gap-2 bg-black text-white px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-blue-600 transition-colors"
              >
                {name.trim() ? "Enter" : "Skip"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Barcode Decoration */}
        <div className="h-12 bg-slate-100 border-t-4 border-black flex items-center justify-center overflow-hidden">
          <div className="font-libre-barcode text-4xl opacity-50 tracking-widest select-none">
            ||| || ||| || |||| ||| || || |||||
          </div>
        </div>
      </div>
    </div>
  );
}
