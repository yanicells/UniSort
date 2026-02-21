import StatsClient from "@/components/stats/stats-client";
import { STATS_KEYWORDS } from "@/lib/seo/metadata";
import type { Metadata } from "next";

// Force dynamic - client will fetch fresh data
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Big 4 University Quiz Results & Statistics | Real-Time Match Data Philippines",
  description:
    "Live statistics showing which Big 4 universities students match with most. See real-time trends and match distributions for Ateneo de Manila University (ADMU), De La Salle University (DLSU), University of the Philippines (UP), and University of Santo Tomas (UST) personality quiz results.",
  keywords: STATS_KEYWORDS,
  openGraph: {
    title: "Big 4 University Quiz Statistics – Live Match Data",
    description:
      "Real-time statistics showing quiz results and match trends for ADMU, DLSU, UP, and UST.",
    type: "website",
    url: "https://unisort.ycells.com/stats",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/stats",
  },
};

export default function StatsPage() {
  return <StatsClient />;
}
