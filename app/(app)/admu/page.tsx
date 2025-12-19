import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

export const metadata = {
  title: "Ateneo de Manila University (ADMU) - UniSort",
  description:
    "Learn about ADMU's campus culture, academic programs, and student life. Discover if Ateneo is right for you.",
};

export default function ADMU() {
  return (
    <>
      <NewspaperMasthead />
      <TabloidLayout data={universityData.admu} />
    </>
  );
}
