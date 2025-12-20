"use client";

import { useState } from "react";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { Post } from "./post";
import { Comments } from "./comments";
import { PostModal } from "./post-modal";
import type { PostComment } from "./comment-types";

type PostData = {
  id: string;
  content: string;
  tags: string[];
  imageUrl?: string | null;
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  createdAt: Date | string;
};

type SinglePostPageProps = {
  postId: string;
  post: PostData;
  comments: PostComment[];
  allComments: PostComment[];
  totalCommentCount: number;
};

export default function SinglePostPage({
  postId,
  post,
  comments,
  allComments,
  totalCommentCount,
}: SinglePostPageProps) {
  const [showReplyModal, setShowReplyModal] = useState(false);

  return (
    <>
      <NewspaperMasthead />
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-pink-500 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-700">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            CONFESSIONS /// RANTS /// LOVE LETTERS /// LOST & FOUND ///
            SHOUTOUTS /// ANONYMOUS /// UNCENSORED
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
          {/* Header */}
          <header className="p-4 sm:p-6 md:p-8 text-center border-b-4 border-black bg-pink-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
              The Freedom Wall
            </h1>
            <p className="font-mono text-[10px] sm:text-xs text-pink-600 font-bold uppercase tracking-widest">
              est. 2024 • speak freely • stay anonymous
            </p>
          </header>

          {/* Main Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Main Post */}
            <Post
              id={post.id}
              content={post.content}
              tags={post.tags}
              imageUrl={post.imageUrl}
              reactions={post.reactions}
              createdAt={
                typeof post.createdAt === "string"
                  ? new Date(post.createdAt)
                  : post.createdAt
              }
              commentCount={totalCommentCount}
              hideCommentCount={true}
              onReply={() => setShowReplyModal(true)}
            />

            {/* Comments Section */}
            <div className="border-t-2 border-black pt-6">
              <Comments
                postId={postId}
                comments={comments}
                allComments={allComments}
                totalCount={totalCommentCount}
              />
            </div>
          </div>
        </div>
      </div>

      {showReplyModal && (
        <PostModal parentId={postId} onClose={() => setShowReplyModal(false)} />
      )}
    </>
  );
}
