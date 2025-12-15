"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "./post";
import { PostModal } from "./post-modal";
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
      <div>
        <Link
          href="/freedom-wall"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to wall
        </Link>
      </div>

      <Post
        id={post.id}
        content={post.content}
        tags={post.tags}
        reactions={reactions}
        createdAt={createdAt}
        imageUrl={post.imageUrl}
        onReply={() => setShowReply(true)}
      />

      {showReply && (
        <PostModal parentId={post.id} onClose={() => setShowReply(false)} />
      )}
    </div>
  );
}
