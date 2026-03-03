"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { Post } from "./post";
import { FilterBar } from "./filter-bar";
import { useRouter, useSearchParams } from "next/navigation";
import { PostModal } from "./post-modal";
import { PenTool, Loader2 } from "lucide-react";
import { fetcher, wallSwrConfig } from "@/lib/swr";

type WallUniversity = "general" | "admu" | "dlsu" | "up" | "ust";
type WallSort = "latest" | "most-liked" | "most-discussed";
type WallTime = "all" | "week" | "month";

type Reactions = {
  like: number;
  love: number;
  haha: number;
  wow: number;
  sad: number;
  angry: number;
};

type PostData = {
  id: string;
  content: string;
  tags: string[];
  reactions: Reactions;
  createdAt: Date | string;
  imageUrl?: string | null;
  commentCount?: number;
};

type PostsResponse = {
  posts: PostData[];
};

const POSTS_PER_PAGE = 10;

// Valid options for type checking
const VALID_SORTS: WallSort[] = ["latest", "most-liked", "most-discussed"];
const VALID_TIMES: WallTime[] = ["all", "week", "month"];
const VALID_UNIVERSITIES: WallUniversity[] = [
  "general",
  "admu",
  "dlsu",
  "up",
  "ust",
];

export function WallClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize state from URL params
  const [selectedUniversities, setSelectedUniversities] = useState<
    WallUniversity[]
  >(() => {
    const unis = searchParams.getAll("u");
    return unis.filter((u): u is WallUniversity =>
      VALID_UNIVERSITIES.includes(u as WallUniversity),
    );
  });
  const [sortBy, setSortBy] = useState<WallSort>(() => {
    const sort = searchParams.get("sort");
    return VALID_SORTS.includes(sort as WallSort)
      ? (sort as WallSort)
      : "latest";
  });
  const [timeRange, setTimeRange] = useState<WallTime>(() => {
    const time = searchParams.get("time");
    return VALID_TIMES.includes(time as WallTime) ? (time as WallTime) : "all";
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [replyToPostId, setReplyToPostId] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  // Build query string from current filters (stable for SWR cache keys)
  const filterParams = useMemo(() => {
    const params = new URLSearchParams({
      limit: POSTS_PER_PAGE.toString(),
      sortBy,
      timeRange,
    });
    selectedUniversities.forEach((u) => params.append("university", u));
    return params.toString();
  }, [sortBy, timeRange, selectedUniversities]);

  // SWR Infinite key generator — each page gets a unique cache key
  const getKey = useCallback(
    (pageIndex: number, previousPageData: PostsResponse | null) => {
      // Reached the end — no more pages
      if (previousPageData && previousPageData.posts.length < POSTS_PER_PAGE) {
        return null;
      }
      return `/api/posts?page=${pageIndex + 1}&${filterParams}`;
    },
    [filterParams],
  );

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<PostsResponse>(getKey, fetcher, {
      ...wallSwrConfig,
      revalidateFirstPage: false, // Don't refetch page 1 when loading page N
      parallel: false, // Load pages sequentially
    });

  // Flatten all pages into a single posts array
  const posts = useMemo(() => {
    if (!data) return [];
    return data.flatMap((page) => page.posts);
  }, [data]);

  // Determine if there are more posts to load
  const hasMore = useMemo(() => {
    if (!data || data.length === 0) return true;
    const lastPage = data[data.length - 1];
    return lastPage.posts.length >= POSTS_PER_PAGE;
  }, [data]);

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  // Update URL when filters change (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (sortBy !== "latest") {
      params.set("sort", sortBy);
    }
    if (timeRange !== "all") {
      params.set("time", timeRange);
    }
    selectedUniversities.forEach((u) => params.append("u", u));

    const queryString = params.toString();
    const newUrl = queryString
      ? `/freedom-wall?${queryString}`
      : "/freedom-wall";

    // Use replace to avoid creating history entries for filter changes
    router.replace(newUrl, { scroll: false });
  }, [sortBy, timeRange, selectedUniversities, router]);

  // Load more posts for infinite scroll
  const loadMorePosts = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setSize((s) => s + 1);
    }
  }, [isLoadingMore, hasMore, setSize]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMorePosts();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMorePosts]);

  /**
   * Optimistic reaction update — updates the cached data in-place
   * without refetching. No scroll reset, instant feedback.
   */
  const handleReactionUpdate = useCallback(
    (postId: string, reaction: string) => {
      mutate(
        (currentData) => {
          if (!currentData) return currentData;
          return currentData.map((page) => ({
            ...page,
            posts: page.posts.map((post) => {
              if (post.id !== postId) return post;
              return {
                ...post,
                reactions: {
                  ...post.reactions,
                  [reaction]:
                    (post.reactions[reaction as keyof Reactions] || 0) + 1,
                },
              };
            }),
          }));
        },
        { revalidate: false }, // Don't refetch — trust the optimistic update
      );
    },
    [mutate],
  );

  /**
   * Called after creating a new post — revalidates page 1 to show the new post.
   */
  const handlePostCreated = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <>
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
            {error ? (
              <div className="text-center py-12">
                <div className="bg-red-50 border-2 border-red-500 p-6 max-w-md mx-auto">
                  <p className="text-sm text-red-600 font-bold mb-4">
                    Unable to load posts. Please try again.
                  </p>
                  <button
                    onClick={() => mutate()}
                    className="px-6 py-2 bg-black text-white font-bold uppercase text-xs tracking-widest hover:bg-pink-600 transition"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : posts.length === 0 && isLoading ? (
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
                  onReactionAdded={handleReactionUpdate}
                />
              ))
            )}
          </div>

          {/* Load More */}
          <div ref={loadMoreRef} className="p-8 text-center">
            {(isLoadingMore || isValidating) && posts.length > 0 && (
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">
                Loading more confessions...
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                You&apos;ve reached the end!
              </p>
            )}
            {hasMore && !isLoadingMore && !isValidating && posts.length > 0 && (
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
          onPostCreated={handlePostCreated}
        />
      )}

      {replyToPostId && (
        <PostModal
          parentId={replyToPostId}
          onClose={() => setReplyToPostId(null)}
          onPostCreated={handlePostCreated}
        />
      )}
    </>
  );
}
