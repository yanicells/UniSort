import { UniversityTemplate } from "@/components/university/UniversityTemplate";

export const metadata = {
  title: "University of Santo Tomas (UST) - UniSort",
  description:
    "Learn about UST's campus culture, academic programs, and student life. Discover if UST is right for you.",
};

export default function UST() {
  return (
    <UniversityTemplate
      name="University of Santo Tomas"
      code="UST"
      slogan="Veritas in Caritate"
      color="var(--ust-gold)"
      overview="The University of Santo Tomas is Asia's oldest existing university, known for its heritage campus, strong health sciences, and vibrant traditions."
      culture="Thomasians celebrate faith, artistry, and school spirit, with events like Paskuhan and USTET welcoming thousands."
      studentLife="Life at España includes tree-lined plazas, iconic Main Building views, and a warm community spirit rooted in tradition."
    />
  );
}
