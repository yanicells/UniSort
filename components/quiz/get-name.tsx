"use client";

import { useState } from "react";
import {
  GetNameOriginal,
  GetNameSoft,
  GetNameHybrid,
  GetNameCompact,
  GetNameLoud,
  GetNameLayoutProps,
} from "./get-name-layouts";

type GetNameProps = {
  onContinue: (name: string) => void;
};

export default function GetName({ onContinue }: GetNameProps) {
  const [name, setName] = useState("");
  // 0: Original, 1: Soft, 2: Hybrid, 3: Compact, 4: Loud
  const [currentDesign, setCurrentDesign] = useState(0);

  const layoutProps: GetNameLayoutProps = {
    name,
    setName,
    onContinue,
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 md:py-12 px-4">
      {/* Design Switcher */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {["Original", "Soft", "Hybrid", "Compact", "Loud"].map((label, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentDesign(idx)}
            className={`px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest border-2 transition-all rounded-full ${
              currentDesign === idx
                ? "bg-black text-white border-black"
                : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {currentDesign === 0 && <GetNameOriginal {...layoutProps} />}
        {currentDesign === 1 && <GetNameSoft {...layoutProps} />}
        {currentDesign === 2 && <GetNameHybrid {...layoutProps} />}
        {currentDesign === 3 && <GetNameCompact {...layoutProps} />}
        {currentDesign === 4 && <GetNameLoud {...layoutProps} />}
      </div>
    </div>
  );
}
