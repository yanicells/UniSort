"use client";

import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Post } from "./post";
import { Comments } from "./comments";
import { PostModal } from "./post-modal";
import type { PostComment } from "./comment-types";
import { fetcher, wallSwrConfig } from "@/lib/swr";
import { useState } from "react";

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

type SinglePostResponse = {
  post: PostData;
  comments: PostComment[];
  allComments: PostComment[];
  totalCommentCount: number;
};

type SinglePostPageProps = {
  postId: string;
};

export default function SinglePostPage({ postId }: SinglePostPageProps) {
  const [showReplyModal, setShowReplyModal] = useState(false);
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();

  const { data, error, isLoading, mutate } = useSWR<SinglePostResponse>(
    `/api/posts/${postId}`,
    fetcher,
    wallSwrConfig,
  );

  const post = data?.post ?? null;
  const comments = data?.comments ?? [];
  const allComments = data?.allComments ?? [];
  const totalCommentCount = data?.totalCommentCount ?? 0;

  /**
   * Optimistic reaction update for the main post.
   * Updates cached data in-place without refetching.
   */
  const handleReactionUpdate = useCallback(
    (targetPostId: string, reaction: string) => {
      mutate(
        (currentData) => {
          if (!currentData) return currentData;

          // Update the main post
          if (currentData.post.id === targetPostId) {
            return {
              ...currentData,
              post: {
                ...currentData.post,
                reactions: {
                  ...currentData.post.reactions,
                  [reaction]:
                    (currentData.post.reactions[
                      reaction as keyof typeof currentData.post.reactions
                    ] || 0) + 1,
                },
              },
            };
          }

          // Update a comment's reactions
          return {
            ...currentData,
            comments: currentData.comments.map((c) =>
              c.id === targetPostId
                ? {
                    ...c,
                    reactions: {
                      ...c.reactions,
                      [reaction]:
                        (c.reactions[reaction as keyof typeof c.reactions] ||
                          0) + 1,
                    },
                  }
                : c,
            ),
            allComments: currentData.allComments.map((c) =>
              c.id === targetPostId
                ? {
                    ...c,
                    reactions: {
                      ...c.reactions,
                      [reaction]:
                        (c.reactions[reaction as keyof typeof c.reactions] ||
                          0) + 1,
                    },
                  }
                : c,
            ),
          };
        },
        { revalidate: false },
      );

      // Also sync the reaction to the wall's infinite scroll cache
      // so going back shows the updated count immediately
      globalMutate(
        (key: unknown) =>
          typeof key === "string" && key.startsWith("/api/posts?"),
        (
          currentData:
            | {
                posts: Array<{ id: string; reactions: Record<string, number> }>;
              }
            | undefined,
        ) => {
          if (!currentData?.posts) return currentData;
          return {
            ...currentData,
            posts: currentData.posts.map((p) => {
              if (p.id !== targetPostId) return p;
              return {
                ...p,
                reactions: {
                  ...p.reactions,
                  [reaction]: (p.reactions[reaction] || 0) + 1,
                },
              };
            }),
          };
        },
        { revalidate: false },
      );
    },
    [mutate, globalMutate],
  );

  /** Revalidate after adding a comment */
  const handleCommentAdded = useCallback(() => {
    mutate();
  }, [mutate]);

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
          <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-800">
            <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
              LOADING POST /// PLEASE WAIT ///
            </div>
          </div>
          <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
            <header className="p-4 sm:p-6 md:p-8 text-center border-b-4 border-black bg-pink-50">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
                The Freedom Wall
              </h1>
            </header>
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-pink-600" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
          <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
            <header className="p-4 sm:p-6 md:p-8 text-center border-b-4 border-black bg-pink-50">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
                The Freedom Wall
              </h1>
            </header>
            <div className="p-6 text-center">
              <p className="text-xl font-bold text-slate-600 mb-4">
                {error
                  ? "Failed to load post. Please try again."
                  : "Post not found"}
              </p>
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-pink-600 hover:text-pink-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Freedom Wall
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            CONFESSIONS /// RANTS /// LOVE LETTERS /// LOST &amp; FOUND ///
            MINUMULTO PARIN AKO /// ANONYMOUS /// UNCENSORED /// SPOTTED: CUTIE
            AT THE LIBRARY /// LOOKING FOR STUDY BUDDY /// LATEST CAMPUS TEA
            SERVED HOT /// SEND YOUR CONFESSIONS NOW! /// ORGANIC ENCOUNTER
            WHEN?? /// IKULONG NA YAN MGA KURAKOT!!!! /// FLOOD CONTROL
            WYAA!??!? /// TRILLION PESO MARCH /// YOU&apos;VE NEVER BEEN TO
            YARDSTICK? /// SHOUTOUTS ///
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
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-pink-600 hover:text-pink-700 transition-colors border-b-2 border-transparent hover:border-pink-600 pb-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Freedom Wall
            </button>

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
              onReactionAdded={handleReactionUpdate}
            />

            {/* Comments Section */}
            <div className="border-t-2 border-black pt-6">
              <Comments
                postId={postId}
                comments={comments}
                allComments={allComments}
                totalCount={totalCommentCount}
                onCommentAdded={handleCommentAdded}
              />
            </div>
          </div>
        </div>
      </div>

      {showReplyModal && (
        <PostModal
          parentId={postId}
          onClose={() => setShowReplyModal(false)}
          onPostCreated={handleCommentAdded}
        />
      )}
    </>
  );
}
