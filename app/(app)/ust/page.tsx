import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

export const metadata = {
  title: "University of Santo Tomas (UST) - UniSort",
  description:
    "Learn about UST's campus culture, academic programs, and student life. Discover if UST is right for you.",
};

export default function UST() {
  return (
    <>
      <NewspaperMasthead />
      <TabloidLayout data={universityData.ust} />
    </>
  );
}
