"use client";

import { useState } from "react";

type GetNameProps = {
  onContinue: (name: string) => void;
};

export default function GetName({ onContinue }: GetNameProps) {
  const [name, setName] = useState("");

  return (
    <div className="w-full max-w-xl mx-auto py-8">
      <div className="border-4 border-black p-1 bg-white">
        <div className="border border-black p-6 md:p-8 text-center space-y-6">
          <div className="space-y-3 border-b-2 border-black pb-6">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-serif">
              Who Are You?
            </h2>
            <p className="text-lg font-serif italic text-slate-600">
              "Every great story needs a protagonist."
            </p>
          </div>

          <div className="space-y-4 py-4">
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-slate-500">
              Subscriber Details
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name here..."
              className="w-full border-b-2 border-black bg-transparent px-4 py-3 text-center font-serif text-xl focus:outline-none focus:bg-slate-50 placeholder:text-slate-300 placeholder:italic"
              maxLength={50}
            />
            <p className="text-xs text-slate-400 font-mono">
              * Optional. Leave blank to remain anonymous.
            </p>
          </div>

          <button
            onClick={() => onContinue(name.trim() || "Anonymous")}
            className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 hover:bg-slate-800 transition-colors border-2 border-transparent hover:border-black"
          >
            {name.trim() ? "Begin Assessment" : "Proceed Anonymously"}
          </button>
        </div>
      </div>
    </div>
  );
}
