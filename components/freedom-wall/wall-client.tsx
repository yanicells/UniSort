"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "./post";
import { FilterBar } from "./filter-bar";
import { useRouter, useSearchParams } from "next/navigation";
import { PostModal } from "./post-modal";
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

const POSTS_PER_PAGE = 10;
const MAX_RETRIES = 2;

// Valid options for type checking
const VALID_SORTS: WallSort[] = ["latest", "most-liked", "most-discussed"];
const VALID_TIMES: WallTime[] = ["all", "week", "month"];
const VALID_UNIVERSITIES: WallUniversity[] = ["general", "admu", "dlsu", "up", "ust"];

export function WallClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Initialize state from URL params
  const [selectedUniversities, setSelectedUniversities] = useState<WallUniversity[]>(() => {
    const unis = searchParams.getAll("u");
    return unis.filter((u): u is WallUniversity => VALID_UNIVERSITIES.includes(u as WallUniversity));
  });
  const [sortBy, setSortBy] = useState<WallSort>(() => {
    const sort = searchParams.get("sort");
    return VALID_SORTS.includes(sort as WallSort) ? (sort as WallSort) : "latest";
  });
  const [timeRange, setTimeRange] = useState<WallTime>(() => {
    const time = searchParams.get("time");
    return VALID_TIMES.includes(time as WallTime) ? (time as WallTime) : "all";
  });
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [replyToPostId, setReplyToPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isMounted = useRef(false);
  const retryCount = useRef(0);
  const isInitialMount = useRef(true);

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
    const newUrl = queryString ? `/freedom-wall?${queryString}` : "/freedom-wall";
    
    // Use replace to avoid creating history entries for filter changes
    router.replace(newUrl, { scroll: false });
  }, [sortBy, timeRange, selectedUniversities, router]);



  // Fetch posts from API with retry logic
  const fetchPosts = useCallback(async (pageNum: number, append: boolean = false, retry: number = 0): Promise<PostData[]> => {
    try {
      setError(null);
      
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: POSTS_PER_PAGE.toString(),
        sortBy,
        timeRange,
      });
      selectedUniversities.forEach((u) => params.append("university", u));
      
      // Add cache-busting timestamp to prevent browser caching
      params.append("_t", Date.now().toString());
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const res = await fetch(`/api/posts?${params.toString()}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      const newPosts = data.posts || [];

      if (append) {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewPosts = newPosts.filter(
            (p: PostData) => !existingIds.has(p.id)
          );
          return [...prev, ...uniqueNewPosts];
        });
      } else {
        setPosts(newPosts);
      }
      
      setHasMore(newPosts.length >= POSTS_PER_PAGE);
      retryCount.current = 0; // Reset retry count on success
      return newPosts;
    } catch (err) {
      console.error(`Error fetching posts (attempt ${retry + 1}):`, err);
      
      // Retry with exponential backoff
      if (retry < MAX_RETRIES) {
        const delay = Math.pow(2, retry) * 500; // 500ms, 1000ms, 2000ms
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchPosts(pageNum, append, retry + 1);
      }
      
      // Max retries reached
      setError("Unable to load posts. Please try again.");
      return [];
    }
  }, [sortBy, timeRange, selectedUniversities]);

  // Initial load
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      setIsLoading(true);
      fetchPosts(1).finally(() => setIsLoading(false));
    }
  }, [fetchPosts]);

  // Refresh when filters change
  useEffect(() => {
    if (isMounted.current) {
      setIsLoading(true);
      setPage(1);
      fetchPosts(1).finally(() => setIsLoading(false));
    }
  }, [selectedUniversities, sortBy, timeRange, fetchPosts]);

  // Load more posts - use ref to prevent race conditions
  const fetchingMore = useRef(false);
  
  const loadMorePosts = useCallback(async () => {
    // Prevent multiple simultaneous requests
    if (isLoading || !hasMore || fetchingMore.current) return;
    
    fetchingMore.current = true;
    setIsLoading(true);
    
    try {
      const nextPage = page + 1;
      const newPosts = await fetchPosts(nextPage, true);
      
      // Only increment page if we got results
      if (newPosts && newPosts.length > 0) {
        setPage(nextPage);
      }
    } finally {
      setIsLoading(false);
      fetchingMore.current = false;
    }
  }, [page, isLoading, hasMore, fetchPosts]);

  // Refresh posts (called after creating post or adding reaction)
  const refreshPosts = useCallback(async () => {
    setIsLoading(true);
    setPage(1);
    await fetchPosts(1);
    setIsLoading(false);
  }, [fetchPosts]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !fetchingMore.current) {
          loadMorePosts();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMorePosts]);

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
                  <p className="text-sm text-red-600 font-bold mb-4">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      setIsLoading(true);
                      fetchPosts(1).finally(() => setIsLoading(false));
                    }}
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
                  onReactionAdded={refreshPosts}
                />
              ))
            )}
          </div>

          {/* Load More */}
          <div ref={loadMoreRef} className="p-8 text-center">
            {isLoading && posts.length > 0 && (
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">
                Loading more confessions...
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                You&apos;ve reached the end!
              </p>
            )}
            {hasMore && !isLoading && posts.length > 0 && (
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
