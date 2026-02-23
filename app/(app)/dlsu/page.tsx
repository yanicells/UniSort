import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { UNIVERSITY_KEYWORDS } from "@/lib/seo/metadata";

export const metadata = {
  title:
    "De La Salle University (DLSU) Review | Trimester System & Student Life",
  description:
    "Complete guide to De La Salle University (DLSU). Learn about Green Archers culture, trimester system experience, Taft campus, Happy Thursday, pros and cons. Is La Salle worth it? Compare DLSU vs Ateneo, DLSU vs UST. Discover what it's really like studying at La Salle.",
  keywords: UNIVERSITY_KEYWORDS.dlsu,
  openGraph: {
    title: "De La Salle University (DLSU) – Trimester Life & Student Culture",
    description:
      "Everything you need to know about studying at De La Salle University. Trimester system, student culture, pros and cons.",
    type: "website",
    url: "https://unisort.ycells.com/dlsu",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/dlsu",
  },
};

export default function DLSU() {
  return (
    <>
      <TabloidLayout data={universityData.dlsu} />
    </>
  );
}
