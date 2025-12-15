"use client";

import { useEffect, useRef, useState } from "react";
import { Post } from "./post";
import { FilterBar } from "./filter-bar";
import { useRouter } from "next/navigation";
import { PostModal } from "./post-modal";

type WallUniversity = "general" | "admu" | "dlsu" | "up" | "ust";
type WallSort = "latest" | "most-liked" | "most-discussed";
type WallTime = "all" | "week" | "month";

interface WallClientProps {
  initialPosts: any[];
}

const POSTS_PER_PAGE = 10;

export function WallClient({ initialPosts }: WallClientProps) {
  const initialList = initialPosts ?? [];
  const [posts, setPosts] = useState(initialList);
  const [page, setPage] = useState(2); // initial page already loaded
  const [hasMore, setHasMore] = useState(initialList.length >= POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUniversities, setSelectedUniversities] = useState<
    WallUniversity[]
  >([]);
  const [sortBy, setSortBy] = useState<WallSort>("latest");
  const [timeRange, setTimeRange] = useState<WallTime>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const loadMorePosts = async () => {
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
        (p: any) => !existingIds.has(p.id)
      );
      return [...prev, ...uniqueNewPosts];
    });
    setPage((prev) => prev + 1);
    if (newPosts.length < POSTS_PER_PAGE) {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  const refreshPosts = async () => {
    setIsLoading(true);
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
  };

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
  }, [hasMore, isLoading, page]);

  useEffect(() => {
    // reset and fetch first page on filters change
    refreshPosts();
  }, [selectedUniversities, sortBy, timeRange]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Freedom Wall</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="primary-button"
        >
          + New Post
        </button>
      </div>

      <FilterBar
        selectedUniversities={selectedUniversities}
        setSelectedUniversities={setSelectedUniversities}
        sortBy={sortBy}
        setSortBy={setSortBy}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />

      <div className="space-y-4">
        {posts.length === 0 && isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="card animate-pulse h-32" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-foreground/60 py-12">
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
            />
          ))
        )}
      </div>

      <div
        ref={loadMoreRef}
        className="py-8 text-center text-sm text-foreground/60"
      >
        {isLoading && (
          <div className="animate-pulse">Loading more posts...</div>
        )}
        {!hasMore && posts.length > 0 && <p>You've reached the end!</p>}
      </div>

      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-foreground text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center text-2xl z-40"
        aria-label="Create post"
      >
        +
      </button>

      {showCreateModal && (
        <PostModal
          onClose={() => setShowCreateModal(false)}
          onPostCreated={refreshPosts}
        />
      )}
    </div>
  );
}
