import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getQuizSummary, getRecentPosts } from "@/lib/dal/queries";
import { Post } from "@/components/freedom-wall/post";

export default async function Home() {
  const [quizSummary, recentPosts] = await Promise.all([
    getQuizSummary(),
    getRecentPosts(4),
  ]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-green-50" />
      <Container className="space-y-16 pb-16">
        {/* Hero */}
        <section className="text-center space-y-6 py-16 md:py-24">
          <h1>Discover Where You Truly Belong</h1>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Find your perfect university match through our personality-based
            quiz, explore real student stories, and dive into campus culture
            across ADMU, DLSU, UP, and UST.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
            <Link href="/quiz" className="primary-button text-lg px-8 py-4">
              Take the Quiz →
            </Link>
            <Link
              href="/freedom-wall"
              className="secondary-button text-lg px-8 py-4"
            >
              Explore Freedom Wall
            </Link>
          </div>
          <p className="text-sm text-foreground/50">
            Takes about 2 minutes · No sign-up required
          </p>
        </section>

        {/* Feature Grid */}
        <section className="space-y-8">
          <h2 className="text-center">Why UniSort?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card text-left">
              <div className="text-2xl font-bold mb-3">🎯 Personality Quiz</div>
              <p className="text-foreground/70">
                Answer 10 quick questions to see which university culture fits
                you best, with instant insights.
              </p>
              <Link
                href="/quiz"
                className="mt-4 inline-flex text-foreground font-medium hover:underline"
              >
                Start the quiz →
              </Link>
            </div>
            <div className="card text-left">
              <div className="text-2xl font-bold mb-3">💬 Freedom Wall</div>
              <p className="text-foreground/70">
                Read and share anonymous stories about student life across
                campuses. React, comment, and join the conversation.
              </p>
              <Link
                href="/freedom-wall"
                className="mt-4 inline-flex text-foreground font-medium hover:underline"
              >
                Browse posts →
              </Link>
            </div>
            <div className="card text-left">
              <div className="text-2xl font-bold mb-3">
                📊 University Insights
              </div>
              <p className="text-foreground/70">
                Explore curated overviews, campus culture highlights, and stats
                to help you decide where you fit.
              </p>
              <Link
                href="/stats"
                className="mt-4 inline-flex text-foreground font-medium hover:underline"
              >
                View stats →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Preview */}
        <section className="text-center space-y-4">
          <div className="card inline-flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-foreground">
              {quizSummary.total}
            </p>
            <p className="text-foreground/70">
              Students have found their match
            </p>
          </div>
        </section>

        {/* Recent Freedom Wall Posts */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Recent from Freedom Wall</h2>
            <Link href="/freedom-wall" className="text-foreground underline">
              View all posts →
            </Link>
          </div>
          <div className="space-y-4">
            {recentPosts.length === 0 ? (
              <p className="text-foreground/50 text-center">
                No posts yet. Be the first to share!
              </p>
            ) : (
              recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/freedom-wall/${post.id}`}
                  className="block"
                >
                  <Post
                    id={post.id}
                    content={post.content}
                    tags={post.tags}
                    reactions={post.reactions}
                    createdAt={new Date(post.createdAt)}
                    imageUrl={post.imageUrl}
                    commentCount={post.commentCount}
                  />
                </Link>
              ))
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}
