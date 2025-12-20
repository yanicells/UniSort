"use client";

import { User, ArrowRight, BadgeCheck, Star, Sparkles } from "lucide-react";

export type GetNameLayoutProps = {
  name: string;
  setName: (name: string) => void;
  onContinue: (name: string) => void;
};

// 1. Original (Press Pass / Brutalist)
export function GetNameOriginal({ name, setName, onContinue }: GetNameLayoutProps) {
  return (
    <div className="relative bg-pink-50 border-2 md:border-4 border-black shadow-[8px_8px_0px_0px_rgba(219,39,119,1)] md:shadow-[16px_16px_0px_0px_rgba(219,39,119,1)] overflow-hidden transform rotate-0 md:rotate-1 hover:rotate-0 transition-transform duration-300">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-pink-200 rounded-full border-2 border-black"></div>
      <div className="bg-pink-600 text-white p-4 pt-10 md:p-6 md:pt-12 text-center border-b-2 md:border-b-4 border-black">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
          Official Press Pass
        </h2>
        <p className="font-mono text-xs mt-2 tracking-[0.3em] text-pink-100">
          UNISORT CHRONICLE • ACCESS GRANTED
        </p>
      </div>
      <div className="p-4 md:p-8 lg:p-12 flex flex-col md:flex-row gap-4 md:gap-8 items-center">
        <div className="w-24 h-32 md:w-32 md:h-40 border-2 border-black bg-pink-100 flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
          <User className="w-12 h-12 md:w-16 md:h-16 text-pink-300" />
        </div>
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
      <div className="h-12 bg-pink-100 border-t-4 border-black flex items-center justify-center overflow-hidden">
        <div className="font-libre-barcode text-4xl opacity-50 tracking-widest select-none">
          ||| || ||| || |||| ||| || || |||||
        </div>
      </div>
    </div>
  );
}

// 2. Soft (Rounded, Pastel, Approachable)
export function GetNameSoft({ name, setName, onContinue }: GetNameLayoutProps) {
  return (
    <div className="bg-white border border-pink-100 shadow-xl shadow-pink-100/50 rounded-2xl p-8 max-w-lg mx-auto text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 to-pink-500"></div>
      
      <div className="w-20 h-20 bg-pink-50 rounded-full mx-auto mb-6 flex items-center justify-center border border-pink-100">
        <User className="w-10 h-10 text-pink-300" />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2 font-serif">Hello, Student</h2>
      <p className="text-sm text-slate-500 mb-8">Ready to find your university match?</p>
      
      <div className="space-y-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full text-center text-3xl font-serif text-pink-600 border-b-2 border-pink-100 pb-2 focus:outline-none focus:border-pink-400 placeholder:text-slate-200 transition-colors bg-transparent"
          maxLength={20}
          autoFocus
        />
        
        <button
          onClick={() => onContinue(name.trim() || "Anonymous")}
          className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-pink-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-0.5"
        >
          {name.trim() ? "Start Quiz" : "Continue anonymously"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// 3. Hybrid (Cleaner Press Pass)
export function GetNameHybrid({ name, setName, onContinue }: GetNameLayoutProps) {
  return (
    <div className="bg-white border border-black shadow-[6px_6px_0px_0px_rgba(236,72,153,0.3)] p-6 md:p-10 max-w-2xl mx-auto">
       <div className="flex items-center gap-4 border-b border-black pb-6 mb-6">
          <div className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center font-bold border border-black">
              US
          </div>
          <div>
              <h2 className="text-xl font-black uppercase tracking-tight leading-none">Identity Verification</h2>
              <p className="text-xs font-mono text-slate-500 mt-1">SECURE_CHANNEL_ESTABLISHED</p>
          </div>
       </div>

       <div className="space-y-8">
          <div className="space-y-2">
             <label className="block text-pink-500 text-xs font-bold uppercase tracking-widest">Candidate Name</label>
             <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
              className="w-full bg-slate-50 border border-slate-300 px-4 py-3 text-xl font-serif font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
              maxLength={20}
              autoFocus
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
                onClick={() => onContinue(name.trim() || "Anonymous")}
                className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-xs border border-black hover:bg-pink-50 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:-translate-x-[2px] transition-all flex items-center gap-2"
            >
                {name.trim() ? "Confirm Identity" : "Skip"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
       </div>
    </div>
  );
}

// 4. Compact (Ticket / Card Style)
export function GetNameCompact({ name, setName, onContinue }: GetNameLayoutProps) {
  return (
    <div className="bg-pink-50 border-2 border-black p-4 md:p-6 max-w-md mx-auto relative">
        {/* Ticket notches */}
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white border-r-2 border-black rounded-full"></div>
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white border-l-2 border-black rounded-full"></div>

        <div className="text-center border-2 border-dashed border-pink-300 p-6 bg-white">
            <div className="mb-4 text-pink-500">
                <BadgeCheck className="w-8 h-8 mx-auto" />
            </div>
            
            <h3 className="font-black uppercase tracking-widest text-sm mb-6">Admit One Candidate</h3>
            
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-center text-2xl font-black uppercase text-black border-b-4 border-pink-200 focus:border-pink-500 outline-none pb-2 mb-6 placeholder:text-slate-200"
                placeholder="NAME"
                maxLength={15}
                autoFocus
            />

             <button
                onClick={() => onContinue(name.trim() || "Anonymous")}
                className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-pink-600 transition-colors"
            >
                {name.trim() ? "Enter" : "Skip"}
            </button>
        </div>
    </div>
  );
}

// 5. Loud (Bold Pink / Inverted)
export function GetNameLoud({ name, setName, onContinue }: GetNameLayoutProps) {
  return (
    <div className="bg-pink-600 border-4 border-black p-8 md:p-12 max-w-2xl mx-auto shadow-[12px_12px_0px_0px_#000]">
        <div className="text-center space-y-8">
            <div className="inline-block bg-white text-black px-4 py-1 text-sm font-black uppercase tracking-widest rotate-[-2deg] border-2 border-black">
                Who goes there?
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                HELLO<br/>I AM
            </h1>

            <div className="bg-white border-4 border-black p-4 rotate-[1deg]">
                 <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="..."
                    className="w-full text-center text-4xl md:text-5xl font-black uppercase text-black placeholder:text-slate-200 outline-none font-sans"
                    maxLength={15}
                    autoFocus
                />
            </div>

            <button
                onClick={() => onContinue(name.trim() || "Anonymous")}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black border-4 border-black transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
                {name.trim() ? "Let's Go" : "Whatever"} <Star className="w-5 h-5 fill-current" />
            </button>
        </div>
    </div>
  );
}