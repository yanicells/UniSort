import { UniversityTemplate } from "@/components/university/UniversityTemplate";

export const metadata = {
  title: "De La Salle University (DLSU) - UniSort",
  description:
    "Learn about DLSU's campus culture, academic programs, and student life. Discover if La Salle is right for you.",
};

export default function DLSU() {
  return (
    <UniversityTemplate
      name="De La Salle University"
      code="DLSU"
      slogan="Religion, Morals, Culture"
      color="var(--dlsu-green)"
      overview="De La Salle University in Taft is a leading private university known for business, engineering, and a strong alumni network."
      culture="Lasallians are collaborative and entrepreneurial, with a bustling urban campus and active student organizations."
      studentLife="Taft living means fast-paced days, green pride at Animo events, and a culture that blends academics, org life, and community outreach."
    />
  );
}
