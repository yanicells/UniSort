"use client";

import { formatDistanceToNow } from "date-fns";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";

interface PostCardSimpleProps {
  id: string;
  content: string;
  tags: string[];
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  createdAt: Date;
}

// Strip HTML tags for preview
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function PostCardSimple({
  id,
  content,
  tags,
  reactions,
  createdAt,
}: PostCardSimpleProps) {
  const totalReactions = Object.values(reactions).reduce(
    (sum, val) => sum + val,
    0
  );
  const previewText = stripHtml(content).slice(0, 100);

  return (
    <Link href={`/freedom-wall/${id}`}>
      <div className="bg-white p-4 border border-slate-300 shadow-sm hover:shadow-md transition cursor-pointer transform hover:-rotate-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            {tags[0] || "General"} •{" "}
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </div>
        <p className="font-mono text-sm mb-4 line-clamp-3">{previewText}</p>
        <div className="flex items-center gap-1 text-slate-400 hover:text-orange-500">
          <ThumbsUp size={14} />
          <span className="text-xs font-bold">{totalReactions}</span>
        </div>
      </div>
    </Link>
  );
}
