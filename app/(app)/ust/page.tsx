import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

export const metadata = {
  title:
    "University of Santo Tomas (UST) Review | Block System & Thomasian Life",
  description:
    "Complete guide to University of Santo Tomas (UST). Learn about Growling Tigers culture, block section experience, España campus, Paskuhan, pros and cons. Is UST worth it? Compare UST vs DLSU. Discover what it's really like studying at UST.",
  keywords: [
    "University of Santo Tomas",
    "UST",
    "Growling Tigers",
    "España",
    "UST student life",
    "UST block schedule",
    "UST block sections",
    "Thomasian life",
    "UST pros and cons",
    "Paskuhan",
    "DLSU vs UST",
    "what's it like studying in UST",
    "go uste",
  ],
  openGraph: {
    title: "University of Santo Tomas (UST) – Block Life & Thomasian Culture",
    description:
      "Everything you need to know about studying at UST. Block system, student traditions, pros and cons.",
    type: "website",
    url: "https://unisort.ycells.com/ust",
  },
  alternates: {
    canonical: "https://unisort.ycells.com/ust",
  },
};

export default function UST() {
  return (
    <>
      <NewspaperMasthead />
      <TabloidLayout data={universityData.ust} />
    </>
  );
}
