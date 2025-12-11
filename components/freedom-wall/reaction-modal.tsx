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

  const handleReactionClick = async (reaction: ReactionType) => {
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
      ref={modalRef}
      className={`absolute z-50 bg-white rounded-full shadow-lg p-2 flex gap-1 ${
        position === "top" ? "bottom-full mb-2" : "top-full mt-2"
      }`}
    >
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.type}
          onClick={() => handleReactionClick(reaction.type)}
          disabled={isLoading}
          className="text-xl hover:scale-125 transition-transform hover:drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          title={reaction.type}
        >
          {reaction.emoji}
        </button>
      ))}
    </div>
  );
}
