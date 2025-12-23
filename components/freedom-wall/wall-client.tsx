"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "./post";
import { FilterBar } from "./filter-bar";
import { useRouter } from "next/navigation";
import { PostModal } from "./post-modal";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { PenTool, Loader2 } from "lucide-react";

type WallUniversity = "general" | "admu" | "dlsu" | "up" | "ust";
type WallSort = "latest" | "most-liked" | "most-discussed";
type WallTime = "all" | "week" | "month";

type PostData = {
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
  createdAt: Date | string;
  imageUrl?: string | null;
  commentCount?: number;
};

interface WallClientProps {
  initialPosts: PostData[];
}

const POSTS_PER_PAGE = 10;

export function WallClient({ initialPosts }: WallClientProps) {
  const [selectedUniversities, setSelectedUniversities] = useState<
    WallUniversity[]
  >([]);
  const [sortBy, setSortBy] = useState<WallSort>("latest");
  const [timeRange, setTimeRange] = useState<WallTime>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [replyToPostId, setReplyToPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Derive posts from initialPosts to sync with server data
  const [posts, setPosts] = useState(() => initialPosts ?? []);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState((initialPosts ?? []).length >= POSTS_PER_PAGE);
  
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);
  const prevInitialPostsRef = useRef(initialPosts);
  const router = useRouter();

  // Sync posts when navigating back (initialPosts reference changes)
  if (prevInitialPostsRef.current !== initialPosts) {
    setPosts(initialPosts ?? []);
    setPage(2);
    setHasMore((initialPosts ?? []).length >= POSTS_PER_PAGE);
    prevInitialPostsRef.current = initialPosts;
  }

  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      limit: POSTS_PER_PAGE.toString(),
      sortBy,
      timeRange,
    });
    selectedUniversities.forEach((u) => params.append("university", u));
    const res = await fetch(`/api/posts?${params.toString()}`);
    const data = await res.json();
    const newPosts = data.posts || [];

    setPosts((prev) => {
      // Prevent duplicates by filtering out posts that already exist
      const existingIds = new Set(prev.map((p) => p.id));
      const uniqueNewPosts = newPosts.filter(
        (p: { id: string }) => !existingIds.has(p.id)
      );
      return [...prev, ...uniqueNewPosts];
    });
    setPage((prev) => prev + 1);
    if (newPosts.length < POSTS_PER_PAGE) {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [page, sortBy, timeRange, selectedUniversities]);

  const refreshPosts = useCallback(async (withSkeleton: boolean = false) => {
    setIsLoading(true);
    if (withSkeleton) {
      setPosts([]);
    }
    const params = new URLSearchParams({
      page: "1",
      limit: POSTS_PER_PAGE.toString(),
      sortBy,
      timeRange,
    });
    selectedUniversities.forEach((u) => params.append("university", u));
    const res = await fetch(`/api/posts?${params.toString()}`);
    const data = await res.json();
    setPosts(data.posts || []);
    setPage(2);
    setHasMore((data.posts || []).length >= POSTS_PER_PAGE);
    setIsLoading(false);
  }, [sortBy, timeRange, selectedUniversities]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMorePosts]);

  // Refresh posts when filters change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // reset and fetch first page on filters change
    refreshPosts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUniversities, sortBy, timeRange]);

  return (
    <>
      <NewspaperMasthead />
      <div className="min-h-screen bg-[#f4f4f4] text-slate-900 font-serif pb-12">
        {/* Marquee */}
        <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap border-b-2 border-pink-800">
          <div className="animate-marquee inline-block font-mono text-xs md:text-sm font-bold tracking-widest">
            CONFESSIONS /// RANTS /// LOVE LETTERS /// LOST & FOUND ///
            SHOUTOUTS /// ANONYMOUS /// UNCENSORED /// SPOTTED: CUTIE AT THE LIBRARY /// LOOKING FOR STUDY BUDDY /// LATEST CAMPUS TEA SERVED HOT /// SEND YOUR CONFESSIONS NOW! /// ORGANIC ENCOUNTER WHEN?? ///
            IKULONG NA YAN MGA KURAKOT!!!! /// FLOOD CONTROL WYAA!??!? ///
            TRILLION PESO MARCH /// YOU&apos;VE NEVER BEEN TO YARDSTICK? /// MINUMULTO PARIN AKO ///
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen border-x border-slate-300">
          {/* Header */}
          <header className="p-4 md:p-6 lg:p-8 text-center border-b-4 border-black bg-pink-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 italic">
              The Freedom Wall
            </h1>
            <p className="font-mono text-[10px] md:text-xs text-pink-600 font-bold uppercase tracking-widest">
              Voice of the Students • Anonymous • Unfiltered
            </p>
          </header>

          {/* Controls */}
          <div className="p-4 md:p-6 border-b-2 border-black bg-slate-100">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
              <div className="flex flex-wrap gap-2 flex-1">
                <FilterBar
                  selectedUniversities={selectedUniversities}
                  setSelectedUniversities={setSelectedUniversities}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  timeRange={timeRange}
                  setTimeRange={setTimeRange}
                />
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-black text-white font-bold uppercase text-xs tracking-widest hover:bg-pink-600 transition shadow-[4px_4px_0px_0px_rgba(255,0,255,1)] whitespace-nowrap"
              >
                <PenTool size={14} /> Post
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="p-6 space-y-6 bg-slate-50">
            {posts.length === 0 && isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-pink-600" />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center text-slate-500 py-12 font-serif text-lg">
                No posts yet. Be the first to share!
              </div>
            ) : (
              posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  content={post.content}
                  tags={post.tags}
                  reactions={post.reactions}
                  createdAt={new Date(post.createdAt)}
                  imageUrl={post.imageUrl}
                  commentCount={post.commentCount}
                  onClick={() => router.push(`/freedom-wall/${post.id}`)}
                  onReply={() => setReplyToPostId(post.id)}
                  onReactionAdded={refreshPosts}
                />
              ))
            )}
          </div>

          {/* Load More */}
          <div ref={loadMoreRef} className="p-8 text-center">
            {isLoading && (
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">
                Loading more confessions...
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                You&apos;ve reached the end!
              </p>
            )}
            {hasMore && !isLoading && (
              <button
                onClick={loadMorePosts}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black border-b border-transparent hover:border-black transition"
              >
                Load More Confessions
              </button>
            )}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <PostModal
          onClose={() => setShowCreateModal(false)}
          onPostCreated={refreshPosts}
        />
      )}

      {replyToPostId && (
        <PostModal
          parentId={replyToPostId}
          onClose={() => setReplyToPostId(null)}
          onPostCreated={refreshPosts}
        />
      )}
    </>
  );
}
