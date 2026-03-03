"use client";

import { useRef, useEffect, useState } from "react";

type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";

const REACTIONS: { type: ReactionType; emoji: string }[] = [
  { type: "like", emoji: "👍" },
  { type: "love", emoji: "❤️" },
  { type: "haha", emoji: "😂" },
  { type: "wow", emoji: "😮" },
  { type: "sad", emoji: "😢" },
  { type: "angry", emoji: "😠" },
];

type ReactionModalProps = {
  postId: string;
  onClose: () => void;
  onReactionAdded?: (reaction: string) => void;
};

export function ReactionModal({
  postId,
  onClose,
  onReactionAdded,
}: ReactionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleReactionClick = async (
    e: React.MouseEvent,
    reaction: ReactionType,
  ) => {
    e.stopPropagation();

    // Prevent double-clicks
    if (isSubmitting) return;

    setIsSubmitting(true);
    onClose();

    // Optimistic update — notify parent immediately
    onReactionAdded?.(reaction);

    // Fire API call in background
    try {
      await fetch(`/api/posts/${postId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction }),
      });
    } catch (error) {
      console.error("Failed to add reaction:", error);
      // On failure, next SWR revalidation will correct the count
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={modalRef}
        className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full px-3 py-2"
      >
        <div className="flex gap-1">
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.type}
              onClick={(e) => handleReactionClick(e, reaction.type)}
              disabled={isSubmitting}
              className="text-2xl hover:scale-125 transition-transform disabled:opacity-50 disabled:cursor-not-allowed p-1 hover:bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center"
              title={reaction.type}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
