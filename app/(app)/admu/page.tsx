import { UniversityTemplate } from "@/components/university/UniversityTemplate";

export const metadata = {
  title: "Ateneo de Manila University (ADMU) - UniSort",
  description:
    "Learn about ADMU's campus culture, academic programs, and student life. Discover if Ateneo is right for you.",
};

export default function ADMU() {
  return (
    <UniversityTemplate
      name="Ateneo de Manila University"
      code="ADMU"
      slogan="Lux in Domino"
      color="var(--admu-blue)"
      overview="Ateneo de Manila University is a premier Jesuit institution known for its strong liberal arts foundation, leadership formation, and vibrant campus life in Loyola Heights."
      culture="Ateneans value excellence with compassion, balancing rigorous academics with social involvement, arts, and student organizations."
      studentLife="Expect a green campus, org fairs at the Zen Garden, Blue Eagles pride, and a tight-knit community centered on service and intellectual curiosity."
    />
  );
}
