"use client";

import { useRef, useEffect, useState } from "react";
import { handleAddReaction } from "@/lib/actions/reaction-actions";

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
  position?: "top" | "bottom";
};

export function ReactionModal({
  postId,
  onClose,
  position = "top",
}: ReactionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    reaction: ReactionType
  ) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await handleAddReaction(postId, reaction);
      onClose();
    } catch (error) {
      console.error("Failed to add reaction:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4"
      >
        <div className="flex gap-2">
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.type}
              onClick={(e) => handleReactionClick(e, reaction.type)}
              disabled={isLoading}
              className="text-3xl hover:scale-125 transition-transform hover:drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed p-2 hover:bg-slate-100 rounded"
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
