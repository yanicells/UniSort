import { WallClient } from "@/components/freedom-wall/wall-client";

// Force dynamic to ensure fresh data - the client will handle all data fetching
export const dynamic = "force-dynamic";

export const metadata = {
  title:
    "Freedom Wall – Anonymous University Confessions Philippines | ADMU DLSU UP UST",
  description:
    "Read and share anonymous posts about Big 4 university life in the Philippines. Real student experiences, confessions, and stories from Ateneo (ADMU), La Salle (DLSU), UP Diliman, and UST freedom walls. Join the conversation anonymously.",
  keywords: [
    "freedom wall philippines",
    "university confessions",
    "ADMU freedom wall",
    "ADMU confessions",
    "DLSU freedom wall",
    "La Salle confessions",
    "UP freedom wall",
    "UP Diliman confessions",
    "UST freedom wall",
    "UST confessions",
    "college anonymous confession site",
    "university freedom wall",
    "student stories philippines",
  ],
  openGraph: {
    title: "Freedom Wall – Anonymous Big 4 University Confessions",
    description:
      "Real anonymous posts about student life at Ateneo, La Salle, UP, and UST. Share your story or read others.",
    type: "website",
    url: "https://unisort.ycells.com/freedom-wall",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/freedom-wall",
  },
};

export default function FreedomWall() {
  // Don't fetch on server - let client handle all data fetching for consistency
  return <WallClient />;
}
