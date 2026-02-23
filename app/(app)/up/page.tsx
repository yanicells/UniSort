import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { UNIVERSITY_KEYWORDS } from "@/lib/seo/metadata";

export const metadata = {
  title:
    "University of the Philippines (UP) Review | UP Diliman Culture & Student Life",
  description:
    "Complete guide to University of the Philippines (UP Diliman). Learn about Fighting Maroons culture, iskolar ng bayan experience, campus life, academic rigor, pros and cons. Is UP worth it? Compare UP vs Ateneo, UP Diliman experience. Discover what it's really like studying at UP.",
  keywords: UNIVERSITY_KEYWORDS.up,
  openGraph: {
    title:
      "University of the Philippines (UP Diliman) – Iskolar ng Bayan Experience",
    description:
      "Everything you need to know about studying at UP Diliman. Student culture, academic independence, pros and cons.",
    type: "website",
    url: "https://unisort.ycells.com/up",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/up",
  },
};

export default function UP() {
  return (
    <>
      <TabloidLayout data={universityData.up} />
    </>
  );
}
