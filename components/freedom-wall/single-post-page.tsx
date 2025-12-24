"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
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
};

export default function SinglePostPage({ postId }: SinglePostPageProps) {
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [allComments, setAllComments] = useState<PostComment[]>([]);
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const MAX_RETRIES = 2;

  const fetchPostData = useCallback(async (retry: number = 0): Promise<void> => {
    try {
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const res = await fetch(`/api/posts/${postId}?_t=${Date.now()}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        if (res.status === 404) {
          setError("Post not found");
        } else {
          throw new Error(`HTTP ${res.status}`);
        }
        return;
      }
      
      const data = await res.json();
      setPost(data.post);
      setComments(data.comments || []);
      setAllComments(data.allComments || []);
      setTotalCommentCount(data.totalCommentCount || 0);
      setError(null);
    } catch (err) {
      console.error(`Error fetching post (attempt ${retry + 1}):`, err);
      
      // Retry with exponential backoff
      if (retry < MAX_RETRIES) {
        const delay = Math.pow(2, retry) * 500;
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchPostData(retry + 1);
      }
      
      setError("Failed to load post. Please try again.");
    }
  }, [postId]);

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    fetchPostData().finally(() => setIsLoading(false));
  }, [fetchPostData]);

  // Refresh function for after reactions/comments
  const refreshPost = useCallback(async () => {
    await fetchPostData();
  }, [fetchPostData]);

  if (isLoading) {
    return (
      <>
        <NewspaperMasthead />
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
        <NewspaperMasthead />
        <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
          <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
            <header className="p-4 sm:p-6 md:p-8 text-center border-b-4 border-black bg-pink-50">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
                The Freedom Wall
              </h1>
            </header>
            <div className="p-6 text-center">
              <p className="text-xl font-bold text-slate-600 mb-4">{error || "Post not found"}</p>
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
      <NewspaperMasthead />
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            CONFESSIONS /// RANTS /// LOVE LETTERS /// LOST & FOUND ///
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
              onReactionAdded={refreshPost}
            />

            {/* Comments Section */}
            <div className="border-t-2 border-black pt-6">
              <Comments
                postId={postId}
                comments={comments}
                allComments={allComments}
                totalCount={totalCommentCount}
                onCommentAdded={refreshPost}
              />
            </div>
          </div>
        </div>
      </div>

      {showReplyModal && (
        <PostModal
          parentId={postId}
          onClose={() => setShowReplyModal(false)}
          onPostCreated={refreshPost}
        />
      )}
    </>
  );
}
