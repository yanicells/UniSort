import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

export const metadata = {
  title:
    "University of the Philippines (UP) Review | UP Diliman Culture & Student Life",
  description:
    "Complete guide to University of the Philippines (UP Diliman). Learn about Fighting Maroons culture, iskolar ng bayan experience, campus life, academic rigor, pros and cons. Is UP worth it? Compare UP vs Ateneo, UP Diliman experience. Discover what it's really like studying at UP.",
  keywords: [
    "University of the Philippines",
    "UP",
    "UP Diliman",
    "Fighting Maroons",
    "iskolar ng bayan",
    "UP culture",
    "UP Diliman student experience",
    "UP campus life",
    "UP pros and cons",
    "is UP worth it",
    "UP vs Ateneo",
    "UP Diliman experience",
    "what's it like studying in UP Diliman",
    "up fight",
  ],
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
      <NewspaperMasthead />
      <TabloidLayout data={universityData.up} />
    </>
  );
}
