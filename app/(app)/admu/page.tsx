import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";
import { UNIVERSITY_KEYWORDS } from "@/lib/seo/metadata";

export const metadata = {
  title:
    "Ateneo de Manila University (ADMU) Review | Student Culture, Pros & Cons",
  description:
    "Complete guide to Ateneo de Manila University (ADMU). Learn about Blue Eagles student culture, Jesuit education, Katipunan campus life, pros and cons. Is Ateneo worth it? Compare ADMU vs La Salle, ADMU vs UP. Discover what it's really like studying at Ateneo.",
  keywords: UNIVERSITY_KEYWORDS.admu,
  openGraph: {
    title: "Ateneo de Manila University (ADMU) – Student Life & Culture Review",
    description:
      "Everything you need to know about studying at Ateneo de Manila University. Student culture, academic experience, pros and cons.",
    type: "website",
    url: "https://unisort.ycells.com/admu",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/admu",
  },
};

export default function ADMU() {
  return (
    <>
      <NewspaperMasthead />
      <TabloidLayout data={universityData.admu} />
    </>
  );
}
