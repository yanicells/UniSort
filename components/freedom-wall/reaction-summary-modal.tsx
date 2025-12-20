"use client";

import { useRef, useEffect } from "react";
import { X } from "lucide-react";

type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";

const REACTION_CONFIG: Record<ReactionType, { emoji: string; label: string }> = {
  like: { emoji: "👍", label: "Like" },
  love: { emoji: "❤️", label: "Love" },
  haha: { emoji: "😆", label: "Haha" },
  wow: { emoji: "😮", label: "Wow" },
  sad: { emoji: "😢", label: "Sad" },
  angry: { emoji: "😠", label: "Angry" },
};

type ReactionSummaryModalProps = {
  reactions: Record<ReactionType, number>;
  onClose: () => void;
};

export function ReactionSummaryModal({
  reactions,
  onClose,
}: ReactionSummaryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const sortedReactions = (Object.entries(reactions) as [ReactionType, number][])
    .filter(([_, count]) => count > 0)
    .sort(([_, a], [__, b]) => b - a);

  return (
    <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-xs border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
      >
        <div className="bg-black text-white px-4 py-2 flex justify-between items-center border-b-4 border-black">
          <h3 className="font-black uppercase tracking-widest text-sm">
            Reactions
          </h3>
          <button onClick={onClose} className="hover:text-red-500 transition">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 bg-yellow-50 max-h-[60vh] overflow-y-auto">
          {sortedReactions.length === 0 ? (
            <p className="text-center text-slate-500 font-serif italic py-4">
              No reactions yet.
            </p>
          ) : (
            <div className="space-y-3">
              {sortedReactions.map(([type, count]) => (
                <div
                  key={type}
                  className="flex items-center justify-between border-b border-black/10 pb-2 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={type}>
                      {REACTION_CONFIG[type].emoji}
                    </span>
                    <span className="font-bold uppercase text-xs tracking-wider">
                      {REACTION_CONFIG[type].label}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-lg">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
