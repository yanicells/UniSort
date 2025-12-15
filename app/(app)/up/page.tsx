import { UniversityTemplate } from "@/components/university/UniversityTemplate";

export const metadata = {
  title: "University of the Philippines (UP) - UniSort",
  description:
    "Learn about UP's campus culture, academic programs, and student life. Discover if UP is right for you.",
};

export default function UP() {
  return (
    <UniversityTemplate
      name="University of the Philippines"
      code="UP"
      slogan="Honor and Excellence"
      color="var(--up-maroon)"
      overview="The University of the Philippines is the national university celebrated for its academic rigor, critical thinking culture, and service to the nation."
      culture="Iskolars ng Bayan value academic freedom, activism, and camaraderie, thriving in a diverse, open campus environment."
      studentLife="UP life means tambays at the Sunken Garden, jeepney rides around campus, Oblation runs, and vibrant org communities across colleges."
    />
  );
}
