"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "./post";
import { ReplyModal } from "./reply-form";

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
};

export default function SinglePostView({ post }: { post: PostViewProps }) {
  const [showReply, setShowReply] = useState(false);

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/freedom-wall"
          className="text-sm text-blue-600 hover:underline"
        >
          Back to wall
        </Link>
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => setShowReply(true)}
        >
          Reply
        </button>
      </div>

      <Post
        id={post.id}
        content={post.content}
        tags={post.tags}
        reactions={reactions}
        createdAt={createdAt}
      />

      {showReply && (
        <ReplyModal parentId={post.id} onClose={() => setShowReply(false)} />
      )}
    </div>
  );
}
