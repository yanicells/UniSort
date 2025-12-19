import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

export const metadata = {
  title: "De La Salle University (DLSU) - UniSort",
  description:
    "Learn about DLSU's campus culture, academic programs, and student life. Discover if La Salle is right for you.",
};

export default function DLSU() {
  return (
    <>
      <NewspaperMasthead />
      <TabloidLayout data={universityData.dlsu} />
    </>
  );
}
