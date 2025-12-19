import { TabloidLayout } from "@/components/university/TabloidLayout";
import { universityData } from "@/lib/page-content/university-data";
import { NewspaperMasthead } from "@/components/layout/NewspaperMasthead";

export const metadata = {
  title: "University of the Philippines (UP) - UniSort",
  description:
    "Learn about UP's campus culture, academic programs, and student life. Discover if UP is right for you.",
};

export default function UP() {
  return (
    <>
      <NewspaperMasthead />
      <TabloidLayout data={universityData.up} />
    </>
  );
}
