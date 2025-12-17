import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const universities = [
  {
    name: "Ateneo de Manila University",
    code: "ADMU",
    color: "#001196",
    description:
      "Known for its liberal arts education and commitment to social justice.",
    href: "/admu",
  },
  {
    name: "De La Salle University",
    code: "DLSU",
    color: "#00703c",
    description:
      "A leading research university known for business and engineering.",
    href: "/dlsu",
  },
  {
    name: "University of the Philippines",
    code: "UP",
    color: "#7b1113",
    description:
      "The country's premier national university, known for academic excellence and activism.",
    href: "/up",
  },
  {
    name: "University of Santo Tomas",
    code: "UST",
    color: "#fdb71a",
    description:
      "The oldest university in Asia, known for its rich history and medical programs.",
    href: "/ust",
  },
];

export default function Big4Page() {
  return (
    <div className="min-h-screen py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The Big 4
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The &quot;Big 4&quot; refers to the four most prestigious
            universities in the Philippines. Each has its own unique culture,
            academic strengths, and history. Discover which one aligns with your
            future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {universities.map((uni) => (
            <Link
              key={uni.code}
              href={uni.href}
              className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className="h-2 w-full"
                style={{ backgroundColor: uni.color }}
              />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {uni.code}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium">
                      {uni.name}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>
                <p className="text-muted-foreground">{uni.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
