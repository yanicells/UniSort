"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "./post";
import { ReplyModal } from "./reply-form";
import { ReactionModal } from "./reaction-modal";

type PostViewProps = {
  id: string;
  content: string;
  tags: string[];
  reactions?: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  } | null;
  createdAt: string | Date;
  imageUrl?: string | null;
};

export default function SinglePostView({ post }: { post: PostViewProps }) {
  const [showReply, setShowReply] = useState(false);
  const [showReactionModal, setShowReactionModal] = useState(false);

  const reactions = post.reactions ?? {
    like: 0,
    love: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  };

  const createdAt =
    post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/freedom-wall"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to wall
        </Link>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:border-foreground/20"
            onClick={() => setShowReply(true)}
          >
            Reply
          </button>
          <div className="relative">
            <button
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:border-foreground/20"
              onClick={() => setShowReactionModal(true)}
              title="Add reaction"
            >
              😊 React
            </button>
            {showReactionModal && (
              <ReactionModal
                postId={post.id}
                onClose={() => setShowReactionModal(false)}
              />
            )}
          </div>
        </div>
      </div>

      <Post
        id={post.id}
        content={post.content}
        tags={post.tags}
        reactions={reactions}
        createdAt={createdAt}
        imageUrl={post.imageUrl}
      />

      {showReply && (
        <ReplyModal parentId={post.id} onClose={() => setShowReply(false)} />
      )}
    </div>
  );
}
